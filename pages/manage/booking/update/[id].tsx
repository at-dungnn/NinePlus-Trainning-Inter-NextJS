import { useRouter } from "next/router";
import ManageLayout from "@/layout/manageLayout/layout";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import useTrans from "@/shared/hooks/useTrans";
import { BreadCrumb } from "primereact/breadcrumb";
import { classNames } from "primereact/utils";
import BookingForm from "@/shared/components/BookingForm";
import { Button } from "primereact/button";
import { BookingType } from "@/types/user";

const data: BookingType = {
    id: "A0005",
    name: "Donnete",
    phone: "090321512",
    bookingDate: "12/05/2023",
    from: "14:00 13/05/2023",
    to: "16:00 13/05/2023",
    service: "DV001-Massage",
    note: "Note description",
};

const UpdateBooking = () => {
    const router = useRouter();
    const [booking, setBooking] = useState<BookingType>(data);
    const { trans } = useTrans();
    const [isLoading, setIsLoading] = useState(false);
    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);
    useEffect(() => {
        // setCustomer(details[0]);
        console.log(router.query.slug);

        setBreadcrumbs({
            labels: [{ label: "Booking" }, { label: "Create" }],
        });
    }, [router.query.slug, router.locale]);
    if (isLoading === true) return <></>;
    const handleSubmit = (e: any) => {
        console.log(booking);
    };
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
                    <BookingForm booking={booking} setBooking={setBooking}>
                        <div className="mt-5">
                            <Button
                                label={"Update"}
                                onClick={handleSubmit}
                                className="text-xl font-light"
                            />
                            <Button
                                label={"Cancel"}
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
