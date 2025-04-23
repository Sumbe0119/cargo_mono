import React from "react";

const MainFooter = () => {
  return (
    <>
      <footer className="xs:hidden lg:block w-full border-t h-14 border-t-light bg-red-200 z-10">
        <div className="container flex items-center justify-between text-dark text-sm font-regular pt-4">
          <p>created 2025</p>
          <p>© Smart transit</p>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
