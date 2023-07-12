import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Tooltip } from "primereact/tooltip";
import Link from "next/link";
import { Customer } from "@/types/types";
import { Dialog } from "primereact/dialog";
import DeleteDialog from "./DeleteDialog";

export const data: Customer[] = [
    {
        id: "NPLUS0001",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "BC123",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0002",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0003",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0004",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0005",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0006",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0007",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0008",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0009",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0010",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0011",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
    {
        id: "NPLUS0011",
        name: "Nhat Huy",
        phone: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        birthday: "28/06/2000",
        total: 2344322,
    },
];
const renderIcon = ({ id }: { id: string }): React.ReactNode => {
    const [visible, setVisible] = useState(false);
    const handleDelete = () => {};
    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {};
    const routeDetail = () => {};
    return (
        <span className="flex justify-content-between w-7rem text-blue-600">
            <Tooltip target=".pi" />
            <Link
                href={{
                    pathname: `/customer/[id]`,
                    query: { id: id },
                }}
            >
                <Button
                    icon="pi pi-eye cursor-pointer"
                    rounded
                    aria-label="Filter"
                    tooltip="Details"
                    data-pr-position="left"
                    onClick={routeDetail}
                    style={{ width: "2rem", height: "2rem" }}
                />
            </Link>
            <Link
                href={{
                    pathname: `/customer/update/[id]`,
                    query: { id: id },
                }}
            >
                <Button
                    icon="pi pi-pencil cursor-pointer"
                    rounded
                    aria-label="Update"
                    tooltip="Update"
                    severity="warning"
                    data-pr-position="left"
                    style={{ width: "2rem", height: "2rem" }}
                />
            </Link>
            <Button
                icon="pi pi-trash cursor-pointer"
                rounded
                aria-label="Delete"
                tooltip="Delete"
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
export const FilterHeader = ({
    globalFilterValue,
    onGlobalFilterChange,
}: any) => {
    return (
        <div className="flex justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Global Search"
                />
            </span>
            <Link href={"/customer/addnew"}>
                <Button severity="help" outlined>
                    <i className="pi pi-user-plus pr-2 font-bold" />
                    <span className="font-bold">Add new</span>
                </Button>
            </Link>
        </div>
    );
};
const CustomerTable = () => {
    const breakpoint = 992;
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const headers = FilterHeader({ globalFilterValue, onGlobalFilterChange });

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
                "address",
                "birthday",
                "total",
            ]}
            loading={loading}
            emptyMessage="No customers found."
            rows={5}
            rowsPerPageOptions={[5, 15, 25]}
            style={{ height: "55vh" }}
        >
            <Column
                field="id"
                sortable
                header="ID"
                style={{ width: "10rem" }}
            />
            <Column
                field="name"
                sortable
                header="Full Name"
                style={{ width: "20rem" }}
            />
            <Column
                field="phone"
                sortable
                header="Phone Number"
                style={{ width: "15rem" }}
            />
            <Column
                field="address"
                sortable
                header="Address"
                style={{ width: "20rem" }}
            />
            <Column
                field="birthday"
                sortable
                header="Birthday"
                style={{ width: "13rem" }}
            />
            <Column
                field="total"
                sortable
                header="Total money"
                style={{ width: "13rem" }}
            />
            <Column field="id" body={renderIcon} style={{ width: "12rem" }} />
        </DataTable>
    );
};
export default CustomerTable;
