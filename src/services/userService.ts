import { collection, doc, getDoc, query, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "./firebaseService";
import { userInformation } from "../features/auth/authSlice";

export function useUserService() {
    async function createProfile(userInfo: userInformation): Promise<boolean> {
        try {

            await setDoc(doc(firestoreDb, "users", userInfo.uid), {
                ...userInfo
            })

            return true
        } catch (error) {
            console.log("Profile Creation:", error);
            return false
        }
    }
    async function updateProfile(userInfo: userInformation): Promise<boolean> {

        try {

            console.log(userInfo);
            
            await updateDoc(doc(firestoreDb, "users", userInfo.uid), {
                ...userInfo
            })

            return true;

        } catch (error) {
            console.log("Profile Update:", error);
            return false
        }

    }
    return { createProfile, updateProfile }
}