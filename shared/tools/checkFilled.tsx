export default function checkFilled(obj: any) {
    const isFilled = Object.keys(obj).every((key) => {
        return obj[key] !== "" || undefined;
    });
    return isFilled;
}
