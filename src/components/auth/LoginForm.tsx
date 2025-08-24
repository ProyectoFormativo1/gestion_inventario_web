import { useEffect, useState } from "react";
import { useAuth, useLogin } from "../../hooks/use-auth";
import { AuthLogin } from "../../models/auth";
import { Card, CardBody } from "@heroui/card";
import {Form} from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {Alert} from "@heroui/alert";

const LoginForm = () => {
  const [action, setAction] = useState("");
  const [loginRequest, setLoginRequest] = useState<AuthLogin | null>(null);
  const { onLoginSuccess } = useAuth();
  const { isLoading, isSuccess, data, error } = useLogin(loginRequest);

  const onLogin = async (request: AuthLogin) => {
    setLoginRequest(null);
    setTimeout(() => setLoginRequest(request), 100)
  };

  useEffect(() => {
    if (isSuccess && data) {
      onLoginSuccess(data.user, data.token);
    }
  }, [isSuccess, data]);

  return (
    <Card
      fullWidth={true}
      className="w-full max-w-md bg-background/10 dark:bg-default-100/50 max-w-[610px] border-2 border-blue-700"
    >
      <CardBody>
        <Form
          className="w-full mx-auto flex flex-col items-center gap-4"
          validationBehavior="native"
          onReset={() => setAction("")}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            onLogin(
              new AuthLogin(data.correo as string, data.contrasena as string)
            );
          }}
        >
          <h1 className="text-center w-full text-white">Bienvenido</h1>
          <h2 className="text-center w-full text-white">Ingresa tus credenciales para continuar </h2>

          <label htmlFor=""></label>
          <Input
            isRequired
            errorMessage="Por favor ingrese un email válido"
            labelPlacement="outside"
            name="correo"
            color="secondary"
            placeholder="Ingresa tu usuario"
            type="email"
          />
          <Input
            isRequired
            errorMessage="Por favor ingrese una contraseña válida"
            labelPlacement="outside"
            name="contrasena"
            color="secondary"
            placeholder="Ingresa tu contraseña"
            type="password"
          />
          <Button
            isLoading={isLoading}
            color={isLoading ? "default" : "primary"}
            type="submit"
            className="w-1/2 mt-2 mx-auto"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Acceder"}
          </Button>
          {error && (
            <div className="w-full flex items-center my-3">
              <Alert
                color="danger"
                title={`Ocurrio un error al intentar hacer login, revise sus credenciales`}
              />
            </div>
          )}
        </Form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
