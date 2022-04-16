import { Box, Flex } from "@chakra-ui/react";
import { Cards } from "../../components/Cards";
import { Header } from "../../components/Header";
import { TransactionList } from "../../components/TransactionsList";

export const Home = () => {
  return (
    <Box w="full" m="0 auto" bgColor="gray.100" height="100vh">
      <Header />
      <Flex
        paddingY="8"
        paddingX={5}
        flexFlow="column"
        align="center"
        bgColor="gray.100"
      >
        <Cards />
        <TransactionList />
      </Flex>
    </Box>
  );
};
