import { useRouter } from 'next/navigation';
import React from 'react'
import { Card, CardDescription, CardHeader } from './ui/card';

const CauseCard = ({ id, description}:{id:number, description:string}) => {
    const router = useRouter();
    return (
      <div onClick={() => router.push(`cause/${id}`)}>
        <Card className="h-[220px] xl:w-[420px] lg:w-[320px] md:w-[350px] p-5 sm:w-fit m-5 hover:translate-y-[-10px] cursor-pointer">
          <CardHeader>
            <CardDescription className="text-black text-xl">{description}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
}

export default CauseCard