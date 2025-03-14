"use client"
import Link from "next/link";
import { IBackArrow } from "@/components/backArrow/IBackArrow";
import Image from "next/image";

export default function BackArrow ({link}: IBackArrow) {
    return (
        <Link
        href={link}
        className="text-green-600 font-bold text-2xl absolute left-4"
      >
            <Image
              src={"/icons/back-arrow.png"} 
              alt="arrow" 
              width={20} 
              height={20} 
              quality={100}
              className="cursor-pointer" 
            />
      </Link>
    )
}