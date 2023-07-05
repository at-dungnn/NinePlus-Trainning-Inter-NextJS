"use client";
import { Page } from "@/types/layout";
import React, { useState } from "react";
import { Skeleton } from "primereact/skeleton";
import { GetServerSideProps, GetStaticProps } from "next";
import ManageLayout from "@/layout/manageLayout/layout";
import { customerService } from "@/shared/services/customerService";
import SkeletonTable from "./components/SkeletonTable";
import CustomerTable from "./components/CustomerTable";

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
    const [isLoading, setIsLoading] = useState(true);
    // setTimeout(() => {
    //     setIsLoading(true);
    // }, 5000);
    if (isLoading === false) {
        return (
            <div className="m-2">
                <SkeletonTable />
            </div>
        );
    }
    return (
        <div>
            <div className="m-7 bg-white">
                <CustomerTable />
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
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
