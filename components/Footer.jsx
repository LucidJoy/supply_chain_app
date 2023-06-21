import React from "react";

const Footer = () => {
  const footerNavs = [
    { href: "#", name: "Terms" },
    { href: "#", name: "Privacy" },
    { href: "#", name: "License" },
    { href: "#", name: "About Us" },
  ];

  return (
    <footer className='pt-10'>
      <div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'>
        <div className='justify-between sm:flex'>
          <div className='space-y-6'>
            <img
              src='https://www.floatui.com/logo.svg'
              alt='logo'
              className='w-32'
            />
            <p className='max-w-md'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Corrupti, voluptatum.
            </p>
            <ul className='flex flex-wrap items-center gap-4 text-sm sm:text-base'>
              {footerNavs.map((item, idx) => (
                <li className='text-gray-800 hover:text-gray-500 duration-150'>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-6'>
            <p className='text-gray-700 font-semibold'>Get the app</p>

            <div className='flex items-center gap-3 mt-3 sm:block'>
              <a href='#'>fot1</a>
              <a href='#' className='mt-0 block sm:mt-3'>
                fot2
              </a>
            </div>
          </div>
        </div>

        <div className='mt-10 py-10 border-t md:text-center'>
          <p>&copy; 2023 Joy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
