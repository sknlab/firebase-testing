import { addDoc, collection, doc, getDoc, query, where } from "firebase/firestore";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../config/firebase";
import { CreateArticleType } from "../types/blogs.types";

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
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
    },
  });
};
