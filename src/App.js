import "./App.css";
import Routing from "./routes/Routing";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App  ">
      <Header></Header>
      <Routing />
    </div>
  );
}

export default App;
