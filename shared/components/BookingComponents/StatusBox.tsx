import { ToastContext } from "@/layout/context/ToastContext";
import { useTrans } from "@/shared/hooks";
import { BookingService } from "@/shared/services";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useContext, useState } from "react";

const StatusBox = ({
    id,
    status,
    fetchData,
}: {
    id: string;
    status: string;
    fetchData: any;
}): React.ReactElement => {
    const apiFetch = new BookingService();
    const { showToast } = useContext(ToastContext);
    const [bookingStatus, setBookingStatus] = useState<string>(String(status));
    const { trans } = useTrans();
    const option = [
        { status: trans.booking.status.waiting, code: "1" },
        { status: trans.booking.status.inprog, code: "2" },
        { status: trans.booking.status.done, code: "3" },
    ];
    const changeData = (e: any) => {
        apiFetch
            .updateStatus("update-status", {
                id: id,
                bookingStatus: Number(e.value),
            })
            .then((resp: any) => {
                if (resp.succeeded) {
                    showToast({
                        severity: "success",
                        summary: trans.toast.success,
                        detail: trans.booking.changeStatus,
                    });
                }
            });
    };
    const dropwDownContainer = classNames({
        "border-yellow-500 bg-yellow-500": bookingStatus === "2",
        "border-gray-400 bg-gray-400": bookingStatus === "1",
        "border-green-600 bg-green-600": bookingStatus === "3",
    });
    if (status) {
        return (
            <div className=" flex justify-content-center ">
                <Dropdown
                    value={bookingStatus}
                    // disabled
                    onChange={(e) => {
                        console.log(e.value);
                        setBookingStatus(e.value);
                        changeData(e);
                    }}
                    // editable={false}
                    defaultValue={status}
                    options={option}
                    optionLabel="status"
                    optionValue="code"
                    className={dropwDownContainer}
                    style={{
                        width: "10rem",
                        textAlign: "center",
                        color: "white",
                        borderWidth: "3px",
                    }}
                />
            </div>
        );
    }
    return <p>Loading...</p>;
};
export { StatusBox };
