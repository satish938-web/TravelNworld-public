// src/data/internationalItineraryData.js

import dubaiImg from "../assets/images/tourPackages/international/dubai.jpeg";
import vietnamImg from "../assets/images/tourPackages/international/vietnam.jpeg";
import parisImg from "../assets/images/tourPackages/international/paris.jpeg";
import maldiveImg from "../assets/images/tourPackages/international/maldive.jpeg";
import thailandImg from "../assets/images/tourPackages/international/thailand.png";
import singaporeImg from "../assets/images/tourPackages/international/singapore.png";
import baliImg from "../assets/images/tourPackages/international/bali .png";
import londonImg from "../assets/images/tourPackages/international/london.png";
import romeImg from "../assets/images/tourPackages/international/rome.png";
import switzerlandImg from "../assets/images/tourPackages/international/switzerland.png";
import turkeyImg from "../assets/images/tourPackages/international/turkey.png";
import greeceImg from "../assets/images/tourPackages/international/greece.png";
import newyorkImg from "../assets/images/tourPackages/international/US.png";
import tokyoImg from "../assets/images/tourPackages/international/tokyo.png";
import sydneyImg from "../assets/images/tourPackages/international/sydney.png";
import egyptImg from "../assets/images/tourPackages/international/egypt.png";

const internationalItineraryData = {
  "dubai": [
    {
      id: 1,
      name: "Dubai Luxury Tour",
      title: "5 Days - Luxury Shopping",
      image: dubaiImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 2,
      name: "Family Fun in Dubai",
      title: "4 Days - Theme Parks & Burj Khalifa",
      image: dubaiImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 1,
      name: "Dubai Luxury Tour",
      title: "5 Days:Desert Safari",
      image: dubaiImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 2,
      name: "Family Fun in Dubai",
      title: "4 Days - Theme Parks & Burj Khalifa",
      image: dubaiImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "vietnam": [
    {
      id: 3,
      name: "Vietnam Heritage Trail",
      title: "6 Days - Hanoi to Ho Chi Minh",
      image: vietnamImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 4,
      name: "Vietnam Beaches",
      title: "5 Days - Da Nang & Hoi An",
      image: vietnamImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 3,
      name: "Vietnam Heritage Trail",
      title: "6 Days - Hanoi to Ho Chi Minh",
      image: vietnamImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 4,
      name: "Vietnam Beaches",
      title: "5 Days - Da Nang & Hoi An",
      image: vietnamImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "paris": [
    {
      id: 5,
      name: "Romantic Paris",
      title: "4 Days - Eiffel Tower & Seine River Cruise",
      image: parisImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 6,
      name: "Paris Culture Tour",
      title: "5 Days - Museums & Local Cuisine",
      image: parisImg,
    },
    {
      id: 5,
      name: "Romantic Paris",
      title: "4 Days - Eiffel Tower & Seine River Cruise",
      image: parisImg,
      details: [
      { title: "Arrival & Leisure", description: "Transfer to hotel and relax." },
      { title: "Theme Park Day", description: "Visit IMG Worlds of Adventure or Motiongate." },
      { title: "Burj Khalifa & Fountain Show", description: "Visit 124th floor and watch Dubai Fountain." },
      { title: "Departure", description: "Breakfast and transfer to airport." }
    ],
    inclusions: [
      "3 Nights Accommodation",
      "Entry Tickets to Parks",
      "Burj Khalifa Entry",
      "Daily Breakfast",
      "Airport Transfers"
    ],
    exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 6,
      name: "Paris Culture Tour",
      title: "5 Days - Museums & Local Cuisine",
      image: parisImg,
    },
  ],
  "maldives": [
    {
      id: 7,
      name: "Maldives Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: maldiveImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in Maldives",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: maldiveImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "Maldives Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: maldiveImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in Maldives",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: maldiveImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "thailand": [
    {
      id: 7,
      name: "thailand Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: thailandImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in thailand",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: thailandImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "thailand Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: thailandImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in thailand",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: thailandImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "singapore": [
    {
      id: 7,
      name: "singapore Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: singaporeImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in singapore",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: singaporeImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "singapore Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: singaporeImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in singapore",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: singaporeImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "bali": [
    {
      id: 7,
      name: "bali Honeymoon",
      title: "5 Days -Overwater Villas & Private Beaches",
      image: baliImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in bali",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: baliImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "bali Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: baliImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in bali",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: baliImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "london": [
    {
      id: 7,
      name: "london Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: londonImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in london",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: londonImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "london Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: londonImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in london",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: londonImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "rome": [
    {
      id: 7,
      name: "rome Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: romeImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in rome",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: romeImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "rome Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: romeImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in rome",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: romeImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "switzerland": [
    {
      id: 7,
      name: "switzerland Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: switzerlandImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in switzerland",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: switzerlandImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "Maldives Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: switzerlandImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in Maldives",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: switzerlandImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "turkey": [
    {
      id: 7,
      name: "turkey Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: turkeyImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in turkey",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: turkeyImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "turkey Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: turkeyImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in turkey",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: turkeyImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "greece": [
    {
      id: 7,
      name: "greece Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: greeceImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in greece",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: greeceImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "greece Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: greeceImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in greece",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: greeceImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "new-york": [
    {
      id: 7,
      name: "new-york Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: newyorkImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in new-york",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: newyorkImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "new-york Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: newyorkImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in new-york",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: newyorkImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "tokyo": [
    {
      id: 7,
      name: "tokyo Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: tokyoImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in tokyo",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: tokyoImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "tokyo Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: tokyoImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in tokyo",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: tokyoImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "sydney": [
    {
      id: 7,
      name: "sydney Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: sydneyImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in sydney",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: sydneyImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "sydney Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: sydneyImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in sydney",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: sydneyImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
  "egypt": [
    {
      id: 7,
      name: "egypt Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: egyptImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in egypt",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: egyptImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 7,
      name: "egypt Honeymoon",
      title: "5 Days - Overwater Villas & Private Beaches",
      image: egyptImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
    {
      id: 8,
      name: "Adventure in egypt",
      title: "4 Days - Diving, Snorkeling & Jet Skiing",
      image: egyptImg,
      details: [
        { title: "Arrival in Dubai", description: "Transfer to hotel and rest." },
        { title: "City Tour", description: "Explore Dubai Marina, Palm Jumeirah, and Dubai Mall." },
        { title: "Desert Safari", description: "Enjoy dune bashing, camel ride, and BBQ dinner." },
        { title: "Shopping Day", description: "Visit local souks and luxury shopping malls." },
        { title: "Departure", description: "Check out and transfer to the airport." }
      ],
      inclusions: [
        "4 Nights Hotel Stay",
        "Daily Breakfast",
        "Airport Transfers",
        "City Tour",
        "Desert Safari with BBQ",
        "All Applicable Taxes"
      ],
      exclusions: [
        "International Airfare",
        "Visa Fees",
        "Personal Expenses",
        "Travel Insurance",
        "Tips and Gratuities"
      ],
      terms: "Booking must be confirmed at least 15 days prior to departure. Prices are subject to change based on availability.",
      cancellation: "Full refund if cancelled 10 days prior to departure. 50% refund if cancelled 5 days before. No refund thereafter.",
      paymentPolicy: "50% advance payment required to confirm booking. Balance payable 7 days before departure."
    },
  ],
};

export default internationalItineraryData;
