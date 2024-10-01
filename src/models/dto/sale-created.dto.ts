import { ProductItemDto } from "./product-item.dto";

export interface SaleCreateDto {
    clientCode: string;
    total: number;
    productsItem: ProductItemDto[];
    payCondition: string;
}
