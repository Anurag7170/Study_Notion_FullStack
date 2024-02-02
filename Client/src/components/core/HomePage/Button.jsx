import React from "react";
import { Link } from "react-router-dom";

function Button({ Active, textB , Linkto}) {
  return (
    <div>
      <Link to={Linkto}>
        <div className={`text-center rounded-lg px-6 py-3 mx-2 my-5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
         ${Active ? "bg-yellow-50 text-black" : "bg-richblack-700 "}
         hover:shadow-none hover:scale-95 transition-all duration-200 `}>
            {textB}
        </div>
      </Link>
    </div>
  );
}

export default Button;
