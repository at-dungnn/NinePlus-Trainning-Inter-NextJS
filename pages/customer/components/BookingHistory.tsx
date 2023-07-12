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
    {
        id: "5",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "6",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
    {
        id: "7",
        date: "20/7/2021 15:00 PM",
        service: "Massage",
        price: 500000,
    },
];
const BookingHistory = () => {
    return (
        <DataTable value={product} showGridlines>
            <Column field="id" header="ID" style={{ width: "5rem" }}></Column>
            <Column
                field="date"
                header="Date Time"
                style={{ width: "15rem" }}
            ></Column>
            <Column field="service" header="Service"></Column>
            <Column
                field="price"
                header="Price"
                style={{ width: "10rem" }}
            ></Column>
        </DataTable>
    );
};
export default BookingHistory;
