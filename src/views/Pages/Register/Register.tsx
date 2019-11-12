import React, { useState } from "react";
import {
  Button,
  Container,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from "reactstrap";

import axios from "axios";
import config from "../../../config";

const Register: React.FC = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    isPasswordValid: false,
    role: "",
    isRegisteredSucessful: false
  });

  const registerHandler = async () => {
    try {
      const response = await axios.post(
        `${config.BACKEND_HOST_URL}/api/v1/auth/register`,
        register,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response) {
        // TODO: make redirect to dashboard
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      // TODO: handle error in modal
    }
  };

  const inputsProps: any = [
    {
      id: 1,
      group: {
        className: "mb-3"
      },
      addonType: "prepend",
      icon: {
        className: "icon-user"
      },
      input: {
        type: "text",
        placeholder: "Nombre de usuario"
      }
    },
    {
      id: 2,
      group: {
        className: "mb-3"
      },
      addonType: "prepend",
      icon: {
        className: "fa fa-envelope-o"
      },
      input: {
        type: "text",
        placeholder: "Correo electrónico"
      }
    },
    {
      id: 3,
      group: {
        className: "mb-3"
      },
      addonType: "prepend",
      icon: {
        className: "icon-lock"
      },
      input: {
        type: "password",
        placeholder: "Contraseña"
      }
    },
    {
      id: 4,
      group: {
        className: "mb-3"
      },
      addonType: "prepend",
      icon: {
        className: "icon-lock"
      },
      input: {
        type: "password",
        placeholder: "Repetir contraseña"
      }
    }
  ];

  const inputs = inputsProps.map((input: any) => {
    return (
      <InputGroup key={input.id} className={input.group.className}>
        <InputGroupAddon addonType={input.addonType}>
          <i className={input.icon.className} />
        </InputGroupAddon>
        <Input type={input.input.type} placeholder={input.input.placeholder} />
      </InputGroup>
    );
  });

  return (
    <Form onSubmit={registerHandler}>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Regístrate</h1>
                  <p className="text-muted">Crea tu cuenta</p>

                  {inputs}

                  <Button color="success" block>
                    Crear Cuenta
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Form>
  );
};

export default Register;
