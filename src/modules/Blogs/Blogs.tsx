import { Spinner } from "@chakra-ui/react";
import { onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getBlogsQuery } from "../../hooks/Blogs.api";
import { ArticleProps } from "../../types/blogs.types";
import Layout from "../Layout/Layout";
import BlogsTable from "./BlogsTable";

const data = [
  {
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    description: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  },
  {
    id: 2,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    description: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  },
];

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

  return <Layout>{data?.length > 0 ? <BlogsTable blogs={blogs} /> : <Spinner />}</Layout>;
}
