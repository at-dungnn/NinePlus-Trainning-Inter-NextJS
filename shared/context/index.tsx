import { ChildContainerProps } from "@/types/types";
import { CustomerManageProvider } from "./CustomerManageContext";
import { BookingManageProvider } from "./BookingManageContext";
import { ServicesProvicer } from "@/layout/context/servicesContext";

export const AppContextProvider = ({ children }: ChildContainerProps) => {
    return (
        <CustomerManageProvider>
            <BookingManageProvider>
                <ServicesProvicer>{children}</ServicesProvicer>
            </BookingManageProvider>
        </CustomerManageProvider>
    );
};
