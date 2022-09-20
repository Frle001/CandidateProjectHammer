const express = require ("express")
const app = express()
const mysql = require("mysql2")
const bodyParser = require ('body-parser');
const cors = require ('cors');
//database
let db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Frleigralol001',
    database:'company'
});
//components needed to comunicate with frontend
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

//register
app.post('/api/register', (req,res)=>{

    const Username = req.body.Username;
    const Password = req.body.Password;

    const sqlInsert = "INSERT INTO login (loginUserName, LoginPassword) VALUES (?, ?);";  
    db.query(sqlInsert, [Username, Password], (err,result)=>{
        console.log(err);
    });
});

//login
app.post('/api/login', (req,res)=>{

    const Username = req.body.Username;
    const Password = req.body.Password;

    const sqlInsert = "SELECT * FROM login WHERE loginUserName= ? AND loginPassword= ?;";  
    db.query(sqlInsert, [Username, Password], (err,result)=>{
        if (err) {
            res.send({err: err});
        }

        if (result.length >0){
            res.send(result);
        }else {
            res.send({message: "Wrong username/password combination!"})
        }
    });
});

//department
app.get('/api/department/get', (req,res)=>{
    const sqlSelect = "SELECT * FROM department;";  
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    });
});

app.post('/api/department/insert', (req,res)=>{

    const DepartmentNo = req.body.DepartmentNo;
    const DepartmentName = req.body.DepartmentName;
    const DepartmentLocation = req.body.DepartmentLocation;

    const sqlInsert = "INSERT INTO department (DepartmentNo, DepartmentName, DepartmentLocation) VALUES (?, ?, ?);";  
    db.query(sqlInsert, [DepartmentNo, DepartmentName, DepartmentLocation], (err,result)=>{
        console.log(result);
    });
});

app.delete('/api/department/delete/:DepartmentNo', (req,res) =>{
    const DepartmentNo = req.params.DepartmentNo;
    const sqlDelete = "DELETE FROM department WHERE DepartmentNo = ?;";
    db.query(sqlDelete, DepartmentNo, (err,result) => {
        if (err) console.log(err);
    })
})

app.put('/api/department/update', (req,res) => {
    const DepartmentNo = req.body.DepartmentNo;
    const DepartmentName = req.body.DepartmentName;
    const DepartmentLocation = req.body.DepartmentLocation;

    const sqlUpdate = "UPDATE department SET DepartmentName = ?, DepartmentLocation = ? WHERE DepartmentNo = ?;";
    const sqlUpdate_Name = "UPDATE department SET DepartmentName = ? WHERE DepartmentNo = ?;";
    const sqlUpdate_Location = "UPDATE department SET DepartmentLocation = ? WHERE DepartmentNo = ?;";

    if (DepartmentName != "" && DepartmentLocation == "") {
        db.query(sqlUpdate_Name, [DepartmentName, DepartmentNo], (err,result)=>{
            if (err) console.log(err);
    })}
    if (DepartmentName == "" && DepartmentLocation != "") {
        db.query(sqlUpdate_Location, [DepartmentLocation, DepartmentNo], (err,result)=>{
            if (err) console.log(err);
    })}
    if (DepartmentName != "" && DepartmentLocation != ""){
        db.query(sqlUpdate, [DepartmentName, DepartmentLocation, DepartmentNo], (err,result)=>{
            if (err) console.log(err);
    })}
})

//employee
app.get('/api/employee/get', (req,res)=>{
    const sqlSelect = "SELECT * FROM employee;";  
    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    });
});

app.post('/api/employee/insert', (req,res)=>{

    const employeeNo = req.body.employeeNo;
    const employeeName = req.body.employeeName;
    const salary = req.body.salary;
    const DepartmentNo = req.body.DepartmentNo;

    const sqlInsert = "INSERT INTO employee (employeeNo, employeeName, salary, DepartmentNo, lastModifyDate) VALUES (?, ?, ?, ?, NOW());";  
    db.query(sqlInsert, [employeeNo, employeeName, salary, DepartmentNo], (err,result)=>{
        console.log(err);
    });
});

app.delete('/api/employee/delete/:employeeNo', (req,res) =>{
    const employeeNo = req.params.employeeNo;
    const sqlDelete = "DELETE FROM employee WHERE employeeNo = ?;";
    db.query(sqlDelete, employeeNo, (err,result) => {
        if (err) console.log(err);
    })
})

