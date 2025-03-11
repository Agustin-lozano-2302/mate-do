import Image from "next/image";

interface ILogoTitle {
    title: string;
}

export default function LogoTitle ({title}: ILogoTitle) {
    return(
        <div className="flex items-center gap-2">
      <Image src={"/logos/mate.png"} alt="mate" width={40} height={40} quality={100} className="mb-1" />
        <h1 className="text-2xl font-bold text-green-600">{title}</h1>
        </div>
    )
}