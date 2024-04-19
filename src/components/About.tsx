import Image from "next/image";
import adrift from "../../public/adrift.png"

const About: React.FC = () => {
    return (
      <div className="bg-disabled overflow-hidden h-max flex flex-col justify-center items-center text-center">
        <div className="pt-8 font-bold text-content text-[24px]">About The Game</div>
        <div className="px-8 pt-2 max-w-screen-md text-center text-content font-normal text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="pt-8 flex flex-col text-center text-contentSecondary text-[16px] pb-16">
            <div>Designed and built by <a className="underline" href="https://www.x.com" target="_blank" rel="noopener noreferrer">andrewdegi</a></div>

            <div className="pt-6 flex flex-col justify-center items-center">
                <a href="https://adrift.dev" target="_blank" rel="noopener noreferrer">
                    <Image src={adrift} alt="alt" width={34} height={34} />
                </a>
                <div className="pt-1">Developed by <a className="underline" href="https://adrift.dev" target="_blank" rel="noopener noreferrer">Adrift Development</a></div>
            </div>
        </div>
      </div>
    );
  };
  
  export default About;