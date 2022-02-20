import React from "react";
import "./Button.css";

const STYLES = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline",
];

const Button = ({
  text,
  type,
  onClick,
  buttonStyle,
  disabled = false,
  hidden = false,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const hiddenClass = hidden ? "hiddenBtn" : "";
  return (
    <button
      className={`btn ${checkButtonStyle} ${hiddenClass}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
