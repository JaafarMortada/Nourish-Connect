import { useNavigate } from "react-router-dom";
import { logoBlack } from "../../assets";
import PrimaryButton from "../ui/Button";
import InputField from "../ui/Input";

const LoginForm = () => {

    const navigate = useNavigate()
    
    const NavigateToSignUp = () => {
        navigate("/auth/signup")
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 items-center">
                <span className="text-[21px] text-[--text-black] ">
                    Sign in to
                </span>
                <img src={logoBlack} className="w-[50%]" />
                <span className="text-[16px] text-gray-700">
                    To help the word and reduce food waste
                </span>
            </div>
            <div className="ss:w-[500px] w-[300px] flex flex-col gap-5 " >
                <InputField label={'Enter your Email'} />
                <InputField label={'Enter your password'} />
                <div className="flex justify-center ">
                    <PrimaryButton classNames='w-[75%] bg-[--primary]'
                        label={'Sign in'} />
                </div>
            </div>
            <div className="flex justify-center items-center gap-2">
                <span className="text-[18px] pt-1">
                    Don’t have an account? 
                </span>
                <span 
                    className="text-[21px] font-semibold hover:text-[--primary] cursor-pointer"
                    onClick={NavigateToSignUp}    
                >
                    Sign Up
                </span>
            </div>
        </div>
    );
}

export default LoginForm;