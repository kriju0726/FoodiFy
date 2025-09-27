import React from 'react'


function UserDashboard() {
    return(
        <div className='w-screen min-h-screen flex flex-col items-center gap-5 bg-[#fff9f6] overflow-y-auto'>
            <Nav>
                <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
                    <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration For your First Order</h1>
                </div>
            </Nav>
        </div>
    )
}

export default UserDashboard