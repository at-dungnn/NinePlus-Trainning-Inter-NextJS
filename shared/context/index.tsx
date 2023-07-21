import { ChildContainerProps } from "@/types/types";
import { CustomerManageProvider } from "./CustomerManageContext";
import { BookingManageProvider } from "./BookingManageContext";

export const AppContextProvider = ({ children }: ChildContainerProps) => {
    return (
        <CustomerManageProvider>
            <BookingManageProvider>{children}</BookingManageProvider>
        </CustomerManageProvider>
    );
};
