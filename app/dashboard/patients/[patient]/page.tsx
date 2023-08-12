import Patientdata from "@/components/patientdata";
import { GetServerSideProps } from "next";
import SignOut from "@/components/sign-out";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
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
    if (patient.weight == ""){
      return (
        <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
      <p className="text-stone-400">No Weight Data <br></br><a style={{color:'orange'}} href={`/dashboard/patients/${patient.email}/new`}>New Weight Log</a></p>
      
        </div></div>
      )
    }
    return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <SignOut />
        <p className="text-stone-400">Patient Data: {patient.email}</p>
        <p className="text-stone-400">Current Weight: {(patient.weight![patient.weight!.length - 1].replace('ID', '')).split('ID')[0]} LB<br></br> <a style={{color:'orange'}} href={`/dashboard/patients/${patient.email}/new`}>New Weight Log</a><br></br><a style={{color:'orange'}} href={`/dashboard/patients/${patient.email}/data/weight`}>Previous Weight</a></p>
      </div>
    </div>
  );}
}

