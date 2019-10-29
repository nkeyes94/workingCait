// import Video from "../components/Video";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Button from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import FaceVideo from "../components/FaceVideo"
// import ReactPlayer from 'react-player';
import { Input, FormBtn } from "../components/Form";
import {Helmet} from "react-helmet";

class Login extends Component {

  render() {
    return (
      <div>
        <Helmet>
          <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
          <script src="/js/face-api.js"></script>
          <script type="text/javascript" src="js/recogTestTwo.js"></script>
          <script src="/js/commons.js"></script>
          <script src="/js/faceDetectionControls.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
        </Helmet>
        <Container fluid>
          <Jumbotron />
          <Row>
            <div className="mx-auto pb-5">
              <Col size="md-12">
                <Link className="btn btn-success" to="/">Home</Link>
              </Col>
            </div>
          </Row>

          <Row>
            <Col size="md-6">
              <div className="">
                <Row>
                  <Col size="md-12">
                    <h3 className="text-center">Biometric Login</h3>
                  </Col>
                  <div className="mx-auto pt-3 pb-4">
                    <Col size="md-12">
                      <Button>Allow Camera Access</Button>
                    </Col>
                  </div>
                  <Col size="md-12">
                    {/* <ReactPlayer className="border border-success mb-5 w-100">
                    </ReactPlayer> */}
                    <FaceVideo></FaceVideo>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col size="md-6">
              <div className="">
                <Row>
                  <Col size="md-12" className="">
                    <h3 className="text-center">Manual Login</h3>
                  </Col>
                  <div className="mx-auto pt-5 pb-4">
                    <Col size="md-12" className="mt-5">
                      <form className="mt-5">
                        <Input name="email" placeholder="Email (required)" />
                        <Input name="password" placeholder="Password (required)" />

                        <Row>
                          <div className="mx-auto p-4">
                            <Col size="md-12">
                              <Link className="btn btn-success" to="/dashboard">Login</Link>
                            </Col>
                          </div>
                        </Row>

                      </form>
                    </Col>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
