import ManageLayout from "@/layout/manageLayout/layout";
import { Page } from "@/types/layout";
import { useRouter } from "next/router";
import { ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { data } from "./components/CustomerTable";
import CustomerForm from "@/shared/components/CustomerForm/CustomerForm";
import { Button } from "primereact/button";
import { Customer } from "@/types/user";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dialog } from "primereact/dialog";
import BookingHistory from "./components/BookingHistory";
import useTrans from "@/shared/hooks/useTrans";

const DetailPage = () => {
    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);
    const router = useRouter();
    const details = data.filter((val) => {
        return val.id === router.query.id;
    });
    const { trans } = useTrans();
    const [visible, setVisible] = useState(false);
    const [customer, setCustomer] = useState<Customer>(details[0]);
    useEffect(() => {
        setCustomer(details[0]);
        setBreadcrumbs(() => ({
            labels: [
                { label: "Customer", url: "/customer" },
                { label: "Detail" },
                { label: `${router.query.id}` },
            ],
        }));
    }, [router.query.id]);
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
            <div className="m-2 ml-5 p-5 bg-white  border-round-2xl relative ">
                <h2 className="font-bold">{trans.detail.title}</h2>
                <div className="customer-detail margin-center">
                    <CustomerForm
                        Customer={customer}
                        readonly={true}
                        setCustomer={setCustomer}
                    >
                        <div className="mt-5 ">
                            <Button
                                label="Back"
                                onClick={() => {
                                    router.back();
                                }}
                            />
                        </div>
                    </CustomerForm>
                </div>
                <div className="history-button absolute">
                    <Button
                        label="Booking History"
                        outlined
                        style={{ width: "15rem" }}
                        onClick={() => setVisible(true)}
                    />
                    <Dialog
                        draggable={false}
                        header={
                            <h2 className="text-blue-400">Booking History</h2>
                        }
                        visible={visible}
                        onHide={() => setVisible(false)}
                        style={{ width: "50vw" }}
                        maximizable
                        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                    >
                        <BookingHistory />
                        <div className="h-full">
                            <Button
                                label="Cancel"
                                outlined
                                style={{
                                    width: "15rem",
                                    marginTop: "2rem",
                                    marginLeft: "calc((100% - 15rem)/2)",
                                }}
                                onClick={() => setVisible(false)}
                            />
                        </div>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

DetailPage.getLayout = function getLayout(page: ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default DetailPage;
