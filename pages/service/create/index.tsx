import { useRouter } from "next/router";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { classNames } from "primereact/utils";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import Navigation from "../components/Nav/nav.component";
import { ServiceManage } from "@/shared/services";
import ManageLayout from "@/layout/manageLayout/layout";
import { ServiceType } from "@/types/services";

function Create() {
    const router = useRouter();
    const [loading, setIsLoading] = useState(false);

    const apiFetch = new ServiceManage();
    const [uploadImages, setUploadImages] = useState<any>();
    const upLoadImage: { nameFile: any; typeFile: string }[] = [];
    const [service, setService] = useState<ServiceType>({
        name: "",
        description: "",
        price: 0,
        serviceTime: 0,
    });

    const [submitted, setSubmitted] = useState<boolean>(false);

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string,
    ) => {
        setService({ ...service, [name]: e.target.value });
    };
    const uploadInvoice = () => {
        uploadImages?.map((img: any) => {
            const formData = new FormData();
            formData.append("filePath", img.name);
            formData.append("file", img);
            apiFetch.uploadImg(formData).then((resp) => {
                console.log(resp.data.filePath);
                upLoadImage.push({
                    nameFile: resp.data.filePath,
                    typeFile: "Image",
                });
            });
        });
    };
    const saveService = async () => {
        setSubmitted(true);
        console.log(service);
        uploadInvoice();
        setTimeout(() => {
            apiFetch
                .createService("service", {
                    ...service,
                    servicesImageRequests: [...upLoadImage],
                })
                .then((resp: any) => {
                    console.log(resp);
                });
            router.push("/service");
        }, 1000);
    };
    if (loading) return "Loading...";
    const customAfter = (event: any) => {
        if (
            uploadImages?.filter((e: any) => {
                return e.name == event.files[0].name;
            }).length
        ) {
            console.log("already add img");
        } else {
            setUploadImages([
                ...(uploadImages == undefined ? [] : uploadImages),
                ...event.files,
            ]);
        }
    };
    const cancelService = () => {
        setService({
            name: "",
            description: "",
            price: 0,
            serviceTime: 0,
        });
    };

    const hideCreateService = () => {
        router.push("/service");
    };

    const footer = (
        <div className="flex flex-row justify-content-start gap-4">
            <Button
                label="Save"
                icon="pi pi-check"
                className="w-auto"
                onClick={saveService}
            />
            <Button
                label="Clear"
                icon="pi pi-filter-slash"
                severity="warning"
                outlined
                className="w-auto"
                onClick={cancelService}
            />
            <Button
                label="Cancel"
                icon="pi pi-times"
                severity="danger"
                className="w-auto"
                onClick={hideCreateService}
            />
        </div>
    );

    return (
        <div>
            <Navigation linkPage={["service", "create"]} />

            <Card
                title="Create Service"
                footer={footer}
                className="p-fluid relative border-round-2xl"
            >
                <Button
                    icon="pi pi-times"
                    rounded
                    text
                    severity="secondary"
                    aria-label="Cancel"
                    style={{ position: "absolute", top: "1rem", right: "1rem" }}
                    onClick={hideCreateService}
                />

                <div className="w-8">
                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Name<span className="text-red-600">*</span>
                        </label>
                        <InputText
                            id="name"
                            value={service?.name}
                            onChange={(e) => onInputChange(e, "name")}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !service.name,
                            })}
                        />
                        {submitted && !service.name && (
                            <small className="p-error">Name is required.</small>
                        )}
                    </div>

                    <div className="field">
                        <label htmlFor="image" className="font-bold">
                            Image<span className="text-red-600">*</span>
                        </label>

                        <FileUpload
                            mode="basic"
                            url="update/null"
                            name="demo[]"
                            accept="image/*"
                            chooseLabel="Upload Image"
                            auto
                            multiple
                            maxFileSize={10000000000}
                            chooseOptions={{
                                className:
                                    "border-1 border-gray-400 hover:border-indigo-600 bg-white text-gray-600",
                            }}
                            onUpload={customAfter}
                        />

                        <div className="flex">
                            {uploadImages?.map(
                                (
                                    img: any,
                                    index: React.Key | null | undefined,
                                ) => {
                                    return (
                                        <div className="img-wrap" key={index}>
                                            <img
                                                src={img.objectURL}
                                                height={"120px"}
                                                width={"150px"}
                                            />
                                            <span
                                                className="close"
                                                onClick={(e) => {
                                                    let images =
                                                        uploadImages.filter(
                                                            (el: any) => {
                                                                if (
                                                                    el.name !==
                                                                    img.name
                                                                )
                                                                    return el;
                                                            },
                                                        );
                                                    setUploadImages([
                                                        ...images,
                                                    ]);
                                                }}
                                            >
                                                &times;
                                            </span>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>
                        <InputTextarea
                            id="description"
                            value={service?.description}
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
                                value={service?.price}
                                placeholder="$"
                                onValueChange={(e: any) => {
                                    setService({
                                        ...service,
                                        price: e.value,
                                    });
                                }}
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                required
                                className={classNames({
                                    "p-invalid": submitted && !service?.price,
                                })}
                            />
                            {submitted && !service.price && (
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
                            <InputNumber
                                value={service?.serviceTime}
                                onChange={(e: any) => {
                                    setService({
                                        ...service,
                                        serviceTime: e.value,
                                    });
                                }}
                            />
                            {submitted && !service.serviceTime && (
                                <small className="p-error">
                                    service time is required.
                                </small>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
Create.getLayout = function getLayout(page: React.ReactElement) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default Create;
