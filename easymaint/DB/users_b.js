import firebase,{storage} from './firebase';


const PARENTCOLLECIONNAME='businesses';
const COLLECTIONNAME='users';
const PICTURESFOLDER='profilePictures';

export const saveUser = async (bussinessID, id,item) => {
    const db = firebase.firestore()

    const docRef = db.collection(PARENTCOLLECIONNAME).doc(bussinessID).collection(COLLECTIONNAME).doc(id);

    // Not awaiting intentionally
    const updateTimestamp = docRef.set({
        ...item,
        date_modified: new Date()
    });

    return docRef.id;
}

export const deleteProfilePicture = (id) => {

  var desertRef = storage.ref().child(PICTURESFOLDER).child(id);

      // Delete the file
      desertRef.delete().then(function() {
        // File deleted successfully
        }).catch(function(error) {
           console.log("Error", error);
      });

 
}


export const updateUser = async (id,item) => {
    const db = firebase.firestore();
    const docRef = db.collection(PARENTCOLLECIONNAME).doc(bussinessID).collection(COLLECTIONNAME).doc(id);
  
    // Not awaiting intentionally
    const updateTimestamp = docRef.update({
      ...item,
      date_modified: new Date(),
    });
    return docRef.id;
  };


  
  export const fetchUsers = async () => {
    const db = firebase.firestore();
  
    const docRef = db.collection(PARENTCOLLECIONNAME).doc(bussinessID).collection(COLLECTIONNAME).get();
    return docRef;

  };

  export const fetchUserByEmail = async (id) => {
    const db = firebase.firestore();
    const docRef = db.collection(PARENTCOLLECIONNAME).doc(bussinessID).collection(COLLECTIONNAME).doc(id).get();
    return docRef;

  };

  export const deleteUser = async (id) => {

    //delete de picture from storage
    deleteProfilePicture(id);
    const db = firebase.firestore();
    const docRef = await db.collection(PARENTCOLLECIONNAME).doc(bussinessID).collection(COLLECTIONNAME).doc(id).delete();
    return docRef.id;
  };

