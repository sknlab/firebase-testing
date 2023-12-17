import { Button, Card, CardBody, Flex, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import { getUserBlogsByDateQuery } from "@/hooks/Blogs.api";
import { ArticleProps } from "@/types/blogs.types";
import { format } from "date-fns";
import { onSnapshot } from "firebase/firestore";
import { FaAngleRight } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CreateArticleModal } from "./CreateArticleModal";

export default function TodaysBlog({ date }: { date: Date }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const todayShortFormat = format(date, "yyyy-MM-dd");
  const todayLongFormat = format(date, "yyyy-MMMM-dd");
  const { user } = useContext(AuthContext);

  const [blogs, setBlogs] = useState([] as ArticleProps[]);
  const article = blogs?.[0];
  const params = { date: todayShortFormat, user_email: user?.email };

  const navigate = useNavigate();
  const handleView = (doc_id: string) => {
    navigate(`/article/${doc_id}`);
  };

  useEffect(() => {
    const queryRef = getUserBlogsByDateQuery(params);

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
    <Stack w={{ base: "98%", lg: "90%" }} mx="auto">
      <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
        Today - {todayLongFormat}
      </Text>

      {blogs?.length > 0 ? (
        <Card>
          <CardBody>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
                {user?.displayName} completed today's article.
              </Text>
              <Button variant="ghost" alignItems="center" color="#2563EB" onClick={() => handleView(article?.doc_id)}>
                <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
                  View
                </Text>
                <Icon as={FiArrowUpRight} h="1em" w="1em" />
              </Button>
            </Flex>
          </CardBody>
        </Card>
      ) : (
        <Card>
          {todayShortFormat === today ? (
            <CardBody background="#fff2f2">
              <Flex w="100%" alignItems="center" justifyContent="space-between">
                <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2} color="red.500">
                  Attend today's stand-up {user?.displayName}
                </Text>
                <WriteModal />
              </Flex>
            </CardBody>
          ) : (
            <CardBody background="#fafafa">
              <Button isDisabled variant="ghost" justifyContent="start" w="100%">
                <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
                  There were no stand-ups held on this day
                </Text>
              </Button>
            </CardBody>
          )}
        </Card>
      )}
    </Stack>
  );
}

const WriteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="ghost" alignItems="center" color="red.500" onClick={onOpen}>
        <Icon as={FaAngleRight} />
      </Button>

      <CreateArticleModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
