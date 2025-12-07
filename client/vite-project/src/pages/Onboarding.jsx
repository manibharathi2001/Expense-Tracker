import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Wallet, TrendingUp, PieChart } from 'lucide-react';

const Onboarding = () => {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const slides = [
        {
            icon: <Wallet className="w-24 h-24 text-blue-500 mb-6" />,
            title: "Track Your Expenses",
            description: "Keep track of every penny you spend and manage your budget effectively.",
            color: "bg-blue-50"
        },
        {
            icon: <TrendingUp className="w-24 h-24 text-green-500 mb-6" />,
            title: "Visualize Your Growth",
            description: "See your financial growth over time with intuitive charts and graphs.",
            color: "bg-green-50"
        },
        {
            icon: <PieChart className="w-24 h-24 text-purple-500 mb-6" />,
            title: "Smart Categorization",
            description: "Automatically categorize your expenses to understand your spending habits.",
            color: "bg-purple-50"
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-lg p-8">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="outline-none">
                            <div className={`flex flex-col items-center justify-center text-center p-10 rounded-3xl ${slide.color} h-96`}>
                                {slide.icon}
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">{slide.title}</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
