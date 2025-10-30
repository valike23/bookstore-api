import {
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Table,
} from 'sequelize-typescript';


export abstract class BaseModel<T extends {} = any> extends Model<T> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER) 
  declare id: number;
}
