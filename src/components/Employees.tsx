import React from "react";
import Card from "./Card";
import classes from "./Employees.module.css";

const Employees = () => {
  return (
    <React.Fragment>
      <div className={classes["employees-body"]}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </React.Fragment>
  );
};

export default Employees;
