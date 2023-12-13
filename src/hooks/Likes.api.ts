import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/config/firebase";
import { LikesProps } from "@/types/blogs.types";
import { useMutation } from "@tanstack/react-query";

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
