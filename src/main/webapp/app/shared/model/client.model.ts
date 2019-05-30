import { Moment } from 'moment';

export interface IClient {
  id?: number;
  sharedKey?: string;
  businessId?: string;
  email?: string;
  phone?: string;
  dataAdded?: Moment;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public sharedKey?: string,
    public businessId?: string,
    public email?: string,
    public phone?: string,
    public dataAdded?: Moment
  ) {}
}
