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
import Tooltip from "tooltip.js";

const data: any[] = [
    {
        id: "NPLUS0001",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        bookingDate: "14/07/2023",
        fromTime: "14:00 15/07/2023",
        totime: "16:00 15/07/2023 ",
        status: "Inprogress",
    },
    {
        id: "BC123",
        customerName: "Minh Tri",
        phoneNumber: "0905124124",
        bookingDate: "14/07/2023",
        fromTime: "14:00 16/07/2023",
        totime: "16:00 16/07/2023 ",
        status: "Done",
    },
    {
        id: "NPLUS0002",
        customerName: "Nhat Huy",
        phoneNumber: "0905124124",
        bookingDate: "14/07/2023",
        fromTime: "14:00 17/07/2023",
        totime: "17:00 17/07/2023 ",
        status: "Waiting",
    },
];

type EventType = {
    title: string;
    start: string;
    end: string;
    description?: string;
    resourceId: string;
};

const inititalEventData = () => {
    const event: any[] = [];
    data.map((booking) => {
        event.push({
            title: booking?.customerName,
            start: formatDateCalendar(booking?.fromTime),
            end: formatDateCalendar(booking?.totime),
            description: `${
                booking.customerName
            } booking at ${formatDateCalendar(
                booking?.fromTime
            )} to ${formatDateCalendar(booking?.totime)}`,
            resourceId: booking?.id,
        });
    });
    return event;
};
const inititalResourceData = () => {
    const resource: any[] = [];
    data.map((booking) => {
        resource.push({
            id: booking?.id,
            title: booking?.customerName,
            eventColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
        });
    });
    return resource;
};

const CalendarPage = () => {
    const router = useRouter();
    const { trans } = useTrans();
    const [isLoading, setIsLoading] = useState(false);

    const [resourceData, setResourceData] = useState(inititalResourceData);
    const [eventData, setEventData] = useState<EventType[]>(inititalEventData);

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
                    eventClick={(e) => {
                        console.log(e.event._def.resourceIds);
                        router.push(
                            `/manage/booking/${e.event._def.resourceIds}`
                        );
                    }}
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
                    eventDidMount={(info) => {
                        var tooltip = new Tooltip(info.el, {
                            title: info.event.extendedProps.description,
                            placement: "top",
                            trigger: "hover",
                            container: "body",
                            html: true,
                        });
                    }}
                />
            </div>
        </>
    );
};
CalendarPage.getLayout = function getLayout(page: React.ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};
export default CalendarPage;
