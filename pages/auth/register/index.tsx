/* eslint-disable react/no-unescaped-entities */
import AppConfig from "@/layout/AppConfig";
import { Page } from "@/types/layout";
import { InputText } from "primereact/inputtext";
import React, { useContext, useState } from "react";
import { LayoutConfig } from "@/types/layout";
import { classNames } from "primereact/utils";
import { LayoutContext } from "@/layout/context/LayoutContext";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { Password } from "primereact/password";
import Link from "next/link";

const RegisterPage: Page<any> = ({ data }: { data: any }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const handleChange = (val: string, field: string) => {
        if (field === "username") {
            setUsername(val);
        } else {
            setPassword(val);
        }
    };

    const containerClassName = classNames(
        " flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": layoutConfig.inputStyle === "filled" },
    );

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: "56px",
                        padding: "0.3rem",
                    }}
                >
                    <div className="">
                        <h5>Create Account</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};
RegisterPage.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default RegisterPage;
