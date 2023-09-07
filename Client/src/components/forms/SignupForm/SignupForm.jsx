import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoBlack } from "../../../assets";
import { Stepper, Step, Typography, step, Spinner } from "@material-tailwind/react";
import {
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import PrimaryButton from "../../ui/Button";
import SignupStepOne from "./SignupSteps/SignupStepOne";
import SignupStepTwo from "./SignupSteps/SignupStepTwo";
import SignupStepThree from "./SignupSteps/SignupStepThree";

const SignUpForm = ({ activeStep, handleNext, handlePrev, setActiveStep, isLastStep, isFirstStep, setIsFirstStep, setIsLastStep }) => {

    const navigate = useNavigate()

    const NavigateToLogin = () => {
        navigate("/auth/login")
    }

    const [role, setRole] = useState('')
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        company_name: "",
        latitude:"",
        longitude: ""
    })
    const [signingUp, setSigningUp] = useState(false)
    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSignUp = () => {
        setSigningUp(true);
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 items-center">
                <span className="text-[21px] text-[--text-black] ">
                    Sign Up to
                </span>
                <img src={logoBlack} className="w-[50%]" />
                <span className="text-[16px] text-gray-700">
                    To help the word and reduce food waste
                </span>
            </div>
            <div className="ss:w-[450px] w-[300px] flex flex-col gap-5 " >
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    <Step onClick={() => setActiveStep(0)}>
                        <CogIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center">
                            <Typography
                                variant="h6"
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                            >
                                Step 1
                            </Typography>
                            <Typography
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                                className="font-normal"
                            >
                                Your Role
                            </Typography>
                        </div>
                    </Step>
                    <Step >
                        <UserIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center">
                            <Typography
                                variant="h6"
                                color={activeStep === 1 ? "blue-gray" : "gray"}
                            >
                                Step 2
                            </Typography>
                            <Typography
                                color={activeStep === 1 ? "blue-gray" : "gray"}
                                className="font-normal"
                            >
                                About You
                            </Typography>
                        </div>
                    </Step>
                    <Step >
                        <BuildingLibraryIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center">
                            <Typography
                                variant="h6"
                                color={activeStep === 2 ? "blue-gray" : "gray"}
                            >
                                Step 3
                            </Typography>
                            <Typography
                                color={activeStep === 2 ? "blue-gray" : "gray"}
                                className="font-normal text-[16px]"
                            >
                                Your Company
                            </Typography>
                        </div>
                    </Step>
                </Stepper>
                <div className="mt-[4rem]">
                    {
                    activeStep === 0 ?
                        <SignupStepOne role={role} setRole={setRole}/>
                        :
                        (activeStep === 1 ? 
                            <SignupStepTwo data={data} handleDataChange={handleDataChange}/> 
                            : 
                            <SignupStepThree data={data} role={role} handleDataChange={handleDataChange}/>)
                    }
                </div>
                
                <div className="mt-5 flex justify-between">
                    <PrimaryButton
                        label={"Prev"}
                        classNames={"bg-[--primary]"}
                        onClick={handlePrev}
                        disabled={isFirstStep}
                    >
                    </PrimaryButton>
                    <PrimaryButton
                        label={activeStep === 2 ? (signingUp ? <Spinner /> : "Sign Up") : "Next"}
                        classNames={"bg-[--primary] w-[80.69px] flex justify-center items-center p-0"}
                        onClick={activeStep === 2 ? handleSignUp : handleNext}
                        disabled={
                            (
                                activeStep === 2 && 
                                    (
                                        data.company_name === '' || 
                                        data.latitude === '' || 
                                        data.longitude === ''
                                    )
                            ) 
                            || 
                            (
                                activeStep === 1 && 
                                    (
                                        data.username === '' || 
                                        data.email === '' || 
                                        data.password === '' ||
                                        data.password.length < 8
                                    )
                            ) 
                            || role === ''}
                    />
                </div>
            </div>
            <div className="flex justify-center items-center gap-2">
                <span className="text-[18px] pt-1">
                    Already have an account?
                </span>
                <span
                    className="text-[21px] font-semibold hover:text-[--primary] cursor-pointer"
                    onClick={NavigateToLogin}
                >
                    Sign In
                </span>
            </div>
        </div>
    );
}

export default SignUpForm;