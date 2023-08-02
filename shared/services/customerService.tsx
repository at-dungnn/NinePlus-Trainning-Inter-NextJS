import { CRUDService } from "@/services/common/crudService";
import { Customer } from "@/types/user";

export class CustomerService extends CRUDService {
    protected basePath = `/customer`;
    public async getCustomer<T>(url: string): Promise<T> {
        return await this.get<T>(url).then((resp: any) => resp.data);
    }
    public async createCustomer<T>(
        url: string,
        data: Customer
    ): Promise<T | void> {
        return await this.create<T>(url, data);
    }
    public async updateCustomer<T>(url: string, data: Customer) {
        console.log(data);
        return await this.update<T>(url, data);
    }
    public async deleteCustomer<T>(url: string): Promise<T> {
        return await this.delete<T>(url);
    }
}
