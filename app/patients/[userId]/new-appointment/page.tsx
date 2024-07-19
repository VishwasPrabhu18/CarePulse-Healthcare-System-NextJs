import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions"
import Image from "next/image"

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {

  const patient = await getPatient(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[800px] flex-1 justify-between'>
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="Carepulse Logo"
            className='mb-12 h-10 w-fit'
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
        </div>
      </section>
    </div>
  )
}

export default NewAppointment