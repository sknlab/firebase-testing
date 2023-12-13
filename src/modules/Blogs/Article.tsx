import { Box, Button, Card, CardBody, Center, Flex, HStack, Heading, Icon, Stack, StackDivider, Text, useDisclosure } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import ConfirmDeleteModal from "@/modules/Blogs/ConfirmDeleteModal";
import { EditArticleModal } from "./EditArticleModal";
import { IoIosArrowRoundBack } from "react-icons/io";
import Layout from "@/modules/Layout/Layout";
import Likes from "@/modules/Blogs/Likes";
import LoadingSpinner from "@/components/Spinner/LoadingSpinner";
import { getArticleQuery } from "@/hooks/Blogs.api";

export default function Article() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [article, setArticle] = useState({} as any);
  const deleteDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();

  useEffect(() => {
    if (id) {
      getArticleQuery(id).then((res) => setArticle(res));
    }
  }, [id]);

  const handleUpdateArticle = (res: {} | undefined) => {
    setArticle(res);
  };

  const handleUpdateArticleLikes = (res: string[] | undefined) => {
    setArticle({
      ...article,
      likes: res,
    });
  };

  return (
    <Layout>
      <Center w="100%">
        <Link to="/">
          <HStack gap={2} color="#2563EB">
            <Icon as={IoIosArrowRoundBack} />
            <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
              View all Posts
            </Text>
          </HStack>
        </Link>
      </Center>
      {article?.doc_id ? (
        <HStack alignItems="start" my={6} position="relative">
          <Card minW="100%">
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Document ID
                  </Heading>
                  <Text pt="2" fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                    {id}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Article by
                  </Heading>
                  <Text pt="2" fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                    {article?.user_email}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    title
                  </Heading>
                  <Text pt="2" fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                    {article?.title}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    description
                  </Heading>
                  <Text pt="2" fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                    {article?.description}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
            <Likes likesArray={article?.likes} doc_id={article?.doc_id} handleUpdateArticleLikes={handleUpdateArticleLikes} />
          </Card>

          {user?.email == article?.user_email && (
            <Stack position="absolute" top={0} right={0}>
              <Flex gap={2}>
                <Button variant="ghost" colorScheme="green" gap={2} onClick={editDisclosure.onOpen}>
                  <Text>Edit</Text>
                  <Icon as={FaEdit} color="green" />
                </Button>
                <Button variant="ghost" colorScheme="red" gap={2} onClick={deleteDisclosure.onOpen}>
                  <Text>Delete</Text>
                  <Icon as={FaTrash} color="red" />
                </Button>
              </Flex>
              <EditArticleModal
                article={article}
                handleUpdateArticle={handleUpdateArticle}
                isOpen={editDisclosure.isOpen}
                onClose={editDisclosure.onClose}
              />
              <ConfirmDeleteModal doc_id={article?.doc_id} isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} />
            </Stack>
          )}
        </HStack>
      ) : (
        <LoadingSpinner />
      )}
    </Layout>
  );
}
