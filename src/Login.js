import Axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userRole] = useState("");

  const [role, setRole] = useState("");

  //   useEffect(() => {
  //     Axios.get("http://localhost:5000/login").then((response) => {
  //       if (response.data.loggedIn == true) {
  //         setRole(response.data.user[0].role);
  //       }
  //     });
  //   }, []);

  const [loginStatus, setLoginStatus] = useState("");

  let history = useHistory();

  const check = () => {
    Axios.post("http://localhost:5000/login", {
      username: username,
      password: password,
      userRole: userRole,
    }).then((respose) => {
      if (respose.data.message) {
        setLoginStatus(respose.data.message);
      } else if (respose.data[0].userRole === "admin") {
        history.push("/home");
      } else if (respose.data[0].userRole === "user") {
        history.push("/studentInfo");
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <br></br>
      <br></br>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br></br>
      <br></br>
      <button onClick={check}>Login</button>

      <h3>{loginStatus}</h3>
    </div>
  );
}

export default Login;
