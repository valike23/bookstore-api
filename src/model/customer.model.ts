import { Table, Column, DataType, AllowNull, Unique } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({ tableName: 'customers', timestamps: true })
export class Customer extends BaseModel<Customer> {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare name: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(255))
  declare email: string;
}
