import React, {
  useState,
  Fragment
} from "react"
import ReactDOM from "react-dom"
import Preview from 'react-data-preview'
import {
  FormProvider
} from 'react-advanced-form'
import rules from './validation-rules'
import messages from './validation-messages'
import RegistrationForm from './RegistrationForm'
import './index.css'
import './styles.css'
import "bootstrap/dist/css/bootstrap.css"

class App extends React.Component {
  state = {
      serialized: null
  }

  handleSubmitStart = ({
      serialized
  }) => {
      this.setState({
          serialized
      })
  }

  handleUserData = () => {
      const currentTime = new Date();
      const eligibleUserDOB = new Date(currentTime.getFullYear() - 18, currentTime.getMonth(), currentTime.getDate());
      return currentTime>= eligibleUserDOB;
  };

  render() {
      return (
          <FormProvider rules = {
              rules
          }
          messages = {
              messages
          } >
              <div className = "container flex" >
                  <RegistrationForm onSubmitStart = {
                      this.handleSubmitStart
                  }/>
                  <Preview data = {
                      this.state.serialized
                  }/>
              </div>
          </FormProvider>
      )
  }

}
const rootElement = document.getElementById("root"); ReactDOM.render( <App/> , rootElement);