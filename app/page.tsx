import PatientForm from '@/components/forms/PatientForm'
import PasskeyModal from '@/components/PasskeyModal';
import Image from 'next/image';
import Link from 'next/link';

const Home = ({ searchParams }: SearchParamProps) => {

  const isAdmin = searchParams.admin === 'true';

  return (
    <div className='flex h-screen max-h-screen'>

      {isAdmin && <PasskeyModal />}

      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[496px]'>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Carepulse Logo"
            className='mb-12 h-10 w-fit'
          />

          <PatientForm />

          <div className='text-14-regular flex justify-between py-10'>
            <p className='justify-end text-dark-600 xl:text-left'>&copy; 2024 CarePulse</p>
            <Link href="/?admin=true" className='text-gray-500'>Admin</Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt='Patient'
        className='side-img max-w-[50%]'
      />
    </div>
  )
}

export default Home