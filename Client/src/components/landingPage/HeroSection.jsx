import { useEffect, useRef } from "react"
import { foodWasteFacts } from "../../constants";
import Typed from 'typed.js';
import CTA from "./CTA";
import ChangingBackground from "./ChangingBackground";

const HeroSection = () => {

    const factsRef = useRef(null)
    useEffect(() => {
        const options = {
            strings: foodWasteFacts,
            typeSpeed: 20,
            backSpeed: 0,
            bindInputFocusEvents: true,
            loop: true,
            cursorChar: '<span class="typed-cursor"></span>',
            backDelay: 3500,
            startDelay: 0,

        };

        if (factsRef.current) {
            const typed = new Typed(factsRef.current, options);

            return () => {
                typed.destroy();
            };
        }
    }, []);

    return (
        <section id="home" className="flex md:flex-row flex-col md:gap-0 xl:gap-5 gap-10 sm:pb-16 pb-6 relative min-h-[750px]">
            <div className="flex-1 flex text-right justify-center items-end flex-col xl:px-2  sm:px-16 px-6">
                <h1 className="font-semibold ss:text-[72px] text-[52px] text-[--primary] ss:leading-[100px] leading-[75px]">
                    Saving Food Has  <br className='sm:block hidden' /> {" "}
                    <span className='text-gradient'>Never Been Easier</span> {" "}
                </h1>
                <p className="font-normal text-black text-[18px] leading-[30.8px] max-w-[470px] mt-5">
                    Empowering Supermarkets and Charities Alike with User-Friendly Tools to Tackle Food Waste Head-On, Today and Tomorrow
                </p>
                <div className="flex flex-row-reverse gap-5 ss:mt-10 mt-5 items-center ">
                    <CTA label={"Sign up"} />
                    <p className="font-normal text-[--primary] text-[18px] leading-[30.8px] max-w-[470px]">
                        Join us today to transform surplus into support
                    </p>
                </div>
            </div>

            <div className="flex-1 flex justify-center items-start flex-col md:pb-0 pb-10 xl:px-2 sm:px-16 px-6 bg-[--primary] relative">
                {/* <ChangingBackground /> */}
                <h1 className="font-semibold ss:text-[72px] text-[52px] text-[--primary] ss:leading-[100px] leading-[75px] mt-20 text-white">
                    Did You Know?
                </h1>
                <p className="font-normal text-[--primary] text-[18px] leading-[30.8px] max-w-[470px] text-white min-h-[170px]" ref={factsRef}>
                </p>
            </div>
        </section>
    )
}

export default HeroSection