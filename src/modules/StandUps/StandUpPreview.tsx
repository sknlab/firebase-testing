import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { FiChevronRight, FiChevronUp } from 'react-icons/fi';
import { getDateLongFormat, getDateShortFormat, getDateToday } from '@/helpers/date.helpers';
import { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '@/context/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';
import { MdBolt } from 'react-icons/md';
import StandUp from '@/modules/StandUps/StandUp';
import { StandUpProps } from '@/types/standUps.types';
import WriteButton from '@/modules/StandUps/WriteButton';
import { getAllStandUpsByDateQuery } from '@/hooks/StandUps.api';
import { onSnapshot } from 'firebase/firestore';

function CheckUserInStandUps({ user_email, standUps }: { user_email: string; standUps: StandUpProps[] }) {
  return standUps.some((standUp) => standUp.user_email === user_email);
}

function FilterStandUpsByUser({ user_email, standUps }: { user_email: string; standUps: StandUpProps[] }) {
  return standUps.filter((standUp) => standUp.user_email === user_email);
}

export default function StandUpPreview({ date }: { date: Date }) {
  const { user } = useContext(AuthContext);
  const today = getDateToday();
  const dateShortFormat = getDateShortFormat(date);
  const dateLongFormat = getDateLongFormat(date);

  const [standUps, setStandUps] = useState([] as StandUpProps[]);
  const isUser = CheckUserInStandUps({ user_email: user?.email, standUps });
  const userStandUps = FilterStandUpsByUser({ user_email: user?.email, standUps });
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const queryRef = getAllStandUpsByDateQuery(dateShortFormat);

    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          doc_id: doc.id,
        });
      });
      setStandUps(data);
    });

    return () => {
      unsubscribe();
    };
  }, [dateShortFormat]);

  return (
    <Stack w="100%" mx="auto" mb={8} background="#fafafa">
      <Text fontWeight={500} fontSize="16px" letterSpacing={0.4} lineHeight="20px" my={2}>
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
          <WriteButton />
        </Flex>
      )}

      {isUser === true && <ViewStandUpButton standUp={userStandUps[0]} finalRef={finalRef} isUser={isUser} />}

      <Accordion allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  background={isExpanded ? '#fafafa' : 'white'}
                  boxShadow={isExpanded ? '' : 'md'}
                  p="4"
                  rounded="md"
                  _hover={{ background: '#fafafa' }}
                >
                  <Text as="span" flex="1" textAlign="left" fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
                    {standUps?.length} team member{standUps?.length >= 2 ? 's' : ''} attended the stand-up.
                  </Text>
                  {isExpanded && standUps?.length > 0 ? <FiChevronUp /> : <AccordionIcon />}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {standUps?.map((standUp) => (
                  <ViewStandUpButton standUp={standUp} finalRef={finalRef} />
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}

const ViewStandUpButton = ({ standUp, finalRef, isUser }: { standUp: StandUpProps; finalRef?: any; isUser?: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isUser === true ? (
        <Flex w="100%" h="3em" alignItems="center" justifyContent="space-between" color="green.500">
          <Flex h="inherit" gap={1} alignItems="center" justifyContent="space-between" cursor="pointer" onClick={onOpen}>
            <Icon as={FaCheckCircle} h="1em" w="1em" />
            <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2} color="green.500">
              You attended the stand-up.
            </Text>
          </Flex>
          <Tooltip label="View" placement="top" closeOnClick={true}>
            <Button variant="solid" alignItems="center" color="#2563EB" colorScheme="gray" onClick={onOpen}>
              <Icon as={FiChevronRight} h="1em" w="1em" />
            </Button>
          </Tooltip>
        </Flex>
      ) : (
        <Flex
          key={standUp?.doc_id}
          my={3}
          w="100%"
          minH="3em"
          background="white"
          alignItems="center"
          justifyContent="space-between"
          boxShadow="lg"
          p="4"
          rounded="md"
          bg="white"
          ref={finalRef}
          cursor="pointer"
          onClick={onOpen}
        >
          <Flex alignItems="center" justifyContent="flex-start" gap={1}>
            <Text fontWeight={500} fontSize="15px" letterSpacing={0.4} lineHeight="20px" my={2}>
              {standUp?.user_email}
            </Text>
            <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
              attended the stand-up.
            </Text>
          </Flex>

          <Tooltip label="View" placement="top" closeOnClick={true}>
            <Button variant="solid" alignItems="center" color="#2563EB" colorScheme="gray">
              <Icon as={FiChevronRight} h="1em" w="1em" />
            </Button>
          </Tooltip>
        </Flex>
      )}

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{ base: 'full', lg: 'xl' }} finalFocusRef={finalRef}>
        <DrawerOverlay />
        <DrawerContent w="100%">
          <Stack h="2em" zIndex={10}>
            <DrawerCloseButton colorScheme="gray" h="2em" />
          </Stack>

          <DrawerBody>
            <StandUp data={standUp} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
