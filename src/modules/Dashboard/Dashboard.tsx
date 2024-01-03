import { Flex, Stack, Text } from '@chakra-ui/react';

import Layout from '@/modules/Layout/Layout';
import StandUps from '@/modules/StandUps/AllStandUps';

export default function Dashboard() {
  return (
    <Layout>
      <Stack w={{ base: '98%', lg: '90%' }} mx="auto" background="#fafafa">
        <Flex w='100%' my={1}>
          <Text>Stand-ups</Text>
        </Flex>

        <StandUps />
      </Stack>
    </Layout>
  );
}
