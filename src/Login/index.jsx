import React from 'react';
import { NavLink, Redirect } from "react-router-dom";



import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";


class LogIn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: "",
         password: "",
         logIn: false,
      }
   }
   changeState = e => {
      this.setState({
         [e.target.name]: e.target.value,
      });
      console.log(this.state);
   }
   LogInUser = async () => {
      console.log("вхід");
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
         .then((user) => {
            this.setState({ logIn: true })
            console.log(this.state.logIn);
            console.log(user);
            console.log(user.user.displayName);
            var userId = firebase.auth().currentUser.uid;
            console.log(userId);
            <Redirect to="/timer" />
         }
         )
         .catch((error) => {
            alert(" User is missing or incorrectly entered password and email");
         });
   }

   render() {
      if (this.state.logIn) {
         return <Redirect to="/timer" />
      }
      return (
         <section className="logIn">
            <h1 className="logIn__">Login</h1>
            <form action="" className="logIn__form">
               <input type="text" name="email" className="logIn__mail" placeholder="login" onChange={this.changeState} value={this.state.email} />
               <input type="password" name="password" autoComplete="on" className="logIn__password" placeholder="password" onChange={this.changeState} value={this.state.password} />
               <NavLink to="/" className="logIn__login" onClick={this.LogInUser} >Login</NavLink>
               <div className="logIn__reg">
                  <span className="logIn__text">Don't have accoount yet</span>
                  <NavLink className="logIn__btn" exact to="/register">Register</NavLink>
               </div>
            </form>
         </section>
      );
   }
}

export default LogIn;

