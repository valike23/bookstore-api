import { Table, Column, DataType, AllowNull, ForeignKey, Unique } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Order } from './order.model';
import { Customer } from './customer.model';

@Table({ tableName: 'transactions', timestamps: true })
export class TransactionLog extends BaseModel<TransactionLog> {
  @AllowNull(false)
  @ForeignKey(() => Order)
  @Unique
  @Column(DataType.INTEGER)
  declare orderId: number;

  @AllowNull(false)
  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  declare customerId: number;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare amount: string;
}
