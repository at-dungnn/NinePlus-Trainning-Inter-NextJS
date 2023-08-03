/* eslint-disable react-hooks/exhaustive-deps */

import Head from "next/head";
import { useRouter } from "next/router";
import {
    useEventListener,
    useMountEffect,
    useUnmountEffect,
} from "primereact/hooks";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useRef } from "react";
import ManageSidebar from "./ManageSidebar";
import ManageTopbar from "./ManageTopbar";
import { LayoutContext } from "@/layout/context/LayoutContext";
import PrimeReact from "primereact/api";
import { ChildContainerProps, LayoutState, AppTopbarRef } from "@/types/types";
import { log } from "console";
import { BreadcrumbProvider } from "@/layout/context/BreadcrumbContext";
import AppConfig from "./AppConfig";
import { ToastProvider } from "@/layout/context/ToastContext";

const ManageLayout = ({ children }: ChildContainerProps) => {
    const { layoutConfig, layoutState, setLayoutState } =
        useContext(LayoutContext);
    const topbarRef = useRef<AppTopbarRef>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
        useEventListener({
            type: "click",
            listener: (event) => {
                console.log(event.target);
                const isOutsideClicked = !(
                    sidebarRef.current?.isSameNode(event.target as Node) ||
                    sidebarRef.current?.contains(event.target as Node) ||
                    topbarRef.current?.menubutton?.isSameNode(
                        event.target as Node
                    ) ||
                    topbarRef.current?.menubutton?.contains(
                        event.target as Node
                    )
                );

                if (isOutsideClicked) {
                    hideMenu();
                }
            },
        });

    const [
        bindProfileMenuOutsideClickListener,
        unbindProfileMenuOutsideClickListener,
    ] = useEventListener({
        type: "click",
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current?.topbarmenu?.isSameNode(
                    event.target as Node
                ) ||
                topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
                topbarRef.current?.topbarmenubutton?.isSameNode(
                    event.target as Node
                ) ||
                topbarRef.current?.topbarmenubutton?.contains(
                    event.target as Node
                )
            );

            if (isOutsideClicked) {
                hideProfileMenu();
            }
        },
    });

    const hideMenu = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: false,
        }));
        unbindProfileMenuOutsideClickListener();
    };

    const blockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.add("blocked-scroll");
        } else {
            document.body.className += " blocked-scroll";
        }
    };

    const unblockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.remove("blocked-scroll");
        } else {
            document.body.className = document.body.className.replace(
                new RegExp(
                    "(^|\\b)" +
                        "blocked-scroll".split(" ").join("|") +
                        "(\\b|$)",
                    "gi"
                ),
                " "
            );
        }
    };

    useMountEffect(() => {
        PrimeReact.ripple = true;
    });

    useEffect(() => {
        if (
            layoutState.overlayMenuActive ||
            layoutState.staticMenuMobileActive
        ) {
            bindMenuOutsideClickListener();
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible]);

    useEffect(() => {
        router.events.on("routeChangeComplete", () => {
            hideMenu();
            hideProfileMenu();
        });
    }, []);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

    const containerClass = classNames("layout-wrapper", {
        "layout-overlay": layoutConfig.menuMode === "overlay",
        "layout-static": layoutConfig.menuMode === "static",
        "layout-static-inactive":
            layoutState.staticMenuDesktopInactive &&
            layoutConfig.menuMode === "static",
        "layout-overlay-active": layoutState.overlayMenuActive,
        "layout-mobile-active": layoutState.staticMenuMobileActive,
        "p-input-filled": layoutConfig.inputStyle === "filled",
        "p-ripple-disabled": !layoutConfig.ripple,
    });

    return (
        <React.Fragment>
            <Head>
                <title>Manage Spa</title>
            </Head>

            <div className={containerClass}>
                <ManageTopbar ref={topbarRef} />
                <div ref={sidebarRef} className="manage-layout-sidebar">
                    <ManageSidebar />
                </div>
                <div className="layout-main-container">
                    <div className="layout-main border-round-2xl pb-3 shadow-2">
                        <BreadcrumbProvider>
                            <ToastProvider>{children}</ToastProvider>
                        </BreadcrumbProvider>
                    </div>
                </div>
                <AppConfig />
                <div className="layout-mask"></div>
            </div>
        </React.Fragment>
    );
};

export default ManageLayout;
