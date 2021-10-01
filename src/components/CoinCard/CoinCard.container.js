import React from "react";

import CoinCardComponent from "./CoinCard.component";

function CoinCardContainer(props) {
  const { name, image, price, percentage24h } = props;

  return (
    <CoinCardComponent
      name={name}
      image={image}
      price={price}
      percentage24h={percentage24h}
    />
  );
}

export default CoinCardContainer;
