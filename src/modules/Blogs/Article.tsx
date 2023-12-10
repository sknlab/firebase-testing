import { Button, Center, Flex, HStack, Icon, Spinner, Text, VStack } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getArticleQuery } from "../../hooks/Blogs.api";
import { ArticleProps } from "../../types/blogs.types";
import Layout from "../Layout/Layout";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState({} as ArticleProps);

  useEffect(() => {
    if (id) {
      getArticleQuery(id).then((res) => setArticle(res));
    }
  }, [id]);

  console.log(article);

  return (
    <Layout>
      {article?.doc_id ? (
        <HStack alignItems="start" my={6}>
          <VStack h="100%" w="100%" alignItems={"start"} justifyContent={"start"} gap={4}>
            <Text fontSize="14px" fontWeight={600} letterSpacing={0.4} lineHeight="20px">
              Document ID{id}
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
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
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
