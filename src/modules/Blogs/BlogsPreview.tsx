import { Box, Card, CardBody, Flex, Icon, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";

import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { ArticleProps } from "../../types/blogs.types";

export default function BlogsPreview({ blogs }: { blogs: ArticleProps[] }) {
  if (blogs?.length <= 0) {
    return <LoadingSpinner />;
  }
  return (
    <Stack>
      <VStack minH="80%" minW="100%">
        {blogs?.map((article) => (
          <Stack w={{ base: "98%", lg: "90%" }} mx="auto" key={article?.doc_id} my={2}>
            <BlogCard article={article} />
          </Stack>
        ))}
      </VStack>
    </Stack>
  );
}

const BlogCard = ({ article }: { article: ArticleProps }) => {
  const navigate = useNavigate();
  const handleView = (doc_id: string) => {
    navigate(`/article/${doc_id}`);
  };

  return (
    <Card>
      <CardBody background="#fafafa" gap={4}>
        <Flex
          cursor="pointer"
          flexDir={{ base: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          onClick={() => handleView(article?.doc_id)}>
          <Flex gap={1} fontSize="14px" letterSpacing={0.4} lineHeight="20px" my={2} alignItems="center">
            <Text fontWeight={400}>By</Text>
            <Text fontWeight={400}>{article?.user_email}</Text>
          </Flex>

          <Flex alignItems="center">
            <Text fontSize="16px" fontWeight={500} letterSpacing={0.4} lineHeight="20px" my={2}>
              View
            </Text>
            <Icon as={FiArrowUpRight} h="1.5em" w="1.5em" />
          </Flex>
        </Flex>

        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Text pt="2" fontSize="14px" fontWeight={500} letterSpacing={0.4} lineHeight="20px" textTransform="uppercase">
              title
            </Text>
            <Text pt="2" fontSize="16px" fontWeight={600} letterSpacing={0.4} lineHeight="20px" textTransform="capitalize">
              {article?.title}
            </Text>
          </Box>
          <Box>
            <Text pt="2" fontSize="14px" fontWeight={500} letterSpacing={0.4} lineHeight="20px" textTransform="uppercase">
              description
            </Text>
            <Text pt="2" fontSize="14px" fontWeight={500} letterSpacing={0.4} lineHeight="20px" textTransform="capitalize">
              {article?.description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
