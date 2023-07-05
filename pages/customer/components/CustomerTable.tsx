import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import CustomerDetail from "./CustomerDetail";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

type DataType = {
    id: string;
    name: string;
    phone: string;
    address: string;
    birthday: string;
    total: number;
};
const data: DataType[] = [
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
];
const renderIcon = ({ id }: { id: string }): React.ReactNode => {
    return (
        <span className="flex justify-content-between text-blue-600">
            <i className="pi pi-eye" />
            <i className="pi pi-pencil" />
            <i className="pi pi-trash" />
        </span>
    );
};
const renderHeader = ({ globalFilterValue, onGlobalFilterChange }: any) => {
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

            <Button severity="help" outlined>
                <i className="pi pi-user-plus pr-2 font-bold" />
                <span className="font-bold">Add new</span>
            </Button>
        </div>
    );
};
const CustomerTable = () => {
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
    const headers = renderHeader({ globalFilterValue, onGlobalFilterChange });

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
        >
            <Column field="id" sortable header="ID" />
            <Column field="name" sortable header="Full Name" />
            <Column field="phone" sortable header="Phone Number" />
            <Column field="address" sortable header="Address" />
            <Column field="birthday" sortable header="Birthday" />
            <Column field="total" sortable header="Total money" />
            <Column field="id" body={renderIcon} />
        </DataTable>
    );
};
export default CustomerTable;
