/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import AppConfig from "@/layout/AppConfig";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { classNames } from "primereact/utils";
import { Page } from "@/types/types";

const SendMAil: Page = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const containerClassName = classNames(
        "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": layoutConfig.inputStyle === "filled" }
    );

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-start justify-content-center">
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
                        <div className="flex justify-content-center">
                            <img
                                src="/demo/images/access/iconEmail.png"
                                alt=""
                                className="mb-4 mt-3 cursor-pointer flex justify-content-center  "
                                width="10%"
                            />
                        </div>

                        <div className="mb-5 text-center">
                            <div className="text-900 text-center text-3xl font-semibold mb-3">
                                Check your email
                            </div>
                            <span className="text-500 font-semibold">
                                We sent a password reset link to ....
                            </span>
                        </div>

                        <div>
                            <Button
                                label="Open maill app"
                                className="w-full p-3 text-xl align-items-center"
                                onClick={() => router.push("/")}
                            ></Button>
                            <div className="text-center mt-4">
                                <span className="text-500 font-semibold">
                                    No worries, we'll send you reset intructions
                                </span>
                            </div>

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
                            <img
                                src="/demo/images/access/iconFb.png"
                                alt=""
                                className="mb-3 mt-3 cursor-pointer"
                                width="24px"
                                onClick={() =>
                                    router.push("https://facebook.com")
                                }
                            />
                            <img
                                src="/demo/images/access/iconLinkedin.png"
                                alt=""
                                className="mb-3 mt-3 cursor-pointer"
                                width="24px"
                                onClick={() =>
                                    router.push("https://www.linkedin.com/")
                                }
                            />
                            <img
                                src="/demo/images/access/iconGoogle.png"
                                alt=""
                                className="mb-3 mt-3 cursor-pointer"
                                width="29px"
                                onClick={() =>
                                    router.push("https://accounts.google.com")
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SendMAil.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default SendMAil;