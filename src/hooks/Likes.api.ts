import { doc, updateDoc } from "firebase/firestore";

import { useMutation } from "@tanstack/react-query";
import { db } from "../config/firebase";
import { LikesProps } from "../types/blogs.types";

export const useUpdateLikesArticle = () => {
  return useMutation({
    mutationFn: async (data: LikesProps) => {
      const docRef = doc(db, "blogs", data.doc_id);

      await updateDoc(docRef, {
        likes: data.array,
      });
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};
