import { ChildContainerProps } from "@/types/types";
import { CustomerManageProvider } from "./CustomerManageContext";
import { BookingManageProvider } from "./BookingManageContext";
<<<<<<< HEAD
import { ToastProvider } from "@/layout/context/ToastContext";
=======
import { ServicesProvicer } from "@/layout/context/servicesContext";
>>>>>>> develop

export const AppContextProvider = ({ children }: ChildContainerProps) => {
    return (
        <CustomerManageProvider>
<<<<<<< HEAD
            <ToastProvider>
                <BookingManageProvider>{children}</BookingManageProvider>
            </ToastProvider>
=======
            <BookingManageProvider>
                <ServicesProvicer>{children}</ServicesProvicer>
            </BookingManageProvider>
>>>>>>> develop
        </CustomerManageProvider>
    );
};
