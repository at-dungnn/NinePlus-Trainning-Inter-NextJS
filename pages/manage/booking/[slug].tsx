import { useRouter } from "next/router";
import ManageLayout from "@/layout/manageLayout/layout";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import useTrans from "@/shared/hooks/useTrans";
import { BreadCrumb } from "primereact/breadcrumb";
import { classNames } from "primereact/utils";

type BookingType = {
    id: string;
    name: string;
    phone: string;
    bookingDate: string;
    status: string;
    from: string;
    to: string;
    service: string;
    note: string;
};

const data: BookingType = {
    id: "A0005",
    name: "Donnete",
    phone: "090321512",
    bookingDate: "12/05/2023",
    status: "Waiting",
    from: "14:00 13/05/2023",
    to: "16:00 13/05/2023",
    service: "DV001-Massage",
    note: "Note description",
};

const DetailPage = () => {
    const router = useRouter();
    const { trans } = useTrans();
    const [isLoading, setIsLoading] = useState(false);
    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);
    // TODO / delete when replace with api
    // const details = data.filter((val) => {
    //     return val.id === router.query.slug;
    // });
    //
    // const [customer, setCustomer] = useState < Customer > details[0];
    useEffect(() => {
        // setCustomer(details[0]);
        console.log(router.query.slug);

        setBreadcrumbs({
            labels: [
                { label: "Booking" },
                { label: "Details" },
                { label: `${router.query.slug}` },
            ],
        });
    }, [router.query.slug, router.locale]);
    if (isLoading === true) return <></>;

    return (
        <>
            <Suspense fallback="Loading...">
                <BreadCrumb
                    model={Breadcrumbs?.labels}
                    home={AppBreadcrumbProps?.body}
                    style={{
                        border: "none",
                        background: "none",
                        borderRadius: 0,
                        marginLeft: "1rem",
                    }}
                />
            </Suspense>
            <div className="m-2 ml-5 p-5 bg-white  border-round-2xl relative h-full ">
                <h1 className="mb-0">
                    {router.query.slug} - <span>{data.name}</span>
                </h1>
                <p className="text-4xl font-medium ml-6">
                    <i className="pi pi-phone text-2xl mr-2" />
                    {data.phone}
                </p>
                <div className="relative">
                    <div className="lg:flex justify-content-between w-8">
                        <div className="w-15rem">
                            <h3>
                                Booking Date{" "}
                                <i className="pi pi-calendar text-2xl" />
                            </h3>
                            <p className="text-2xl ml-5 font-medium ">
                                {data.bookingDate}
                            </p>
                        </div>
                        <div className="w-15rem">
                            <h3>
                                Status{" "}
                                <i
                                    className={classNames("pi text-2xl ml-2", {
                                        "pi-check text-green-400":
                                            data.status === "Done",
                                        "pi-hourglass text-bluegray-500 pi-spin":
                                            data.status === "Waiting",
                                        "pi-replay text-yellow-500 pi-spin":
                                            data.status === "Inprogress",
                                    })}
                                />
                            </h3>
                            <p
                                className={classNames(
                                    "ml-5 text-2xl font-medium ",
                                    {
                                        "text-green-400":
                                            data.status === "Done",
                                        "text-bluegray-500":
                                            data.status === "Waiting",
                                        "text-yellow-500":
                                            data.status === "Inprogress",
                                    }
                                )}
                            >
                                {data.status}
                            </p>
                        </div>
                    </div>
                    <div className="lg:flex justify-content-between w-8 mt-4">
                        <div className="w-15rem">
                            <h3>From</h3>
                            <p className="text-2xl ml-5 font-medium ">
                                {data.from}
                            </p>
                        </div>
                        <div className="w-15rem">
                            <h3>To</h3>
                            <p className="text-2xl ml-5 font-medium ">
                                {data.to}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3>Service</h3>
                        <p className="text-2xl ml-5 font-medium ">
                            {data.service}
                        </p>
                    </div>
                    <div className="mt-4 h-20rem">
                        <h3>Note</h3>
                        <p className="text-2xl ml-5 font-medium ">
                            {data.note}
                        </p>
                    </div>
                </div>
                <h3
                    className="absolute right-0 top-0 mt-5 mr-5 cursor-pointer"
                    onClick={() => {
                        router.back();
                    }}
                >
                    X
                </h3>
            </div>
        </>
    );
};

DetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default DetailPage;
