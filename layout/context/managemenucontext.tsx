import React, { useState, createContext } from "react";
import {
    AppBreadcrumbProps,
    Breadcrumb,
    ChildContainerProps,
    ManageMenuContextProps,
} from "@/types/types";

export const ManageMenuContext = createContext({} as ManageMenuContextProps);

export const ManageMenuProvider = ({ children }: ChildContainerProps) => {
    const [activeMenu, setActiveMenu] = useState("");
    const [Breadcrumb, setBreadcrumb] = useState<Breadcrumb>();
    const [AppBreadcrumbProps, setAppBreadcrumbProps] =
        useState<AppBreadcrumbProps>({
            className: "pi pi-home",
            to: "/dashboard",
        });

    const value = {
        activeMenu,
        setActiveMenu,
        Breadcrumb,
        setBreadcrumb,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    };

    return (
        <ManageMenuContext.Provider value={value}>
            {children}
        </ManageMenuContext.Provider>
    );
};
