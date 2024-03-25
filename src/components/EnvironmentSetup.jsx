import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Notification from "./Notification";
import { useEnvConfigStore } from "../store/EnvConfigContext";

const EnvironmentSetup = ({ onEnvironmentConfigured }) => {
  const [isGridShown, setIsGridShown] = useState(false);
  const [dynamitesNotificationDisplayed, setDynamitesNotificationDisplay] =
    useState(true);
  const [startNotificationDisplayed, setStartNotificationDisplay] = useState(false);
  const [terminalNotificationDisplayed, setTerminalNotificationDisplay] = useState(false);
  const { updateCurrentConfig, currentConfig } = useEnvConfigStore();

  // RUNS ONCE
  useEffect(() => {
    // SETTING CURRENT CONFIG
    updateCurrentConfig("dynamite");
  }, []);

  // AT EACH CONFIGURATION STEP
  useEffect(() => {
    // GRID DISPLAY
    const gridTimeout = setTimeout(() => {
      setIsGridShown(true);
    }, 3000);

    // ALL NOTIFICATIONS
    const notificationTimeout = setTimeout(() => {
      setDynamitesNotificationDisplay(false);
      setStartNotificationDisplay(false);
      setTerminalNotificationDisplay(false);
    }, 4000);

    return () => {
      clearTimeout(gridTimeout);
      clearTimeout(notificationTimeout);
    };
  }, [updateCurrentConfig]);

  const nextConfigStep = (configType) => {
    if (configType === "start") {
      updateCurrentConfig("start");
      setIsGridShown(false);
      setStartNotificationDisplay(true);
    } else if (configType === "terminal") {
      updateCurrentConfig("terminal");
      setIsGridShown(false);
      setTerminalNotificationDisplay(true);
    } else {
      updateCurrentConfig("none");
    }
  };

  return (
    <div className="flex flex-col relative h-[100vh]">
      <div className="text-slate-300 mx-auto my-3 text-lg">
        Setting up the environment
      </div>

      {/* NOTIFICATIONS */}
      {dynamitesNotificationDisplayed ? (
        <Notification text={"Place dynamites 🧨"} />
      ) : null}
      {startNotificationDisplayed ? (
        <Notification text={"Select agent start position."} />
      ) : null}
      {terminalNotificationDisplayed ? (
        <Notification text={"Choose agent terminal position (position which agent has to reach)."} />
      ) : null}

      {/* GRID */}
      {isGridShown ? (
        <>
          {/* <div className="env-setup-grid"> */}
          <Grid />
          {/* </div> */}

          <button
            className="mx-auto mt-4 text-stone-300 border-2 border-stone-400 rounded-sm px-4 p-1 text-lg hover:bg-stone-400 hover:text-stone-900 duration-300"
            onClick={() => {
              if (currentConfig === "dynamite") {
                nextConfigStep("start");
              } else if (currentConfig === "start") {
                nextConfigStep("terminal")
              } else {
                nextConfigStep("none")
                onEnvironmentConfigured(true);
              }
            }}
          >
            Submit
          </button>
        </>
      ) : null}
    </div>
  );
};

export default EnvironmentSetup;
