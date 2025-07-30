import { useSpring, animated, useTransition } from "@react-spring/web";
import { useState } from "react";

import Person1Image from "../../public/person1.jpg";
import Person2Image from "../../public/person2.jpg";
import Person3Image from "../../public/person3.jpg";
import Person4Image from "../../public/person4.jpg";

// React Spring version - much smoother performance
const TestimonialSection = () => {
  const [curr, setCurr] = useState(1);

  const testimonialData = [
    {
      id: 1,
      image: Person1Image,
      name: "Somali Gor",
      description:
        "Lead frontend developer. Passionate about building beautiful, user-friendly interfaces.",
    },
    // ... other testimonials
  ];

  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 300, friction: 30 },
  });

  const buttonHover = useSpring({
    transform: "scale(1)",
    config: { tension: 400, friction: 10 },
  });

  const transitions = useTransition(curr, {
    from: { opacity: 0, transform: "translateX(-10px)" },
    enter: { opacity: 1, transform: "translateX(0px)" },
    leave: { opacity: 0, transform: "translateX(-10px)" },
    config: { tension: 300, friction: 25 },
  });

  return (
    <animated.div style={fadeIn} className="flex w-full justify-center gap-3">
      {testimonialData.map((person) => (
        <div
          key={person.id}
          onMouseEnter={() => setCurr(person.id)}
          className="flex gap-2 cursor-pointer max-md:justify-center"
        >
          <img
            src={person.image}
            className="w-14 h-14 object-cover rounded-full"
            alt={person.name}
          />
          {transitions((style, item) =>
            item === person.id ? (
              <animated.div style={style} className="flex flex-col">
                <p className="font-semibold">{person.name}</p>
                <p className="w-80 text-sm">{person.description}</p>
              </animated.div>
            ) : null
          )}
        </div>
      ))}

      <animated.button
        style={buttonHover}
        onMouseEnter={() => buttonHover.start({ transform: "scale(1.05)" })}
        onMouseLeave={() => buttonHover.start({ transform: "scale(1)" })}
        className="text-white cursor-pointer bg-black px-6 h-12 mt-1 rounded-3xl py-2 text-sm"
      >
        Get Started
      </animated.button>
    </animated.div>
  );
};

export default TestimonialSection;
