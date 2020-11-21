import firebase from './firebase';
import { getUserCollection } from './utils';

const collectionName='businesses';



export const getBussinessData= async (businessID)=>{

    const db = firebase.firestore();  
    try{
    const docRef = await db.collection(collectionName).doc(businessID).get();

       if(docRef)
            console.log('bussines data:' , docRef.data());
            return  docRef.data();
        //localStorage.setItem('bussinessData', doc.data());
        }catch(error) {
            console.log("Error getting cached document:", error);
            return {};
        };

  }
  
  




