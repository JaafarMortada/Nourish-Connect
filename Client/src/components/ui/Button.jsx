import { Button } from "@material-tailwind/react";

const PrimaryButton = ({ classNames, label, onClick, disabled=false, variant }) => {
    return (
        <Button
            variant={variant}
            className={`flex justify-center items-center ${classNames}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </Button>
    );
}

export default PrimaryButton;