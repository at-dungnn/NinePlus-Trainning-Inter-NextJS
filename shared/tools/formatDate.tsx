// only format for dd/mm/yyyy
export default function formatDate(str: any) {
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
