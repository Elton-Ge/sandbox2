/**
 * Registration form.
 * The component we have built together as the part of
 * React Advanced Form presentation on Medium.
 */
import React from "react";
import { Form } from "react-advanced-form";
import { Input, Button } from "react-advanced-form-addons";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default class RegistrationForm extends React.Component {
  registerUser = ({ serialized, fields, form }) => {
    return fetch("https://backend.dev", {
      body: JSON.stringify(serialized)
    });
  };

  state = { phone: "" };

  handleOnChange = value => {
    console.log(value);
    this.setState({ phone: value }, () => {
      console.log(this.state.phone);
    });
  };

  handleAgreementCheckbox = () => {
    const currentTime = new Date();
    const eligibleUserDOB = new Date(
      currentTime.getFullYear() - 18,
      currentTime.getMonth(),
      currentTime.getDate()
    );
    return currentTime >= eligibleUserDOB;
  };

  render() {
    return (
      <section className="container">
        <Form
          action={this.registerUser}
          onSubmitStart={this.props.onSubmitStart}
        >
          <Input
            name="firstName"
            label="First name"
            required={({ get }) => {
              return !!get(["lastName", "value"]);
            }}
          />
          <Input
            name="lastName"
            label="Last name"
            required={({ get }) => {
              return !!get(["firstName", "value"]);
            }}
          />

          <Input
            name="emailAddress"
            type="email"
            label="Email Address"
            required
          />

          <PhoneInput
            name="phoneNumber"
            type="text"
            country={"us"}
            enableAreaCodes={true}
            onlyCountries={["us"]}
            areaCodes={{ us: ["332"] }}
            inputProps={{
              name: "phone",
              country: "us",
              required: true,
              autoFocus: true
            }}
            value={this.state.phone}
            onChange={this.handleOnChange}
            // Set your inline styles here
            containerStyle={{
              border: "10px solid black"
            }}
            inputStyle={{
              background: "lightblue"
            }}
            required
          />

          <Input
            name="dateOfBirth"
            type="date"
            label="Date of Birth"
            required
          />

          <Input
            name="eligibleAge"
            type="checkbox"
            label="I agree"
            value="unchecked"
          />
          <Button primary> Submit </Button>
        </Form>
      </section>
    );
  }
}

// <PhoneInput
//  country="US"
//  value={this.phoneNumberValidation.value}
//  onChange={this.phoneNumberValidation.setValue} />
