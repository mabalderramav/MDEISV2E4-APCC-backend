import {ClientDto} from "./dto/client.dto";
import {ProductItemDto} from "./dto/product-item.dto";

export interface Sale {
    id: number;
    clientId: number;
    payCondition: string;
    total: number;
}