import React from "react";
import HeaderStepper from "./components/HeaderStepper/HeaderStepper";
import ProductSelector from "./components/ProductSelector/ProductSelector";

const steps = [
  "Postcode",
  "Waste Type",
  "Select Skip",
  "Permit Check",
  "Choose Date",
  "Payment"
];

const App: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fa", padding: "32px 0" }}>
      <HeaderStepper steps={steps} currentStep={2} />
      <ProductSelector />
    </div>
  );
};

export default App;