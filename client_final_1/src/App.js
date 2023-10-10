import './App.css';
import './style/main.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Controllers/Home";
import Contact from "./Controllers/Contact";
import Nav from "./Components/Nav";
import Article from "./Controllers/Article";
//Users
import Connection from "./Controllers/Users/Connection";
import Deconnection from "./Controllers/Users/Deconnection";
import Inscription from "./Controllers/Users/Inscription";
import Desinscription from "./Controllers/Users/Desinscription";
import Page from "./Controllers/Page";
//Characters
import CharactersList from "./Controllers/Characters/CharactersList";


//commandes
//npm init react-app exemple
//npm install react-router-dom
//npm run start

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/article/:id" element={<Article />}></Route>
          <Route path="/connection" element={<Connection />}></Route>
          <Route path="/deconnection" element={<Deconnection />}></Route>
          <Route path="/inscription" element={<Inscription />}></Route>
          <Route path="/desinscription" element={<Desinscription />}></Route>
          <Route path="/page" element={<Page />}></Route>
          <Route path="/characters-list" element={<CharactersList />}></Route>
          <Route path="*" element={
            <h1>Rien à voir ici.</h1>
          }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
