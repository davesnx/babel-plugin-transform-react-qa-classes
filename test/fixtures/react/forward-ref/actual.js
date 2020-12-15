import React from "react";

const Button = (props, ref) => <button {...props} ref={ref} />;

const FancyButton = React.forwardRef(Button);

export default FancyButton;
