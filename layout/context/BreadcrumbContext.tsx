import React, { useState, createContext } from "react";
import {
    AppBreadcrumbProps,
    Breadcrumb,
    ChildContainerProps,
    BreadcrumbContextProps,
} from "@/types/types";

export const BreadcrumbContext = createContext({} as BreadcrumbContextProps);

export const BreadcrumbProvider = ({ children }: ChildContainerProps) => {
    const [Breadcrumbs, setBreadcrumbs] = useState<Breadcrumb>({
        labels: [],
        to: "",
    });
    const [AppBreadcrumbProps, setAppBreadcrumbProps] =
        useState<AppBreadcrumbProps>({
            body: {
                icon: "pi pi-home",
                url: "http://localhost:3000/dashboard",
            },
        });

    const value = {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    };

    return (
        <BreadcrumbContext.Provider value={value}>
            {children}
        </BreadcrumbContext.Provider>
    );
};
