import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import Button from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import FaceVideo from "../components/FaceVideo"
import { Helmet } from "react-helmet";

class SignUp extends Component {

    render() {
        return (
            <div>
                <Helmet>
                <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
                <script src="/js/face-api.js"></script>
                <script type="text/javascript" src="/js/faceRecognition.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
                </Helmet>
                <Container fluid>
                    <Jumbotron />
                    <Row>
                        <div className = "mx-auto pb-5">
                        <Col size="md-12">

                        </Col>
                        </div>
                    </Row>

                    <Row>
                        <Col size = "md-6">
                            <div className="">
                                <Row>
                                    <Col size = "md-12">
                                        <h3 className="text-center">Biometric Signin</h3>
                                    </Col>
                                    <div className="mx-auto pt-3 pb4">
                                        <Col size = "md-12">
                                            <Button>Allow camera access</Button>
                                        </Col>
                                    </div>
                                    <Col size = "md-12">
                                        <FaceVideo></FaceVideo>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default SignUp;