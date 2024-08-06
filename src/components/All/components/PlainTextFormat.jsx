import { serverDetails } from "../../shared/utilities/payment";

const plainTextFormat = (
  packages,
  allPrices,
  afaPlainTextFormat,
  afaTotalAmount
) => {
  const output = [];
  output.push("*PACKS*\t\t*PRICES*");

  const copiedPrices = allPrices.slice();

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
  output.push("\n-------------------------");
  output.push(afaPlainTextFormat.join("\n"));
  output.push("-------------------------");
  const total = copiedPrices.reduce((acc, curr) => acc + (curr || 0), 0);
  output.push(`\n*Overall Total: GH₵${(total + afaTotalAmount).toFixed(2)}*`);
  const today = new Date().toLocaleDateString();
  output.push(`\n*Orders placed on ${today}*`);
  output.push(`\n*${serverDetails.number}*`);
  output.push(`*[${serverDetails.momoName}]*\n`);
  return output;
};

export default plainTextFormat;
