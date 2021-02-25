import React from "react";
import "../App.css";

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
  return (
    <button className="Button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
