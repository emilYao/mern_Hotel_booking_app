import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";

function App() {
  const {isLoggedIn}= useAppContext();
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>}/>
         <Route path="/register" element={<Layout><Register/></Layout>}/>
         <Route path="/sign-in" element={<Layout><SignIn/></Layout>}/>
         {
          isLoggedIn && (
            <>
              <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>}/>
              <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>}/>

            </>
          )
         }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
