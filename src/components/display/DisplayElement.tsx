import { useEffect, useRef, useState } from "react";

type DisplayElementProps = {
  index: number;
  word: string | undefined; // Accept word as a prop
  mistakes: number;
};

const DisplayElement: React.FC<DisplayElementProps> = ({ index, word, mistakes }) => {
  const [highlight, setHighlighted] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);

  const divRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    if (word !== "" && word !== undefined) {
      setHighlighted(true);
      setIsFading(true);
      const timeout = setTimeout(() => {
        setIsFading(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [word]);

  useEffect(() => {
    setHighlighted(false);
  }, [mistakes]);

  const calculateFontSize = () => {
    if (divRef.current) {
      const divWidth = divRef.current.offsetWidth;
      const wordLength = (word as string).length;
      const maxFontSize = 32;
      const minFontSize = 0;
      const scaleFactor = (divWidth + 40) / wordLength;

      const newSize = Math.max(minFontSize, Math.min(maxFontSize, scaleFactor));
      setFontSize(newSize);
    }
  };

  useEffect(() => {
    calculateFontSize();
    window.addEventListener("resize", calculateFontSize);
    return () => window.removeEventListener("resize", calculateFontSize);
  }, [word]);

  return (
    <div
      className={`word-container z-10 ${
        highlight ? "bg-primary" : "bg-disabled"
      } delay-300 transition-colors ease-linear duration-300 w-[126.45px] h-[62px] rounded-lg flex items-center align-middle justify-center`}
      style={{ position: "relative" }}
    >
      {word && ( // Render the word if it exists
        <div
          ref={divRef}
          className={`font-medium w-[126px] text-center align-middle ${
            highlight ? "text-white" : isFading ? "text-content" : index > 0 ? "text-content" : "text-white"
          }`}
          style={{ fontSize: `${fontSize}px`, transition: "color 0.3s ease", transitionDelay: "0.3s" }}
        >
          {word}
        </div>
      )}
    </div>
  );
};

export default DisplayElement;
