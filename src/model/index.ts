export { BaseModel } from './base.model';
export { Book } from './book.model';
export { Customer } from './customer.model';
export { Cart } from './cart.model';
export { CartItem } from './cartItem.model';
export { Order } from './order.model';
export { OrderItem } from './orderItem.model';
export { TransactionLog } from './transaction.model';

import { Book } from './book.model';
import { Customer } from './customer.model';
import { Cart } from './cart.model';
import { CartItem } from './cartItem.model';
import { Order } from './order.model';
import { OrderItem } from './orderItem.model';
import { TransactionLog } from './transaction.model';

export const MODELS = [Book, Customer, Cart, CartItem, Order, OrderItem, TransactionLog];

export function initAssociations() {

  Customer.hasOne(Cart, { foreignKey: 'customerId' });
  Cart.belongsTo(Customer, { foreignKey: 'customerId' });

  Cart.hasMany(CartItem, { foreignKey: 'cartId' });
  CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

  Book.hasMany(CartItem, { foreignKey: 'bookId' });
  CartItem.belongsTo(Book, { foreignKey: 'bookId' });

  Customer.hasMany(Order, { foreignKey: 'customerId' });
  Order.belongsTo(Customer, { foreignKey: 'customerId' });

  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

  Book.hasMany(OrderItem, { foreignKey: 'bookId' });
  OrderItem.belongsTo(Book, { foreignKey: 'bookId' });

  Order.hasOne(TransactionLog, { foreignKey: 'orderId' });
  TransactionLog.belongsTo(Order, { foreignKey: 'orderId' });

  Customer.hasMany(TransactionLog, { foreignKey: 'customerId' });
  TransactionLog.belongsTo(Customer, { foreignKey: 'customerId' });
}
