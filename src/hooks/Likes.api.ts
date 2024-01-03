import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import { LikesApiProps } from '@/types/likes.types';
import { useMutation } from '@tanstack/react-query';

export const useUpdateLikesStandUp = () => {
  return useMutation({
    mutationFn: async (data: LikesApiProps) => {
      const docRef = doc(db, 'standUps', data.doc_id);

      await updateDoc(docRef, {
        likes: data.array,
      });
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};

export const useUpdateLikesComment = () => {
  return useMutation({
    mutationFn: async (data: LikesApiProps) => {
      const docRef = doc(db, 'comments', data.doc_id);

      await updateDoc(docRef, {
        likes: data.array,
      });
    },
    onError: (error) => {
      throw new Error(`${error}`);
    },
  });
};
