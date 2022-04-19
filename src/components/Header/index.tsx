import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      paddingX="6"
      paddingY="8"
      bgColor="white"
    >
      <Flex
        justify={["center", "center", "center", "space-between"]}
        m="0 auto"
        w={["300px", "500px", "600px", "800px", "1130px"]}
        flexDirection={["column", "column", "row"]}
      >
        <Flex>
          <Text
            fontSize={["2xl", "3xl"]}
            fontWeight="bold"
            letterSpacing="tight"
            w="64"
          >
            bank
            <Text as="span" ml="1" color="purple.500">
              .io
            </Text>
          </Text>
        </Flex>
        <Flex direction={["column", "row"]}>
          {location.pathname === "/payment" ? (
            <Button marginRight={2}>
              <Link to="/home">Página inicial</Link>
            </Button>
          ) : (
            <Button colorScheme="purple" marginRight={[0, 2]}>
              <Link to="/payment">Pagamento de funcionários</Link>
            </Button>
          )}
          <Button colorScheme="red" marginTop={[2, 0, 0]}>
            Sair
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
