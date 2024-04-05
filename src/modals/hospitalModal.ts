


interface IVaccineRequestModal { // this model is for reference
    childId: string
    vaccineId: string
    status: string
    charges: number
}
export interface IHospitalModal {
    id: string
    name: string
    requests?: IVaccineRequestModal[]
}