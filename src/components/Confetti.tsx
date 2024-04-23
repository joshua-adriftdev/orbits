import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

export interface ConfettiRef {
  shoot: () => void;
}

const Confetti = forwardRef<ConfettiRef>((props, ref) => {
  const fireworkController = useRef<any>();
  const realisticController = useRef<any>();

  // @ts-ignore
  const onInitHandler = ({ conductor }) => {
    fireworkController.current = conductor;
  };

  // @ts-ignore
  const onRealisticInitHandler = ({ conductor }) => {
    realisticController.current = conductor;
  };

  const shootFirework = () => {
    // @ts-ignore
    fireworkController.current?.shoot();
  };

  const shootRealistic = () => {
    // @ts-ignore
    realisticController.current?.shoot();
  };

  useImperativeHandle(ref, () => ({
    shoot: () => {
      let x = 0;
      let isFirework = Math.random() <= 0.5;

      if (isFirework) {
        // Show firework confetti
        let timer = setInterval(() => {
          if (x === 5) clearInterval(timer);
          shootFirework();
          x++;
        }, 500);
      } else {
        // Show realistic confetti
        setTimeout(() => {
            shootRealistic();
        }, 500)

        /*let timer = setInterval(() => {
          if (x === 0) 
            clearInterval(timer);
          
          shootRealistic();
          x++;
        }, 2000);*/
      }
    },
  }));

  return (
    <>
      <Fireworks onInit={onInitHandler} />
      <Realistic onInit={onRealisticInitHandler} />
    </>
  );
});

export default Confetti;
