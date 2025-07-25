import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { ContentFile, ContentType, Movie, Music, PurchasedContent } from "../types/types";
import { generateCollection, generateDoc, generateKey } from "./userDatasource";
import { db } from "../config/firebase";
export const dbPath = "mstream/all"


export const setContent = async(userId : string,data : Movie | Music, onSuccess : () => void, onFailure : ()=> void)=>{
    try {
        const id = generateKey()
        data.contentId = id
        const myDoc = generateDoc(`${data.type},${userId},${data.contentId}`)
        await setDoc(myDoc,data)
        onSuccess()
    } catch (error) {
        console.log(error);
        onFailure()
    }
}

export const getUserContent = async(userId : string, type : ContentType) : Promise<(Movie | Music)[]>=>{
    const myCollection = generateCollection(`${type},${userId}`)
    const data = await getDocs(myCollection)
    const content = data.docs.map(x=> x.data() as (Movie | Music))
    return content
}

export const onAddFile = async(file : ContentFile)=>{
    const myDoc = generateDoc(`files,${file.ownerId},all,${file.id}`)
    await setDoc(myDoc,file)

}



    export const buyContent = async(userId : string,contentId : string,name : string, txnId : string,type : ContentType,onSuccess : ()=> void, onFailure : ()=>void)=>{
        try {
            const purchasedcontent : PurchasedContent = {
                id: contentId,
                date: new Date(),
                type,
                name,
                txnId
            }
            const myDoc = doc(db,`${dbPath}/purchasedcontents/${userId}/all/${contentId}`)
            await setDoc(myDoc,purchasedcontent)
            onSuccess()
        } catch (error) {
            console.log(error);
            onFailure()
            
        }
    }
   export const getContent = async(contentId : string):Promise<Movie | Music | undefined>=>{
        const myDoc =doc(db,`${dbPath}/contents/${contentId}`)
        const contentDoc = await getDoc(myDoc)
        if(contentDoc.exists()){
            return contentDoc.data() as Movie | Music
        }
    }
