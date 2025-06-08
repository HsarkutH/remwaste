import React from "react";
import SkipCard from "./SkipCard";
import { Skip } from "../App";
import "./SkipOptions.css";

interface Props {
    skips: Skip[];
    selectedSkip: Skip | null;
    onSelect: (skip: Skip) => void;
}

const SkipOptions: React.FC<Props> = ({ skips, selectedSkip, onSelect }) => (
    <div className="skip-grid">
        {skips.map((skip) => (
            <SkipCard
                key={skip.id}
                skip={skip}
                selected={selectedSkip?.id === skip.id}
                onSelect={() => onSelect(skip)}
            />
        ))}
    </div>
);

export default SkipOptions;