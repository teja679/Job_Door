import { createContext, useState } from "react";
import "./App.css";
import Navs from "./Navs";

export const DarkModeContext = createContext();

function App() {
  const [darkModeOn, setDarkModeOn] = useState(false);

  return (
    <div>
      <DarkModeContext.Provider value={[darkModeOn, setDarkModeOn]}>
        <Navs />
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
