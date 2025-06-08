import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
import SkipOptions from "./components/SkipOptions";
import SelectionBar from "./components/SelectionBar";
import "./App.css";

export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road:boolean;
  allows_heavy_waste: boolean;
}

const POSTCODE = "NR32";

function App() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((res) => res.json())
      .then((data) => setSkips(data));
  }, []);

  return (
    <div className="app-bg">
      <Header postcode={POSTCODE} onChangePostcode={() => alert("Change postcode!")} />
      <main>
        <SkipOptions
          skips={skips}
          selectedSkip={selectedSkip}
          onSelect={setSelectedSkip}
        />
      </main>
      <SelectionBar selectedSkip={selectedSkip} />
    </div>
  );
}

export default App;