import React, {useState, useEffect, useContext}  from 'react';
import axios from 'axios';
import { LoggedInContext } from './Helper/Context';
import {Navigate} from 'react-router-dom';

function Employee() {

    const [employeeNo, setemployeeNo] = useState("");
    const [employeeName, setemployeeName] = useState("");
    const [salary, setsalary] = useState("");
    const [DepartmentNo, setDepartmentNo] = useState("");
    const [employeeList, setemployeeList] = useState([]);
    const [newName, setnewName] = useState("");
    const [newsalary, setnewsalary] = useState("");
    const [newDepartmentNo, setnewDepartmentNo] = useState("");
    const {LoggedIn, setLoggedIn} = useContext(LoggedInContext);

    if (!LoggedIn) {
        return <Navigate to="/" />
    }

    useEffect(()=>{
        axios.get('http://localhost:3001/api/employee/get').then((response)=>{
            setemployeeList(response.data);
        });
    });

    const Add = () =>{
        axios.post('http://localhost:3001/api/employee/insert', {
            employeeNo: employeeNo,
            employeeName: employeeName, 
            salary: salary,
            DepartmentNo: DepartmentNo
            
        })/*.then(() => {
            ConsoleMethod();
        })*/;
    }

    const Delete = (empID) =>{
        axios.delete("http://localhost:3001/api/employee/delete/"+empID+"");
    }

    const Edit = (ID) =>{
        axios.put("http://localhost:3001/api/employee/update", {
            employeeNo: ID,
            employeeName: newName,
            salary: newsalary,   
            DepartmentNo: newDepartmentNo
        })
    }

    const ExportConsoleMethod = () => {
        axios.get('http://localhost:3001/api/employee/get').then((resp) => {
            console.log("+----------+------------------+------------+------------+");
            console.log("|employeeNo|employeeName      |Salary      |departmentNo|");
            {employeeList.map((val)=>{
                //for(var i= 0; i < resp.data.length; i++){
                    //console.log("+++ \n" + val.employeeName + "\n");
                //}
                //for (var elem in resp.data){
                    
                //}
                console.log("+----------+------------------+------------+------------+");
                console.log("|" + val.employeeNo + " ".repeat(10-val.employeeNo.toString().length) + "|" + val.employeeName + " ".repeat(18-val.employeeName.length) + "|" + val.salary + " ".repeat(12-val.salary.toString().length) + "|" + val.DepartmentNo + " ".repeat(12-val.DepartmentNo.toString().length) + "|");
            }
            )}
            console.log("+----------+------------------+------------+------------+");
        })
    };

    

    return (
        <center>
            <div>
                <h1>Employees</h1>
                <label>ID</label>
                <input 
                    type="number" 
                    name="employeeNo"
                    onChange={(e) => {
                        setemployeeNo(e.target.value);
                }}/>
                <label>EmployeeName</label>
                <input 
                    type="text" 
                    name="employeeName"
                    onChange={(e) => {
                        setemployeeName(e.target.value);
                }}/>
                <label>salary</label>
                <input 
                    type="number" 
                    name="salary"
                    onChange={(e) => {
                        setsalary(e.target.value);
                }}/> 
                <label>DepartmentNo</label>
                <input 
                    type="number" 
                    name="DepartmentNo"
                    onChange={(e) => {
                        setDepartmentNo(e.target.value);
                }}/>
                <button onClick={Add}>Add</button>

                {employeeList.map((val)=>{
                    const dateFormat = new Date(val.lastModifyDate)
                    const dateStringed = dateFormat.toLocaleString();
                    return (
                    //<center>
                        <h5>
                            ID: {val.employeeNo} | 
                            Employee Name: {val.employeeName} 
                            <input 
                                type="text" 
                                name="newemployeeName" 
                                placeholder='New Employee Name..' 
                                onChange={(e)=> {
                                    setnewName(e.target.value);
                            }}/> | 
                            Salary: {val.salary} 
                            <input 
                                type="number" 
                                name="newsalary" 
                                placeholder='New Salary..' 
                                onChange={(e)=> {
                                    setnewsalary(e.target.value);
                            }}/> | 
                            Department ID: {val.DepartmentNo}
                            <input 
                                type="number" 
                                name="newDepartmentNo" 
                                placeholder='New Department ID..' 
                                onChange={(e)=> {
                                    setnewDepartmentNo(e.target.value);
                            }}/> |
                            lastModifyDate: {dateStringed}
                            <button onClick={()=>{Edit(val.employeeNo)}}>Edit</button>
                            <button onClick={()=>{Delete(val.employeeNo)}}>Delete</button>
                        </h5>
                    //</center>
                    )
                })}
                <br/>
                <br/>
                <br/>
                <button onClick={ExportConsoleMethod}>EXPORT</button>
            </div>
        </center>
  );
}

export default Employee;