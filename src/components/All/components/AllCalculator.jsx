import React, { useState, useEffect } from "react";
import AllInput from "./AllInput";
import AFAInput from "./AFAInput";
import TabularFormat from "./TabularFormat";
import PaymentDetails from "../../shared/components/PaymentDetails";
import { serverDetails } from "../../shared/utilities/payment";
import { afaPrice } from "../../shared/utilities/Prices";
import NetworkSelect from "./SelectNetworks";
import {
  gigFormatter,
  amounts,
  AFAPlainTextFormat,
  plainTextFormat,
} from "../../shared/utilities/formatters";
import "./AllCalculator.css";
import copyIcon from "../../../assets/images/copy.png";

const AllCalculator = ({
  mtnPrices,
  mtnExpressPrices,
  atPrices,
  vodaPrices,
}) => {
  const [mtnInputValue, setMTNInputValue] = useState("");
  const [mtnExpressInputValue, setMTNExpressInputValue] = useState("");
  const [atInputValue, setATInputValue] = useState("");
  const [vodaInputValue, setVodaInputValue] = useState("");
  const [mtnInputError, setMTNInputError] = useState("");
  const [mtnExpressInputError, setMTNExpressInputError] = useState("");
  const [atInputError, setATInputError] = useState("");
  const [vodaInputError, setVodaInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [inputError, setInputError] = useState("");
  const [afaInputValue, setAfaInputValue] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState(["MTN Instant"]); // Default selected network

  const handleNetworkChange = (selected) => {
    setSelectedNetwork(selected);
  };

  useEffect(() => {
    const parseInputValues = (input) =>
      input.split(/[\s+]+/).map((value) => value.trim());

    const mtnValues = selectedNetwork.includes("MTN Instant")
      ? parseInputValues(mtnInputValue)
      : [];
    const mtnExpressValues = selectedNetwork.includes("MTN Express")
      ? parseInputValues(mtnExpressInputValue)
      : [];
    const atValues = selectedNetwork.includes("AirtelTigo")
      ? parseInputValues(atInputValue)
      : [];
    const vodaValues = selectedNetwork.includes("Vodafone")
      ? parseInputValues(vodaInputValue)
      : [];
    const afaTotalAmount = selectedNetwork.includes("AFA")
      ? afaInputValue * afaPrice
      : 0;

    const combinedValues = [
      ...mtnValues,
      ...mtnExpressValues,
      ...atValues,
      ...vodaValues,
    ];
    const packs = gigFormatter(combinedValues);

    const mtnPriceList = selectedNetwork.includes("MTN Instant")
      ? amounts(mtnPrices, mtnValues)
      : [];
    const mtnExpressPriceList = selectedNetwork.includes("MTN Express")
      ? amounts(mtnExpressPrices, mtnExpressValues)
      : [];
    const atPriceList = selectedNetwork.includes("AirtelTigo")
      ? amounts(atPrices, atValues)
      : [];
    const vodaPriceList = selectedNetwork.includes("Vodafone")
      ? amounts(vodaPrices, vodaValues)
      : [];

    const allPrices = [
      ...mtnPriceList,
      ...mtnExpressPriceList,
      ...atPriceList,
      ...vodaPriceList,
    ];

    const formattedTable = (
      <TabularFormat
        packages={packs}
        allPrices={allPrices}
        afaTotalAmount={afaTotalAmount}
        afaInputValue={afaInputValue}
        selectedNetwork={selectedNetwork}
      />
    );
    setTableContent(formattedTable);
  }, [
    mtnInputValue,
    mtnExpressInputValue,
    atInputValue,
    vodaInputValue,
    mtnPrices,
    mtnExpressPrices,
    atPrices,
    vodaPrices,
    afaInputValue,
    selectedNetwork,
  ]);

  const handleInputChange = (value, setValue, setError) => {
    const validInputRegex = /^[0-9+\s]*$/;
    if (validInputRegex.test(value)) {
      setValue(value);
      setError("");
    } else {
      setError("Invalid input!");
    }
  };

  const handleAfaInputChange = (event) => {
    const value = event.target.value;
    const validInputRegex = /^[0-9]*$/;
    if (validInputRegex.test(value)) {
      setAfaInputValue(value);
      setInputError("");
    } else {
      setInputError("Invalid input!");
    }
  };

  const handleInputBlur = (setError) => {
    setError("");
  };

  const handleCopyToClipboard = () => {
    const parseInputValues = (input) =>
      input.split(/[\s+]+/).map((value) => value.trim());

    const mtnValues = selectedNetwork.includes("MTN Instant")
      ? parseInputValues(mtnInputValue)
      : [];
    const mtnExpressValues = selectedNetwork.includes("MTN Express")
      ? parseInputValues(mtnExpressInputValue)
      : [];
    const atValues = selectedNetwork.includes("AirtelTigo")
      ? parseInputValues(atInputValue)
      : [];
    const vodaValues = selectedNetwork.includes("Vodafone")
      ? parseInputValues(vodaInputValue)
      : [];
    const afaTotalAmount = selectedNetwork.includes("AFA")
      ? afaInputValue * afaPrice
      : 0;

    const combinedValues = [
      ...mtnValues,
      ...mtnExpressValues,
      ...atValues,
      ...vodaValues,
    ];
    const packs = gigFormatter(combinedValues);

    const mtnPriceList = selectedNetwork.includes("MTN Instant")
      ? amounts(mtnPrices, mtnValues)
      : [];
    const mtnExpressPriceList = selectedNetwork.includes("MTN Express")
      ? amounts(mtnExpressPrices, mtnExpressValues)
      : [];
    const atPriceList = selectedNetwork.includes("AirtelTigo")
      ? amounts(atPrices, atValues)
      : [];
    const vodaPriceList = selectedNetwork.includes("Vodafone")
      ? amounts(vodaPrices, vodaValues)
      : [];

    const allPrices = [
      ...mtnPriceList,
      ...mtnExpressPriceList,
      ...atPriceList,
      ...vodaPriceList,
    ];

    const plainTextLines = plainTextFormat(
      packs,
      allPrices,
      serverDetails,
      selectedNetwork,
      afaInputValue,
      afaTotalAmount
    );
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
  };

  return (
    <div className="main-container">
      <div className="packs-prices">
        <div className="form">
          <div className="form-container">
            <NetworkSelect
              selectedNetwork={selectedNetwork}
              handleNetworkChange={handleNetworkChange}
            />
            <div className="input-sales">
              {!(
                selectedNetwork.length === 1 && selectedNetwork.includes("AFA")
              ) && (
                <p className="small-text guide">
                  Enter packages separating each with a space or the plus sign [
                  + ]
                </p>
              )}
              {selectedNetwork.includes("MTN Instant") && (
                <AllInput
                  placeholder="10 + 7 9 + 6 4"
                  id="mtnInput"
                  value={mtnInputValue}
                  onChange={(value) =>
                    handleInputChange(value, setMTNInputValue, setMTNInputError)
                  }
                  onBlur={() => handleInputBlur(setMTNInputError)}
                  errorMessage={mtnInputError}
                  label="Enter MTN Packages"
                />
              )}
              {selectedNetwork.includes("MTN Express") && (
                <AllInput
                  placeholder="10 + 7 9 + 6 4"
                  id="mtnExpressInput"
                  value={mtnExpressInputValue}
                  onChange={(value) =>
                    handleInputChange(
                      value,
                      setMTNExpressInputValue,
                      setMTNExpressInputError
                    )
                  }
                  onBlur={() => handleInputBlur(setMTNExpressInputError)}
                  errorMessage={mtnExpressInputError}
                  label="Enter MTN Express Packages"
                />
              )}
              {selectedNetwork.includes("AirtelTigo") && (
                <AllInput
                  placeholder="10 + 7 9 + 6 4"
                  id="atInput"
                  value={atInputValue}
                  onChange={(value) =>
                    handleInputChange(value, setATInputValue, setATInputError)
                  }
                  onBlur={() => handleInputBlur(setATInputError)}
                  errorMessage={atInputError}
                  label="Enter AirtelTigo Packages"
                />
              )}
              {selectedNetwork.includes("Vodafone") && (
                <AllInput
                  placeholder="10 + 7 9 + 6 4"
                  id="vodaInput"
                  value={vodaInputValue}
                  onChange={(value) =>
                    handleInputChange(
                      value,
                      setVodaInputValue,
                      setVodaInputError
                    )
                  }
                  onBlur={() => handleInputBlur(setVodaInputError)}
                  errorMessage={vodaInputError}
                  label="Enter Vodafone Packages"
                />
              )}
              {selectedNetwork.includes("AFA") && (
                <AFAInput
                  inputValue={afaInputValue}
                  handleInputChange={handleAfaInputChange}
                  handleInputBlur={() => handleInputBlur(setInputError)}
                  inputError={inputError}
                />
              )}
            </div>
          </div>

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
        </div>
        <PaymentDetails serverDetails={serverDetails} />
      </div>
    </div>
  );
};

export default AllCalculator;
