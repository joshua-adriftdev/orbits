import { useEffect, useState } from "react";

type DisplayElementProps = {
  index: number;
  word: string | undefined; // Accept word as a prop
  mistakes: number;
};

const DisplayElement: React.FC<DisplayElementProps> = ({ index, word, mistakes }) => {
  const [highlight, setHighlighted] = useState<boolean>(false);

  useEffect(() => {
    if (word !== "" && word !== undefined) {
      setHighlighted(true);
    }
    
    console.log("Word is: " + word)

  }, [word]);

  useEffect(() => {
    setHighlighted(false);
  }, [mistakes])

  return (
    <div
      className={`${highlight ? 'bg-primary' : 'bg-disabled'} w-[126.45px] h-[62px] rounded-lg flex items-center align-middle justify-center`}
      style={{ position: "relative" }}
    >
      {word && ( // Render the word if it exists
        <div className="text-white font-medium text-[24px]">
          {word}
        </div>
      )}
    </div>
  );
};

export default DisplayElement;
