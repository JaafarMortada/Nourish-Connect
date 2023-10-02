import { hands_light_green } from "../../assets";
import LoginForm from "../../components/forms/LoginForm";

const LoginPage = () => {
    return (
            <div className="flex w-[100vw] h-[100vh] md:flex-row flex-col">
                <div className="flex flex-1 justify-center items-center h-[100vh]">
                    <LoginForm />
                </div>
                <div className="h-[100vh] flex-1 ss:flex hidden md:mt-0 mt-20 justify-center items-center">
                    <img src={hands_light_green} className="md:scale-100 scale-75"/>
                </div>
            </div>
    );
}

export default LoginPage;