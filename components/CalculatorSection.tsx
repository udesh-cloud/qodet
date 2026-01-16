
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, X, Download, ArrowRight, Calculator } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./ui/select";
import { Badge } from "./ui/badge";

interface EstimationData {
  industry: string;
  type: string;
  tags: string[];
}

export const CalculatorSection = (): React.JSX.Element => {
  const [estimationData, setEstimationData] = useState<EstimationData>({
    industry: "",
    type: "",
    tags: [],
  });
  const [currency, setCurrency] = useState<string>("USD");
  const [estimatedCost, setEstimatedCost] = useState<{
    base: number;
    additional: number;
  }>({
    base: 15000,
    additional: 5000,
  });

  // State for the custom multi-select dropdown
  const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
  const tagsDropdownRef = useRef<HTMLDivElement>(null);

  const industryOptions = [
    { value: "healthcare", label: "Healthcare", basePrice: 25000 },
    { value: "fintech", label: "Fintech", basePrice: 35000 },
    { value: "ecommerce", label: "E-commerce", basePrice: 18000 },
    { value: "education", label: "Education", basePrice: 15000 },
    { value: "real-estate", label: "Real Estate", basePrice: 12000 },
    { value: "logistics", label: "Logistics", basePrice: 22000 },
    { value: "entertainment", label: "Entertainment", basePrice: 20000 },
  ];

  const typeOptions = [
    { value: "mobile-app", label: "Mobile App", multiplier: 1.2 },
    { value: "web-app", label: "Web Application", multiplier: 1.0 },
    { value: "iot-system", label: "IoT System", multiplier: 1.8 },
    { value: "ai-solution", label: "AI Solution", multiplier: 2.0 },
    { value: "blockchain", label: "Blockchain", multiplier: 2.2 },
    { value: "mvp", label: "MVP", multiplier: 0.6 },
    { value: "enterprise", label: "Enterprise Solution", multiplier: 1.5 },
  ];

  const tagOptions = [
    { value: "ai-integration", label: "AI Integration", additionalCost: 8000 },
    {
      value: "payment-gateway",
      label: "Payment Gateway",
      additionalCost: 3000,
    },
    { value: "real-time-chat", label: "Real-time Chat", additionalCost: 2500 },
    { value: "analytics", label: "Analytics Dashboard", additionalCost: 4000 },
    {
      value: "third-party-api",
      label: "Third-party API",
      additionalCost: 2000,
    },
    {
      value: "cloud-deployment",
      label: "Cloud Deployment",
      additionalCost: 1500,
    },
    {
      value: "security-features",
      label: "Advanced Security",
      additionalCost: 5000,
    },
  ];

  const currencyOptions = [
    { value: "USD", symbol: "$", rate: 1 },
    { value: "EUR", symbol: "€", rate: 0.85 },
    { value: "GBP", symbol: "£", rate: 0.73 },
    { value: "CAD", symbol: "C$", rate: 1.25 },
  ];

  const calculateEstimate = () => {
    const selectedIndustry = industryOptions.find(
      (opt) => opt.value === estimationData.industry
    );
    const selectedType = typeOptions.find(
      (opt) => opt.value === estimationData.type
    );
    const selectedCurrency = currencyOptions.find(
      (opt) => opt.value === currency
    );

    let baseCost = 0;
    let additionalCost = 0;

    if (selectedIndustry && selectedType && selectedCurrency) {
      const basePrice = selectedIndustry.basePrice * selectedType.multiplier;
      baseCost = Math.round(basePrice * selectedCurrency.rate);

      // Sum up tags
      let totalTagsCost = 0;
      estimationData.tags.forEach((tagValue) => {
        const tag = tagOptions.find((t) => t.value === tagValue);
        if (tag) {
          totalTagsCost += tag.additionalCost;
        }
      });
      additionalCost = Math.round(totalTagsCost * selectedCurrency.rate);
    } else {
      // Dummy/Default values adjusted for currency
       const selectedCurr = currencyOptions.find((opt) => opt.value === currency) || currencyOptions[0];
       baseCost = Math.round(15000 * selectedCurr.rate);
       additionalCost = Math.round(5000 * selectedCurr.rate);
    }

    setEstimatedCost({
      base: baseCost,
      additional: additionalCost,
    });
  };

  useEffect(() => {
    calculateEstimate();
  }, [estimationData, currency]);

  // Handle outside click for tags dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagsDropdownRef.current &&
        !tagsDropdownRef.current.contains(event.target as Node)
      ) {
        setTagsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFieldChange = (field: keyof EstimationData, value: string) => {
    setEstimationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleTag = (value: string) => {
    setEstimationData((prev) => {
      const currentTags = prev.tags;
      if (currentTags.includes(value)) {
        return { ...prev, tags: currentTags.filter((t) => t !== value) };
      } else {
        return { ...prev, tags: [...currentTags, value] };
      }
    });
  };

  const removeTag = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    setEstimationData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== value),
    }));
  };

  const getCurrentCurrencySymbol = () => {
    return currencyOptions.find((opt) => opt.value === currency)?.symbol || "$";
  };

  const getTotalCost = () => {
    return estimatedCost.base + estimatedCost.additional;
  };

  const getSelectedLabel = (field: keyof EstimationData, options: any[]) => {
    // For single select fields (industry, type)
    if (field === 'tags') return '';
    const selectedOption = options.find(
      (opt) => opt.value === estimationData[field]
    );
    return selectedOption ? selectedOption.label : null;
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCostBreakdown = () => {
    window.print();
  };

  return (
    <section id="calculator" className="w-full bg-[#1f1f1f] py-12 md:py-16 px-4 md:px-10">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 mb-12 md:mb-16">
          <h1 className="font-righteous font-normal text-4xl md:text-6xl lg:text-[80px] text-center tracking-[0.80px] leading-tight lg:leading-[80px]">
            <span className="text-[#00f866]">Estimation</span>
            <span className="text-white"> Calculator</span>
          </h1>

          <p className="max-w-[726px] text-lg md:text-2xl text-center leading-[30px] font-poppins font-medium text-[#d5d5d5]">
            Upfront pricing with a clear estimation calculator. Fixed costs,
            accurate timelines, and no hidden surprises.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row items-stretch justify-between w-full gap-8 xl:gap-12">
          {/* Left Column - Form */}
          <div className="flex flex-col w-full xl:w-1/2 gap-6 relative z-30">
            {/* Industry Selection */}
            <div className="flex flex-col gap-3">
              <h2 className="font-righteous font-normal text-[#00f866] text-xl md:text-2xl leading-[22px]">
                Choose Product Industry
              </h2>
              <Select
                value={estimationData.industry}
                onValueChange={(value) => handleFieldChange("industry", value)}
              >
                <SelectTrigger className="group w-full h-14 pl-4 md:pl-6 pr-4 bg-[#202020] rounded-xl border border-solid border-[#393939] flex items-center justify-between hover:border-[#00f866] transition-colors duration-200 focus:ring-0 focus:ring-offset-0 ring-offset-0">
                  <div className="flex-1 text-left truncate mr-2">
                    {estimationData.industry ? (
                      <span className="font-poppins font-medium text-base md:text-lg text-white">
                        {getSelectedLabel("industry", industryOptions)}
                      </span>
                    ) : (
                      <span className="font-poppins font-medium text-base md:text-lg text-[#666666]">
                        e.g., Healthcare, Fintech
                      </span>
                    )}
                  </div>
                  <div className="w-9 h-9 bg-white flex items-center justify-center rounded-lg shadow-sm flex-shrink-0 group-hover:bg-[#00f866] transition-colors duration-200">
                    <ChevronDownIcon className="w-5 h-5 text-black" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#393939] shadow-2xl max-h-[400px] z-[100]">
                  {industryOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white hover:bg-[#00f866] hover:text-black focus:bg-[#00f866] focus:text-black font-poppins font-medium text-base md:text-lg py-3 cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type Selection */}
            <div className="flex flex-col gap-3">
              <h2 className="font-righteous font-normal text-[#00f866] text-xl md:text-2xl leading-[22px]">
                Choose Type
              </h2>
              <Select
                value={estimationData.type}
                onValueChange={(value) => handleFieldChange("type", value)}
              >
                <SelectTrigger className="group w-full h-14 pl-4 md:pl-6 pr-4 bg-[#202020] rounded-xl border border-solid border-[#393939] flex items-center justify-between hover:border-[#00f866] transition-colors duration-200 focus:ring-0 focus:ring-offset-0 ring-offset-0">
                  <div className="flex-1 text-left truncate mr-2">
                    {estimationData.type ? (
                      <span className="font-poppins font-medium text-base md:text-lg text-white">
                        {getSelectedLabel("type", typeOptions)}
                      </span>
                    ) : (
                      <span className="font-poppins font-medium text-base md:text-lg text-[#666666]">
                        e.g., Mobile App, IoT System
                      </span>
                    )}
                  </div>
                  <div className="w-9 h-9 bg-white flex items-center justify-center rounded-lg shadow-sm flex-shrink-0 group-hover:bg-[#00f866] transition-colors duration-200">
                    <ChevronDownIcon className="w-5 h-5 text-black" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#393939] shadow-2xl max-h-[400px] z-[100]">
                  {typeOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white hover:bg-[#00f866] hover:text-black focus:bg-[#00f866] focus:text-black font-poppins font-medium text-base md:text-lg py-3 cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags Selection (Multi-select) */}
            <div className="flex flex-col gap-3 relative" ref={tagsDropdownRef}>
              <h2 className="font-righteous font-normal text-[#00f866] text-xl md:text-2xl leading-[22px]">
                Add Tag Descriptions
              </h2>
              
              <div 
                className={`group w-full min-h-[56px] h-auto pl-4 md:pl-6 pr-4 py-2 bg-[#202020] rounded-xl border border-solid ${tagsDropdownOpen ? 'border-[#00f866]' : 'border-[#393939]'} flex items-center justify-between hover:border-[#00f866] transition-colors duration-200 cursor-pointer`}
                onClick={() => setTagsDropdownOpen(!tagsDropdownOpen)}
              >
                <div className="flex-1 flex flex-wrap gap-2 mr-2">
                  {estimationData.tags.length > 0 ? (
                    estimationData.tags.map(tagValue => {
                      const tagLabel = tagOptions.find(t => t.value === tagValue)?.label;
                      return (
                         <Badge 
                           key={tagValue} 
                           className="bg-[#00f866] text-black hover:bg-[#00f866]/90 px-2 py-1 h-7 rounded-md flex items-center gap-1 text-sm whitespace-nowrap"
                         >
                           {tagLabel}
                           <div 
                             role="button" 
                             className="hover:bg-[#d03e3e] hover:text-white rounded-full p-0.5 transition-colors duration-200"
                             onClick={(e) => removeTag(e, tagValue)}
                           >
                             <X className="w-3 h-3" />
                           </div>
                         </Badge>
                      )
                    })
                  ) : (
                    <span className="font-poppins font-medium text-base md:text-lg text-[#666666]">
                      e.g., AI Integration, Payment Gateway
                    </span>
                  )}
                </div>
                <div className="w-9 h-9 bg-white flex items-center justify-center rounded-lg shadow-sm flex-shrink-0 group-hover:bg-[#00f866] transition-colors duration-200 my-0.5">
                    <ChevronDownIcon className="w-5 h-5 text-black" />
                </div>
              </div>

              {/* Tags Dropdown Menu */}
              {tagsDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#2a2a2a] border border-[#393939] rounded-md shadow-2xl z-[100] flex flex-col">
                  <div className="p-1 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {tagOptions.map((option) => {
                      const isSelected = estimationData.tags.includes(option.value);
                      return (
                        <div
                          key={option.value}
                          onClick={() => toggleTag(option.value)}
                          className={`
                            relative flex w-full cursor-pointer select-none items-center rounded-sm py-2.5 px-3 text-sm md:text-lg outline-none transition-colors 
                            font-poppins font-medium
                            ${isSelected ? 'bg-[#00f866] text-black' : 'text-white hover:bg-[#343339] hover:text-[#00f866]'}
                          `}
                        >
                          {option.label}
                        </div>
                      );
                    })}
                  </div>
                  {/* Done Button Footer */}
                  <div className="p-2 border-t border-[#393939] bg-[#2a2a2a] rounded-b-md">
                    <Button 
                      onClick={() => setTagsDropdownOpen(false)}
                      className="w-full h-10 bg-[#00f866] text-black hover:bg-[#00f866]/90 font-righteous text-sm"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={calculateEstimate}
              className="group relative h-14 w-full px-8 md:px-12 bg-white text-[#202020] rounded-xl shadow-lg mt-2 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-[#00f866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2 font-righteous font-normal text-lg md:text-xl tracking-[-0.32px] group-hover:text-black transition-colors duration-300">
                Generate Estimate <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </Button>
          </div>

          {/* Right Column - Results */}
          <Card className="w-full xl:w-1/2 bg-[#202020] rounded-lg border border-solid border-[#393939] flex flex-col">
            <CardContent className="flex flex-col items-center justify-between flex-grow p-8 md:p-10 relative">
              
              {/* Sleek Minimalist Currency Selector */}
              <div className="absolute top-4 right-6 z-20">
                <Select value={currency} onValueChange={(val) => setCurrency(val)}>
                  <SelectTrigger className="w-auto h-auto p-0 bg-transparent border-none focus:ring-0 focus:ring-offset-0 ring-offset-0 gap-1 group">
                    <span className="font-poppins font-medium text-white/60 group-hover:text-[#00f866] text-sm md:text-base transition-colors duration-200">
                      {currency}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 text-white/60 group-hover:text-[#00f866] transition-colors duration-200" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#393939] z-[100] min-w-[80px]">
                    {currencyOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-white hover:bg-[#00f866] hover:text-black font-poppins text-sm py-2"
                      >
                        {option.symbol} {option.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Top Spacer to push content to middle */}
              <div className="flex-grow flex flex-col justify-center items-center gap-6 w-full">
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-2.5">
                  <span className="font-poppins font-medium text-white text-4xl md:text-[56px] leading-tight">
                    {getCurrentCurrencySymbol()}
                    {estimatedCost.base.toLocaleString()}
                  </span>
                  <span className="text-white text-2xl md:text-[35px]">+</span>
                  <span className="font-poppins font-medium text-white text-4xl md:text-[56px] leading-tight">
                    {getCurrentCurrencySymbol()}
                    {estimatedCost.additional.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <h3 className="font-righteous font-normal text-[#00f866] text-xl md:text-[24px] leading-tight text-center">
                    Your Estimated Cost: {getCurrentCurrencySymbol()}
                    {getTotalCost().toLocaleString()}
                  </h3>
                  <p className="max-w-[422px] font-poppins font-medium text-[#d5d5d5] text-sm md:text-base text-center leading-relaxed">
                    This is an approximate estimate. For a detailed quote,
                    contact our team.
                  </p>
                </div>
              </div>

              {/* Action Buttons - Pushed to bottom */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-6">
                <Button
                  onClick={scrollToContact}
                  className="group relative w-full sm:w-auto h-12 px-8 bg-white text-[#202020] rounded-lg shadow-md overflow-hidden transition-colors duration-300"
                >
                   <div className="absolute inset-0 bg-[#00f866] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                   <span className="relative z-10 flex items-center gap-2 font-righteous font-normal text-base tracking-[-0.32px] group-hover:text-black transition-colors duration-300">
                    Contact Us <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                   </span>
                </Button>
                <Button
                  onClick={handleCostBreakdown}
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 bg-transparent border border-[#00f866] rounded-lg flex items-center justify-center gap-2.5 text-[#00f866] hover:bg-[#00f866] hover:text-black transition-colors duration-300 group font-righteous font-normal text-base tracking-[-0.32px]"
                >
                    Cost Breakdown
                  <Download className="w-5 h-5 text-[#00f866] group-hover:text-black transition-colors duration-300 group-hover:animate-bounce" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
