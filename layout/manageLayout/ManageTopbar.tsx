/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { AppTopbarRef } from "@/types/types";
import { LayoutContext } from "../context/LayoutContext";
import useTrans from "@/shared/hooks/useTrans";
import { useRouter } from "next/router";
import { Dropdown } from "primereact/dropdown";
import { Avatar } from "primereact/avatar";
import { TieredMenu } from "primereact/tieredmenu";

const ManageTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
        useContext(LayoutContext);
    const [user, setUser] = useState<any>();
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const profileMenu = useRef(null);

    const topbarmenubuttonRef = useRef(null);
    const router = useRouter();
    const { changeLang } = useTrans();
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("USER") as any) || null);
    }, [router.locale]);
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));
    const profileOption = [
        { label: "Profile", visible: user !== null },
        {
            label: "Settings",
            visible: user !== null,
        },
        {
            label: "Language",
            visible: user !== null,
            items: [
                {
                    label: "VN",
                    command: () => {
                        changeLang("vi");
                    },
                },
                {
                    label: "EN",
                    command: () => {
                        changeLang("en");
                    },
                },
            ],
        },

        { label: "Log In", visible: user === null },
        { label: "Sign Up", visible: user === null },

        {
            separator: true,
            visible: user !== null,
        },

        {
            label: "Log Out",
            command: () => {
                localStorage.removeItem("USER");
                router.push("/");
            },
            visible: user !== null,
        },
    ];
    return (
        <div className="manage-layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <span>SPA MANAGE</span>
            </Link>
            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            >
                <i className="pi pi-ellipsis-v" />
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames("layout-topbar-menu", {
                    "layout-topbar-menu-mobile-active":
                        layoutState.profileSidebarVisible,
                })}
            >
                <div className="flex gap-8 w-24rem justify-content-end ">
                    <div className="card p-2 right-0 ">
                        <div
                            onClick={(event) => {
                                (profileMenu.current as any).toggle(event);
                            }}
                            className="  p-link flex align-items-center h-4 p-0"
                        >
                            <Avatar
                                image={
                                    user?.avatarUrl !== null
                                        ? user?.avatarUrl
                                        : "https://t3.ftcdn.net/jpg/05/00/54/28/360_F_500542898_LpYSy4RGAi95aDim3TLtSgCNUxNlOlcM.jpg"
                                }
                                className="mr-2"
                                shape="circle"
                            />
                            <div className="flex flex-column align">
                                <span className="font-bold">
                                    {user?.employeeNo}
                                </span>
                                <span className="text-sm">{user?.email}</span>
                            </div>
                        </div>
                        <TieredMenu
                            ref={profileMenu}
                            popup
                            model={profileOption as any}
                            id="profilePopup"
                            className="mt-3 mr-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

ManageTopbar.displayName = "ManageTopbar";

export default ManageTopbar;
