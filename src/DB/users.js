import firebase from './firebase';
import { getUserCollection } from './utils';


export const saveBusinessWithUser= async (businessData, userData)=>{
  const db = firebase.firestore()

  console.log("user recieved for saving: ", userData)
  const userRef = db.doc(`users/${userData.email}`);
  
  const auth = firebase.auth()

  var userCreated=false;
  
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
              email:userData.email,
              active:true,
              password: userData.password,
              bussinessID:  docRef.id,
              bussinessName:businessData.bussinessName,
              //stripeToken: JSON.stringify(token),
              imageUrl:"",
              timestamp: new Date()

          })

          const bussinessRef =  db.collection('businesses').doc(docRef.id).collection('users').doc(userData.email);
          await bussinessRef.set({
              name: userData.name,
              lastName: userData.lastName,
              email:userData.email,
              password: userData.password,
              imageUrl:"",
              userType: 'owner',
              timestamp: new Date()
          })
          userCreated=true;
          return userCreated;

      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          return userCreated;
      });

  })
  
  .catch(function(error) {
 
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('User already exists!');
      console.log('ERROR: ', errorCode, ": ", errorMessage);
      return userCreated;
     
    });

    return userCreated;

}

export const saveUser = async (fields, token) => {
  const db = firebase.firestore()
  const auth = firebase.auth()

  const { user } = await auth.createUserWithEmailAndPassword(fields.email, fields.password)
  const userRef = db.doc(`users/${user.uid}`)
  await userRef.set({
      ...fields,
      stripeToken: JSON.stringify(token)
  })

}

export const authenticateUser = async ({email, password}) => {
 
  console.log("email recieved  ", email, " pass: ", password)
  const db = firebase.firestore()
  const auth = firebase.auth()

  var userExists=false;

  try {
 
      const user = (await auth.signInWithEmailAndPassword(email, password)).user


      const userRef =await db.doc(`users/${email}`)

      await userRef.get().then(function(doc) {
          if (doc.exists) {
              
              let data=doc.data();
              console.log("user data!! ", data)
              if (data.active==false){
                  let user =auth.currentUser;
                  console.log(" user to be deleted: ", user);
                  user.delete()
                  userRef.delete()
                  .then(()=>{
                       alert('User has being deleted!');
                       userExists=false;
                  })
                  .catch((error)=>{
                       alert('An error happened!');
                       return false;
                  })
                 
              }else{

              data.email=doc.id;
              data.uid= user.uid;
              localStorage.setItem('user', JSON.stringify(data))
              console.log("user saved", data)
              userExists=true;
              }
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!", user);
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      return userExists
  } catch {
      return userExists
  }
}

export const getUserData =   async (email) => {
  const db = firebase.firestore()
  var userData=[]
  const userRef = db.doc(`users/${email}`)

      await userRef.get().then(function(doc) {
          if (doc.exists) {
              
              userData.push(doc.data());
              //data.uid= user.uid;
              //console.log("Document data1 :", data);
              userData=JSON.stringify(data);
              //console.log("user data is :", userData);
              localStorage.setItem('user', JSON.stringify(data))
              
          
             
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              return {}
          }
          
      }).catch(function(error) {
          console.log("Error getting document:", error);
          return {}
          
      });

      console.log("returning", userData)
    return userData[0];
}

export  const bussinesExists=(id)=>{
  
  const db = firebase.firestore()
  const docRef = db.collection('businesses').doc(id);
 
  const response=docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          return true;
         
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          return false;
         
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
      return false;
     
  }).then((res)=>{
      console.log(" returning" ,res)
      return res;
  });
  return response;

}

export const signOut = async ()=>{
  var response =true;
  firebase.auth().signOut().then(function() {
      console.log("Signing out succesfull");
      
    }).catch(function(error) {
      console.log("Errorsigning out", error);
      response =false;
    });
    return response

}