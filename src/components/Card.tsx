import React from "react";

import classes from "./Card.module.css";

const Card = () => {
  return (
    <React.Fragment>
      <div className={classes["card-container"]}>
        <div className={classes["employee-details"]}>
          <h1 className={classes.name}>Name 1</h1>
          <div className={classes.description}>
            <p>HR</p>
            <p>$1000</p>
          </div>
        </div>
        <div className={classes["button-group"]}>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
