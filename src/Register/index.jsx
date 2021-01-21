import React from 'react';
import { Redirect, NavLink } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";

import FirebaseConfig from '../FirebaseConfig';

firebase.initializeApp(FirebaseConfig);
const database = firebase.database();

class Register extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         firstname: "",
         lastname: "",
         email: "",
         password: "",
         logIn: false,
      }
   }
   handleRegistration = async (e) => {
      e.preventDefault();

      let nameProfile = this.state.firstname + " " + this.state.lastname;
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function (data) {
         data.user.updateProfile({ displayName: nameProfile })
      }).catch(function (error) {
      });
      var userId = firebase.auth().currentUser.uid;
      database.ref('users/' + userId).set({
         username: nameProfile,
         email: this.state.email,
         timedata: {
            hoursdeskop: "00",
            minutedeskop: "00",
            secondsdeskop: "00",
            hoursmobile: "00",
            minutemobile: "00",
            secondsmobile: "00",
         }
      })
      this.setState({ logIn: true });
   }

   changeState = e => {
      this.setState({
         [e.target.name]: e.target.value,
      });
   }
   render() {
      if (this.state.logIn) {
         return <Redirect to="/timer" />
      }
      return (
         <section className="register">
            <h2 className="register">Register</h2>
            <form action="" className="register__form">
               <input type="text" name="firstname" className="register__firstname" placeholder="First Name" onChange={this.changeState} value={this.state.firstname} />
               <input type="text" name="lastname" className="register__lastname" placeholder="Last Name" onChange={this.changeState} value={this.state.lastname} />
               <input type="text" name="email" className="register__email" placeholder="Email" onChange={this.changeState} value={this.state.email} />
               <input type="password" name="password" className="register__password" autoComplete="on" placeholder="password" onChange={this.changeState} value={this.state.password} />
               <button type="submit" to="/timer" onClick={this.handleRegistration} className="register__singup">Sing up</button>
               <div className="register__login">
                  <span className="register__text">Alredy registered?</span>
                  <NavLink className="register__singin" to="/" >Log in</NavLink>
               </div>
            </form>
         </section>
      );
   }
}

export default Register;
