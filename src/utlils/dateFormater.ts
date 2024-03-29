import dayjs from "dayjs"


export function formatDate(date: string): string {
    let formattedString = dayjs(date).format('DD-MMM-YYYY')
    // console.log(date)
    // console.log(formattedString)
    return formattedString
}
export function formatTOISO(date: string) {
    let formattedString = dayjs(date).format()
    // console.log(formattedString)
    return formattedString
}

export function intoDaysMonthsYear(numberOfDays: number): string {
    let years = Math.floor(numberOfDays / 365);
    let months = Math.floor(numberOfDays % 365 / 30);
    let days = Math.floor(numberOfDays % 365 % 30);
    // console.log(years, months, days);
    if (years >= 1)
        return years.toString().concat(" Year")
    else if (months >= 1)
        return months.toString().concat(" Month")
    else
        return numberOfDays.toString().concat(" Day")

}
export function addIntervalToDOB(numberOfDays: number, dob: string): string {
    let rawExtendedDate = dayjs(formatTOISO(dob)).add(numberOfDays, 'days')
    let extendedDate = formatDate(rawExtendedDate.toISOString())
    return extendedDate
}