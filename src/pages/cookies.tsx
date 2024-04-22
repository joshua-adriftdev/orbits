import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import banner from "../../public/banner.png"
import CookieBanner from '@/components/cookies/CookieBanner';
import { Button } from '@material-tailwind/react';

export default function CookiePolicy() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='hidden lg:block'>
            <CookieBanner/>
        </div>
        <a href='/'>
            <Image src={banner} alt="alt" width={240} height={75} className="mt-4 lg:hidden"/>
            <Image src={banner} alt="alt" width={300} height={0} className="mt-4 hidden lg:block"/>
        </a>
        <div className="max-w-4xl lg:h-[120vh] text-content p-8">
            <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>
            <div className="mb-4">
                <p>
                    Last updated: <span className="text-green-500">21st April, 2024</span>
                </p>
                <p>
                    This Cookie Policy explains how{' '}
                    <span className="text-green-500">Orbits</span> ("we", "us", or
                    "our") uses cookies on our website{' '}
                    <a className="text-green-500" href='/'>www.playorbits.com</a> (the
                    "Service"). By using the Service, you consent to the use of cookies.
                </p>
                <h2 className="text-lg font-bold mt-4 mb-2">What are cookies</h2>
                <p>
                    Cookies are small pieces of text sent by your web browser by a
                    website you visit. A cookie file is stored in your web browser and
                    allows the Service or a third-party to recognize you and make your
                    next visit easier and the Service more useful to you.
                </p>
                <h2 className="text-lg font-bold mt-4 mb-2">How Orbits uses cookies</h2>
                <p>
                    When you use and access the Service, we may place a number of
                    cookies files in your web browser.
                </p>
                <ul className="list-disc pl-5">
                    <li>
                    <span className="text-green-500">Statistic Counting:</span> We
                    use cookies to track statistics such as streaks and successful
                    puzzle levels to enhance the end user experience.
                    </li>
                    <li>
                    <span className="text-green-500">First Use:</span> We may use
                    cookies to determine if it's your first visit to the website. This
                    allows us to show you tutorials or introductory content to help
                    you get started with the game, but will not be shown on
                    subsequent visits.
                    </li>
                </ul>
                <h2 className="text-lg font-bold mt-4 mb-2">What are your choices regarding cookies</h2>
                <p>
                    If you'd like to delete cookies or instruct your web browser to
                    delete or refuse cookies, please visit the help pages of your web
                    browser. Please note, however, that if you delete cookies or refuse
                    to accept them, you might not be able to use all of the features we
                    offer, you may not be able to store your preferences, and some of
                    our pages might not display properly.
                </p>
                <h2 className="text-lg font-bold mt-4 mb-2">Where can you find more information about cookies</h2>
                <p>
                    You can learn more about cookies and the following third-party
                    websites:
                </p>
                <ul className="list-disc pl-5">
                    <li>
                    AllAboutCookies:{' '}
                    <a
                        href="http://www.allaboutcookies.org/"
                        className="text-green-500"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        http://www.allaboutcookies.org/
                    </a>
                    </li>
                    <li>
                    Network Advertising Initiative:{' '}
                    <a
                        href="http://www.networkadvertising.org/"
                        className="text-green-500"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        http://www.networkadvertising.org/
                    </a>
                    </li>
                </ul>
                <h2 className="text-lg font-bold mt-4 mb-2">Contact us</h2>
                <p>
                    If you have any questions about this Cookie Policy, please contact
                    us:
                </p>
                <ul className="list-disc pl-5">
                    <li>
                    By email:{' '}
                    <a
                        href="mailto:your-email@example.com"
                        className="text-green-500"
                    >
                        [Your contact email]
                    </a>
                    </li>
                </ul>
                <a href='/'>
                    <Button className='mt-8 bg-green-500'>
                        Return Home
                    </Button>
                </a>
                </div>
            </div>
    </div>
  );
}
