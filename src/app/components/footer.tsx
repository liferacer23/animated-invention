import React from "react";
import ChartLogo from "../../../public/assets/chartLogo.png";
import Linkedin from "../../../public/assets/linkedine.png";
import Twitter from "../../../public/assets/oldtwitter.png";
import WhatsApp from "../../..//public/assets/whatsapp2.png";
import FaceBook from "../../../public/assets/facebook.png";
import Image from "next/image";
export default function Footer() {
  return (
    <div className="flex flex-col">
      <div className="flex w-10/12 h-48 bg-gradient-green-reverse mx-auto items-center justify-between px-44">
        <div className="flex flex-col items-start gap-8">
          <div>
            <Image src={ChartLogo} alt="chart logo" />
          </div>
          <div className="flex gap-5">
            <Image src={Linkedin} alt="linkedin logo" />
            <Image src={Twitter} alt="twitter logo" />
            <Image src={FaceBook} alt="facebook logo" />
            <Image src={WhatsApp} alt="whatsapp logo" />
          </div>
        </div>

        <div className="flex gap-7 items-start">
          <div className="gap-4 flex flex-col items-end">
            <p className="text-[14px] font-bold text-white">general</p>

            <div className="flex flex-col gap-2 items-end">
              <p className="text-[12px] text-white">About</p>
              <p className="text-[12px] text-white">Blog</p>
              <p className="text-[12px] text-white">Contact Us</p>
            </div>
          </div>
          <div className="gap-4 flex flex-col items-end">
            <p className="text-[14px] font-bold text-white">neighborhoods</p>

            <div className="flex flex-col gap-2 items-end">
              <p className="text-[12px] text-white">
                Neighborhoods in Tel Aviv
              </p>
              <p className="text-[12px] text-white">
                Neighborhoods in Givatayim
              </p>
              <p className="text-[12px] text-white">Neighborhoods in Ashdod</p>
              <p className="text-[12px] text-white">
                Neighborhoods in Petah Tikva
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-10/12 h-15 mx-auto items-center justify-between  bg-white my-5">
        <div>
          <p className="text-[12px] text-black">MadaDirot 2023</p>
        </div>
        <div className="flex gap-5 items-center">
          <p className="text-[12px] text-black">Accessibility Statement</p>
          <p className="text-[12px] text-black">Terms of Service</p>
          <p className="text-[12px] text-black">Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
