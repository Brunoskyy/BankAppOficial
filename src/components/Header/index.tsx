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
      <Flex justify="space-between" w="1130px" m="0 auto">
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
        <HStack spacing="2">
          {location.pathname === "/payment" ? (
            <Button>
              <Link to="/home">Página inicial</Link>
            </Button>
          ) : (
            <Button colorScheme="purple">
              <Link to="/payment">Pagamento de funcionários</Link>
            </Button>
          )}
          <Button colorScheme="red">Sair</Button>
        </HStack>
      </Flex>
    </Flex>
  );
};
