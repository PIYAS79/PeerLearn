import React from 'react'

const Single_Request_Page = () => {
    return (
        <div className=' bg-slate-950 clear-start flex justify-between min-h-screen'>
            <div className='border-r min-w-[350px] '>
                <div className="avatar w-full justify-center mt-8">
                    <div className="w-[50%] border-2 border-green-500 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-center mt-4">S M Piyas Mahamude Alif</h3>
                <p className="text-center text-gray-500">Software Engineer</p>
            </div>
            <div className=' flex-1'>
                <div className="lg:col-span-8  max-w-5xl m-auto ">
                <h1>Request Details</h1>
                <p>Create At : 12-12-2020 10:00 AM</p>
                <p>Title : Lorem ipsum, dolor sit amet consectetur adipisicing elit.erspiciatis beatae!</p>
                <p>Description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis incidunt ex, maxime, enim laborum repudiandae beatae quisquam suscipit in inventore minima iste quod labore accusamus natus et. Repellendus sint quaerat blanditiis laborum, eos expedita facilis atque at voluptatibus ipsum exercitationem ducimus veritatis pariatur. Ipsum possimus, animi delectus dolores corrupti vero.</p>
                
                </div>
            </div>
        </div>
    )
}

export default Single_Request_Page