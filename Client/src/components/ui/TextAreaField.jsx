import { Textarea } from "@material-tailwind/react"

const TextAreaField = ( {label, name, value, onChange} ) => {
  return (
    <Textarea 
      variant="standard"
      label={label}
      className=" focus:!border-[--accent]"
      labelProps={
        {className: "peer-focus:!text-[--primary] peer-focus:after:!border-[--primary]"}
      }
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default TextAreaField