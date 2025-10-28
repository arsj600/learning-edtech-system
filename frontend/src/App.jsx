import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import {ToastContainer} from "react-toastify"
import getCurrentUser from "./customApi/getCurrentUser"
import { useSelector } from "react-redux"
import Profile from "./pages/Profile"
import ForgotPassword from "./pages/ForgetPassword"
import EditProfile from "./pages/EditProfile"
import Dashboard from "./pages/Educator/DashBoard"
import getCreatorCourseData from "./customApi/getCreatorCourseData"
import Courses from "./pages/Educator/Courses"
import CreateCourse from "./pages/Educator/CreateCourses"
import AddCourses from "./pages/Educator/AddCourse"
import getCouseData from "./customApi/getCourseData"
import CreateLecture from "./pages/Educator/CreateLecture"
import EditLecture from "./pages/Educator/editLecture"
export const serverUrl="http://localhost:4000"


function App() {
  getCurrentUser();
  getCreatorCourseData();
  getCouseData();
  const {userData}=useSelector(state=>state.user)
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={!userData ? <SignUp/>:
        <Navigate to={"/"}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={userData ?<Profile/>:
        <Navigate to={"/signup"}/>}/>
      <Route path="/forget" element={userData ?<ForgotPassword/>:
        <Navigate to={"/signup"}/>}/>
        <Route path="/editprofile" element={userData ?
        <EditProfile/> :<Navigate to={"/signup"}/>}/>

      <Route path="/dashboard" element={userData?.role==="educator"
       ? <Dashboard/> :<Navigate to={"/signup"}/>}/>
       

        <Route path='/courses' element={userData?.role === "educator"?<Courses/>:<Navigate to={"/signup"}/>}/>
 <Route path="/createcourse" element={userData?.role==="educator"
       ? <CreateCourse/> :<Navigate to={"/signup"}/>}/>
        
        <Route path='/addcourses/:courseId' element={userData?.role === "educator"?<AddCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/allcourses' element={userData?<AllCourses/>:<Navigate to={"/signup"}/>}/>
 
        <Route path='/createlecture/:courseId' element={userData?.role === "educator"?<CreateLecture/>:<Navigate to={"/signup"}/>}/>
        <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator"?<EditLecture/>:<Navigate to={"/signup"}/>}/>
        
        
      </Routes>
    </>
  )
}

export default App
