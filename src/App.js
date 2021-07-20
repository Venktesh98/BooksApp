import Navbar from "./components/Navbar/Navbar";
import Book from "./components/Books/Book";
import { Route, Switch } from "react-router";
import About from "./components/Pages/About";
import Contact from "./components/Pages/ContactUs";
import Error from "./components/Pages/Error";
import Footer from "./components/Footer/PageFooter";

function App() {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route path="/" component={Book} exact />
        <Route path="/about" component={About} exact />
        <Route path="/contact" component={Contact} exact />
        <Route component={Error} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
