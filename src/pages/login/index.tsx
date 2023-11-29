import React, { useState } from "react";
import {
  AuthErrorMessage,
  Button,
  Container,
  ErrorMessage,
  FormGroup,
  Input,
  Label,
  LoginForm,
  LoginPage,
  Title,
} from "./styles";
import { useAuth } from "../../hooks/useAuth";
type Error = {
  login: { msg: string; path: string };
  password: { msg: string; path: string };
};

const Login = () => {
  const { login, getUser, errors } = useAuth();
  const [credentials, setCredentials] = useState({ login: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(credentials);
    await getUser();
  };
  return (
    <Container>
      <Title>Autentique-se para continuar!!</Title>
      <LoginPage>
        <LoginForm onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label>Login:</Label>
            <Input
              type="text"
              name="login"
              value={credentials.login}
              onChange={handleInputChange}
            />
            {(errors as Error)?.login && (
              <ErrorMessage>{(errors as Error).login.msg}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Senha:</Label>
            <Input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
            {(errors as Error)?.password && (
              <ErrorMessage>{(errors as Error).password.msg}</ErrorMessage>
            )}
          </FormGroup>
          {!(errors as Error)?.password &&
            !(errors as Error)?.login &&
            errors && (
              <AuthErrorMessage>
                <b>Error</b>: {errors.toString()}
              </AuthErrorMessage>
            )}
          <Button type="submit">Entrar</Button>
        </LoginForm>
      </LoginPage>
    </Container>
  );
};

export default Login;
