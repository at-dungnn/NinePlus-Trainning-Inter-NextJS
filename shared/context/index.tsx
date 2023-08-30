import { ChildContainerProps } from "@/types/types";
import { CustomerManageProvider } from "./CustomerManageContext";
import { BookingManageProvider } from "./BookingManageContext";
import { ToastProvider } from "@/layout/context/ToastContext";
import { ServicesProvicer } from "@/layout/context/servicesContext";

export const AppContextProvider = ({ children }: ChildContainerProps) => {
    return (
        <CustomerManageProvider>
            <ToastProvider>
                <BookingManageProvider>
                    <ServicesProvicer>{children}</ServicesProvicer>
                </BookingManageProvider>
            </ToastProvider>
        </CustomerManageProvider>
    );
};
