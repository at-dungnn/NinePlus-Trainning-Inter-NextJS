import React, { Suspense, useContext, useEffect, useState } from "react";
import ManageLayout from "@/layout/manageLayout/layout";
import { customerService } from "@/shared/services/customerService";
import SkeletonTable from "./components/SkeletonTable";
import CustomerTable from "./components/CustomerTable";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import { BreadCrumb } from "primereact/breadcrumb";
import useTrans from "@/shared/hooks/useTrans";
import { useRouter } from "next/router";

const CustomerManage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [customerData, setCustomerData] = useState(null);
    const apiFetch = new customerService();
    const { trans } = useTrans();
    const { Breadcrumbs, setBreadcrumbs, AppBreadcrumbProps } =
        useContext(BreadcrumbContext);
    useEffect(() => {
        setBreadcrumbs({
            labels: [
                { label: trans.breadcrump.customer.title },
                { label: trans.breadcrump.customer.list },
            ],
            to: "/customer",
        });
    }, [router.locale]);

    useEffect(() => {
        apiFetch.getCustomer("").then((res: any) => {
            setCustomerData(res);
            setIsLoading(false);
        });
    }, [router.locale]);
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
                <div className="m-2 ml-5 bg-white h-full">
                    <SkeletonTable />
                </div>
            </>
        );
    }
    return (
        <div className="h-auto">
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
            <div className="m-2 ml-5 bg-white h-full">
                <CustomerTable
                    tableData={customerData}
                    setTableData={setCustomerData}
                />
            </div>
        </div>
    );
};

CustomerManage.getLayout = function getLayout(page: React.ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default CustomerManage;
