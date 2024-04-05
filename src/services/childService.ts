import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";
import { firestoreDb } from "./firebaseService";
import { IChildModal } from "../modals/childModal";
import { useState } from "react";
import { IVaccinModal } from "../modals/vaccineModal";
import { nanoid } from "@reduxjs/toolkit";
import { user, userInformation } from "../features/auth/authSlice";


export function useChildService() {


    async function addNewChild(childData: IChildModal, vaccineList: IVaccinModal[][]): Promise<boolean> {
        try {
            // create new schedule in children / schedule / collecton while adding new child

            let tempvaccine: IVaccinModal[] = vaccineList.flat(1)

            const batchWrite = writeBatch(firestoreDb)
            const childRef = doc(firestoreDb, "children", nanoid(20))
            batchWrite.set(childRef, { ...childData })
            tempvaccine.map((vaccine) => {
                let vaccineRef = doc(firestoreDb, "children", childRef.id, "vaccinelist", nanoid(20))
                batchWrite.set(vaccineRef, {
                    title: vaccine.title,
                    afterdays: vaccine.afterdays
                })
            })

            let result = await batchWrite.commit()
                .then(() => (true))
                .catch((error) => {
                    console.log(error);
                    return false
                })
            console.log("Operation result:", result);
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async function updateChild(childData: IChildModal, id: string): Promise<boolean> {
        try {
            console.log(id)
            await setDoc(doc(firestoreDb, "children", id), {
                ...childData
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function scheduleVaccine(parentData: userInformation, childData: IChildModal, vaccineData: IVaccinModal): Promise<boolean> {
        try {

            console.log(parentData);
            console.log(childData);
            console.log(vaccineData);

            const requestRef = await addDoc(collection(firestoreDb,
                "hospital", vaccineData.hospitalId!, "vaccinationrequests"),
                {
                    childId: { ...childData },
                    parentName: { ...parentData },
                    title: vaccineData.title,
                    status: "Waiting",
                    scheduleDate: vaccineData.scheduleDate
                })


            await updateDoc(doc(firestoreDb,
                "children", childData.id!, "vaccinelist", vaccineData.id),
                {
                    requestId: requestRef.id,
                    hospitalId: vaccineData.hospitalId,
                    status: "Waiting",
                    scheduleDate: vaccineData.scheduleDate,
                })

            return true
        } catch (error) {
            console.log(error);
            return false

        }
    }

    async function markAsComplete(childData: IChildModal, vaccineData: IVaccinModal): Promise<boolean> {
        try {

            console.log(childData);
            console.log(vaccineData);

            await updateDoc(doc(firestoreDb,
                "children", childData.id!, "vaccinelist", vaccineData.id), {
                status: "Completed",
            })

            await updateDoc(doc(firestoreDb,
                "hospital", vaccineData.hospitalId!, "vaccinationrequests", vaccineData.requestId!),
                {
                    status: "Completed",
                })
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    return { addNewChild, updateChild, scheduleVaccine, markAsComplete }
}

// console.log(tempvaccine)
//old logic
// const docRef = await addDoc(collection(firestoreDb, "children"), {
//     ...childData
// })