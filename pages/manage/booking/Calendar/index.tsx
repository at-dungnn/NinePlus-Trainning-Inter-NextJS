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
import interactionPlugin from "@fullcalendar/interaction";
import Tooltip from "tooltip.js";
import allLocales from "@fullcalendar/core/locales-all";
import { BookingService } from "@/shared/services";
const apiFetch = new BookingService();

type EventType = {
    title: string;
    start: string;
    end: string;
    description?: string;
    resourceId: string;
};

const inititalEventData = (resp: any) => {
    const event: any[] = [];
    resp.map((booking: any) => {
        event.push({
            title: booking?.customerName,
            start: booking?.fromTime,
            end: booking?.toTime,
            description: `${
                booking.customerName
            } booking at ${formatDateCalendar(
                booking?.fromTime
            )} to ${formatDateCalendar(booking?.toTime)}`,
            resourceId: booking?.id,
        });
    });
    return event;
};
const inititalResourceData = (resp: any) => {
    const resource: any[] = [];
    resp.map((booking: any) => {
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
    const [isLoading, setIsLoading] = useState(true);

    const [resourceData, setResourceData] = useState<any>();
    const [eventData, setEventData] = useState<EventType[]>();

    const {
        Breadcrumbs,
        setBreadcrumbs,
        AppBreadcrumbProps,
        setAppBreadcrumbProps,
    } = useContext(BreadcrumbContext);
    useEffect(() => {
        setBreadcrumbs({
            labels: [
                { label: trans.breadcrump.booking.title },
                { label: trans.booking.calendar },
            ],
        });
        apiFetch.getBooking("").then((resp: any) => {
            setResourceData(inititalResourceData(resp));
            setEventData(inititalEventData(resp));
        });
        setIsLoading(false);
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
                    locales={allLocales}
                    locale={router.locale}
                    eventClick={(e) => {
                        console.log(e.event._def.resourceIds);
                        router.push(
                            `/manage/booking/${e.event._def.resourceIds}`
                        );
                    }}
                    schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                    editable={true}
                    plugins={[
                        interactionPlugin,
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
                    eventDidMount={(info) => {}}
                />
            </div>
        </>
    );
};
CalendarPage.getLayout = function getLayout(page: React.ReactNode) {
    return <ManageLayout>{page}</ManageLayout>;
};
export default CalendarPage;
