import { addDoc, collection, deleteDoc, doc, getDoc, query, updateDoc, where } from "firebase/firestore";

import { useMutation } from "@tanstack/react-query";
import { db } from "../config/firebase";
import { ArticleProps, CreateArticleType } from "../types/blogs.types";

const blogsRef = collection(db, "blogs");

export const getBlogsQuery = (user_email: string) => {
  return query(blogsRef, where("user_email", "==", user_email));
};

export const getArticleQuery = async (doc_id: string) => {
  let response = {};
  const docRef = doc(db, "blogs", doc_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    response = {
      ...docSnap.data(),
      doc_id: docSnap.id,
    };
    return response;
  } else {
    console.log("No such document!");
  }
};

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: async (data: CreateArticleType) => {
      const articleRef = await addDoc(blogsRef, {
        user_uid: data.user_uid,
        user_email: data.user_email,
        title: data.title,
        description: data.description,
      });
      return articleRef;
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};

export const useEditArticle = () => {
  return useMutation({
    mutationFn: async (data: ArticleProps) => {
      const docRef = doc(db, "blogs", data?.doc_id);

      await updateDoc(docRef, {
        title: data.title,
        description: data.description,
      });

      let response = getArticleQuery(data?.doc_id);

      return response;
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: async (doc_id: string) => {
      const docRef = doc(db, "blogs", doc_id);
      await deleteDoc(docRef);
      let response = getArticleQuery(doc_id);

      return response;
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};
