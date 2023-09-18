import React, { PropsWithChildren } from "react";
import SettingsModal from "./SettingsModal.tsx";
import SettingsButton from "./SettingsButton.tsx";

interface SettingsRoot {
  Modal: typeof SettingsModal,
  Button: typeof SettingsButton,
}

const Settings = Object.assign<React.FC<PropsWithChildren>, SettingsRoot>(({ children }) => {
  return <>{children}</>
}, {
  Button: SettingsButton,
  Modal: SettingsModal
});

export default Settings;
