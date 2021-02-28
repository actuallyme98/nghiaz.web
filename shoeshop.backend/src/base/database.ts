import { IResult, IColumnMetadata, IRecordSet } from 'mssql';
import { connection } from '../middlewares/db/connection';

type T = any;

export class Mssql {
  public async FindAll(table: string): Promise<IColumnMetadata[]> {
    const query = `select * from ${table}`;
    const result = await connection.query(query);
    return this.toColumnMetadata(result);
  }

  public async Find(table: string, column: string, value: any): Promise<IRecordSet<T> | null> {
    const query = `select * from ${table} where ${column} = ${value}`;
    const result = await connection.query(query);
    const data = this.toColumnMetadata(result);
    if (data.length === 0) {
      return null;
    }
    return data;
  }

  public async Insert(table: string, ...args: any[]): Promise<void> {
    const id = '""'; // id automatically generated
    const values = `${id},${args.join(',')}`;
    const query = `insert into ${table} values (${values}))`;
    await connection.query(query);
  }

  public toColumnMetadata(data: IResult<T>): IRecordSet<T> {
    return data.recordset;
  }
}

export default new Mssql();
