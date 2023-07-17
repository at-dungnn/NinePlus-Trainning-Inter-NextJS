export default function checkFilled<P extends Record<string, unknown>>(obj: P) {
    const isFilled = Object.keys(obj).every((key) => {
        return obj[key] !== "" || undefined || null;
    });
    return isFilled;
}
