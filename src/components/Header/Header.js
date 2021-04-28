import logo from "../../assets/images/logo.png"
import classes from "./Header.module.sass"
const Header = props => {


    return (
        <header className={classes.Header}>
            <img className={classes.Logo} src={logo} alt="logo the Guardian" />
        </header>
    )
}

export default Header