import { ArticleProps, CreateArticleType } from "@/types/blogs.types";
import { addDoc, collection, deleteDoc, doc, getDoc, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

import { db } from "@/config/firebase";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");
const blogsRef = collection(db, "blogs");

export const getUserBlogsByDateQuery = (params: { date: string; user_email: string }) => {
  return query(blogsRef, where("user_email", "==", params.user_email), where("date", "==", params.date));
};

export const getUserBlogsQuery = (user_email: string) => {
  return query(blogsRef, where("user_email", "==", user_email));
};

export const getAllBlogsByDateQuery = (date: string) => {
  return query(blogsRef, where("date", "==", date));
};

export const getAllBlogsQuery = () => {
  return query(blogsRef, orderBy("createdAt"));
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
    throw new Error("No such document!");
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
        date: today,
        likes: [],
        createdAt: serverTimestamp(),
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
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};
