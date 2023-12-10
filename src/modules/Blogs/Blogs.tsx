import BlogsTable from "./BlogsTable";
import Layout from "../Layout/Layout";
import { Spinner } from "@chakra-ui/react";

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
  return <Layout>{data?.length > 0 ? <BlogsTable data={data} /> : <Spinner />}</Layout>;
}
