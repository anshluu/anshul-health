import SignOut from "@/components/sign-out";
import Signupform from "@/components/signup-form";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function Home() {

  const session = await getServerSession();
  const user = await prisma.doctors.count({where: {email:session.user.email}})

  const createAppointment = async (formData) => {
    'use server';
    const formDate = formData.get('date') as string;
    const dateArray = formDate.split('-')
    console.log(`${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`)
    fetch('/api/scheduling', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email:session.user.email,
            date:`${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`
        })
    }).then(async (res) => {
        if (res.status == 200){
            alert('Done')
        }
        else {
            const { error } = await res.json();
            alert(error)}
    })
    
  }

  if (user == 0){
    return (
      <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <SignOut />
        <p className="text-stone-400 hover:text-stone-200 transition-all">Schedule an appointment</p>
        <form action={createAppointment}>
        <input id="date" name="date" type='date' />
        <button className="text-yellow-400" type='submit'>Done</button>
        </form>
      </div>
    </div>
    )
  }

  return (
    <p className="text-orange-400">Authorized as a doctor</p>
  );
}
