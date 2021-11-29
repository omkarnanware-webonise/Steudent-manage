import "./Home.css";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";

function Home() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rollno, setRollNo] = useState(0);
  const [dept, setDept] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [updateaddress, setUpdateAdress] = useState("");
  const [updaterollNo, setUpdateRollNo] = useState(0);
  const [updatedept, setUpdateDept] = useState("");

  const [studentList, setStudentList] = useState([]);

  const [seachTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const addStudent = () => {
    Axios.post("http://localhost:5000/create", {
      name: name,
      address: address,
      rollno: rollno,
      dept: dept,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          name: name,
          address: address,
          rollno: rollno,
          dept: dept,
        },
      ]);
    });
  };

  const getStudent = () => {
    Axios.get("http://localhost:5000/students").then((response) => {
      setStudentList(response.data);
    });
  };

  const updateStudent = (id) => {
    Axios.put("http://localhost:5000/update", {
      name: updateName,
      address: updateaddress,
      rollno: updaterollNo,
      dept: updatedept,
      id: id,
    }).then((response) => {
      setStudentList(
        studentList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: updateName,
                address: updateaddress,
                rollno: updaterollNo,
                dept: updatedept,
              }
            : val;
        })
      );
    });
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
      setStudentList(
        studentList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="Home">
      <div className="lab">
        <h3>Add student</h3>
        <div className="butLogout">
          <button
            onClick={() => {
              history.push("/");
            }}
          >
            Logout
          </button>
        </div>
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <br></br>

        <label>Address</label>
        <input
          type="text"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <br></br>

        <label>roll no</label>
        <input
          type="text"
          onChange={(event) => {
            setRollNo(event.target.value);
          }}
        />
        <br></br>

        <label>dept</label>
        <input
          type="text"
          onChange={(event) => {
            setDept(event.target.value);
          }}
        />
        <br></br>
      </div>

      <button onClick={addStudent}>add student</button>
      <button
        onClick={() => {
          history.push("/registerUser");
        }}
      >
        Register User
      </button>

      <div>
        <button onClick={getStudent}>Show student</button>
        <div></div>
        <div className="search">
          <label> Search here </label>
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>

        {studentList
          .filter((val) => {
            if (seachTerm == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(seachTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return (
              <div className="stud">
                <h3> Name: {val.name}</h3>
                <h3> Address: {val.address}</h3>
                <h3> RollNo: {val.rollno}</h3>
                <h3> Dept: {val.dept}</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(event) => {
                      setUpdateName(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="address"
                    onChange={(event) => {
                      setUpdateAdress(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="rollNo"
                    onChange={(event) => {
                      setUpdateRollNo(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    onChange={(event) => {
                      setUpdateDept(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateStudent(val.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteStudent(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
