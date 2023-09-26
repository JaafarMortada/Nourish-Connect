
import { useState } from 'react'
import { navLinks } from '../../constants'
import { close, menu, logoBlack } from '../../assets'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className='w-full flex py-6 md:justify-between justify-center bg-[--background] items-center border-b-2 border-gray-200'>
      <img src={logoBlack} alt='Nourish Connect Logo' className='' />
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((navLink, index) => (
          <li
            key={navLink.id}
            className={`font-semibold cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} text-black hover:text-[--primary] transition-all`}
          >
            {
              navLink.id === 'signin' ?
                <span onClick={() => navigate('/auth/login')}>Sign in</span>

                : <a href={`#${navLink.id}`}>
                  {navLink.title}
                </a>
            }

          </li>
        ))}

      </ul>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img src={toggle ? close : menu} 
          alt='menu' 
          className='w-[28px] h-[28px] object-contain cursor-pointer' 
          onClick={() => setToggle((prev) => !prev)}
        />

        <div className={`${toggle ? "flex" : "hidden"} p-6 bg-[--primary] absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl toggled-sidebar z-40`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks.map((navLink, index) => (
              <li
                key={navLink.id}
                className={`font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mr-0" : "mb-4"} text-white`}
              >
                {
                  navLink.id === 'signin' ?
                    <span onClick={() => navigate('/auth/login')}>Sign in</span>

                    : <a href={`#${navLink.id}`}>
                      {navLink.title}
                    </a>
                }

              </li>
            ))}

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar