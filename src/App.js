import "./App.css";
import { DarkModeContextProvider } from "./Components/context/DarkMode";
import { UserContextProvider } from "./Components/context/UserContext";
import Navs from "./Navs";

function App() {
  return (
    <div>
      <UserContextProvider>
        <DarkModeContextProvider>
          <Navs />
        </DarkModeContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
