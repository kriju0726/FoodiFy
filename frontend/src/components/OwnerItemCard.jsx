import React from 'react'
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function OwnerItemCard ({data}) {
    const navigate = useNavigate()

  return (
    <div className='flex bg-white shadow-md rounded-lg overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>
      <div className='w-36 h-full max-w-2xl'>
            <img src={data.image} alt="" className='w-full h-full object-cover'/>
      </div>
      <div className='flex flex-col justify-between p-3 flex-1'>
        <div>
            <h2 className='text-base font-semibold text-[#ff4d2d]'>{data.name}</h2>
            <p><span className='font-medium text-gray-70'>Category: </span>{data.category}</p>
            <p><span className='font-medium text-gray-70'>Food Type: </span>{data.foodType}</p>
        </div>

        <div className='flex items-center justify-between'>
            <div className='text-[#ff4d2d] font-bold'>₹ {data.price}</div>
                <div className=' flex items-center gap-2'>
                    <div className='text-[#ff4d2d] p-2 rounded-full cursor-pointer hover:bg-[#ff4d2d]/30' 
                                    onClick={()=>navigate("/edit-item")}>
                                    <FaPen size={16} />
                    </div>
                    <div className='text-[#ff4d2d] p-2 rounded-full cursor-pointer hover:bg-[#ff4d2d]/30'>
                        <FaTrashAlt size={16} />
                    </div>
                </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerItemCard


