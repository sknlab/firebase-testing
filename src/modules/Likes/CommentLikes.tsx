import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Center, Flex, IconButton, Text } from "@chakra-ui/react";

import { AuthContext } from "@/context/AuthContext";
import { CheckIfUserEmailIsInLikesArray } from "@/helpers/likes.helpers";
import { LikesComponentProps } from "@/types/likes.types";
import React from "react";
import { useUpdateLikesComment } from "@/hooks/Likes.api";

export default function CommentLikes({ doc_id, likesArray, handleUpdateLikes }: LikesComponentProps) {
  const { user } = React.useContext(AuthContext);
  let newLikesArray = likesArray ? [...likesArray] : [];

  let count = newLikesArray?.length;
  const isLike = CheckIfUserEmailIsInLikesArray({ newLikesArray, user_email: user?.email });

  const updateLikesComment = useUpdateLikesComment();

  const handleAddLike = async () => {
    const array = [...newLikesArray, user?.email];
    await updateLikesComment.mutateAsync({ array, doc_id });
    handleUpdateLikes(array);
  };

  const handleRemoveLike = async () => {
    const array = newLikesArray.filter((email) => email !== user?.email);
    await updateLikesComment.mutateAsync({ array, doc_id });
    handleUpdateLikes(array);
  };

  return (
    <Flex h="2em" alignItems="center" justifyContent="flex-start">
      <LikeButton isLike={isLike} handleAddLike={handleAddLike} handleRemoveLike={handleRemoveLike} />
      <Center w="1.5em" h="2em">
        <Text fontSize="14px" fontWeight={400} pt={1} letterSpacing={0.4}>
          {count}
        </Text>
      </Center>
    </Flex>
  );
}

const LikeButton = ({ isLike, handleAddLike, handleRemoveLike }: { isLike: boolean; handleAddLike: () => void; handleRemoveLike: () => void }) => {
  return (
    <IconButton
      variant="ghost"
      colorScheme="white"
      aria-label="liked"
      fontSize="20px"
      size="xs"
      icon={isLike ? <AiFillLike /> : <AiOutlineLike />}
      onClick={isLike ? handleRemoveLike : handleAddLike}
    />
  );
};
