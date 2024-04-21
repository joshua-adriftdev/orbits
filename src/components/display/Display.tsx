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

  const isMobile = useMediaQuery("(max-width: 959px)")

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
    addWord(word);
  }, [word]);


  useEffect(() => {
    setWords(Array.from({ length: 8 }, () => "")); // Clear the array

    const mainContainer = document.querySelector('.main-container');

    if (mainContainer) {
      const lineDiv = mainContainer.querySelectorAll('.connecting-line');

      lineDiv.forEach((div: Element) => {
        const lineFill = div.querySelector('.connecting-line-fill') as HTMLElement;
        if (lineFill) {
          lineFill.style.removeProperty('left');
          lineFill.style.removeProperty('height');
          lineFill.style.removeProperty('top');
          lineFill.style.removeProperty('right');
        }
        if (div instanceof HTMLElement) {
          div.style.removeProperty('top');
        }
      });
    }

    // Remove inline styles from each .connecting-line-fill element

  }, [mistakes]);

  useEffect(() => {
    // For animating lines 

    const index = words.findIndex(w => w === word);

    const mainContainer = document.querySelector('.main-container');

    if (mainContainer) {
      const lineDiv = mainContainer.querySelectorAll('.connecting-line')

      // For less than 960px screen

      if (isMobile) {
        if (index === 1) {
          const lineDivFill = lineDiv[0].querySelector('.connecting-line-fill') as HTMLElement;

          if (lineDivFill) {
            lineDivFill.style.left = `0%`
          }
        }
        if (index < 5 && index > 1) {

          const lineDivFill = lineDiv[2].querySelector('.connecting-line-fill') as HTMLElement

          const lineDivFillStyle = window.getComputedStyle(lineDivFill).top;

          const lineDivFillStyleTop = parseFloat(lineDivFillStyle);
          if (lineDiv[2] instanceof HTMLElement) {
            const parentHeight = lineDiv[2].offsetHeight;
            const topPercentage = (lineDivFillStyleTop / parentHeight) * 100;
            lineDivFill.style.top = `${topPercentage + 35}%`;
          }


        }

        if (index === 5) {
          const lineDivFill = lineDiv[1].querySelector('.connecting-line-fill') as HTMLElement;

          if (lineDivFill) {

            lineDivFill.style.right = `0%`
          }
        }
        if (index > 5 && index < 8) {
          const lineDivFill = lineDiv[3].querySelector('.connecting-line-fill') as HTMLElement;

          const lineDivFillStyle = window.getComputedStyle(lineDivFill).bottom;

          const lineDivFillStyleBottom = parseFloat(lineDivFillStyle);
          if (lineDiv[3] instanceof HTMLElement) {

            const parentHeight = lineDiv[3].offsetHeight;
            const bottomPercentage = (lineDivFillStyleBottom / parentHeight) * 100;

            lineDivFill.style.bottom = `${bottomPercentage + 50}%`
          }


        }

        if (index === 7) {
          if (lineDiv[4] instanceof HTMLElement) {
            lineDiv[4].style.bottom = `70%`
          }
        }
      } else {
        // For more than 960px screen
        if (index < 4 && index > 0) {
          const lineDivFill = lineDiv[0].querySelector('.connecting-line-fill') as HTMLElement;

          const lineDivFillStyle = window.getComputedStyle(lineDivFill).left;

          const lineDivFillStyleLeft = parseFloat(lineDivFillStyle);
          if (lineDiv[1] instanceof HTMLElement) {

          const parentWidth = lineDiv[1].offsetWidth;
          const leftPercentage = (lineDivFillStyleLeft / parentWidth) * 100;
          lineDivFill.style.left = `${leftPercentage + 28}%`
          }

        }

        if (index === 4) {
          const lineDivFill = lineDiv[2].querySelector('.connecting-line-fill') as HTMLElement;
          if (lineDivFill) {

          lineDivFill.style.height = '100px'
          }
        }

        if (index > 4) {
          const lineDivFill = lineDiv[1].querySelector('.connecting-line-fill')  as HTMLElement;
          const lineDivFillStyle = window.getComputedStyle(lineDivFill).left;
          const lineDivFillStyleLeft = parseFloat(lineDivFillStyle);

          if (lineDiv[1] instanceof HTMLElement) {

          const parentWidth = lineDiv[1].offsetWidth;
          const leftPercentage = (lineDivFillStyleLeft / parentWidth) * 100;
          lineDivFill.style.left = `${leftPercentage - 28}%`
          }
        }

        if (index === 7) {
          if (lineDiv[3] instanceof HTMLElement) {

          lineDiv[3].style.top = `${10}%`
          lineDiv[3].style.transitionDelay = `0.4s`
          }
        }
      }
    }

  }, [words]);

  return (
    <>
      <div className="main-container overflow-hidden grid grid-rows-4 lg:grid-rows-2 grid-cols-2 lg:grid-cols-4 items-center justify-center gap-x-[40px] gap-y-[20px] lg:gap-[55px] relative">

        {Array.from({ length: 8 }, (_, index) => (
          <DisplayElement key={index} index={index} word={words[wordOrder[index]]} mistakes={mistakes} />
        ))}
        <div className="connecting-line connecting-line-1">
          <div className="connecting-line-fill"></div>
        </div>
        <div className="connecting-line connecting-line-2">
          <div className="connecting-line-fill"></div>
        </div>
        <div className="connecting-line connecting-line-3">
          <div className="connecting-line-fill"></div>
        </div>
        <div className="connecting-line connecting-line-4">
          <div className="connecting-line-fill"></div>

        </div>
        <div className="connecting-line connecting-line-5"></div>
      </div>

    </>
  );
};

export default Display;
