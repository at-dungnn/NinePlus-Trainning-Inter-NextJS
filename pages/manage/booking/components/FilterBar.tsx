import { Dispatch, SetStateAction, useCallback } from "react";
import { FilterType } from "@/types/user";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { useTrans } from "@/shared/hooks";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { formatDateTime, splitFormatDate } from "@/shared/tools";

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

export const FilterBar = ({
    lazyState,
    setLazyState,
    filter,
    setFilter,
    router,
    filterFn,
    refetchFn,
}: {
    lazyState: any;
    setLazyState: Dispatch<SetStateAction<any>>;
    filter: FilterType;
    setFilter: Dispatch<SetStateAction<FilterType>>;
    router: any;
    filterFn: Function;
    refetchFn: Function;
}) => {
    const { trans } = useTrans();
    const option = [
        { status: trans.booking.status.waiting, code: "1" },
        { status: trans.booking.status.inprog, code: "2" },
        { status: trans.booking.status.done, code: "3" },
    ];
    const lazyOption = [
        { field: "id", label: "ID" },
        { field: "customerName", label: trans.customer.form.name },
        { field: "phoneNumber", label: trans.customer.form.phone_label },
        { field: "bookingDate", label: trans.booking.bookDate },
        { field: "fromTime", label: trans.booking.from },
        { field: "toTime", label: trans.booking.to },
    ];
    const dropwDownContainer = classNames({
        "border-yellow-500 bg-yellow-500 text-white": filter.Status === "2",
        "border-gray-400 bg-gray-400": filter.Status === "1",
        "border-green-600 bg-green-600": filter.Status === "3",
    });

    return (
        <>
            <div className="p-5 flex gap-4 surface-100">
                <Calendar
                    dateFormat="dd/mm/yy"
                    locale={router.locale}
                    value={splitFormatDate(filter?.BookingDate)}
                    readOnlyInput
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            BookingDate: `${(
                                e.value as Date
                            ).getFullYear()}-${String(
                                (e.value as Date).getMonth() + 1,
                            ).padStart(2, "0")}-${String(
                                (e.value as Date).getDate(),
                            ).padStart(2, "0")}`,
                        })
                    }
                    placeholder={trans.booking.bookingDatePH}
                />
                <Calendar
                    value={formatDateTime(filter?.FromTime as string)}
                    locale={router.locale}
                    readOnlyInput
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            FromTime: `${(
                                e.value as Date
                            ).getFullYear()}-${String(
                                (e.value as Date).getMonth() + 1,
                            ).padStart(2, "0")}-${String(
                                (e.value as Date).getDate(),
                            ).padStart(2, "0")}T${String(
                                (e.value as Date).getHours(),
                            ).padStart(2, "0")}:${String(
                                (e.value as Date).getMinutes(),
                            ).padStart(2, "0")}`,
                        })
                    }
                    dateFormat="dd/mm/yy"
                    placeholder={trans.booking.fromTo}
                    showTime
                    hourFormat="24"
                />
                <Dropdown
                    value={filter.Status}
                    placeholder="Trạng Thái"
                    onChange={(e) => {
                        console.log(e.value);
                        setFilter({ ...filter, Status: e.value });
                    }}
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
                <Dropdown
                    value={lazyState.sortField}
                    placeholder={trans.booking.orderPH}
                    onChange={(e) => {
                        console.log(e.value);
                        setLazyState({ ...lazyState, sortField: e.value });
                    }}
                    options={lazyOption}
                    optionLabel="label"
                    optionValue="field"
                    style={{
                        width: "12rem",
                        textAlign: "center",
                        color: "white",
                        borderWidth: "3px",
                    }}
                />
            </div>
            <div className="p-3 flex justify-content-end gap-5 mr-4">
                <Button
                    icon="pi pi-filter-slash"
                    label={trans.booking.cancelFilter}
                    onClick={() => {
                        setFilter({
                            BookingDate: "",
                            FromTime: "",
                            ToTime: "",
                            Status: "",
                        });
                        setLazyState({
                            first: 0,
                            rows: 5,
                            page: 0,
                            sortField: null,
                            sortOrder: null,
                        });
                        refetchFn();
                    }}
                />
            </div>
        </>
    );
};
