"use client";
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, {useState } from "react";
import VersionUpdates from "./commands/version-updates.tsx";
import AppMaintenance from "./commands/app-maintenance.tsx";

const componentMap: Record<string, React.ComponentType> = {
  version_updates : VersionUpdates,
  app_maintenance : AppMaintenance
};

const commandLabels: Record<string, string> = {
    app_maintenance : "App Maintenance",
  version_updates : "Version Updates"
};

const MobileCommands = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  // const [availableCommands, setAvailableCommands] = useState<string[]>([]);


  const [availableCommands, setAvailableCommands] = useState<string[]>([
       "app_maintenance",
    "version_updates"
  ]);


  // useEffect(() => {
  //   const commands = JSON.parse(localStorage.getItem("userCommands") || "[]");
  //    console.log('my commands',commands)
  //   setAvailableCommands(commands);
  // }, []);

  const handleSelectChange = (value: string) => {
    setSelectedComponent(value);
  };

  const SelectedComponent = selectedComponent
    ? componentMap[selectedComponent]
    : null;

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="mx-auto">
        <label
          htmlFor="command-select"
          className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-100"
        >
          Select a Command
        </label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full" id="command-select">
            <SelectValue placeholder="Select a command" />
          </SelectTrigger>
          <SelectContent>
            {availableCommands.map((command) => (
              <SelectItem key={command} value={command}>
                {commandLabels[command] || command}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Card className="mt-8">
          <CardContent className="p-6 min-h-[300px]">
            {SelectedComponent && <SelectedComponent />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MobileCommands;