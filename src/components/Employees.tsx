import React from "react";
import Card from "./Card";
import classes from "./Employees.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Employee } from "../model/employee";

const Employees = () => {
  const employees = useSelector((state: RootState) => state.employee.employees);
  console.log("employees:", employees);
  return (
    <React.Fragment>
      <div className={classes["employees-body"]}>
      {employees.map((employee) => (
          <Card
            key={employee.id}
            employee={{
              id: employee.id,
              name: employee.name,
              salary: employee.salary,
              department: employee.department
            }}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Employees;
