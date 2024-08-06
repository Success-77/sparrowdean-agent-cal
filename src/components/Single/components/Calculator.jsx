import React, { useState, useEffect, useMemo } from "react";

import copyIcon from "../../../assets/images/copy.png";
import TabularFormat from "../../shared/components/TabularFormat";
import AFARegistrationFormat from "../../shared/components/AFARegistrationFormat";
import PaymentDetails from "../../shared/components/PaymentDetails";
import SalesInput from "./SalesInput";
import AFAInput from "./AFAInput";
import NetworkSelect from "./NetworkSelect";
import "./Calculator.css";
import { mtnPrices, atPrices, vodaPrices } from "../../shared/utilities/Prices";
import {
  gigFormatter,
  amounts,
  plainTextFormat,
  AFAPlainTextFormat,
} from "../../shared/utilities/formatters";
import { serverDetails } from "../../shared/utilities/payment";

const Calculator = ({ network }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(network);
  const [afaMessage, setAfaMessage] = useState("");

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
  };

  const prices = useMemo(() => {
    switch (selectedNetwork) {
      case "MTN":
        return mtnPrices;
      case "AirtelTigo":
        return atPrices;
      case "Vodafone":
        return vodaPrices;
      default:
        return {};
    }
  }, [selectedNetwork]);

  useEffect(() => {
    if (selectedNetwork === "AFA") {
      setAfaMessage(<AFARegistrationFormat totalRegistration={inputValue} />);
      setTableContent("");
    } else {
      const values = inputValue.split("+").map((value) => value.trim());
      const packs = gigFormatter(values);
      const pricesArray = amounts(prices, values);
      setTableContent(<TabularFormat packages={packs} prices={pricesArray} />);
      setAfaMessage("");
    }
  }, [inputValue, prices, selectedNetwork]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const validInputRegex = /^[0-9+\s]*$/;

    if (validInputRegex.test(inputValue)) {
      setInputValue(inputValue);
      setInputError("");
    } else {
      setInputError("Invalid input!");
    }
  };

  const handleAfaInputChange = (event) => {
    const inputValue = event.target.value;
    const validInputRegex = /^[0-9]*$/;

    if (validInputRegex.test(inputValue)) {
      setInputValue(inputValue);
      setInputError("");
    } else {
      setInputError("Invalid input!");
    }
  };

  const handleInputBlur = () => {
    if (inputError) {
      setInputError("");
    }
  };

  const handleCopyToClipboard = () => {
    if (inputValue) {
      const values = inputValue.split("+").map((value) => value.trim());
      const packs = gigFormatter(values);
      const pricesArray = amounts(prices, values);
      const plainTextLines = plainTextFormat(packs, pricesArray, serverDetails);
      const plainText = plainTextLines.join("\n");

      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  const handleAFACopyToClipboard = () => {
    if (inputValue) {
      const plainTextLines = AFAPlainTextFormat(inputValue);
      const plainText = plainTextLines.join("\n");
      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  return (
    <div className="main-container">
      <div className="form">
        <div className="form-container">
          <NetworkSelect
            selectedNetwork={selectedNetwork}
            handleNetworkChange={handleNetworkChange}
          />
          {selectedNetwork === "AFA" ? (
            <AFAInput
              inputValue={inputValue}
              handleInputChange={handleAfaInputChange}
              handleInputBlur={handleInputBlur}
              inputError={inputError}
            />
          ) : (
            <SalesInput
              inputValue={inputValue}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              inputError={inputError}
              network={selectedNetwork}
            />
          )}
        </div>
        {selectedNetwork === "AFA" ? (
          <div className="packs-container">
            {afaMessage}
            {!isCopied && (
              <button className="copy" onClick={handleAFACopyToClipboard}>
                <img src={copyIcon} alt="copy icon" />
                <span>Copy</span>
              </button>
            )}
            {isCopied && <p className="copied">Copied!</p>}
          </div>
        ) : (
          <div className="packs-container">
            {tableContent}
            {!isCopied && (
              <button className="copy" onClick={handleCopyToClipboard}>
                <img src={copyIcon} alt="copy icon" />
                <span>Copy</span>
              </button>
            )}
            {isCopied && <p className="copied">Copied!</p>}
          </div>
        )}
      </div>
      <PaymentDetails serverDetails={serverDetails} />
    </div>
  );
};

export default Calculator;
