import React, { useState, useEffect, useMemo } from "react";

function gigFormatter(packages) {
  return packages.map((pack) => pack + "GB");
}

function amounts(dictionary, packages) {
  return packages.map((pack) => dictionary[parseInt(pack)]);
}

const MTN = () => {
  const initialAgentPrices = useMemo(
    () => ({
      1: 5.5,
      2: 9.7,
      3: 13.5,
      4: 18,
      5: 21.5,
      6: 25.5,
      7: 29,
      8: 33,
      9: 36,
      10: 40,
      11: 4.5 + 38,
      12: 45,
      13: 12.5 + 38,
      14: 17 + 38,
      15: 55.5,
      16: 4.5 + 54,
      17: 8.7 + 54,
      18: 12.5 + 54,
      19: 17 + 54,
      20: 72,
      21: 4.5 + 69,
      22: 8.7 + 69,
      23: 12.5 + 69,
      24: 17 + 69,
      25: 86,
      26: 4.5 + 85,
      27: 8.7 + 85,
      28: 12.5 + 85,
      29: 17 + 85,
      30: 105,
      31: 4.5 + 105,
      32: 8.7 + 105,
      33: 12.5 + 105,
      34: 17 + 105,
      35: 125,
      36: 4.5 + 117,
      37: 8.7 + 117,
      38: 12.5 + 117,
      39: 17 + 117,
      40: 145,
      41: 4.5 + 135,
      42: 8.7 + 135,
      43: 12.5 + 135,
      44: 17 + 135,
      45: 165,
      46: 4.5 + 146,
      47: 8.7 + 146,
      48: 12.5 + 146,
      49: 17 + 146,
      50: 175,
      100: 355,
    }),
    []
  );

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [tableContent, setTableContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let values = inputValue.split("+").map((value) => value.trim());
    let packs = gigFormatter(values);
    let prices = amounts(initialAgentPrices, values);
    const formattedTable = tabularFormat(packs, prices);
    setTableContent(formattedTable);
  }, [inputValue, initialAgentPrices]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    const validInputRegex = /^[0-9+\s]*$/;

    if (validInputRegex.test(inputValue)) {
      setInputValue(inputValue);
      setInputError("");
    } else {
      setInputError("Input must contain only numbers, spaces, and +");
    }
  };

  const tabularFormat = (packages, prices) => {
    return (
      <div>
        <h4 className="sales-header">
          <span>Packs</span>
          <span>Prices</span>
        </h4>
        {packages.map((pack, index) => {
          const packLen = pack.length;
          const priceLen = String(prices[index]).length;
          const indexLen = String(index + 1).length;
          const totalLen = 20;
          const dotsLen = totalLen - (packLen + priceLen + indexLen + 5); // 5 is the number of additional characters including dots, spaces, and indexes

          let dots = "";
          for (let i = 0; i < dotsLen; i++) {
            dots += ".";
          }

          return (
            <p key={index}>
              {index + 1}. {pack} {dots} {prices[index]}
            </p>
          );
        })}
        <p className="totalAmt">
          Total: GH&#8373;{prices.reduce((acc, cur) => acc + cur, 0).toFixed(2)}
        </p>
        <p>Orders placed on {new Date().toLocaleDateString("en-GB")}</p>
      </div>
    );
  };

  const handleCopyToClipboard = () => {
    if (inputValue) {
      let values = inputValue.split("+").map((value) => value.trim());
      let packs = gigFormatter(values);
      let prices = amounts(initialAgentPrices, values);
      const plainTextLines = plainTextFormat(packs, prices);

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

  function plainTextFormat(packages, prices) {
    let output = [];
    output.push("\n*PACKS*\t\t*PRICES*");
    for (let i = 0; i < packages.length; i++) {
      let pack = packages[i];
      let price = prices[i];
      let packLen = pack.length;
      let priceLen = price.toString().length;
      let middleLen =
        30 - (packLen + 1 + (priceLen + 1) + (i.toString().length + 2));
      let line = `${i + 1}. ${pack}`;
      for (let j = 0; j < middleLen; j++) {
        line += ".";
      }
      line += ` ${price}`;
      output.push(line);
    }
    let total = prices.reduce((acc, curr) => acc + curr, 0);
    output.push(`\n*Total: GH₵${total}*`);
    let today = new Date().toLocaleDateString();
    output.push(`\n*Orders placed on ${today}*`);
    return output;
  }

  return (
    <div className="main-container">
      <h4 className="sub-header">MTN</h4>
      <div className="form">
        <div className="input-sales">
          <label htmlFor="day_sales">
            Enter your sales packages separated with +
          </label>
          <input
            type="text"
            name="sales"
            id="day_sales"
            placeholder="10 + 7 + 9 + 6 + 4"
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputError && <p>{inputError}</p>}
        </div>
      </div>
      <div className="packs-container form">
        {tableContent}
        {!isCopied && (
          <button className="copy" onClick={handleCopyToClipboard}>
            Copy
          </button>
        )}
        {isCopied && <p>copied!</p>}
      </div>
    </div>
  );
};

export default MTN;
