import { CreateStandUpType, StandUpProps } from "@/types/standUps.types";
import { addDoc, collection, deleteDoc, doc, getDoc, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

import { db } from "@/config/firebase";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { deleteCommentsForStandUp } from "./Comments.api";

const today = format(new Date(), "yyyy-MM-dd");
const standUpsRef = collection(db, "standUps");
const newStandUpsRef = collection(db, "newStandUps");

export const getUserStandUpsByDateQuery = (params: { date: string; user_email: string }) => {
  return query(standUpsRef, where("user_email", "==", params.user_email), where("date", "==", params.date));
};

export const getUserStandUpsQuery = (user_email: string) => {
  return query(standUpsRef, where("user_email", "==", user_email));
};

export const getAllStandUpsByDateQuery = (date: string) => {
  return query(standUpsRef, where("date", "==", date));
};

export const getAllStandUpsQuery = () => {
  return query(standUpsRef, orderBy("createdAt"));
};

export const getStandUpQuery = async (doc_id: string) => {
  let response = {};
  const docRef = doc(db, "standUps", doc_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    response = {
      ...docSnap.data(),
      doc_id: docSnap.id,
    };
    return response;
  } else {
    throw new Error("No such document!");
  }
};

export const useCreateStandUp = () => {
  return useMutation({
    mutationFn: async (data: CreateStandUpType) => {
      const standUpRef = await addDoc(newStandUpsRef, {
        user_uid: data.user_uid,
        user_email: data.user_email,
        todaysPlan: data.todaysPlan,
        question: data.questions,
        blockers: data.blockers,
        date: today,
        createdAt: serverTimestamp(),
      });
      return standUpRef;
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};

export const useEditStandUp = () => {
  return useMutation({
    mutationFn: async (data: StandUpProps) => {
      const docRef = doc(db, "standUps", data?.doc_id);

      await updateDoc(docRef, {
        title: data.title,
        description: data.description,
      });

      let response = getStandUpQuery(data?.doc_id);

      return response;
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};

export const useDeleteStandUp = () => {
  return useMutation({
    mutationFn: async (doc_id: string) => {
      const docRef = doc(db, "standUps", doc_id);
      await deleteCommentsForStandUp(doc_id);
      await deleteDoc(docRef);
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};
