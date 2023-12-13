import { useContext, useEffect, useState } from "react";
import { getAllBlogsQuery } from "../../hooks/Blogs.api";

import { onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ArticleProps } from "../../types/blogs.types";
import Layout from "../Layout/Layout";
import BlogsPreview from "./BlogsPreview";

export default function AllBlogs() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([] as ArticleProps[]);

  useEffect(() => {
    const queryRef = getAllBlogsQuery();

    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          doc_id: doc.id,
        });
      });

      setBlogs(data.reverse());
    });

    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  return (
    <Layout>
      <BlogsPreview blogs={blogs} />
    </Layout>
  );
}
