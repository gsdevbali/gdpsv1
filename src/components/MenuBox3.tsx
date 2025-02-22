// import { Link } from 'lucide-react'
import React from 'react'

interface MenuBoxButtonProps {
  title: string;
  desc: string;
  menulink: string;
}

function MenuBox3({ title, desc, menulink }: MenuBoxButtonProps) {

  const handleClick = () => {
    console.log('Button clicked');
    window.open(menulink, '_blank');
  };

  return (
    <div className="aspect-auto rounded-xl bg-gray-200 hover:bg-yellow-200 cursor-pointer h-[180px]" >
      <div onClick={handleClick} className="flex flex-col justify-center items-center h-full p-2">
        <h3 className="text-[1.3em] font-bold text-orange-900 text-center">{title}</h3>
        <p className="text-sm font-light text-orange-800 text-center">{desc}</p>
      </div>
    </div>
  )
}

// function handleClick() {
//   window.open('/neraca-t', '_blank');

// }

export default MenuBox3