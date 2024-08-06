import React from "react";
import "./AFARegistrationFormat.css";
import { afaPrice } from "../utilities/Prices";

const AFARegistrationFormat = ({ totalRegistration }) => {
  return (
    <div className="afa-format">
      <h2>AFA Registrations</h2>
      <table>
        <tbody>
          <tr>
            <th scope="row">Total Registrations:</th>
            <td>{totalRegistration}</td>
          </tr>
          <tr>
            <th scope="row">Amount Per Reg.:</th>
            <td>GH&#8373;{afaPrice}</td>
          </tr>
          <tr>
            <th scope="row">Total Amount:</th>
            <td>GH&#8373;{totalRegistration * afaPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AFARegistrationFormat;
