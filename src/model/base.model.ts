
import { CreationOptional } from 'sequelize';
import {
  Model,
} from 'sequelize-typescript';


export abstract class BaseModel<
  TAttributes extends {} = any,
  TCreation extends {} = any
> extends Model<TAttributes, TCreation> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
