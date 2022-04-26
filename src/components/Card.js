function Card(props){
    return <div className="flex justify-center items-center bg-slate-300 m-2 py-6 px-2 rounded-lg">
        <p className=" text-center text-lg font-bold ">{props.text}</p>
    </div>
}

export default Card;