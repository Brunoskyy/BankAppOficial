import { Box, Button, Flex } from "@chakra-ui/react";
import { usePaymentWizard } from "../../contexts/PaymentWizardContext";
import { FirstStep } from "../FirstStep";
import { SecondStep } from "../SecondStep";

export const PaymentWizard = () => {
  const { step, setStep, selectedEmployees } = usePaymentWizard();

  const handleNextStep = () => {
    if (step === 1) {
      setStep(step + 1);
    }
  };

  return (
    <Box p={8} flex="1" w="1130px" bg="white" borderRadius="lg" mt="1">
      {step === 1 && <FirstStep />}
      {step === 2 && <SecondStep />}
      <Flex flex={1} justify="center" marginTop={10}>
        {step === 1 && (
          <Button
            onClick={() => {
              handleNextStep();
            }}
            disabled={selectedEmployees.length === 0}
          >
            Selecionar funcionários e ir para o próximo passo
          </Button>
        )}
      </Flex>
    </Box>
  );
};
