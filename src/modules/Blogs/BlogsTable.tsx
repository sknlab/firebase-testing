import { Button, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
export type ArticleProps = {
  id: number;
  title: string;
  description: string;
};

export default function BlogsTable({ data }: { data: ArticleProps[] }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Title && Description only</TableCaption>
        <Thead>
          <Tr>
            <Th>TITLE</Th>
            <Th>DESCRIPTION</Th>
            <Th>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((article) => (
            <Tr key={article?.id}>
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
                <TableActions id={article?.id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

const TableActions = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/article/${id}`);
  };

  return (
    <Menu>
      <MenuButton as={Button}>Actions</MenuButton>
      <MenuList>
        <MenuItem onClick={handleView}>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            View Article {id}
          </Text>
        </MenuItem>
        <MenuItem>
          <Text fontSize="14px" fontWeight={400} letterSpacing={0.4} lineHeight="20px">
            Delete Article {id}
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
