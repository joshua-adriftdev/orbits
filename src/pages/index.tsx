import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@material-tailwind/react";
import outlined from "@material-tailwind/react/theme/components/timeline/timelineIconColors/outlined";
import { useEffect, useState } from "react";
import Display from "@/components/display/Display";
import DisplayTest from "@/components/AnimatedSVG";
import AnimatedSVG from "@/components/AnimatedSVG";
import WordBank from "@/components/wordbank/WordBank";
import React from "react";

import banner from "../../public/banner.png"
import About from "@/components/About";
import Head from "next/head";

import { sql } from "@vercel/postgres";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [order, setOrder] = useState<string[]>(["Killer", "Queen", "Bee", "Hive", "Mind", "Set", "Back", "Pain"]);
  const [theme, setTheme] = useState<string>("Continuation");

  const [mistakes, setMistakes] = useState<number>(0); // Used to keep track of mistakes & reset WordBank states

  const [word, setWord] = useState<string>(""); // Ued to update Display.tsx with the newly selected word

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [correct, setCorrect] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { rows } = await sql`SELECT * FROM orbits`;
        console.log(rows);
        //const fetchedOrder = rows[0].words;
        //const fetchedTheme = rows[0].theme; // Assuming the theme is the same for all rows
        //setOrder(fetchedOrder);
        //setTheme(fetchedTheme);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  /* To be replaced with MySQL lookup.
  const getOrder = async () => {
    const { rows } = await sql`SELECT * FROM orbits`;
    console.log("DB: " + rows);
    const fetchedOrder = rows.map(row => row.words);
    const fetchedTheme = rows[0].theme; // Assuming the theme is the same for all rows
    setOrder(fetchedOrder);
    setTheme(fetchedTheme);
  }

  useEffect(() => {
    getOrder();
  }, []);*/

  const [displayWords, setDisplayWords] = useState<string[]>([]);
  useEffect(() => {
    const shuffledWords = shuffleWords(Object.assign([], order)); // clone the array before shuffling
    setDisplayWords(shuffledWords);
  }, []);

  const handleSelectWord = (word: string): boolean => {
    console.log("Selected Word: " + word);

    const wordIndex = order.indexOf(word);
    console.log("wordIndex: " + wordIndex);

    if (currentIndex == -1 || wordIndex == currentIndex+1 || (currentIndex == order.length-1 && wordIndex == 0)) {
      setCurrentIndex(wordIndex);
      setCorrect(correct+1);
      checkWin(correct+1);
      setWord(order.at(wordIndex) as string); 
      return true;
    }
    
    // Fail
    setTimeout(() => {
      const shuffledWords = shuffleWords(Object.assign([], order)); // clone the array before shuffling
      setDisplayWords(shuffledWords);
      setMistakes(mistakes+1);
    }, 500);

    setCurrentIndex(-1);
    setCorrect(0);

    return false;
  }

  const checkWin = (correct: number): boolean => {
    console.log("Checking for win... " + correct + " | " + order.length);
    if (correct == order.length) {
      console.log("Win!!");
      return true;
    }

    return false;
  }

  const date:Date = new Date();
  const displayDate:string = date.toLocaleDateString('default', { month: 'long'}) + " " + date.getDate() + ", " + date.getFullYear()


  return (
    <div>
      <Head>
        <title>Orbits</title>
      </Head>
      <main className={`flex flex-col items-center justify-between ${inter.className}`}>
        <Image src={banner} alt="alt" width={240} height={75} className="mt-4 lg:hidden"/>
        <Image src={banner} alt="alt" width={300} height={0} className="mt-4 hidden lg:block"/>

        {/* Date / Theme */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="font-light text-[16px] lg:text-[24px]">{displayDate}</div>
          <div className="font-medium text-[24px] lg:text-[30px]">Theme: <span className="font-normal">{theme}</span></div>
        </div>

        <div className="mt-8">
          <Display word={word} mistakes={mistakes}/>
        </div>
        <div className="flex flex-col items-center mt-8">
          <div className="text-content text-[24px] font-normal">Word Bank</div>
          <div className="text-content text-[15px] font-light">Mistakes: {mistakes}</div>
        </div>
        <div className="mt-4">
          <WordBank words={displayWords} onSelectedWord={handleSelectWord} mistakes={mistakes}/>
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

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};