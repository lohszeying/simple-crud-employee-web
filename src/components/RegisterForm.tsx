import { useAppDispatch } from "../store/hooks";
import { useHistory } from "react-router-dom";
import React, { Fragment, useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Department } from "../model/department";
import { ReactNode } from "react";
import classes from "./RegisterForm.module.css";
import userSlice, {createUser} from "../store/user-slice";
import { useEffect } from "react";

import departmentSlice, {getDepartments} from "../store/department-slice";
import { useSelector } from "react-redux";
import { RootState } from "../store";


const RegisterForm = (props: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const departments: string[] = useSelector((state: RootState) => state.department.department);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    department: "",
  });

  // https://stackoverflow.com/questions/58675993/typescript-react-select-onchange-handler-type-error
  const updateHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const updateDepartmentHandler = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => {
    setUserDetails({
      ...userDetails,
      department: event.target.value as string,
    });
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(createUser(userDetails));
    
    history.push('/');
  };

  return (
    <Fragment>
      <div className={classes.form}>
        <FormControl>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input
            name="username"
            aria-describedby="my-helper-text"
            onChange={updateHandler}
            value={userDetails.username}
          />
          <FormHelperText id="my-helper-text">Input username.</FormHelperText>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input
            name="password"
            aria-describedby="my-helper-text"
            onChange={updateHandler}
            type="password"
          />
          <FormHelperText id="my-helper-text">Input username.</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Department"
            name="department"
            value={userDetails.department}
            onChange={updateDepartmentHandler}
          >
          {departments.map((result) => 
            <MenuItem key={result} value={result}>{result}</MenuItem>
          )}
          {/* <MenuItem value={"HR"}>HR</MenuItem>
          <MenuItem value={"PS"}>PS</MenuItem>
          <MenuItem value={"admin"}>admin</MenuItem> */}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={submitFormHandler}>
          Create account
        </Button>
      </div>
    </Fragment>
  );
};

export default RegisterForm;
