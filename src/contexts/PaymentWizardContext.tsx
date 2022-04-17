import { createContext, useContext, useState } from "react";

interface PaymentWizardProps {
  children: React.ReactNode;
}

interface Employee {
  name: string;
  email: string;
  formatedDate: string;
}

interface PaymentWizardContextData {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedEmployees: Employee[];
  setSelectedEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const paymentWizardContext = createContext({} as PaymentWizardContextData);

export function PaymentWizardProvider({ children }: PaymentWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  return (
    <paymentWizardContext.Provider
      value={{ step, setStep, selectedEmployees, setSelectedEmployees }}
    >
      {children}
    </paymentWizardContext.Provider>
  );
}

export const usePaymentWizard = () => useContext(paymentWizardContext);
