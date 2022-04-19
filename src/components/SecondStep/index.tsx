import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Collapse,
  Fade,
  Flex,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { usePaymentWizard } from "../../contexts/PaymentWizardContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent, useState } from "react";

export const SecondStep = () => {
  const [data, setData] = useState([]);
  const { selectedEmployees } = usePaymentWizard();

  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(getValues());
    const values = getValues().employees;

    if (values.length) {
      setData(values);
    }
  };

  return (
    <>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["6", "8"]}>
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          px="8"
          onSubmit={(e: FormEvent) => {
            handleSubmit(e);
          }}
        >
          <Collapse in={data.length > 0} animateOpacity>
            <Alert status="success" mb={5}>
              <AlertIcon />
              Valores transferidos com sucesso!
            </Alert>
          </Collapse>

          <VStack>
            {selectedEmployees.map((employee, index) => (
              <SimpleGrid
                key={employee.name}
                minChildWidth="240px"
                spacing={["6", "8"]}
                w="100%"
              >
                <Box mb="4">
                  <FormLabel htmlFor={employee.name}>
                    Nome do funcionário
                  </FormLabel>
                  <Input
                    key={employee.name}
                    defaultValue={employee.name}
                    {...register(`employees[${index}].name`)}
                    placeholder="Nome do funcionário"
                    required
                  />
                </Box>
                <NumberInput precision={2} step={0.2} mb="4">
                  <FormLabel htmlFor={employee.name}>
                    Valor a transferir
                  </FormLabel>
                  <NumberInputField
                    key={index}
                    {...register(`employees[${index}].amount`)}
                    required
                    type="number"
                    placeholder="Valor a transferir"
                  />
                </NumberInput>
              </SimpleGrid>
            ))}
          </VStack>

          <Center>
            <Button fontWeight="normal" type="submit" mt={4}>
              Transferir valor e finalizar
            </Button>
          </Center>
        </Box>
      </Flex>
    </>
  );
};
