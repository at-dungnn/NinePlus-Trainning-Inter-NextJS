import React, { useState, createContext, useRef } from "react";
import { ChildContainerProps } from "@/types/types";
import { Toast } from "primereact/toast";

export const ToastContext = createContext({} as ToastContextType);

type ToastProps = {
    severity?: string;
    summary?: string;
    detail?: string;
};
type ToastContextType = {
    showToast: Function;
};
export const ToastProvider = ({ children }: ChildContainerProps) => {
    const toast = useRef(null);
    function showToast(props: ToastProps) {
        (toast.current as any).show({
            severity: props.severity,
            summary: props.summary,
            detail: props.detail,
        });
    }
    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast ref={toast} />
            {children}
        </ToastContext.Provider>
    );
};
