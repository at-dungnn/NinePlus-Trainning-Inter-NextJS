import useTrans from "@/shared/hooks/useTrans";
import { BookingService } from "@/shared/services";
import { splitDateTime } from "@/shared/tools";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";

const BookingHistory = ({ id }: { id?: string | string[] }) => {
    const apiFetch = new BookingService();
    const [booking, setBooking] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { trans } = useTrans();
    useEffect(() => {
        apiFetch.getBooking(`customer/${id}`).then((resp: any) => {
            setBooking(resp.data);
            setIsLoading(false);
        });
    });
    if (isLoading)
        return (
            <div className=" flex justify-content-center align-items-center h-30rem">
                <ProgressSpinner />
            </div>
        );
    return (
        <DataTable value={booking} showGridlines>
            <Column
                field="bookingId"
                header="ID"
                style={{ width: "5rem" }}
            ></Column>
            <Column
                field="bookingDate"
                header={trans.customer.detail.history.date}
                body={({ bookingDate }: { bookingDate: string }) => {
                    return <p>{String(splitDateTime(bookingDate))}</p>;
                }}
                style={{ width: "15rem" }}
            ></Column>
            <Column field="serviceName" header="Service"></Column>
            <Column
                field="price"
                header={trans.customer.detail.history.price}
                style={{ width: "10rem" }}
            ></Column>
        </DataTable>
    );
};
export default BookingHistory;
