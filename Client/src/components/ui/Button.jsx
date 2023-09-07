import { Button } from "@material-tailwind/react";

const PrimaryButton = ({ classNames, label, onClick }) => {
    return (
        <Button
            className={classNames}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}

export default PrimaryButton;