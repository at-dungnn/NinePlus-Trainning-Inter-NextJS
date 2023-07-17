import React, { useState, createContext } from "react";
import { ChildContainerProps, MenuContextProps } from "@/types/types";

export const ManageMenuContext = createContext({} as MenuContextProps);

export const ManageMenuProvider = ({ children }: ChildContainerProps) => {
    const [activeMenu, setActiveMenu] = useState("");

    const value = {
        activeMenu,
        setActiveMenu,
    };

    return (
        <ManageMenuContext.Provider value={value}>
            {children}
        </ManageMenuContext.Provider>
    );
};
