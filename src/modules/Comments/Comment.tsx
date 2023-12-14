import { Avatar, Button, Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/context/AuthContext";
import CommentLikes from "../Likes/CommentLikes";
import { CommentProps } from "@/types/comments.types";
import { ConfirmDeleteComment } from "./ConfirmDeleteComment";
import EditCommentModal from "./EditCommentModal";

export default function Comment({ comment }: { comment: CommentProps }) {
  const { user } = useContext(AuthContext);
  const deleteDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();
  const [selectedComment, setSelectedComment] = useState({} as CommentProps);

  useEffect(() => {
    setSelectedComment(comment);
  }, []);

  const handleEditClick = (comment: CommentProps) => {
    setSelectedComment(comment);
    editDisclosure.onOpen();
  };

  const handleUpdateCommentLikes = (res: string[] | undefined) => {
    setSelectedComment({
      ...selectedComment,
      likes: res,
    });
  };

  return (
    <Stack gap={0}>
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
            <Button colorScheme="facebook" variant="ghost" size="sm" onClick={() => handleEditClick(comment)} fontWeight={400}>
              Edit
            </Button>
            <Button colorScheme="red" variant="ghost" size="sm" fontWeight={400} onClick={deleteDisclosure.onOpen}>
              Delete
            </Button>
            <EditCommentModal currentComment={selectedComment} isOpen={editDisclosure.isOpen} onClose={editDisclosure.onClose} />
            <ConfirmDeleteComment doc_id={comment?.doc_id} isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} />
          </Flex>
        )}
      </Flex>
      <CommentLikes likesArray={selectedComment?.likes} doc_id={selectedComment?.doc_id} handleUpdateLikes={handleUpdateCommentLikes} />
    </Stack>
  );
}
