/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
// import AppConfig from "@/layout/AppConfig";
// import { LayoutContext } from "@/layout/context/layoutcontext";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Page } from "@/types/types";
import { url } from "inspector";

const ForgotPassword: Page = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const containerClassName = classNames(
        "surface-ground bg-cover md:bg-contain bg-no-repeat flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
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
                        className="w-8 surface-card  py-8 px-5 sm:px-8"
                        style={{ borderRadius: "53px" }}
                    >
                        <div className="flex align-items-end justify-content-end mb-7 gap-5">
                            <span className="font-semibold text-500 no-underline ml-2 pb-2 text-color-secondary">
                                Don't you have account?
                            </span>
                            <Button
                                rounded
                                label="SIGN UP"
                                className="w-2 p-2 font-semibold text-sm align-items-center text-color-secondary bg-white border-black-alpha-20 border-2"
                                onClick={() => router.push("/auth/register/")}
                            ></Button>
                        </div>
                        <div className="flex justify-content-center">
                            <img
                                src="/demo/images/access/iconKey.png"
                                alt=""
                                className="mb-4 mt-3 cursor-pointer flex justify-content-center  "
                                width="13%"
                            />
                        </div>

                        <div className="mb-5 text-center">
                            <div className="text-900 text-center text-3xl font-semibold mb-3">
                                Forgot password?
                            </div>
                            <span className="text-500 font-semibold">
                                No worries, we'll send you reset intructions
                            </span>
                        </div>

                        <div>
                            <label
                                htmlFor="email1"
                                className="block text-900 text-xl font-medium mb-2"
                            >
                                Email
                            </label>
                            <InputText
                                id="email1"
                                type="text"
                                placeholder="Your email"
                                className="w-full surface-card md:w-31rem mb-5"
                                style={{ padding: "1rem" }}
                            />

                            <Button
                                label="Reset Password"
                                className="w-full p-3 text-xl align-items-center"
                                onClick={() => router.push("/auth/sendMail/")}
                            ></Button>

                            <div className="mt-4 text-center">
                                <i className=" pi pi-arrow-left"></i>
                                <a
                                    className="font-semibold text-xl text-600 no-underline ml-2 "
                                    href="/auth/login/"
                                >
                                    Back to Login
                                </a>
                            </div>
                        </div>
                        <div className="flex align-items-center mt-6 gap-3">
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

ForgotPassword.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default ForgotPassword;
