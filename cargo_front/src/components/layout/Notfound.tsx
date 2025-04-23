import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex-col flex items-center justify-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 22 22"
      >
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 3V1m6 18v2M3 8H1m18 6h2M3.914 3.914 2.5 2.5m15.586 15.586L19.5 19.5M11 16.657l-2.121 2.121a4 4 0 1 1-5.657-5.657L5.343 11m11.314 0 2.121-2.121a4 4 0 1 0-5.657-5.657L11 5.343"
        ></path>
      </svg>
      <p className="text-sm font-medium text-black">Хуудас байхгүй</p>
      <Link to={`/`} className="text-sm font-light text-primary underline cursor-pointer">
        Нүүр хуудас
      </Link>
    </div>
  );
};

export default Notfound;
