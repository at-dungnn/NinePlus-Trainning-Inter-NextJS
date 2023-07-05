import { CRUDService } from "@/services/common/crudService";

export class customerService extends CRUDService {
    protected basePath = `http://localhost:8080`;
    public publicData = `test api class`;

    public getCustomer<T>(url: string): Promise<T> {
        return this.get<T>(url);
    }

    // public getCustomerDetail<T>(url:string):Promise<T>{}
}
