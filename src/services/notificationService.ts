import { useEffect, useState } from "react";
import { IChildModal, ReminderModal } from "../modals/childModal";
import { formatDate } from "../utlils/dateFormater";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { IVaccinModal } from "../modals/vaccineModal";
import { firestoreDb } from "./firebaseService";
import { Unsubscribe } from "firebase/auth";




export function useNotificationService() {

    const [vaccineReminders, setVaccineReminders] = useState<ReminderModal[]>([])


    function subscribeToTodaysVaccineDate(children: IChildModal[]) {
        const todaysDate = formatDate(new Date().toISOString())
        console.log(todaysDate)
        children.map((child: IChildModal) => {
            const q = query(collection(firestoreDb, "children", child.id!, "vaccinelist"),
                where("scheduleDate", "==", todaysDate));
            onSnapshot(q, (querySnapshot) => {
                let docs = querySnapshot.docs;
                console.log(docs.length)

                let allTodaysVaccines = docs.map((doc) => {
                    return { id: doc.id, ...doc.data() } as IVaccinModal
                })
                let inCompleteVaccines = allTodaysVaccines.filter((vaccine) => vaccine.status !== "Completed")
                console.log(inCompleteVaccines)
                setVaccineReminders([...vaccineReminders!, {
                    childData: child,
                    vaccines: inCompleteVaccines
                }])
                console.log("Today is this and that");
            })

        })

    }

    async function getCompletedVaccines(children: IChildModal[]): Promise<ReminderModal[]> {
        let completeReminders: ReminderModal[] = []
        await Promise.all(children.map(async (child) => {
            const q = query(collection(firestoreDb, "children", child.id!, "vaccinelist"),
                where("status", "==", "Completed"));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot.docs)
            let allCompletedVaccines: IVaccinModal[] = querySnapshot.docs
                .map((doc) => (doc.data() as IVaccinModal))
            completeReminders = [...completeReminders,
            {
                childData: child,
                vaccines: allCompletedVaccines
            }]
        }))
        console.log(completeReminders)
        return completeReminders
    }

    return { vaccineReminders, setVaccineReminders, subscribeToTodaysVaccineDate, getCompletedVaccines }

}