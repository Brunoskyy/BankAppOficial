import { Button, Flex, Stack, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type SignInFormData = {
  email: string;
  password: string;
};

type loginResponse = {
  statusCode: number;
};

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Formato de e-mail inválido"),
  password: yup.string().required("Senha obrigatório"),
});

function Signin() {
  const toast = useToast();
  const navigate = useNavigate();

  if (localStorage.getItem("isAuthenticated") === "true") {
    return <Navigate replace to="/home" />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    const response = await api.post<loginResponse>("/login", {
      data: values,
    });

    if (response.data.statusCode !== 200) {
      toast({
        title: "Falha na autenticação.",
        description: "Suas credenciais estão Incorretas.",
        status: "error",
        duration: 6000,
        position: "top-right",
        isClosable: true,
      });
    } else {
      localStorage.setItem("isAuthenticated", "true");
      return navigate("/home");
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        boxShadow="lg"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            error={errors.email}
            {...register("email")}
          />
          <Input
            type="password"
            label="Password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="purple"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export default Signin;
