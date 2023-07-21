import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import ManageLayout from "@/layout/manageLayout/layout";
import useTrans from "@/shared/hooks/useTrans";
import { useRouter } from "next/router";
import { BreadCrumb } from "primereact/breadcrumb";
import {
    ReactElement,
    ReactNode,
    Suspense,
    useContext,
    useEffect,
    useState,
} from "react";

const BookingManagePage = () => {
    const router = useRouter();
    const { trans } = useTrans();
    const { Breadcrumbs, setBreadcrumbs, AppBreadcrumbProps } =
        useContext(BreadcrumbContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setBreadcrumbs({
            labels: [
                { label: "Booking" },
                { label: trans.breadcrump.customer.list },
            ],
            to: "/booking",
        });
    }, [router.locale]);
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
                {/* <BookingTable /> */}
            </div>
        </div>
    );
};

BookingManagePage.getLayout = function getLayout(page: ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};
export default BookingManagePage;
