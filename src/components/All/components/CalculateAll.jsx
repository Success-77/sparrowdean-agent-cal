import React from "react";
import AllCalculator from "./AllCalculator";
import {
  mtnPrices,
  mtnExpressPrices,
  atPrices,
  vodaPrices,
} from "../..//shared/utilities/Prices";

const CalculateAll = () => {
  return (
    <div>
      <AllCalculator
        mtnPrices={mtnPrices}
        mtnExpressPrices={mtnExpressPrices}
        atPrices={atPrices}
        vodaPrices={vodaPrices}
      />
    </div>
  );
};

export default CalculateAll;
