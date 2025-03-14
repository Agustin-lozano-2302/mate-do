"use client"
import { useEffect, useState } from "react";
import MainSection from "@/components/mainSection";
import { supabase } from "@/context/supabase";


export default function Home() {

  const [todos, setTodos] = useState<any[]>()


  const fetchNotes = async () => {
    const { data, error } = await supabase.from("todos").select("*");

    if (error) {
      return [];
    }
    setTodos(data)
  };

  const postNotes = async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ todo: "primer post valor ejemplo",  }])
      .select();

    if (error) {
      console.log("🚀 ~ postNotes ~ error:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchNotes()
  },[])

  

  return (
    <section className="flex flex-col max-h-[100vh] overflow-hidden">
      <nav className="header border-b-2 border-red-500">
        <p className="text-center">WallDO</p>
      </nav>
      <div className="w-full h-52 flex justify-center items-center">
        <button className="border-white border-2 p-4 w-fit" onClick={postNotes}>Execute post function</button>
      </div>
      <MainSection todos={todos || [] }/>
    </section>
  );
}
