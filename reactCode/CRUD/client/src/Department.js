import React, {useState, useEffect, useContext}  from 'react';
import axios from "axios";
import { LoggedInContext } from './Helper/Context';
import {Navigate} from 'react-router-dom';

function Department() {

    const [DepartmentNo, setDepartmentNo] = useState();
    const [DepartmentName, setDepartmentName] = useState("");
    const [DepartmentLocation, setDepartmentLocation] = useState("");
    const [DepartmentList, setDepartmentList] = useState([]);
    const [newName, setnewName] = useState("");
    const [newLocation, setnewLocation] = useState("");
    const {LoggedIn, setLoggedIn} = useContext(LoggedInContext);

    if (!LoggedIn) {
        return <Navigate to="/" />
    }

    useEffect(()=>{
        axios.get('http://localhost:3001/api/department/get').then((response)=>{
            setDepartmentList(response.data);
        });
    });

    const Add = () =>{
        axios.post('http://localhost:3001/api/department/insert', {
            DepartmentNo: DepartmentNo,
            DepartmentName: DepartmentName, 
            DepartmentLocation: DepartmentLocation
        }).then(() => {
            alert('successful insertion');
        });
    }

    const Delete = (depID) =>{
        axios.delete("http://localhost:3001/api/department/delete/"+depID+"");
    }

    const Edit = (ID) =>{
        axios.put("http://localhost:3001/api/department/update", {
            DepartmentNo: ID,
            DepartmentName: newName,
            DepartmentLocation: newLocation,   
        })
    }

    return (
        <center>
            <div>
                <h1>Departments</h1>
                <label>ID</label>
                <input 
                    type="number" 
                    name="DepartmentNo"
                    onChange={(e) => {
                        setDepartmentNo(e.target.value);
                }}/>
                <label>DepartmentName</label>
                <input 
                    type="text" 
                    name="DepartmentName" 
                    onChange={(e) => {
                        setDepartmentName(e.target.value);
                }}/>
                <label>DepartmentLocation</label>
                <input 
                    type="text" 
                    name="DepartmentLocation" 
                    onChange={(e)=> {
                        setDepartmentLocation(e.target.value);
                }}/> 
                <button onClick={Add}>Add</button>

                {DepartmentList.map((val)=>{
                    return (
                        <h5>
                            ID: {val.DepartmentNo} | 
                            Department Name: {val.DepartmentName} 
                            <input 
                                type="text" 
                                name="newDepartmentName" 
                                placeholder='New Department Name..' 
                                onChange={(e)=> {
                                    setnewName(e.target.value);
                            }}/> | 
                            Department Location: {val.DepartmentLocation}
                            <input 
                                type="text" 
                                name="newDepartmentLocation" 
                                placeholder='New Department Location..' 
                                onChange={(e)=> {
                                    setnewLocation(e.target.value);
                            }}/>
                            <button onClick={()=>{Edit(val.DepartmentNo)}}>Edit</button>
                            <button onClick={()=>{Delete(val.DepartmentNo)}}>Delete</button>
                        </h5>
                    )
                })}
            </div>
        </center>
    );
}

export default Department;