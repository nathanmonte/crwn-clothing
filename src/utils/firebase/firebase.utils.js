import { initializeApp } from 'firebase/app';
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  // NextOrObserver,
  onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc, // Read contents of doc
    setDoc, // Modify contents of doc
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBe77BrPPrsq5Xt8HHNfBPm539OGvkcfI",
    authDomain: "crwn-clothing-db-cb734.firebaseapp.com",
    projectId: "crwn-clothing-db-cb734",
    storageBucket: "crwn-clothing-db-cb734.appspot.com",
    messagingSenderId: "763185953216",
    appId: "1:763185953216:web:b3d1ca521ec9c0859b7025"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();

  // Opens a single sign in popup which returns the response from the user.
  // Naming with google makes it clear we could be using other providers.
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    // transactions - successful unit of work
    // Successful write when all unit are added successfully.
    // Batch works as a transaction
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    })

    await batch.commit();

    console.log("done")
  } 

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  }

  // Method takes the user returned from google and attempts to create a document in firebase with those details.
  export const createUserDocumentFromAuth = async ({uid, email, displayName}, additionalInformation) => {
    if (!uid) return;
    // This creates a namespace which will be a unique identifier for finding the user document in firestore.
    // It hasn't created a document.
    const userDocRef = doc(db, 'users', uid);

    // This attempts to retrieve the contents of a document based on the user reference.
    const userSnapshot = await getDoc(userDocRef);

    // Check if the user data exists.
    if (!userSnapshot.exists()) {
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }
    // If so return the document reference.
    // If it doesn't exist we want to set the document using the user snapshot.

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
    if (!email || !password) return;

    // Authenticate user with email and password
    return await createUserWithEmailAndPassword(auth, email, password, {displayName});

  }

  export const getUserDocument = async (uid) => {
    if (!uid) return;

    const userDocRef = doc(db, 'users', uid);

    // This attempts to retrieve the contents of a document based on the user reference.
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        alert("There has been an error. User document is missing");
        return;
    }
    return userSnapshot;
  }

  export const signInWithGoogleEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

 export const signOutUser = () => signOut(auth); 

 /**
  * This makes use of an obseravable stream.
  * Next, error and finished callbacks are possible.
  * Work like a normal node.js stream.
  */
 export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);