import React from "react";
import styles from "./HeaderStepper.module.css";

interface HeaderStepperProps {
  steps: string[];
  currentStep: number;
}

const HeaderStepper: React.FC<HeaderStepperProps> = ({ steps, currentStep }) => (
  <div className={styles.stepper}>
    {steps.map((step, idx) => (
      <div
        key={step}
        className={`${styles.step} ${idx === currentStep ? styles.active : idx < currentStep ? styles.done : ""}`}
      >
        <span>{step}</span>
        {idx < steps.length - 1 && <span className={styles.arrow}>→</span>}
      </div>
    ))}
  </div>
);

export default HeaderStepper;