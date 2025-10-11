import "./App.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary.jsx";

function App() {
   return (
      <>
         <BrowserRouter>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
               <div className="container-fluid">
                  
                  <div className="navbar-nav flex justify-between w-full">
                     <NavLink to="/" className="nav-link">
                        Home
                     </NavLink>
                     <NavLink to="/profile" className="nav-link">
                        Profile
                     </NavLink>
                     <NavLink to="/shop" className="nav-link">
                        Shop
                     </NavLink>
                  </div>
               </div>
            </nav>

            <Routes>
               <Route
                  path="/"
                  element={
                     <ErrorBoundary>
                        <HomeScreen />
                     </ErrorBoundary>
                  }
               />
               <Route
                  path="/profile"
                  element={
                     <ErrorBoundary>
                        <ProfileScreen />
                     </ErrorBoundary>
                  }
               />
               <Route
                  path="/shop"
                  element={
                     <ErrorBoundary>
                        <ShopScreen />
                     </ErrorBoundary>
                  }
               />
            </Routes>
         </BrowserRouter>
      </>
   );
}

function HomeScreen() {
   return <h1 className="p-4">Home Screen</h1>;
}

function ProfileScreen() {
   return <h1 className="p-4">Profile Screen</h1>;
}

function ShopScreen() {
   return <h1 className="p-4">Shop Screen</h1>;
}

export default App;
