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

const RegisterForm = (props: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    department: Department.HR,
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
      department: event.target.value as Department,
    });
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(createUser(userDetails));
    // dispatch(userSlice.actions.editIsLoggedIn(true));


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
            <MenuItem value={"HR"}>HR</MenuItem>
            <MenuItem value={"PS"}>PS</MenuItem>
            <MenuItem value={"admin"}>admin</MenuItem>
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
