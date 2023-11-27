import React, { useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  LoginForm,
  LoginPage,
} from "./styles";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here using the credentials state
    console.log("Logging in with:", credentials);
  };
  return (
    <LoginPage>
      <LoginForm onSubmit={handleFormSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginPage>
  );
};

export default Login;
