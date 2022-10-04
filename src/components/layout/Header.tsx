import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const Header = (props: any) => {
  return (<header className={classes.header}>
    <div className={classes.logo}>Employees</div>
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink to='/newemployee' activeClassName={classes.active}>Add Employee</NavLink>
        </li>
        {/* <li>
          <NavLink to='/new-quote' activeClassName={classes.active}>Add a Quote</NavLink>
        </li> */}
      </ul>
    </nav>
  </header>);
}

export default Header;