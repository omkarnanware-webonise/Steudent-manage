import Axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./studentInfo.css";

function StudentInfo() {
  const [studentList, setStudentList] = useState([]);

  const [seachTerm, setSearchTerm] = useState("");
  let history = useHistory();

  const getStudent = () => {
    Axios.get("http://localhost:5000/students").then((response) => {
      setStudentList(response.data);
    });
  };

  return (
    <div>
      <div className="student">
        <button onClick={getStudent}>Show students</button>
        <div
          className="but"
          onClick={() => {
            history.push("/");
          }}
        >
          {" "}
          Logout
        </div>
        <input
          type="text"
          placeholder="search"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        {studentList
          .filter((val) => {
            if (seachTerm == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(seachTerm.toLowerCase())
            ) {
              return (
                <div className="abc">
                  <h3>Name :{val.name}</h3>
                  <h3>Address : {val.address}</h3>
                  <h3>Roll NO :{val.rollno}</h3>
                  <h3>Department :{val.dept}</h3>
                </div>
              );
            }
          })
          .map((val, key) => {
            return (
              <div className="abc">
                <h3>Name : {val.name}</h3>
                <h3>Adress : {val.address}</h3>
                <h3>Roll No : {val.rollno}</h3>
                <h3>Department : {val.dept}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default StudentInfo;
