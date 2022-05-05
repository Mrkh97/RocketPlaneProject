import { useState } from "react";
import Card from "./Card";
import Chart from "./Chart";

export default function Home() {
    const [list, setList] = useState([])
    const [content, setContent] = useState('');
    return <div className=" ">
      
      <Card text='Hi' />
      <Card text='My name is Mohammadreza' />
      <Card text='This is my Bachelor degree final project' />
      <div className=" w-full p-2 text-center">
        <input onChange={(event) => { setContent(event.target.value) }} value={content} className="inpot bg-slate-200 text-xl w-11/12 p-2 rounded-lg" />
        <button onClick={() => { setList([...list, content]) }} className=" m-2 bg-gray-300 p-2 rounded-lg drop-shadow-lg hover:drop-shadow-2xl hover:bg-white">ADD</button>
      </div>
      {list.map((item) => { return <Card text={item} /> })}
      <Chart />
  
    </div>
  }