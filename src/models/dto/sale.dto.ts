import { ClientDto } from "./client.dto";
import { ProductItemDto } from "./product-item.dto";

export interface SaleDto {
  code: number;
  client: ClientDto;
  payCondition: string;
  productItem: ProductItemDto[];
  total: number;
}
