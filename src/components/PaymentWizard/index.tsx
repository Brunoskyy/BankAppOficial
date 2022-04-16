import {
  Box,
  Button,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect, useMemo, forwardRef, useRef } from "react";
import { useTable, useRowSelect, CellProps } from "react-table";
import { api } from "../../services/api";

type Employee = {
  name: string;
  email: string;
  created_at: string;
  id?: string;
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

export const PaymentWizard = () => {
  const [data, setEmployees] = useState<Employee[]>([]);

  const handleNextStep = (selectedFlatRows) => {
    const seletectedEmployees = selectedFlatRows.map((data) => data.original);

    console.log(seletectedEmployees);
  };

  const fetchEmployees = async () => {
    const response = await api.get("/employees");
    const { employees } = response.data;

    const updatedEmployees = employees.map(
      ({ name, created_at, email }: Employee) => {
        const formatedDate = new Intl.DateTimeFormat("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(created_at));

        return {
          name,
          email,
          formatedDate,
        };
      }
    );

    setEmployees(updatedEmployees);
  };

  useEffect(() => {
    fetchEmployees().catch((err) => console.log(err));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Data de criação",
        accessor: "formatedDate",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  if (data.length === 0) {
    return (
      <Box p={8} flex="1" w="1130px" bg="white" borderRadius="lg" mt="10">
        <Stack>
          <Skeleton height="70px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      </Box>
    );
  }

  return (
    <Box p={8} flex="1" w="1130px" bg="white" borderRadius="lg" mt="10">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Button
        onClick={() => {
          handleNextStep(selectedFlatRows);
        }}
      >
        Avançar
      </Button>
    </Box>
  );
};
