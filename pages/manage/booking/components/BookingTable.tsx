import DeleteDialog from "./DeleteDialog";
import useTrans from "@/shared/hooks/useTrans";
import { BookingService } from "@/shared/services";
import { formatFromTo, formatBookingDate } from "@/shared/tools/formatDate";
import Link from "next/link";
import { useRouter } from "next/router";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
const apiFetch = new BookingService();

const renderIcon = ({
    id,
    customerName,
}: {
    id: string;
    customerName: string;
}): React.ReactNode => {
    const { trans } = useTrans();
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    return (
        <span className="flex justify-content-between w-5rem text-blue-600">
            <Tooltip target=".pi" />
            <Link
                locale={router.locale === "en" ? "en" : "vi"}
                href={{
                    pathname: `/manage/booking/update/[id]`,
                    query: { id: id },
                }}
            >
                <Button
                    icon="pi pi-pencil cursor-pointer"
                    rounded
                    aria-label="Update"
                    tooltip={trans.toolstip.update}
                    severity="warning"
                    data-pr-position="left"
                    style={{ width: "2rem", height: "2rem" }}
                />
            </Link>
            <Button
                icon="pi pi-trash cursor-pointer"
                rounded
                aria-label="Delete"
                tooltip={trans.toolstip.delete}
                data-pr-position="left"
                severity="danger"
                onClick={() => {
                    setVisible(true);
                }}
                style={{ width: "2rem", height: "2rem" }}
            />
            <DeleteDialog
                id={id}
                name={customerName}
                visible={visible}
                setVisible={setVisible}
            />
        </span>
    );
};
export const renderHeader = ({
    globalFilterValue,
    onGlobalFilterChange,
    trans,
}: any) => {
    return (
        <div className="flex justify-content-between">
            <span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder={trans.input.global}
                    />
                </span>
                <span className="p-input-icon-left ml-3">
                    <i className="pi pi-filter " />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Filter"
                        style={{ width: "9rem" }}
                    />
                </span>
            </span>
            <div className="w-auto flex">
                <Link href={"/manage/booking/Calendar"}>
                    <Button
                        severity="help"
                        outlined
                        className="w-12 h-4rem m-auto text-lg"
                    >
                        <i
                            className="pi pi-calendar pr-2 font-bold "
                            style={{ fontSize: "1.5rem" }}
                        />
                        <span className="font-bold">
                            {trans.booking.calendar}
                        </span>
                    </Button>
                </Link>
                <Link href={"/manage/booking/create"}>
                    <Button
                        severity="help"
                        outlined
                        className="w-10 h-4rem text-lg ml-3"
                    >
                        <i
                            className="pi pi-plus-circle pr-2 font-bold pi-lg "
                            style={{ fontSize: "1.5rem" }}
                        />
                        <span className="font-bold">
                            {trans.booking.create}
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
const StatusBox = ({ status }: { status: number }) => {
    const [bookingStatus, setBookingStatus] = useState<string>(String(status));
    const { trans } = useTrans();
    const option = [
        { status: trans.booking.status.waiting, code: "1" },
        { status: trans.booking.status.inprog, code: "2" },
        { status: trans.booking.status.done, code: "3" },
    ];
    const changeData = (e: any) => {};
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
                    disabled
                    onChange={(e) => {
                        console.log(e.value);
                        setBookingStatus(e.value);
                        changeData(e);
                    }}
                    editable={false}
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
const RouteDetailID = ({
    id,
    customerName,
}: {
    id: string;
    customerName: string;
}) => {
    const router = useRouter();
    return (
        <>
            <Link
                locale={router.locale === "en" ? "en" : "vi"}
                href={{
                    pathname: `/manage/booking/[slug]`,
                    query: { slug: [id] },
                }}
            >
                <p className="text-black-alpha-90">{id}</p>
            </Link>
        </>
    );
};
const RouteDetailName = ({
    id,
    customerName,
}: {
    id: string;
    customerName: string;
}) => {
    const router = useRouter();
    return (
        <>
            <Link
                locale={router.locale === "en" ? "en" : "vi"}
                href={{
                    pathname: `/manage/booking/[slug]`,
                    query: { slug: id },
                }}
            >
                <p className="text-black-alpha-90">{customerName}</p>
            </Link>
        </>
    );
};
const FromTo = ({ fromTime, toTime }: { fromTime: string; toTime: string }) => {
    return <p>{formatFromTo(fromTime, toTime)}</p>;
};

const BookingTable = () => {
    const { trans } = useTrans();
    const router = useRouter();
    const [bookingData, setBookingData] = useState();
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        (_filters["global"] as any).value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const headers = renderHeader({
        globalFilterValue,
        onGlobalFilterChange,
        trans,
    });
    useEffect(() => {
        apiFetch.getBooking("").then((resp: any) => {
            console.log(resp);
            setBookingData(resp);
        });
    }, [router.locale]);

    return (
        <DataTable
            value={bookingData}
            scrollable
            scrollHeight="60vh"
            paginator
            removableSort
            filters={filters}
            dataKey="id"
            header={headers}
            globalFilterFields={[
                "id",
                "customerName",
                "phoneNumber",
                "bookingDate",
                "fromTime",
                "toTime",
                "status",
            ]}
            emptyMessage={trans.booking.empty}
            rows={5}
            rowsPerPageOptions={[5, 15, 25]}
            style={{ height: "55vh" }}
        >
            <Column
                field="id"
                sortable
                header="ID"
                body={RouteDetailID}
                style={{ width: "10rem" }}
            />
            <Column
                field="customerName"
                sortable
                body={RouteDetailName}
                header={trans.customer.form.name}
                style={{ width: "15rem" }}
            />
            <Column
                field="phoneNumber"
                sortable
                header={trans.customer.form.phone_label}
                style={{ width: "15rem" }}
            />
            <Column
                field="bookingDate"
                sortable
                body={({ bookingDate }: { bookingDate: string }) => {
                    return <p>{formatBookingDate(bookingDate)}</p>;
                }}
                header={trans.booking.bookDate}
                style={{ width: "20rem" }}
            />
            <Column
                field="fromTime,toTime"
                sortable
                body={FromTo}
                header={trans.booking.fromTo}
                style={{ width: "15rem" }}
            />
            <Column
                field="status"
                body={StatusBox}
                style={{ width: "13rem" }}
            />
            <Column
                field="id,customerName"
                body={renderIcon}
                style={{ width: "12rem" }}
            />
        </DataTable>
    );
};

export default BookingTable;
