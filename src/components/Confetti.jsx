import { useRef } from "react";

import Fireworks from "react-canvas-confetti/dist/presets/fireworks"

export default function Confetti() {
    const controller = useRef();

      const onInitHandler = ({ conductor }) => {
        controller.current = conductor;
      };
    
      const onShoot = () => {
        //controller.current.shoot();
        let x = 0;

        let timer = setInterval(() => {
          if (x == 5)
            clearInterval(timer);

          controller.current.shoot();
          x++;
        }, 500)

      };
    
      const onRun = () => {
        controller.current.run({ speed: 3 });
      };
    
      const onPause = () => {
        controller.current.pause();
      };
    
      const onStop = () => {
        controller.current.stop();
      };

      return (
        <>
          <Fireworks onInit={onInitHandler} />
          <button onClick={onShoot}>Shoot</button>
          <button onClick={onRun}>Run</button>
          <button onClick={onPause}>Pause</button>
          <button onClick={onStop}>Stop</button>
        </>
      )
}