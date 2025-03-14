import Image from "next/image";
import { IBurgerMenu } from "@/components/burgerMenu/IBurgerMenu";

export default function BurgerMenu ({localUser, logout}: IBurgerMenu) {
    return (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
        <div className="px-4 py-2 border-b">
          <p className="text-sm text-black font-semibold">
          {localUser.first_name}
          </p>
        </div>
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 flex items-center gap-2 font-semibold justify-between"
        >
          Cerrar sesión
          <Image src={"/icons/logout.png"} alt="logout" width={20} height={20} quality={100} />
        </button>
      </div>
    )
}