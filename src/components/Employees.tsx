import React, { useEffect } from "react";
import Card from "./Card";
import classes from "./Employees.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchAllEmployees } from "../store/employee-slice";
import { useAppDispatch } from "../store/hooks";
import Pagination from "./Pagination";

const Employees = () => {
  const dispatch = useAppDispatch();
  const getPageNumber = useSelector((state: RootState) => state.page.page);
  
  useEffect(() => {
    dispatch(fetchAllEmployees());
  });

  useEffect(() => {
    
  }, [getPageNumber]);

  const employees = useSelector((state: RootState) => state.employee.employees);
  return (
    <React.Fragment>
      <div className={classes["employees-body"]}>
      {employees.slice((getPageNumber-1) * 10, 10*getPageNumber).map((employee) => (
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
      
      <Pagination />
    </React.Fragment>
  );
};

export default Employees;
