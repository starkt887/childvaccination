import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { firestoreDb } from "./firebaseService";
import { IChildModal } from "../modals/childModal";
import { useState } from "react";
import { IVaccinModal } from "../modals/vaccineModal";


export function useChildService() {


    async function addNewChild(childData: IChildModal, vaccineList: IVaccinModal[][]): Promise<boolean> {
        try {
            create new schedule in children / schedule / collecton while adding new child
            // await addDoc(collection(firestoreDb, "children"), {
            //     ...childData
            // })

            return true
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

    return { addNewChild, updateChild }
}