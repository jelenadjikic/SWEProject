import React from "react";
import FlashMessage from "react-flash-message";

export default function Message() {
  return (
    <FlashMessage duration={2000}>
      <h4> Successfully saved patient</h4>
    </FlashMessage>
  );
}
