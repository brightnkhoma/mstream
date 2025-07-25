import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import { auth, db } from '../config/firebase';
import { AccountType, User } from '../types/types';
import {v4} from 'uuid'
import { collection, CollectionReference, doc, DocumentData, DocumentReference, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

export const mainPath = "mstream/all"

export const generateKey = () : string =>{
    return v4()
}
export const registerUser = async (email : string, password : string,onSuccess : ()=> void, onFailure : () => void) =>{
    try {
        await createUserWithEmailAndPassword(auth,email,password)
        onSuccess()
        
    } catch (error) {
        console.log(error);
        onFailure()
    }
}
export const userSignIn = async(email : string, password : string, onSuccess : (user : User) => void, onFailure : ()=> void) => {
    await signInWithEmailAndPassword(auth,email,password)
    const user = await getUserProfile(email)
    if(user){
        return onSuccess(user)
    }
    return onFailure()
}
export const createNewUserAccount = async (email : string, password : string, name : string) => {
    let success : boolean = true
    await registerUser(email,password,async()=> await onAccountCreatedSuccessifully(email,name),()=>{success = false})
    return success
}
const onAccountCreatedSuccessifully  = async (email : string, name : string) =>{
    const profile = generateDefaultUserProfile(email,name)
    await createUserProfile(profile)
}



const generatePath = (path : string)=>{
    return mainPath + "/" + path.split(",").join("/")
}
export const generateDoc = (path : string) :  DocumentReference<DocumentData, DocumentData>=>{
    const myDoc = doc(db,generatePath(path))
    return myDoc
}

export const getUserProfile = async(email : string)=>{
    const myCollection = generateCollection('users')
    const myQuery = query(myCollection,where("email","==",email.trim().toLocaleLowerCase()))
    const data = await getDocs(myQuery)
    if(data.empty){
        return null
    }
    return data.docs[0].data() as User
}

export const generateCollection = (path : string) : CollectionReference<DocumentData, DocumentData>=>{
    const myCollection = collection(db,generatePath(path))
    return myCollection
}


export const getUserById = async (id : string)=>{
    const myDoc = generateDoc(`users,${id}`)
    const data = await getDoc(myDoc)
    if(!data.exists){
        return null
    }
    return data.data() as User
}



const createUserProfile = async (profile : User)=>{
    const id = profile.userId
    const myDoc = generateDoc(`users,${id}`)
    await setDoc(myDoc,profile)
}



const generateDefaultUserProfile = (email : string, name : string) : User=>{
    const id = generateKey()
    const defaultUser : User = {
                 accountType : AccountType.FREE,
                 email,
                 name,
                 joinDate : new Date(),
                 library : {
                    libraryId : id,
                    downloadedContent : [],
                    owner : name,
                    purchasedContent : []
                 },
                 paymentMethods : [],
                userId : id 
    }

    return defaultUser
}