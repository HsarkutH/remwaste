import React from "react";
import { Skip } from "../App";
import "./SkipCard.css";

interface Props {
    skip: Skip;
    selected: boolean;
    onSelect: () => void;
}

const SkipCard: React.FC<Props> = ({ skip, selected, onSelect }) => (
    <div
        className={`skip-card${selected ? " selected" : ""}`}
        onClick={onSelect}
        tabIndex={0}
        role="button"
        aria-pressed={selected}
    >
        <h2>{skip.size} Yard Skip</h2>
        <p>
            <strong>Hire Period:</strong> {skip.hire_period_days} days
        </p>
        <p>
            <strong>Price:</strong> £{skip.price_before_vat} + VAT
        </p>
        <div className="skip-icons">
            <span
                className={`icon ${skip.allowed_on_road ? "yes" : "no"}`}
                title="Allowed on road"
            >
                {skip.allowed_on_road ? "🛣️" : "🚫"}
            </span>
            <span
                className={`icon ${skip.allows_heavy_waste ? "yes" : "no"}`}
                title="Allows heavy waste"
            >
                {skip.allows_heavy_waste ? "✔️" : "❌"}
            </span>
        </div>
    </div>
);

export default SkipCard;