app.put('/api/employee/update', (req,res) => {
    const employeeNo = req.body.employeeNo
    const employeeName = req.body.employeeName;
    const salary = req.body.salary;
    const DepartmentNo = req.body.DepartmentNo;
    

    const sqlUpdate = "UPDATE employee SET employeeName = ?, salary = ?, DepartmentNo = ? WHERE employeeNo = ?;";
    const sqlUpdate_Name = "UPDATE employee SET employeeName = ? WHERE employeeNo = ?;";
    const sqlUpdate_salary = "UPDATE employee SET salary = ? WHERE employeeNo = ?;";
    const sqlUpdate_DepartmentNo = "UPDATE employee SET DepartmentNo = ? WHERE employeeNo = ?;";
    const sqlUpdate_NameEmpty = "UPDATE employee SET salary = ?, DepartmentNo = ? WHERE employeeNo = ?;";
    const sqlUpdate_salaryEmpty = "UPDATE employee SET employeeName = ?, DepartmentNo = ? WHERE employeeNo = ?;";
    const sqlUpdate_DepartmentNoEmpty = "UPDATE employee SET employeeName = ?, salary = ?  WHERE employeeNo = ?;";

    if (employeeName == "" && salary == '' && DepartmentNo == '') {
        console.log("prazna edit polja");
    }
    if (employeeName != "" && salary != '' && DepartmentNo != ''){
        db.query(sqlUpdate, [employeeName, salary, DepartmentNo, employeeNo], (err,result)=>{
            if (err) console.log(err);
    })}
    if (salary == '' && DepartmentNo == '' && employeeName != "") {
        db.query(sqlUpdate_Name, [employeeName, employeeNo], (err,result)=>{
            if (err) console.log(err);
    })}
    if (employeeName == "" && DepartmentNo == '' && salary != '') {
        db.query(sqlUpdate_salary, [salary, employeeNo], (err,result)=>{
            if (err) console.log(err);
    })}
    if (employeeName == "" && DepartmentNo != '' && salary == '') {
        db.query(sqlUpdate_DepartmentNo, [DepartmentNo, employeeNo], (err,result)=>{
            if (err) console.log(err);
    })}
    if (employeeName == "") {
        db.query(sqlUpdate_NameEmpty, [salary, DepartmentNo, employeeNo], (err,result)=>{
            if (err) console.log(err);
    })}
    if (salary == '') {
        db.query(sqlUpdate_salaryEmpty, [employeeName, DepartmentNo, employeeNo], (err,result)=>{
            if (err) console.log(err);
    })}
    if (DepartmentNo== '') {
        db.query(sqlUpdate_DepartmentNoEmpty, [employeeName, salary, employeeNo], (err,result)=>{
            if (err) console.log(err);
    })}
});

//queries
  
//1
db.query("SELECT AVG(salary) as average, DepartmentLocation FROM company.employee emp INNER JOIN company.department dep on emp.DepartmentNo=dep.DepartmentNo WHERE DepartmentLocation != 'London' AND DepartmentName = 'Development' group by DepartmentLocation", (err,result)=>{
    if (err) {
        console.log(err);
    }
    /*result.forEach(element => {
        console.log("1");
    });*/
        result.map((val) => {
        console.log("average salary for a development employee in " + val.DepartmentLocation + " is: " + val.average);
    })
});

//2

db.query("SELECT count(*) as empNumber, DepartmentLocation FROM company.employee emp INNER JOIN company.department dep on emp.DepartmentNo=dep.DepartmentNo group by DepartmentLocation HAVING COUNT(*) > 1;", (err,result)=> {
    if (err) {
        console.log(err);
    }
    /*result.forEach(element => {
        console.log("1");
    });*/
        result.map((val) => {
        console.log("Location with more than 1 employee is " + val.DepartmentLocation + ", it has " + val.empNumber);
    })
});

//3
db.query("SELECT count(*) as empNumber, departmentLocation FROM company.employee emp INNER JOIN company.department dep on emp.DepartmentNo=dep.DepartmentNo WHERE DepartmentName = 'Development' group by DepartmentLocation;", (err,result)=>{
    if (err) {
        console.log(err);
    }
    dic={}
    result.map((val) => {
        dic[val.departmentLocation] = val.empNumber;
        //console.log(dic);
    })
    db.query("SELECT departmentLocation FROM department group by DepartmentLocation;", (err,res)=>{
        if (err) {
            console.log(err);
        }
        var method = (param) => {if (param) {return param;} else {return 0;}}
        res.map((val) => {
            console.log("In " + val.departmentLocation + " is " + method(dic[val.departmentLocation]) + " Development employees");
        })
    });
});

//4
db.query("SELECT MAX(salary) as max FROM company.employee WHERE salary < (SELECT MAX(salary) from employee);", (err,result)=>{
    //list = result;
    result.map((val) => {
        console.log("2nd highest salary is: " + val.max);
    })
});

//listening to server
app.listen(3001, () => {
    console.log("running on port 3001")
});