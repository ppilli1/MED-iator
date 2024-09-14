import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { navigation } from "../constants";
import taxCutImage from "../assets/taxCut.jpg"

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <nav className="container flex items-center justify-between py-7">
        <Link to="/" className="text-2xl font-bold text-gray-400 hover:text-blue-400 ease-in-out duration-300">
          TaxCut
        </Link>
        <Link to = "/" className = "hover:opacity-70 ease-in-out duration-300">
          <img
            className='absolute left-[15.5rem] top-[1.2rem] rounded-full h-12 w-12 mx-auto object-cover'
            src={taxCutImage}
            alt="profile pic"
          />
        </Link>
        <ul
          className={`${
            openNavigation ? "block" : "hidden"
          } lg:flex lg:items-center space-x-15`}
        >
          {navigation.map((item) => (
            <li key={item.id} className="mr-4 lg:mr-6">
              <Link
                to={item.url}
                className={`text-gray-400 hover:text-blue-400 ease-in-out duration-300 uppercase font-medium ${
                  pathname.hash === item.id ? "text-blue-400" : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
