import { useState, useEffect } from "react";

const Inscription = () => {
    
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
        const response = await fetch("http://localhost:9000/users/inscription/", {
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
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
        console.log("inputs : " + JSON.stringify(inputs));
    }

    if (error) {
        return (
            <>
            <div>Erreur: {error.message}</div>
            <h1>Inscription</h1>
            <p>Formulaire d'inscription :</p>
            <form onSubmit={handleSubmit}>
                <label for="_id">Clée primaire (bonne chance).</label>
                <input id="_id" type="text" name="_id" onChange={handleChange}/>
                <label for="userName">Nom d'Utilisateur</label>
                <input id="userName" type="text" name="userName" onChange={handleChange}/>
                <label for="password">Mot de Passe</label>
                <input id="password" type="text" name="password" onChange={handleChange}/>
                <p>
                <input type="submit" value="OK"/>
                </p>
            </form>
            </>
        );
    } else if (!isLoaded) {
        return <div>Chargement en cours...</div>;
    } else if(items && items.usersInstances && items.usersInstances.userName && items.usersInstances.password){
        if(items.usersInstances.password === "true"){
        return (
                <>
                <ul> Inscription réussite :
                    {items.usersInstances.userName}
                </ul>
                
                </>
            );
        } else {
            return (
                <>
                <div>Erreur: problème lors de l'inscription.</div>
                
                <h1>Inscription</h1>
                <p>Formulaire d'inscription :</p>
                <form onSubmit={handleSubmit}>
                    <label for="_id">Clée primaire (bonne chance).</label>
                    <input id="_id" type="text" name="_id" onChange={handleChange}/>
                    <label for="userName">Nom d'Utilisateur</label>
                    <input id="userName" type="text" name="userName" onChange={handleChange}/>
                    <label for="password">Mot de Passe</label>
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
            <div>RàS.</div>
            <h1>Inscription</h1>
            <p>Formulaire d'inscription :</p>
            <form onSubmit={handleSubmit}>
                <label for="_id">Clée primaire (bonne chance).</label>
                <input id="_id" type="text" name="_id" onChange={handleChange}/>
                <label for="userName">Nom d'Utilisateur</label>
                <input id="userName" type="text" name="userName" onChange={handleChange}/>
                <label for="password">Mot de Passe</label>
                <input id="password" type="text" name="password" onChange={handleChange}/>
                <p>
                <input type="submit" value="OK"/>
                </p>
            </form>
            </>
        );
    }
    
}

export default Inscription;