import React from "react";
import "./Components/styles/index.css"
import Google from "./Components/signinwithgoogle";

const Home = () => {
    return ( 
        <div className="home">
         <img className="image" src="/photo.jpeg" alt="" />
         <h1>Welcome to <br />Expense Tracker, Money Manager &Budget</h1>
            <p>Track your expenses to control your money</p> 
            <p>To start Sign in with Google</p>
            <Google/>
        </div>
     );
}
 
export default Home
