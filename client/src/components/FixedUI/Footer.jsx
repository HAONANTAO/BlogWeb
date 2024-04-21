import React, { useState } from "react";
import { Footer, Modal } from "flowbite-react";
// import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { ImEvil2, ImGithub } from "react-icons/im";
import { IoLogoWechat } from "react-icons/io5";
//incase the same name with Footer from flowbite

const FooterComponent = () => {
  // for wechat
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <Footer
      container
      className="text-white bg-transparent border border-blue-900 ">
      <div className="w-full mx-auto ">
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
          <div className="grid grid-cols-2 gap-4 sm:mt-4 sm:grid-cols-3 sm:gap-8">
            <div>
              <Footer.Title title="About" />

              <Footer.LinkGroup>
                <Footer.Link
                  href="https://www.aarontao.com"
                  target="_blank" //open in a new window
                  rel="noopener noreferrer" //security reason
                  className="text-base">
                  Aaron's Portfolio
                </Footer.Link>
                <Footer.Link
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
                  href="https://github.com/HAONANTAO"
                  target="_blank" //open in a new window
                  rel="noopener noreferrer" //security reason
                  className="text-base">
                  Aaron's GitHub
                </Footer.Link>
                <Footer.Link
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
        {/* <Footer.Divider /> */}
        <div className="flex gap-8 pt-4 mt-4 border-t border-gray-400 sm:justify-between border-opacity-40">
          <div>
            <Footer.Copyright
              href="#"
              by="Aaron's Blog"
              year={new Date().getFullYear()}
            />
          </div>
          {/* icons */}
          <div className="flex gap-8 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={ImEvil2} />

            <Footer.Icon
              href="https://www.facebook.com/profile.php?id=100010269617228"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="www.linkedin.com/in/haonan-tao-aaron"
              icon={FaLinkedin}
            />

            <Footer.Icon
              href="#"
              icon={IoLogoWechat}
              onClick={handleToggleModal}
            />
            <Footer.Icon href="https://github.com/HAONANTAO" icon={ImGithub} />
          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={handleToggleModal} size="md">
        <Modal.Header>Scan my QR Code</Modal.Header>
        <Modal.Body>
          <div className="flex justify-center">
            <img
              src="/wechat.jpg"
              alt="WeChat QR Code"
              className="h-auto max-w-full"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleToggleModal}
            className="px-4 py-2 mx-auto text-sm font-medium text-blue-900 bg-white border border-blue-900 rounded-lg hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </Footer>
  );
};

export default FooterComponent;
