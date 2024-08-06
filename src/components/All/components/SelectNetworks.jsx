import React from "react";

const NetworkSelect = ({ selectedNetwork = [], handleNetworkChange }) => {
  const networks = [
    "MTN Instant",
    "MTN Express",
    "AirtelTigo",
    "Vodafone",
    "AFA",
  ];

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedNetwork.includes(value)) {
      handleNetworkChange(
        selectedNetwork.filter((network) => network !== value)
      );
    } else {
      handleNetworkChange([...selectedNetwork, value]);
    }
  };

  return (
    <div className="input-sales mb-3">
      <p className="small-text guide">Select network[s] to calculate</p>
      <div className="input-group">
        {networks.map((network) => (
          <div key={network} className="form-check mb-3 ms-3">
            <input
              className="form-check-input"
              type="checkbox"
              id={`network-${network}`}
              value={network}
              checked={selectedNetwork.includes(network)}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`network-${network}`}>
              {network}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkSelect;
