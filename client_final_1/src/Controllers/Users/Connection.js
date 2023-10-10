import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import cookie from 'cookie'

const {
    jwt_secret = encodeURIComponent("123456789abcdefg") // min 16 caracteres random => 5473e3f141e0328ce87dac9366e0aace
} = process.env;

const Connection = () => {
    
    const [submitForm, setSubmitForm] = useState(false);
    const [inputs, setInputs] = useState({});

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const doRequest = async () => {
        const response = await fetch("http://localhost:9000/users/connection/", {
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
            sessionStorage.setItem("key", results.token);

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
            <h1>Connection</h1>
            <p>Données de connection :</p>
            <form onSubmit={handleSubmit}>
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
        if(items.usersInstances.password === "true" && items.usersInstances.token){
            const cookies = new Cookies();
            cookies.set("userName", items.usersInstances.userName, { path: '/' });
            cookies.set("token", items.usersInstances.token, { path: '/' });
        return (
                <>
                <ul> Vous êtes identifié comme :
                    {items.usersInstances.userName}
                </ul>
                
                <h1>Connection</h1>
                <p>Données de connection :</p>
                <form onSubmit={handleSubmit}>
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
        } else {
            return (
                <>
                <div>Erreur : mot de passe incorrect.</div>
                
                <h1>Connection</h1>
                <p>Données de connection :</p>
                <form onSubmit={handleSubmit}>
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
            <h1>Connection</h1>
            <p>Données de connection :</p>
            <form onSubmit={handleSubmit}>
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

export default Connection;