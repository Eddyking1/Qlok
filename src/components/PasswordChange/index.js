import React, { Component } from 'react';
import {FormStyle} from '../../styles/GlobalStyle';


import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
 passwordOne: '',
 passwordTwo: '',
 error: null,
};

class PasswordChangeForm extends Component {
 constructor(props) {
   super(props);

   this.state = { ...INITIAL_STATE };
 }

 onSubmit = event => {
   const { passwordOne } = this.state;

   this.props.firebase
     .doPasswordUpdate(passwordOne)
     .then(() => {
       this.setState({ ...INITIAL_STATE });
     })
     .catch(error => {
       this.setState({ error });
     });

   event.preventDefault();
 };

 onChange = event => {
   this.setState({ [event.target.name]: event.target.value });
 };

 render() {
   const { passwordOne, passwordTwo, error } = this.state;

   const isInvalid =
     passwordOne !== passwordTwo || passwordOne === '';

   return (
     <form onSubmit={this.onSubmit}>
     <h1> Ändra lösenord!</h1>
       <input
         name="passwordOne"
         value={passwordOne}
         onChange={this.onChange}
         type="password"
         placeholder="Nytt Lösenord"
       />
       <input
         name="passwordTwo"
         value={passwordTwo}
         onChange={this.onChange}
         type="password"
         placeholder="Bekräfta nytt lösenord"
       />
       <button disabled={isInvalid} type="submit">
         Återställ lösenord
       </button>

       {error && <p>{error.message}</p>}
     </form>
   );
 }
}

export default withFirebase(PasswordChangeForm);
