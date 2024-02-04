import { ProfileForm } from '@/components/MainForm'
import Spacer from '@/components/Spacer'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-[80vh]">
      <ProfileForm />
    </main>
  )
}
