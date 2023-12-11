import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useParams } from "react-router-dom";
import { getArticleQuery } from "../../hooks/Blogs.api";
import Layout from "../Layout/Layout";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { EditArticleModal } from "./EditArticleModal";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState({} as any);
  const deleteDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();

  useEffect(() => {
    if (id) {
      getArticleQuery(id).then((res) => setArticle(res));
    }
  }, [article]);

  return (
    <Layout>
      {article?.doc_id ? (
        <HStack alignItems="start" my={6}>
          <Card>
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
          </Card>

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
          <EditArticleModal article={article} isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose} />
          <ConfirmDeleteModal doc_id={article?.doc_id} isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} />
        </HStack>
      ) : (
        <Center w="100%">
          <Spinner />
        </Center>
      )}
    </Layout>
  );
}
