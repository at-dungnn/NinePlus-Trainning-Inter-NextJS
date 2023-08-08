import { useRouter } from "next/router";
import ManageLayout from "@/layout/manageLayout/layout";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import useTrans from "@/shared/hooks/useTrans";
import { BreadCrumb } from "primereact/breadcrumb";
import BookingForm from "@/shared/components/BookingForm";
import { Button } from "primereact/button";
import { BookingType } from "@/types/user";
import {
    BookingService,
    ServicesManageService,
} from "@/shared/services/BookingService";
import { ProgressSpinner } from "primereact/progressspinner";
import { checkFilled } from "@/shared/tools";
import { ToastContext } from "@/layout/context/ToastContext";

const CreateBooking = () => {
    const { showToast } = useContext(ToastContext);
    const apiFetch = new BookingService();
    const serviceFetch = new ServicesManageService();
    const router = useRouter();
    const [service, setService] = useState();
    const [booking, setBooking] = useState<BookingType>({
        customerId: "",
        serviceId: [""],
        bookingDate: String(new Date().toISOString()),
        fromTime: String(new Date().toISOString()),
        toTime: String(new Date().toISOString()),
    });
    const { trans } = useTrans();
    const [isLoading, setIsLoading] = useState(true);
    const { Breadcrumbs, setBreadcrumbs, AppBreadcrumbProps } =
        useContext(BreadcrumbContext);
    useEffect(() => {
        serviceFetch.getServices("").then((resp: any) => {
            setService(resp);
            setIsLoading(false);
        });

        setBreadcrumbs({
            labels: [{ label: "Booking" }, { label: "Create" }],
        });
    }, [router.query.slug, router.locale]);
    const handleSubmit = (e: any) => {
        console.log(booking);
        const { isFilled, errorString } = checkFilled(booking, trans);
        if (isFilled) {
            apiFetch.createBooking("", booking).then((resp: any) => {
                if (resp?.succeeded) {
                    showToast({
                        severity: "success",
                        summary: trans.toast.success,
                        detail: trans.toast.detail.add,
                    });
                    router.push("/manage/booking");
                } else {
                    showToast({
                        severity: "error",
                        summary: trans.toast.error,
                        detail: `${resp?.messages}`,
                    });
                }
            });
        } else {
            showToast({
                severity: "warn",
                summary: trans.toast.warn,
                detail: errorString || "Field missing or wrong format",
            });
        }
    };
    if (isLoading === true)
        return (
            <div className=" flex justify-content-center align-items-center h-screen ">
                <ProgressSpinner />
            </div>
        );

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
            <div className="m-2 ml-5 p-5 bg-white  border-round-2xl relative h-full grid ">
                <h1 className="col-3 text-4xl font-bold">Create Booking</h1>
                <div className="col-7    mt-3">
                    <BookingForm
                        booking={booking}
                        setBooking={setBooking}
                        disabled={false}
                        serviceList={service}
                    >
                        <div className="mt-5">
                            <Button
                                label={"Create Booking"}
                                onClick={handleSubmit}
                                className="text-xl font-light"
                            />
                        </div>
                    </BookingForm>
                </div>
                <h3
                    className="absolute right-0 top-0 mt-5 mr-5 cursor-pointer"
                    onClick={() => {
                        router.push("/manage/booking");
                    }}
                >
                    X
                </h3>
            </div>
        </>
    );
};

CreateBooking.getLayout = function getLayout(page: React.ReactElement) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default CreateBooking;
