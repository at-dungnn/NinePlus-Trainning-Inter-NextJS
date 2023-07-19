import ManageLayout from "@/layout/manageLayout/layout";
import { Page } from "@/types/layout";
import { useRouter } from "next/router";
import { ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { data } from "../components/CustomerTable";
import CustomerForm from "@/shared/components/CustomerForm/CustomerForm";
import { Button } from "primereact/button";
import { Customer } from "@/types/user";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import { BreadCrumb } from "primereact/breadcrumb";
import { ToastContext } from "@/layout/context/ToastContext";
import useTrans from "@/shared/hooks/useTrans";

const DetailPage = () => {
    const { showToast } = useContext(ToastContext);
    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);
    const { trans } = useTrans();
    const router = useRouter();
    const details = data.filter((val: Customer) => {
        return val.id === router.query.id;
    });
    const [customer, setCustomer] = useState<Customer>(details[0]);
    useEffect(() => {
        setCustomer(details[0]);
        setBreadcrumbs(() => ({
            labels: [
                { label: trans.breadcrump.customer.title },
                { label: trans.breadcrump.customer.update },
                { label: `${router.query.id}` },
            ],
        }));
}, [router.query.id, router.locale]);
    const submitHandle = () => {
        showToast({
            severity: "success",
            summary: "Success",
            detail: "Update Success",
        });
        router.push("/customer");
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
                <h2 className="font-bold">{trans.customer.update.title}</h2>
                <div className="customer-update ml-8 ">
                    <CustomerForm Customer={customer} setCustomer={setCustomer}>
                        <div className="mt-5">
                            <Button
                                label={trans.customer.update.save_label}
                                onClick={submitHandle}
                            />
                            <Button
                                label={trans.customer.update.cancel_label}
                                outlined
                                onClick={() => {
                                    router.push("/customer");
                                }}
                                style={{ marginLeft: "3rem" }}
                            />
                        </div>
                    </CustomerForm>
                </div>
            </div>
        </>
    );
};

DetailPage.getLayout = function getLayout(page: ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default DetailPage;