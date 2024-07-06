import { useState, useEffect } from "react";
import {Routes, Route, Link, useNavigate } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate()
  const client = useApolloClient();
  useEffect(() => {
    const token = localStorage.getItem('books-user-token');
    if (token) {
      setToken(token);
    }
  }, []);
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate('/')
  };
  return (
      <div>
        <nav>
          <button onClick={() => navigate("/")}>Authors</button>
          <button onClick={() => navigate("/books")}>Books</button>
          {token ? (
            <>
              <button onClick={() => navigate("/add")}>Add Book</button>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route
            path="/add"
            element={token ? <NewBook /> : <LoginForm setToken={setToken} />}
          />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
        </Routes>
      </div>
  );
};

export default App;
