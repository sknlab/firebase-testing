import { Button } from "@chakra-ui/react";
import Layout from "@/modules/Layout/Layout";
import React from "react";
import StandUp from "@/modules/StandUps/StandUp";

export default function StandUps() {
  const [days, setDays] = React.useState(7);
  const today = new Date();
  const array = [];

  const handleLoadMore = () => {
    setDays((prev) => prev + 7);
  };

  for (let i = 0; i <= days; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - i);
    array.push(pastDate);
  }

  return (
    <Layout>
      {array.map((date) => (
        <React.Fragment key={date.toString()}>
          <StandUp date={date} />
        </React.Fragment>
      ))}
      <Button onClick={handleLoadMore} colorScheme="facebook" variant="solid" w={{ base: "98%", lg: "90%" }} mx="auto" mt={2} mb={6}>
        Load more
      </Button>
    </Layout>
  );
}
