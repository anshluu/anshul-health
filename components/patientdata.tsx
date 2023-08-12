import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
export default async function Patientdata({ patientemail }) {
  const session = await getServerSession();
    const patient = await prisma.user.findFirst({
      where:{email:patientemail.replace('%40', '@')}
    })
    
    return (
        <>
        <p className="text-stone-400">Patient Data: {patient.email}</p>
        <p className="text-stone-400">Date Of Birth: {patient.dob} <button onClick={() => {alert('ok')}}>edit</button></p>
        </>
  );}

