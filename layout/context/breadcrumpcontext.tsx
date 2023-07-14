import React, { useState, createContext } from "react";
import {
    AppBreadcrumbProps,
    Breadcrumb,
    ChildContainerProps,
    BreadcrumbContextProps,
} from "@/types/types";

export const BreadcrumContext = createContext({} as BreadcrumbContextProps);

export const BreadcrumProvider = ({ children }: ChildContainerProps) => {
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
        <BreadcrumContext.Provider value={value}>
            {children}
        </BreadcrumContext.Provider>
    );
};
