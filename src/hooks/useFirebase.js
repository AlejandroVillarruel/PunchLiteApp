import { Alert } from "react-native";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import * as ImageManipulator from "expo-image-manipulator";

import { db, storage } from "../config/firebase";

export default function useFirebase() {
  const getDocumentById = async (colName, documentId, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      const docRef = doc(db, colName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (setLoading) setLoading(false);
        return {
          status: 200,
          data: {
            id: documentId,
            ...docSnap.data(),
          },
        };
      } else {
        if (setLoading) setLoading(false);
        Alert.alert("No such document!");
      }
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        error: error.message,
      };
    }
  };

  const getDocuments = async (colName, setLoading, where = []) => {
    try {
      if (setLoading) setLoading(true);

      let documents = [];
      const q = query(collection(db, colName), ...where);

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      if (setLoading) setLoading(false);
      return {
        status: 200,
        data: documents,
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      console.log(error);
      return {
        status: 400,
        error: error.message,
      };
    }
  };

  const getRTDocuments = async (colName, setData, setLoading, where = []) => {
    try {
      if (setLoading) setLoading(true);
      const q = query(collection(db, colName), ...where);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        if (setData) setData(data);
      });

      if (setLoading) setLoading(false);
      return {
        status: 200,
        unsubscribe,
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      console.log(error);
      return {
        status: 400,
        error: error.message,
      };
    }
  };

  const addDocumentWithId = async (colName, documentId, body, setLoading) => {
    if (setLoading) setLoading(true);
    try {
      await setDoc(doc(db, colName, documentId), {
        ...body,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      if (setLoading) setLoading(false);
      return {
        status: 200,
        data: {
          id: documentId,
          ...body,
        },
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        error: error.message,
      };
    }
  };

  const addDocument = async (colName, body, setLoading) => {
    if (setLoading) setLoading(true);
    try {
      const docRef = await addDoc(collection(db, colName), {
        ...body,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      if (setLoading) setLoading(false);
      return {
        status: 200,
        data: {
          id: docRef.id,
        },
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        error: error.message,
      };
    }
  };

  const addDocument2 = async (colName, body, setLoading) => {
    if (setLoading) setLoading(true);
    try {
      const docRef = await addDoc(collection(db, colName), {
        ...body,
      });

      if (setLoading) setLoading(false);
      return {
        status: 200,
        data: {
          id: docRef.id,
        },
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        error: error.message,
      };
    }
  };

  const updateDocument = async (colName, documentId, body, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const docuRef = doc(db, colName, documentId);

      await updateDoc(docuRef, {
        ...body,
        updatedAt: serverTimestamp(),
      });

      if (setLoading) setLoading(false);
      return {
        status: 200,
        data: {
          id: documentId,
          ...body,
        },
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        error: error.message,
      };
    }
  };

  const deleteDocument = async (colName, documentId, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      await deleteDoc(doc(db, colName, documentId));

      if (setLoading) setLoading(false);
      return {
        status: 200,
        data: {
          id: documentId,
        },
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        error: error.message,
      };
    }
  };

  const uploadImage = async (image, setLoading) => {
    try {
      if (setLoading) setLoading(true);

      const { height, width, uri } = image;

      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: width / 2.5, height: height / 2.5 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );

      const blob = await fetch(result.uri).then((res) => res.blob());

      const storageRef = ref(storage, "/images/" + new Date().getTime());
      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);

      if (setLoading) setLoading(false);

      return {
        status: 200,
        data: url,
      };
    } catch (ex) {
      if (setLoading) setLoading(false);
      Alert.alert("Error", ex.message);
      return {
        status: 400,
        error: ex.message,
      };
    }
  };

  const getCount = async (colName) => {
    const coll = collection(db, colName);
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  };

  const getReferece = (colName, docId) => {
    return doc(db, colName, docId);
  };

  return {
    getDocumentById,
    getDocuments,
    addDocumentWithId,
    addDocument,
    updateDocument,
    deleteDocument,
    uploadImage,
    getRTDocuments,
    getCount,
    getReferece,
    addDocument2,
  };
}
