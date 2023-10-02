
import { features } from "../../constants"
import RevealOnScroll from "../ui/RevealOnScroll";
import { Card } from "@material-tailwind/react";

const FeatureCard = ({ icon, title, description, index }) => (
    <Card className={`md:max-w-[60%] max-w-full flex md:flex-row flex-col py-6  mt-10 translate-x-[200px] rounded-[5px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} shadow-none`}>
        <div className={`min-w-[370px] flex md:justify-start justify-center md:mb-0 mb-5 items-center md:ml-10 ml-0 rounded-full text-[--primary]`}>
            <img src={icon} alt='icon' className={`w-20 h-[32px] object-contain `} />
            <h4 className='font-semibold text-[--primary] text-[21px]'>
                {title}
            </h4>
        </div>
        <div className='flex flex-col mx-2 md:px-0 px-10'>
            <p className='font-normal text-dimWhite text-[18px] text-black'>
                {description}
            </p>
        </div>
    </Card>
)

const FeaturesSection = () => {
    return (
        <section id="features" className="flex flex-col md:gap-0 gap-10 sm:pb-16 pb-6 relative min-h-[750px]">
            <h1 className="font-semibold ss:text-[62px] text-[52px] text-[--primary] ss:leading-[100px] leading-[75px] w-full">
                Features
            </h1>
            <div className= "flex-col w-full items-center">
                {features.map((feature, index) => (
                    <RevealOnScroll key={index} index={index}>

                        <FeatureCard  {...feature} index={index} />
                    </RevealOnScroll>
                ))}
            </div>
            <RevealOnScroll>
            <h1 className="translate-x-[200px] mt-16 text-center font-semibold ss:text-[46px] text-[38px] text-[--primary] ss:leading-[100px] leading-[75px] w-full">
                And Many More!
            </h1>
            </RevealOnScroll>
        </section>
    )
}

export default FeaturesSection