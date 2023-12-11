import { Center, Icon, Spinner, Text } from "@chakra-ui/react";
import { FiArrowUp } from "react-icons/fi";

import React from "react";

export default function LoadingSpinner() {
  const [timeLapse, setTimeLapse] = React.useState(0);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimeLapse(1);
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, [timeLapse, 10000]);
  return (
    <Center gap={2}>
      {timeLapse === 0 ? (
        <>
          <Spinner />
          <Text>Loading data...</Text>
        </>
      ) : (
        <Center textTransform="uppercase" flexDir="column">
          <Text fontSize="16px" fontWeight={500} letterSpacing={0.4} lineHeight="20px" my={2}>
            Not Data found.
          </Text>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" my={2} gap={2}>
            You can create an article by clicking the Write button above. <Icon as={FiArrowUp} />
          </Text>
        </Center>
      )}
    </Center>
  );
}
