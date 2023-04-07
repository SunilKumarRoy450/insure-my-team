import { Box } from "@chakra-ui/react";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Box className="blog-container">
        <AllRoutes />
      </Box>
    </div>
  );
}

export default App;
