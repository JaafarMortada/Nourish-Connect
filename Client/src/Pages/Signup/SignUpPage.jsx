import { useState } from "react";

import { hands_light_blue, hands_blue, hands_purple } from "../../assets";
import SignUpForm from "../../components/forms/SignupForm/SignupForm";

const SignUpPage = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
 
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1)

    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1)


    return ( 
        <div className="flex w-[100vw] h-[100vh] md:flex-row flex-col">
        <div className="flex flex-1 justify-center items-center h-[100vh]">
            <SignUpForm 
                isLastStep={isLastStep}
                isFirstStep={isFirstStep}
                setIsFirstStep={setIsFirstStep}
                setIsLastStep={setIsLastStep}
                setActiveStep={setActiveStep}
                handleNext={handleNext} 
                handlePrev={handlePrev} 
                activeStep={activeStep}
            />
        </div>
        <div className="h-[100vh] flex-1 ss:flex hidden md:mt-0 mt-20 justify-center items-center">
            <img 
                src={activeStep === 0 ? hands_light_blue : (activeStep === 1 ? hands_blue : hands_purple)} 
                className="md:scale-100 scale-75"
            />
        </div>
    </div>
     );
}
 
export default SignUpPage;