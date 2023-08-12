"use client";
import { useRouter } from "next/navigation";
export default function Testcomp({ email }) {
  const router = useRouter();
  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        const date = new Date()
        const saveddate = e.currentTarget.year.value
        const savedweight = e.currentTarget.weight.value
        fetch('/api/new', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                newweight:savedweight,
                addeddate:saveddate,
                patemail:email
            })
        }).then(async (res) => {
            if (res.status == 200){
                alert('Weight Added')
                router.push(`/dashboard/patients/${email}`)
            }
            else {
                const { error } = await res.json();
                alert(error)}
        })

    }}>
        <input id="weight" name="weight" type='text' placeholder="Current Weight"></input>
        <input id="year" name="year" type='number' placeholder="Current Year"></input>
        <button className="text-blue-400 hover:text-stone-200 transition-all" type="submit">submit</button>
    </form>
  );
}
