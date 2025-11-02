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
  // Customer 1--1 Cart
  Customer.hasOne(Cart, { foreignKey: 'customerId', as: 'cart' });
  Cart.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

  // Cart 1--many CartItem
  Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });
  CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });

  // Book 1--many CartItem
  Book.hasMany(CartItem, { foreignKey: 'bookId', as: 'cartItems' });
  CartItem.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

  // Customer 1--many Order
  Customer.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });
  Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

  // Order 1--many OrderItem
  Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

  // Book 1--many OrderItem
  Book.hasMany(OrderItem, { foreignKey: 'bookId', as: 'orderItems' });
  OrderItem.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

  // Order 1--1 TransactionLog
  Order.hasOne(TransactionLog, { foreignKey: 'orderId', as: 'transaction' });
  TransactionLog.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

  // Customer 1--many TransactionLog
  Customer.hasMany(TransactionLog, { foreignKey: 'customerId', as: 'transactions' });
  TransactionLog.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
}

