// only format for dd/mm/yyyy
export function formatDate(str: any) {
    const dateParse = str?.split("-");
    const data = new Date(
        dateParse[1] + "/" + dateParse[2] + "/" + dateParse[0]
    );
    return data;
}

export function formatDateString(str: any): string {
    const dateParse = str?.split("-");
    const data = dateParse[2] + "/" + dateParse[1] + "/" + dateParse[0];
    return data;
}
//yy-mm-ddThh:mm:ss
export function splitDateTime(str: any): string {
    if (!str) {
        return "";
    } else {
        const dateParse = str?.split("T");
        return formatDateString(dateParse[0]);
    }
}

export function splitDate(str: any): Date {
    if (!str) {
        return new Date();
    } else {
        const dateParse = str?.split("T");
        return formatDate(dateParse[0]);
    }
}
// only format for hh:mm dd/mm/yyyy
export function formatDate2(str: string) {
    if (!str) {
        return new Date();
    } else {
        const dateParse = str?.split(" ");
        const dateSplit = dateParse[1]?.split("/");
        const data = new Date(
            dateSplit[2] +
                "/" +
                dateSplit[1] +
                "/" +
                dateSplit[0] +
                " " +
                dateParse[0]
        );

        return data;
    }
}
//2023-07-11 15:30
export function formatDateCalendar(str: string): string {
    if (!str) {
        return new Date().toString();
    } else {
        const dateParse = str?.split(" ");
        const dateSplit = dateParse[1]?.split("/");
        return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]} ${dateParse[0]}`;
    }
}

export function formatFromTo(from: string, to: string) {
    const dateParse1 = from?.split(" ");

    const dateParse2 = to?.split(" ");

    const data = `${dateParse1[0]}-${dateParse2[0]} ${dateParse1[1]}`;

    return data;
}
