import { Box } from "@chakra-ui/react";
import { FirstStep } from "../FirstStep";

export const PaymentWizard = () => {
  return (
    <Box p={8} flex="1" w="1130px" bg="white" borderRadius="lg" mt="1">
      <FirstStep />
    </Box>
  );
};
