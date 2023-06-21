import React from "react";
import Image from "next/image";

const Services = ({
  setOpenProfile,
  setCompleteModal,
  setGetModal,
  startModal,
  setStartModal,
}) => {
  const team = [
    {
      avatar: "COMPLETE",
    },
    {
      avatar: "GET",
    },
    {
      avatar: "START",
    },
    {
      avatar: "USER",
    },
    {
      avatar: "COUNT",
    },
    {
      avatar: "SEND",
    },
  ];

  const openModalBox = (text) => {
    if (text === 1) {
      setCompleteModal(true);
    } else if (text === 2) {
      setGetModal(true);
    } else if (text === 3) {
      setStartModal(true);
    } else if (text === 4) {
      setOpenProfile(true);
    }
  };

  return (
    <section className='py-0 pb-14'>
      <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
        <div className='mt-12'>
          <ul className='grid gap-8 sm:grid-cols-2 md:grid-cols-5'>
            {team.map((item, i) => (
              <li key={i}>
                <div
                  onClick={() => openModalBox(i + 1)}
                  className='w-full h-60 sm:h-52 md:h-56 bg-[#212121] text-white font-black rounded-[15px] text-[20px] cursor-pointer transition-all duration-150 ease-in-out hover:scale-105'
                >
                  {/* <Image src={item.avatar}/> */}
                  <div className='h-full flex flex-col items-center justify-center'>
                    <p>{item.avatar}</p>
                    <p className='-mt-[5px]'>
                      {item.avatar != "USER" ? "SHIPMENT" : "PROFILE"}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
