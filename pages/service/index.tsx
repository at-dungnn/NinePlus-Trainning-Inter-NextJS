import React, { useState, useRef, useContext, useEffect } from "react";

import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ServicesContext } from "../../layout/context/servicesContext";
import { Service, Filter } from "../../types/types";
import Navigation from "./components/Nav/nav.component";
import { useRouter } from "next/router";
import { ServiceManage } from "@/shared/services";
const apiFetch = new ServiceManage();
export default function ProductsDemo() {
    const { setServices, empty } = useContext(ServicesContext);

    const router = useRouter();
    const [serviceDatas, setServiceData] = useState<any>();
    const [service, setService] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [totalRecords, setTotalRecords] = useState<number>();
    const [lazyState, setLazyState] = useState<any>({
        first: 0,
        rows: 5,
        page: 0,
        sortField: null,
        sortOrder: null,
    });

    const [deleteServiceDialog, setDeleteServiceDialog] =
        useState<boolean>(false);
    const [filterServicesDialog, setFilterServicesDialog] =
        useState<boolean>(false);
    const fetchData = async (url: string) => {
        return await apiFetch.getService(`service?${url}`).then((resp: any) => {
            setServiceData(resp.data);
            setTotalRecords(resp.totalCount);
            return resp.data;
        });
    };
    const [filter, setFilter] = useState<Filter>(empty.filter);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Service[]>>(null);
    const filterUrl = `Time=${filter.time == null ? "" : filter.time}&Review=${
        filter.rating == null ? "" : filter.rating
    }&Keyword=${globalFilter == "" ? "" : globalFilter}`;
    const refetchData = async () => {
        return await apiFetch
            .getService(`service??PageNumber=1&PageSize=5 &IsExport=false`)
            .then((resp: any) => {
                setServiceData(resp.data);
                return resp.data;
            });
    };
    useEffect(() => {
        fetchData(
            `${filterUrl}&PageNumber=${lazyState.page + 1}&PageSize=${
                lazyState.rows
            }&IsExport=false`,
        );
    }, [router.locale, globalFilter]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const openNew = () => {
        router.push("/service/create");
    };

    const editService = (service: Service) => {
        setService(service);
        router.push(`/service/update/${service.id}`);
    };

    const openFilter = () => {
        setFilterServicesDialog(true);
    };

    const hideDeleteServiceDialog = () => {
        setDeleteServiceDialog(false);
    };

    const hideFilterServicesDialog = () => {
        setFilterServicesDialog(false);
        setFilter(empty.filter);
    };

    const clearFilter = () => {
        setFilter(empty.filter);
        refetchData();
        setLazyState({
            first: 0,
            rows: 5,
            page: 0,
            sortField: null,
            sortOrder: null,
        });
    };

    const confirmDeleteProduct = (service: Service) => {
        setService(service);
        setDeleteServiceDialog(true);
    };

    const deleteService = async () => {
        console.log(service);
        try {
            const res = await apiFetch
                .deleteService(`/service?id=${service.id}`)
                .then((resp: any) => {
                    refetchData();
                    return resp.succeeded;
                });
        } catch (error) {
            console.log(error);
        }
        // setServices(_products);
        setDeleteServiceDialog(false);
        setService(empty.service);
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const onDropdownChangeFilter = (e: DropdownChangeEvent, name: string) => {
        const val = e.value;
        let _filter = { ...filter };

        setFilter({ ...filter, [name]: val });
    };

    const deleteFiterClick = async (name: string) => {
        let _filter = filter;
        // @ts-ignore
        _filter[`${name}`] = null;
        setFilter(_filter);
        onFilter();
    };

    const leftToolbarTemplate = () => {
        return <h4 className="m-0">Manage Service</h4>;
    };

    const imageBodyTemplate = (rowData: Service) => {
        return (
            <img
                src={rowData?.image as any}
                alt={rowData.name}
                className="shadow-2 border-round"
                style={{ width: "64px" }}
            />
        );
    };

    const priceBodyTemplate = (rowData: Service) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData: Service) => {
        return (
            <Rating value={rowData.review as number} readOnly cancel={false} />
        );
    };

    const onPage = (event: DataTablePageEvent) => {
        console.log(event);
        fetchData(
            `${filterUrl}&PageNumber=${(event.page as number) + 1}&PageSize=${
                event.rows
            }&IsExport=false`,
        );
        setLazyState({ ...event, sortField: lazyState.sortField });
    };
    const onSort = (event: DataTableSortEvent) => {
        console.log(event, lazyState);
        setLazyState({ ...lazyState, sortField: event.sortField });
    };
    const onFilter = () => {
        const _services: Service[] = [];
        fetchData(filterUrl).then((resp: any) => {
            _services.push(...resp);
        });
        setService(_services);
        setFilterServicesDialog(false);
        if (_services.length) {
            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: "Product Filtered",
                life: 3000,
            });
        }
    };

    const actionBodyTemplate = (rowData: Service) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => editService(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteProduct(rowData)}
                />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between p-4">
            <div className="flex flex-row gap-2 align-content-center ">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        placeholder="Search..."
                        onChange={(e) => {
                            console.log(e);
                            const target = e.target as HTMLInputElement;
                            setGlobalFilter(target.value);
                        }}
                    />
                </span>

                {filter.time && (
                    <Button
                        label={`time: ${filter.time}`}
                        icon="pi pi-times"
                        outlined
                        severity="danger"
                        onClick={() => {
                            deleteFiterClick("time");
                            fetchData(
                                `PageNumber=${lazyState.page + 1}&PageSize=${
                                    lazyState.rows
                                }&IsExport=false`,
                            );
                        }}
                    />
                )}
                {filter.rating == undefined ? (
                    <></>
                ) : (
                    <Button
                        label={`rating: ${filter.rating}`}
                        icon="pi pi-times"
                        outlined
                        severity="danger"
                        onClick={() => {
                            deleteFiterClick("rating");
                            fetchData(
                                `PageNumber=${lazyState.page + 1}&PageSize=${
                                    lazyState.rows
                                }&IsExport=false`,
                            );
                        }}
                    />
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                <Button
                    label="New"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={openNew}
                />
                <Button
                    label="Filter"
                    icon="pi pi-filter"
                    severity="warning"
                    onClick={openFilter}
                />
            </div>
        </div>
    );

    const deleteServiceDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                // outlined
                text
                onClick={hideDeleteServiceDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                // outlined
                text
                onClick={deleteService}
            />
        </React.Fragment>
    );

    return (
        <div>
            <Navigation linkPage={["service"]} />
            <Toast ref={toast} />
            <div className="card p-2">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={serviceDatas}
                    dataKey="id"
                    paginator
                    lazy
                    first={lazyState.first}
                    onPage={onPage}
                    onSort={onSort}
                    onFilter={onFilter}
                    totalRecords={totalRecords}
                    rows={lazyState.rows}
                    removableSort
                    rowsPerPageOptions={[5, 15, 25]}
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{ minWidth: "16rem" }}
                    ></Column>
                    <Column
                        field="image"
                        header="Image"
                        body={imageBodyTemplate}
                    ></Column>
                    <Column
                        field="price"
                        header="Price"
                        body={priceBodyTemplate}
                        sortable
                        style={{ minWidth: "8rem" }}
                    ></Column>
                    <Column
                        field="time"
                        header="Time"
                        sortable
                        style={{ minWidth: "10rem" }}
                    ></Column>
                    <Column
                        field="review"
                        header="Reviews"
                        body={ratingBodyTemplate}
                        sortable
                        style={{ minWidth: "12rem" }}
                    ></Column>
                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: "12rem" }}
                    ></Column>
                </DataTable>
            </div>

            {/* delete service */}
            <Dialog
                visible={deleteServiceDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteServiceDialogFooter}
                onHide={hideDeleteServiceDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {service && (
                        <span>
                            Are you sure you want to delete{" "}
                            <b>{service.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/* filter service */}
            <Dialog
                visible={filterServicesDialog}
                style={{ width: "320px" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Filter Options"
                headerStyle={{
                    backgroundColor: "transparent",
                    borderBottom: "2px solid var(--gray-300)",
                }}
                modal
                contentStyle={{
                    backgroundColor: "transparent",
                    paddingTop: "1.5rem",
                }}
                className="p-fluid surface-ground border-round-3xl"
                onHide={hideFilterServicesDialog}
            >
                <div className="confirmation-content flex flex-column gap-5">
                    <div className="field">
                        <label className="font-bold">Time</label>
                        <InputText
                            value={filter.time as any}
                            onChange={(e: any) => {
                                onDropdownChangeFilter(e.target, "time");
                                setFilter({ ...filter, time: e.target.value });
                            }}
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="field">
                        <label className="font-bold">Review</label>
                        <Dropdown
                            value={filter.rating}
                            onChange={(e: DropdownChangeEvent) =>
                                onDropdownChangeFilter(e, "rating")
                            }
                            options={empty.serviceRating}
                            placeholder="Select one"
                            className="w-full"
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-content-end align-items-center gap-3">
                        <Button
                            label="Filter"
                            icon="pi pi-filter"
                            severity="warning"
                            rounded
                            className="w-4"
                            onClick={onFilter}
                        />
                        <Button
                            label="Clear"
                            className="w-4 bg-white border-0 text-orange-400 hover:text-orange-600"
                            rounded
                            onClick={clearFilter}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
