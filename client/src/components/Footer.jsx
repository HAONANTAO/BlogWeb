import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
//incase the same name with Footer from flowbite
const FooterComponent = () => {
  return (
    <Footer
      container
      className="text-white bg-transparent border border-blue-900">
      <div>
        <div>
          <div>
            {/* link */}
            <div
              to="/"
              className="self-center text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white">
              {/* 渐变三色 */}
              <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Aaron's
              </span>
              Blog
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <Footer.Title title="About" />
            <Footer.LinkGroup>
              <Footer.Link
                col
                href="https://www.aarontao.com"
                target="_blank" //open in a new window
                rel="noopener noreferrer" //security reason
                className="text-base">
                Aaron's Portfolio
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
