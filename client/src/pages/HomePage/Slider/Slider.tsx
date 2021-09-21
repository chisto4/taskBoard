import { useState, useEffect } from "react"
// import slide1 from "../../../image/sliderImage/slide1.png"
import slide2 from "../../../image/sliderImage/slide2.png"
import slide3 from "../../../image/sliderImage/slide3.png"
import slide4 from "../../../image/sliderImage/slide4.png"
import slide5 from "../../../image/sliderImage/slide5.png"
import slide6 from "../../../image/sliderImage/slide6.png"
import slide7 from "../../../image/sliderImage/slide7.png"
import slide8 from "../../../image/sliderImage/slide8.png"
import "./styleSlider.css"

const img = [
    // <img key={slide1} src={slide1} alt="slide"/>,
    <img key={slide2} src={slide2} alt="slide" />,
    <img key={slide3} src={slide3} alt="slide" />,
    <img key={slide4} src={slide4} alt="slide" />,
    <img key={slide5} src={slide5} alt="slide" />,
    <img key={slide6} src={slide6} alt="slide" />,
    <img key={slide7} src={slide7} alt="slide" />,
    <img key={slide8} src={slide8} alt="slide" />,
]

export function Slider() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setActiveIndex((current) => {
                const res = current === img.length - 1 ? 0 : current + 1
                return res
            })
        }, 3000)
        return () => clearInterval()
    }, [])

    const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1
    const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1

    return (
        <div className="slider">
            <div className="slider-img slider-img-prev"
                key={prevImgIndex}>
                {img[prevImgIndex]}
            </div>
            <div className="slider-img"
                key={activeIndex}>
                {img[activeIndex]}
            </div>
            <div className="slider-img slider-img-next"
                key={nextImgIndex}>
                {img[nextImgIndex]}
            </div>
        </div>
    )
}

export default Slider
