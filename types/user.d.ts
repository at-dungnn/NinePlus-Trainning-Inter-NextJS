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
    id: string;
    name: string;
    phone: string;
    bookingDate: string;
    from: string;
    to: string;
    service: string;
    note: string;
};
