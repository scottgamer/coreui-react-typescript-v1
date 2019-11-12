import React, { useState } from "react";
// TODO: add form validation
// import useForm from "react-hook-form";
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
  InputGroupAddon,
  Row
} from "reactstrap";

import Modal from "../../../components/Modal";

import axios from "axios";
import config from "../../../config/";

const Login: React.FC = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
    isLoggedIn: false
  });

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    body: ""
  });

  const [errorState, setErrorState] = useState({
    flag: false
  });

  // const { register, handleSubmit, errors } = useForm();

  const toggleHandler = () => {
    console.log(modal);
    setModal({ ...modal, isOpen: !modal.isOpen });
  };

  // const toggleHandler = () => {
  //   const prevModal = { ...modal };
  //   setModal({ ...prevModal, isOpen: !prevModal.isOpen });
  // };

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
      }
    } catch (error) {
      console.log(error);
      setErrorState({ flag: true });
      setModal({
        isOpen: true,
        title: "Validation error",
        body: error
      });

      // TODO: handle error in modal

      // return (
      //   <Modal isOpen={error.isOpen}>
      //     <ModalHeader>{error.header}</ModalHeader>
      //     <ModalBody>{error.message}</ModalBody>
      //     <ModalFooter>
      //       <Button color="primary" onClick={toggle}>
      //         Do Something
      //       </Button>{" "}
      //       <Button color="secondary" onClick={toggle}>
      //         Cancel
      //       </Button>
      //     </ModalFooter>
      //   </Modal>
      // );
    }
  };

  const inputHandler = (e: any) => {
    e.preventDefault();
    const updatedLogin = { ...login };
    const { name, value } = e.target;
    setLogin({ ...updatedLogin, [name]: value });
  };

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
                      <InputGroupAddon addonType="prepend">
                        <i className="icon-user" />
                      </InputGroupAddon>
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
                      <InputGroupAddon addonType="prepend">
                        <i className="icon-lock" />
                      </InputGroupAddon>
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
                          Login
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
                          Forgot password?
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
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Button color="primary" className="mt-3" active>
                        Ingresar!
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
