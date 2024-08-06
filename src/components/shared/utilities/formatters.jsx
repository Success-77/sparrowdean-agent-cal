import { afaPrice } from "./Prices";

export function gigFormatter(packages) {
  return packages.map((pack) => pack + "GB");
}

export function amounts(dictionary, packages) {
  return packages.map((pack) => dictionary[parseInt(pack)]);
}

export function replaceUndefinedWithQuestionMark(prices) {
  return prices.map((price) => (price === undefined ? "?" : price));
}

export function plainTextFormat(
  packages,
  prices,
  serverDetails,
  selectedNetwork,
  afaInputValue,
  afaTotalAmount
) {
  const output = [];
  if (selectedNetwork.includes("AFA") && selectedNetwork.length === 1) {
    output.push(AFAPlainTextFormat(afaInputValue));
  } else {
    output.push("*PACKS*\t\t*PRICES*");

    const copiedPrices = prices.slice();

    for (let i = 0; i < packages.length; i++) {
      const pack = packages[i];
      const price = copiedPrices[i];
      const packLen = pack.length;
      const priceStr = price !== undefined ? price.toString() : "?";
      const priceLen = priceStr.length;
      const middleLen =
        30 - (packLen + 1 + (priceLen + 1) + (i.toString().length + 2));
      let line = `${i + 1}. ${pack}`;
      for (let j = 0; j < middleLen; j++) {
        line += ".";
      }
      line += ` ${priceStr}`;
      output.push(line);
    }
    const total = copiedPrices.reduce((acc, curr) => acc + (curr || 0), 0);

    if (selectedNetwork.includes("AFA")) {
      output.push("\n-------------------------");
      output.push(AFAPlainTextFormat(afaInputValue).join("\n"));
      output.push("-------------------------");
    }
    output.push(
      `\n*Total: GH₵${
        afaTotalAmount ? (total + afaTotalAmount).toFixed(2) : total.toFixed(2)
      }*`
    );
  }
  const today = new Date().toLocaleDateString();
  output.push(`\n*Orders placed on ${today}*`);
  output.push(`\n*${serverDetails.number}*`);
  output.push(`*[${serverDetails.momoName}]*\n`);
  return output;
}

export const AFAPlainTextFormat = (totalRegistrations) => {
  const output = [];
  output.push("*AFA Registrations*");
  output.push(`\n*Total Registration(s): ${totalRegistrations}*`);
  output.push(`*Amount Per Reg.: GH₵${afaPrice}*`);
  output.push(`\n*Total Amount: GH₵${totalRegistrations * afaPrice}*`);
  return output;
};
