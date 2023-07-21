import React, { useState, useRef, useContext } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import axios from "axios";
import { ServicesContext } from "../../layout/context/servicesContext";
import { Service, Filter } from "../../types/types";
import Navigation from "./components/Nav/nav.component";
import { useRouter } from "next/router";

export default function ProductsDemo() {
    const { services, setServices, service, setService, empty } =
        useContext(ServicesContext);

    const router = useRouter();

    const [deleteServiceDialog, setDeleteServiceDialog] =
        useState<boolean>(false);
    const [filterServicesDialog, setFilterServicesDialog] =
        useState<boolean>(false);

    const [filter, setFilter] = useState<Filter>(empty.filter);
    const [serviceByFilter, setServiceByFilter] = useState<Service[]>([]);

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Service[]>>(null);

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
        router.push("/service/update");
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

    const clearFilter = () => setFilter(empty.filter);

    const confirmDeleteProduct = (service: Service) => {
        setService(service);
        setDeleteServiceDialog(true);
    };

    const deleteService = async () => {
        let _products = services.filter((val) => val.id !== service.id);
        try {
            const res = await axios.delete(`${empty.url}/${service.id}`);
        } catch (error) {
            console.log(error);
        }
        setServices(_products);
        setDeleteServiceDialog(false);
        setService(empty.service);
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const onFilter = () => {
        const _services: Service[] = [];
        services.forEach((value: Service, i: number) => {
            if (filter.time && filter.rating) {
                if (
                    value.time === filter.time &&
                    value.rating === filter.rating
                ) {
                    _services.push(value);
                }
            } else {
                if (
                    value.time === filter.time ||
                    value.rating === filter.rating
                ) {
                    _services.push(value);
                }
            }
        });

        setServiceByFilter(_services);
        setFilterServicesDialog(false);
        if (_services.length) {
            toast.current?.show({
                severity: "success",
                summary: "Successful",
                detail: "Product Deleted",
                life: 3000,
            });
        }
    };

    const onDropdownChangeFilter = (e: DropdownChangeEvent, name: string) => {
        const val = e.value;
        let _filter = { ...filter };

        // @ts-ignore
        _filter[`${name}`] = val;
        setFilter(_filter);
    };

    const deleteFiterClick = (name: string) => {
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
                src={rowData.image.base64}
                alt={rowData.image.name}
                className="shadow-2 border-round"
                style={{ width: "64px" }}
            />
        );
    };

    const priceBodyTemplate = (rowData: Service) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData: Service) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
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
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <div className="flex flex-row gap-2 align-content-center">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        placeholder="Search..."
                        onInput={(e) => {
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
                        onClick={() => deleteFiterClick("time")}
                    />
                )}
                {filter.rating && (
                    <Button
                        label={`rating: ${filter.rating}`}
                        icon="pi pi-times"
                        outlined
                        severity="danger"
                        onClick={() => deleteFiterClick("rating")}
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
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={serviceByFilter.length ? serviceByFilter : services}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column
                        field="code"
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
                        field="rating"
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
                        <Dropdown
                            value={filter.time}
                            onChange={(e: DropdownChangeEvent) =>
                                onDropdownChangeFilter(e, "time")
                            }
                            options={empty.serviceTime}
                            placeholder="Select one"
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
