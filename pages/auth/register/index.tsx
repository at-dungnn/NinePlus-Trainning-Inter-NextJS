/* eslint-disable react/no-unescaped-entities */
import AppConfig from "@/layout/AppConfig";
import { Page } from "@/types/layout";
import { InputText } from "primereact/inputtext";
import React, { useContext, useState } from "react";
import { LayoutContext } from "@/layout/context/LayoutContext";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
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
        baseURL: "http://20.214.1.99:8080/api/",
        headers: {
            Accept: "application/json;multipart/form-data",
            "Content-Type":
                "application/json;multipart/form-data;application/x-www-form-urlencoded; charset=UTF-8",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
        },
    });
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [checked, setChecked] = useState(false);
    const [calendarValue, setCalendarValue] = useState(
        new Date().toISOString(),
    );
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    const handleChange = (val: string, field: string) => {
        switch (field) {
            case "name":
                setName(val);
                break;
            case "calendarValue":
                setCalendarValue(val);
            case "phone":
                setPhone(val);
                break;
            case "username":
                setUsername(val);
                break;
            case "password":
                setPassword(val);
                break;
            case "address":
                setAddress(val);
                break;

            default:
                break;
        }
    };

    const handleSubmitRegister = async (e: any) => {
        e.preventDefault();

        try {
            await axiosInstance
                .post(
                    "/auth/signup",

                    JSON.stringify({
                        name: name,
                        birthday: calendarValue,
                        phone: phone,
                        username: username,
                        password: password,
                        address: address,
                    }),
                )
                .then((resp: any) => {
                    console.log(resp);
                    if (resp?.data.succeeded == true) {
                        showToast({
                            severity: "success",
                            summary: "success",
                            detail: "Tạo mới tài khoản thành công",
                        });
                    }
                    router.push("/auth/login");
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
        <div className="surface-ground flex align-items-center justify-content-center overflow-x-hidden py-7">
            <div
                className="surface-card py-4 px-5 sm:px-7 shadow-2 flex flex-column w-7 form-register"
                style={{ borderRadius: "14px" }}
            >
                <div className="flex justify-content-between align-items-center">
                    <h5 className="font-bold mr-auto block mb-1 text-4xl">
                        Create Account
                    </h5>
                    <div className="align-items-center flex signin">
                        <span className="text-color-secondary title-no-account">
                            Already have an account
                        </span>

                        <button
                            style={{
                                borderRadius: "6px",
                            }}
                            type="button"
                            className="btn btn-secondary ml-3"
                            onClick={() => router.push("/auth/login/")}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
                <hr
                    style={{
                        borderTop: "1px solid #99a6b3",
                    }}
                />
                <div className="p-fluid mt-4">
                    <div className="p-formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">
                                Name
                                <span className="text-red-500 ml-1 text-900">
                                    *
                                </span>
                            </label>
                            <div>
                                <input
                                    value={name}
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={(e) =>
                                        handleChange(e.target.value, "name")
                                    }
                                />
                            </div>
                        </div>
                        <div className="field col">
                            <label htmlFor="Birthday">Birthday</label>
                            <div>
                                <Calendar
                                    style={{
                                        height: "41px",
                                    }}
                                    showIcon
                                    showButtonBar
                                    value={calendarValue}
                                    onChange={(e) =>
                                        setCalendarValue(e.value as Date)
                                    }
                                ></Calendar>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-fluid">
                    <div className="field mb-4">
                        <label htmlFor="phone">
                            Phone Number
                            <span className="text-red-500 ml-1 text-900">
                                *
                            </span>
                        </label>
                        <input
                            value={phone}
                            type="text"
                            id="phone"
                            name="phone"
                            onChange={(e) =>
                                handleChange(e.target.value, "phone")
                            }
                        />
                    </div>
                    <div className="field mb-4">
                        <label htmlFor="username">
                            Username
                            <span className="text-red-500 ml-1 text-900">
                                *
                            </span>
                        </label>
                        <input
                            value={username}
                            type="text"
                            id="username"
                            name="username"
                            onChange={(e) =>
                                handleChange(e.target.value, "username")
                            }
                        />
                    </div>
                    <div className="field mb-4">
                        <label htmlFor="password">
                            Password
                            <span className="text-red-500 ml-1 text-900">
                                *
                            </span>
                        </label>
                        <input
                            value={password}
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) =>
                                handleChange(e.target.value, "password")
                            }
                        />
                        <div className="mt-1">
                            <span>
                                Use 8 or more characters with a mix of letters,
                                numbers and symbols. Must not contain your name
                                or username.
                            </span>
                        </div>
                    </div>
                    <div className="field mb-4">
                        <label htmlFor="address">Address</label>
                        <input
                            value={address}
                            type="text"
                            id="address"
                            name="address"
                            onChange={(e) =>
                                handleChange(e.target.value, "address")
                            }
                        />
                    </div>
                </div>
                <div>
                    <div
                        className="w-11 flex justify-content-center m-auto pt-4"
                        style={{ borderTop: "1px solid #d8e3ed" }}
                    >
                        <Button
                            label="Create account & continue"
                            onClick={handleSubmitRegister}
                        ></Button>
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
