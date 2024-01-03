import { Button, Stack } from '@chakra-ui/react';

import StandUpPreview from '@/modules/StandUps/StandUpPreview';
import React from 'react';

export default function AllStandUps() {
  const [days, setDays] = React.useState(7);
  const today = new Date();
  const array = [];

  const handleLoadMore = () => {
    setDays((prev) => prev + 7);
  };

  for (let i = 0; i <= days; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - i);
    array.push(pastDate);
  }

  return (
    <Stack w="100%">
      {array.map((date) => (
        <React.Fragment key={date.toString()}>
          <StandUpPreview date={date} />
        </React.Fragment>
      ))}
      <Button onClick={handleLoadMore} colorScheme="facebook" variant="solid" w={{ base: '98%', lg: '90%' }} mx="auto" mt={2} mb={6}>
        Load more
      </Button>
    </Stack>
  );
}
