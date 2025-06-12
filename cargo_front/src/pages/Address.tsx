import React from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, WareHouseIcon } from "../components/assets/icons";

const Address = () => {
  return (
    <div className="simple-container xs:px-4 lg:px-0 xs:space-y-3 lg:space-y-12 xs:mt-6 lg:mt-24">
      <h1 className="grid gap-1 leading-3">
        <span className="text-sm font-medium text-black">
          Агуулахын жагсаалт
        </span>
        <span className="text-base leading-tight font-semibold text-primary">
          Та өөрт тохирох агуулхыг сонгоорой
        </span>
      </h1>
      <div className="grid xs:grid-cols-1 lg:grid-cols-2 xs:gap-3 lg:gap-6">
        {[1, 2, 3, 4].map((item: any, index: number) => {
          return (
            <Link
              key={`branch_${index}`}
              to={`/branch/${index}`}
              className="flex flex-col gap-3 rounded-lg overflow-hidden border border-light hover:border-primary transition-all p-4"
            >
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded bg-primary/80 flex items-center justify-center">
                  <span className="stroke stroke-white">
                    <WareHouseIcon />
                  </span>
                </div>
                <div className="rotate-180 flex items-center h-9 w-9 border border-light rounded fill-transparent cursor-pointer hover:bg-light transition-all justify-center stroke stroke-dark">
                  <ArrowIcon />
                </div>
              </div>

              <div className={`grid gap-1 text-black`}>
                <h6 className="text-sm text-primary font-medium line-clamp-1 uppercase">
                  Хан уул дүүрэг салбар
                </h6>
                <span className="text-sm font-normal line-clamp-3">
                  ХУД 4-р хороо Хүннүмол төвын 1 лавхар 102тоот
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Address;
