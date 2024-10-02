import {describe, it, expect, vi} from "vitest";
import request from "supertest";
import {SaleService} from "../services/sale.service";
import {SaleDto} from "../models/dto/sale.dto";
import app from "../app";

vi.mock('../services/sale.service');
describe("POST /api/sales", () => {
    it("debería registrar una venta exitosamente", async () => {

        const saleDto: SaleDto = {
            "code": 10,
            "client": {
                "code": "3",
                "name": "Juan Pérez"
            },
            "total": 10.00,
            "payCondition": "efectivo",
            "productItem": [
                {
                    "code": "1",
                    "name": "leche",
                    "amount": 2,
                    "price": 5,
                    "subTotal": 10
                }
            ]
        };

        const mockSaleService = new SaleService();
        vi.mocked(mockSaleService).save.mockImplementationOnce( async (): Promise<SaleDto> => {
            return saleDto;
        });

        const response = await request(app)
            .post("/api/sales")
            .send({
                clientCode: "c-01",
                payCondition: "efectivo",
                total: 10,
                productsItem: [
                    {
                        code: "1",
                        name: "leche",
                        amount: 2,
                        price: 5,
                        subTotal: 10,
                    },
                ],
            });
        expect(response.status).toBe(200);
    })
});
