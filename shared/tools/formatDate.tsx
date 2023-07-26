// only format for dd/mm/yyyy
export function formatDate(str: any) {
    if (!str) {
        return new Date();
    } else {
        const dateParse = str?.split("/");
        const data = new Date(
            dateParse[2] + "/" + dateParse[1] + "/" + dateParse[0]
        );
        return data;
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
