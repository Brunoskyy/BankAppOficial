import { Flex, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      as="header"
      justifyContent="space-between"
      paddingX="6"
      paddingY="8"
      bgColor="white"
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
    </Flex>
  );
};
