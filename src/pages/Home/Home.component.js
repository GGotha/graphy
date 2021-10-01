import React, { Fragment, useCallback, useEffect, useState } from "react";

import { Grid, TextField, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import AddNewCoinCard from "components/AddNewCoinCard";
import CoinCard from "components/CoinCard";
import api from "services/api.coingecko";

const AUTO_UPDATE_TIMER_MILISECONDS = 26000;

function HomeComponent() {
  const [active, setActive] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isAutoUpdateActive, setIsAutoUpdateActive] = useState(false);
  const [isIntervalActive, setIsIntervalActive] = useState(false);
  const [clock, setClock] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const getCoinOnAPI = useCallback(async () => {
    try {
      const response = await api.get(`/coins/${searchInput}`);

      const coin = {
        name: response.data.id,
        image: response.data.image.large,
        price: response.data.market_data.current_price.brl,
        percentage24h:
          response.data.market_data.price_change_percentage_24h_in_currency.brl,
        symbol: response.data.symbol,
      };

      setCards([coin, ...cards]);

      updateActive();
    } catch (err) {
      updateActive();
    }
  }, [searchInput, cards]);

  const setSearchInputValue = useCallback((e) => {
    setSearchInput(e.target.value.toLowerCase());
  }, []);

  const updateActive = useCallback(() => {
    setActive((active) => !active);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        getCoinOnAPI();
      }
    },
    [searchInput]
  );

  useEffect(() => {
    const autoUpdateLocalStorageString = localStorage.getItem("autoUpdate");

    if (autoUpdateLocalStorageString) {
      var autoUpdateLocalStorageBoolean =
        autoUpdateLocalStorageString === "true";

      setIsAutoUpdateActive(autoUpdateLocalStorageBoolean);
    }

    loadStorageData();
  }, []);

  const startTimer = useCallback(
    (duration, action) => {
      var timer = duration;
      var minutes;
      var seconds;

      if (action === "start") {
        var intervalTimer = setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          setClock(minutes + ":" + seconds);
          setIsTimerActive(intervalTimer);

          if (--timer < 0) {
            timer = duration;
          }
        }, 1000);
      } else {
        clearInterval(isTimerActive);
      }
    },
    [isTimerActive]
  );

  useEffect(() => {
    if (isAutoUpdateActive) {
      var refresh = setInterval(() => {
        loadStorageData();
      }, AUTO_UPDATE_TIMER_MILISECONDS);

      startTimer((AUTO_UPDATE_TIMER_MILISECONDS - 1000) / 1000, "start");

      setIsIntervalActive(refresh);

      return;
    } else {
      startTimer(0, "end");
      clearInterval(isIntervalActive);
    }
  }, [isAutoUpdateActive]);

  const loadStorageData = useCallback(async () => {
    let storagedFavorites = [];
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    if (!favorites || favorites.length <= 0) {
      return;
    }

    const coins = await Promise.all(
      favorites.map(async (favorite) => {
        const response = await api.get(`/coins/${favorite.name}`);

        const coin = {
          name: response.data.id,
          image: response.data.image.large,
          price: response.data.market_data.current_price.brl,
          percentage24h:
            response.data.market_data.price_change_percentage_24h_in_currency
              .brl,
          symbol: response.data.symbol,
        };

        storagedFavorites.push(coin);

        return storagedFavorites;
      })
    );

    coins[0].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    setCards(coins[0]);
  }, [cards, setCards]);

  const autoUpdateActive = useCallback(() => {
    setIsAutoUpdateActive((isAutoUpdateActive) => !isAutoUpdateActive);

    localStorage.setItem("autoUpdate", !isAutoUpdateActive);
  }, [isAutoUpdateActive]);

  return (
    <Fragment>
      <div
        onClick={active ? updateActive : () => {}}
        style={{
          opacity: active && "0.3",
          height: "100vh",
        }}
      >
        <Grid container style={{ padding: "30px" }}>
          <Grid lg={11.58} md={6} sm={6} xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" style={{ marginRight: "20px" }}>
                Next Update {clock}
              </Button>
              <Button onClick={autoUpdateActive} variant="contained">
                Auto Update {isAutoUpdateActive ? <CheckIcon /> : <CloseIcon />}
              </Button>
            </div>
          </Grid>
          {cards.map((card) => (
            <Grid key={card.image} lg={2.8} md={6} sm={6} xs={12} mx={1} mt={2}>
              <CoinCard
                name={card.name}
                image={card.image}
                price={card.price}
                percentage24h={card.percentage24h}
                symbol={card.symbol}
              />
            </Grid>
          ))}
          <Grid lg={2.8} md={6} sm={6} xs={12} mx={1} mt={2}>
            <AddNewCoinCard updateActive={updateActive} />
          </Grid>
        </Grid>
      </div>
      {active ? (
        <Grid
          lg={12}
          md={4}
          sm={6}
          xs={12}
          mx={30}
          mt={5}
          style={{ position: "absolute", top: "0", left: "0", right: "0" }}
        >
          <TextField
            id="outlined-basic"
            label="Pesquisar"
            variant="outlined"
            onChange={setSearchInputValue}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={getCoinOnAPI}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
      ) : (
        <div></div>
      )}
    </Fragment>
  );
}

export default HomeComponent;
