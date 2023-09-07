import { Input } from "@material-tailwind/react";

const InputField = ({ type, label, value, onChange, }) => {
    return (
        <Input
            variant="standard"
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            color='teal'
        />
    )
}

export default InputField;