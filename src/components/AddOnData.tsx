import { IonInput, IonItem, IonList, IonText } from '@ionic/react'
import React from 'react'
import { IVaccinModal } from '../modals/vaccineModal'

type Props = {
    selectedVaccine: IVaccinModal
}

const AddOnData = ({ selectedVaccine }: Props) => {
    return (
        <IonList>
            <IonItem>
                <IonInput
                    label="Hospital Id:"
                    labelPlacement="fixed"
                    type="text"
                    readonly
                    value={selectedVaccine && selectedVaccine.hospitalId}
                />
            </IonItem>

            <IonItem>
                <IonInput
                    label="Vaccine Id:"
                    labelPlacement="fixed"
                    type="text"
                    readonly
                    value={selectedVaccine && selectedVaccine.id}
                />
            </IonItem>
            <IonItem>
                <IonInput
                    label="Billing Id:"
                    labelPlacement="fixed"
                    type="text"
                    readonly
                    value={selectedVaccine && selectedVaccine.requestId}
                />
            </IonItem>
            <IonItem>
                <IonText>
                    <p style={{ fontSize: "12px" }}>Note: Dear Parents/Guardians, We're pleased to announce the successful completion
                        of the child vaccination program.Thank you for your cooperation in ensuring
                        the health and well-being of our community's children.</p>
                </IonText>
            </IonItem>

        </IonList>
    )
}

export default AddOnData