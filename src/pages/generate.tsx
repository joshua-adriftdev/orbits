import React, { useState } from 'react';
import { Button, Input, Popover, PopoverContent, PopoverHandler, Textarea, Tooltip, Typography } from '@material-tailwind/react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { da, sq } from 'date-fns/locale';

import Image from 'next/image';
import banner from "../../public/banner.png"

const Generate: React.FC = () => {
    const [formData, setFormData] = useState({
        theme: '',
        words: Array(8).fill(''),
    });

    const [date, setDate] = React.useState<Date>();
    const [query, setQuery] = useState<string>();

    const defaultTooltip = "Copy to clipboard"
    const [tooltip, setTooltip] = useState<string>(defaultTooltip)

    const [outputTime, setOutputTime] = useState<string>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        if (name === 'words') {
            const newWords = [...formData.words];
            newWords[index] = value;
            setFormData({
                ...formData,
                words: newWords,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { theme, words } = formData;

        // @ts-ignore
        let d = new Date(date);
        d.setDate(d.getDate()+1);

        const sqlQuery = `INSERT INTO orbits (date, theme, words) VALUES ('${d?.toISOString().split('T')[0]}', '${theme}', '{"${words.join('", "').toLowerCase()}"}');`;
        setQuery(sqlQuery);
        setOutputTime(getCurrentTime());
    };

    const copy = () => {
        if (query)
            navigator.clipboard.writeText(query);

        setTooltip("Copied.");
        setTimeout(() => {
            setTooltip(defaultTooltip);
        }, 2000)
    }

    return (
        <div className="mx-auto max-w-lg p-4">
            <div className='flex items-center justify-center'>
                <Image src={banner} alt="alt" width={240} height={75} className="mt-4 lg:hidden"/>
                <Image src={banner} alt="alt" width={300} height={0} className="mt-4 hidden lg:block"/>
            </div>
            <form onSubmit={handleSubmit} className='mt-8'>
                <div className='flex flex-col gap-4'>
                <div className="">
                    <Popover placement="bottom-start">
                        <PopoverHandler>
                        <Input
                            label="Select a Date"
                            onChange={() => null}
                            value={date ? format(date, "PPP") : ""}
                            required
                        />
                        </PopoverHandler>
                        <PopoverContent>
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            showOutsideDays
                            className="border-0"
                            classNames={{
                            caption: "flex justify-center py-2 mb-4 relative items-center",
                            caption_label: "text-sm font-medium text-gray-900",
                            nav: "flex items-center",
                            nav_button:
                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                            nav_button_previous: "absolute left-1.5",
                            nav_button_next: "absolute right-1.5",
                            table: "w-full border-collapse",
                            head_row: "flex font-medium text-gray-900",
                            head_cell: "m-0.5 w-9 font-normal text-sm",
                            row: "flex w-full mt-2",
                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal bg-transparent hover:bg-gray-100 transition-colors duration-300 rounded-md",
                            day_range_end: "day-range-end",
                            day_selected:
                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                            day_today: "rounded-md bg-gray-200 hover:bg-gray-200 text-gray-900",
                            day_outside:
                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                            day_disabled: "text-gray-500 opacity-50",
                            day_hidden: "invisible",
                            }}
                            components={{
                            IconLeft: ({ ...props }) => (
                                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                            ),
                            IconRight: ({ ...props }) => (
                                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                            ),
                            }}
                        />
                        </PopoverContent>
                    </Popover>
                    </div>
                    <Input
                        label="Theme"
                        name="theme"
                        value={formData.theme}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, -1)}
                        
                        required
                    />
                </div>
                <Typography className='mt-4 mb-2 text-content text-[16px]'>
                    Enter 8 words in the correct order:
                </Typography>
                <div className='flex flex-col gap-4'>
                    {formData.words.map((word, index) => (
                        <Input
                            key={index}
                            label={`Word ${index + 1}`}
                            name="words"
                            value={word}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                            required
                        />
                    ))}
                </div>
                <Button
                    variant='gradient'
                    type="submit"
                    className="mt-4 w-full"
                >
                    Generate SQL Query
                </Button>
                    
                {query && (
                    <div className='pb-[100px]'>
                        <Typography className='mt-8 mb-2 text-content text-[16px]'>
                            Output (Generated {outputTime}):
                        </Typography>
                        <Tooltip content={tooltip} placement="top-end">
                            <Button variant="text" className='mt-2 w-full rounded-lg bg-disabled hover:bg-disabled/80  p-4 text-content text-[14px] font-normal normal-case cursor-pointer text-left ' onClick={copy}>
                                {query}
                            </Button>
                        </Tooltip>
                    </div>
                )}

            </form>
        </div>
    );
};

export default Generate;

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Convert hours to 12-hour format and determine whether it's AM or PM
    const meridiem = hours >= 12 ? ' pm' : ' am';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Add leading zeros to minutes and seconds if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Concatenate all components into a string
    const currentTimeString = `${hours}:${formattedMinutes}:${formattedSeconds}${meridiem}`;

    return currentTimeString;
}