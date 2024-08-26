import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState} from 'react'
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';

export default function Teacher() {
  const navigate = useNavigate()
  const [studentData,setStudentData]=useState([])
    React.useEffect(()=>{
      
        fetchStudents()
        console.log(studentData)
        // eslint-disable-next-line
    },[])






   async function fetchStudents (){
            // const response = await fetch('http://localhost:5000/students');
            // const data = await response.json();
         let data =  localStorage.getItem('teacherData')
         setStudentData(JSON.parse(data))
           console.log(data)
           
                    
   }
   const deleteStudent = async (id) => {
      // try {
          console.log(id)
             let oldData =JSON.parse(localStorage.getItem('teacherData'))
             console.log(oldData)
             
           const editIndex = oldData.findIndex(student => student.id === id);
             console.log(editIndex)
             oldData.splice(editIndex,1)
           localStorage.setItem('teacherData',JSON.stringify(oldData));
           fetchStudents();

}


//     try {
//       const response = await fetch('http://localhost:5000/students/'+id, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
    
//       });
// console.log(response)
//       if (response.status==200) {
//         fetchStudents()

//   }  } catch (error) {
//       console.error('Error:', error);
//     }
  // };

   
  return (
    <>
    <h1 className='text-center'>Teachers Data</h1>
    <Link to="/addteacher">
    <Button variant="contained" >Add Teacher</Button>
    </Link>
    <div className='m-3'>
      { (studentData?.length===0)? <h3>No data,Please input data by clicking "add teacher"</h3>:
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Subject</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Class Teacher</TableCell>
            <TableCell align="right">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {studentData?.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.standard}</TableCell>
              <TableCell align="right">
              <Button onClick={()=>navigate('/addteacher',
              {state:{
                name:row.name,
                email:row.email,
                age:row.age,
                standard:row.standard,
                display:'edit',
                id:row.id
            }})} 
              variant="contained">Edit</Button>
              <Button variant="contained" color="error" onClick={()=>deleteStudent(row.id)}>Delete</Button>
             </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> }
      <hr/>
   






    </div>
    </>
  );
}
