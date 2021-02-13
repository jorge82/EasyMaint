import firebase,{storage} from './firebase';


const PARENTCOLLECIONNAME='businesses';
const COLLECTIONNAME='areas';
const PICTURESFOLDER='areaPictures';

export const saveArea = async ( id,item) => {
    const db = firebase.firestore()
    const user=JSON.parse(localStorage.getItem('userData'));
    const docRef = db.collection(PARENTCOLLECIONNAME).doc(user.bussinessID).collection(COLLECTIONNAME).doc(id);

    // Not awaiting intentionally
    const updateTimestamp = docRef.set({
        ...item,
        date_modified: new Date()
    });

    return docRef.id;
}

export const deleteAreaPicture = (id) => {

  var desertRef = storage.ref().child(PICTURESFOLDER).child(id);

      // Delete the file
      desertRef.delete().then(function() {
        // File deleted successfully
        }).catch(function(error) {
           console.log("Error", error);
      });

 
}


export const updateArea = async (id,item) => {
    const user=JSON.parse(localStorage.getItem('userData'));
    const db = firebase.firestore();
    const docRef = db.collection(PARENTCOLLECIONNAME).doc(user.bussinessID).collection(COLLECTIONNAME).doc(id);
  


    // Not awaiting intentionally
    const updateTimestamp = docRef.update({
      ...item,
      date_modified: new Date(),
    });
    return docRef.id;
  };


  
  export const fetchAreas = async () => {

    const user=JSON.parse(localStorage.getItem('userData'));
    const db = firebase.firestore();
    console.log("fetched bussiness id is", user['bussinessID']);
    const docRef = db.collection(PARENTCOLLECIONNAME).doc(user.bussinessID).collection(COLLECTIONNAME).get();
    return docRef;

  };

  export const fetchAreaByID = async (id) => {
    const user=JSON.parse(localStorage.getItem('userData'));
    const db = firebase.firestore();
    const docRef = db.collection(PARENTCOLLECIONNAME).doc(user.bussinessID).collection(COLLECTIONNAME).doc(id).get();
    return docRef;

  };

  export const deleteArea = async (id) => {
    const user=JSON.parse(localStorage.getItem('userData'));
    const db = firebase.firestore();
    //delete de picture from storage
    deleteAreaPicture(id);

    const docRef = await db.collection(PARENTCOLLECIONNAME).doc(user.bussinessID).collection(COLLECTIONNAME).doc(id).delete();
    return docRef;
  };

