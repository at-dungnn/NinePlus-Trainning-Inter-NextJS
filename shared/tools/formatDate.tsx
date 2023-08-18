// only format for dd/mm/yyyy
export function formatDate(str: any) {
    const dateParse = str?.split("-");
    const data = new Date(
        dateParse[1] + "/" + dateParse[2] + "/" + dateParse[0],
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

export function splitFormatDate(str: any): Date | null {
    if (!str) {
        return null;
    } else {
        const dateParse = str?.split("T");
        return formatDate(dateParse[0]);
    }
}
export function formatDateTime(str: any): Date | null {
    if (!str) {
        return null;
    } else {
        return new Date(str);
    }
}
//2023-07-11T15:30

export function formatDateCalendar(str: string): string {
    if (!str) {
        return new Date().toString();
    } else {
        const parseStr = str.split("T");

        return `${parseStr[1].split(".")[0]}`;
    }
}

export function formatFromTo(from: string, to: string) {
    const dateParse1 = from?.split("T");

    const dateParse2 = to?.split("T");

    const data = `${dateParse1[1].split(".")[0]}-${
        dateParse2[1].split(".")[0]
    } ${dateParse1[0]}`;

    return data;
}
export function formatBookingDate(str: string) {
    const dateParse = str?.split("T");
    return dateParse[0];
}

export function formatBookingTime(str: string) {
    const dateParse = str?.split("T");
    const timeParse = dateParse[1].split(".");
    return `${timeParse[0]} ${dateParse[0]}`;
}
