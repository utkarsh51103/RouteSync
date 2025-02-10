# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


{dialogopen == true ? (
        <div
          className="fixed inset-0 transition-all duration-400 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => {
            setdialogopen(false);
            setToterm("");
            setTosuggestions([]);
          }}
        />
      ) : null}
      



{dialogopen && (
        <div className="absolute flex items-center justify-center top-[300px] sm:left-20 md:left-[150px] lg:left-[400px] xl:left-[550px] z-50 transition-all duration-300">
          <dialog
            open={dialogopen}
            className="flex items-center justify-center rounded-xl "
          >
            <div className="flex flex-col items-center justify-start gap-5 bg-[#242530] h-[400px] w-[400px] rounded-lg pt-7">
              <div className="text-[30px] font-semibold">
                <span className="text-orange-500">Route</span>
                <span className="text-white">Sync</span>
              </div>
              <MdClear
                className="absolute top-3 right-3 cursor-pointer text-white text-xl"
                onClick={() => {
                  setdialogopen(false);
                  setToterm("");
                  setTosuggestions([]);
                }}
              />
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2">
                  <FaLocationArrow className="text-white" />
                  <input
                    type="text"
                    placeholder={`${dialogterm}`}
                    className="p-2 px-4 bg-gray-500 rounded-md placeholder:text-white text-white"
                    onChange={(e) => getTosuggestions(e.target.value)}
                  />
                </div>
                {dialogterm === "From" && <div className="flex items-center justify-center gap-3 mt-2 ml-7 text-orange-500 hover:text-orange-400 transition-all duration-300">
                  <button
                    className=" text-xs font-normal flex"
                    onClick={() => {
                      getcurrentLocation();
                      setdialogopen(false);
                      setTosuggestions([]);
                    }}
                  >
                    <CiLocationOn className="text-sm text-white" />
                    Set current location
                  </button>
                </div>}
                {Tosuggestions.length > 0 && (
                  <div className="overflow-y-scroll max-h-[200px] flex flex-col gap-2 mt-3">
                    {Tosuggestions.map((suggested, index) => (
                      <div className="h-20 mx-5 text-white text-sm cursor-pointer bg-gray-700 p-2 rounded-lg" key={index} onClick={()=>selectedAdress(suggested)} >
                        {`${index + 1}. `} {suggested.place_name}
                      </div>
                    ))}
                  </div>
                )}

                
              </div>
              {Tosuggestions.length == 0 && (
                <button
                  className="p-2 px-4 bg-orange-500 rounded-lg text-white font-medium hover:bg-orange-600 transition-all duration-300 w-[100px]"
                  onClick={() => {
                    setdialogopen(false);
                    setToterm("");
                    setTosuggestions([]);
                  }}
                >
                  Set
                </button>
              )}
            </div>
          </dialog>
        </div>
      )}