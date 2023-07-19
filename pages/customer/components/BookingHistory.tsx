import useTrans from "@/shared/hooks/useTrans";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const product = [
    {
        id: "A0001",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "2",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "3",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "4",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
];
const BookingHistory = () => {
    const { trans } = useTrans();
    return (
        <DataTable value={product} showGridlines>
            <Column field="id" header="ID" style={{ width: "5rem" }}></Column>
            <Column
                field="date"
                header={trans.customer.detail.history.date}
                style={{ width: "15rem" }}
            ></Column>
            <Column field="service" header="Service"></Column>
            <Column
                field="price"
                header={trans.customer.detail.history.price}
                style={{ width: "10rem" }}
            ></Column>
        </DataTable>
    );
};
export default BookingHistory;
