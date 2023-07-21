import { ChildContainerProps } from "@/types/types";
import { useState, createContext } from "react";

export const BookingManageContext = createContext({});

export const BookingManageProvider = ({ children }: ChildContainerProps) => {
    const [bookingData, setBookingData] = useState({});
    const value = {
        bookingData,
        setBookingData,
    };
    return (
        <BookingManageContext.Provider value={value}>
            {children}
        </BookingManageContext.Provider>
    );
};
