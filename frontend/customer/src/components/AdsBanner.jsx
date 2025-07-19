import React, { useState } from "react";
import "../Pages/AdsBanner.css";

function AdsBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="ads-banner d-flex justify-content-between align-items-center px-3 py-2">
      <div className="text-white fw-semibold">
        🛍️  Big Sale! Up to 50% off at LocalShop – Shop now!
      </div>
      <button className="btn-close btn-close-white" onClick={() => setVisible(false)}></button>
    </div>
  );
}

export default AdsBanner;
