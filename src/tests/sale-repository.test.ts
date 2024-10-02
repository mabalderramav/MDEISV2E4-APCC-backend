import {describe, it, vi, expect} from "vitest";
import pool from "../config/db";
import {Sale} from "../models/sale.model";
import {SaleRepository} from "../repositories/sale.repository";

vi.mocked('../config/db')
describe("SaleRepository", () => {
    it('should save sale with code 1', async () => {
        const mockData: Sale = {
            id: 1,
            clientId: 1,
            payCondition: 'efectivo',
            total: 10
        }
        pool.query = vi.fn().mockResolvedValue({
            rows: [mockData]
        });

        const sale = await new SaleRepository().save(1, 10);
        expect(sale.id).toEqual(mockData.id);
        expect(sale).toEqual(mockData);
    });
})