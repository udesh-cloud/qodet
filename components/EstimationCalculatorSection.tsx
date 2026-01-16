
"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const EstimationCalculatorSection = (): React.JSX.Element => {
  const [openItems, setOpenItems] = useState<string>("item-0");

  const faqItems = [
    {
      question: "How do I get started with Qodet?",
      answer:
        "Getting started with Qodet is simple! First, use our estimation calculator to get an upfront quote for your project. Then, schedule a consultation call where we'll discuss your requirements in detail. Our team will provide you with a comprehensive project plan, timeline, and fixed-cost proposal with no hidden surprises.",
    },
    {
      question: "What are the services Qodet provides?",
      answer:
        "Qodet offers comprehensive development services including AI-powered development, custom web and mobile applications, MVP development, enterprise solutions, IoT systems, machine learning integration, and full-stack development. We specialize in cutting-edge technologies and provide end-to-end solutions from concept to deployment.",
    },
    {
      question: "How does your pricing model work?",
      answer:
        "We believe in transparent, upfront pricing. Our estimation calculator provides you with accurate cost estimates based on your project requirements. We offer fixed-cost pricing with clear timelines and no hidden fees. You'll know exactly what you're paying for before we start any work.",
    },
    {
      question: "What makes Qodet different from other development agencies?",
      answer:
        "Qodet stands out through our commitment to transparency, accountability, and efficiency. We provide upfront pricing, take full ownership of project lifecycles, and leverage AI-powered development tools to deliver faster, more reliable results. Our focus is on building long-term partnerships with measurable business outcomes.",
    },
  ];

  const handleAccordionChange = (value: string) => {
    setOpenItems(value);
  };

  return (
    <section className="w-full bg-[#1f1f1f] py-16 px-4 md:px-10">
      <div className="max-w-[1360px] mx-auto">
        <h2 className="font-righteous font-normal text-[#00f866] text-5xl md:text-[80px] tracking-[0.80px] leading-tight md:leading-[80px] mb-10 text-center md:text-left">
          FAQ
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-10 w-full">
          {/* Visual Card */}
          <div className="w-full lg:w-[500px] flex justify-center flex-shrink-0">
            <Card className="w-full max-w-[500px] lg:max-w-none aspect-square lg:aspect-auto lg:h-full bg-[#202020] rounded-lg border border-solid border-[#393939] flex items-center justify-center overflow-hidden">
              <svg
                width="193"
                height="394"
                viewBox="0 0 193 394"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-[80%]"
              >
                <rect
                  x="65"
                  y="294.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 65 294.793)"
                  fill="#00885A"
                />
                <rect
                  x="65"
                  y="229.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 65 229.793)"
                  fill="#00885A"
                />
                <rect
                  x="65"
                  y="393.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 65 393.793)"
                  fill="#00885A"
                />
                <rect
                  x="130"
                  y="229.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 130 229.793)"
                  fill="#00885A"
                />
                <rect
                  x="129"
                  y="164.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 129 164.793)"
                  fill="#00885A"
                />
                <rect
                  y="99.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 0 99.793)"
                  fill="#00885A"
                />
                <rect
                  x="64.793"
                  y="99.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 64.793 99.793)"
                  fill="#00885A"
                />
                <rect
                  x="129.586"
                  y="99.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 129.586 99.793)"
                  fill="#00885A"
                />
                <rect
                  x="65"
                  y="277.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 65 277.793)"
                  fill="#00F866"
                />
                <rect
                  x="65"
                  y="202.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 65 202.793)"
                  fill="#00F866"
                />
                <rect
                  x="65"
                  y="382.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 65 382.793)"
                  fill="#00F866"
                />
                <rect
                  x="130"
                  y="212.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 130 212.793)"
                  fill="#00F866"
                />
                <rect
                  x="129"
                  y="145.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 129 145.793)"
                  fill="#00F866"
                />
                <rect
                  y="82.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 0 82.793)"
                  fill="#00F866"
                />
                <rect
                  x="64.793"
                  y="62.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 64.793 62.793)"
                  fill="#00F866"
                />
                <rect
                  x="129.586"
                  y="72.793"
                  width="62.793"
                  height="62.793"
                  rx="4.32208"
                  transform="rotate(-90 129.586 72.793)"
                  fill="#00F866"
                />
              </svg>
            </Card>
          </div>

          {/* Accordion */}
          <div className="w-full lg:flex-1">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={openItems}
              onValueChange={handleAccordionChange}
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0"
                >
                  <AccordionTrigger className="py-6 hover:no-underline [&>svg]:text-black [&>svg]:h-6 [&>svg]:w-6 [&>svg]:bg-white [&>svg]:rounded-lg [&>svg]:p-1 [&>svg]:transition-transform [&>svg]:duration-200">
                    <span className="font-righteous font-normal text-white text-xl md:text-[28px] leading-tight md:leading-[35px] text-left hover:text-[#00f866] transition-colors duration-200 pr-4">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-base md:text-xl leading-[28px] font-poppins font-medium text-[#d5d5d5]">
                      {item.answer}
                    </p>
                  </AccordionContent>
                  <div className="w-full h-px bg-[#393939] mt-4"></div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button className="bg-white text-[#202020] hover:bg-white/90 h-12 px-8 py-4 rounded-lg transition-colors duration-200">
            <span className="font-righteous font-normal text-base tracking-[-0.32px]">
              Write to Us
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
