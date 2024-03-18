import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDentDSf-Ys91V6XMFsp3SkxVRldcHBM44",
  authDomain: "employee-management-app-ca05e.firebaseapp.com",
  projectId: "employee-management-app-ca05e",
  storageBucket: "employee-management-app-ca05e.appspot.com",
  messagingSenderId: "348075925247",
  appId: "1:348075925247:web:f4f121f0bbd572166df6ca",
};

let app, auth;

if (getApps()?.length == 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
