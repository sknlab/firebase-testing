import { useContext, useEffect, useState } from "react";

import { ArticleProps } from "@/types/blogs.types";
import { AuthContext } from "@/context/AuthContext";
import BlogsPreview from "@/modules/Blogs/BlogsPreview";
import Layout from "@/modules/Layout/Layout";
import { getAllBlogsQuery } from "@/hooks/Blogs.api";
import { onSnapshot } from "firebase/firestore";

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
