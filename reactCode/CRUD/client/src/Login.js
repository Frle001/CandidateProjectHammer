import React, {useState, useEffect, useContext}  from 'react';
import axios, { Axios } from "axios";
import { useNavigate, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { LoggedInContext } from './Helper/Context';
import Facebook from './Components/facebook';


function Login() {

    const [UsernameReg, setUsernameReg] = useState('')
    const [PasswordReg, setPasswordReg] = useState('')
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [LoginMessage, setLoginMessage] = useState('')
    const [RegisterMessage, setRegisterMessage] = useState('')
    const {LoggedIn,setLoggedIn} = useContext(LoggedInContext)

    const register = () => {
        axios.post('http://localhost:3001/api/register', {
            Username: UsernameReg,
            Password: PasswordReg   
        })
    }

    const login = () => {
        axios.post('http://localhost:3001/api/login', {
            Username: Username,
            Password: Password
        }).then((response) => {
            console.log(response.data);

            if (!response.data.message){
                setLoggedIn(true);
                navigate('/Home');
            }else{
                setLoginMessage(response.data.message)
            }
        })
    }
    
    
    let navigate = useNavigate();

    if (LoggedIn){
            return <Navigate to="/Home" />
        }

    const componentClicked = () => console.log("clicked");

    const responseFacebook = (response) => {
        console.log(response);
        setLoggedIn(true);
        navigate('/Home');
    }
        /*window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              var accessToken = response.authResponse.accessToken;
              
            } 
        });*/
        /*function facebooklogout() {
            window.FB.logout(function (response) {
            }
        )};
        facebooklogout();*/
        
    return (
        <center>
            <div>
                <h1>Please Login/Register to continue using our App</h1>
                <div className='registration'>
                    <h1>Registration</h1>
                    <label>Username</label>
                    <input type="text" onChange={(e)=>{setUsernameReg(e.target.value)}} />
                    <label>Password</label>
                    <input type="text" onChange={(e)=>{setPasswordReg(e.target.value)}} /> 
                    <button onClick={register}>Register</button>
                </div>
                <div className='Login'>
                    <h1>Login</h1>
                    <label>Username</label>
                    <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <label>Password</label>
                    <input type="text" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button onClick={login}>Login</button>
                    <h1>{LoginMessage}</h1>
                </div>
                <div className='FacebookLogin'>
                    <FacebookLogin
                    appId="663257965404584"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook} />
                </div>          
            </div>
        </center>
        
    );
}

export default Login;
/*function Department() {

    const [DepartmentNo, setDepartmentNo] = useState();
    const [DepartmentName, setDepartmentName] = useState("");
    const [DepartmentLocation, setDepartmentLocation] = useState("");
    const [DepartmentList, setDepartmentList] = useState([]);
    const [newName, setnewName] = useState("");
    const [newLocation, setnewLocation] = useState("");

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
                <h1>
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
                </h1>
                )
            })}
        </div>
    );
}*/

