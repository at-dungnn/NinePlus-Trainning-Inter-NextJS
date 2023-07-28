import { Dispatch, SetStateAction } from 'react';
import { Router } from './services.d';

export interface Image {
    base64: string;
    name: string;
}
export interface Service {
    id: string | null;
    code: string | null;
    name: string;
    image: Image;
    description: string;
    price: number;
    time: string | null;
    rating: number;
}

export interface Filter {
    time: string | null;
    rating: number | null;
}

export interface Empty {
    url: string;
    service: Service;
    filter: Filter;
    serviceTime: string[];
    serviceRating: number[];
}

export interface ServicesContextProp {
    services: Service[];
    setServices: Dispatch<SetStateAction<Service[]>>;
    service: Service;
    setService: Dispatch<SetStateAction<Service>>;
    empty: Empty;
}
