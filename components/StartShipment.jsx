import React, { useState } from "react";

const StartShipment = ({ startModal, setStartModal, startShipment }) => {
  const [getProduct, setGetProduct] = useState({
    receiver: "",
    index: "",
  });

  const startShipping = async () => {
    await startShipment(getProduct);
    window.location.reload();
  };

  return (
    <>
      {startModal && (
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div
            className='fixed inset-0 w-full h-full bg-black opacity-40'
            onClick={() => setStartModal(false)}
          ></div>

          <div className='flex items-center min-h-screen px-4 py-8'>
            <div
              className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md
            shadow-lg'
            >
              <div className='flex justify-end'>
                <button
                  className='p-2 text-gray-400 rounded-md hover:bg-gray-100'
                  onClick={() => setStartModal(false)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
                <h4 className='text-lg font-medium text-gray-800'>
                  Start The Shipping
                </h4>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='relative mt-3'>
                    <input
                      type='text'
                      placeholder='Receiver'
                      className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
                    outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                      onChange={(e) => {
                        setGetProduct({
                          ...getProduct,
                          receiver: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='relative mt-3'>
                    <input
                      type='text'
                      placeholder='Id'
                      className='w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent
                    outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                      onChange={(e) => {
                        setGetProduct({
                          ...getProduct,
                          index: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <button
                    onClick={() => startShipping()}
                    className='block w-full mt-3 py-3 px-4 font-medium text-sm text-center
                text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
                  rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2'
                  >
                    Get details
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartShipment;
