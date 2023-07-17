import useTrans from "@/shared/hooks/useTrans";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dispatch, SetStateAction } from "react";
type dialogProps = {
    id: string;
    name: string;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
};
const DeleteDialog = ({ id, name, visible, setVisible }: dialogProps) => {
    const { trans } = useTrans();
    return (
        <Dialog
            header={trans.delete_title}
            visible={visible}
            modal={false}
            style={{ width: "40rem", height: "12rem", position: "relative" }}
            onHide={() => setVisible(false)}
        >
            <div className="flex  align-items-center justify-content-center">
                <i className="pi  pi-exclamation-triangle text-2xl " />
                <p className="w-full  flex ml-3 ">
                    {trans.customer.delete}
                    <span className="font-bold ml-2"> {name}</span>
                </p>
            </div>
            <div className="absolute confirm-delete-button ">
                <Button
                    icon="pi pi-times"
                    rounded
                    text
                    severity="danger"
                    label={trans.button.no}
                    aria-label="Cancel"
                />
                <Button
                    icon="pi pi-check"
                    rounded
                    text
                    aria-label="Filter"
                    label={trans.button.yes}
                    style={{ marginLeft: "3rem" }}
                />
            </div>
        </Dialog>
    );
};
export default DeleteDialog;
