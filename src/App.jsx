import { useState } from "react";
import EnvironmentSetup from "./components/EnvironmentSetup";
import { EnvConfigStoreProvider } from "./store/EnvConfigContext";
import Simulation from "./components/Simulation";

const App = () => {
  const [isEnvironmentConfigured, setIsEnvironmentConfigured] = useState(false);

  return (
    <EnvConfigStoreProvider>
      <div className="bg-stone-900 h-[100vh] flex flex-col">
        {/* SETTING UP ENVIRONMENT */}
        {!isEnvironmentConfigured ? <EnvironmentSetup onEnvironmentConfigured={setIsEnvironmentConfigured} /> : <Simulation />}
      </div>
    </EnvConfigStoreProvider>
  );
};

export default App;
