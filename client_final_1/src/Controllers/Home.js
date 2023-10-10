// import {useNavigate} from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux";
// import {add} from "../Actions/actions-types";
import { useState, useEffect } from "react";

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
    
    const [submitForm, setSubmitForm] = useState(false);
    const [inputs, setInputs] = useState({});

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const doRequest = async () => {
        console.log("inputs : " + JSON.stringify(inputs));
        let payload = "";
        Object.keys(inputs).forEach(key => {
            payload += "&" + key + "=" + inputs[key];
        });
        console.log("payload : " + JSON.stringify(payload));
        // var data = new FormData();
        // data.append("json", JSON.stringify(payload));
        // console.log("inputs fetched : ");
        // console.log(JSON.stringify(data));
        const response = await fetch("http://localhost:9000/users/connection2/", {
            method: "POST", 
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            //headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
            headers: {
                // "Content-Type": "application/json",
                'Content-Type': 'application/json',
              },
            redirect: "follow",
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(inputs),
        });
        console.log(response);
        if(response.ok){
            const results = await response.json();
            console.log("result : " + JSON.stringify(results));
            setIsLoaded(true);
            setItems(results);
        } else {
            setIsLoaded(true);
        }
        
    }

    useEffect(() => {
        try{
            doRequest();
        } catch(e){
            setIsLoaded(true);
            setError(error);
        }

        // console.log("inputs : " + JSON.stringify(inputs));
        // let payload = "";
        // Object.keys(inputs).forEach(key => {
        //     payload += "&" + key + "=" + inputs[key];
        // });
        // console.log("payload : " + JSON.stringify(payload));
        // // var data = new FormData();
        // // data.append("json", JSON.stringify(payload));
        // // console.log("inputs fetched : ");
        // // console.log(JSON.stringify(data));
        // fetch("http://localhost:9000/users/connection2/", {
        //     method: "POST", 
        //     mode: "no-cors",
        //     cache: "no-cache",
        //     credentials: "same-origin",
        //     //headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
        //     headers: {
        //         // "Content-Type": "application/json",
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //       },
        //     redirect: "follow",
        //     referrerPolicy: "no-referrer", 
        //     body: JSON.stringify(payload),
        // })
        // .then(response => {
        //     if(response.status === 200){
        //         return response.json()
        //      }else{
        //         console.log(response);
        //      }
        // })
        // .then(
        //     (result) => {
        //         console.log("result : " + JSON.stringify(result));
        //         setIsLoaded(true);
        //         setItems(result);
        //     },
        //     // Note: it's important to handle errors here
        //     // instead of a catch() block so that we don't swallow
        //     // exceptions from actual bugs in components.
        //     (error) => {
        //         setIsLoaded(true);
        //         setError(error);
        //     }
        // )
    }, [submitForm])

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitForm(true);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
        console.log("inputs : " + JSON.stringify(inputs));
    }

    if (error) {
        return (
            <>
            <div>Error: {error.message}</div>
            <h1>Titre</h1>
            <p>Ceci est un titre</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Enter name</label>
                <input id="userName" type="text" name="userName" onChange={handleChange}/>
                <input type="submit" value="OK"/>
            </form>
            </>
        );
    } else if (!isLoaded) {
        //setIsLoaded(false);
        return <div>Loading...</div>;
    } else if(items && items["usersInstances"] && items["usersInstances"].length > 0){
        return (
            <>
            <ul>
                {items["usersInstances"].map(user => (
                <li key={user.id}>
                    {user.userName} {user.age}
                </li>
                ))}
            </ul>
            
            <h1>Titre</h1>
            <p>Ceci est un titre</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Enter name</label>
                <input id="userName" type="text" name="userName" onChange={handleChange}/>
                <input type="submit" value="OK"/>
            </form>
            </>
        );
    } else {
        return(
            <>
            <div>Error: empty response</div>
            <h1>Titre</h1>
            <p>Ceci est un titre</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Enter name</label>
                <input id="userName" type="text" name="userName" onChange={handleChange}/>
                <input type="submit" value="OK"/>
            </form>
            </>
        );
    }
    
}

export default Home;