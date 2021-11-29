import Axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function RegisterUser() {
  const [userRegister, setUserRegister] = useState("");
  const [passRegister, setPassRegister] = useState("");

  const history = useHistory();

  const register = () => {
    Axios.post("http://localhost:5000/register", {
      username: userRegister,
      password: passRegister,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      {" "}
      <div>
        <h2>Resgister user</h2>
        <input
          type="text"
          onChange={(e) => {
            setUserRegister(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <input
          type="text"
          onChange={(e) => {
            setPassRegister(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <button onClick={register}>Register</button>
        <button
          onClick={() => {
            history.push("/home");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default RegisterUser;
