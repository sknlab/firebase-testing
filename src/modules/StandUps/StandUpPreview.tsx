import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Icon, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { FiChevronRight, FiChevronUp } from "react-icons/fi";

import { AuthContext } from "@/context/AuthContext";
import { getAllStandUpsByDateQuery } from "@/hooks/StandUps.api";
import StandUp from "@/modules/StandUps/StandUp";
import WriteButton from "@/modules/StandUps/WriteButton";
import { StandUpProps } from "@/types/standUps.types";
import { format } from "date-fns";
import { onSnapshot } from "firebase/firestore";
import { FaCheckCircle } from "react-icons/fa";
import { MdBolt } from "react-icons/md";

function CheckUserInStandUps({ user_email, standUps }: { user_email: string; standUps: StandUpProps[] }) {
  return standUps.some((standUp) => standUp.user_email === user_email);
}

function FilterStandUpsByUser({ user_email, standUps }: { user_email: string; standUps: StandUpProps[] }) {
  return standUps.filter((standUp) => standUp.user_email === user_email);
}

export default function StandUpPreview({ date }: { date: Date }) {
  const { user } = useContext(AuthContext);
  const today = format(new Date(), "yyyy-MM-dd");
  const dateShortFormat = format(date, "yyyy-MM-dd");
  const dateLongFormat = format(date, "E, do MMMM yyyy");
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
          <WriteButton />
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
          <ViewStandUpButton standUp={userStandUps[0]} finalRef={finalRef} />
        </Flex>
      )}

      <Accordion allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton background={isExpanded ? "#fafafa" : "white"} boxShadow={isExpanded ? "" : "md"} p="4" rounded="md">
                  <Text as="span" flex="1" textAlign="left" fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
                    {standUps?.length} team member(s) attended the stand-up.
                  </Text>
                  {isExpanded && standUps?.length > 0 ? <FiChevronUp /> : <AccordionIcon />}
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {standUps?.map((standUp) => (
                  <Flex key={standUp?.doc_id} my={3} w="100%" minH="3em" background="white" alignItems="center" justifyContent="space-between" boxShadow="lg" p="4" rounded="md" bg="white" ref={finalRef}>
                    <Text fontWeight={400} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2}>
                      {standUp?.user_email} attended the stand-up.
                    </Text>
                    <ViewStandUpButton standUp={standUp} finalRef={finalRef} />
                  </Flex>
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}

const ViewStandUpButton = ({ standUp, finalRef }: { standUp: StandUpProps; finalRef?: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="View" placement="top" closeOnClick={true}>
        <Button variant="solid" alignItems="center" color="#2563EB" onClick={onOpen} colorScheme="gray">
          <Icon as={FiChevronRight} h="1em" w="1em" />
        </Button>
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{ base: "full", lg: "xl" }} finalFocusRef={finalRef}>
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
