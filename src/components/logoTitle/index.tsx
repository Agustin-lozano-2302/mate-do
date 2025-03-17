import Image from "next/image";
import { ILogoTitle } from "@/components/logoTitle/ILogoTitle-interface";

export default function LogoTitle ({title, customStyles = false}: ILogoTitle) {
    return(
        <div className="flex items-center gap-2">
      <Image src={"/logos/mate.png"} alt="mate" width={40} height={40} quality={100} className="mb-1" />
        <h1 className={`flex justify-center items-center text-2xl font-bold text-green-600 ${customStyles ? "max-w-min" : ""}`}>{title}</h1>
        </div>
    )
}