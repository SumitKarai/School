import { Button } from "@mui/material"
import React, { useState,} from "react"
import { useNavigate,useLocation} from "react-router-dom";
import './Style.css';
function AddTeacher (props){
    const navigate = useNavigate()
    const location = useLocation()
    const screen = location.state
    const [namees,setName]=useState()
  const [email,setEmail]=useState()
  const [age,setAge]=useState()
  const [classes,setClasses]=useState()
  const [id,setId]=useState()
//   const [oldData,setOldData]=useState()
React.useEffect(()=>{
   

if(screen?.display==='edit'){
   setName(screen.name)
   setEmail(screen.email)
   setClasses(screen.standard)
   setAge(screen.age)
   setId(screen.id)
   console.log(screen.name)
   console.log(screen.email)
   console.log(screen.standard)
   console.log(screen.age)
   console.log(screen.display)
   console.log(screen.id)
}
// eslint-disable-next-line
},[])


    const nameFun = (e)=>{
        setName(e.target.value)
        console.log(namees)
        }
        const emailFun = (e)=>{
          setEmail(e.target.value)
          console.log(email)
          }
          const ageFun = (e)=>{
            setAge(e.target.value)
            console.log(age)
            }
            const classesFun = (e)=>{
              setClasses(e.target.value)
              console.log(classes)
              }

            
            const addStudent =async()=>{
               let body = {
                name:namees,
                email:email,
                standard:classes,
                age:age,
                id:Math.random().toString(36).substr(2, 9)
            }
               console.log(body)
               let oldData = JSON.parse(localStorage.getItem('teacherData'))
               let updatedData
               if(oldData)
               {
                 updatedData = [...oldData, body];
               }
               else
               {
                 updatedData = [body];
               }
               localStorage.setItem('teacherData',JSON.stringify(updatedData));
               navigate('/teacher')

            //    const res = await fetch('http://localhost:5000/students', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(body),
            //   });
            //   const data = await res.json();
            //   if(data.statusCode==201){
            //     navigate('/student')
            //   }
            }
            const editStudent = async () => {
                // try {
                    let body = {
                        name:namees,
                        email:email,
                        standard:classes,
                        age:age,
                        id:id
                    }
                       console.log(body)

                       let oldData =JSON.parse(localStorage.getItem('teacherData'))
                       console.log(oldData)

                    
                        const editIndex = oldData.findIndex(student => student.id === id);
                        oldData[editIndex].name = namees
                        oldData[editIndex].email =  email
                        oldData[editIndex].standard = classes
                        oldData[editIndex].age = age
                            console.log(oldData)
                      localStorage.setItem('teacherData',JSON.stringify(oldData));
                      navigate('/teacher')

          }
 
    return(
        <div align="center" >
      
        <form className="formstyle item-style">
          <h2 className="headingstyle">Add Teacher</h2>
          <table>
            <tbody>
            <tr>
                <td className="item-style"><span >Name: </span></td>
                <td className="item-style"><input type="text" value={namees} placeholder="Enter full name" onChange={nameFun}/></td>
            </tr>
            <tr>
                <td className="item-style"><span>Subject: </span></td>
                <td className="item-style"><input type="email" value={email} onChange={emailFun} id="email" name="email" placeholder="Enter subjects" required /></td>
            </tr>
            <tr>
                <td className="item-style"><span>Age: </span></td>
                <td className="item-style"><input type="number" value={age} placeholder="Enter age" onChange={ageFun}/></td>
            </tr>
            <tr>
                <td className="item-style"><span>Class Teacher: </span></td>
                <td className="item-style"><input type="text" value={classes} placeholder="Enter class" onChange={classesFun}/></td>
            </tr>
            </tbody>
          </table>  
        </form>
        <div>
            {
    screen==null?(<Button variant="contained" onClick={addStudent} >Add Teacher</Button>)
           :
            (<Button variant="contained" onClick={editStudent} >Save Edit</Button>)
            }
        </div>
            </div>
    )
}
export default AddTeacher;