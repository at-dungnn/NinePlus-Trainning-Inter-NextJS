import { createContext, useEffect, useState } from "react";
import {
    Service,
    ServicesContextProp,
    ChildContainerProps,
    Filter,
    Empty,
} from "../../types/types";
import axios from "axios";

export const ServicesContext = createContext({} as ServicesContextProp);

export const ServicesProvicer = ({ children }: ChildContainerProps) => {
    const emptyService: Service = {
        id: null,
        code: null,
        name: "",
        image: {
            base64: "",
            name: "",
        },
        description: "",
        price: 0,
        time: null,
        review: 0,
    };

    const emptyFilter: Filter = {
        time: "",
        rating: null,
    };

    const [services, setServices] = useState<Service[]>([]);
    const [service, setService] = useState<Service>(emptyService);

    const empty: Empty = {
        service: emptyService,
        filter: emptyFilter,
        serviceTime: [
            { label: "30 minutes", time: 30 },
            { label: "40 minutes", time: 40 },
            { label: "50 minutes", time: 50 },
            { label: "60 minutes", time: 60 },
            { label: "90 minutes", time: 90 },
        ],
        serviceRating: [0, 1, 2, 3, 4, 5],
    };

    const value: ServicesContextProp = {
        services,
        setServices,
        service,
        setService,
        empty,
    };

    return (
        <ServicesContext.Provider value={value}>
            {children}
        </ServicesContext.Provider>
    );
};
