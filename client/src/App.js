import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipes";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["access_token"]);
  const isAuthenticated = !!cookies.access_token;

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
          />
          <Route
            path="/create-recipe"
            element={isAuthenticated ? <CreateRecipe /> : <Navigate to="/auth" />}
          />
          <Route
            path="/saved-recipes"
            element={isAuthenticated ? <SavedRecipes /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
