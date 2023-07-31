import { CRUDService } from "@/services/common/crudService";
import { Customer } from "@/types/user";

export class customerService extends CRUDService {
    protected basePath = `/customer`;

    public async getCustomer<T>(url: string) {
        return await this.get<T>(url);
    }
    public async createCustomer<T>(url: string, data: Customer): Promise<T> {
        return await this.create<T>(url, data);
    }
    public async updateCustomer<T>(url: string, data: Customer): Promise<T> {
        return await this.update<T>(url, data);
    }
    public async deleteCustomer<T>(url: string, data: Customer): Promise<T> {
        return await this.deleteId<T>(url, data);
    }

    // public getCustomerDetail<T>(url:string):Promise<T>{}
}
