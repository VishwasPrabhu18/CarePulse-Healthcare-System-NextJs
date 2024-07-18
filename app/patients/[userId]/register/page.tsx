import RegisterForm from "@/components/forms/RegisterForm"
import { getUsre } from "@/lib/actions/patient.actions"
import Image from "next/image"
import Link from "next/link"

const Register = async ({params: {userId}}: SearchParamProps) => {

  const user = await getUsre(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[800px] flex-1 flex-col py-10'>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Carepulse Logo"
            className='mb-12 h-10 w-fit'
          />

          <RegisterForm user={user} />

          <p className='copyright py-12'>&copy; {new Date().getFullYear()} CarePulse</p>

        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt='Patient'
        className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default Register