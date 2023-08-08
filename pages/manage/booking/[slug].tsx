import { useRouter } from "next/router";
import ManageLayout from "@/layout/manageLayout/layout";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import useTrans from "@/shared/hooks/useTrans";
import { BreadCrumb } from "primereact/breadcrumb";
import { classNames } from "primereact/utils";
import { BookingType, ServiceType } from "@/types/user";
import { ProgressSpinner } from "primereact/progressspinner";
import { BookingService } from "@/shared/services";
import { formatBookingTime } from "@/shared/tools/formatDate";

const booking: BookingType = {
    id: "A0005",
    customerName: "Donnete",
    phoneNumber: "090321512",
    bookingDate: "12/05/2023",
    status: "Waiting",
    fromTime: "14:00 13/05/2023",
    toTime: "16:00 13/05/2023",
    services: [
        {
            id: 1,
            name: "đắp mặt nạ",
            price: 200,
            serviceTime: 3,
        },
        {
            id: 2,
            name: "massage mắt",
            price: 300,
            serviceTime: 5,
        },
    ],
    note: "Note description",
};

const DetailPage = () => {
    const apiFetch = new BookingService();
    const router = useRouter();
    const { trans } = useTrans();
    const [isLoading, setIsLoading] = useState(true);
    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);
    const [booking, setBooking] = useState<BookingType>({
        id: "",
        customerName: "",
        phoneNumber: "",
        bookingDate: "",
        fromTime: "",
        toTime: "",
    });
    useEffect(() => {
        console.log(router.query.slug);
        if (router.query.slug) {
            // const id = (router.query.slug as any).split(",");
            apiFetch.getBooking(`${router.query.slug}`).then((resp: any) => {
                console.log(resp);
                setBooking(resp);
                setIsLoading(false);
            });
        }
        setBreadcrumbs({
            labels: [
                { label: "Booking" },
                { label: "Details" },
                { label: `${router.query.slug}` },
            ],
        });
    }, [router.query.slug, router.locale]);

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
            <div className="m-2 pt-5 ml-5 px-8 bg-white  border-round-2xl relative h-full ">
                {isLoading ? (
                    <div className="card flex justify-content-center align-items-center h-30rem mt-5">
                        <ProgressSpinner />
                    </div>
                ) : (
                    <>
                        <h1 className="mb-0">
                            {router.query.slug} -{" "}
                            <span>{booking.customerName}</span>
                        </h1>
                        <p className="text-4xl font-medium ml-6">
                            <i className="pi pi-phone text-2xl mr-2" />
                            {booking.phoneNumber}
                        </p>
                        <div className="relative mt-6">
                            <div className="lg:flex justify-content-between w-10">
                                <div className="w-20rem">
                                    <h3>
                                        Booking Date{" "}
                                        <i className="pi pi-calendar text-2xl" />
                                    </h3>
                                    <p className="text-2xl ml-5 font-medium ">
                                        {booking.bookingDate}
                                    </p>
                                </div>
                                <div className="w-20rem">
                                    <h3>
                                        Status{" "}
                                        <i
                                            className={classNames(
                                                "pi text-2xl ml-2",
                                                {
                                                    "pi-check text-green-400":
                                                        (booking.status as any) ===
                                                        3,
                                                    "pi-hourglass text-bluegray-500 pi-spin":
                                                        (booking.status as any) ===
                                                        1,
                                                    "pi-replay text-yellow-500 pi-spin":
                                                        (booking.status as any) ===
                                                        2,
                                                }
                                            )}
                                        />
                                    </h3>
                                    <p
                                        className={classNames(
                                            "ml-5 text-2xl font-medium ",
                                            {
                                                "text-green-400":
                                                    (booking.status as any) ===
                                                    3,
                                                "text-bluegray-500":
                                                    (booking.status as any) ===
                                                    1,
                                                "text-yellow-500":
                                                    (booking.status as any) ===
                                                    2,
                                            }
                                        )}
                                    >
                                        {(booking.status as any) === 3
                                            ? "Done"
                                            : (booking.status as any) === 2
                                            ? "Inprogress"
                                            : "Waiting"}
                                    </p>
                                </div>
                            </div>
                            <div className="lg:flex justify-content-between w-10 mt-5">
                                <div className="w-20rem">
                                    <h3>From</h3>
                                    <p className="text-2xl ml-5 font-medium ">
                                        {formatBookingTime(booking.fromTime)}
                                    </p>
                                </div>
                                <div className="w-20rem">
                                    <h3>To</h3>
                                    <p className="text-2xl ml-5 font-medium ">
                                        {formatBookingTime(booking.toTime)}
                                    </p>
                                </div>
                            </div>
                            <div className=" mt-5">
                                <h3>Service</h3>
                                <div className="text-2xl ml-5 font-medium ">
                                    {booking.services?.map((e: ServiceType) => {
                                        return (
                                            <p key={e.id}>
                                                {e.id}-{e.name}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="mt-4 h-20rem">
                                <h3>Note</h3>
                                <p className="text-2xl ml-5 font-medium ">
                                    {booking.note}
                                </p>
                            </div>
                        </div>
                    </>
                )}
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
