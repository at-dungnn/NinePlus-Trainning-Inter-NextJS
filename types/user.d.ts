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

export type BookingType = {
    id?: string;
    customerName: string;
    phoneNumber: string;
    bookingDate: string;
    fromTime: string;
    totime: string;
    status?: string;
    service?: string;
    note: string;
};
