import { Table, Column, DataType, AllowNull, Unique, ForeignKey } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Customer } from './customer.model';

@Table({ tableName: 'carts', timestamps: true })
export class Cart extends BaseModel<Cart> {
  @AllowNull(false)
  @Unique
  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  declare customerId: number;
}
