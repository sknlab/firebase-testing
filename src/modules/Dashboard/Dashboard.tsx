import { Flex, Stack, Text } from '@chakra-ui/react';

import AllStandUps from '@/modules/StandUps/AllStandUps';
import Layout from '@/modules/Layout/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <Stack w={{ base: '98%', lg: '90%' }} mx="auto" background="#fafafa">
        <Flex w="100%">
          <Text fontSize="20px" fontWeight={500} letterSpacing={0.4} lineHeight="36px" textTransform="capitalize">
            Stand-ups
          </Text> 
        </Flex>

        <AllStandUps />
      </Stack>
    </Layout>
  );
}
