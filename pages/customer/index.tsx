import { Page } from "@/types/layout";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import ManageLayout from "@/layout/manageLayout/layout";
import { customerService } from "@/shared/services/customerService";
import SkeletonTable from "./components/SkeletonTable";
import CustomerTable from "./components/CustomerTable";
import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import { BreadCrumb } from "primereact/breadcrumb";
import useTrans from "@/shared/hooks/useTrans";
import { useRouter } from "next/router";

type PageProps = {
    data: any;
};

type Customer = {
    name: string;
    age: number;
    booking: [];
    loadingState: boolean;
};

const CustomerManage = (props: PageProps) => {
    const router = useRouter();
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
    const [isLoading, setIsLoading] = useState(false);

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
                <CustomerTable />
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    // TODO/ add api
    // const apiService = new customerService();
    // const res = await fetch(`https://.../data`);
    // const data = await res.json();
    const data: Customer = {
        name: "leon",
        age: 4,
        booking: [],
        loadingState: true,
    };
    return { props: { data } };
};
CustomerManage.getLayout = function getLayout(page: React.ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default CustomerManage;
