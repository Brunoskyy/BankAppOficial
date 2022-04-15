import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Box w="full" m="0 auto" bgColor="gray.200" height="100vh">
      <Flex
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
    </Box>
  );
};
