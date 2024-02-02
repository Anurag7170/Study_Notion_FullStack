import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links.js";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown.jsx";
import { apiConnector } from "../../Services/apiConnector.js";
import { categories } from "../../Services/apis.js";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubLinks = async () => {};

  useEffect(() => {
    (async () => {
      // console.log(categories.CATEGORIES_API);
      setLoading(true);
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        // console.log(result.data.data);
        setSubLinks(result.data.data);
      } catch (error) {
        console.log("Api Fetch error inside Navbar(frontend)", error);
      }
      setLoading(false);
    })();
  }, []);
  //  console.log("sub links", subLinks.length)

  return (
    <div className="flex h-14 items-center justify-center border-b-2 border-b-richblack-100 ">
      <div className="flex w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to={"/"}>
          <img src={logo} width={160} height={42} loading="lazy" />
        </Link>

        {/* navbar links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div className="relative flex items-center gap-2 group">
                      <p>{link.title}</p>
                      <BsChevronDown />

                      <div
                        className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] 
                        translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 
                        text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                        group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]
                        "
                      >
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] 
                        translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                        {
                          loading ? (<p className="text-center">Loading....</p>) : 
                          // loading is false
                          (
                            subLinks.length  ?
                            (<>
                                {
                                  subLinks?.map((subLinks, index) => (
                                    <NavLink to={`/catalog/${subLinks.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                      className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                      key={index}
                                      >
                                    {subLinks.name}
                                    </NavLink>
                                  ))
                                }

                            </>) : (<div>Course Not found</div>)
                          )
                        }
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <NavLink to={link.path}>
                      {({ isActive }) => (
                        <div
                          className={
                            isActive ? "text-yellow-25" : "text-richblack-25"
                          }
                        >
                          {link.title}
                        </div>
                      )}
                    </NavLink>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login and signup button */}
        <div>
          <div className="hidden items-center gap-x-4 md:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            )}
            {token !== null && <ProfileDropDown />}
          </div>
          <button className="mr-4 md:hidden">
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
