import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { ArticleProps } from "@/types/blogs.types";
import { AuthContext } from "@/context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { MdBolt } from "react-icons/md";
import WriteModal from "./WriteModal";
import { format } from "date-fns";
import { getAllBlogsByDateQuery } from "@/hooks/Blogs.api";
import { onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CheckUserInBlogs({ user_email, blogs }: { user_email: string; blogs: ArticleProps[] }) {
  return blogs.some((blog) => blog.user_email === user_email);
}

export default function StandUp({ date }: { date: Date }) {
  const { user } = useContext(AuthContext);
  const today = format(new Date(), "yyyy-MM-dd");
  const dateShortFormat = format(date, "yyyy-MM-dd");
  const dateLongFormat = format(date, "E, yyyy-MMMM-dd");
  const [blogs, setBlogs] = useState([] as ArticleProps[]);
  const navigate = useNavigate();

  const isUser = CheckUserInBlogs({ user_email: user?.email, blogs });

  const handleView = (doc_id: string) => {
    navigate(`/article/${doc_id}`);
  };

  useEffect(() => {
    const queryRef = getAllBlogsByDateQuery(dateShortFormat);

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
    <Stack w={{ base: "98%", lg: "90%" }} mx="auto" mb={8} background="#fafafa">
      <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
        {dateLongFormat}
      </Text>

      {isUser === false && dateShortFormat === today && (
        <Flex w="100%" h="3em" alignItems="center" justifyContent="space-between" color="red.500">
          <Flex h="inherit" gap={1} alignItems="center" justifyContent="space-between">
            <Icon as={MdBolt} boxSize={8} />
            <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
              Attend today's stand-up {user?.displayName}
            </Text>
          </Flex>
          <WriteModal />
        </Flex>
      )}

      {isUser === true && (
        <Flex w="100%" h="3em" alignItems="center" justifyContent="space-between" color="green.500">
          <Flex h="inherit" gap={1} alignItems="center" justifyContent="space-between">
            <Icon as={FaCheckCircle} h="1em" w="1em" />
            <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2} color="green.500">
              You attended the stand-up.
            </Text>
          </Flex>
          <Button variant="ghost" alignItems="center" color="inherit" onClick={() => handleView(blogs[0]?.doc_id)}>
            <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" textTransform="capitalize">
              View
            </Text>
            <Icon as={FiArrowUpRight} h="1em" w="1em" />
          </Button>
        </Flex>
      )}

      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Text as="span" flex="1" textAlign="left" fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
                {blogs?.length} team member(s) attended the stand-up.
              </Text>
              {blogs?.length > 0 && <AccordionIcon />}
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {blogs?.map((blog) => (
              <Flex
                key={blog?.doc_id}
                my={3}
                w="100%"
                h="3em"
                borderRadius="md"
                boxShadow="base"
                background="white"
                px={2}
                alignItems="center"
                justifyContent="space-between">
                <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
                  {blog?.user_email} attended the stand-up.
                </Text>
                <Button variant="ghost" alignItems="center" color="#2563EB" onClick={() => handleView(blog?.doc_id)}>
                  <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" textTransform="capitalize">
                    View
                  </Text>
                  <Icon as={FiArrowUpRight} h="1em" w="1em" />
                </Button>
              </Flex>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
