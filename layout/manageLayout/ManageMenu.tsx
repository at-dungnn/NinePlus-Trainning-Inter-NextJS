/* eslint-disable @next/next/no-img-element */

import React, { useContext } from "react";
import ManageMenuitem from "./ManageMenuitem";
import { LayoutContext } from "../context/LayoutContext";
import { MenuProvider } from "../context/MenuContext";
import { ManageMenuProvider } from "../context/ManageMenuContext";
import Link from "next/link";
import { AppMenuItem } from "@/types/types";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    // Change icon and routing here
    const model: AppMenuItem[] = [
        {
            label: "Main Menu",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-chart-bar",
                    to: "/dashboard",
                },
                {
                    label: "Employee",
                    icon: "pi pi-fw pi-users",
                    to: "/employee",
                },
                { label: "Service", icon: "pi pi-fw pi-book", to: "/service" },
                {
                    label: "Customer",
                    icon: "pi pi-fw pi-user ",
                    to: "/customer",
                },
                {
                    label: "Booking",
                    icon: "pi pi-fw pi-calendar-plus",
                    to: "/manage/booking",
                },
                {
                    label: "User",
                    icon: "pi pi-fw pi-user-edit",
                    to: "/user",
                },
                { label: "Setting", icon: "pi pi-fw pi-cog", to: "/setting" },
            ],
        },
    ];

    return (
        <ManageMenuProvider>
            <ul className="manage-layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <ManageMenuitem
                            item={item}
                            root={true}
                            index={i}
                            key={item.label}
                        />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </ManageMenuProvider>
    );
};

export default AppMenu;
