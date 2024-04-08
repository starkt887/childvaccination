import { collection, doc, getDoc, query, setDoc, updateDoc } from "firebase/firestore";
import { auth, fireStorage, firestoreDb } from "./firebaseService";
import { userInformation } from "../features/auth/authSlice";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { updatePassword } from "firebase/auth";

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

    async function uploadProfileImg(uid: string, profilePicture: string): Promise<string> {

        try {
            const response = await fetch(profilePicture)
            const blobFile = await response.blob()
            const storageRef = ref(fireStorage, `users/${uid}/profilepic.jpg`);
            return await uploadBytes(storageRef, blobFile).then(async (snapshot) => {
                console.log('Uploaded a blob or file!');
                return await getDownloadURL(snapshot.ref)
            });
        } catch (error) {
            console.log("Upload error:", error);

            return ""
        }
    }

    async function updateProfile(userInfo: userInformation, profilePicture: string): Promise<boolean> {

        try {

            if (profilePicture) {
                let profilepic = await Promise.resolve(uploadProfileImg(userInfo.uid, profilePicture))
                console.log(profilepic);
                if (profilepic)
                    userInfo.profilepic = profilepic
            }

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
    async function updatePass(password: string): Promise<boolean> {

        try {
           

            const user = auth.currentUser!;
            const newPassword = password;
            console.log(user, newPassword);

            const result = await updatePassword(user, newPassword).then(() => {
                // Update successful.
                console.log("Update pass success");

                return true
            }).catch((error) => {
                // An error ocurred
                // ...
                console.log("Update pass fail", error);
                return false
            });
            return result
            console.log(result);


        } catch (error) {
            console.log("Pssword Update:", error);
            return false
        }

    }
    return { createProfile, updateProfile, updatePass }
}