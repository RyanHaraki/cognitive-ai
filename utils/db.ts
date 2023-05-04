import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const createNewUser = async (uid: string, email: string, name: string) => {
  await setDoc(doc(db, "users", uid), {
    uid: uid,
    email: email,
    name: name,
    projects: [],
  });
};

const updateUser = async (uid: string, data: object) => {
  await updateDoc(doc(db, "users", uid), data);
};

const getUser = async (uid: string) => {
  const ref = doc(db, "users", uid);

  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("USER DOES NOT EXIST");
  }
};

export { createNewUser, updateUser, getUser };
