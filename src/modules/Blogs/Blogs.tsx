import { useContext, useEffect, useState } from "react";

import { ArticleProps } from "../../types/blogs.types";
import { AuthContext } from "../../context/AuthContext";
import BlogsTable from "./BlogsTable";
import Layout from "../Layout/Layout";
import { getBlogsQuery } from "../../hooks/Blogs.api";
import { onSnapshot } from "firebase/firestore";

export default function Blogs() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([] as ArticleProps[]);

  useEffect(() => {
    const queryRef = getBlogsQuery(user?.email);

    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          doc_id: doc.id,
        });
      });

      setBlogs(data);
    });

    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  return (
    <Layout>
      <BlogsTable blogs={blogs} />
    </Layout>
  );
}
