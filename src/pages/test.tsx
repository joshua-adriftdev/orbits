import React, { useRef } from "react";
import Confetti, { ConfettiRef } from "../components/Confetti"; // Adjust the import path as needed

const ParentComponent: React.FC = () => {
  const confettiRef = useRef<ConfettiRef>(null);

  const handleShootConfetti = () => {
    if (confettiRef.current) {
      confettiRef.current.shoot();
    }
  };

  return (
    <div>
      <button onClick={handleShootConfetti}>Shoot Confetti</button>
      <Confetti ref={confettiRef} />
    </div>
  );
};

export default ParentComponent;
