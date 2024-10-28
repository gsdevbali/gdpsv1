export default function toidr(value: number) {
    const newValue = value.toLocaleString(
        "id-ID",
        {
            style: "currency",
            currency: "IDR"
        }
    )
    return newValue
}
