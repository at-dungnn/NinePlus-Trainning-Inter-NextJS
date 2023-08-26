import { CRUDService } from "@/services/common/crudService";

export class ServiceManage extends CRUDService {
    protected basePath = `http://119.82.130.211:6060/api/v1`;
    public async getService<T>(url: string): Promise<T> {
        return await this.get<T>(url).then((resp: any) => resp);
    }

    public async createService<T>(url: string, data: any): Promise<T | void> {
        return await this.create<T>(url, data);
    }
    public async updateService<T>(url: string, data: any) {
        return await this.update<T>(url, data);
    }
    public async deleteService<T>(url: string): Promise<T> {
        return await this.delete<T>(url);
    }
    public async uploadImg<T>(data: any) {
        return await this.upload<T>("upload", data);
    }
}
