// import {useNavigate} from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux";
// import {add} from "../Actions/actions-types";

const Home = () => {
    
    // const navigate = useNavigate();
    // const {count} = useSelector(state => state.cr);
    // const dispatch = useDispatch();
    
    // const onSubmit = () => {
    //     alert('blabla');
        
    //     //rediriger vers ma page contact
    //     navigate("/contact");
    // }
    
    // const increment = () => {
    //     dispatch(add());
    // }
    
    // return(
    //     <>
    //         <h1>Titre</h1>
    //         <p>Ceci est un titre</p>
            
    //     </>
    // )

    return pug`
      form(action="/users/connection2/" method="post")
        label(for="userName") Enter name: 
        
        input(id="userName" type="text" name="userName" value="Default name.")
        
        input(type="submit" value="OK")
    `;
}

export default Home;