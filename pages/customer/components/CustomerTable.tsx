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
import { useRouter } from "next/router";
import useTrans from "@/shared/hooks/useTrans";

export const data: Customer[] = [
    {
        id: "NPLUS0001",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "BC123",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0002",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0003",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0004",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0005",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0006",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0007",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0008",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0009",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0010",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0011",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
    {
        id: "NPLUS0011",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        address: "Khue My,Ngu Hanh Son,Da Nang",
        dateOfBirth: "28/06/2000",
        totalMoney: 2344322,
    },
];
const renderIcon = ({ id }: { id: string }): React.ReactNode => {
    const { trans } = useTrans();
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const routeDetail = () => {};
    return (
        <span className="flex justify-content-between w-7rem text-blue-600">
            <Tooltip target=".pi" />
            <Link
                locale={router.locale === "en" ? "en" : "vi"}
                href={{
                    pathname: `/customer/[id]`,
                    query: { id: id },
                }}
            >
                <Button
                    icon="pi pi-eye cursor-pointer"
                    rounded
                    aria-label="Filter"
                    tooltip={trans.toolstip.detail}
                    data-pr-position="left"
                    onClick={routeDetail}
                    style={{ width: "2rem", height: "2rem" }}
                />
            </Link>
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
                name={data.filter((val) => val.id === id)[0].customerName}
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
                    <span className="font-bold">
                        {trans.customer.addnew.title}
                    </span>
                </Button>
            </Link>
        </div>
    );
};
const CustomerTable = (tableData: Customer[] | null) => {
    const breakpoint = 992;
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
                "customerName",
                "phoneNumber",
                "address",
                "dateOfBirth",
                "totalMoney",
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
                field="customerName"
                sortable
                header={trans.customer.form.name}
                style={{ width: "20rem" }}
            />
            <Column
                field="phoneNumber"
                sortable
                header={trans.customer.form.phone_label}
                style={{ width: "15rem" }}
            />
            <Column
                field="address"
                sortable
                header={trans.customer.form.address_label}
                style={{ width: "20rem" }}
            />
            <Column
                field="dateOfBirth"
                sortable
                header={trans.customer.form.dob_label}
                style={{ width: "13rem" }}
            />
            <Column
                field="totalMoney"
                sortable
                header={trans.customer.form.total_label}
                style={{ width: "13rem" }}
            />
            <Column field="id" body={renderIcon} style={{ width: "12rem" }} />
        </DataTable>
    );
};
export default CustomerTable;
