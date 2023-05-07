import { doc, getDoc, setDoc, updateDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface PayloadProps {
  workflow_id: string;
  owner_id: string;
  name: string;
  description: string;
}

const createNewWorkflow = async (payload: PayloadProps) => {
  await setDoc(doc(db, "workflows", payload.workflow_id), {
    owner_id: payload.owner_id,
    workflow_id: payload.workflow_id,
    name: payload.name,
    description: payload.description,
    type: "Text",
    prompt: "",
    actions: []
  });
};

const updateWorkflow = async (wid: string, data: object) => {
  await updateDoc(doc(db, "workflows", wid), data);
};

// get all workflows where owner_id = uid
const getWorkflowsForUserId = async (uid: string) => {
  const q = query(collection(db, "workflows"), where("owner_id", "==", uid));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};


const getWorkflow = async (wid: string) => {
  
  const ref = doc(db, "workflows", wid);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("WORKFLOW DOES NOT EXIST");
  }
};

export { createNewWorkflow, updateWorkflow, getWorkflow, getWorkflowsForUserId };
