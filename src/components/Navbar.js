import {useNavigate} from 'react-router-dom'

function NavbarItem(params){
    const navigate = useNavigate();
    return <li className=' text-slate-300 hover:cursor-pointer m-2' onClick={()=>navigate("/"+params.text)}>{params.text}</li>
}

export default function Navbar(){
    
    return <div>
        <ul className='flex my-3 p-2'>
            <NavbarItem text="Home" />
            <NavbarItem text="ConstSpeed" />
            <NavbarItem text="CalculateRatio" />
            
        </ul>
    </div>
}