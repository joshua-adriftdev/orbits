import Image from "next/image";
import { Inter } from "next/font/google";
import { use, useEffect, useState } from "react";
import Display from "@/components/display/Display";
import WordBank from "@/components/wordbank/WordBank";
import React from "react";

import banner from "../../public/banner.png"
import About from "@/components/About";
import Head from "next/head";

import WordBankTooltip from "@/components/tooltip/WordBankTooltip";
import DisplayTooltip from "@/components/tooltip/DisplayTooltip";
import Introduction from "@/components/Introduction";
import { hasCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

interface Orbit {
  date: string;
  theme: string;
  words: string[];
}

export default function Home() {
  const [order, setOrder] = useState<string[]>([]);
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [theme, setTheme] = useState<string>();

  const [mistakes, setMistakes] = useState<number>(0); // Used to keep track of mistakes & reset WordBank states
  const [forceDisable, setForceDisable] = useState<boolean>(false);

  const [word, setWord] = useState<string>(""); // Ued to update Display.tsx with the newly selected word

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [correct, setCorrect] = useState<number>(0);

  const [data, setData] = useState<Orbit | null>(null);
  const [loading, setLoading] = useState(true);

  const [showIntroduction, setShowIntroduction] = useState<boolean>(!hasCookie("user"))

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Make a GET request to the API route with the current date parameter
        const response = await fetch(`/api/orbits/`);
        const fetchedData: Orbit = await response.json();

        setData(fetchedData);
        
        setOrder(fetchedData.words);
        setTheme(fetchedData.theme);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    const shuffledWords = shuffleWords(Object.assign([], order)); // clone the array before shuffling
    setDisplayWords(shuffledWords);
  }, [data?.words]);

  const handleSelectWord = (word: string): boolean => {

    const wordIndex = order.indexOf(word);

    if (currentIndex == -1 || wordIndex == currentIndex+1 || (currentIndex == order.length-1 && wordIndex == 0)) {
      setCurrentIndex(wordIndex);
      setCorrect(correct+1);
      checkWin(correct+1);
      setWord(order.at(wordIndex) as string);
      return true;
    }

    // New Fail
    setMistakes(mistakes+1);

    /* Fail
    // Disable all buttons
    setForceDisable(true);

    setTimeout(() => {
      const shuffledWords = shuffleWords(Object.assign([], order)); // clone the array before shuffling
      setDisplayWords(shuffledWords);
      setMistakes(mistakes+1);
    }, 500);

    setTimeout(() => {
      setForceDisable(false);
    }, 1000)

    setCurrentIndex(-1);
    setCorrect(0);*/

    

    return false;
  }

  const checkWin = (correct: number): boolean => {
    if (correct == order.length) {
      console.log("Win!!");
      return true;
    }

    return false;
  }

  const date:Date = new Date();
  const displayDate:string = date.toLocaleDateString('default', { month: 'long'}) + " " + date.getDate() + ", " + date.getFullYear()


  const handleChangeIntroductionState = (state: boolean) => {
    console.log("Setting to: " + state);
    setShowIntroduction(state);
  }

  return (
    <div>
      <Head>
        <title>Orbits</title>
      </Head>
      <main className={`flex flex-col items-center justify-between ${inter.className}`}>
        <div className={showIntroduction ? "fixed z-30" : "hidden"}>
          <Introduction isOpen={showIntroduction} setIsOpen={handleChangeIntroductionState}/>
        </div>
        <Image src={banner} alt="alt" width={240} height={75} className="mt-4 lg:hidden"/>
        <Image src={banner} alt="alt" width={300} height={0} className="mt-4 hidden lg:block"/>

        {/* Date / Theme */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="font-light text-[16px] lg:text-[24px]">{displayDate}</div>
          <div className="font-medium text-[24px] lg:text-[30px]">Theme: <span className="font-normal">{theme}</span></div>
          <div className="text-content text-[18px] font-light">Mistakes: {mistakes}</div>
        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <div className="grid grid-cols-3 w-[290px] lg:w-[670px]">
            <div className="flex justify-end items-end col-start-3"><DisplayTooltip isOpen={showIntroduction} setIsOpen={handleChangeIntroductionState}/></div>
          </div>
        </div>

        <div className="mt-4">
          <Display word={word} mistakes={0}/>
        </div>
        
        <div className="w-full flex justify-center items-center mt-8">
          <div className="grid grid-cols-3 w-[290px] lg:w-[670px]">
            <div className="justify-self-center col-start-2">
              <div className="flex flex-col items-center">
                <div className="text-content text-[18.5px] lg:text-[24px] font-medium lg:font-normal">Word Bank</div>
                
              </div>
            </div>
            <div className="flex justify-end items-end "><WordBankTooltip/></div>
          </div>
        </div>


        <div className="mt-4">
          <WordBank words={displayWords} onSelectedWord={handleSelectWord} mistakes={0} forceDisable={forceDisable}/>
        </div>
        <div className="mt-16 min-w-full">
          <About/>
        </div>
      </main>
    </div>
    
  );
}

export function shuffleWords(array: string[]): string[] {
  let currentIndex = array.length,  randomIndex;
 
  // still shuffable elements
  while (currentIndex != 0) {

    // pick remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};