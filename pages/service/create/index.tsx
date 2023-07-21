import { useRouter } from "next/router";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React, { useContext, useState } from "react";
import { ServicesContext } from "../../../layout/context/servicesContext";
import { classNames } from "primereact/utils";
import {
    FileUpload,
    FileUploadHandlerEvent,
    FileUploadUploadEvent,
} from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
import Navigation from "../components/Nav/nav.component";

function Create() {
    const router = useRouter();

    const { services, setServices, service, setService, empty } =
        useContext(ServicesContext);

    const [submitted, setSubmitted] = useState<boolean>(false);

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        const val = (e.target && e.target.value) || "";
        let _service = { ...service };

        // @ts-ignore
        _service[`${name}`] = val;

        setService(_service);
    };

    const onInputNumberChange = (e: InputNumberChangeEvent, name: string) => {
        const val = e.value || 0;
        let _service = { ...service };

        // @ts-ignore
        _service[`${name}`] = val;

        setService(_service);
    };

    const onDropdownChange = (e: DropdownChangeEvent, name: string) => {
        const val = e.value || "";
        let _service = { ...service };

        // @ts-ignore
        _service[`${name}`] = val;

        setService(_service);
    };

    const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
        // convert file to base64 encoded
        const file = event.files[0];
        let _service = { ...service };
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = function () {
            const base64 = reader.result;
            const base64String = base64?.toString();
            if (base64String) {
                _service.image.base64 = base64String;
            }
            _service.image.name = file.name;
        };
        setService(_service);
    };

    const saveService = async () => {
        setSubmitted(true);

        if (
            service.name.trim() &&
            service.time !== null &&
            service.price !== 0
        ) {
            let _services = [...services];
            let _service = { ...service };

            _service.code = createId();
            try {
                const res = await axios.post(empty.url, _service);
            } catch (error) {
                console.log(error);
            }
            _services.push(_service);
            setServices(_services);
            setService(empty.service);
            router.push("/service");
        }
    };

    const cancelService = () => {
        setService(empty.service);
    };

    const hideCreateService = () => {
        setService(empty.service);
        router.push("/service");
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
                            value={service.name}
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
                            name="demo[]"
                            url="/api/upload"
                            accept="image/*"
                            chooseLabel="Upload Image"
                            chooseOptions={{
                                className:
                                    "border-1 border-gray-400 hover:border-indigo-600 bg-white text-gray-600",
                            }}
                            customUpload
                            uploadHandler={customBase64Uploader}
                        />

                        {submitted && !service.image && (
                            <small className="p-error">
                                image is required.
                            </small>
                        )}
                    </div>

                    <div className="field">
                        <label htmlFor="description" className="font-bold">
                            Description
                        </label>
                        <InputTextarea
                            id="description"
                            value={service.description}
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
                                value={service.price}
                                placeholder="$"
                                onValueChange={(e: any) =>
                                    onInputNumberChange(e, "price")
                                }
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                required
                                className={classNames({
                                    "p-invalid": submitted && !service.price,
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
                            <Dropdown
                                value={service.time}
                                onChange={(e: DropdownChangeEvent) =>
                                    onDropdownChange(e, "time")
                                }
                                options={empty.serviceTime}
                                placeholder="Select one"
                                className="w-full"
                                required
                            />
                            {submitted && !service.time && (
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

export default Create;
