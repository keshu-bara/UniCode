import React, { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Test() {
  const url = "http://127.0.0.1:8000/api/home/serveron/";
  const [data, setData] = useState(null);

  useEffect(() => {
    const getserver = async () => {
      try {
        let response = await fetch(url);
        let data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({'message':"Developer is not in a mood"});
      }
    };

    getserver();
  }, [url]);

  return (
    <div>
      <h1>This is Test Page</h1>
      <hr />
      <i>
        ServerStatus:<p>{data ? data.message : "Loading..."}</p>
      </i>
    </div>
  );
}
