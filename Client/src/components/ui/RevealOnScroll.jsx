
import { useEffect, useRef, useState } from "react";

const RevealOnScroll = ({ children, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onWindScroll = () => {
            const element = ref.current;
            if (element) {
                const { top } = element.getBoundingClientRect();
                const isVisible = top < window.innerHeight;
                setIsVisible(isVisible);
            }
        };

        window.addEventListener("scroll", onWindScroll);
        return () => {
            window.removeEventListener("scroll", onWindScroll);
        };
    }, []);

    const classes = `transition-all duration-1000 w-full flex
        ${index % 2 === 0 ? "justify-end" : ""}
        ${isVisible ? "opacity-100 translate-x-[-200px]" : "opacity-0"
        }`;

    return (
        <div ref={ref} className={classes}>
            {children}
        </div>
    );
};

export default RevealOnScroll