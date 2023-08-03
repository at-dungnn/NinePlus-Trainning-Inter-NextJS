import ManageLayout from "@/layout/manageLayout/layout";
import { useRouter } from "next/router";
import { ReactNode, Suspense, useContext, useEffect, useState } from "react";
import CustomerForm from "@/shared/components/CustomerForm/CustomerForm";
import { Button } from "primereact/button";
import { Customer } from "@/types/user";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import { BreadCrumb } from "primereact/breadcrumb";
import { ToastContext } from "@/layout/context/ToastContext";
import useTrans from "@/shared/hooks/useTrans";
import { CustomerService } from "@/shared/services";
import { ProgressSpinner } from "primereact/progressspinner";
import { checkFilled } from "@/shared/tools";

const DetailPage = () => {
    const { showToast } = useContext(ToastContext);
    const apiFetch = new CustomerService();
    const { trans } = useTrans();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [customer, setCustomer] = useState<Customer>({
        id: "",
        customerName: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        totalMoney: 0,
    });
    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);

    useEffect(() => {
        setBreadcrumbs(() => ({
            labels: [
                { label: trans.breadcrump.customer.title },
                { label: trans.breadcrump.customer.update },
                { label: `${router.query.id}` },
            ],
        }));
        if (router.query.id) {
            apiFetch.getCustomer(`${router.query.id}`).then((resp: any) => {
                setCustomer({ id: String(router.query.id), ...resp });

                setIsLoading(false);
            });
        }
    }, [router.query.id, router.locale]);
    const submitHandle = () => {
        const { isFilled, errorString } = checkFilled(customer, trans);
        if (isFilled) {
            apiFetch.updateCustomer("", customer).then((resp: any) => {
                if (resp?.succeeded) {
                    showToast({
                        severity: "success",
                        summary: trans.toast.success,
                        detail: trans.toast.detail.update,
                    });
                    router.push("/customer");
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
                severity: "Warning",
                summary: trans.toast.warn,
                detail: errorString || "Field missing or wrong format",
            });
        }
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
            <div className="m-2 ml-5 bg-white h-full p-3 border-round-2xl ">
                {isLoading ? (
                    <>
                        <div className="card flex justify-content-center align-items-center h-30rem">
                            <ProgressSpinner />
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="font-bold">
                            {trans.customer.update.title}
                        </h2>
                        <div className="customer-update ml-8 ">
                            <CustomerForm
                                Customer={customer}
                                setCustomer={setCustomer}
                            >
                                <div className="mt-5">
                                    <Button
                                        label={trans.customer.update.save_label}
                                        onClick={submitHandle}
                                    />
                                    <Button
                                        label={
                                            trans.customer.update.cancel_label
                                        }
                                        outlined
                                        onClick={() => {
                                            router.push("/customer");
                                        }}
                                        style={{ marginLeft: "3rem" }}
                                    />
                                </div>
                            </CustomerForm>
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
