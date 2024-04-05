

export interface IVaccinModal {
    id: string;
    title: string;
    afterdays: number;
    //for scheduling
    requestId?: string
    hospitalId?: string
    charges?: number
    status?: string //Waiting|Approved|Denied|Completed
    scheduleDate?: string
}