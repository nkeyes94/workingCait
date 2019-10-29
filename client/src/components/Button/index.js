import React from "react";
// import "./style.css";

function Button(props) {
  return (
    <button onClick={props.onClick} className={`btn btn-success ${props["data-value"]}`} {...props} />
  );
}

export default Button;
