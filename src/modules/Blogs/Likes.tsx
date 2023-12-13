import { Center, Flex, IconButton, Text } from "@chakra-ui/react";

import { AuthContext } from "@/context/AuthContext";
import { CheckIfUserEmailIsInLikesArray } from "@/helpers/likes.helpers";
import { useUpdateLikesArticle } from "@/hooks/Likes.api";
import { LikesComponentProps } from "@/types/likes.types";
import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

export default function Likes({ doc_id, likesArray, handleUpdateArticleLikes }: LikesComponentProps) {
  const { user } = React.useContext(AuthContext);
  let newLikesArray = likesArray;

  let count = newLikesArray?.length;
  const isLike = CheckIfUserEmailIsInLikesArray({ newLikesArray, user_email: user?.email });

  const updateLikesArticle = useUpdateLikesArticle();

  const handleAddLike = async () => {
    const array = [...newLikesArray, user?.email];
    await updateLikesArticle.mutateAsync({ array, doc_id });
    handleUpdateArticleLikes(array);
  };

  const handleRemoveLike = async () => {
    const array = newLikesArray.filter((email) => email !== user?.email);
    await updateLikesArticle.mutateAsync({ array, doc_id });
    handleUpdateArticleLikes(array);
  };

  return (
    <Flex h="3em" px={6} alignItems="center" justifyContent="flex-end">
      <LikeButton isLike={isLike} handleAddLike={handleAddLike} handleRemoveLike={handleRemoveLike} />
      <Center w="2em" h="2em">
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
      icon={isLike ? <AiFillLike /> : <AiOutlineLike />}
      onClick={isLike ? handleRemoveLike : handleAddLike}
    />
  );
};
