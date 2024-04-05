import { IVaccinModal } from "./vaccineModal"

export interface IChildModal {
    id?: string
    name: string
    dob: string
    gender: string
    hospital: string
    location: string
    parentId: string
}

export type ReminderModal = {
    childData: IChildModal,
    vaccines: IVaccinModal[]
}