import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import axios from "axios";

interface Product {
    id: string;
    code: string | null;
    name: string;
    description: string;
    image: string | null;
    price: number;
    times: string | null;
    rating: number;
}

interface Filter {
    time: string;
    rating: number | null;
}

export default function ProductsDemo() {
    let emptyProduct: Product = {
        id: "",
        code: null,
        name: "",
        image: null,
        description: "",
        times: null,
        price: 0,
        rating: 0,
    };

    let emptyFilter: Filter = {
        time: "",
        rating: null,
    };

    let servicesTime = [
        "30 minutes",
        "40 minutes",
        "50 minutes",
        "60 minutes",
        "90 minutes",
    ];

    let servicesRating = [1, 2, 3, 4, 5];

    const [action, setACtion] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [productDialog, setProductDialog] = useState<boolean>(false);
    const [deleteProductDialog, setDeleteProductDialog] =
        useState<boolean>(false);
    const [filterProductsDialog, setFilterProductsDialog] =
        useState<boolean>(false);

    const [filter, setFilter] = useState<Filter>(emptyFilter);
    const [product, setProduct] = useState<Product>(emptyProduct);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Product[]>>(null);
    const URL = "https://64ad10cdb470006a5ec54715.mockapi.io/services";

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(URL);
                setProducts(response.data as Product[]);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);

    const onUpload = async (event: any) => {
        console.log(event.files[0]);
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const openNew = () => {
        setACtion("Create Service");
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const openFilter = () => {
        setACtion("Filter Options");
        setFilterProductsDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideFilterProductsDialog = () => {
        setFilterProductsDialog(false);
    };

    const saveProduct = async () => {
        setSubmitted(true);

        if (
            product.name.trim() &&
            product.times !== null &&
            product.price !== 0
        ) {
            let _products = [...products];
            let _product = { ...product };

            if (product.code !== null) {
                const index = findIndexById(product.code);
                try {
                    const res = await axios.put(
                        `${URL}/${product.id}`,
                        _product
                    );
                } catch (error) {
                    console.log(error);
                }

                _products[index] = _product;
                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Updated",
                    life: 3000,
                });
            } else {
                _product.code = createId();
                _product.image = "product-placeholder.svg";
                try {
                    const res = await axios.post(URL, _product);
                } catch (error) {
                    console.log(error);
                }
                _products.push(_product);

                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Created",
                    life: 3000,
                });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product: Product) => {
        setACtion("Service Details");
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product: Product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async () => {
        let _products = products.filter((val) => val.id !== product.id);
        try {
            const res = await axios.delete(`${URL}/${product.id}`);
        } catch (error) {
            console.log(error);
        }
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].code === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onFilter = () => {
        const _products: Product[] = [];
        products.forEach((value: Product, i: number) => {
            if (value.times === filter.time && value.rating === filter.rating) {
                _products.push(value);
            }
        });

        setProducts(_products);
        setFilterProductsDialog(false);
        setFilter(emptyFilter);
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const createId = (): string => {
        let id = "";
        let chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    // const deleteSelectedProducts = () => {
    //     let _products = products.filter(
    //         (val) => !selectedProducts.includes(val)
    //     );

    //     setProducts(_products);
    //     setFilterProductsDialog(false);
    //     setSelectedProducts([]);
    //     toast.current?.show({
    //         severity: "success",
    //         summary: "Successful",
    //         detail: "Products Deleted",
    //         life: 3000,
    //     });
    // };

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        const val = (e.target && e.target.value) || "";
        let _product = { ...product };

        // @ts-ignore
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _product = { ...product };

        // @ts-ignore
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onDropdownChange = (e: DropdownChangeEvent, name: string) => {
        const val = e.value || "";
        let _product = { ...product };

        // @ts-ignore
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onDropdownChangeFilter = (e: DropdownChangeEvent, name: string) => {
        const val = e.value;
        let _filter = { ...filter };

        // @ts-ignore
        _filter[`${name}`] = val;
        setFilter(_filter);
    };

    const leftToolbarTemplate = () => {
        return <h4 className="m-0">Manage Service</h4>;
    };

    const imageBodyTemplate = (rowData: Product) => {
        return (
            <img
                src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
                alt={rowData.image!}
                className="shadow-2 border-round"
                style={{ width: "64px" }}
            />
        );
    };

    const priceBodyTemplate = (rowData: Product) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData: Product) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const actionBodyTemplate = (rowData: Product) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="mr-2"
                    onClick={() => editProduct(rowData)}
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

    const handleOnUpload = () => {
        console.log("ok");
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
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
                    // disabled={!selectedProducts || !selectedProducts.length}
                />
            </div>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
            <Button
                label="Cancel"
                icon="pi pi-times"
                outlined
                onClick={hideDialog}
            />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                // outlined
                text
                onClick={hideDeleteProductDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                // outlined
                text
                onClick={deleteProduct}
            />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable
                    ref={dt}
                    value={products}
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
                        field="times"
                        header="Times"
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

            {/* create product */}
            <Dialog
                visible={productDialog}
                style={{ width: "90%" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header={action}
                modal
                className="p-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                <div
                    className={
                        action === "Service Details"
                            ? "flex flex-row align-items-center gap-5"
                            : ""
                    }
                >
                    <div
                        className={action === "Service Details" ? "w-7" : "w-8"}
                    >
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Name<span className="text-red-600">*</span>
                            </label>
                            <InputText
                                id="name"
                                value={product.name}
                                onChange={(e) => onInputChange(e, "name")}
                                required
                                // autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !product.name,
                                })}
                            />
                            {submitted && !product.name && (
                                <small className="p-error">
                                    Name is required.
                                </small>
                            )}
                        </div>

                        {action !== "Service Details" && (
                            <div className="field">
                                <label htmlFor="image" className="font-bold">
                                    Image<span className="text-red-600">*</span>
                                </label>
                                <Toast ref={toast}></Toast>
                                <FileUpload
                                    id="image"
                                    mode="basic"
                                    name="demo[]"
                                    url="/api/upload"
                                    accept="image/png"
                                    chooseLabel="Upload Image"
                                    chooseOptions={{
                                        className:
                                            "border-1 border-gray-400 hover:border-indigo-600 bg-white text-gray-600",
                                    }}
                                    maxFileSize={1000000}
                                    onUpload={onUpload}
                                />

                                {submitted && !product.image && (
                                    <small className="p-error">
                                        image is required.
                                    </small>
                                )}

                                {product.image && (
                                    <img
                                        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                                        alt={product.image}
                                        className="product-image block mt-3"
                                    />
                                )}
                            </div>
                        )}

                        <div className="field">
                            <label htmlFor="description" className="font-bold">
                                Description
                            </label>
                            <InputTextarea
                                id="description"
                                value={product.description}
                                onChange={(e: any) =>
                                    onInputChange(e, "description")
                                }
                                autoResize
                                required
                                rows={3}
                                cols={20}
                                maxLength={256}
                            />
                        </div>

                        <div className="formgrid m-0 grid column-gap-3">
                            <div className="field col p-0">
                                <label htmlFor="price" className="font-bold">
                                    Price<span className="text-red-600">*</span>
                                </label>
                                <InputNumber
                                    id="price"
                                    value={product.price}
                                    placeholder="$"
                                    onValueChange={(e: any) =>
                                        onInputNumberChange(e, "price")
                                    }
                                    mode="currency"
                                    currency="USD"
                                    locale="en-US"
                                    required
                                    className={classNames({
                                        "p-invalid":
                                            submitted && !product.price,
                                    })}
                                />
                                {submitted && !product.price && (
                                    <small className="p-error">
                                        price is required.
                                    </small>
                                )}
                            </div>

                            <div className="field col p-0">
                                <label className="font-bold">
                                    Service time
                                    <span className="text-red-600">*</span>
                                </label>
                                <Dropdown
                                    value={product.times}
                                    onChange={(e: DropdownChangeEvent) =>
                                        onDropdownChange(e, "times")
                                    }
                                    options={servicesTime}
                                    placeholder="Select one"
                                    className="w-full"
                                    required
                                />
                                {submitted && !product.times && (
                                    <small className="p-error">
                                        service time is required.
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>

                    {action === "Service Details" && (
                        <div className="w-5 field">
                            <label htmlFor="image" className="font-bold">
                                Image<span className="text-red-600">*</span>
                            </label>
                            <Toast ref={toast}></Toast>
                            <FileUpload
                                id="image"
                                mode="basic"
                                name="demo[]"
                                url="/api/upload"
                                accept="image/png"
                                chooseLabel="Upload Image"
                                chooseOptions={{
                                    className:
                                        "border-1 border-gray-400 hover:border-indigo-600 bg-white text-gray-600",
                                }}
                                maxFileSize={1000000}
                                onUpload={onUpload}
                            />
                            {submitted && !product.name && (
                                <small className="p-error">
                                    Name is required.
                                </small>
                            )}
                            {product.image && (
                                <img
                                    src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                                    alt={product.image}
                                    className="product-image block mt-3 w-full"
                                />
                            )}
                        </div>
                    )}
                </div>
            </Dialog>

            {/* delete product */}
            <Dialog
                visible={deleteProductDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Confirm"
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {product && (
                        <span>
                            Are you sure you want to delete{" "}
                            <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            {/* delete products */}
            <Dialog
                visible={filterProductsDialog}
                style={{ width: "320px" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header={action}
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
                onHide={hideFilterProductsDialog}
            >
                <div className="confirmation-content flex flex-column gap-5">
                    <div className="field">
                        <label className="font-bold">Time</label>
                        <Dropdown
                            value={product.times}
                            onChange={(e: DropdownChangeEvent) =>
                                onDropdownChangeFilter(e, "time")
                            }
                            options={servicesTime}
                            placeholder="Select one"
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="field">
                        <label className="font-bold">Review</label>
                        <Dropdown
                            value={product.rating}
                            onChange={(e: DropdownChangeEvent) =>
                                onDropdownChangeFilter(e, "rating")
                            }
                            options={servicesRating}
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
                            onClick={hideFilterProductsDialog}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
