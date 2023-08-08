import useTrans from "@/shared/hooks/useTrans";
import { formatDate } from "@/shared/tools";
import { splitDate } from "@/shared/tools/formatDate";
import { useRouter } from "next/router";
import { addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useCallback, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { mapService } from "./tools";
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
    today: "Hôm Nay",
    clear: "Clear",
});

const BookingForm = ({
    children,
    booking,
    serviceList,
    setBooking,
    disabled,
}: any) => {
    const { trans } = useTrans();
    const [service, setService] = useState<any>(mapService(booking.services));
    const router = useRouter();
    const handleChange = useCallback(
        (value: any, key: string) => {
            console.log(key);
            if (key === "bookingDate") {
                setBooking({
                    ...booking,
                    [key]: `${value.getFullYear()}-${String(
                        value.getMonth() + 1
                    ).padStart(2, "0")}-${String(value.getDate()).padStart(
                        2,
                        "0"
                    )}`,
                });
            } else if (key === "fromTime" || key === "toTime") {
                setBooking({
                    ...booking,
                    [key]: `${value.getFullYear()}-${String(
                        value.getMonth() + 1
                    ).padStart(2, "0")}-${String(value.getDate()).padStart(
                        2,
                        "0"
                    )}T${String(value.getHours()).padStart(2, "0")}:${String(
                        value.getMinutes()
                    ).padStart(2, "0")}`,
                });
            } else if (key === "serviceId") {
                setBooking({
                    ...booking,
                    [key]: value,
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
            {disabled ? (
                <>
                    <div className="mt-3">
                        <h5>
                            ID <span className="text-orange-700">*</span>:
                        </h5>
                        <InputText
                            value={booking?.id}
                            disabled
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
                            value={booking?.customerName}
                            disabled={disabled}
                            onChange={(e) =>
                                handleChange(e.target.value, "customerName")
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="mt-3">
                        <h5>
                            {trans.customer.form.phone_label}
                            <span className="ml-2 text-orange-700">*</span>:
                        </h5>
                        <InputText
                            value={booking?.phoneNumber}
                            disabled={disabled}
                            onChange={(e) =>
                                handleChange(e.target.value, "phoneNumber")
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                </>
            ) : (
                <div className="mt-3">
                    <h5>
                        Customer ID <span className="text-orange-700">*</span>:
                    </h5>
                    <InputText
                        value={booking?.customerId}
                        onChange={(e) =>
                            handleChange(e.target.value, "customerId")
                        }
                        style={{ width: "100%" }}
                    />
                </div>
            )}

            <div className="mt-3">
                <h5>
                    Booking Date <span className="ml-2 text-orange-700">*</span>
                </h5>
                <Calendar
                    dateFormat=" dd/mm/yy"
                    locale={router.locale}
                    value={splitDate(booking?.bookingDate)}
                    readOnlyInput
                    onChange={(e) =>
                        handleChange(e.target.value, "bookingDate")
                    }
                    showIcon
                    style={{ width: "100%" }}
                />
            </div>
            <div className="mt-3">
                <h5>
                    Services
                    <span className="ml-2 text-orange-700">*</span>:
                </h5>
                <MultiSelect
                    value={service}
                    display="chip"
                    onChange={async (e) => {
                        setService(e.value);
                        return handleChange(e.value, "serviceId");
                    }}
                    options={serviceList}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select Services"
                    maxSelectedLabels={3}
                    className="w-full "
                />
            </div>
            <div className=" lg:flex justify-content-between w-full">
                <div className="mt-3" style={{ width: "40%" }}>
                    <h5>
                        From Time
                        <span className="ml-2 text-orange-700">*</span>
                    </h5>
                    <Calendar
                        className="w-full "
                        dateFormat=" dd/mm/yy"
                        locale={router.locale}
                        value={new Date(booking?.fromTime)}
                        showTime
                        readOnlyInput
                        hourFormat="24"
                        onChange={(e) =>
                            handleChange(e.target.value, "fromTime")
                        }
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
                        value={new Date(booking?.toTime)}
                        showTime
                        readOnlyInput
                        hourFormat="24"
                        onChange={(e) => handleChange(e.target.value, "toTime")}
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
