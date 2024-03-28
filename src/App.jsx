import { useState } from "react";
import EnvironmentSetup from "./components/EnvironmentSetup";
import { SimulationStoreProvider } from "./store/SimulationContext";
import Simulation from "./components/Simulation";

const App = () => {
  const [isEnvironmentConfigured, setIsEnvironmentConfigured] = useState(false);

  return (
    <SimulationStoreProvider>
      <div className="flex flex-col">
        {/* SETTING UP ENVIRONMENT */}
        {!isEnvironmentConfigured ? <EnvironmentSetup onEnvironmentConfigured={setIsEnvironmentConfigured} /> : <Simulation />}
      </div>
    </SimulationStoreProvider>
  );
};

export default App;
