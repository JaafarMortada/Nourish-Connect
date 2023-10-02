import { Typography } from "@material-tailwind/react"
import { logoBlack } from "../../assets"
import { navLinks } from "../../constants"
import { useNavigate } from "react-router-dom"

import CTA from "./CTA"

const Footer = () => {
  const navigate = useNavigate()
  return (
    <>
      <hr className="my-8 border-blue-gray-200" />

      <section id="home" className="flex md:flex-row flex-col md:gap-0 gap-10 sm:pb-16 pb-6 relative min-h-max">

        <footer className="w-full">
          <div className="flex md:flex-row flex-col items-start justify-center text-center md:justify-between">
            <div className="flex flex-col flex-wrap gap-10 text-center md:justify-between">
              <img src={logoBlack} alt="logo-ct" className='h-[40px] object-contain' />
              <ul className='list-none flex-col items-start'>
                {navLinks.map((navLink, index) => (
                  <li
                    key={navLink.id}
                    className='font-semibold text-left mb-2 cursor-pointer text-[16px] text-black hover:text-[--primary] transition-all'
                  >
                    {
                      navLink.id === 'signin' ? 
                      <span onClick={()=>navigate('/auth/login')}>Sign in</span>
                      
                      : <a href={`#${navLink.id}`}>
                        {navLink.title}
                      </a>
                  }
                  </li>
                ))}

              </ul>
            </div>
            <div className="flex flex-col items-center justify-center gap-10 mt-10 md:mt-0">
              <h1 className="font-semibold ss:text-[24px] text-[--primary]">
                Ready to make a positive impact and reduce food waste <br className='sm:block hidden' /> {" "}
                <span className='text-gradient'>while boosting your business? Join us today!</span> {" "}
              </h1>
              <CTA label={"Join Now"} />
            </div>
          </div>

          <hr className="my-8 border-blue-gray-200" />
          <Typography color="blue-gray" className="text-center font-normal">
            &copy; 2023 Nourish Connect. All rights reserved.
          </Typography>
        </footer>
      </section>
    </>
  )
}

export default Footer