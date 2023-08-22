import { ChildContainerProps } from "@/types/types";
import { CustomerManageProvider } from "./CustomerManageContext";
import { BookingManageProvider } from "./BookingManageContext";
import { ToastProvider } from "@/layout/context/ToastContext";

export const AppContextProvider = ({ children }: ChildContainerProps) => {
    return (
        <CustomerManageProvider>
            <ToastProvider>
                <BookingManageProvider>{children}</BookingManageProvider>
            </ToastProvider>
        </CustomerManageProvider>
    );
};
