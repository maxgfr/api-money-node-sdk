import { Method } from 'axios';
import { IConfig } from './@types';
export default class ApiMoney {
    access_key: string;
    secret_key: string;
    version: number;
    base_url: string;
    constructor(config: IConfig);
    request(type: Method, endpoint: string, data: any): Promise<unknown>;
}
