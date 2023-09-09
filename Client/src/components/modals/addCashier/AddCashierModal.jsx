import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import PrimaryButton from "../../ui/Button";
import InputField from "../../ui/Input";
const AddCashierModal = ({ open, handleOpen }) => {

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
                <div className="flex gap-10 ">
                    <div className="w-[200px]">
                        <InputField label={"Username"} />
                    </div>
                    <div className="w-[200px]">
                        <InputField label={"Email"} />
                    </div>
                </div>
                <div className="flex gap-10 ">
                    <div className="w-[200px]">
                        <InputField type={"password"} label={"Password"} />
                    </div>
                    <div className="w-[200px]">
                        <InputField type={"password"} label={"Confirm password"} />
                    </div>
                </div>
                <div className="flex gap-10 ">
                    <div className="w-[200px]">
                        <InputField label={"Latitude"} />
                    </div>
                    <div className="w-[200px]">
                        <InputField label={"Longitude"} />
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
                <PrimaryButton label={"Create Account"} classNames={"bg-[--primary]"}/>
            </DialogFooter>
        </Dialog>)
}

export default AddCashierModal