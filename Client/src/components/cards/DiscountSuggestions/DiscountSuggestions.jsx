import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Spinner,

} from "@material-tailwind/react";
import PrimaryButton from "../../ui/Button";
import { useEffect, useState } from "react";
import { sendRequest } from "../../../config/request";
import DiscountSuggestionCard from "../miniCards/DiscountSuggestionCard";

const DiscountSuggestions = () => {

    const [suggestionsData, setSuggestionsData] = useState([])
    const [loading, setLoading] = useState(true)

    const removeApprovedSuggestion = (suggestionId) => {
        const updatedSuggestions = suggestionsData.filter(
            (suggestion) => suggestion.discount_suggestion_id !== suggestionId
        );
        setSuggestionsData(updatedSuggestions);
    };

    const getDiscountsSuggestions = async () => {
        try {
            const response = await sendRequest({
                method: "GET",
                route: "/api/manager/get_discounts_suggestions",
            });
            if (response.message === "success") {
                setSuggestionsData(response.discount_suggestions);
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const generateSuggestions = async () => {
        setLoading(true)
        try {
            const response = await sendRequest({
                method: "GET",
                route: "/api/manager/get_suggestions/discounts",
            });
            if (response.message === "success") {
                getDiscountsSuggestions()
            } else {
                setLoading(false)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDiscountsSuggestions()
    }, [])

    return (
        <>
            <Card className={`flex min-h-[350px] w-[95%] ${loading ? "items-center justify-center" : ""}`}>
                {loading ? null : <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className=" flex items-center justify-between">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Discounts Suggestions
                            </Typography>
                        </div>
                        <PrimaryButton classNames="flex items-center bg-[--primary]" size="sm" label='Generate New' onClick={generateSuggestions} />
                    </div>
                </CardHeader>}

                {
                    loading ? <Spinner className="w-20 h-20" /> :
                        suggestionsData.length === 0
                            ?
                            <div className="flex flex-1 h-full justify-center items-center">
                                <Typography color="gray" className="mt-1 font-normal text-center">
                                    No suggestions found.<br />Click on the button to generate new suggestions.
                                </Typography>
                            </div>
                            :
                            <CardBody className=" px-5 flex  flex-1 ">
                                <div className={`w-full h-full flex gap-5 overflow-scroll rounded-sm `}>
                                    {
                                        suggestionsData.map((suggestion, index) => (
                                            <DiscountSuggestionCard
                                                key={index}
                                                data={suggestion}
                                                removeApproved={removeApprovedSuggestion}
                                            />
                                        ))
                                    }

                                </div>
                            </CardBody>
                }
            </Card>
        </>
    );
}

export default DiscountSuggestions