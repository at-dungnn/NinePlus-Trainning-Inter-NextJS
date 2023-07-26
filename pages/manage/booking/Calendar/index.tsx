import { BreadcrumbContext } from "@/layout/context/BreadcrumbContext";
import ManageLayout from "@/layout/manageLayout/layout";
import useTrans from "@/shared/hooks/useTrans";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import listPlugin from "@fullcalendar/list";
import { useRouter } from "next/router";
import { BreadCrumb } from "primereact/breadcrumb";
import { Suspense, useContext, useEffect, useState } from "react";
import { formatDateCalendar } from "@/shared/tools/formatDate";
const data: any[] = [
    {
        id: "NPLUS0001",
        name: "Nhat Huy",
        phone: "0905124124",
        bookingDate: "14/07/2023",
        from: "14:00 15/07/2023",
        to: "16:00 15/07/2023 ",
        status: "Inprogress",
    },
    {
        id: "BC123",
        name: "Minh Tri",
        phone: "0905124124",
        bookingDate: "14/07/2023",
        from: "14:00 16/07/2023",
        to: "16:00 16/07/2023 ",
        status: "Done",
    },
    {
        id: "NPLUS0002",
        name: "Nhat Huy",
        phone: "0905124124",
        bookingDate: "14/07/2023",
        from: "14:00 17/07/2023",
        to: "17:00 17/07/2023 ",
        status: "Waiting",
    },
];

const initialData = {
    event: [{}],
    resource: [{}],
};

type EventType = {
    title: string;
    start: string;
    end: string;
    resourceId: string;
};

const CalendarPage = () => {
    const router = useRouter();
    const { trans } = useTrans();
    const [isLoading, setIsLoading] = useState(false);
    const [calendarData, setCalendatData] = useState(initialData);
    const [resourceData, setResourceData] = useState([
        {
            title: "Event A",
            id: "NPLUS0002",
            eventColor: "#19ecff",
        },
    ]);
    const [eventData, setEventData] = useState<EventType[]>([
        {
            title: "Event A",
            start: "2023-07-24 13:15",
            end: "2023-07-24 15:15",
            resourceId: "NPLUS0002",
        },
    ]);

    useEffect(() => {
        data?.map((booking) => {
            console.log(booking);

            setEventData([
                ...eventData,
                {
                    title: booking?.name,
                    start: formatDateCalendar(booking?.from),
                    end: formatDateCalendar(booking?.to),
                    resourceId: booking?.id,
                },
            ]);
            setResourceData([
                ...resourceData,
                {
                    id: booking?.id,
                    title: booking?.name,
                    eventColor: "#0f41f5",
                },
            ]);
        });
        console.log(eventData, resourceData);
    }, []);

    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);
    useEffect(() => {
        setBreadcrumbs({
            labels: [{ label: "Booking" }, { label: "Calendar" }],
        });
    }, [router.query.slug, router.locale]);

    if (isLoading) return "Loading...";
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
            <div className="m-2 ml-5 p-5 bg-white  border-round-2xl relative w-auto ">
                <FullCalendar
                    themeSystem=""
                    schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                    plugins={[
                        resourceTimelinePlugin,
                        dayGridPlugin,
                        timeGridPlugin,
                        listPlugin,
                    ]}
                    nowIndicator={true}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                    }}
                    resources={resourceData}
                    events={eventData}
                />
            </div>
        </>
    );
};
CalendarPage.getLayout = function getLayout(page: React.ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};
export default CalendarPage;
