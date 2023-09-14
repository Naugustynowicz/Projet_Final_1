import {NavLink} from "react-router-dom";

const Nav = () => {
    
    const checkIsActive = ({isActive}) => {
        return{
            color: isActive ? "orange" : "black"    
        }
        
    }
    
    return(
        <nav>
            <ul>
                <li><NavLink style={checkIsActive} to="/">Accueil</NavLink></li>
                <li><NavLink style={checkIsActive} to="/contact">Nous Contacter</NavLink></li>
            </ul>
        </nav>
    )
} 

export default Nav;