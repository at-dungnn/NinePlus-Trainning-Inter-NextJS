import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";

const CustomerDetail = ({ id }: { id: string }) => {
    const [visibleSideBar, setVisibleSideBar] = useState(false);
    return (
        <>
            <Button
                label="Details"
                severity="success"
                outlined
                onClick={(e) => {
                    setVisibleSideBar(true);
                }}
            />
            <Sidebar
                visible={visibleSideBar}
                position="right"
                onHide={() => setVisibleSideBar(false)}
            >
                <h2>Customer Detail</h2>
                <p>this is id: {id}</p>
            </Sidebar>
        </>
    );
};
export default CustomerDetail;
