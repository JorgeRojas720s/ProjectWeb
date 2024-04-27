'use client'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import Loading from './Loading';
import { Causes } from '@/app/(root)/event/consequence/[id]/page';


const CuaseSideBar = () => {
    const causes = useContext(Causes)
  return (
    <div className='bg-purple-1 w-[230px] h-[440px] rounded-3xl m-10 overflow-y-auto relative'>
      <h1 className='text-white justify-center items-center flex pt-3 font-bold'>Causas</h1>
      <nav>
        <ul className='mt-5 justify-start ml-2'>
          {causes.map(({cau_cause})=>{
            let cause = cau_cause;
            return(
              <li className='text-white p-1 hover:cursor-pointer'>
                <a>
                  {'▶ '}
                  {cause.length >25? cause.substring(0,15)+'...': cause}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default CuaseSideBar