import { Tooltip, Typography } from "@material-tailwind/react";
import { useState } from "react";

type WordBankProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const WordBank: React.FC<WordBankProps> = ({ isOpen, setIsOpen }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleHowToPlay = () => {
    setIsOpen(true);
    setVisible(false);

    // Timeout for mobile-weirdness
    setTimeout(() => {
      setVisible(false);
    }, 10)

  }

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onClick={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Tooltip
        interactive={true}
        content={
          <div className="w-80">
            <Typography color="white" className="font-medium">
              Word Bank
            </Typography>
            <Typography
              variant="small"
              color="white"
              className="font-normal opacity-80"
            >
              Lorem Ipsum
            </Typography>
            
            <Typography
              variant="small"
              color="white"
              className="mt-5 text-white font-medium"
            >
              Still Stuck?
              <Typography variant="small" color="white" className="underline font-normal opacity-80 cursor-pointer" onClick={handleHowToPlay}>
                How To Play
              </Typography>
            </Typography>

          </div>
        }
        open={visible}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5 cursor-pointer text-content"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </Tooltip>
    </div>
    
  );
}

export default WordBank;