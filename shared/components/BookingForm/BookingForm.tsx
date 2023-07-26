import useTrans from "@/shared/hooks/useTrans";
import { formatDate } from "@/shared/tools";
import { formatDate2 } from "@/shared/tools/formatDate";
import { useRouter } from "next/router";
import { addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useCallback, useState } from "react";
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
const BookingForm = ({ children, booking, setBooking }: any) => {
    const { trans } = useTrans();
    const router = useRouter();
    const handleChange = useCallback(
        (value: any, key: string) => {
            console.log(key);
            if (key === "bookingDate") {
                setBooking({
                    ...booking,
                    [key]: `${value?.getDate()}/${
                        value?.getMonth() + 1
                    }/${value?.getFullYear()}`,
                });
            } else if (key === "from" || key === "to") {
                setBooking({
                    ...booking,
                    [key]: `${value?.getHours()}:${(
                        "0" + value?.getMinutes()
                    ).slice(-2)} ${value?.getDate()}/${
                        value?.getMonth() + 1
                    }/${value?.getFullYear()} `,
                });
            } else {
                setBooking({
                    ...booking,
                    [key]: value,
                });
            }
        },
        [booking]
    );
    return (
        <>
            <div className="mt-3">
                <h5>
                    ID <span className="text-orange-700">*</span>:
                </h5>
                <InputText
                    value={booking?.id}
                    onChange={(e) => handleChange(e.target.value, "id")}
                    style={{ width: "100%" }}
                />
            </div>
            <div className="mt-3">
                <h5>
                    Customer Name
                    <span className="ml-2 text-orange-700">*</span>:
                </h5>
                <InputText
                    value={booking?.name}
                    onChange={(e) => handleChange(e.target.value, "name")}
                    style={{ width: "100%" }}
                />
            </div>
            <div className="mt-3">
                <h5>
                    {trans.customer.form.phone_label}
                    <span className="ml-2 text-orange-700">*</span>:
                </h5>
                <InputText
                    value={booking?.phone}
                    onChange={(e) => handleChange(e.target.value, "phone")}
                    style={{ width: "100%" }}
                />
            </div>
            <div className="mt-3">
                <h5>
                    Booking Date <span className="ml-2 text-orange-700">*</span>
                </h5>
                <Calendar
                    dateFormat=" dd/mm/yy"
                    locale={router.locale}
                    value={formatDate(booking?.bookingDate)}
                    readOnlyInput
                    onChange={(e) =>
                        handleChange(e.target.value, "bookingDate")
                    }
                    showIcon
                    style={{ width: "100%" }}
                />
            </div>
            <div className=" lg:flex justify-content-between w-full">
                <div className="mt-3" style={{ width: "40%" }}>
                    <h5>
                        From Time{" "}
                        <span className="ml-2 text-orange-700">*</span>
                    </h5>
                    <Calendar
                        className="w-full "
                        dateFormat=" dd/mm/yy"
                        locale={router.locale}
                        value={formatDate2(booking?.from)}
                        showTime
                        readOnlyInput
                        hourFormat="24"
                        onChange={(e) => handleChange(e.target.value, "from")}
                        showIcon
                        style={{ width: "40%" }}
                    />
                </div>
                <div className="mt-3 " style={{ width: "40%" }}>
                    <h5>
                        To Time <span className="ml-2 text-orange-700">*</span>
                    </h5>
                    <Calendar
                        dateFormat=" dd/mm/yy"
                        className="w-full "
                        locale={router.locale}
                        value={formatDate2(booking?.to)}
                        showTime
                        readOnlyInput
                        hourFormat="24"
                        onChange={(e) => handleChange(e.target.value, "to")}
                        showIcon
                        style={{ width: "40%" }}
                    />
                </div>
            </div>
            <div className="mt-3">
                <h5>
                    Note
                    <span className="ml-2 text-orange-700">*</span>:
                </h5>
                <InputTextarea
                    value={booking?.note}
                    autoResize
                    rows={6}
                    onChange={(e) => handleChange(e.target.value, "note")}
                    style={{ width: "100%" }}
                />
            </div>

            {children}
        </>
    );
};

export default BookingForm;
