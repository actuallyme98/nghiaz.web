import { IResult, IColumnMetadata, IRecordSet } from 'mssql';
import { connection } from '../middlewares/db/connection';

type T = any;

interface KeyUpdate {
  col: string;
  value: any;
}

const transformValue = (value: any) => {
  if (typeof value !== 'number') {
    value = `LTRIM(RTRIM('${value}'))`; // trim spaces
  }
  return value;
};
export class Mssql {
  public async FindAll(table: string): Promise<IColumnMetadata[]> {
    const query = `select * from ${table}`;
    const result = await connection.query(query);
    return this.toColumnMetadata(result);
  }

  public async Find(table: string, column: string, value: any): Promise<any> {
    if (typeof value !== 'number') {
      value = `'${value}'`;
    }
    const query = `select * from ${table} where ${column} = ${value}`;
    const result = await connection.query(query);
    const data = this.toColumnMetadata(result);
    if (data.length === 0) {
      return;
    }
    return data[0];
  }

  public async Insert(table: string, args: any): Promise<number> {
    args = Object.values(args);
    const argsMapped = args.map((value: any) => transformValue(value));
    const id = Math.floor(Math.random() * 1e7); // workaround: id automatically generated
    const values = `${id}, ${argsMapped.join(', ')}`;
    const query = `insert into ${table} values (${values})`;
    await connection.query(query);
    return id;
  }

  public async Update(table: string, key: KeyUpdate, args: KeyUpdate[]): Promise<void> {
    const valueSetted = args
      .map((arg) => {
        return `${arg.col}=${transformValue(arg.value)}`;
      })
      .join(', ');

    const query = `update ${table} set ${valueSetted} where ${key.col} = ${key.value}`;
    await connection.query(query);
  }

  public toColumnMetadata(data: IResult<T>): IRecordSet<T> {
    return data.recordset;
  }
}

export default new Mssql();
