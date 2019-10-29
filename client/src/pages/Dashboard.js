import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Button from "../components/Button";
import Jumbotron from "../components/Jumbotron";
// import { Input, FormBtn } from "../components/Form";
// import { Link } from "react-router-dom";
// import VoiceBackground from "../components/VoiceBackground";
import { Col, Row, Container } from "../components/Grid";
// import audioImg from "../audioImg.json";
import "./Dashboard.css"
import { Helmet } from 'react-helmet';



class Dashboard extends Component {

  render() {
    return (

      <div>
        <Helmet>
          <script src="/js/voiceRecognition.js"></script>
          <script defer language="javascript" src="js/creative_coding.js"></script>
          <script defer language="javascript" src="js/canvas.js"></script>
          <script defer language="javascript" src="js/mic.js"></script>
          <script defer language="javascript" src="js/testLay.js"></script>
          <script src="https://kit.fontawesome.com/e297286cae.js" crossorigin="anonymous"></script>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <script src="https://code.jquery.com/jquery.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
          <script language="javascript" src="js/draw.js"></script>
          <script src="https://cors-anywhere.herokuapp.com/https://code.responsivevoice.org/responsivevoice.js?key=A2zNMwFx"></script>
        </Helmet>
        <Container fluid>
          <Jumbotron />
          <div id="voiceJumbo" className="jumbotron" />

          <Row>
            <div className="mx-auto p-4">
              <Col size="md-12">
                <button id="thisButton" className="btn btn-success" to="/"><i id="micIcon" class="fas fa-microphone-alt fa-4x"></i></button>
              </Col>
            </div>
          </Row>

        </Container>
      </div>
    );
  }

}
export default Dashboard;
