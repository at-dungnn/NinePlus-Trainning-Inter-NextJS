import ManageLayout from "@/layout/manageLayout/layout";
import { ReactNode } from "react";

export default function Dashboard() {
    return <h2>Dashboard routing</h2>;
}

Dashboard.getLayout = function getLayout(page: ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};
