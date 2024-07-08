import SignOut from "@/components/sign-out";
import Signupform from "@/components/signup-form";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession();
  const user = await prisma.doctors.count({where: {email:session.user.email}})
  if (user == 0){
    return (
      <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <SignOut />
        <p className="text-stone-400 hover:text-stone-200 transition-all">Authorized as a patient. Go to your first visit to get data.</p>
        
  
      
      </div>
    </div>
    )
  }
  //@ts-ignore
  const allUsers = await prisma.doctors.findMany({
    where: {email:session.user.email}
  })
  const appointments = prisma.appointments.findMany({
    where:{
      doctor:session.user.email
    }
  })
    
  const currentDate = new Date();


  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <SignOut />

        <p className="text-orange-400">
          APPOINTMENTS {' -- '}

      {`${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`}

      <br></br>
      
      {(await appointments).map((data) => (
        <p className="text-yellow-400 hover:text-yellow-200 transition-all">

          { ? (return 'ok')}
          
          </p>
      ))}
      </p>



        <p className="text-stone-400 hover:text-stone-200 transition-all">All your patients:</p>
        {allUsers.map((data) => (
          <a
          className="text-stone-400 hover:text-stone-200 transition-all"
          href={`/dashboard/patients/${data.Patient}`}
        >
          {data.Patient}
        </a>
        ))
      }
      
      </div>
    </div>
  );
}
