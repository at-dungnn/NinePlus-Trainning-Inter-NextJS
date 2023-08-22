import React from "react";
import { ToastOptions, toast } from "react-toastify";

export const toastMassage = (status: string, msg: string) => {
    const animation: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    switch (status) {
        case "success":
            toast.success(msg, animation);
            break;
        case "error":
            toast.error(msg, animation);

            break;
        case "info":
            toast.info(msg, animation);

            break;

        default:
            toast.info(msg, animation);

            break;
    }
};
