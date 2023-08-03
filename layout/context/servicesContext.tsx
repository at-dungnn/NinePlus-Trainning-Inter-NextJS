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
        rating: 0,
    };

    const emptyFilter: Filter = {
        time: null,
        rating: null,
    };
    const URL = "https://64ad10cdb470006a5ec54715.mockapi.io/services";

    const [services, setServices] = useState<Service[]>([]);
    const [service, setService] = useState<Service>(emptyService);

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await axios.get(URL);
                setServices(response.data as Service[]);
            } catch (error) {
                console.log(error);
            }
        };
        getServices();
    }, []);

    const empty: Empty = {
        url: URL,
        service: emptyService,
        filter: emptyFilter,
        serviceTime: [
            "30 minutes",
            "40 minutes",
            "50 minutes",
            "60 minutes",
            "90 minutes",
        ],
        serviceRating: [1, 2, 3, 4, 5],
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
