import {NavLink} from "react-router-dom";

const Nav = () => {
    
    const checkIsActive = ({isActive}) => {
        return{
            color: isActive ? "orange" : "white"    
        }
        
    }
    
    return(
        <nav>
            <ul>
                <li><NavLink style={checkIsActive} to="/">Accueil</NavLink></li>
                <li><NavLink style={checkIsActive} to="/connection">Connection</NavLink></li>
                <li><NavLink style={checkIsActive} to="/deconnection">Deconnection</NavLink></li>
                <li><NavLink style={checkIsActive} to="/inscription">Inscription</NavLink></li>
                <li><NavLink style={checkIsActive} to="/desinscription">Desinscription</NavLink></li>
                <li><NavLink style={checkIsActive} to="/characters-list">Personnages</NavLink></li>
            </ul>
        </nav>
    )
} 

export default Nav;