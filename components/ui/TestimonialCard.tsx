import React from "react";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    image: string;
    text: string;
    rating: number;
    source: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="flex w-100">
      <div className="bg-[#21252a] rounded-2xl p-8 min-h-[300px] flex-shrink-0 w-[400px] shadow-lg">
        <div className="">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-600">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">
                {testimonial.name}
              </h4>
            </div>
          </div>

          <div className="mb-6">
            <svg
              className="w-8 h-8 text-gray-500 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
            <p className="text-gray-300 leading-relaxed text-lg">
              {testimonial.text}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center mr-3">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-semibold ml-1">
                  {testimonial.rating}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                from {testimonial.source}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
