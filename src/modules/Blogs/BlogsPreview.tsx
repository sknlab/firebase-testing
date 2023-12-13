import { Box, Button, Card, CardBody, Flex, Icon, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";

import { ArticleProps } from "@/types/blogs.types";
import { FiArrowUpRight } from "react-icons/fi";
import LoadingSpinner from "@/components/Spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

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
      <CardBody background="#fff" gap={4}>
        <Flex
          cursor="pointer"
          flexDir={{ base: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          onClick={() => handleView(article?.doc_id)}>
          <Flex gap={1} fontSize="12px" letterSpacing={0.4} lineHeight="20px" my={2} alignItems="center" color="#2563EB">
            <Text fontWeight={400}>By</Text>
            <Text fontWeight={400}>{article?.user_email}</Text>
          </Flex>

          <Button variant="ghost" alignItems="center" color="#2563EB">
            <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
              View
            </Text>
            <Icon as={FiArrowUpRight} h="1em" w="1em" />
          </Button>
        </Flex>

        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Text pt="2" fontSize="16px" fontWeight={600} letterSpacing={-0.1} lineHeight="20px" textTransform="capitalize">
              {article?.title}
            </Text>
          </Box>
          <Box>
            <Text fontWeight={400} letterSpacing={-0.1} fontSize="14px" lineHeight="20px" textTransform="capitalize">
              {article?.description}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
