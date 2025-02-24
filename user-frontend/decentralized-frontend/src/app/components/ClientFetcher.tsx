// "use client";

// import { useEffect, useState } from "react";
// import { fetchDataWithToken } from "../api/actions";


// export default function ClientFetcher() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Retrieve token from localStorage

//     if (!token) {
//       setError("No token found");
//       return;
//     }

//     fetchDataWithToken(token)
//       .then(setData)
//       .catch((err) => setError(err.message));
//   }, []);

//   return (
//     <div>
//       {error && <p className="text-red-500">{error}</p>}
//       {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { fetchDataWithToken } from "../api/actions";


type ClientFetcherProps = {
  onDataFetched: (data: any) => void; // Callback function for handling fetched data
};

export default function ClientFetcher({ onDataFetched }: ClientFetcherProps) {
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      return;
    }

    fetchDataWithToken(token)
      .then(onDataFetched) // Pass data to parent component
      .catch((err) => setError(err.message));
  }, [onDataFetched]);

  return error ? <p className="text-red-500">{error}</p> : null;
}
