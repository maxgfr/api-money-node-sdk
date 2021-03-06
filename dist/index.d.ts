import { Method } from 'axios';
export interface IConfig {
    accessKey: string;
    secretKey: string;
    version: number;
    mode: string;
}
export declare class ApiMoney {
    accessKey: string;
    secretKey: string;
    version: number;
    baseUrl: string;
    constructor(config: IConfig);
    request(type: Method, endpoint: string, data: any): {
        [key: string]: any;
    };
}
