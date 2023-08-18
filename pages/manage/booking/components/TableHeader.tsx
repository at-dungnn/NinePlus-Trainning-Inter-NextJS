import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export const TableHeader = ({
    globalFilterValue,
    onGlobalFilterChange,
    trans,
}: any) => {
    return (
        <div className="flex justify-content-between">
            <span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder={trans.input.global}
                    />
                </span>
            </span>
            <div className="w-auto flex">
                <Link href={"/manage/booking/Calendar"}>
                    <Button
                        severity="help"
                        outlined
                        className="w-12 h-4rem m-auto text-lg"
                    >
                        <i
                            className="pi pi-calendar pr-2 font-bold "
                            style={{ fontSize: "1.5rem" }}
                        />
                        <span className="font-bold">
                            {trans.booking.calendar}
                        </span>
                    </Button>
                </Link>
                <Link href={"/manage/booking/create"}>
                    <Button
                        severity="help"
                        outlined
                        className="w-10 h-4rem text-lg ml-3"
                    >
                        <i
                            className="pi pi-plus-circle pr-2 font-bold pi-lg "
                            style={{ fontSize: "1.5rem" }}
                        />
                        <span className="font-bold">
                            {trans.booking.create}
                        </span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};
