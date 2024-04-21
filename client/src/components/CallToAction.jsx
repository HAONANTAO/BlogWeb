import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col items-center justify-center p-4 m-4 text-center border rounded-md sm:flex-row ">
      <div className="flex flex-col justify-center flex-1">
        <h2 className="text-2xl ">Want to Know much more about me?</h2>
        <p className="my-2 text-gray-500">
          Go to my Personal Portfolio Website
        </p>
        <Button gradientDuoTone="purpleToPink" pill size="sm">
          <a
            href="https://www.aarontao.com"
            target="_blank"
            rel="noopener noreferrer">
            Aaron's Portfolio
          </a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img src="/Portfolio.png" />
      </div>
    </div>
  );
}
