"use client";
import prisma from "@/lib/prisma";
import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default async function Signupform({ emailid }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
              dob: '0',
              address:'0',
              blood:'0',
              family:'0',
              insurance:'0',
              weight:'0',
              height:'0',
              signed: false
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success("Account created! Redirecting to login...");}})
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="dob"
          className="block text-xs text-gray-600 uppercase"
        >
          date of birth
        </label>
        <input
          id="dob"
          name="dob"
          type="date"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="address"
          className="block text-xs text-gray-600 uppercase"
        >
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="107 We Bare Bears Lane"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="blood"
          className="block text-xs text-gray-600 uppercase"
        >
          Blood Type
        </label>
        <input
          id="blood"
          name="blood"
          type="text"
          placeholder="A/B/AB/O"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="family"
          className="block text-xs text-gray-600 uppercase"
        >
          Family Names
        </label>
        <input
          id="family"
          name="family"
          type="text"
          placeholder="Grizzly, Panda, Ice Bear"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="insurance"
          className="block text-xs text-gray-600 uppercase"
        >
          Insurance Provider
        </label>
        <input
          id="insurance"
          name="insurance"
          type="text"
          placeholder="Blue Bear Of America Health"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="weight"
          className="block text-xs text-gray-600 uppercase"
        >
          Weight
        </label>
        <input
          id="weight"
          name="weight"
          type="number"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
        <div>
        <label
          htmlFor="height"
          className="block text-xs text-gray-600 uppercase"
        >
          Height
        </label>
        <input
          id="height"
          name="height"
          type="number"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>get started!</p>
        )}
      </button>
    </form>
  );
}
