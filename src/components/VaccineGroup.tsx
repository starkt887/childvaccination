import { IonAccordion, IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/react'
import React from 'react'
import {
    pencil as editIcon,
    alarm as approvedIcon,
    hourglass as waitingIcon,
    checkbox as completeIcon,
    closeCircle as deniedIcon,
    warning as warningIcon
} from 'ionicons/icons'
import { IVaccinModal } from '../modals/vaccineModal'
import { useHistory } from 'react-router'
import { addIntervalToDOB, intoDaysMonthsYear } from '../utlils/dateFormater'
type Props = {
    id: string,
    vaccineGroup: IVaccinModal[],
    dob?: string,
    readOnly: boolean
}

const VaccineGroup = ({ id, vaccineGroup, dob, readOnly }: Props) => {
    // routerLink='/auth/dashboard/child/vaccineschedule/12' 

    const history = useHistory()
    const getReadableVaccineInterval = (numberOfDays: number): string => {
        let readableInterval = intoDaysMonthsYear(numberOfDays)

        return readableInterval
    }
    const getRedableVaccineDate = (numberOfDays: number, dob: string): string => {
        return addIntervalToDOB(numberOfDays, dob)
    }
    const scheduleVaccine = (vaccineId: string) => {
        if (!readOnly)
            history.push(`/auth/dashboard/child/vaccineschedule/${vaccineId}`)
    }

    const statusIndentification = (status?: string): { color: string, icon: string } => {
        let statusObj = {
            color: "warning",
            icon: warningIcon
        }
        if (status) {
            if (status === "Waiting") {
                statusObj.color = "secondary"
                statusObj.icon = waitingIcon
            }
            else if (status === "Denied") {
                statusObj.color = "danger"
                statusObj.icon = deniedIcon
            }
            else if (status === "Approved") {
                statusObj.color = "primary"
                statusObj.icon = approvedIcon
            }
            else if (status === "Completed") {
                statusObj.color = "success"
                statusObj.icon = completeIcon
            }
        }
        return statusObj
    }
    return (
        <IonAccordion value={id}>
            <IonItem slot="header" color="dark">
                <IonLabel>{getReadableVaccineInterval(vaccineGroup.at(0)?.afterdays!)}</IonLabel>

                {!readOnly && dob && <IonText>
                    <p style={{ fontSize: "12px" }}>
                        {getRedableVaccineDate(vaccineGroup.at(0)?.afterdays!, dob!)}
                    </p>
                </IonText>}
            </IonItem>
            <div slot="content">
                <IonList lines="full">
                    {vaccineGroup.map((vaccine: IVaccinModal) => {
                        return (
                            <IonItem key={vaccine.id} button onClick={() => scheduleVaccine(vaccine.id)}>
                                <IonIcon slot='start' size='small' icon={editIcon} className='ion-margin-end' />
                                <IonText >
                                    <p style={{ fontSize: '12px' }}>{vaccine.title}</p>
                                </IonText>
                                {/* icons will change in warning/checkbox based on status 
                                //Waiting|Approved|Denied|Completed
                                */}
                                {!readOnly && <>

                                    <IonText slot='end'>
                                        <p style={{ fontSize: '12px' }}>{vaccine.status}</p>
                                    </IonText>
                                    <IonIcon
                                        slot='end'
                                        size='small'
                                        icon={statusIndentification(vaccine.status).icon}
                                        color={statusIndentification(vaccine.status).color}
                                        className='ion-margin-end' />
                                </>}
                            </IonItem>
                        )
                    })}
                </IonList>
            </div>
        </IonAccordion>
    )
}

export default VaccineGroup