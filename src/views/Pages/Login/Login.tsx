import React, { useState } from "react";
// TODO: add form validation
// import useForm from "react-hook-form";

/** Notice: Do not use InputGroupAddon, style conflicts with scss
 *  Use div with className instead
 */
import {
  Button,
  Container,
  Col,
  CardGroup,
  Card,
  CardBody,
  Form,
  Input,
  InputGroup,
  Row
} from "reactstrap";

import Modal from "../../../components/Modal";

import axios from "axios";
import config from "../../../config/";
import { Redirect } from "react-router";

const Login: React.FC = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
    isLoggedIn: false
  });

  const [redirect, setRedirect] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    body: ""
  });

  // const { register, handleSubmit, errors } = useForm();

  const toggleHandler = () => {
    const prevModal = { ...modal };
    setModal({ ...prevModal, isOpen: !prevModal.isOpen });
  };

  // TODO: finish login handler
  const loginHandler = async () => {
    try {
      const response = await axios.post(
        `${config.BACKEND_HOST_URL}/api/v1/auth/logins`,
        login,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response) {
        // TODO: make redirect to dashboard
        console.log(response);
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
      setModal({
        isOpen: true,
        title: "Error Message",
        body: "Server Error"
      });
    }
  };

  const inputHandler = (e: any) => {
    e.preventDefault();
    const updatedLogin = { ...login };
    const { name, value } = e.target;
    setLogin({ ...updatedLogin, [name]: value });
  };

  if (redirect) {
    return <Redirect to="/#/dashboard" />;
  }

  return (
    // <Form onSubmit={handleSubmit(loginHandler)}>
    <Form onSubmit={loginHandler}>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Inicia Sesión</h1>
                    <p className="text-muted">
                      Ingresa tus credenciales de acceso
                    </p>
                    <InputGroup className="mb-3">
                      <div className="input-group-addon">
                        <i className="icon-user" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Usuario"
                        name="username"
                        onChange={inputHandler}

                        // innerRef={register({ required: true, minLength: 4 })}
                      />
                      {/* {errors.username && <p>Field is required</p>} */}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <div className="input-group-addon">
                        <i className="icon-lock" />
                      </div>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        onChange={inputHandler}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          onClick={toggleHandler}
                          color="primary"
                          className="px-4"
                        >
                          Ingresar
                        </Button>
                        <Modal
                          isOpen={modal.isOpen}
                          toggleHandler={toggleHandler}
                          title={modal.title}
                          body={modal.body}
                        />
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Contraseña olvidada?
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + "%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Regístrate</h2>
                      <p>Crea una cuenta para poder ingresar al sistema</p>
                      <Button color="primary" className="mt-3" active>
                        Registrarse
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </Form>
  );
};

export default Login;
