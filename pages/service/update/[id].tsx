import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useContext, useEffect, useState } from "react";
import {} from "../../../layout/context/servicesContext";
import { classNames } from "primereact/utils";
import { ServiceManage } from "@/shared/services";
import { ToastContext } from "@/layout/context/ToastContext";
import ManageLayout from "@/layout/manageLayout/layout";

function EditService() {
    const apiFetch = new ServiceManage();
    const { showToast } = useContext(ToastContext);
    const [loading, setIsLoading] = useState(true);
    const [uploadImages, setUploadImages] = useState<any>();

    const router = useRouter();
    const [service, setService] = useState<any>();
    const upLoadImage: { nameFile: any; typeFile: string }[] =
        service?.images.filter((img: any) => {
            return { nameFile: img.nameFile, typeFile: "Image" };
        });

    useEffect(() => {
        if (router.query.id !== undefined) {
            apiFetch
                .getService(`service/${router.query.id}`)
                .then((resp: any) => {
                    if (resp.succeeded) {
                        setService(resp.data);
                        setIsLoading(false);
                    } else {
                    }
                });
        }
    }, [router.query.id]);
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

    const saveService = (e: any) => {
        setSubmitted(true);
        uploadInvoice();
        setTimeout(() => {
            apiFetch
                .updateService("service", {
                    ...service,
                    servicesImageRequests: [...upLoadImage],
                })
                .then((resp: any) => {
                    console.log(resp);
                });
            router.push("/service");
        }, 1000);
    };

    const cancelService = () => {
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
                label="Cancel"
                icon="pi pi-times"
                severity="warning"
                outlined
                className="w-auto"
                onClick={cancelService}
            />
        </div>
    );
    if (loading) return "Loading...";
    return (
        <div>
            <Card
                title="Update Service"
                footer={footer}
                className="p-fluid relative"
            >
                <div className="w-full flex flex-row gap-4">
                    <div className="w-8">
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Name<span className="text-red-600">*</span>
                            </label>
                            <InputText
                                id="name"
                                value={service?.name}
                                onChange={(e) => {
                                    onInputChange(e, "name");
                                }}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !service?.name,
                                })}
                            />
                            {submitted && !service?.name && (
                                <small className="p-error">
                                    Name is required.
                                </small>
                            )}
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
                                        "p-invalid":
                                            submitted && !service?.price,
                                    })}
                                />
                                {submitted && !service?.price && (
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
                                {submitted && !service?.serviceTime && (
                                    <small className="p-error">
                                        service time is required.
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <FileUpload
                            mode="basic"
                            name="demo[]"
                            accept="image/*"
                            multiple
                            chooseLabel="Upload Image"
                            auto
                            maxFileSize={10000000000}
                            chooseOptions={{
                                className:
                                    "border-1 border-gray-400 hover:border-indigo-600 bg-white text-gray-600",
                            }}
                            onUpload={customAfter}
                        />

                        <label htmlFor="image" className="font-bold">
                            Upload Image<span className="text-red-600">*</span>
                        </label>
                        <br />
                        <div className="flex flex-wrap">
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
                        <br />
                        <label htmlFor="image" className="font-bold">
                            Images
                            <span className="text-red-600">*</span>
                        </label>
                        <div className="mt-5 flex flex-wrap">
                            {service?.images.map(
                                (
                                    img: any,
                                    index: React.Key | null | undefined,
                                ) => {
                                    return (
                                        <div className="img-wrap " key={index}>
                                            <img
                                                src={img.nameFileLink}
                                                alt={img.nameFile}
                                                height={"120px"}
                                                width={"150px"}
                                            />
                                            <span
                                                className="close"
                                                onClick={(e) => {
                                                    let images =
                                                        upLoadImage.filter(
                                                            (el: any) => {
                                                                if (
                                                                    el.nameFile !==
                                                                    img.nameFile
                                                                )
                                                                    return el;
                                                            },
                                                        );
                                                    setService({
                                                        ...service,
                                                        images: images,
                                                    });
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
                </div>
            </Card>
        </div>
    );
}
EditService.getLayout = function getLayout(page: React.ReactElement) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default EditService;
