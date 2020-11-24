import firebase from './firebase';
import { getUserCollection } from './utils';



export const createUser = async(email, password)=>{
  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .catch(function(error) {
    
    console.log(error);
    // [END_EXCLUDE]
  });
    return firebase.auth().currentUser;
}

/**
     * Sends an email verification to the user.
     */
    export const sendEmailVerification=()=> {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }

    export const sendPasswordReset=(email)=> {
   
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }

export const signIn = async (email, password) => {

   firebase.auth().signInWithEmailAndPassword(email, password)
   .then(function(result){
     return result.currentUser;

   })

  .catch(function(error) {
    // Handle Errors here.
    
    console.log(error);

    // [END_EXCLUDE]
  });
  // [END authwithemail]
  console.log("respuesta de auth", firebase.auth().currentUser)
  return firebase.auth().currentUser;
  
}

export const signOut = () => {
  firebase.auth().signOut().then(function() {
    console.log("Sign-out successful");
  }).catch(function(error) {
    console.log("Error", error);
  });

}



export const saveBusinessWithUser= async (businessData, userData)=>{

  const db = firebase.firestore()
  const userRef = db.doc(`users/${userData.email}`);
  const auth = firebase.auth()
  
  await auth.createUserWithEmailAndPassword(userData.email, userData.password)
  
  .then(async function(value) {
      const docRef = db.collection('businesses');

      await docRef.add({
          ...businessData,
          ownerEmail:userData.email,
          timestamp: new Date(),
      })
      .then(async function(docRef) {
          console.log("Document written with ID: ", docRef.id);
  
          await userRef.set({
              name: userData.name,
              lastName: userData.lastName,
              password: userData.password,
              email:userData.email,
              bussinessID:  docRef.id,
              bussinessName:businessData.bussinessName,
              timestampCreated: new Date(),
              timestampModified: new Date(),
          })

      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

  }
  )
  
  .catch(function(error) {
 
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('User already exists!');
      console.log('ERROR: ', errorCode, ": ", errorMessage);
     
    });

}




/*revisar!!!!!!!!!!!!!!!!!! */
const collectionName='users';
export const saveUser = async (id,item) => {
    const db = firebase.firestore()

    const docRef = db.collection(collectionName).doc(id);

    // // Not awaiting intentionally
    const updateTimestamp = docRef.set({
        ...item,
        timestamp: new Date()
    })

    return docRef.id;
}


export const updateUser = async (id,item) => {
    const db = firebase.firestore();
    const docRef = db.collection(getUserCollection(collectionName)).doc(id);
  
    // Not awaiting intentionally
    const updateTimestamp = docRef.update({
      ...item,
      lastUpdatedTimestamp: new Date(),
    });
    return docRef.id;
  };


  
  export const fetchUsers = async () => {
    const db = firebase.firestore();
    return db.collection(getUserCollection(collectionName)).get();
  };

  export const fetchUserByEmail = async (id) => {
    const db = firebase.firestore();
    var data={};
    
    console.log('id leido ', id)
     const docRef= await db.collection(getUserCollection(collectionName)).doc(id).get()
     if (docRef)
        return docRef.data();
     else 
        return data;
    //  .then((doc)=>{
    //   console.log("user data: ", doc.data());
    //     //data= JSON.parse(JSON.stringify(doc.data()));

        
    //     return data;
        
    //  })
    //  .catch((e)=>{
    //     console.log("Error fetching user data: ", e);
    //  })
     

  };

  export const deleteUser = async (id) => {

    //delete de picture from storage
    //deleteProfilePicture(id);
    const db = firebase.firestore();
    const res = await db.collection(collectionName).doc(id);
    const res1 = await res.delete();
  
    return res.id;
  };