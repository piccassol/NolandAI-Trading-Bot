import { useState } from "react";

const SettingsPage = () => {
  const [strategy, setStrategy] = useState("");

  const handleSave = () => {
    // Save strategy settings
  };

  return (
    <div>
      <h1>Settings</h1>
      <label>
        Trading Strategy:
        <input
          type="text"
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SettingsPage;
