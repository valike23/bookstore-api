import { Table, Column, DataType, AllowNull, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Order } from './order.model';
import { Book } from './book.model';

@Table({ tableName: 'order_items', timestamps: true })
export class OrderItem extends BaseModel<OrderItem> {
  @AllowNull(false)
  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  declare orderId: number;

  @AllowNull(false)
  @ForeignKey(() => Book)
  @Column(DataType.INTEGER)
  declare bookId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare quantity: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare unitPrice: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare subtotal: string;
}
