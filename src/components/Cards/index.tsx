import { HStack, Flex, Center, Icon, Heading, Text } from "@chakra-ui/react";
import {
  FaMoneyBillWaveAlt,
  FaArrowCircleUp,
  FaArrowCircleDown,
} from "react-icons/fa";

export const Cards = () => {
  return (
    <HStack spacing={10}>
      <Flex
        flexFlow="column"
        p={5}
        shadow="md"
        borderRadius="lg"
        borderWidth="1px"
        w="350px"
        h="220px"
        color="gray.500"
        bg="gray.800"
        justify="center"
      >
        <Center borderRadius="full" height="14" w="14" bgColor="purple.800">
          <Icon as={FaMoneyBillWaveAlt} boxSize="8" color="purple.500" />
        </Center>
        <Text mt="6" mb="2" fontSize="2xl">
          Balanço total
        </Text>
        <Heading color="gray.200">R$2400,00</Heading>
      </Flex>
      <Flex
        flexFlow="column"
        p={5}
        shadow="md"
        borderRadius="lg"
        borderWidth="1px"
        w="350px"
        h="220px"
        color="gray.500"
        bg="white"
        justify="center"
      >
        <Center borderRadius="full" height="14" w="14" bgColor="green.400">
          <Icon as={FaArrowCircleUp} boxSize="8" color="green.200" />
        </Center>
        <Text mt="6" mb="2" fontSize="2xl">
          Entradas
        </Text>
        <Heading color="blackAlpha.800">R$2400,00</Heading>
      </Flex>
      <Flex
        flexFlow="column"
        p={5}
        shadow="md"
        borderRadius="lg"
        borderWidth="1px"
        w="350px"
        h="220px"
        color="gray.500"
        bg="white"
        justify="center"
      >
        <Center borderRadius="full" height="14" w="14" bgColor="red.400">
          <Icon as={FaArrowCircleDown} boxSize="8" color="red.200" />
        </Center>
        <Text mt="6" mb="2" fontSize="2xl">
          Saídas
        </Text>
        <Heading color="blackAlpha.800">R$2400,00</Heading>
      </Flex>
    </HStack>
  );
};
