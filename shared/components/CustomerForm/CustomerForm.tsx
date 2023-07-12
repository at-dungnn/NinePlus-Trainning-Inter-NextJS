import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { log } from "console";
import { Customer } from "@/types/types";
import { InputNumber } from "primereact/inputnumber";
import { formatDate } from "@/shared/tools";

type customerProps = {
    children?: React.ReactNode;
    Customer?: Customer;
    setCustomer?: Dispatch<SetStateAction<Customer>>;
    readonly?: boolean;
};
const CustomerForm = ({
    children,
    Customer,
    setCustomer,
    readonly,
}: customerProps) => {
    useEffect(() => {
        console.log(Customer);
    }, [Customer]);
    const handleChange = useCallback(
        (value: any, key: string) => {
            if (key === "total") {
                // @ts-ignore
                setCustomer({
                    ...Customer,
                    [key]: parseInt(value),
                });
            } else if (key === "birthday") {
                // @ts-ignore
                setCustomer({
                    ...Customer,
                    [key]: `${value.getDate()}/${
                        value.getMonth() + 1
                    }/${value.getFullYear()}`,
                });
            } else {
                // @ts-ignore
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
                    disabled={readonly}
                    value={Customer?.id}
                    onChange={(e) => handleChange(e.target.value, "id")}
                    style={{ width: "95%" }}
                />
            </div>
            <div className="mt-3">
                <h5>
                    Name <span className="text-orange-700">*</span>:
                </h5>
                <InputText
                    disabled={readonly}
                    value={Customer?.name}
                    onChange={(e) => handleChange(e.target.value, "name")}
                    style={{ width: "95%" }}
                />
            </div>
            <div className="mt-3">
                <h5>
                    Phone Number <span className="text-orange-700">*</span>:
                </h5>
                <InputText
                    disabled={readonly}
                    value={Customer?.phone}
                    onChange={(e) => handleChange(e.target.value, "phone")}
                    style={{ width: "95%" }}
                />
            </div>
            <div className="mt-3">
                <h5>Adress :</h5>
                <InputTextarea
                    disabled={readonly}
                    autoResize
                    rows={6}
                    value={Customer?.address}
                    onChange={(e) => handleChange(e.target.value, "address")}
                    style={{ width: "95%" }}
                />
            </div>
            <div className="mt-3">
                <h5>Birthday :</h5>
                <Calendar
                    disabled={readonly}
                    dateFormat="dd/mm/yy"
                    value={formatDate(Customer?.birthday)}
                    onChange={(e) => handleChange(e.target.value, "birthday")}
                    showIcon
                    style={{ width: "40%" }}
                />
            </div>
            <div className="mt-3">
                <h5>Total Money :</h5>
                <InputNumber
                    disabled={readonly}
                    value={Customer?.total}
                    onChange={(e) => handleChange(e.value, "total")}
                    style={{ width: "95%" }}
                />
            </div>
            {children}
        </div>
    );
};

export default CustomerForm;
