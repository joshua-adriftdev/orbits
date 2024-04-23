import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

type IntroductionProps = {
  isOpen: boolean;
  callback: (open: boolean) => void;
};

const HowToPlay: React.FC<IntroductionProps> = ({ isOpen, callback: setIsOpen }) => {
  const [open, setOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setCookie("user", true);
    setOpen(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 500)
  };

  return (
    <section className={`transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <div className="fixed inset-0 bg-black opacity-30 z-20"></div>
          <Card className="max-w-xl relative z-20">
            <CardBody>
              <div className="flex w-full justify-end">
                <IconButton variant="text" onClick={handleClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-[24px] h-[24px] fill-content">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </IconButton>
              </div>
              <div className="text-center px-6">
                <Typography className="mb-6 mt-[-2rem] text-content" variant="h4">
                  How To Play
                </Typography>
                <div className="flex flex-col gap-3 text-contentSecondary font-normal text-[20px]">
                  <Typography className="text-[16px]">
                    Welcome to Orbits, the circular word puzzle that challenges your associations!
                  </Typography>
                  <Typography className="text-[16px]">
                    Each word connects to another through a theme, forming a complete loop. The challenge is to find the sequence.
                  </Typography>
                  <Typography className="text-[16px]">
                    You can start with any word, but choose wisely— each word leads to the next, and the final word will connect back to your first choice.
                  </Typography>
                  <Typography className="text-[16px]">
                    If you make an incorrect guess, don't worry— you'll get a chance to try again.
                  </Typography>
                </div>
                <Button
                  size="lg"
                  className="mt-8 px-12 bg-primary"
                  onClick={handleClose}
                >
                  {"Let's Play!"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowToPlay;
