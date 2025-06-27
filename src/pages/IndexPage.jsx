import React from "react";

function IndexPage() {
  return (
    <div>
      <h1>Fortnox Car Rental</h1>
      <button onClick={() => (window.location.href = "/rent")}>
        Rent a Car
      </button>
      <button onClick={() => (window.location.href = "/admin")}>
        Admin Page
      </button>
    </div>
  );
}

export default IndexPage;
