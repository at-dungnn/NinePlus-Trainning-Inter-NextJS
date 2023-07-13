// import React from "react";
// // import NotFound from "@/src/pages/pages/notfound/index";
// import NotFoundPage from "./pages/notfound";
// import { Page } from "@/types/types";

// const Custom404: Page = () => {
//     return <NotFound />;
// };

// Custom404.getLayout = function getLayout(page) {
//     return page;
// };

// export default Custom404;

import React from "react";
import NotFoundPage from "./pages/notfound";
import { Page } from "@/types/types";

const Custom404: Page = () => {
    return <NotFoundPage />;
};

Custom404.getLayout = function getLayout(page) {
    return page;
};

export default Custom404;
