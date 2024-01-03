import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { getStandUpCommentsQuery } from '@/hooks/Comments.api';
import { CommentProps } from '@/types/comments.types';
import { onSnapshot } from 'firebase/firestore';
import Comment from './Comment';

export default function Comments({ standUpId }: { standUpId: string }) {
  const [comments, setComments] = useState([] as CommentProps[]);

  useEffect(() => {
    if (standUpId) {
      const queryRef = getStandUpCommentsQuery(standUpId);

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
  }, [standUpId]);

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
              <Comment comment={comment} />
            </AccordionPanel>
          ))}
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
