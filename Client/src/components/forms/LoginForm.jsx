import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoBlack } from "../../assets";
import { Spinner } from "@material-tailwind/react";
import { sendRequest } from "../../config/request";
import { useStoreData } from "../../global/store";
import PrimaryButton from "../ui/Button";
import InputField from "../ui/Input";
import { emptyStore } from "../../constants";
import { websocketRequest } from "../../config/websocketRequest";

const LoginForm = () => {

    const { store, setStoreData } = useStoreData()

    
    useEffect(()=>{
        localStorage.clear()
        setStoreData(emptyStore)
    },[])

    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const [signingIn, setSigningIn] = useState(false)

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleDataChange = (e) => {
        setError(false)
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const NavigateToSignUp = () => {
        navigate("/auth/signup")
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (store.usertype === "manager") {
                navigate(`/${store.usertype}/dashboard`)
            } else if (store.usertype === "cashier") {
                navigate(`/${store.usertype}/point-of-sales`)
            } else if (store.usertype === "charity") {
                navigate(`/${store.usertype}/donations`)
            }
        }

    }, [store])

    const handleSignIn = async () => {
        setSigningIn(true)
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/auth/login",
                includeHeaders: false,
                body: data,
            });
            if (response.message === "logged in successfully") {
                localStorage.setItem('token', response.user.token);

                if (response.user.usertype_id === 2) websocketRequest({
                    inventoryId: response.user.inventory_id,
                    WSevent: "cashier-login"
                })
                setStoreData({
                    ...store,
                    token: response.user.token,
                    usertype: response.user.usertype_id === 1 ? "manager" : response.user.usertype_id === 2 ? "cashier" : response.user.usertype_id === 3 ? "charity" : "",
                    usertype_id: response.user.usertype_id,
                    email: response.user.email,
                    user_id: response.user.id,
                    username: response.user.username,
                    company_name: response.user.company_name,
                    pic_url: response.user.pic_url,
                    inventory_id: response.user.inventory_id,

                });
                setSigningIn(false)

            } else {
                setSigningIn(false)
                setError(true)
            }
        } catch (error) {
            setSigningIn(false)
            setError(true)
        }
    }
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 items-center">
                <span className="text-[21px] text-[--text-black] ">
                    Sign in to
                </span>
                <img src={logoBlack} className="w-[50%] cursor-pointer" onClick={()=>navigate('/')}/>
                <span className="text-[16px] text-gray-700">
                    To help the word and reduce food waste
                </span>
            </div>
            <div className="ss:w-[500px] w-[300px] flex flex-col gap-5 " >
                <InputField
                    error={error}
                    label={'Enter your Email'}
                    name={'email'}
                    value={data.email}
                    onChange={handleDataChange}
                />
                <InputField
                    error={error}
                    type={'password'}
                    label={'Enter your password'}
                    name={'password'}
                    value={data.password}
                    onChange={handleDataChange}
                />
                <div className="flex justify-center ">
                    <PrimaryButton classNames='w-[75%] bg-[--primary] h-[40px] flex justify-center items-center p-0'
                        label={signingIn ? <Spinner /> : "Sign in"}
                        onClick={handleSignIn}
                        disabled={signingIn}
                    />
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