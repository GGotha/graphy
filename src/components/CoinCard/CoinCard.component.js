import React, { Fragment, useState, useCallback } from "react";

import { Card } from "@material-ui/core";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

function CoinCardComponent(props) {
  const { name, image, price, percentage24h } = props;

  const [isFavorite, setIsFavorite] = useState(false);

  const shouldInsertOnStorage = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    if (isFavorite) {
      const index = favorites.findIndex((favorite) => favorite.name === name);

      if (index > -1) {
        favorites.splice(index, 1);
      }

      return localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    if (!favorites || favorites.length <= 0) {
      return localStorage.setItem("favorites", JSON.stringify([{ name }]));
    }

    favorites.map((favorite) => {
      if (favorite.name === name) {
        return;
      }

      return localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, { name }])
      );
    });
  }, [isFavorite]);

  const updateFavorite = useCallback(() => {
    setIsFavorite((isFavorite) => !isFavorite);

    shouldInsertOnStorage();
  }, [isFavorite]);

  return (
    <Fragment>
      <Card
        elevation={8}
        sx={{ minWidth: 275, minHeight: 270, height: 270 }}
        style={{ position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img src={image} width={60} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            marginRight: "20px",
          }}
        >
          <h3
            style={{
              fontFamily: "Arial",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}{" "}
            <span
              style={{
                fontFamily: "Arial",
                fontSize: "16px",
                color: percentage24h < 0 ? "red" : "green",
              }}
            >
              {parseFloat(percentage24h).toFixed(2)}%
            </span>
          </h3>
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            marginTop: "15px",
            marginRight: "20px",
          }}
        >
          <IconButton onClick={updateFavorite}>
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </div>
      </Card>
    </Fragment>
  );
}

export default CoinCardComponent;
