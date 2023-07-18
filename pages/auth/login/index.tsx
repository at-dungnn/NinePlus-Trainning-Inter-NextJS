/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AppConfig from "@/layout/AppConfig";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Page } from "@/types/types";
import Link from "next/link";

const LoginPage: Page = () => {
    const [password, setPassword] = useState("");
    // const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
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
                        className="w-full surface-card py-8 px-5 sm:px-8"
                        style={{ borderRadius: "53px" }}
                    >
                        <div className="flex align-items-end justify-content-end mb-7 gap-5">
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
                                htmlFor="email1"
                                className="block text-900 text-xl font-medium mb-2"
                            >
                                Username
                            </label>
                            <InputText
                                id="email1"
                                type="text"
                                placeholder="Your email"
                                className="w-full md:w-30rem mb-5"
                                style={{ padding: "1rem" }}
                            />

                            <label
                                htmlFor="password1"
                                className="block text-900 font-medium text-xl mb-2"
                            >
                                Password
                            </label>
                            <Password
                                inputId="password1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                onClick={() => router.push("/")}
                            ></Button>
                        </div>
                        <div className=" iconPi flex align-items-center mt-6 gap-3">
                            <span className="font-semibold text-500 no-underline ml-2 text-right ">
                                Login with
                            </span>
                            <i
                                className="pi pi-facebook cursor-pointer"
                                style={{ fontSize: "20px" }}
                                onClick={() =>
                                    router.push("https://facebook.com")
                                }
                            ></i>
                            <i
                                className="pi pi-linkedin cursor-pointer"
                                style={{ fontSize: "20px" }}
                                onClick={() =>
                                    router.push("https://www.linkedin.com/")
                                }
                            ></i>
                            <i
                                className="pi pi-google"
                                style={{ fontSize: "20px" }}
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

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
