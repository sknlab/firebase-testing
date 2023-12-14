import { Stack, Text, AccordionPanel, AccordionIcon, AccordionButton, Box, Accordion, AccordionItem, Avatar, Flex, Button, useDisclosure, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Comment } from "../../types/comments.types";
import { getArticleCommentsQuery } from "../../hooks/Comments.api";
import { onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ConfirmDeleteComment } from "./ConfirmDeleteComment";
import { EditCommentModal } from "./EditCommentModal";

type CommentProps = {
  articleId: string;
};

export default function Comments({ articleId }: CommentProps) {
  const [comments, setComments] = useState([] as Comment[]);
  const { user } = useContext(AuthContext);
  const deleteDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();

  useEffect(() => {
    if (articleId) {
      const queryRef = getArticleCommentsQuery(articleId);

      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({
            ...doc.data(),
            doc_id: doc.id,
          });
        });

        setComments(data.reverse());
      });

      return () => {
        unsubscribe();
      };
    }
  }, [articleId]);

  return (
    <Stack minWidth="100%">
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {comments?.length <= 0 ? (
                <Text fontSize="smaller" textTransform="uppercase">
                  No comments posted yet
                </Text>
              ) : (
                <Text fontSize="smaller" textTransform="uppercase">
                  Comments ({comments?.length})
                </Text>
              )}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          {comments?.map((comment) => (
            <AccordionPanel pb={4} key={comment?.doc_id}>
              <Flex alignItems="center" gap={2}>
                <Avatar size="sm" />
                <Text fontWeight={400} fontSize="12px" letterSpacing={0.4} lineHeight="20px" my={2}>
                  {comment?.user_email}
                </Text>
              </Flex>

              <Text pt="2" fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                {comment?.comment}
              </Text>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="small" color="grey">
                  Posted on {comment?.date}
                </Text>
                {user?.email == comment?.user_email && (
                  <Flex alignItems="center">
                    <Button colorScheme="facebook" variant="ghost" size="sm" onClick={editDisclosure.onOpen} fontWeight={400}>
                      Edit
                    </Button>
                    <Button colorScheme="red" variant="ghost" size="sm" onClick={deleteDisclosure.onOpen} fontWeight={400}>
                      Delete
                    </Button>
                    <ConfirmDeleteComment doc_id={comment?.doc_id} isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} />
                    <EditCommentModal currentComment={comment} isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose} />
                  </Flex>
                )}
              </Flex>
            </AccordionPanel>
          ))}
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
