import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
      return;
    }

    fetch("http://localhost:5000/api/auth/verify", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ must be Bearer
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Verify result:", data);
        setIsValid(data.success);
      })
      .catch(() => setIsValid(false));
  }, []);

  // 🚫 Prevent dashboard from flashing before check
  if (isValid === null) {
    return <div>Checking login...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
