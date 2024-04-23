import React, { use, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import Confetti, { ConfettiRef } from "../Confetti";

type VictoryPopupProps = {
  isOpen: boolean;
  callback: (open: boolean) => void;
  mistakes: number;
  firstWord: string;
};

const VictoryPopup: React.FC<VictoryPopupProps> = ({ isOpen, callback: setIsOpen, mistakes, firstWord }) => {
    const confettiRef = useRef<ConfettiRef>(null);

    const handleShootConfetti = () => {
        if (confettiRef.current) {
          confettiRef.current.shoot();
        }
      };

    const [visible, setVisible] = useState<boolean>(false);
    const [closing, setClosing] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            setIsOpen(true);
            setTimeout(() => {
                setVisible(true);
                setClosing(false);
                handleShootConfetti();
            }, 500);
        } else {
            setClosing(true);
            setTimeout(() => {
                setVisible(false);
                setIsOpen(false);
            }, 500);
        }
    }, [isOpen]);


    // Date Display
    const [displayDate, setDisplayDate] = useState<string>("");
    useEffect(() => {
        const date:Date = new Date();
        setDisplayDate(date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear());
    }, [])

    const [streak, setStreak] = useState<number>(0);
    useEffect(() => {
        if (hasCookie("streak"))
            setStreak(Number(getCookie("streak")));
    }, [isOpen]);

    // Count Down
    const [timeUntilNextDay, setTimeUntilNextDay] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);

        const timeDifference = midnight.getTime() - now.getTime();

        const hours = Math.floor(timeDifference / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');

        setTimeUntilNextDay(`${hours}:${minutes}:${seconds}`);
        }, 1000); 

        return () => clearInterval(intervalId); // Cleanup function 
    }, []);

    const twitterTemplate = encodeURIComponent(`@orbitsgame Orbit ${displayDate} completed with ${mistakes} mistake${(mistakes !== 1) ? 's' : ''}!`) + "%0A" + encodeURIComponent("Starting word: " + firstWord) + "%0A%0A&hashtags=orbitsgame";
    


    return (
        <section
        className={`fixed inset-0 z-30 transition-opacity duration-500 ${
            visible ? (closing ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto") : "opacity-0 pointer-events-none"
        }`}
        >
        <div className="grid h-screen place-items-center">
            <div className="fixed inset-0 bg-black opacity-30"></div>
            <div className="fixed z-50">
                <Confetti ref={confettiRef}/>
            </div>
            <Card className={`mx-4 max-w-2xl relative z-40`}>
            <CardBody>
                <div className="flex w-full justify-end">
                <IconButton variant="text" onClick={() => setIsOpen(false)}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] ml-[1.5rem] mt-[-1.5rem] lg:ml-0 lg:mt-0 fill-content"
                    >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </IconButton>
                </div>
                <div className="text-center px-6">
                <div className="mb-6 mt-[-2rem] px-2 lg:px-8 text-content text-[24px] lg:text-[36px] font-medium">
                    Congratulations!
                    <div className="flex flex-col lg:flex-row gap-1 text-content font-normal text-[16px] lg:text-[20px]">
                        You've completed <div className="font-medium">Orbit {displayDate}!</div>
                    </div>
                    <div className="flex flex-row gap-0.5 items-center justify-center text-content font-normal text-[16px] lg:text-[20px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] fill-[#FF7A00]"><path d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z"/></svg>
                        <div>Streak: {streak}</div>
                    </div>
                </div>
                <div>

                <div className="flex items-center justify-center">
                    <svg width="221" height="71" viewBox="0 0 221 71" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-90 lg:scale-100">
                        <g clipPath="url(#clip0_25_1964)">
                            <path d="M41.8889 0H1.44444C0.6467 0 0 0.6467 0 1.44444V21.6667C0 22.4644 0.6467 23.1111 1.44444 23.1111H41.8889C42.6866 23.1111 43.3333 22.4644 43.3333 21.6667V1.44444C43.3333 0.6467 42.6866 0 41.8889 0Z" fill="#8AD103"/>
                            <path d="M101.111 0H60.6667C59.8689 0 59.2222 0.6467 59.2222 1.44444V21.6667C59.2222 22.4644 59.8689 23.1111 60.6667 23.1111H101.111C101.909 23.1111 102.556 22.4644 102.556 21.6667V1.44444C102.556 0.6467 101.909 0 101.111 0Z" fill="#8AD103"/>
                            <path d="M160.333 0H119.889C119.091 0 118.444 0.6467 118.444 1.44444V21.6667C118.444 22.4644 119.091 23.1111 119.889 23.1111H160.333C161.131 23.1111 161.778 22.4644 161.778 21.6667V1.44444C161.778 0.6467 161.131 0 160.333 0Z" fill="#8AD103"/>
                            <path d="M219.556 0H179.111C178.313 0 177.667 0.6467 177.667 1.44444V21.6667C177.667 22.4644 178.313 23.1111 179.111 23.1111H219.556C220.353 23.1111 221 22.4644 221 21.6667V1.44444C221 0.6467 220.353 0 219.556 0Z" fill="#8AD103"/>
                            <path d="M41.8889 47.6665H1.44444C0.6467 47.6665 0 48.3132 0 49.1109V69.3332C0 70.1309 0.6467 70.7776 1.44444 70.7776H41.8889C42.6866 70.7776 43.3333 70.1309 43.3333 69.3332V49.1109C43.3333 48.3132 42.6866 47.6665 41.8889 47.6665Z" fill="#8AD103"/>
                            <path d="M101.111 47.6665H60.6667C59.8689 47.6665 59.2222 48.3132 59.2222 49.1109V69.3332C59.2222 70.1309 59.8689 70.7776 60.6667 70.7776H101.111C101.909 70.7776 102.556 70.1309 102.556 69.3332V49.1109C102.556 48.3132 101.909 47.6665 101.111 47.6665Z" fill="#8AD103"/>
                            <path d="M160.333 47.6665H119.889C119.091 47.6665 118.444 48.3132 118.444 49.1109V69.3332C118.444 70.1309 119.091 70.7776 119.889 70.7776H160.333C161.131 70.7776 161.778 70.1309 161.778 69.3332V49.1109C161.778 48.3132 161.131 47.6665 160.333 47.6665Z" fill="#8AD103"/>
                            <path d="M219.556 47.6665H179.111C178.313 47.6665 177.667 48.3132 177.667 49.1109V69.3332C177.667 70.1309 178.313 70.7776 179.111 70.7776H219.556C220.353 70.7776 221 70.1309 221 69.3332V49.1109C221 48.3132 220.353 47.6665 219.556 47.6665Z" fill="#8AD103"/>
                            <path d="M59.2222 10.3999H43.3333V12.711H59.2222V10.3999Z" fill="#8AD103"/>
                            <path d="M182 10.3999H102.556V12.711H182V10.3999Z" fill="#8AD103"/>
                            <path d="M198.178 23.1113V51.4224H200.489V23.1113H198.178Z" fill="#8AD103"/>
                            <path d="M21 20.9999V49.311H23.3111V20.9999H21Z" fill="#8AD103"/>
                            <path d="M183.156 58.0669H37.8445V60.378H183.156V58.0669Z" fill="#8AD103"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_25_1964">
                            <rect width="221" height="70.7778" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                    
                <div className="text-content font-normal lg:text-[20px] mt-4">
                    Mistakes: {mistakes}
                </div>

                <div className="text-content mt-4 flex flex-col">
                    <div className="font-normal text-[20px] lg:text-[20px]">NEXT ORBIT</div>
                    <div className="font-medium text-[24px] lg:text-[36px]">{timeUntilNextDay}</div>
                </div>
                    
                <div className="text-content font-normal lg:text-[20px] mt-4">
                    Share your victory!
                </div>

                <div className="mt-2 flex items-center justify-center">
                    <a
                    href={`https://twitter.com/intent/tweet?text=${twitterTemplate}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <Button 
                        variant="gradient" 
                        className="flex flex-row gap-4 items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-white w-[16px] h-[16px] lg:w-[32px] lg:h-[32px]"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                            <div className="normal-case font-normal lg:text-[18px]">Share on X (Twitter)</div>
                        </Button>
                    </a>
                </div>

                </div>
                <div className="flex flex-col gap-3 text-contentSecondary font-normal text-[20px]">
                    
                </div>
                
                </div>
            </CardBody>
            </Card>
        </div>
        </section>
    );
};

export default VictoryPopup;
