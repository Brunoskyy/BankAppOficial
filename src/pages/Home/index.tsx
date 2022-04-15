import {
  Box,
  Center,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaMoneyBillWaveAlt,
  FaWallet,
} from "react-icons/fa";
import { api } from "../../services/api";

type Employee = {
  name: string;
  created_at: string;
};

export const Home = () => {
  const fetchEmployees = async () => {
    const response = await api.get("/employees");

    console.log(response.data);
  };

  useEffect(() => {
    fetchEmployees().catch((err) => console.log(err));
  }, []);

  return (
    <Box w="full" m="0 auto" bgColor="gray.100" height="100vh">
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
      <Flex paddingY="8" paddingX={5} flexFlow="column" align="center">
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
        <Box p={8} flex="1" w="1130px" bg="white" borderRadius="lg" mt="10">
          <Table colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Funcionario</Th>
                <Th>Valor transferido</Th>
                <Th>Data da operação</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Joãozim</Text>
                    <Text fontSize="sm" color="gray.500">
                      email@mail.com
                    </Text>
                  </Box>
                </Td>
                <Td>R$ 1400,00</Td>
                <Td>14/04/2022</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Joãozim</Text>
                    <Text fontSize="sm" color="gray.500">
                      email@mail.com
                    </Text>
                  </Box>
                </Td>
                <Td>R$ 1400,00</Td>
                <Td>14/04/2022</Td>
              </Tr>
              <Tr>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Joãozim</Text>
                    <Text fontSize="sm" color="gray.500">
                      email@mail.com
                    </Text>
                  </Box>
                </Td>
                <Td>R$ 1400,00</Td>
                <Td>14/04/2022</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
};
