
import { useState } from 'react'
import { navLinks } from '../../constants'
import { close, menu, logoBlack } from '../../assets'
const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  return (
    <nav className='w-full flex py-6 justify-between items-center'>
      <img src={logoBlack} alt='nourish connect' className='' />
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
        <img src={toggle ? close : menu} alt='menu' className='w-[28px] h-[28px] object-contain cursor-pointer' onClick={() => setToggle((prev) => !prev)}
        />

        <div className={`${toggle ? "flex" : "hidden"} p-6 bg-[--primary] absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl toggled-sidebar z-40`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks.map((navLink, index) => (
              <li
                key={navLink.id}
                className={`font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mr-0" : "mb-4"} text-white`}
              >
                <a href={`#${navLink.id}`}>
                  {navLink.title}
                </a>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar