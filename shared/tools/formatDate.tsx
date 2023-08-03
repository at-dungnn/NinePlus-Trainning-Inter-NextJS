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
