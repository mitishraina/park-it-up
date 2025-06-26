import { SignupForm } from "@/components/signup-form";
// import Image from "next/image";
// import Parkitup_logo from "@/components/assets/Parkitup_logo.png";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-[#141a24] flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {/* <Link href="/">
        <div className="top-0 fixed left-0 flex items-center">
          <Image src={Parkitup_logo} alt='logo' height={100} width={100} />
          <span className="text-[#1985df] font-semibold md:text-3xl text-2xl">Park It Up</span>
        </div>
      </Link> */}
      <div className="w-[28rem] max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
      <Link href="/" className="text-blue-500 hover:underline text-sm">
        ← Back to Home
      </Link>
    </div>
  )
}