import React from "react";
import NotFoundPage from "./pages/notfound";
import NotFound from "@/pages/pages/notfound/index";
import { Page } from "@/types/types";

const Custom404: Page = () => {
    return <NotFoundPage />;
};

Custom404.getLayout = function getLayout(page) {
    return page;
};

export default Custom404;
