import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PrimaryButton from "./Button";

const ErrorDialog = ({open, handleOpen, title, message }) => {
  return (
    <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>{title}</DialogHeader>
        <DialogBody divider>
          {message}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          <PrimaryButton classNames={"bg-[--primary]"} onClick={handleOpen} label={"Confirm"}/>
        </DialogFooter>
      </Dialog>
  )
}

export default ErrorDialog