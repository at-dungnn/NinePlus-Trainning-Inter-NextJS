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

// const RegisterPage: Page<any> = ({ data }: { data: any }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const { layoutConfig } = useContext(LayoutContext);
//     const router = useRouter();
//     const [dropdownItem, setDropdownItem] = useState(null);
//     const dropdownItems = [
//         { name: "Option 1", code: "Option 1" },
//         { name: "Option 2", code: "Option 2" },
//         { name: "Option 3", code: "Option 3" },
//     ];

//     const handleChange = (val: string, field: string) => {
//         if (field === "username") {
//             setUsername(val);
//         } else {
//             setPassword(val);
//         }
//     };

//     const containerClassName = classNames(
//         " flex  justify-content-center min-h-screen min-w-screen overflow-hidden",
//         { "p-input-filled": layoutConfig.inputStyle === "filled" },
//     );

//     return (
//         <div className="min-h-screen min-w-screen flex justify-content-center align-items-center">
//             <div className="flex">
//                 <p>Create Account</p>
//                 <div className="flex justify-content-end">
//                     <p>Already have an account?</p>
//                     <Button
//                         label="SIGN UP"
//                         className="w-5 font-semibold text-sm align-items-center text-color-secondary bg-white border-black-alpha-20 border-1"
//                         onClick={() => router.push("/auth/register/")}
//                     ></Button>
//                 </div>
//             </div>
//         </div>
//     );
// };
// RegisterPage.getLayout = function getLayout(page: React.ReactNode) {
//     return (
//         <React.Fragment>
//             {page}
//             <AppConfig simple />
//         </React.Fragment>
//     );
// };
// export default RegisterPage;

// <div className="col-12"></div>;

// //  <div className={containerClassName}>
// //             <div className="flex align-items-center justify-content-center">
// //                 <div
// //                     style={{
// //                         borderRadius: "56px",
// //                         padding: "0.3rem",
// //                     }}
// //                 >
// //                     <div className="w-7 surface-card py-7 px-5 sm:px-8">
// //                         <div className="card">
// //                             <h5>Advanced</h5>
// //                             <div className="p-fluid formgrid grid">
// //                                 <div className="field col-12 md:col-6">
// //                                     <label htmlFor="firstname2">
// //                                         Firstname
// //                                     </label>
// //                                     <InputText id="firstname2" type="text" />
// //                                 </div>
// //                                 <div className="field col-12 md:col-6">
// //                                     <label htmlFor="lastname2">Lastname</label>
// //                                     <InputText id="lastname2" type="text" />
// //                                 </div>
// //                                 <div className="field col-12">
// //                                     <label htmlFor="address">Address</label>
// //                                     <InputTextarea id="address" rows={4} />
// //                                 </div>
// //                                 <div className="field col-12 md:col-6">
// //                                     <label htmlFor="city">City</label>
// //                                     <InputText id="city" type="text" />
// //                                 </div>
// //                                 <div className="field col-12 md:col-3">
// //                                     <label htmlFor="state">State</label>
// //                                     <Dropdown
// //                                         id="state"
// //                                         value={dropdownItem}
// //                                         onChange={(e) =>
// //                                             setDropdownItem(e.value)
// //                                         }
// //                                         options={dropdownItems}
// //                                         optionLabel="name"
// //                                         placeholder="Select One"
// //                                     ></Dropdown>
// //                                 </div>
// //                                 <div className="field col-12 md:col-3">
// //                                     <label htmlFor="zip">Zip</label>
// //                                     <InputText id="zip" type="text" />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>

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

    const containerClassName = classNames(
        " flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": layoutConfig.inputStyle === "filled" },
    );

    return (
        <div className="container">
            <h1 className="form-title">Registration</h1>
            <form action="">
                <div className="main-user-info">
                    <div className="user-input-box">
                        <label htmlFor="Name"> Name</label>
                        <input type="text" id="Name" name="Name" />
                    </div>
                    <div>
                        <label htmlFor="Birthday">Birthday</label>
                        <Calendar
                            showIcon
                            showButtonBar
                            value={calendarValue}
                            onChange={(e) => setCalendarValue(e.value as Date)}
                        ></Calendar>
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
                            <input type="text" id="Password" name="Password" />
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
                    <div className="user-input-box"></div>
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
