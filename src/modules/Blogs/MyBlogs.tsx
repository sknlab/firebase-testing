import Layout from "@/modules/Layout/Layout";
import React from "react";
import TodaysBlog from "./TodaysBlog";

export default function MyBlogs() {
  let days = 10;
  const today = new Date();
  const array = [];

  for (let i = 0; i <= days; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - i);
    array.push(pastDate);
  }

  return (
    <Layout>
      {array.map((date) => (
        <React.Fragment key={date.toString()}>
          <TodaysBlog date={date} />
        </React.Fragment>
      ))}
    </Layout>
  );
}
