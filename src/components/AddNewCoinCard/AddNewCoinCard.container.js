import React from "react";

import AddNewCoinCardComponent from "./AddNewCoinCard.component";

function AddNewCoinCardContainer(props) {
  const { updateActive } = props;
  return <AddNewCoinCardComponent updateActive={updateActive} />;
}

export default AddNewCoinCardContainer;
