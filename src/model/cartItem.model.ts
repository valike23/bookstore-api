
import {
  Table, Column, DataType, AllowNull, ForeignKey,
} from 'sequelize-typescript';
import {
  InferAttributes, InferCreationAttributes,
} from 'sequelize';
import { BaseModel } from './base.model';
import { Cart } from './cart.model';
import { Book } from './book.model';

@Table({
  tableName: 'cart_items',
  timestamps: true,
  indexes: [{ unique: true, fields: ['cartId', 'bookId'] }],
})
export class CartItem extends BaseModel<
  InferAttributes<CartItem>,
  InferCreationAttributes<CartItem>
> {
  @AllowNull(false)
  @ForeignKey(() => Cart as any)
  @Column(DataType.INTEGER)
  declare cartId: number;

  @AllowNull(false)
  @ForeignKey(() => Book as any)
  @Column(DataType.INTEGER)
  declare bookId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare quantity: number;
}
