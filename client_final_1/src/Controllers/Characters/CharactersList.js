import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
};

const CharactersList = () => {
    
    const [submitForm, setSubmitForm] = useState(false);
    const [inputs, setInputs] = useState({});

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [playing, toggle] = useAudio("https://ia803006.us.archive.org/19/items/supersmashbros.ultimatemainthemelifelight_201907/Super%20Smash%20Bros.%20Ultimate%20Main%20Theme%20-%20Lifelight.mp3");

    const doRequest = async () => {
        let userToken = sessionStorage.getItem("key");
        setInputs(values => ({...values, userToken:userToken}));
        
        // console.log("inputs : " + JSON.stringify(inputs));
        // let payload = "";
        // Object.keys(inputs).forEach(key => {
        //     payload += "&" + key + "=" + inputs[key];
        // });
        // console.log("payload : " + JSON.stringify(payload));
        const response = await fetch("http://localhost:9000/characters/characters-list/", {
            method: "POST", 
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
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
        var cookies = new Cookies();
        console.log("cookies : " + cookies.get("userName"))
        setInputs({userName: cookies.get("userName"), token: cookies.get("token")});
        try{
            doRequest();
        } catch(e){
            setIsLoaded(true);
            setError(error);
        }

    }, [submitForm])

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitForm(true);
    }

    const handleChange = (event) => {
        var cookies = new Cookies();
        console.log("cookies : " + cookies.get("userName"))
        setInputs({userName: cookies.get("userName"), token: cookies.get("token")});
    }

    if (error) {
        return (
            <>
            <div>Error: {error.message}</div>
            <h1>Liste des Personnages</h1>
            <p>Ceci est un titre</p>
            </>
        );
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if(items && items.usersInstances && items.usersInstances.password){
        if(items.usersInstances.password === "true" && items.charactersInstances){
        return (
                <>
                <ul> You're connected as :
                    {items.usersInstances.userName}
                </ul>

                
                <ul> Liste de personnages :
                    {
                        items.charactersInstances.map((character,i) => {
                            return <li key={i}>{character["characterName"]}</li>;
                        })
                    }
                </ul>

                <div>
                    <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
                </div>
                
                </>
            );
        } else {
            return (
                <>
                <div>Error: you're not connected</div>
                
                <h1>Page</h1>
                <p>Ceci est un titre</p>
                <form onSubmit={handleSubmit}>
                    <label for="userName">Name</label>
                    <input id="userName" type="text" name="userName" onChange={handleChange}/>
                    <label for="password">Password</label>
                    <input id="password" type="text" name="password" onChange={handleChange}/>
                    <p>
                    <input type="submit" value="OK"/>
                    </p>
                </form>
                </>
            );
        }
        
    } else {
        return(
            <>
            <div>Error: empty response</div>
            <h1>Page</h1>
            <p>Ceci est un titre</p>
            <form onSubmit={handleSubmit}>
                <label for="userName">Name</label>
                <input id="userName" type="text" name="userName" onChange={handleChange}/>
                <label for="password">Password</label>
                <input id="password" type="text" name="password" onChange={handleChange}/>
                <p>
                <input type="submit" value="OK"/>
                </p>
            </form>
            </>
        );
    }
    
}

export default CharactersList;