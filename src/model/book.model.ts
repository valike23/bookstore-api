import { Table, Column, DataType, AllowNull, Default } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({ tableName: 'books', timestamps: true })
export class Book extends BaseModel<Book> {
  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare title: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare author: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare genre: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  declare price: string; // DECIMAL in MySQL -> string in JS

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  declare stock: number;

  @Column(DataType.TEXT)
  declare description?: string;
}
