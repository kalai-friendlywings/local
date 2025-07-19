import React from "react";

function CustomAddressDropdown({ addresses, selected, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label fw-semibold">Choose a saved address</label>
      <select
        className="form-select form-select-lg"
        value={selected?.id || ""}
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          const selectedAddress = addresses.find(addr => addr.id === selectedId);
          onChange(selectedAddress);
        }}
      >
        <option value="">Select an address</option>
        {addresses.map((addr) => (
          <option key={addr.id} value={addr.id}>
            {addr.type} - {addr.houseNo}, {addr.city}, {addr.pinCode}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomAddressDropdown;
