import { Avatar, Box, Button, Card, CardBody, Flex, HStack, Icon, Stack, StackDivider, Text, useDisclosure } from '@chakra-ui/react';
import { Suspense, lazy, useContext, useState } from 'react';
import { FaComment, FaEdit, FaTrash } from 'react-icons/fa';

import LoadingSpinner from '@/components/Spinner/LoadingSpinner';
import { AuthContext } from '@/context/AuthContext';
import { getDateLongFormat } from '@/helpers/date.helpers';
import { CreateCommentModal } from '@/modules/Comments/CreateCommentModal';
import StandUpLikes from '@/modules/Likes/StandUpLikes';
import ConfirmDeleteModal from '@/modules/StandUps/ConfirmDeleteModal';
import { EditStandUpModal } from '@/modules/StandUps/EditModal';
import { StandUpProps } from '@/types/standUps.types';

const Comments = lazy(() => import('@/modules/Comments/Comments'));

export default function StandUp({ data }: { data: StandUpProps }) {
  const { user } = useContext(AuthContext);
  const [standUp, setStandUp] = useState(data as any);
  const deleteDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();
  const commentDisclosure = useDisclosure();

  const date = new Date(standUp?.date);
  const dateLongFormat = getDateLongFormat(date);

  const handleUpdateStandUp = (res: {} | undefined) => {
    setStandUp(res);
  };

  const handleUpdateStandUpLikes = (res: string[] | undefined) => {
    setStandUp({
      ...standUp,
      likes: res,
    });
  };

  return (
    <Stack w="100%">
      {standUp?.doc_id ? (
        <>
          <HStack alignItems="start" my={6} position="relative">
            <Card minW="100%">
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box mt={{ base: '2em', md: 0 }}>
                    <Flex fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2} alignItems="center" color="#000" gap={2}>
                      <Avatar size="xs" name={standUp?.user_email} />
                      <Text fontWeight={400}>{standUp?.user_email}</Text>
                    </Flex>

                    <Text fontSize="14px" letterSpacing={0.4} lineHeight="20px" color="grey">
                      Posted on &nbsp;{dateLongFormat}
                    </Text>
                  </Box>
                  <Box>
                    <Text pt="2" fontSize="16px" fontWeight={600} letterSpacing={0.4} lineHeight="20px">
                      {standUp?.title}
                    </Text>
                  </Box>
                  <Box>
                    <Text pt="2" fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
                      {standUp?.description}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
              <Flex alignItems="center" justifyContent="flex-end">
                <StandUpLikes likesArray={standUp?.likes} doc_id={standUp?.doc_id} handleUpdateLikes={handleUpdateStandUpLikes} />
              </Flex>
            </Card>
            <Stack position="absolute" top={2} right={2}>
              <Flex gap={2}>
                <Button variant="ghost" colorScheme="facebook" gap={2} onClick={commentDisclosure.onOpen}>
                  <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
                    Comment
                  </Text>
                  <Icon as={FaComment} color="facebook" />
                </Button>
                <CreateCommentModal standUpId={standUp?.doc_id} isOpen={commentDisclosure.isOpen} onClose={commentDisclosure.onClose} />
                {user?.email == standUp?.user_email && (
                  <>
                    <Flex gap={2}>
                      <Button variant="ghost" colorScheme="green" gap={2} onClick={editDisclosure.onOpen}>
                        <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
                          Edit
                        </Text>
                        <Icon as={FaEdit} color="green" />
                      </Button>
                      <Button variant="ghost" colorScheme="red" gap={2} onClick={deleteDisclosure.onOpen}>
                        <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
                          Delete
                        </Text>
                        <Icon as={FaTrash} color="red" />
                      </Button>
                    </Flex>
                    <EditStandUpModal
                      standUp={standUp}
                      handleUpdateStandUp={handleUpdateStandUp}
                      isOpen={editDisclosure.isOpen}
                      onClose={editDisclosure.onClose}
                    />
                    <ConfirmDeleteModal doc_id={standUp?.doc_id} isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose} />
                  </>
                )}
              </Flex>
            </Stack>
          </HStack>
          <Suspense>
            <Comments standUpId={standUp?.doc_id} />
          </Suspense>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </Stack>
  );
}
