import React from "react";

import { replaceUndefinedWithQuestionMark } from "../../shared/utilities/formatters";
import AFARegistrationFormat from "../../shared/components/AFARegistrationFormat";
import "./TabularFormat.css";

const TabularFormat = ({
  packages,
  allPrices,
  afaTotalAmount,
  afaInputValue,
  selectedNetwork,
}) => {
  const replacedPrices = replaceUndefinedWithQuestionMark(allPrices.slice());
  const numericPrices = replacedPrices.map((price) =>
    typeof price === "number" ? price : 0
  );

  return (
    <div>
      {!(selectedNetwork.includes("AFA") && selectedNetwork.length === 1) && (
        <h4 className="sales-header">
          <span>Packs</span>
          <span>Prices</span>
        </h4>
      )}
      {packages.map((pack, index) => {
        const packLen = pack.length;
        const priceLen = String(numericPrices[index]).length;
        const indexLen = String(index + 1).length;
        const totalLen = 20;
        const dotsLen = totalLen - (packLen + priceLen + indexLen + 5);

        let dots = "";
        for (let i = 0; i < dotsLen; i++) {
          dots += ".";
        }

        return (
          <p key={index}>
            {index + 1}. {pack} {dots}{" "}
            {numericPrices[index] === 0 ? "?" : numericPrices[index]}
          </p>
        );
      })}
      {selectedNetwork.includes("AFA") && (
        <AFARegistrationFormat totalRegistration={afaInputValue} />
      )}
      <p className="totalAmt">
        Total: GH&#8373;
        {(
          numericPrices.reduce((acc, cur) => acc + cur, 0) + afaTotalAmount
        ).toFixed(2)}
      </p>
      <p>Orders placed on {new Date().toLocaleDateString("en-GB")}</p>
    </div>
  );
};

export default TabularFormat;
