import React, { useState, useEffect } from "react";
import {
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
            {errors?.login && <ErrorMessage>{errors.login.msg}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label>Senha:</Label>
            <Input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
            {errors?.password && (
              <ErrorMessage>{errors.password.msg}</ErrorMessage>
            )}
          </FormGroup>
          <Button type="submit">Entrar</Button>
        </LoginForm>
      </LoginPage>
    </Container>
  );
};

export default Login;
