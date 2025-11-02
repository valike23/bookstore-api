// src/models/cart.model.ts
import {
  Table, Column, DataType, AllowNull, Unique, ForeignKey,
} from 'sequelize-typescript';
import {
  InferAttributes, InferCreationAttributes,
} from 'sequelize';
import { BaseModel } from './base.model';
import { Customer } from './customer.model';

@Table({ tableName: 'carts', timestamps: true })
export class Cart extends BaseModel<
  InferAttributes<Cart>,
  InferCreationAttributes<Cart>
> {
  @AllowNull(false)
  @Unique
  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  declare customerId: number;
}
