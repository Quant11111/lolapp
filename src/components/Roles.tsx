"use client";

import React, { useState } from "react";

type Role = "top" | "jungle" | "mid" | "adc" | "supp";

interface RoleSelectorProps {
  onRoleSelect: (role: Role) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showRoles, setShowRoles] = useState(false);

  const roles: Role[] = ["top", "jungle", "mid", "adc", "supp"];

  const handleMainRoleClick = () => {
    setShowRoles(true);
    setSelectedRole(null);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setShowRoles(false);
    onRoleSelect(role);
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      {!showRoles && !selectedRole && (
        <button type="button" onClick={handleMainRoleClick} style={buttonStyle}>
          MAIN ROLE
        </button>
      )}
      {showRoles && (
        <>
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleSelect(role)}
              style={buttonStyle}
            >
              {role.toUpperCase()}
            </button>
          ))}
        </>
      )}
      {selectedRole && !showRoles && (
        <button type="button" onClick={handleMainRoleClick} style={buttonStyle}>
          {selectedRole.toUpperCase()}
        </button>
      )}
    </div>
  );
};

export default RoleSelector;
