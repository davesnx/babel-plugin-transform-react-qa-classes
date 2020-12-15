import React from "react";

const Button = (props, ref) => <button {...props} ref={ref} data-qa="button" />;

const FancyButton = React.forwardRef(Button);

export default FancyButton;
