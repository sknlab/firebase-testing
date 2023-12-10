import { Button, Icon, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ArticleProps } from "../../types/blogs.types";

export default function BlogsTable({ blogs }: { blogs: ArticleProps[] }) {
  const navigate = useNavigate();
  const handleView = (doc_id: string) => {
    navigate(`/article/${doc_id}`);
  };
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Title && Description only</TableCaption>
        <Thead>
          <Tr>
            <Th>EMAIL</Th>
            <Th>TITLE</Th>
            <Th>DESCRIPTION</Th>
            <Th>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {blogs?.map((article) => (
            <Tr key={article?.doc_id}>
              <Td>
                <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" whiteSpace={"normal"} maxWidth={"200px"}>
                  {article?.user_email}
                </Text>
              </Td>
              <Td>
                <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" whiteSpace={"normal"} maxWidth={"400px"}>
                  {article?.title}
                </Text>
              </Td>
              <Td isTruncated>
                <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px" whiteSpace={"normal"} maxWidth={"500px"}>
                  {article?.description}
                </Text>
              </Td>
              <Td>
                <Button variant="ghost" onClick={() => handleView(article?.doc_id)}>
                  View <Icon as={FiArrowUpRight} />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
