import { ChildContainerProps } from "@/types/types";
import { useState, createContext } from "react";

export const CustomerManageContext = createContext({});

export const CustomerManageProvider = ({ children }: ChildContainerProps) => {
    const [customerData, setCustomerData] = useState({});
    const value = {
        customerData,
        setCustomerData,
    };
    return (
        <CustomerManageContext.Provider value={value}>
            {children}
        </CustomerManageContext.Provider>
    );
};
