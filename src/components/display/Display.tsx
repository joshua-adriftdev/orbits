import { useEffect, useState } from "react";
import DisplayElement from "./DisplayElement";
import useMediaQuery from "../../hooks/useMediaQuery";

type DisplayProps = {
  word: string;
  mistakes: number;
};

const Display: React.FC<DisplayProps> = ({ word, mistakes }) => {
  const [words, setWords] = useState<string[]>(Array.from({ length: 8 }, () => ""));

  // The number used should be the n-th word that should be displayed. 
  // E.g '6' indicates that the index 6 word (7th word) should be displayed in that slot
  const xsWordOrder: number[] = [0, 1, 7, 2, 6, 3, 5, 4];
  const lgWordOrder: number[] = [0, 1, 2, 3, 7, 6, 5, 4];

  const breakpoint = useMediaQuery("(min-width: 1024px)") ? "lg" : "xs";
  const wordOrder = breakpoint === "lg" ? lgWordOrder : xsWordOrder;

  const addWord = (newWord: string) => {
    const nextIndex = words.findIndex(w => !w); // Find the index of the next empty slot
    if (nextIndex !== -1) {
      setWords(prevWords => {
        const newWords = [...prevWords];
        newWords[nextIndex] = newWord;
        return newWords;
      });
    }
  };

  useEffect(() => {
    console.log("Current word has changed:", word);
    addWord(word);
  }, [word]);

  useEffect(() => {
    console.log("Updated words array:", words);
  }, [words]); // Log the updated words array

  useEffect(() => {
    setWords(Array.from({ length: 8 }, () => "")); // Clear the array
  }, [mistakes]);

  return (
    <div className="grid grid-rows-4 lg:grid-rows-2 grid-cols-2 lg:grid-cols-4 items-center justify-center gap-x-[40px] gap-y-[20px] lg:gap-[55px] relative">
      {Array.from({ length: 8 }, (_, index) => (
        <DisplayElement key={index} index={index} word={words[wordOrder[index]]} mistakes={mistakes} />
      ))}
    </div>
  );
};

export default Display;
