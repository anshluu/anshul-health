import SignOut from "@/components/sign-out";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import Testcomp from "@/components/testcomp";
export default async function Home({ params }) {
  const session = await getServerSession();
  if (!session){return ('401 unauthorized')}
  //@ts-ignore
    const user = await prisma.doctors.count({where: {email:session.user.email}})
    if (user == 0){
    return (<><SignOut /> <p>error</p></>)
  }
  else {
    
    return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <SignOut />
        <Testcomp email={params.patient}></Testcomp>
        <p>{params.patient}</p>
      </div>
    </div>
  );}
}

