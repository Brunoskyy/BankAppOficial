import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Spinner,
  Text,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

type Employee = {
  name: string;
  email: string;
};

type Transaction = {
  id: string;
  amount: string;
  createdAt: string;
  employee: Employee;
};

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const response = await api.get("/transactions");
    const { transactions } = response.data;

    setTransactions(transactions);
  };

  useEffect(() => {
    fetchTransactions().catch((err) => console.log(err));
  }, []);

  return (
    <Box
      p={8}
      flex="1"
      maxW="1130px"
      w="100%"
      bg="white"
      borderRadius="lg"
      mt="10"
      overflow="scroll"
    >
      {transactions.length ? (
        <Table colorScheme="blackAlpha" overflow="scroll">
          <Thead>
            <Tr>
              <Th>Funcionario</Th>
              <Th>Valor transferido</Th>
              <Th>Data da operação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>
                  <Box>
                    <Text fontWeight="bold">{transaction.employee.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {transaction.employee.email}
                    </Text>
                  </Box>
                </Td>
                <Td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(transaction.amount))}
                </Td>
                <Td>
                  {new Intl.DateTimeFormat("pt-BR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(transaction.createdAt))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Stack>
          <Skeleton height="70px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      )}
    </Box>
  );
};
