import React, { Suspense, useContext, useEffect, useState } from "react";
import ManageLayout from "@/layout/manageLayout/layout";
import { Button } from "primereact/button";
import { CustomerService } from "@/shared/services";
import SkeletonTable from "../components/SkeletonTable";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import { BreadCrumb } from "primereact/breadcrumb";
import { CustomerForm } from "@/shared/components/CustomerForm/index.d";
import { Customer } from "@/types/types";
import { useRouter } from "next/router";
import { checkFilled } from "@/shared/tools";
import { ToastContext } from "@/layout/context/ToastContext";
import useTrans from "@/shared/hooks/useTrans";

type PageProps = {
    data: any;
};

const CustomerManage = (props: PageProps) => {
    const apiFetch = new CustomerService();
    const { trans } = useTrans();
    const { showToast } = useContext(ToastContext);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { Breadcrumbs, setBreadcrumbs, AppBreadcrumbProps } =
        useContext(BreadcrumbContext);
    const [newCustomer, setNewCustomer] = useState<Customer>({
        customerName: "",
        phoneNumber: "",
        totalMoney: 0,
    });
    useEffect(() => {
        setBreadcrumbs((BreadCrumbs) => {
            return {
                ...BreadCrumbs,
                labels: [
                    {
                        label: trans.breadcrump.customer.title,
                        url: "/customer",
                    },
                    { label: "Add New", url: "/addnew" },
                ],
            };
        });
    }, []);

    const handleSubmit = () => {
        // console.log(newCustomer);
        const { isFilled, errorString } = checkFilled(newCustomer, trans);
        if (isFilled) {
            apiFetch.createCustomer("", newCustomer).then((resp: any) => {
                console.log(resp);
                if (resp?.succeeded) {
                    showToast({
                        severity: "success",
                        summary: trans.toast.success,
                        detail: trans.toast.detail.add,
                    });
                    router.push("/customer");
                } else {
                    console.log(resp);
                    showToast({
                        severity: "error",
                        summary: trans.toast.error,
                        detail: resp.resp?.messages[0]
                            ? resp?.messages[0]
                            : trans.toast.detail.format,
                    });
                }
            });
        } else {
            showToast({
                severity: "warn",
                summary: trans.toast.warn,
                detail: errorString || trans.toast.detail.format,
            });
        }
    };

    if (isLoading === true) {
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
                <div className="m-2 bg-white">
                    <SkeletonTable />
                </div>
            </>
        );
    }
    return (
        <div className="h-full">
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
                <h2 className="font-bold">{trans.customer.addnew.title}</h2>
                <div className="grid ">
                    <div className="col-3">
                        <h5>{trans.customer.addnew.content_title}</h5>
                        <p className="text-teal-600 text-lg text-justify     ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum
                        </p>
                    </div>

                    <CustomerForm
                        Customer={newCustomer}
                        setCustomer={setNewCustomer}
                        readonly={false}
                        newCustomer={true}
                    >
                        <div className="mt-5">
                            <Button
                                label={trans.customer.update.save_label}
                                onClick={handleSubmit}
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
        </div>
    );
};
CustomerManage.getLayout = function getLayout(page: React.ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default CustomerManage;
