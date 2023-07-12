import { Page } from "@/types/layout";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import ManageLayout from "@/layout/manageLayout/layout";
import { Button } from "primereact/button";
import { customerService } from "@/shared/services/customerService";
import SkeletonTable from "../components/SkeletonTable";
import { BreadcrumContext } from "@/layout/context/breadcrumpcontext";
import { BreadCrumb } from "primereact/breadcrumb";
import { CustomerForm } from "@/shared/components/CustomerForm/index.d";
import { Customer } from "@/types/types";
import { useRouter } from "next/router";
import { checkFilled } from "@/shared/tools";
import { ToastContext } from "@/layout/context/toastcontext";

type PageProps = {
    data: any;
};

const CustomerManage = (props: PageProps) => {
    const { showToast } = useContext(ToastContext);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumContext);
    const [newCustomer, setNewCustomer] = useState<Customer>({
        id: "",
        name: "",
        phone: "",
    });
    useEffect(() => {
        setBreadcrumbs((BreadCrumbs) => {
            return {
                ...BreadCrumbs,
                labels: [
                    { label: "Customer", url: "/customer" },
                    { label: "Add New", url: "/addnew" },
                ],
            };
        });
    }, []);

    const handleSubmit = () => {
        showToast({
            severity: "success",
            summary: "Success",
            detail: "Add Success",
        });
        console.log(checkFilled(newCustomer));
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
                <h2 className="font-bold">Add new</h2>
                <div className="grid ">
                    <div className="col-3">
                        <h5>Profile</h5>
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
                    >
                        <div className="mt-5">
                            <Button label="Save" onClick={handleSubmit} />
                            <Button
                                label="Cancel"
                                outlined
                                onClick={() => {
                                    router.back();
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

// export const getStaticProps: GetStaticProps = async () => {
//     // const apiService = new customerService();
//     // const res = await fetch(`https://.../data`);
//     // const data = await res.json();
//     const data: Customer = {
//         name: "leon",
//         age: 4,
//         booking: [],
//         loadingState: true,
//     };
//     return { props: { data } };
// };
CustomerManage.getLayout = function getLayout(page: React.ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};

export default CustomerManage;
