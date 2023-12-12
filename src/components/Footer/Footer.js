import React from "react";

function Footer() {
  return (
    <footer
      className={`flex p-4 mb-5 justify-between fixed bottom-0 items-center h-16 w-11/12 text-white`}
    >
      <div className="flex items-center space-x-2">
        <span className="white-text text-base">Digi® – </span>
        <span className="gray-text text-base">
          Boosting people for performance
        </span>
      </div>
      <div className="">
        <img src="/logoFundo.svg" alt="Logo" className="w-14 h-14" />
      </div>
    </footer>
  );
}

export default Footer;
