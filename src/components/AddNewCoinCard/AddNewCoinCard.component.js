import React, { Fragment } from "react";

import { Card } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";

function AddNewCoinCardComponent(props) {
  const { updateActive } = props;

  return (
    <Fragment>
      <Card
        elevation={8}
        sx={{ minWidth: 275, minHeight: 270, height: 270 }}
        onClick={updateActive}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <AddCircle color="disabled" fontSize="large" />
        </div>
      </Card>
    </Fragment>
  );
}

export default AddNewCoinCardComponent;
