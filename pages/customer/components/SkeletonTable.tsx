import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import { renderHeader } from "./CustomerTable";

export default function SkeletonTable() {
    const items = Array.from({ length: 5 }, (v, i) => i);
    return (
        <DataTable
            // @ts-ignore
            value={items}
            header={renderHeader}
            className="p-datatable-striped"
            rows={5}
            rowsPerPageOptions={[5, 15, 25]}
            style={{ height: "55vh" }}
        >
            <Column
                field="id"
                sortable
                header="ID"
                style={{ width: "10rem" }}
                body={<Skeleton></Skeleton>}
            />
            <Column
                field="name"
                sortable
                header="Full Name"
                style={{ width: "20rem" }}
                body={<Skeleton></Skeleton>}
            />
            <Column
                field="phone"
                sortable
                header="Phone Number"
                style={{ width: "15rem" }}
                body={<Skeleton></Skeleton>}
            />
            <Column
                field="address"
                sortable
                header="Address"
                style={{ width: "20rem" }}
                body={<Skeleton></Skeleton>}
            />
            <Column
                field="birthday"
                sortable
                header="Birthday"
                style={{ width: "13rem" }}
                body={<Skeleton></Skeleton>}
            />
            <Column
                field="total"
                sortable
                header="Total money"
                style={{ width: "13rem" }}
                body={<Skeleton></Skeleton>}
            />
            <Column
                field="id"
                style={{ width: "12rem" }}
                body={<Skeleton></Skeleton>}
            />
        </DataTable>
    );
}
