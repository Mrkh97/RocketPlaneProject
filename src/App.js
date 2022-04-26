import { useState } from "react";
import Card from "./components/Card";

function App() {
  const [list,setList]=useState(['empty','is it!?'])
  const [content,setContent]=useState('');
  return (
    <div className=" bg-slate-500 h-full absolute w-full">
      <div className=" bg-slate-300 m-2  h-16">
        <p className=" text-center items-center">hi</p>
      </div>
      <div className=" bg-slate-300 m-2  h-16">
        <p className=" text-center">
          my name is mohammadreza
        </p>
      </div>
      <div className=" bg-slate-300 m-2 h-16 ">
        <p className=" text-center">
          im trying to learn react and this is my website im gonna try to make it better over time.
        </p>
      </div>
      <Card text='lets see if this works' />
      <Card text='yeah it does ok lets try and make a list' />
      <div className=" w-full p-2 text-center">
        <input onChange={(event)=>{setContent(event.target.value)}} value={content} className="inpot bg-slate-200 text-xl w-11/12 p-2 rounded-lg" />
        <button onClick={()=>{setList([...list,content])}} className=" ml-2 bg-gray-300 p-2 rounded-lg drop-shadow-lg hover:drop-shadow-2xl hover:bg-white">ADD</button>
      </div>
      {list.map((item)=>{return <Card text={item}/>})}
    </div>
  );
}

export default App;
