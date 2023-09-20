import { useNavigate } from "react-router-dom"
import PrimaryButton from "../ui/Button"

const CTA = ({ label }) => {
    const navigate = useNavigate()
    return (
        <PrimaryButton
            label={label}
            classNames={"bg-[--primary] min-w-[150px] min-h-16 text-[21px] font-normal"}
            onClick={() => navigate('/auth/signup')}
        />
    )
}

export default CTA