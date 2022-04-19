import {
  Box,
  Button,
  Flex,
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
import { usePaymentWizard } from "../../contexts/PaymentWizardContext";
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

export const FirstStep = () => {
  const [data, setData] = useState<Employee[]>([]);
  const { setSelectedEmployees } = usePaymentWizard();

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

    setData(updatedEmployees);
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

  useEffect(() => {
    const filteredValues = selectedFlatRows.map((data) => data.values);

    setSelectedEmployees(filteredValues);
  }, [selectedFlatRows]);

  if (data.length === 0) {
    return (
      <Stack>
        <Skeleton height="70px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    );
  }

  return (
    <>
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
    </>
  );
};
