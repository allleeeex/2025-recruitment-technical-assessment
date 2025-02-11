import Navbar from "./components/Navbar";
import Separator from "./components/Separator";
import UtilityBar from "./components/UtilityBar";
import ExploreBox from "./components/ExploreBox";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar/>
      <Separator/>
      <UtilityBar setSearchTerm={setSearchTerm} />
      <ExploreBox/>
    </>
  )
}

export default App
