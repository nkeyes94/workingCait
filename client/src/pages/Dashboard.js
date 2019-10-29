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
          <script src="https://code.responsivevoice.org/responsivevoice.js?key=A2zNMwFx"></script>
          <script src="/js/voiceRecognition.js"></script>
          <script language="javascript" src="js/creative_coding.js"></script>
          <script language="javascript" src="js/canvas.js"></script>
          <script language="javascript" src="js/mic.js"></script>
          <script language="javascript" src="js/draw.js"></script>
        </Helmet>
        <Container fluid>
          <Jumbotron />
          <div id="voiceJumbo" className="jumbotron" />

          <Row>
            <div className="mx-auto p-4">
              <Col size="md-12">
                <button id="thisButton" style={{zIndex:2}} className="btn btn-success" to="/">Click And Speak Your Command</button>
              </Col>
            </div>
          </Row>

        </Container>
      </div>
    );
  }

}
export default Dashboard;
