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
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { Suspense, lazy, useContext, useEffect, useState } from 'react';

import ArticleLikes from '@/modules/Likes/ArticleLikes';
import { AuthContext } from '@/context/AuthContext';
import ConfirmDeleteModal from '@/modules/StandUps/ConfirmDeleteModal';
import { CreateCommentModal } from '@/modules/Comments/CreateCommentModal';
import { EditArticleModal } from '@/modules/StandUps/EditArticleModal';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Layout from '@/modules/Layout/Layout';
import LoadingSpinner from '@/components/Spinner/LoadingSpinner';
import { getArticleQuery } from '@/hooks/Blogs.api';

const Comments = lazy(() => import('@/modules/Comments/Comments'));

export default function Article() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [article, setArticle] = useState({} as any);
  const deleteDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();
  const commentDisclosure = useDisclosure();

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
            <Text
              fontWeight={400}
              letterSpacing={-0.1}
              fontSize="14px"
              lineHeight="20px"
              textTransform="capitalize"
            >
              View all Posts
            </Text>
          </HStack>
        </Link>
      </Center>
      {article?.doc_id ? (
        <>
          <HStack alignItems="start" my={6} position="relative">
            <Card minW="100%">
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box mt={{ base: '2em', md: 0 }}>
                    <Flex
                      gap={1}
                      fontSize="12px"
                      letterSpacing={0.4}
                      lineHeight="20px"
                      my={2}
                      alignItems="center"
                      color="#2563EB"
                    >
                      <Text fontWeight={400}>By</Text>
                      <Text fontWeight={400}>{article?.user_email}</Text>
                    </Flex>
                    <Text
                      pt="2"
                      fontSize="16px"
                      fontWeight={600}
                      letterSpacing={0.4}
                      lineHeight="20px"
                    >
                      {article?.title}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      description
                    </Heading>
                    <Text
                      pt="2"
                      fontSize="14px"
                      fontWeight={400}
                      letterSpacing={0.4}
                      lineHeight="20px"
                    >
                      {article?.description}
                    </Text>
                  </Box>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text
                      fontSize="12px"
                      letterSpacing={0.4}
                      lineHeight="20px"
                      color="grey"
                    >
                      Posted on {article?.date}
                    </Text>
                    <ArticleLikes
                      likesArray={article?.likes}
                      doc_id={article?.doc_id}
                      handleUpdateLikes={handleUpdateArticleLikes}
                    />
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
            <Stack position="absolute" top={2} right={2}>
              <Flex gap={2}>
                <Button
                  variant="ghost"
                  colorScheme="facebook"
                  gap={2}
                  onClick={commentDisclosure.onOpen}
                >
                  <Text
                    fontWeight={400}
                    letterSpacing={-0.1}
                    fontSize="14px"
                    lineHeight="20px"
                    textTransform="capitalize"
                  >
                    Comment
                  </Text>
                  <Icon as={FaComment} color="facebook" />
                </Button>
                <CreateCommentModal
                  articleId={id}
                  isOpen={commentDisclosure.isOpen}
                  onClose={commentDisclosure.onClose}
                />
                {user?.email == article?.user_email && (
                  <>
                    <Flex gap={2}>
                      <Button
                        variant="ghost"
                        colorScheme="green"
                        gap={2}
                        onClick={editDisclosure.onOpen}
                      >
                        <Text
                          fontWeight={400}
                          letterSpacing={-0.1}
                          fontSize="14px"
                          lineHeight="20px"
                          textTransform="capitalize"
                        >
                          Edit
                        </Text>
                        <Icon as={FaEdit} color="green" />
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="red"
                        gap={2}
                        onClick={deleteDisclosure.onOpen}
                      >
                        <Text
                          fontWeight={400}
                          letterSpacing={-0.1}
                          fontSize="14px"
                          lineHeight="20px"
                          textTransform="capitalize"
                        >
                          Delete
                        </Text>
                        <Icon as={FaTrash} color="red" />
                      </Button>
                    </Flex>
                    <EditArticleModal
                      article={article}
                      handleUpdateArticle={handleUpdateArticle}
                      isOpen={editDisclosure.isOpen}
                      onClose={editDisclosure.onClose}
                    />
                    <ConfirmDeleteModal
                      doc_id={article?.doc_id}
                      isOpen={deleteDisclosure.isOpen}
                      onClose={deleteDisclosure.onClose}
                    />
                  </>
                )}
              </Flex>
            </Stack>
          </HStack>
          <Suspense>
            <Comments articleId={article?.doc_id} />
          </Suspense>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </Layout>
  );
}
