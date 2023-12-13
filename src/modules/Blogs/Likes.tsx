import { Flex, IconButton, Text } from "@chakra-ui/react";

import React from "react";
import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { useUpdateLikesArticle } from "../../hooks/Likes.api";

export function CheckIfUserEmailIsInLikesArray({ newLikesArray, user_email }: { newLikesArray: string[]; user_email: string }) {
  return newLikesArray?.includes(user_email) ? true : false;
}

export default function Likes({ doc_id, likesArray }: { doc_id: string; likesArray: string[] }) {
  const { user } = React.useContext(AuthContext);
  let newLikesArray = likesArray;

  let count = newLikesArray?.length;
  const isLike = CheckIfUserEmailIsInLikesArray({ newLikesArray, user_email: user?.email });

  const updateLikesArticle = useUpdateLikesArticle();

  const handleAddLike = async () => {
    const array = [...newLikesArray, user?.email];
    await updateLikesArticle.mutateAsync({ array, doc_id });
  };

  const handleRemoveLike = async () => {
    const array = newLikesArray.filter((email) => email !== user?.email);
    await updateLikesArticle.mutateAsync({ array, doc_id });
  };

  return (
    <Flex h="3em" px={6} gap={1} alignItems="center" justifyContent="flex-end">
      <Flex>
        {isLike ? (
          <IconButton variant="ghost" colorScheme="white" aria-label="liked" fontSize="24px" icon={<AiFillLike />} onClick={handleRemoveLike} />
        ) : (
          <IconButton variant="ghost" colorScheme="white" aria-label="unliked" fontSize="24px" icon={<BiLike />} onClick={handleAddLike} />
        )}
      </Flex>

      <Text fontSize="16px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
        {count}
      </Text>
    </Flex>
  );
}
