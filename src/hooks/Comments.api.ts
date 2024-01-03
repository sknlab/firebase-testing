import { addDoc, collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { CommentProps, CreateCommentType } from "../types/comments.types";

import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { db } from "../config/firebase";

const today = format(new Date(), "yyyy-MM-dd");
const commentsRef = collection(db, "comments");

export const useCreateComment = () => {
  return useMutation({
    mutationFn: async (data: CreateCommentType) => {
      const commentRef = await addDoc(commentsRef, {
        user_uid: data.user_uid,
        user_email: data.user_email,
        comment: data.comment,
        date: today,
        likes: [],
        article_id: data.article_id,
      });
      return commentRef;
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};

export const getArticleCommentsQuery = (article_id: string) => {
  return query(commentsRef, where("article_id", "==", article_id));
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: async (doc_id: string) => {
      const docRef = doc(db, "comments", doc_id);
      return await deleteDoc(docRef);
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationFn: async (data: CommentProps) => {
      const docRef = doc(db, "comments", data?.doc_id);

      return await updateDoc(docRef, {
        comment: data.comment,
      });
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};
