import ManageLayout from "@/layout/manageLayout/layout";
import { useRouter } from "next/router";
import { ReactNode, Suspense, useContext, useEffect, useState } from "react";
import CustomerForm from "@/shared/components/CustomerForm/CustomerForm";
import { Button } from "primereact/button";
import { Customer } from "@/types/user";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dialog } from "primereact/dialog";
import BookingHistory from "./components/BookingHistory";
import useTrans from "@/shared/hooks/useTrans";
import { CustomerService } from "@/shared/services";
import { ProgressSpinner } from "primereact/progressspinner";

const DetailPage = () => {
    const router = useRouter();
    const apiFetch = new CustomerService();
    const { trans } = useTrans();
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);
    const [customer, setCustomer] = useState<Customer>({
        customerName: "",
        phoneNumber: "",
    });
    useEffect(() => {
        setBreadcrumbs({
            labels: [
                { label: trans.breadcrump.customer.title },
                { label: trans.breadcrump.customer.detail },
                { label: `${router.query.id}` },
            ],
        });
        if (router.query.id) {
            apiFetch.getCustomer(`${router.query.id}`).then((resp: any) => {
                // console.log(resp);
                setCustomer(resp);
                setIsLoading(false);
            });
        }
    }, [router.query.id, router.locale]);
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
                <h2 className="font-bold">{trans.customer.detail.title}</h2>
                {isLoading ? (
                    <>
                        <div className="card flex justify-content-center align-items-center h-30rem">
                            <ProgressSpinner />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="customer-detail margin-center">
                            <CustomerForm
                                Customer={customer}
                                readonly={true}
                                setCustomer={setCustomer}
                            >
                                <div className="mt-5 ">
                                    <Button
                                        label={trans.customer.detail.back}
                                        onClick={() => {
                                            router.push("/customer");
                                        }}
                                    />
                                </div>
                            </CustomerForm>
                        </div>
                        <div className="history-button absolute">
                            <Button
                                label={trans.customer.detail.booking_history}
                                outlined
                                style={{ width: "15rem" }}
                                onClick={() => setVisible(true)}
                            />
                            <Dialog
                                draggable={false}
                                header={
                                    <h2 className="text-blue-400">
                                        {trans.customer.detail.booking_history}
                                    </h2>
                                }
                                visible={visible}
                                onHide={() => setVisible(false)}
                                style={{ width: "50vw" }}
                                maximizable
                                breakpoints={{
                                    "960px": "75vw",
                                    "641px": "100vw",
                                }}
                            >
                                <BookingHistory id={router.query.id} />
                                <div className="h-full">
                                    <Button
                                        label={
                                            trans.customer.detail.cancel_label
                                        }
                                        outlined
                                        style={{
                                            width: "15rem",
                                            marginTop: "2rem",
                                            marginLeft:
                                                "calc((100% - 15rem)/2)",
                                        }}
                                        onClick={() => setVisible(false)}
                                    />
                                </div>
                            </Dialog>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

DetailPage.getLayout = function getLayout(page: ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default DetailPage;
