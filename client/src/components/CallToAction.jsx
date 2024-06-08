import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center items-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript</h2>
        <p className="text-gray-500 my-2">Checkout these resources in Github repository</p>
        <Button
          className="rounded-bl-xl rounded-tl-xl"
          gradientDuoTone="purpleToPink"
        >
          <a href="https://github.com/moizhassan14?tab=repositories" target="_blank" rel="noopener noreferrer">Learn more about JS</a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img src="https://www.tutorialrepublic.com/lib/images/javascript-illustration.png" />
      </div>
    </div>
  );
}
