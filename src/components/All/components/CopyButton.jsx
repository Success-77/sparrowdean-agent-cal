import React from "react";

import "./CopyButton.css";
import copyIcon from "../../../assets/images/copy.png";

const CopyButton = ({ onCopy, isCopied }) => {
  return (
    <div>
      {!isCopied && (
        <button className="copy" onClick={onCopy}>
          <img src={copyIcon} alt="copy icon" />
          <span>Copy</span>
        </button>
      )}
      {isCopied && <p className="copied">Copied!</p>}
    </div>
  );
};

export default CopyButton;
