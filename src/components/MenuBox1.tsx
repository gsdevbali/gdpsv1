import { Link } from 'lucide-react'
import React from 'react'

interface MenuBoxButtonProps {
    title: string;
    desc: string;
    menulink: string;
  }

function MenuBox1({ title, desc, menulink }: MenuBoxButtonProps) {

    const handleClick = () => {
        console.log('Button clicked');
        window.open(menulink, '_blank');
      };

  return (
    <div className="aspect-video rounded-xl bg-blue-100 hover:bg-blue-400 cursor-pointer" >
        <div onClick={handleClick} className="flex flex-col justify-center items-center h-full p-4">
            <h3 className="text-[1.8em] font-bold text-orange-700">{title}</h3>
            <p className="text-sm font-bold text-orange-700 text-center">{desc}</p>
        </div>
    </div>
  )
}

function handleClick() {
    window.open('/neraca-t', '_blank');
    
}

export default MenuBox1