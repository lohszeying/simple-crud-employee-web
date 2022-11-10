import {Fragment, useEffect} from "react";
import classes from "./Pagination.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../store/hooks";
import pageSlice from "../store/page-slice";

import { Button } from "@mui/material";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const getPageNumber = useSelector((state: RootState) => state.page.page);
  const employees = useSelector((state: RootState) => state.employee.employees);
  const [page, setPage] = useState(1);

  const [isPreviousPageDisabled, setPreviousPageDisabled] = useState(false);
  const [isNextPageDisabled, setNextPageDisabled] = useState(false);

  useEffect(() => {
    setPage(getPageNumber);
    if (getPageNumber > 1) {
      setPreviousPageDisabled(false);
    } else {
      setPreviousPageDisabled(true);
    }

    const maxPage = Math.ceil(employees.length/10);

    // Check max page
    if (getPageNumber >= maxPage) {
      setNextPageDisabled(true);
    } else {
      setNextPageDisabled(false);
    }
  }, [getPageNumber]);

  const previousPageHandler = () => {
    if (getPageNumber > 1) {
      dispatch(pageSlice.actions.setPage(getPageNumber - 1));
    }
  }

  const nextPageHandler = () => {
    // setPage(page+1);
    dispatch(pageSlice.actions.setPage(getPageNumber + 1));
  }

  const getEndNumber: number = isNextPageDisabled ? employees.length : getPageNumber * 10;

  return (<Fragment>
    <div className={classes["button-row"]}>
      <p className={classes.showing}>Showing {(getPageNumber*10)-9}-{getEndNumber} out of {employees.length} entries</p>
      <div className={classes["page-buttons"]}>
        <Button color="primary" variant="text" disabled={isPreviousPageDisabled ? true : false} onClick={previousPageHandler}>Previous</Button>
        <h4 className={classes.page}>{page}</h4>
        <Button variant="text" disabled={isNextPageDisabled ? true : false} onClick={nextPageHandler}>Next</Button>
      </div>
    </div>
  </Fragment>);
};

export default Pagination;