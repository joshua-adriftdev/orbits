import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

type WordProps = {
    word: string;
    onSelectedWord: (data: string) => boolean;
    mistakes: number;
};
  
const Word: React.FC<WordProps> = ({ word, onSelectedWord, mistakes }) => {
  const [used, setUsed] = useState<boolean>(false);

  useEffect(() => {
    setUsed(false);
  }, [mistakes])

  const handleClick = () => {
      const isCorrect = onSelectedWord(word)
      setUsed(true);
      console.log("Is Correct: " + isCorrect);
  }

  return (
    <Button variant="outlined" disabled={used} className={`text-content text-[24px] font-normal ${used ? 'bg-disabled stroke-disabledStroke text-disabledText' : ''}`} onClick={handleClick}>
      <div>{word}</div>
    </Button>
  );
};

export default Word;
  