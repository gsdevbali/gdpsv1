import { Link } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

interface MenuBoxButtonProps {
  title: string;
  desc: string;
  menulink: string;
}

function MenuBoxButton({ title, desc, menulink }: MenuBoxButtonProps) {

  const handleClick = () => {
    console.log('Button clicked');
    window.open(menulink, '_blank');
  };

  return (
    <Button onClick={handleClick} className="bg-blue-700 hover:bg-blue-800 font-bold py-2 px-4 rounded-md w-full h-full" style={{ minHeight: '250px' }}>
      <div className="flex flex-col justify-center items-center h-full p-4 gap-2">
      <h3 className="text-[1.8em] font-bold text-orange-200 hover:text-white text-center break-words">{title}</h3>
      <p className="text-sm font-bold text-orange-200 text-center break-words w-full">{desc}</p>
      </div>
    </Button>
  ) 
}


export default MenuBoxButton