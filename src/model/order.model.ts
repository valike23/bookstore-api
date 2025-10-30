import { Table, Column, DataType, AllowNull, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Customer } from './customer.model';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends BaseModel<Order> {
  @AllowNull(false)
  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  declare customerId: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare totalAmount: string;

  @AllowNull(false)
  @Column(DataType.ENUM('completed', 'cancelled'))
  declare status: 'completed' | 'cancelled';
}
