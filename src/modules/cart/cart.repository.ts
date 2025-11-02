import { Cart, CartItem, Book } from '../../model';

export class CartRepository {
  async findOrCreateCart(customerId: number) {
    const [cart] = await Cart.findOrCreate({
      where: { customerId },
      defaults: { customerId },
    });
    return cart;
  }

  async findCartWithItems(cartId: number) {
    return Cart.findByPk(cartId, {
  include: [
    {
      model: CartItem,
      as: 'items',
      include: [{ model: Book, as: 'book', attributes: ['id', 'title', 'price'] }],
    },
  ],
});
  }

  async findCartItem(cartId: number, bookId: number) {
    return CartItem.findOne({ where: { cartId, bookId } });
  }

  async createCartItem(cartId: number, bookId: number, quantity: number) {
    return CartItem.create({ cartId, bookId, quantity });
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number) {
    return CartItem.update({ quantity }, { where: { id: cartItemId } });
  }
}
