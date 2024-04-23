import { Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";

type WordProps = {
  word: string;
  onSelectedWord: (data: string) => boolean;
  mistakes: number;
  forceDisable: boolean;
};

const Word: React.FC<WordProps> = ({ word, onSelectedWord, mistakes, forceDisable }) => {
  const [used, setUsed] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    setUsed(forceDisable);
  }, [forceDisable]);

  const handleClick = () => {
    const isCorrect = onSelectedWord(word);
    setUsed(isCorrect);

    if (!isCorrect && buttonRef.current) {
      buttonRef.current.classList.add("incorrect");
      setTimeout(() => {
        buttonRef.current?.classList.remove("incorrect");
      }, 600); // Adjust this value based on the animation duration
    }
  };

  const calculateFontSize = () => {
    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      const wordLength = word.length; 
      const maxFontSize = 32; 
      const minFontSize = 0; 
      const scaleFactor = buttonWidth / wordLength; 

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
    <Button
      ref={buttonRef}
      variant="outlined"
      disabled={used}
      className={`p-5 w-[126.44px] text-content font-normal border-[2px] ${
        used ? "bg-disabled stroke-disabledStroke text-disabledText" : ""
      }`}
      style={{ fontSize: `${fontSize}px` }} 
      onClick={handleClick}
    >
      <div className="">{word}</div>
    </Button>
  );
};

export default Word;
