import React from 'react'

function TopBar() {
  return (
    <div className="w-full bg-[#efeeec] px-4 pt-4 pb-2"> 
      <div className="bg-[#b2f6e3] rounded-full py-3 px-6 flex justify-center items-center cursor-pointer transition-all hover:opacity-90">
        <p className="text-[#111212] font-bold text-xs md:text-sm tracking-tight text-center">
          <span className="mr-2">🚨</span>
          Where are your customers actually searching? Download the report
        </p>
      </div>
    </div>
  )
}

export default TopBar