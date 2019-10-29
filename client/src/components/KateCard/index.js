import React from "react";
import "./style.css";

function KateCard(props) {
  return (
    <div className="mt-5">
      <div className="card m-auto border-0">
        <div className="img-container">
          <img className="card-img-top" alt={props.name} src={props.image} />
        </div>
        <div className="content card-body">
          <h1 className="card-title">{props.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default KateCard;