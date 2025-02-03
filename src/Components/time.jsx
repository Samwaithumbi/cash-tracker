import React from "react";
import { useState, useEffect  } from "react";
import { auth } from "./firebase";
import {toast} from "react-toastify"
// import {doc, getDoc} from "firebase/firestore"
import "./styles/dashboard.css"

const Time = () => {
  const now =new Date().toLocaleDateString()
  const [time, setTime]=useState(now)
  const [greetings, setGreetings]=useState("")
  const [currentDate, setCurrentDate] = useState("");
  //const [userDetails, setUserDetails]=useState(null)

  // const fetchUserData=async()=>{
  //   auth.onAuthStateChanged(async(user)=>{
  //     console.log(user);
  //     const docRef=doc(db, "Users", user.uid);
  //     const docSnap=await getDoc(docRef)
  //     if (docSnap.exists()) {
  //       setUserDetails(docSnap.data())
  //       console.log(docSnap.data());
  //     }else{
  //       console.log("User is not logged in");
  //     }
  //       })
  // }
  // useEffect(()=>{
  //   fetchUserData()
  // }, [])

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      window.location.href = "/"; 
      toast.error("Logged Out Successfully",{
        position:"top-center"
      })
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  function updateTime(){
    const newTime=new Date().toLocaleTimeString()
    setTime(newTime)
     
  }
  setInterval(updateTime, 1000)

 useEffect(()=>{
    const nowHours = new Date();
    const hours = nowHours.getHours();
    
     if (hours<12) {
      setGreetings("Good Morning")
     }else if (hours>12 &hours<20) {
        setGreetings("Good Afternoon")
       }else{
        setGreetings("Good Evening")
       }
  
    }, [])

    useEffect(() => { 
      const date = new Date(); 
      const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
      setCurrentDate(date.toLocaleDateString('en-US', options));
   }, []);

  
    return ( 
          <div className="t-container">
              <div className="time-container">
                  <h1>{greetings} </h1>
                  <h3>{currentDate}</h3>
                  <h1>{time}</h1>
              </div>
          <div>
                <button className="logout-btn" onClick={handleLogOut}>LogOut</button>
        </div>
        </div>
    
     );
}
 
export default Time;