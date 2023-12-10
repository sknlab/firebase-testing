import { addDoc, collection } from "firebase/firestore";

import { db } from "../config/firebase";
import { CreateArticleType } from "../types/blogs.types";

export const CreateBlog = async (data: CreateArticleType) => {
  try {
    const blogsRef = collection(db, "blogs");
    const articleRef = await addDoc(blogsRef, {
      user_uid: data.user_uid,
      user_email: data.user_email,
      title: data.title,
      description: data.description,
    });
    return articleRef;
  } catch (err) {
    console.error(err);
  }
};
