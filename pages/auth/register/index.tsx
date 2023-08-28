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
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { ToastContext } from "@/layout/context/ToastContext";
import axios from "axios";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

const RegisterPage: Page<any> = ({ data }: { data: any }) => {
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
    const [checked, setChecked] = useState(false);
    const [calendarValue, setCalendarValue] = useState(new Date());
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
                    }),
                )
                .then((resp: any) => {
                    console.log(resp);
                    if (resp?.data.succeeded == true) {
                        localStorage.setItem(
                            "USER",
                            JSON.stringify(resp.data.data),
                        );

                        showToast({
                            severity: "success",
                            summary: "success",
                            detail: "Login succeess",
                        });
                    }
                    router.push("/");
                });
        } catch {
            showToast({
                severity: "error",
                summary: "Error",
                detail: "The Username or Password is Incorrect",
            });
        }
    };

    return (
        <div className="container">
            <h1 className="form-title">Registration</h1>
            <form action="">
                <div className="main-user-info">
                    <div className="user-input-box">
                        <label htmlFor="Name"> Name</label>
                        <input type="text" id="Name" name="Name" />
                    </div>
                    <div className="user-input-box">
                        <label htmlFor="Birthday">Birthday</label>
                        <div className="flex justify-content-start">
                            <Calendar
                                showIcon
                                showButtonBar
                                value={calendarValue}
                                onChange={(e) =>
                                    setCalendarValue(e.value as Date)
                                }
                            ></Calendar>
                        </div>
                    </div>
                    <div className="user-input-box">
                        <label htmlFor="Phone">Phone Number</label>
                        <input type="number" id="Phone" name="Phone" />
                    </div>
                    <div className="user-input-box">
                        <label htmlFor="Username">Username</label>
                        <input type="text" id="Username" name="Username" />
                    </div>
                    <div className="user-input-box">
                        <div>
                            <label htmlFor="Password">Password</label>
                            <input
                                type="password"
                                id="Password"
                                name="Password"
                            />
                        </div>
                        <span>
                            Use 8 or more characters with a mix of letters,
                            numbers and symbols. Must not contain your name or
                            username.
                        </span>
                    </div>
                    <div className="user-input-box">
                        <div>
                            <label htmlFor="Address">Address</label>
                        </div>
                        <InputTextarea
                            autoResize
                            rows={2}
                            cols={50}
                            id="Address"
                            name="Address"
                        />
                    </div>
                    <div className="user-input-box">
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="rememberme1"
                                checked={checked}
                                onChange={(e) => setChecked(e.checked ?? false)}
                                className="mr-2"
                            ></Checkbox>
                            <div>
                                <div>
                                    Send me tips, trends, freebies, updates &
                                    offers.
                                </div>
                                <div className="flex-wrap">
                                    You can unsubscribe at any time.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-submit-btn">
                        <input
                            type="submit"
                            value="Create account & continue"
                        />
                    </div>
                </div>
            </form>
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
