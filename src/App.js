import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Header";




function App() {
  return (
      <div>
          <Header />
          <Footer />
      </div>
  );
}

export default App;
