import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

const Register: React.FC = () => {
  const inputsProps: any = [
    {
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
      <InputGroup className={input.group.className}>
        <InputGroupAddon addonType={input.addonType}>
          <i className={input.icon.className} />
        </InputGroupAddon>
        <Input type={input.input.type} placeholder={input.input.placeholder} />
      </InputGroup>
    );
  });

  return (
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
  );
};

export default Register;
