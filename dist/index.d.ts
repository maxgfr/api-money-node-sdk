import { Method } from 'axios';
import { IConfig } from './@types';
export declare class ApiMoney {
    accessKey: string;
    secretKey: string;
    version: number;
    baseUrl: string;
    constructor(config: IConfig);
    request(type: Method, endpoint: string, data: any): Promise<unknown>;
}
