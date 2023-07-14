/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { classNames } from "primereact/utils";
import React, {
    forwardRef,
    useContext,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { AppTopbarRef } from "@/types/types";
import { LayoutContext } from "../context/LayoutContext";
import { SelectButton } from "primereact/selectbutton";
import useTrans from "@/shared/hooks/useTrans";
import { useRouter } from "next/router";

const ManageTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
        useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const router = useRouter();
    const [transVal, setTransVal] = useState(router.locale);
    const { changeLang } = useTrans();
    const langOptions = ["en", "vi"];

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

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
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Link href="/documentation">
                    <button
                        type="button"
                        className="p-link layout-topbar-button"
                    >
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
                <SelectButton
                    value={transVal}
                    onChange={(e) => {
                        setTransVal(e.value);
                        changeLang(e.value);
                    }}
                    options={langOptions}
                />
            </div>
        </div>
    );
});

ManageTopbar.displayName = "ManageTopbar";

export default ManageTopbar;
