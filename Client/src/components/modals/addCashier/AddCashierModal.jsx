import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner
} from "@material-tailwind/react";
import { sendRequest } from "../../../config/request";
import { useStoreData } from "../../../global/store";
import PrimaryButton from "../../ui/Button";
import InputField from "../../ui/Input";
const AddCashierModal = ({ open, handleOpen, handleNewCashier }) => {

    const { store } = useStoreData()
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [addingCashier, setAddingCashier] = useState(false)
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',

    })

    const handleDataChange = (e) => {
        setEmailError(false)
        setPasswordError(false)
        if (e.target.name === "image") {
            setData({ ...data, image: e.target.files[0] });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    }

    const handleError = (error) => {
        if (error === "email") {
            setEmailError(true)
            setTimeout(() => {
                setEmailError(false);
            }, 3000)
        } else if (error === "password") {
            setPasswordError(true)
            setTimeout(() => {
                setPasswordError(false);
            }, 3000)
        }
    }

    const handleAddCashier = async () => {
        if (data.password !== data.confirmPassword) {
            handleError('password')
            return
        }

        setAddingCashier(true)
        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('email', data.email);
            formData.append('password', data.password);
            if (data.image) formData.append('image', data.image);

            const response = await sendRequest({
                method: "POST",
                route: "/api/manager/add_cashier",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                token: store.token,
                body: formData,
            });

            if (response.message === "Cashier created successfully") {
                setData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    image: '',
                })
                setAddingCashier(false)
                handleOpen()
                handleNewCashier(response.cashier)
            } else {
                setAddingCashier(false)
                handleError("email")
                handleError("password")
            }
            
        } catch (error) {
            setAddingCashier(false)
            handleError("email")
            handleError("password")
        }
    }

    return (
        <Dialog
            open={open}
            handler={handleOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
            className="overflow-scroll"
        >
            <DialogHeader>Create a new cashier account</DialogHeader>
            <DialogBody divider className="overflow-scroll flex flex-wrap justify-center  gap-10">
                <div className="flex gap-10 w-full justify-center">
                    <div className="w-[200px]">
                        <InputField
                            label={"Username"}
                            name={"username"}
                            value={data.username}
                            onChange={handleDataChange}
                        />
                    </div>
                    <div className="w-[200px]">
                        <InputField
                            label={"Email"}
                            name={"email"}
                            value={data.email}
                            onChange={handleDataChange}
                            error={emailError}
                        />
                    </div>
                </div>
                <div className="flex gap-10 w-full justify-center">
                    <div className="w-[200px]">
                        <InputField type={"password"}
                            label={"Password"}
                            name={"password"}
                            value={data.password}
                            onChange={handleDataChange}
                            error={passwordError}
                        />
                    </div>
                    <div className="w-[200px]">
                        <InputField type={"password"}
                            label={"Confirm password"}
                            name={"confirmPassword"}
                            value={data.confirmPassword}
                            onChange={handleDataChange}
                            error={passwordError}
                        />
                    </div>
                </div>
                <div className="flex ">
                    <div className="flex-1">
                        <InputField
                            type={"file"}
                            label={"Profile Picture (optional)"}
                            name={"image"}
                            onChange={handleDataChange}
                        />
                    </div>
                </div>
            </DialogBody>
            <DialogFooter className="flex justify-between items-center  rounded-b-lg px-5">
                <PrimaryButton
                    label={"Cancel"}
                    variant={"outlined"}
                    classNames={"border-red-500 text-red-500 h-[40px]"}
                    onClick={handleOpen}
                />
                <PrimaryButton
                    label={addingCashier ? <Spinner /> : "Create Account"}
                    classNames='w-[160px] bg-[--primary] h-[40px] flex justify-center items-center p-0'
                    onClick={handleAddCashier}
                />
            </DialogFooter>
        </Dialog>)
}

export default AddCashierModal