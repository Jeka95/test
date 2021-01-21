import React from 'react';
import { NavLink } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";

import timer from "../asset/timer.png";

var deskoptime;
var mobiletime;
class Timer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         hoursdeskop: '00',
         minutedeskop: '00',
         secondsdeskop: '00',
         hoursmobile: '00',
         minutemobile: '00',
         secondsmobile: '00',
      }
      this._isMounted = false;
   }




   componentDidMount() {
      var user = firebase.auth().currentUser;
      let TimerDeskop = () => {
         let userId = user.uid;
         console.log(userId);
         firebase.database().ref('users/' + userId).set({
            email: this.state.email,
            username: this.state.name,
            timedata: {
               hoursdeskop: `${this.state.hoursdeskop}`,
               minutedeskop: `${this.state.minutedeskop}`,
               secondsdeskop: `${this.state.secondsdeskop}`,
               hoursmobile: `${this.state.hoursmobile}`,
               minutemobile: `${this.state.minutemobile}`,
               secondsmobile: `${this.state.secondsmobile}`,
            }
         })
      }
      let TimerMobile = () => {
         let userId = user.uid;
         console.log(userId);
         if (userId !== null) {
            firebase.database().ref('users/' + userId).set({
               email: this.state.email,
               username: this.state.name,
               timedata: {
                  hoursdeskop: this.state.hoursdeskop,
                  minutedeskop: this.state.minutedeskop,
                  secondsdeskop: this.state.secondsdeskop,
                  hoursmobile: this.state.hoursmobile,
                  minutemobile: this.state.minutemobile,
                  secondsmobile: this.state.secondsmobile,
               }
            })
         }
      }
      this._isMounted = true;
      var readtime = firebase.database().ref('users/' + user.uid);
      readtime.on('value', (snapshot) => {
         const data = snapshot.val();
         console.log(data);
         if (this._isMounted) {
            this.setState({
               hoursdeskop: data.timedata.hoursdeskop,
               minutedeskop: data.timedata.minutedeskop,
               secondsdeskop: data.timedata.secondsdeskop,
               hoursmobile: data.timedata.hoursmobile,
               minutemobile: data.timedata.minutemobile,
               secondsmobile: data.timedata.secondsmobile,
               name: data.username,
               email: data.email,
            })
         }
         if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            console.log("Вы используете мобильное устройство (телефон или планшет).");
            mobiletime = setTimeout(() => {
               this.setState((state) => {
                  if (state.secondsmobile == 59) {
                     return {
                        secondsmobile: '00',
                        minutemobile: +state.minutemobile + 1,
                     }
                  }
                  if (state.minutemobile == 59) {
                     return {
                        minutemobile: '00',
                        hoursmobile: +state.hoursmobile + 1,
                     }
                  }
                  return { secondsmobile: +state.secondsmobile + 1 };
               });
               TimerMobile();
            }, 1000);
         }
         else {
            console.log("Вы используете ПК.");
            deskoptime = setTimeout(() => {
               this.setState((state) => {
                  if (state.secondsdeskop == 59) {
                     return {
                        secondsdeskop: '00',
                        minutedeskop: +state.minutedeskop + 1,
                     }
                  }
                  if (state.minutedeskop == 59) {
                     return {
                        minutedeskop: '00',
                        hoursdeskop: +state.hoursdeskop + 1,
                     }
                  }
                  return { secondsdeskop: +state.secondsdeskop + 1 };
               });
               TimerDeskop();
            }, 1000);
         }
      });

   }
   singout = async () => {
      await firebase.auth().signOut().then(() => {
         clearTimeout(deskoptime);
         clearTimeout(mobiletime);
         this._isMounted = false;
         console.log("Sign-out successful.");
      }).catch((error) => {
         // An error happened.
      });
   }

   render() {
      return (

         <section className="logged">
            <div>Hello {this.state.name}</div>
            <NavLink to="/" className="logged__out" onClick={this.singout} >Log out</NavLink>
            <div className="logged__deskop">
               <div className="logged__deskoptext">Deskop</div>
               <img src={timer} alt="" />
               <div className="logged__timedeskop">
                  <span className="logged__hours_deskop">{this.state.hoursdeskop}:</span>
                  <span className="logged__minute_deskop">{this.state.minutedeskop}:</span>
                  <span className="logged__seconds_deskop">{this.state.secondsdeskop}</span>
               </div>
            </div>
            <div className="logged__mobile">
               <div className="logged__mobiletext">Mobile</div>
               <img src={timer} alt="" />
               <div className="logged__timemobile">
                  <span className="logged__hours_mobile">{this.state.hoursmobile}:</span>
                  <span className="logged__minute_mobile">{this.state.minutemobile}:</span>
                  <span className="logged__seconds_mobile">{this.state.secondsmobile}</span>
               </div>
            </div>
         </section>

      );
   }
}

export default Timer;
