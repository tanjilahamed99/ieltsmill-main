"use client";
import React, { useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────
//  VOCABULARY DATA  (word | Bengali meaning)
// ─────────────────────────────────────────────────────────────────

const categories = [
  {
    id: "days",
    label: "Days of the Week",
    emoji: "📅",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-500 to-orange-500",
      light: "bg-red-50 border-red-100",
    },
    words: [
      ["Monday", "সোমবার"],
      ["Tuesday", "মঙ্গলবার"],
      ["Wednesday", "বুধবার"],
      ["Thursday", "বৃহস্পতিবার"],
      ["Friday", "শুক্রবার"],
      ["Saturday", "শনিবার"],
      ["Sunday", "রবিবার"],
      ["weekdays", "সপ্তাহের কার্যদিন"],
      ["weekend", "সাপ্তাহিক ছুটি"],
    ],
  },
  {
    id: "months",
    label: "Months of the Year",
    emoji: "🗓️",
    color: {
      tag: "bg-orange-100 text-orange-700",
      accent: "from-orange-500 to-amber-500",
      light: "bg-orange-50 border-orange-100",
    },
    words: [
      ["January", "জানুয়ারি"],
      ["February", "ফেব্রুয়ারি"],
      ["March", "মার্চ"],
      ["April", "এপ্রিল"],
      ["May", "মে"],
      ["June", "জুন"],
      ["July", "জুলাই"],
      ["August", "আগস্ট"],
      ["September", "সেপ্টেম্বর"],
      ["October", "অক্টোবর"],
      ["November", "নভেম্বর"],
      ["December", "ডিসেম্বর"],
    ],
  },
  {
    id: "money",
    label: "Money Matters",
    emoji: "💰",
    color: {
      tag: "bg-amber-100 text-amber-700",
      accent: "from-amber-500 to-yellow-500",
      light: "bg-amber-50 border-amber-100",
    },
    words: [
      ["cash", "নগদ অর্থ"],
      ["debit", "ডেবিট"],
      ["credit card", "ক্রেডিট কার্ড"],
      ["cheque", "চেক"],
      ["in advance", "অগ্রিম"],
      ["annual fee", "বার্ষিক ফি"],
      ["monthly membership", "মাসিক সদস্যপদ"],
      ["interest rate", "সুদের হার"],
      ["deposit", "আমানত"],
      ["tuition fees", "টিউশন ফি"],
      ["poverty", "দারিদ্র্য"],
      ["bank statement", "ব্যাংক বিবরণী"],
      ["money management", "অর্থ ব্যবস্থাপনা"],
      ["current account", "চলতি হিসাব"],
      ["student account", "শিক্ষার্থী হিসাব"],
      ["withdraw", "উত্তোলন করা"],
      ["low-risk investment", "কম-ঝুঁকির বিনিয়োগ"],
      ["mortgage", "বন্ধক"],
      ["grace period", "ছাড়ের সময়"],
      ["budget deficit", "বাজেট ঘাটতি"],
      ["retail voucher", "খুচরা ভাউচার"],
      ["coupon", "কুপন"],
      ["counterfeit money", "জাল অর্থ"],
      ["public money", "জনগণের অর্থ"],
      ["taxpayers' money", "করদাতার অর্থ"],
      ["debt", "ঋণ"],
      ["interest-free credit", "সুদমুক্ত ক্রেডিট"],
      ["purchase", "ক্রয়"],
      ["partial refund", "আংশিক ফেরত"],
      ["annuity", "বার্ষিকী"],
      ["non-refundable", "অফেরতযোগ্য"],
      ["MasterCard", "মাস্টারকার্ড"],
      ["VISA", "ভিসা"],
      ["distribution costs", "বিতরণ খরচ"],
      ["income", "আয়"],
      ["finance department", "অর্থ বিভাগ"],
      ["family finances", "পারিবারিক আর্থিক বিষয়"],
      ["duty-free store", "শুল্কমুক্ত দোকান"],
    ],
  },
  {
    id: "subjects",
    label: "Academic Subjects",
    emoji: "📚",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-500 to-rose-500",
      light: "bg-red-50 border-red-100",
    },
    words: [
      ["science", "বিজ্ঞান"],
      ["politics", "রাজনীতি"],
      ["history", "ইতিহাস"],
      ["biology", "জীববিজ্ঞান"],
      ["architecture", "স্থাপত্য"],
      ["law", "আইন"],
      ["geography", "ভূগোল"],
      ["archaeology", "প্রত্নতত্ত্ব"],
      ["literature", "সাহিত্য"],
      ["business management", "ব্যবসা ব্যবস্থাপনা"],
      ["agriculture", "কৃষি"],
      ["statistics", "পরিসংখ্যান"],
      ["mathematics", "গণিত"],
      ["logic", "যুক্তিবিদ্যা"],
      ["physics", "পদার্থবিজ্ঞান"],
      ["psychology", "মনোবিজ্ঞান"],
      ["anthropology", "নৃবিজ্ঞান"],
      ["economics", "অর্থনীতি"],
      ["philosophy", "দর্শন"],
      ["performing arts", "সংগীত ও নাট্যকলা"],
      ["visual arts", "চিত্রকলা"],
      ["chemistry", "রসায়ন"],
      ["humanities", "মানবিক বিজ্ঞান"],
    ],
  },
  {
    id: "university",
    label: "Studying at College / University",
    emoji: "🎓",
    color: {
      tag: "bg-orange-100 text-orange-700",
      accent: "from-orange-500 to-red-500",
      light: "bg-orange-50 border-orange-100",
    },
    words: [
      ["course outline", "কোর্স রূপরেখা"],
      ["group discussion", "দলীয় আলোচনা"],
      ["handout", "হ্যান্ডআউট"],
      ["written work", "লিখিত কাজ"],
      ["report writing", "প্রতিবেদন লেখা"],
      ["research", "গবেষণা"],
      ["proofreading", "প্রুফ সংশোধন"],
      ["experiment", "পরীক্ষা-নিরীক্ষা"],
      ["experience", "অভিজ্ঞতা"],
      ["reference", "তথ্যসূত্র"],
      ["textbook", "পাঠ্যপুস্তক"],
      ["dictionary", "অভিধান"],
      ["laptop", "ল্যাপটপ"],
      ["printer", "প্রিন্টার"],
      ["student advisor", "শিক্ষার্থী উপদেষ্টা"],
      ["teamwork", "দলীয় কাজ"],
      ["module", "মডিউল"],
      ["topic", "বিষয়"],
      ["assessment", "মূল্যায়ন"],
      ["library", "গ্রন্থাগার"],
      ["department", "বিভাগ"],
      ["computer centre", "কম্পিউটার কেন্দ্র"],
      ["classroom", "শ্রেণিকক্ষ"],
      ["lecture", "বক্তৃতা"],
      ["tutor", "গৃহশিক্ষক"],
      ["main hall", "প্রধান হল"],
      ["attendance", "উপস্থিতি"],
      ["deadline", "সময়সীমা"],
      ["give a talk", "বক্তব্য দেওয়া"],
      ["speech", "ভাষণ"],
      ["computer laboratory", "কম্পিউটার ল্যাব"],
      ["certificate", "সনদ"],
      ["diploma", "ডিপ্লোমা"],
      ["placement test", "প্লেসমেন্ট পরীক্ষা"],
      ["overseas students", "বিদেশি শিক্ষার্থী"],
      ["full-time", "পূর্ণকালীন"],
      ["facilities", "সুযোগ-সুবিধা"],
      ["college", "কলেজ"],
      ["dining room", "ডাইনিং রুম"],
      ["specialist", "বিশেষজ্ঞ"],
      ["knowledge", "জ্ঞান"],
      ["international", "আন্তর্জাতিক"],
      ["accommodation", "আবাসন"],
      ["home stay", "হোমস্টে"],
      ["primary", "প্রাথমিক"],
      ["secondary", "মাধ্যমিক"],
      ["intermediate", "মধ্যবর্তী"],
      ["media room", "মিডিয়া রুম"],
      ["resources room", "রিসোর্স রুম"],
      ["staff", "কর্মীবৃন্দ"],
      ["commencement", "সমাপনী"],
      ["dissertation", "গবেষণাপত্র"],
      ["leaflet", "লিফলেট"],
      ["faculty", "অনুষদ"],
      ["pupils", "শিক্ষার্থী"],
      ["pencil", "পেনসিল"],
      ["feedback", "প্রতিক্রিয়া"],
      ["tasks", "কাজ"],
      ["outcomes", "ফলাফল"],
      ["advanced", "উন্নত"],
      ["introductory", "প্রারম্ভিক"],
      ["extra background", "অতিরিক্ত পটভূমি"],
      ["higher education", "উচ্চশিক্ষা"],
      ["guidelines", "নির্দেশিকা"],
      ["post-secondary", "মাধ্যমিক পরবর্তী"],
      ["supervisor", "তত্ত্বাবধায়ক"],
      ["bachelor's degree", "স্নাতক ডিগ্রি"],
      ["compound", "যৌগিক"],
      ["vocabulary", "শব্দভাণ্ডার"],
      ["student support services", "শিক্ষার্থী সহায়তা সেবা"],
      ["student retention", "শিক্ষার্থী ধারণ"],
      ["publication", "প্রকাশনা"],
      ["foreign students", "বিদেশি শিক্ষার্থী"],
      ["schedule", "সময়সূচি"],
      ["school reunion", "স্কুল পুনর্মিলনী"],
      ["registrar's office", "রেজিস্ট্রার অফিস"],
      ["stationery", "স্টেশনারি"],
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    emoji: "📢",
    color: {
      tag: "bg-rose-100 text-rose-700",
      accent: "from-rose-500 to-orange-500",
      light: "bg-rose-50 border-rose-100",
    },
    words: [
      ["catalogue", "ক্যাটালগ"],
      ["interview", "সাক্ষাৎকার"],
      ["newsletter", "নিউজলেটার"],
      ["competition", "প্রতিযোগিতা"],
      ["TV program", "টিভি প্রোগ্রাম"],
      ["strategies", "কৌশল"],
      ["research method", "গবেষণা পদ্ধতি"],
      ["entertainment industry", "বিনোদন শিল্প"],
      ["leadership", "নেতৃত্ব"],
      ["management", "ব্যবস্থাপনা"],
      ["display", "প্রদর্শন"],
      ["products", "পণ্য"],
      ["customer", "গ্রাহক"],
      ["special offer", "বিশেষ অফার"],
      ["collecting data", "তথ্য সংগ্রহ"],
      ["questionnaire", "প্রশ্নমালা"],
      ["survey", "জরিপ"],
      ["mass media", "গণমাধ্যম"],
      ["statistic", "পরিসংখ্যান"],
      ["profit margin", "মুনাফার মার্জিন"],
      ["poll", "জনমত জরিপ"],
      ["business card", "ব্যবসায়িক কার্ড"],
      ["training", "প্রশিক্ষণ"],
      ["trainee", "প্রশিক্ষণার্থী"],
      ["merchandise", "পণ্যসামগ্রী"],
      ["manufacture", "উৎপাদন"],
      ["recruitment", "নিয়োগ"],
    ],
  },
  {
    id: "health",
    label: "Health & Food",
    emoji: "🥗",
    color: {
      tag: "bg-amber-100 text-amber-700",
      accent: "from-amber-500 to-orange-500",
      light: "bg-amber-50 border-amber-100",
    },
    words: [
      ["yoga", "যোগব্যায়াম"],
      ["tai-chi", "তাই-চি"],
      ["keep-fit", "সুস্থ থাকা"],
      ["salad bar", "সালাদ বার"],
      ["vegetarian", "নিরামিষভোজী"],
      ["outdoor activities", "বাইরের কার্যক্রম"],
      ["leisure time", "অবসর সময়"],
      ["disease", "রোগ"],
      ["meal", "খাবার"],
      ["protein", "প্রোটিন"],
      ["balanced diet", "সুষম খাদ্য"],
      ["food pyramid", "খাদ্য পিরামিড"],
      ["vitamin", "ভিটামিন"],
      ["carbohydrates", "শর্করা"],
      ["rice", "ভাত"],
      ["pasta", "পাস্তা"],
      ["potatoes", "আলু"],
      ["pizza", "পিৎজা"],
      ["tomatoes", "টমেটো"],
      ["bread", "রুটি"],
      ["cereals", "সিরিয়াল"],
      ["minerals", "খনিজ"],
      ["zinc", "জিঙ্ক"],
      ["meat", "মাংস"],
      ["seafood", "সামুদ্রিক খাবার"],
      ["eggs", "ডিম"],
      ["beans", "বিনস"],
      ["milk", "দুধ"],
      ["cheese", "পনির"],
      ["yoghurt", "দই"],
      ["fruit", "ফল"],
      ["vegetables", "সবজি"],
      ["citrus fruits", "সাইট্রাস ফল"],
      ["green pepper", "সবুজ মরিচ"],
      ["blackcurrant", "কালো কারেন্ট"],
      ["nuts", "বাদাম"],
      ["egg yolk", "ডিমের কুসুম"],
      ["liver", "যকৃৎ"],
      ["medicine", "ওষুধ"],
      ["treatment", "চিকিৎসা"],
      ["remedy", "প্রতিকার"],
      ["nursing care", "নার্সিং যত্ন"],
      ["nursery", "শিশু পরিচর্যা কেন্দ্র"],
      ["regular exercise", "নিয়মিত ব্যায়াম"],
    ],
  },
  {
    id: "nature",
    label: "Nature & Geography",
    emoji: "🌿",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-600 to-orange-500",
      light: "bg-red-50 border-red-100",
    },
    words: [
      ["field", "মাঠ"],
      ["footbridge", "পথসেতু"],
      ["environment", "পরিবেশ"],
      ["waterfall", "জলপ্রপাত"],
      ["river", "নদী"],
      ["mountain", "পাহাড়"],
      ["forest", "বন"],
      ["village", "গ্রাম"],
      ["coast", "উপকূল"],
      ["reef", "প্রবালপ্রাচীর"],
      ["lake", "হ্রদ"],
      ["valley", "উপত্যকা"],
      ["hill", "টিলা"],
      ["cliff", "খাড়া পাড়"],
      ["island", "দ্বীপ"],
      ["peninsula", "উপদ্বীপ"],
      ["earthquake", "ভূমিকম্প"],
      ["avalanche", "তুষারধস"],
      ["tornado", "টর্নেডো"],
      ["typhoon", "টাইফুন"],
      ["desertification", "মরুকরণ"],
      ["volcano", "আগ্নেয়গিরি"],
      ["disaster", "দুর্যোগ"],
      ["catastrophe", "বিপর্যয়"],
      ["erosion", "ক্ষয়"],
      ["landslides", "ভূমিধস"],
      ["storm", "ঝড়"],
      ["flood", "বন্যা"],
      ["hurricane", "হারিকেন"],
      ["pond", "পুকুর"],
      ["jungle", "জঙ্গল"],
      ["oasis", "মরুদ্যান"],
      ["dam", "বাঁধ"],
      ["canyon", "গিরিখাত"],
    ],
  },
  {
    id: "environment",
    label: "The Environment",
    emoji: "🌍",
    color: {
      tag: "bg-orange-100 text-orange-700",
      accent: "from-orange-600 to-red-500",
      light: "bg-orange-50 border-orange-100",
    },
    words: [
      ["greenhouse effect", "গ্রিনহাউস প্রতিক্রিয়া"],
      ["acid rain", "অ্যাসিড বৃষ্টি"],
      ["global warming", "বৈশ্বিক উষ্ণতা"],
      ["carbon dioxide", "কার্বন ডাই-অক্সাইড"],
      ["burning fossil", "জীবাশ্ম জ্বালানো"],
      ["exhaust fumes", "গাড়ির ধোঁয়া"],
      ["deforestation", "বন উজাড়"],
      ["nitrogen oxide", "নাইট্রোজেন অক্সাইড"],
      ["smog", "ধোঁয়াশা"],
      ["climate", "জলবায়ু"],
      ["pollution", "দূষণ"],
      ["temperature", "তাপমাত্রা"],
      ["power plants", "বিদ্যুৎকেন্দ্র"],
      ["landfill", "ভূমিভরাট"],
      ["cattle", "গবাদি পশু"],
      ["wind turbine", "বায়ু টার্বাইন"],
      ["hydroelectric power", "জলবিদ্যুৎ"],
      ["renewable", "নবায়নযোগ্য"],
      ["source of energy", "শক্তির উৎস"],
      ["reliable", "নির্ভরযোগ্য"],
      ["solar panels", "সৌরপ্যানেল"],
      ["environmentally friendly", "পরিবেশবান্ধব"],
      ["oxygen", "অক্সিজেন"],
      ["chemical-free", "রাসায়নিকমুক্ত"],
      ["desert", "মরুভূমি"],
      ["degradation", "অবক্ষয়"],
      ["vegetation", "গাছপালা"],
      ["sea level", "সমুদ্রপৃষ্ঠ"],
      ["ocean currents", "সমুদ্র স্রোত"],
      ["soil conditioner", "মাটির কন্ডিশনার"],
      ["coal", "কয়লা"],
      ["fossil fuels", "জীবাশ্ম জ্বালানি"],
      ["firewood", "জ্বালানি কাঠ"],
      ["drought", "খরা"],
      ["contaminated", "দূষিত"],
    ],
  },
  {
    id: "animals",
    label: "The Animal Kingdom",
    emoji: "🦁",
    color: {
      tag: "bg-amber-100 text-amber-700",
      accent: "from-amber-600 to-orange-500",
      light: "bg-amber-50 border-amber-100",
    },
    words: [
      ["birds of prey", "শিকারি পাখি"],
      ["seabirds", "সামুদ্রিক পাখি"],
      ["poultry and game", "হাঁস-মুরগি ও শিকার"],
      ["mammals", "স্তন্যপায়ী প্রাণী"],
      ["cetacean", "তিমি জাতীয় প্রাণী"],
      ["whale", "তিমি"],
      ["primates", "প্রাইমেট"],
      ["rodents", "ইঁদুরজাতীয় প্রাণী"],
      ["fish", "মাছ"],
      ["amphibian", "উভচর"],
      ["reptile", "সরীসৃপ"],
      ["insects", "পোকামাকড়"],
      ["octopus", "অক্টোপাস"],
      ["phylum", "পর্ব"],
      ["class", "শ্রেণি"],
      ["order", "বর্গ"],
      ["family", "পরিবার"],
      ["genus", "গণ"],
      ["species", "প্রজাতি"],
      ["livestock", "গবাদি পশু"],
      ["creature", "প্রাণী"],
      ["lion", "সিংহ"],
      ["penguin", "পেঙ্গুইন"],
    ],
  },
  {
    id: "plants",
    label: "Plants & Continents",
    emoji: "🌱",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-500 to-amber-500",
      light: "bg-red-50 border-red-100",
    },
    words: [
      ["mushroom", "মাশরুম"],
      ["fungus", "ছত্রাক"],
      ["leaves", "পাতা"],
      ["seed", "বীজ"],
      ["core", "মূল অংশ"],
      ["bark", "বাকল"],
      ["trunk", "গাছের কাণ্ড"],
      ["twig", "ডালপালা"],
      ["branch", "শাখা"],
      ["flower", "ফুল"],
      ["stem", "কাণ্ড"],
      ["roots", "শিকড়"],
      ["cluster", "গুচ্ছ"],
      ["fertilizer", "সার"],
      ["South America", "দক্ষিণ আমেরিকা"],
      ["North America", "উত্তর আমেরিকা"],
      ["Africa", "আফ্রিকা"],
      ["Asia", "এশিয়া"],
      ["Europe", "ইউরোপ"],
      ["Australia", "অস্ট্রেলিয়া"],
      ["Antarctica", "অ্যান্টার্কটিকা"],
    ],
  },
  {
    id: "countries",
    label: "Countries & Languages",
    emoji: "🌐",
    color: {
      tag: "bg-orange-100 text-orange-700",
      accent: "from-orange-500 to-red-500",
      light: "bg-orange-50 border-orange-100",
    },
    words: [
      ["Egypt", "মিশর"],
      ["Mexico", "মেক্সিকো"],
      ["France", "ফ্রান্স"],
      ["Indonesia", "ইন্দোনেশিয়া"],
      ["Turkey", "তুরস্ক"],
      ["England", "ইংল্যান্ড"],
      ["Germany", "জার্মানি"],
      ["China", "চীন"],
      ["Greece", "গ্রিস"],
      ["Brazil", "ব্রাজিল"],
      ["India", "ভারত"],
      ["North Korea", "উত্তর কোরিয়া"],
      ["Malaysia", "মালয়েশিয়া"],
      ["New Zealand", "নিউজিল্যান্ড"],
      ["Nigeria", "নাইজেরিয়া"],
      ["Pakistan", "পাকিস্তান"],
      ["Singapore", "সিঙ্গাপুর"],
      ["United Kingdom", "যুক্তরাজ্য"],
      ["Italy", "ইতালি"],
      ["the Dominican Republic", "ডোমিনিকান রিপাবলিক"],
      ["the Philippines", "ফিলিপাইন"],
      ["linguistics", "ভাষাবিজ্ঞান"],
      ["bilingual", "দ্বিভাষিক"],
      ["trilingual", "ত্রিভাষিক"],
      ["polyglot", "বহুভাষী"],
      ["Portuguese", "পর্তুগিজ"],
      ["Mandarin", "ম্যান্ডারিন"],
      ["Bengali", "বাংলা"],
      ["Chinese", "চীনা"],
      ["Hindi", "হিন্দি"],
      ["Russian", "রুশ"],
      ["Japanese", "জাপানি"],
      ["German", "জার্মান"],
      ["Punjabi", "পাঞ্জাবি"],
      ["Thai", "থাই"],
      ["Persian", "ফার্সি"],
      ["Filipino", "ফিলিপিনো"],
      ["French", "ফরাসি"],
      ["Italian", "ইতালিয়ান"],
      ["Greek", "গ্রিক"],
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Buildings",
    emoji: "🏛️",
    color: {
      tag: "bg-rose-100 text-rose-700",
      accent: "from-rose-600 to-orange-500",
      light: "bg-rose-50 border-rose-100",
    },
    words: [
      ["dome", "গম্বুজ"],
      ["palace", "প্রাসাদ"],
      ["fort", "দুর্গ"],
      ["castle", "কেল্লা"],
      ["glasshouse", "গ্রিনহাউস"],
      ["pyramid", "পিরামিড"],
      ["log cabin", "কাঠের কেবিন"],
      ["lighthouse", "বাতিঘর"],
      ["hut", "কুটির"],
      ["skyscraper", "গগনচুম্বী ইমারত"],
      ["sculpture", "ভাস্কর্য"],
      ["semi-detached house", "আধা-বিচ্ছিন্ন বাড়ি"],
      ["duplex", "দুই তলা বাসস্থান"],
      ["terraced house", "সারিবদ্ধ বাড়ি"],
      ["town house", "শহরের বাড়ি"],
      ["row house", "সারি বাড়ি"],
      ["bungalow", "বাংলো"],
      ["thatched cottage", "খড়ের ছাদের কুটির"],
      ["mobile home", "ভ্রাম্যমাণ বাড়ি"],
      ["houseboat", "ভাসমান বাড়ি"],
      ["block of flats", "ফ্ল্যাট ব্লক"],
      ["apartment building", "অ্যাপার্টমেন্ট ভবন"],
      ["condominium", "কনডোমিনিয়াম"],
      ["chimney", "চিমনি"],
      ["bedroom", "শোবার ঘর"],
      ["basement", "বেসমেন্ট"],
      ["landlord", "বাড়িওয়ালা"],
      ["tenant", "ভাড়াটে"],
      ["rent", "ভাড়া"],
      ["lease", "লিজ"],
      ["neighborhood", "প্রতিবেশী এলাকা"],
      ["suburb", "শহরতলি"],
      ["sofa", "সোফা"],
      ["coffee table", "কফি টেবিল"],
      ["studio", "স্টুডিও"],
      ["dormitory", "আবাসিক হল"],
      ["storey", "তলা"],
      ["kitchen", "রান্নাঘর"],
      ["refrigerator", "রেফ্রিজারেটর"],
      ["microwave", "মাইক্রোওয়েভ"],
      ["ground floor", "নিচতলা"],
      ["oven", "ওভেন"],
      ["hallway", "প্রবেশপথ"],
      ["insurance", "বিমা"],
    ],
  },
  {
    id: "city",
    label: "In the City",
    emoji: "🏙️",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-600 to-rose-500",
      light: "bg-red-50 border-red-100",
    },
    words: [
      ["cities", "শহরসমূহ"],
      ["street", "রাস্তা"],
      ["lane", "গলি"],
      ["city centre", "নগর কেন্দ্র"],
      ["central station", "কেন্দ্রীয় স্টেশন"],
      ["car park", "গাড়ি পার্কিং"],
      ["department store", "ডিপার্টমেন্ট স্টোর"],
      ["bridge", "সেতু"],
      ["temple", "মন্দির"],
      ["embassy", "দূতাবাস"],
      ["road system", "সড়ক ব্যবস্থা"],
      ["hospital", "হাসপাতাল"],
      ["garden", "বাগান"],
      ["avenue", "অ্যাভিনিউ"],
      ["clinic", "ক্লিনিক"],
      ["dentist", "দন্তচিকিৎসক"],
      ["reception", "অভ্যর্থনা"],
      ["appointment", "অ্যাপয়েন্টমেন্ট"],
      ["staff selection", "কর্মী নির্বাচন"],
      ["colleague", "সহকর্মী"],
      ["workshop", "কর্মশালা"],
      ["showroom", "শোরুম"],
      ["information desk", "তথ্য ডেস্ক"],
      ["employer", "নিয়োগকর্তা"],
      ["employment", "কর্মসংস্থান"],
      ["unemployed", "বেকার"],
      ["technical cooperation", "কারিগরি সহযোগিতা"],
      ["team leaders", "দলনেতা"],
      ["stress", "মানসিক চাপ"],
      ["ability", "দক্ষতা"],
      ["vision", "দৃষ্টিভঙ্গি"],
      ["confidence", "আত্মবিশ্বাস"],
      ["employee", "কর্মী"],
      ["internship", "ইন্টার্নশিপ"],
      ["reasonable", "যুক্তিসঙ্গত"],
      ["satisfactory", "সন্তোষজনক"],
      ["dangerous", "বিপজ্জনক"],
      ["safe", "নিরাপদ"],
      ["strongly recommended", "দৃঢ়ভাবে প্রস্তাবিত"],
      ["poor quality", "নিম্নমানের"],
      ["satisfied", "সন্তুষ্ট"],
      ["disappointed", "হতাশ"],
      ["efficient", "দক্ষ"],
      ["luxurious", "বিলাসবহুল"],
      ["colored", "রঙিন"],
      ["spotted", "দাগযুক্ত"],
      ["striped", "ডোরাকাটা"],
      ["expensive", "দামি"],
      ["cheap", "সস্তা"],
    ],
  },
  {
    id: "tourism",
    label: "Tourism",
    emoji: "✈️",
    color: {
      tag: "bg-orange-100 text-orange-700",
      accent: "from-orange-500 to-amber-500",
      light: "bg-orange-50 border-orange-100",
    },
    words: [
      ["tourist-guided tour", "গাইডসহ পর্যটন"],
      ["ticket office", "টিকেট অফিস"],
      ["souvenir", "স্মৃতিচিহ্ন"],
      ["trip", "ভ্রমণ"],
      ["guest", "অতিথি"],
      ["reservation", "সংরক্ষণ"],
      ["view", "দৃশ্য"],
      ["culture", "সংস্কৃতি"],
      ["memorable", "স্মরণীয়"],
      ["single double bedded room", "একক/দ্বৈত বেড রুম"],
      ["picnic", "পিকনিক"],
      ["tourist attraction", "পর্যটন আকর্ষণ"],
      ["hostel", "হোস্টেল"],
      ["suite", "স্যুট"],
      ["aquarium", "জলজ প্রাণিশালা"],
      ["train", "ট্রেন"],
      ["develop", "উন্নয়ন করা"],
      ["collect", "সংগ্রহ করা"],
      ["supervise", "তদারকি করা"],
      ["mark", "চিহ্নিত করা"],
      ["edit", "সম্পাদনা করা"],
      ["revise", "সংশোধন করা"],
      ["exhibit", "প্রদর্শন করা"],
      ["donate", "দান করা"],
      ["surpass", "ছাড়িয়ে যাওয়া"],
      ["register", "নিবন্ধন করা"],
      ["support", "সহায়তা করা"],
      ["hunt", "শিকার করা"],
      ["persuade", "বোঝানো"],
      ["concentrate", "মনোযোগ দেওয়া"],
      ["discuss", "আলোচনা করা"],
      ["suggest", "পরামর্শ দেওয়া"],
      ["arrange", "ব্যবস্থা করা"],
      ["borrow", "ধার করা"],
      ["immigrate", "অভিবাসন করা"],
      ["review", "পর্যালোচনা করা"],
      ["learn", "শেখা"],
      ["touch", "স্পর্শ করা"],
    ],
  },
  {
    id: "adjectives",
    label: "Adjectives",
    emoji: "✨",
    color: {
      tag: "bg-red-100 text-red-700",
      accent: "from-red-500 to-orange-500",
      light: "bg-red-50 border-red-100",
    },
    words: [
      ["energetic", "প্রাণবন্ত"],
      ["social", "সামাজিক"],
      ["ancient", "প্রাচীন"],
      ["necessary", "প্রয়োজনীয়"],
      ["fantastic", "অসাধারণ"],
      ["exciting", "উত্তেজনাপূর্ণ"],
      ["fabulous", "অভূতপূর্ব"],
      ["dull", "নিরস"],
      ["comfortable", "আরামদায়ক"],
      ["convenient", "সুবিধাজনক"],
      ["suitable", "উপযুক্ত"],
      ["affordable", "সাশ্রয়ী"],
      ["voluntary", "স্বেচ্ছামূলক"],
      ["mandatory", "বাধ্যতামূলক"],
      ["compulsory", "আবশ্যিক"],
      ["temporary", "অস্থায়ী"],
      ["permanent", "স্থায়ী"],
      ["immense", "বিশাল"],
      ["vast", "বিস্তৃত"],
      ["salty", "নোনতা"],
      ["extinct", "বিলুপ্ত"],
      ["vulnerable", "ক্ষতিগ্রস্ত হওয়ার আশঙ্কাযুক্ত"],
      ["pessimistic", "হতাশাবাদী"],
      ["optimistic", "আশাবাদী"],
      ["realistic", "বাস্তববাদী"],
      ["practical", "ব্যবহারিক"],
      ["knowledgeable", "জ্ঞানসম্পন্ন"],
      ["flexible", "নমনীয়"],
      ["confident", "আত্মবিশ্বাসী"],
      ["Western", "পশ্চিমা"],
      ["intensive", "নিবিড়"],
      ["tranquil", "শান্ত"],
      ["spectacular", "চমৎকার"],
      ["intact", "অক্ষত"],
      ["various", "বিভিন্ন"],
    ],
  },
  {
    id: "hobbies",
    label: "Hobbies & Activities",
    emoji: "🎯",
    color: {
      tag: "bg-amber-100 text-amber-700",
      accent: "from-amber-500 to-red-500",
      light: "bg-amber-50 border-amber-100",
    },
    words: [
      ["orienteering", "ওরিয়েন্টিয়ারিং"],
      ["caving", "গুহা অন্বেষণ"],
      ["spelunking", "গুহা অন্বেষণ"],
      ["archery", "তীরন্দাজি"],
      ["ice skating", "আইস স্কেটিং"],
      ["scuba-diving", "স্কুবা ডাইভিং"],
      ["snorkeling", "স্নোরকেলিং"],
      ["skateboarding", "স্কেটবোর্ডিং"],
      ["bowls", "বোলস খেলা"],
      ["darts", "ডার্টস খেলা"],
      ["golf", "গলফ"],
      ["billiards", "বিলিয়ার্ড"],
      ["photography", "ফটোগ্রাফি"],
      ["painting", "চিত্রাঙ্কন"],
      ["pottery", "মৃৎশিল্প"],
      ["woodcarving", "কাঠ খোদাই"],
      ["gardening", "বাগান করা"],
      ["stamp collection", "ডাকটিকিট সংগ্রহ"],
      ["embroidery", "সূচিকর্ম"],
      ["climbing", "পর্বতারোহণ"],
      ["chess", "দাবা"],
      ["parachute", "প্যারাশুট"],
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────

const totalWords = categories.reduce((s, c) => s + c.words.length, 0);

function WordCard({ word, meaning, highlight }) {
  const [flipped, setFlipped] = useState(false);
  const w = word.toLowerCase();
  const h = highlight.toLowerCase();
  const matches = h && (w.includes(h) || meaning.toLowerCase().includes(h));

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      className={`
        group relative rounded-xl border cursor-pointer select-none
        transition-all duration-200 ease-out overflow-hidden
        ${matches && highlight ? "ring-2 ring-red-400 border-red-300" : "border-[#e5e7eb] hover:border-red-200"}
        hover:shadow-md hover:shadow-red-50/60 hover:-translate-y-[1px]
        ${flipped ? "bg-gradient-to-br from-red-500 to-orange-500" : "bg-white hover:bg-red-50/30"}
      `}
      style={{ minHeight: 68 }}>
      <div className="px-3.5 py-3 flex flex-col gap-1 h-full justify-center">
        {!flipped ? (
          <>
            <span className="text-sm font-semibold text-[#111827] leading-snug group-hover:text-red-600 transition-colors duration-150">
              {word}
            </span>
            <span className="text-[11px] text-[#9ca3af] group-hover:text-[#6b7280] transition-colors duration-150">
              tap for বাংলা
            </span>
          </>
        ) : (
          <>
            <span className="text-sm font-bold text-white leading-snug">
              {meaning}
            </span>
            <span className="text-[11px] text-white/70">{word}</span>
          </>
        )}
      </div>
      {/* subtle shimmer on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
      />
    </div>
  );
}

function CategorySection({ cat, search }) {
  const [open, setOpen] = useState(true);

  const filtered = useMemo(() => {
    if (!search) return cat.words;
    const q = search.toLowerCase();
    return cat.words.filter(
      ([w, m]) => w.toLowerCase().includes(q) || m.toLowerCase().includes(q),
    );
  }, [cat.words, search]);

  if (search && filtered.length === 0) return null;

  return (
    <section
      id={cat.id}
      className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-sm
                                     hover:shadow-md hover:border-red-100 transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-6 py-4 text-left group/hdr hover:bg-red-50/30 transition-colors duration-200">
        <span className="text-2xl">{cat.emoji}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-[#111827] group-hover/hdr:text-red-600 transition-colors duration-200">
            {cat.label}
          </h2>
          <p className="text-xs text-[#9ca3af] mt-0.5">
            {search ? `${filtered.length} of ` : ""}
            {cat.words.length} words
          </p>
        </div>
        <span
          className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-bold border ${cat.color.tag}`}>
          {filtered.length}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
          ${open ? "bg-red-50 text-red-500" : "bg-[#f3f4f6] text-[#9ca3af] group-hover/hdr:bg-red-50 group-hover/hdr:text-red-400"}`}>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <path
              d="M4 6l4 4 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Top gradient bar */}
      <div
        className={`h-0.5 w-full bg-gradient-to-r ${cat.color.accent} ${open ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />

      {/* Words grid */}
      {open && (
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
            {filtered.map(([word, meaning]) => (
              <WordCard
                key={word}
                word={word}
                meaning={meaning}
                highlight={search}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────────────────────────

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid"); // grid | list

  const visibleCount = useMemo(() => {
    if (!search) return totalWords;
    const q = search.toLowerCase();
    return categories.reduce(
      (s, c) =>
        s +
        c.words.filter(
          ([w, m]) =>
            w.toLowerCase().includes(q) || m.toLowerCase().includes(q),
        ).length,
      0,
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* ══════════ HERO ══════════ */}
      <div className="w-full bg-[#0f172a] relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 right-0 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, #ef4444 0%, transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 65%)",
          }}
        />

        <div className="relative w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
              Vocabulary
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3">
                IELTS{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Vocabulary Bank
                </span>
              </h1>
              <p className="text-white/50 text-base max-w-2xl leading-relaxed">
                {totalWords}+ essential words organized by topic — with Bengali
                (বাংলা) meanings. Tap any card to reveal the translation.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              {[
                { v: totalWords + "+", l: "Total Words" },
                { v: categories.length, l: "Categories" },
                { v: "Tap", l: "Flip Cards" },
                { v: "বাংলা", l: "Meanings" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center min-w-[80px]
                             hover:bg-white/10 transition-all duration-200 cursor-default">
                  <p className="text-lg font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    {s.v}
                  </p>
                  <p className="text-white/40 text-[11px] mt-0.5 font-medium">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick-jump category pills */}
          <div className="flex flex-wrap gap-2 pb-6 border-t border-white/10 pt-5">
            <span className="text-white/30 text-xs font-semibold self-center mr-1">
              Jump to:
            </span>
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10
                           text-white/50 text-xs font-medium hover:bg-white/10 hover:text-white/80
                           hover:border-white/20 transition-all duration-200">
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ TOOLBAR ══════════ */}
      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="py-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-4 h-4">
                <circle cx="9" cy="9" r="6" />
                <path d="M15 15l-3-3" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search English or বাংলা…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white border border-[#e5e7eb] rounded-xl text-sm
                         focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400
                         text-[#111827] placeholder:text-[#9ca3af] transition-all duration-200 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#e5e7eb]
                           hover:bg-red-100 flex items-center justify-center transition-colors duration-150">
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-3 h-3 text-[#6b7280]">
                  <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 shadow-sm shrink-0">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
            <span className="text-sm text-[#374151]">
              <span className="font-bold text-[#111827]">{visibleCount}</span>
              <span className="text-[#9ca3af]"> / {totalWords} words</span>
            </span>
          </div>
        </div>
      </div>

      {/* ══════════ CATEGORIES ══════════ */}
      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 space-y-5">
        {categories.map((cat) => (
          <CategorySection key={cat.id} cat={cat} search={search} />
        ))}

        {/* Empty state */}
        {visibleCount === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#e5e7eb] flex items-center justify-center mb-4 text-2xl">
              🔍
            </div>
            <p className="text-[#374151] font-semibold text-lg mb-1">
              No words found
            </p>
            <p className="text-[#9ca3af] text-sm">
              Try searching in English or বাংলা
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500
                         text-white text-sm font-semibold hover:shadow-md hover:shadow-red-200
                         transition-all duration-200 hover:-translate-y-0.5">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
