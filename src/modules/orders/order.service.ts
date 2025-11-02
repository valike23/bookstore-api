import { Transaction as SequelizeTx } from 'sequelize';
import { AppError } from '../../common/errors/AppError';
import { sequelize } from '../../config/db';
import { Cart, CartItem, Book, Order, OrderItem, TransactionLog } from '../../model';

type OrderSummaryItem = {
  bookId: number;
  title: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
};

export class OrderService {

  async checkout(customerId: number) {
    return sequelize.transaction(async (t: SequelizeTx) => {
      const cart = await Cart.findOne({ where: { customerId }, transaction: t, lock: t.LOCK.UPDATE });
      if (!cart) throw new AppError(400, 'Cart is empty');

     const items = await CartItem.findAll({
  where: { cartId: cart.id },
  include: [{ model: Book, as: 'book' }], 
  transaction: t,
  lock: t.LOCK.UPDATE,
});

      if (!items.length) throw new AppError(400, 'Cart is empty');

     
      const lockedBooks: Record<number, Book> = {};
      for (const it of items) {
        const bookId = it.bookId;
        const locked = await Book.findByPk(bookId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!locked) throw new AppError(404, `Book ${bookId} not found`);
        lockedBooks[bookId] = locked;
        if (it.quantity > locked.stock) {
          throw new AppError(400, `Not enough stock for "${locked.title}". Available: ${locked.stock}`);
        }
      }

      const lineItems: OrderSummaryItem[] = items.map((it) => {
        const b = lockedBooks[it.bookId];
        const unitPrice = parseFloat(b.price);
        const subtotal = unitPrice * it.quantity;
        return {
          bookId: it.bookId,
          title: b.title,
          unitPrice,
          quantity: it.quantity,
          subtotal,
        };
      });
      const total = lineItems.reduce((s, li) => s + li.subtotal, 0);

      for (const it of items) {
        const b = lockedBooks[it.bookId];
        const newStock = b.stock - it.quantity;
        await Book.update({ stock: newStock }, { where: { id: b.id }, transaction: t });
      }

      const order = await Order.create(
        {
          customerId,
          status: 'completed',
          totalAmount: total.toFixed(2),
        } as any,
        { transaction: t }
      );

      for (const li of lineItems) {
        await OrderItem.create(
          {
            orderId: order.id,
            bookId: li.bookId,
            quantity: li.quantity,
            unitPrice: li.unitPrice.toFixed(2),
            subtotal: li.subtotal.toFixed(2),
          } as any,
          { transaction: t }
        );
      }

      await TransactionLog.create(
        {
          orderId: order.id,
          customerId,
          amount: total.toFixed(2),
        } as any,
        { transaction: t }
      );

      await CartItem.destroy({ where: { cartId: cart.id }, transaction: t });

      return {
        orderId: order.id,
        status: order.status,
        total: total,
        items: lineItems,
        createdAt: order.createdAt,
      };
    });
  }

 async history(customerId: number) {
  const orders = await Order.findAll({
    where: { customerId },
    include: [
      {
        model: OrderItem,
        as: 'items',                    // <- alias
        include: [{ model: Book, as: 'book' }], // <- alias
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  return orders.map((o) => ({
    orderId: o.id,
    status: o.status,
    total: parseFloat(o.totalAmount),
    createdAt: o.createdAt,
    items: (o as any).items?.map((oi: any) => ({
      bookId: oi.bookId,
      // book is included with alias 'book'
      title: oi.book?.title,
      quantity: oi.quantity,
      unitPrice: parseFloat(oi.unitPrice),
      subtotal: parseFloat(oi.subtotal),
    })) ?? [],
  }));
}

}
