import { Button } from "@material-tailwind/react";

const PrimaryButton = ({ classNames, label, onClick, disabled=false }) => {
    return (
        <Button
            className={classNames}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </Button>
    );
}

export default PrimaryButton;