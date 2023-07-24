import DeleteDialog from "@/pages/customer/components/DeleteDialog";
import useTrans from "@/shared/hooks/useTrans";
import Link from "next/link";
import { useRouter } from "next/router";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { useState } from "react";

export const data: any[] = [
    {
        id: "NPLUS0001",
        name: "Nhat Huy",
        phone: "0905124124",
        bookingDate: "14/07/2023",
        from_to: "14:00-16:00 15/07/2023",
        status: "Inprogress",
    },
    {
        id: "BC123",
        name: "Nhat Huy",
        phone: "0905124124",
        bookingDate: "14/07/2023",
        from_to: "14:00-16:00 15/07/2023",
        status: "Done",
    },
    {
        id: "NPLUS0002",
        name: "Nhat Huy",
        phone: "0905124124",
        bookingDate: "14/07/2023",
        from_to: "14:00-16:00 15/07/2023",
        status: "Waiting",
    },
];

const renderIcon = ({ id }: { id: string }): React.ReactNode => {
    const { trans } = useTrans();
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    return (
        <span className="flex justify-content-between w-5rem text-blue-600">
            <Tooltip target=".pi" />
            <Link
                locale={router.locale === "en" ? "en" : "vi"}
                href={{
                    pathname: `/customer/update/[id]`,
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
                name={data.filter((val) => val.id === id)[0].name}
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
                        placeholder="Global Search"
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
                <Link href={"/customer/addnew"}>
                    <Button
                        severity="help"
                        outlined
                        className="w-12 h-4rem m-auto text-lg"
                    >
                        <i
                            className="pi pi-calendar pr-2 font-bold "
                            style={{ fontSize: "1.5rem" }}
                        />
                        <span className="font-bold">Calendar</span>
                    </Button>
                </Link>
                <Link href={"/customer/addnew"}>
                    <Button
                        severity="help"
                        outlined
                        className="w-10 h-4rem text-lg ml-3"
                    >
                        <i
                            className="pi pi-plus-circle pr-2 font-bold pi-lg "
                            style={{ fontSize: "1.5rem" }}
                        />
                        <span className="font-bold">Create Booking</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
const StatusBox = ({ status }: { status: string }) => {
    const [bookingStatus, setBookingStatus] = useState<string>(status);
    const option = [
        { status: "Inprogress", code: "IN" },
        { status: "Waiting", code: "W" },
        { status: "Done", code: "D" },
    ];
    if (status) {
        return (
            <div className=" flex justify-content-center ">
                <Dropdown
                    value={bookingStatus}
                    onChange={(e) => setBookingStatus(e.value)}
                    defaultValue={status}
                    options={option}
                    optionLabel="status"
                    optionValue="status"
                    className="border-yellow-700 text-yellow-900 "
                    style={{
                        width: "10rem",
                        textAlign: "center",
                        color: "white",
                    }}
                />
            </div>
        );
    }
    return <p>Loading...</p>;
};
const RouteDetailID = ({ id }: { id: string }) => {
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
const RouteDetailName = ({ name }: { name: string }) => {
    const router = useRouter();
    return (
        <>
            <Link
                locale={router.locale === "en" ? "en" : "vi"}
                href={{
                    pathname: `/manage/booking/[slug]`,
                    query: { slug: [name] },
                }}
            >
                <p className="text-black-alpha-90">{name}</p>
            </Link>
        </>
    );
};
const BookingTable = () => {
    const { trans } = useTrans();
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
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

    return (
        <DataTable
            value={data}
            scrollable
            scrollHeight="55vh"
            paginator
            removableSort
            filters={filters}
            dataKey="id"
            header={headers}
            globalFilterFields={[
                "id",
                "name",
                "phone",
                "bookingDate",
                "from_to",
                "status",
            ]}
            loading={loading}
            emptyMessage="No booking found."
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
                field="name"
                sortable
                body={RouteDetailName}
                header={trans.customer.form.name}
                style={{ width: "15rem" }}
            />
            <Column
                field="phone"
                sortable
                header={trans.customer.form.phone_label}
                style={{ width: "15rem" }}
            />
            <Column
                field="bookingDate"
                sortable
                header={"Booking Date"}
                style={{ width: "20rem" }}
            />
            <Column
                field="from_to"
                sortable
                header={"From-To Time"}
                style={{ width: "15rem" }}
            />
            <Column
                field="status"
                body={StatusBox}
                style={{ width: "13rem" }}
            />
            <Column field="id" body={renderIcon} style={{ width: "12rem" }} />
        </DataTable>
    );
};

export default BookingTable;
