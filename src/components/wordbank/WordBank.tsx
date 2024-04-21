import { Button } from "@material-tailwind/react";
import Word from "./Word";

type WordBankProps = {
  words: string[];
  onSelectedWord: (data: string) => boolean;
  mistakes: number;
  forceDisable: boolean;
}

const WordBank: React.FC<WordBankProps> = ({words, onSelectedWord, mistakes, forceDisable}) => {

  return (
    <div className="grid grid-rows-4 lg:grid-rows-2 grid-cols-2 lg:grid-cols-4 items-center justify-center gap-x-[40px] gap-y-[20px] lg:gap-[55px] relative">
      {words.map((word, index) => (
        <Word word={word} key={index} onSelectedWord={onSelectedWord} mistakes={mistakes} forceDisable={forceDisable}/>
      ))}
    </div>
  );
};

export default WordBank;