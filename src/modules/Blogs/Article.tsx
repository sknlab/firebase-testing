import { Button, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { ArticleProps } from "./BlogsTable";

export default function Article() {
  const { id } = useParams();
  let article: ArticleProps = {
    id: 1,
    title: "Title",
    description: "Description",
  };
  return (
    <Layout>
      <HStack alignItems="start" my={6}>
        <VStack h="100%" w="100%" alignItems={"start"} justifyContent={"start"} gap={4}>
          <Text fontSize="14px" fontWeight={600} letterSpacing={0.4} lineHeight="20px">
            Article {id}
          </Text>
          <Text fontSize="14px" fontWeight={600} letterSpacing={0.4} lineHeight="20px" textTransform="uppercase">
            Title
          </Text>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            {article?.title}
          </Text>
          <Text fontSize="14px" fontWeight={600} letterSpacing={0.4} lineHeight="20px" textTransform="uppercase">
            Description
          </Text>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            {article?.description}
          </Text>
        </VStack>
        <ArticleActions />
      </HStack>
    </Layout>
  );
}

const ArticleActions = () => {
  return (
    <Flex gap={2}>
      <Button variant="ghost" colorScheme="green" gap={2}>
        <Text>Edit</Text>
        <Icon as={FaEdit} color="green" />
      </Button>
      <Button variant="ghost" colorScheme="red" gap={2}>
        <Text>Delete</Text>
        <Icon as={FaTrash} color="red" />
      </Button>
    </Flex>
  );
};
