import { Center, Icon, Spinner, Text } from '@chakra-ui/react';

import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

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
          <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
            Loading data...
          </Text>
          <Spinner size="sm" />
        </>
      ) : (
        <Center textTransform="uppercase" flexDir="column">
          <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
            Not Data found.
          </Text>
          <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
            You can create an standUp by clicking the Write button above. <Icon as={FiArrowUp} />
          </Text>
        </Center>
      )}
    </Center>
  );
}
