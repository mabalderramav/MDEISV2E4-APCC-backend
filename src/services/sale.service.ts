import {SaleCreateDto} from "../models/dto/sale-created.dto";
import {SaleDto} from "../models/dto/sale.dto";
import {ClientRepository} from "../repositories/ClientRepository";
import {ProductRepository} from "../repositories/product.repository";
import {SaleProduct} from "../models/sale-product.model";
import {SaleRepository} from "../repositories/sale.repository";
import {SaleProductRepository} from "../repositories/sale-product.repository";

export class SaleService {
    private clientRepository: ClientRepository;
    private productRepository: ProductRepository
    private saleRepository: SaleRepository;
    private saleProductRepository: SaleProductRepository;

    constructor() {
        this.clientRepository = new ClientRepository();
        this.productRepository = new ProductRepository();
        this.saleRepository = new SaleRepository();
        this.saleProductRepository = new SaleProductRepository();
    }

    async save(saleCreateDto: SaleCreateDto): Promise<SaleDto> {
        const client = await this.clientRepository.findByCode(saleCreateDto.clientCode);
        if (client == null) {
            throw new Error(`Client witch code ${saleCreateDto.clientCode} not found`);
        }
        if (!saleCreateDto.productsItem || saleCreateDto.productsItem.length == 0) {
            throw new Error(`Product is required`);
        }

        const products: SaleProduct[] = [];
        for (const p of saleCreateDto.productsItem) {
            const product = await this.productRepository.findByCode(p.code);
            if (product == null) {
                throw new Error(`Product witch code ${p.code} not found`);
            }
            products.push({
                amount: p.amount,
                price: p.price,
                productId: product.id,
                subtotal: p.subTotal
            });
        }

        const clientId: number = await this.clientRepository.findIdByCode(saleCreateDto.clientCode);

        const saleRes = await this.saleRepository.save(clientId, saleCreateDto.total)
        for (const product of products) {
            product.saleId = saleRes.id;
            await this.saleProductRepository.saveDetails(product);
        }
        return {
            code: saleRes.id,
            client: client,
            total: saleRes.total,
            payCondition: saleCreateDto.payCondition,
            productItem: saleCreateDto.productsItem
        }
    }
}
