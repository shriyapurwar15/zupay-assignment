import { BookOpen, FilePen, FileQuestion, House, LogOut, StickyNote, UserCog, Users} from "lucide-react"

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-white w-fit p-3 text-[#3d404b]  justify-between h-full transition-all'>
        <div className='flex flex-col justify-start gap-1 h-full items-center '>
            <span className="cursor-pointer hover:bg-[#6947bf] hover:text-white rounded-xl p-2"><House /></span>
            <span className="cursor-pointer hover:bg-[#6947bf] hover:text-white rounded-xl p-2"><BookOpen /></span>
            <span className="cursor-pointer hover:bg-[#6947bf] hover:text-white rounded-xl p-2"><StickyNote /></span>
            <span className="cursor-pointer hover:bg-[#6947bf] hover:text-white rounded-xl p-2"><FilePen /></span>
            <span className="cursor-pointer hover:bg-[#6947bf] hover:text-white rounded-xl p-2"><Users /></span>
            <span className="cursor-pointer hover:bg-[#6947bf] hover:text-white rounded-xl p-2"><FileQuestion /></span>
            <span className="cursor-pointer hover:bg-[#6947bf] hover:text-white rounded-xl p-2"><UserCog /></span>
        </div>
        <span className="cursor-pointer hover:bg-[#6947bf] hover:text-white rounded-xl p-2"><LogOut /></span>
    </div>
  )
}

export default Sidebar