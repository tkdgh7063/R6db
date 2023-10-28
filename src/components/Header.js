import "../css/index.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <div>
      <header className="header">
        <span id="header__login">
          <Button variant="outlined" component={Link} to="/">
            HOME
          </Button>
        </span>
        <span id="header__operator">
          <Button variant="outlined" component={Link} to="/operator">
            OPERATOR
          </Button>
        </span>
        <span id="header__map">
          <Button variant="outlined" component={Link} to="/map">
            MAP
          </Button>
        </span>
        <span id="header__weapon">
          <Button variant="outlined" component={Link} to="/weapon">
            WEAPON
          </Button>
        </span>
      </header>
    </div>
  );
};

export default Header;
