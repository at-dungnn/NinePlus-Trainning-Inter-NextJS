export default function checkFilled(obj: any, trans: any) {
    let errorString = "";
    const isFilled = Object.keys(obj).every((key) => {
        if (key === "id") return true;
        if (key === "note") return true;
        if (key === "phoneNumber") {
            const checkField: boolean =
                (obj[key] as string).length <= 10 &&
                (obj[key] as string).length >= 8;
            if (checkField && (obj[key] as string).match(/^\d+$/)) {
                return true;
            } else if (checkField && !(obj[key] as string).match(/^\d+$/)) {
                errorString = trans.toast.detail.onlyNumber;
                return false;
            }
            errorString = trans.toast.detail.number;
            return false;
        }
        return obj[key] !== "" || undefined || null;
    });
    return { isFilled, errorString };
}
