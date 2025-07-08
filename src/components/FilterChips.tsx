import React from 'react'

const chevronIcon = "http://localhost:3845/assets/12e34df683cbc8b74db3846f48a07df0862a061f.svg";

export default function FilterChips() {
  return (
    <div
      className="bg-black relative rounded-[35px] inline-flex items-center justify-center h-[35px] px-5 py-[7px]"
      data-name="Filter Chips"
      id="node-I120_1060-108_7213"
    >
      <div className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[35px]" />
      <div className="flex flex-row items-center justify-center gap-2 relative">
        <div
          className="flex flex-col justify-center leading-[0] not-italic text-white text-[14px] text-center whitespace-nowrap"
          id="node-II120_1060-108_7213-3725_1482"
          style={{ fontFamily: 'Futura Std, sans-serif' }}
        >
          <p className="block leading-[1.25] whitespace-pre">Instagram</p>
        </div>
        <div
          className="overflow-clip relative shrink-0 size-4"
          data-name="All Icons/Chevron-Down/White/16"
          id="node-II120_1060-108_7213-3725_1483"
        >
          <div
            className="absolute flex h-[4.667px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[9.333px]"
            style={{
              top: "calc(50% - 0.133334px)",
              left: "calc(50% + 0.00333262px)",
            }}
          >
            <div className="flex-none rotate-[180deg]">
              <div
                className="h-[4.667px] relative w-[9.333px]"
                data-name="Vector"
                id="node-II120_1060-108_7213-3725_1483-3377_1281"
              >
                <div
                  className="absolute bottom-[-10.714%] left-[-5.357%] right-[-5.357%] top-[-10.714%]"
                  style={
                    {
                      "--stroke-0": "rgba(255, 255, 255, 1)",
                    } as React.CSSProperties
                  }
                >
                  <img
                    alt="Chevron down icon"
                    className="block max-w-none size-full"
                    src={chevronIcon}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 