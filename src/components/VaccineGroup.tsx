import { IonAccordion, IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/react'
import React from 'react'
import { pencil as editIcon, warning as warningIcon, checkbox as checkboxIcon } from 'ionicons/icons'
import { IVaccinModal } from '../modals/vaccineModal'
import { useHistory } from 'react-router'
import { addIntervalToDOB, intoDaysMonthsYear } from '../utlils/dateFormater'
type Props = {
    id: string,
    vaccineGroup: IVaccinModal[],
    readOnly: boolean
}

const VaccineGroup = ({ id, vaccineGroup, readOnly }: Props) => {
    // routerLink='/auth/dashboard/child/vaccineschedule/12' 

    const history = useHistory()
    const getReadableVaccineInterval = (numberOfDays: number): string => {
        let readableInterval = intoDaysMonthsYear(numberOfDays)
        if (readableInterval === "0 Day")
            return "At Birth"
        return readableInterval
    }
    const getRedableVaccineDate = (numberOfDays: number, dob: string): string => {
        return addIntervalToDOB(numberOfDays, dob)
    }
    const scheduleVaccine = () => {
        if (!readOnly)
            history.push(`/auth/dashboard/child/vaccineschedule/${id}`)
    }
    return (
        <IonAccordion value={id}>
            <IonItem slot="header" color="dark">
                <IonLabel>{getReadableVaccineInterval(vaccineGroup.at(0)?.afterdays!)}</IonLabel>

                {!readOnly && <IonText>
                    <p style={{ fontSize: "12px" }}>
                        {getRedableVaccineDate(vaccineGroup.at(0)?.afterdays!, "28-Mar-2024")}
                    </p>
                </IonText>}
            </IonItem>
            <div slot="content">
                <IonList lines="full">
                    {vaccineGroup.map((vaccine: IVaccinModal) => {
                        return (
                            <IonItem key={vaccine.id} button onClick={scheduleVaccine}>
                                <IonIcon slot='start' size='small' icon={editIcon} className='ion-margin-end' />
                                <IonText >
                                    <p style={{ fontSize: '12px' }}>{vaccine.title}</p>
                                </IonText>
                                {/* icons will change in warning/checkbox based on status */}
                                {!readOnly && <IonIcon slot='end' size='small' icon={warningIcon} className='ion-margin-end' />}

                            </IonItem>
                        )
                    })}
                </IonList>
            </div>
        </IonAccordion>
    )
}

export default VaccineGroup