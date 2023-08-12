import Patientdata from "@/components/patientdata";
import { GetServerSideProps } from "next";
import SignOut from "@/components/sign-out";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import Graph from "@/components/graph";
export default async function Home({ params }) {
  const session = await getServerSession();
  function test(){
    alert('ok')
  }
  if (!session){return ('401 unauthorized')}
  //@ts-ignore
    const user = await prisma.doctors.count({where: {email:session.user.email}})
    if (user == 0){
    return (<><SignOut /> <p>error</p></>)
  }
  else {
    const patient = await prisma.user.findFirst({
      where:{email:params.patient.replace('%40', '@')}
    })
    if (params.data == 'height'){return (
        <div className="flex h-screen bg-black">
              <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
              <p className="text-stone-400">Height Graphs/Data Here</p>
              </div>
              </div>
    )}
    if (params.data == 'weight'){
        const patweight = patient.weight.toString().replaceAll(',', '')
        const wdate = patient.wdate.toString().replaceAll(',', '')
        return (
            <>
            <div className="flex h-screen bg-black">
              <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
                <SignOut />
                <p className="text-stone-400">
                {}
                {(patweight.split('ID')).map((x) => (
                    
                <p className="text-stone-400">{x}</p>
                ))}

                </p>
              </div>
            </div>
                        <Graph wdate={wdate} weightdata={patient.weight.toString().replaceAll(',', '')}></Graph></>
          )
    }

    ;}
}

