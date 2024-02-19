import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [enteredVal, setEnteredVal] = useState("");
  const [totalCompanies, setTotalCompanies] = useState([]);

  useEffect(() => {
    if (enteredVal !== "") {
      const companyList = fetch(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${enteredVal}`
      );

      companyList
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setTotalCompanies(res); // Set state with fetched data
        });
    }
  }, [enteredVal]);

  return (
    <div className="App">
      <h1>Company Selector</h1>
      <div className="dropdown">
        <input
          onChange={(e) => setEnteredVal(e.target.value)}
          value={enteredVal}
        ></input>

        <div>
          {totalCompanies.map((company) =>
            company ? <div>{company.name}</div> : <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
