import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Controllers/Home";
import Contact from "./Controllers/Contact";
import Nav from "./Components/Nav";
import Article from "./Controllers/Article";

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
          <Route path="*" element={
            <h1>Rien à voir ici.</h1>
          }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
