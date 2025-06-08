import React from "react";
import { Skip } from "../App";
import "./SelectionBar.css";

const SelectionBar: React.FC<{ selectedSkip: Skip | null }> = ({ selectedSkip }) => {
    if (!selectedSkip) return null;

    return (
        <div className="selection-bar">
            <div>
                <strong>{selectedSkip.size} Yard Skip</strong> selected - £ {selectedSkip.price_before_vat} + VAT
            </div>
            <button className="proceed-btn" onClick={() => alert("Proceed to next step!")}>
                Continue
            </button>
        </div>
    );
};

export default SelectionBar;