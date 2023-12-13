import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/config/firebase";
import { LikesApiProps } from "@/types/likes.types";
import { useMutation } from "@tanstack/react-query";

export const useUpdateLikesArticle = () => {
  return useMutation({
    mutationFn: async (data: LikesApiProps) => {
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
