export type Customer = {
    id?: string;
    customerName: string;
    phoneNumber: string;
    address?: string;
    dateOfBirth?: string;
    totalMoney?: number;
    username?: string;
    password?: string;
};
type ServiceType = {
    id: string | number;
    name: string;
    price: number;
    serviceTime: number;
};
export type BookingType = {
    id?: string;
    customerId?: string;
    customerName?: string;
    phoneNumber?: string;
    bookingDate: string;
    fromTime: string;
    toTime: string;
    status?: string;
    services?: ServiceType[];
    note?: string;
    serviceId?: string[];
};
