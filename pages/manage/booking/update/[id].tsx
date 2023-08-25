import { useRouter } from "next/router";
import ManageLayout from "@/layout/manageLayout/layout";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import useTrans from "@/shared/hooks/useTrans";
import { BreadCrumb } from "primereact/breadcrumb";
import BookingForm from "@/shared/components/BookingForm";
import { Button } from "primereact/button";
import { BookingType } from "@/types/user";
import { BookingService } from "@/shared/services";
import { ProgressSpinner } from "primereact/progressspinner";
import { checkFilled } from "@/shared/tools";
import { ToastContext } from "@/layout/context/ToastContext";
import { ServicesManageService } from "@/shared/services/BookingService";
import { mapService } from "@/shared/components/BookingForm/tools";

const UpdateBooking = () => {
    const { showToast } = useContext(ToastContext);
    const apiFetch = new BookingService();
    const serviceFetch = new ServicesManageService();
    const router = useRouter();
    const [booking, setBooking] = useState<BookingType>({
        customerName: "",
        phoneNumber: "",
        bookingDate: "",
        fromTime: "",
        toTime: "",
    });
    const [service, setService] = useState();
    const { trans } = useTrans();
    const [isLoading, setIsLoading] = useState(true);
    const { Breadcrumbs, setBreadcrumbs, AppBreadcrumbProps } =
        useContext(BreadcrumbContext);
    useEffect(() => {
        if (router.query.id) {
            apiFetch
                .getBookingDetail(`${router.query.id}`)
                .then((resp: any) => {
                    setBooking({
                        ...resp,
                        serviceId: mapService(resp.services),
                    });
                    serviceFetch.getServices("").then((resp: any) => {
                        setService(resp);
                        setIsLoading(false);
                    });
                });
        }

        setBreadcrumbs({
            labels: [
                { label: trans.breadcrump.booking.title },
                { label: trans.breadcrump.customer.update },
            ],
        });
    }, [router.query.id, router.locale]);

    const handleSubmit = (e: any) => {
        console.log(booking);
        const { isFilled, errorString } = checkFilled(booking, trans);
        if (isFilled) {
            apiFetch.updateBooking("", booking).then((resp: any) => {
                if (resp?.succeeded) {
                    showToast({
                        severity: "success",
                        summary: trans.toast.success,
                        detail: trans.toast.detail.update,
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
                <h1 className="col-3 text-4xl font-bold">
                    {trans.booking.update}
                </h1>
                <div className="col-7    mt-3">
                    <BookingForm
                        booking={booking}
                        setBooking={setBooking}
                        disabled={true}
                        serviceList={service}
                    >
                        <div className="mt-5">
                            <Button
                                label={trans.customer.update.save_label}
                                onClick={handleSubmit}
                                className="text-xl font-light"
                            />
                            <Button
                                label={trans.customer.update.cancel_label}
                                outlined
                                onClick={() => {
                                    router.push("/manage/booking");
                                }}
                                style={{ marginLeft: "3rem" }}
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

UpdateBooking.getLayout = function getLayout(page: React.ReactElement) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default UpdateBooking;
