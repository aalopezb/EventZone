import React from "react";
import UserSearch from "./components/UserSearch";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Search User Profile</h1>
      <UserSearch />
    </div>
  );
}

export default App;
