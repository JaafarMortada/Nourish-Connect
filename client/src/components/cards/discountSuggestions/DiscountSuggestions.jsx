import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Spinner,

} from "@material-tailwind/react";
import PrimaryButton from "../../ui/Button";
import { useEffect, useState, useRef } from "react";
import { sendRequest } from "../../../config/request";
import DiscountSuggestionCard from "../miniCards/DiscountSuggestionCard";
import { loadingSuggestionsText } from "../../../constants";
import Typed from 'typed.js';

const DiscountSuggestions = () => {

    const [suggestionsData, setSuggestionsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingSuggestions, setLoadingSuggestions] = useState(false)

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
                setLoadingSuggestions(false)

            } 
        } catch (error) {
            
        }
    }

    const generateSuggestions = async () => {
        setLoadingSuggestions(true)
        try {
            const response = await sendRequest({
                method: "GET",
                route: "/api/manager/get_suggestions/discounts",
            });
            if (response.message === "success") {
                getDiscountsSuggestions()
            } else {
                setLoading(false)
                setLoadingSuggestions(false)
            }
        } catch (error) {
            setLoadingSuggestions(false)
        }
    }

    useEffect(() => {
        getDiscountsSuggestions()
    }, [])

    const loadingRef = useRef(null)
    useEffect(() => {
        const options = {
            strings: loadingSuggestionsText,
            typeSpeed: 25,
            backSpeed: 0,
            bindInputFocusEvents: true,
            loop: false,
            cursorChar: '<span class="typed-cursor"></span>',
            backDelay: 4500,
            startDelay: 0,

        };

        if (loadingRef.current) {
            const typed = new Typed(loadingRef.current, options);

            return () => {
                typed.destroy();
            };
        }
    }, [loadingSuggestions]);


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
                    loadingSuggestions ? 
                    <div className=" flex flex-col min-h-full m-auto items-center justify-center gap-5 min-w-[500px]">
                        <Spinner className="w-20 h-20" /> 
                        <p ref={loadingRef} className="font-normal text-black min-h-[20px] text-[16px]"> </p>
                    </div>
                    :
                    
                    loading ? <Spinner className="w-20 h-20" /> 
                    : 
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