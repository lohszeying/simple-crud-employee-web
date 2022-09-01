import React from "react";

import classes from "./Card.module.css";

const Card = () => {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.card}>
          <h1 className={classes.name}>Name 1</h1>
          <p>HR</p>
          <p>$1000</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
