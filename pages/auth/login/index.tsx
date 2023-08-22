/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AppConfig from "@/layout/AppConfig";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "@/layout/context/LayoutContext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Page } from "@/types/layout";
import axios from "axios";
import Link from "next/link";
import Loader from "@/shared/components/Loader";
import { ToastContext } from "@/layout/context/ToastContext";

const LoginPage: Page<any> = ({ data }: { data: any }) => {
    const { showToast } = useContext(ToastContext);
    const axiosInstance = axios.create({
        baseURL: "http://119.82.130.211:6060/api/",
        headers: {
            Accept: "application/json;multipart/form-data",
            "Content-Type":
                "application/json;multipart/form-data;application/x-www-form-urlencoded; charset=UTF-8",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
        },
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const handleChange = (val: string, field: string) => {
        if (field === "username") {
            setUsername(val);
        } else {
            setPassword(val);
        }
    };

    const handleSubmitLogin = async (e: any) => {
        e.preventDefault();

        try {
            await axiosInstance
                .post(
                    "/identity/token",

                    JSON.stringify({
                        employeeNo: username,
                        password: password,
                    })
                )
                .then((resp: any) => {
                    console.log(resp);
                    if (resp?.data.succeeded == true) {
                        localStorage.setItem(
                            "USER",
                            JSON.stringify(resp.data.data)
                        );

                        showToast({
                            severity: "success",
                            summary: "success",
                            detail: "Login succeess",
                        });
                    }
                    router.push("/");
                    // else {
                    //     console.log("123");
                    // }
                });
        } catch {
            showToast({
                severity: "error",
                // summary: "error",
                detail: "The Username or Password is Incorrect",
            });
        }
    };

    const containerClassName = classNames(
        " flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": layoutConfig.inputStyle === "filled" }
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
                    <div
                        className="w-full surface-card py-7 px-5 sm:px-8"
                        style={{ borderRadius: "53px" }}
                    >
                        <div className="flex align-items-end justify-content-end mb-6 gap-5">
                            <span className="font-semibold text-500 no-underline ml-2 pb-2 text-color-secondary">
                                Don't you have account?
                            </span>
                            <Button
                                rounded
                                label="SIGN UP"
                                className="w-3 p-2 font-semibold text-sm align-items-center text-color-secondary bg-white border-black-alpha-20 border-2"
                                onClick={() => router.push("/auth/register/")}
                            ></Button>
                        </div>
                        <div className="mb-5">
                            <div className="text-900 text-3xl font-semibold mb-3">
                                Welcome Back
                            </div>
                            <span className="text-600 font-medium">
                                Login your account
                            </span>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-900 text-xl font-medium mb-2"
                            >
                                Username
                            </label>
                            <InputText
                                id="email"
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    handleChange(e.target.value, "username")
                                }
                                placeholder="Your email"
                                className="w-full md:w-30rem mb-5"
                                style={{ padding: "1rem" }}
                            />

                            <label
                                htmlFor="password"
                                className="block text-900 font-medium text-xl mb-2"
                            >
                                Password
                            </label>
                            <Password
                                inputId="password"
                                value={password}
                                onChange={(e) =>
                                    handleChange(e.target.value, "password")
                                }
                                placeholder="Your password"
                                toggleMask
                                className="w-full mb-5"
                                inputClassName="w-full p-3 md:w-30rem"
                            ></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <Link
                                    className="font-medium no-underline ml-2  cursor-pointer"
                                    style={{ color: "var(--primary-color)" }}
                                    href="/auth/forgotPassword/ "
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Button
                                label="Login"
                                rounded
                                className="w-5 p-3 text-xl"
                                onClick={handleSubmitLogin}
                            ></Button>
                        </div>
                        <div className="flex align-items-center mt-5 gap-3">
                            <span className="font-semibold text-500 no-underline ml-2 text-right ">
                                Login with
                            </span>
                            <i
                                className=" iconLogin pi pi-facebook cursor-pointer"
                                onClick={() =>
                                    router.push("https://facebook.com")
                                }
                            ></i>
                            <i
                                className=" iconLogin pi pi-linkedin cursor-pointer"
                                onClick={() =>
                                    router.push("https://www.linkedin.com/")
                                }
                            ></i>
                            <i
                                className=" iconLogin pi pi-google"
                                onClick={() =>
                                    router.push("https://accounts.google.com")
                                }
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
function Toastify(arg0: {
    text: string;
    className: string;
    style: { background: string };
}) {
    throw new Error("Function not implemented.");
}
