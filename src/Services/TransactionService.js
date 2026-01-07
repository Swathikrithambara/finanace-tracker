import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";

/**
 * Get all transactions for a user
 */
export const getTransactions = async (uid) => {
  const q = query(
    collection(db, "users", uid, "transactions"),
    orderBy("created_at", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Add a transaction
 */
export const addTransaction = async (uid, transaction) => {
  await addDoc(
    collection(db, "users", uid, "transactions"),
    transaction
  );
};

/**
 * Delete a transaction
 */
export const deleteTransaction = async (uid, transactionId) => {
  await deleteDoc(
    doc(db, "users", uid, "transactions", transactionId)
  );
};
