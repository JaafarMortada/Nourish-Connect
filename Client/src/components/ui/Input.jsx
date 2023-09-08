import { Input } from "@material-tailwind/react";

const InputField = ({ name, type, label, value, onChange, error=false }) => {
    return (
        <Input
            variant="standard"
            name={name}
            className=" focus:!border-[--accent]"
            labelProps={
                {className: "peer-focus:!text-[--primary] peer-focus:after:!border-[--primary]"}
            }
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            error={error}
        />
    )
}

export default InputField;