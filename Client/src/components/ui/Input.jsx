import { Input } from "@material-tailwind/react";

const InputField = ({ name, type, label, value, onChange, error=false }) => {
    return (
        <Input
            variant="standard"
            name={name}
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            color='teal'
            error={error}
        />
    )
}

export default InputField;