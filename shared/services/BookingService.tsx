import { CRUDService } from "@/services/common/crudService";
import { BookingType } from "@/types/user";

export class BookingService extends CRUDService {
    protected basePath = `/booking`;
    public async getBooking<T>(url: string): Promise<T> {
        return await this.get<T>(url).then((resp: any) => resp.data);
    }
    public async createBooking<T>(
        url: string,
        data: BookingType
    ): Promise<T | void> {
        return await this.create<T>(url, data);
    }
    public async updateBooking<T>(url: string, data: BookingType) {
        return await this.update<T>(url, data);
    }
    public async deleteBooking<T>(url: string): Promise<T> {
        return await this.delete<T>(url);
    }
}

export class ServicesManageService extends CRUDService {
    protected basePath = `/service`;
    public async getServices<T>(url: string): Promise<T> {
        return await this.get<T>(url).then((resp: any) => resp.data);
    }
}
