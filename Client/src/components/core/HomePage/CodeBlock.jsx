import React from "react";
import Button from "./Button";
import { TypeAnimation } from "react-type-animation";

function CodeBlock({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      <div className="w-[50%] flex flex-col gap-5">
        <div>{heading}</div>
        <div>{subheading}</div>
        <div className="flex ">
          <Button
            Active={ctabtn1.active}
            textB={ctabtn1.btnText}
            Linkto={ctabtn1.link}
          />
          <Button
            Active={ctabtn2.active}
            textB={ctabtn2.btnText}
            Linkto={ctabtn2.link}
          />
        </div>
      </div>
      <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[50%]">
        {backgroundGradient}
        {/* Indexing */}
        <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlock;
