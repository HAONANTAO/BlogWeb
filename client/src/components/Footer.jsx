import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
//incase the same name with Footer from flowbite
const FooterComponent = () => {
  return (
    <Footer
      container
      className="text-white bg-transparent border border-blue-900">
      <div className="w-full mx-auto max-w-7xl">
        <div className="grid justify-between w-full sm:flex smd:grid-cols-1">
          <div
            to="/"
            className="self-center mt-5 text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white">
            {/* 渐变三色 */}
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Aaron's
            </span>
            Blog
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
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
                <Footer.Link
                  col
                  href="#"
                  target="_blank" //open in a new window
                  rel="noopener noreferrer" //security reason
                  className="text-base">
                  Aaron's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Me" />

              <Footer.LinkGroup>
                <Footer.Link
                  col
                  href="https://github.com/HAONANTAO"
                  target="_blank" //open in a new window
                  rel="noopener noreferrer" //security reason
                  className="text-base">
                  Aaron's GitHub
                </Footer.Link>
                <Footer.Link
                  col
                  href="www.linkedin.com/in/haonan-tao-aaron"
                  target="_blank" //open in a new window
                  rel="noopener noreferrer" //security reason
                  className="text-base">
                  Aaron's LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />

              <Footer.LinkGroup>
                <Footer.Link href="#" className="text-base">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" className="text-base">
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
