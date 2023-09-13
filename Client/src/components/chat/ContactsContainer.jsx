import { Input } from "@material-tailwind/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import ContactCard from "./ContactCard"

const ContactsContainer = () => {
  return (
    <div className='min-w-[20rem] h-full bg-[--background-black] mb-2 p-4 border-l-4 border-black flex flex-col gap-4'>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Search charities"
              className="!border-0 !bg-gray-600 text-white placeholder:text-gray-100 !rounded-full "
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px] " }}
              
            //   value={searchTerm}
            //   onChange={(e) => setSearchTerm(e.target.value)}

              icon={<MagnifyingGlassIcon className="h-5 w-5 text-white " />}
            />
          </div>
          <hr className="my-2 border-[--text-gray]" />
          <div className="flex flex-col gap-2 max-h-full overflow-scroll justify-start">
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />
            <ContactCard />



          </div>
    </div>
  )
}

export default ContactsContainer