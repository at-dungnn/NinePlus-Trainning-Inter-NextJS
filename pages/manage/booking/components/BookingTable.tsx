import { ToastContext } from "@/layout/context/ToastContext";
import DeleteDialog from "./DeleteDialog";
import useTrans from "@/shared/hooks/useTrans";
import { BookingService } from "@/shared/services";
import { formatFromTo, formatBookingDate } from "@/shared/tools/formatDate";
import Link from "next/link";
import { useRouter } from "next/router";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableFilterEvent,
    DataTableFilterMeta,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { useCallback, useEffect, useState } from "react";
import { BookingDataType, FilterType } from "@/types/user";
import { StatusBox } from "./StatusBox";
import { TableHeader } from "./TableHeader";
import { FilterBar } from "./FilterBar";
import { checkFilled } from "@/shared/tools";
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

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [bookingData, setBookingData] = useState<BookingDataType>();
    const [totalRecords, setTotalRecords] = useState<number>();
    const [lazyState, setLazyState] = useState<any>({
        first: 0,
        rows: 5,
        page: 0,
        sortField: null,
        sortOrder: null,
    });

    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [filterBar, setFilterBar] = useState<FilterType>({
        BookingDate: "",
        FromTime: "",
        ToTime: "",
        Status: "",
    });
    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        (_filters["global"] as any).value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const headers = TableHeader({
        globalFilterValue,
        onGlobalFilterChange,
        trans,
    });
    const refreshData = () => {
        const url = `Keyword=${globalFilterValue}&PageNumber=${
            lazyState.page + 1
        }&PageSize=${lazyState.rows}&IsExport=false`;
        apiFetch.getBooking("?" + url).then((resp: any) => {
            setBookingData(resp);
            setTotalRecords(resp.totalCount);
            setLoading(false);
        });
    };
    const fetchData = () => {
        console.log(lazyState);
        const url = `Keyword=${globalFilterValue}&PageNumber=${
            lazyState.page + 1
        }&PageSize=${lazyState.rows}&IsExport=false`;
        if (lazyState.sortField == null) {
            if (
                filterBar.BookingDate != "" ||
                filterBar.FromTime != "" ||
                filterBar.ToTime != "" ||
                filterBar.Status != ""
            ) {
                apiFetch
                    .getBooking(
                        `?BookingDate=${filterBar?.BookingDate}&FromTime=${filterBar?.FromTime}&ToTime=${filterBar?.ToTime}&Status=${filterBar?.Status}&` +
                            url,
                    )
                    .then((resp: any) => {
                        setBookingData(resp);
                        setTotalRecords(resp.totalCount);
                        setLoading(false);
                    });
            } else {
                apiFetch.getBooking("?" + url).then((resp: any) => {
                    setBookingData(resp);
                    setTotalRecords(resp.totalCount);
                    setLoading(false);
                });
            }
        } else {
            if (
                filterBar.BookingDate != "" ||
                filterBar.FromTime != "" ||
                filterBar.ToTime != "" ||
                filterBar.Status != ""
            ) {
                apiFetch
                    .getBooking(
                        `?BookingDate=${filterBar?.BookingDate}&FromTime=${filterBar?.FromTime}&ToTime=${filterBar?.ToTime}&Status=${filterBar?.Status}&` +
                            url +
                            `&OrderBy=${lazyState.sortField}`,
                    )
                    .then((resp: any) => {
                        setBookingData(resp);
                        setTotalRecords(resp.totalCount);
                        setLoading(false);
                    });
            } else {
                apiFetch
                    .getBooking(`?${url}&OrderBy=${lazyState.sortField}`)
                    .then((resp: any) => {
                        setBookingData(resp);
                        setTotalRecords(resp.totalCount);
                        setLoading(false);
                    });
            }
        }
    };
    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [router.locale, lazyState, globalFilterValue, filterBar]);

    const onPage = (event: DataTablePageEvent) => {
        console.log(event);
        setLazyState({ ...event, sortField: lazyState.sortField });
    };
    const onSort = (event: DataTableSortEvent) => {
        console.log(event, lazyState);
        setLazyState({ ...lazyState, sortField: event.sortField });
    };

    const onFilter = (event: DataTableFilterEvent) => {
        console.log(event);
        event["first"] = 0;
        setLazyState({ ...lazyState, ...event });
    };

    return (
        <>
            <FilterBar
                lazyState={lazyState}
                setLazyState={setLazyState}
                filter={filterBar}
                setFilter={setFilterBar}
                router={router}
                filterFn={fetchData}
                refetchFn={refreshData}
            />
            <DataTable
                value={bookingData?.data}
                scrollable
                scrollHeight="60vh"
                paginator
                lazy
                first={lazyState.first}
                removableSort
                dataKey="id"
                filters={filters}
                onPage={onPage}
                onSort={onSort}
                onFilter={onFilter}
                totalRecords={totalRecords}
                header={headers}
                rows={lazyState.rows}
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
                rowsPerPageOptions={[5, 15, 25]}
                style={{ height: "55vh" }}
            >
                <Column
                    field="id"
                    header="ID"
                    body={RouteDetailID}
                    style={{ width: "10rem" }}
                />
                <Column
                    field="customerName"
                    body={RouteDetailName}
                    header={trans.customer.form.name}
                    style={{ width: "15rem" }}
                />
                <Column
                    field="phoneNumber"
                    header={trans.customer.form.phone_label}
                    style={{ width: "15rem" }}
                />
                <Column
                    field="bookingDate"
                    body={({ bookingDate }: { bookingDate: string }) => {
                        return <p>{formatBookingDate(bookingDate)}</p>;
                    }}
                    header={trans.booking.bookDate}
                    style={{ width: "20rem" }}
                />
                <Column
                    field="fromTime,toTime"
                    body={FromTo}
                    header={trans.booking.fromTo}
                    style={{ width: "15rem" }}
                />
                <Column
                    field="status"
                    body={({ id, status }: { id: string; status: string }) =>
                        StatusBox({ id, status, fetchData })
                    }
                    style={{ width: "13rem" }}
                />
                <Column
                    field="id,customerName"
                    body={renderIcon}
                    style={{ width: "12rem" }}
                />
            </DataTable>
        </>
    );
};

export default BookingTable;
