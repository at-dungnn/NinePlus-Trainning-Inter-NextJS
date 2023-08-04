import { Dispatch, SetStateAction, useCallback } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Customer } from "@/types/types";
import { InputNumber } from "primereact/inputnumber";
import { splitDate } from "@/shared/tools";
import useTrans from "@/shared/hooks/useTrans";
import { useRouter } from "next/router";
import { addLocale } from "primereact/api";

addLocale("vi", {
    firstDayOfWeek: 1,
    dayNames: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    monthNames: [
        "tháng 1",
        "tháng 2",
        "tháng 3",
        "tháng 4",
        "tháng 5",
        "tháng 6",
        "tháng 7",
        "tháng 8",
        "tháng 9",
        "tháng 10",
        "tháng 11",
        "tháng 12",
    ],
    monthNamesShort: [
        "tháng 1",
        "tháng 2",
        "tháng 3",
        "tháng 4",
        "tháng 5",
        "tháng 6",
        "tháng 7",
        "tháng 8",
        "tháng 9",
        "tháng 10",
        "tháng 11",
        "tháng 12",
    ],
    today: "Hoy",
    clear: "Claro",
});
type customerProps = {
    children?: React.ReactNode;
    Customer: Customer;
    setCustomer: Dispatch<SetStateAction<Customer>>;
    readonly?: boolean;
    newCustomer?: boolean;
};
const CustomerForm = ({
    children,
    Customer,
    setCustomer,
    readonly,
    newCustomer,
}: customerProps) => {
    const { trans } = useTrans();
    const router = useRouter();
    const handleChange = useCallback(
        (value: any, key: string) => {
            if (key === "totalMoney") {
                setCustomer({
                    ...Customer,
                    [key]: value,
                });
            } else if (key === "dateOfBirth") {
                setCustomer({
                    ...Customer,
                    [key]: `${value.getFullYear()}-${String(
                        value.getMonth() + 1
                    ).padStart(2, "0")}-${String(value.getDate()).padStart(
                        2,
                        "0"
                    )}T${String(value.getHours()).padStart(2, "0")}:${String(
                        value.getMinutes()
                    ).padStart(2, "0")}`,
                });
            } else {
                setCustomer({
                    ...Customer,
                    [key]: value,
                });
            }
        },
        [Customer]
    );
    return (
        <div className="col ml-5 ">
            <div className="mt-3">
                <h5>
                    ID <span className="text-orange-700">*</span>:
                </h5>
                <InputText
                    disabled
                    value={Customer?.id || ""}
                    onChange={(e) => handleChange(e.target.value, "id")}
                    style={{ width: "95%" }}
                />
            </div>
            <div className="mt-3">
                <h5>
                    {trans.customer.form.name}
                    <span className="ml-2 text-orange-700">*</span>:
                </h5>
                <InputText
                    disabled={readonly}
                    value={Customer?.customerName || ""}
                    onChange={(e) =>
                        handleChange(e.target.value, "customerName")
                    }
                    style={{ width: "95%" }}
                />
            </div>
            <div className="mt-3">
                <h5>
                    {trans.customer.form.phone_label}
                    <span className="ml-2 text-orange-700">*</span>:
                </h5>
                <InputText
                    disabled={readonly}
                    value={Customer?.phoneNumber || ""}
                    onChange={(e) =>
                        handleChange(e.target.value, "phoneNumber")
                    }
                    style={{ width: "95%" }}
                />
            </div>
            <div className="mt-3">
                <h5>{trans.customer.form.address_label} :</h5>
                <InputTextarea
                    disabled={readonly}
                    autoResize
                    rows={6}
                    value={Customer?.address || ""}
                    onChange={(e) => handleChange(e.target.value, "address")}
                    style={{ width: "95%" }}
                />
            </div>
            <div className="mt-3">
                <h5>{trans.customer.form.dob_label} :</h5>
                <Calendar
                    disabled={readonly}
                    dateFormat="dd/mm/yy"
                    locale={router.locale}
                    readOnlyInput
                    value={splitDate(Customer?.dateOfBirth) || ""}
                    onChange={(e) =>
                        handleChange(e.target.value, "dateOfBirth")
                    }
                    showIcon
                    style={{ width: "40%" }}
                />
            </div>
            <div className="mt-3">
                <h5>{trans.customer.form.total_label} :</h5>
                <InputNumber
                    disabled={readonly}
                    value={Customer?.totalMoney || 0}
                    onChange={(e) => handleChange(e.value, "totalMoney")}
                    style={{ width: "95%" }}
                />
            </div>
            {newCustomer ? (
                <>
                    <div className="mt-3">
                        <h5>
                            {trans.customer.form.username}
                            <span className="ml-2 text-orange-700">*</span>:
                        </h5>
                        <InputText
                            disabled={readonly}
                            value={Customer?.username || ""}
                            onChange={(e) =>
                                handleChange(e.target.value, "username")
                            }
                            style={{ width: "95%" }}
                        />
                    </div>{" "}
                    <div className="mt-3">
                        <h5>
                            {trans.customer.form.password}
                            <span className="ml-2 text-orange-700">*</span>:
                        </h5>
                        <InputText
                            disabled={readonly}
                            value={Customer?.password || ""}
                            onChange={(e) =>
                                handleChange(e.target.value, "password")
                            }
                            style={{ width: "95%" }}
                        />
                    </div>
                </>
            ) : (
                <></>
            )}
            {children}
        </div>
    );
};

export default CustomerForm;