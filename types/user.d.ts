export type Customer = {
    id: string;
    name: string;
    phone: string;
    address?: string;
    birthday?: string;
    total?: number;
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
