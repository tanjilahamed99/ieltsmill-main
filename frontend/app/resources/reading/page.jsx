"use client";
import { UserRoute } from "@/Providers/PrivateRoute";
import React, { useState } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────

const topics = [
  {
    id: "subject",
    label: "Subject",
    hasDropdown: true,
    subtopics: [
      {
        id: "subject-preposition",
        label: "Prepositional Opening",
        bangla: "Preposition পরে সাবজেক্ট বসে না।",
        sentences: [
          "The rapid growth of technology in modern society has significantly changed the way people communicate.",
          "The increasing demand for higher education among young people has created intense competition in many countries.",
          "The quality of life in urban areas has improved due to better healthcare facilities and infrastructure.",
          "A large number of students from rural regions are migrating to cities in search of better opportunities.",
          "The impact of social media on teenagers has become a major concern for parents and educators.",
          "The development of artificial intelligence in recent years has transformed various industries.",
          "The role of the government in reducing unemployment is extremely important in developing nations.",
          "The number of people living in poverty in some regions remains alarmingly high.",
          "The introduction of new policies by the government has led to significant economic growth.",
          "The importance of maintaining a healthy lifestyle cannot be ignored in today's fast-paced world.",
          "The influence of advertisements on consumer behavior is becoming increasingly powerful.",
          "The rise in global temperatures over the past decades has caused serious environmental issues.",
          "The availability of online learning platforms has made education more accessible to students worldwide.",
          "The lack of proper guidance for young people often leads to poor career decisions.",
          "The expansion of multinational companies in developing countries has created both opportunities and challenges.",
          "In many developing countries, the standard of education remains a serious issue.",
          "On the other hand, the benefits of technology cannot be denied in modern life.",
          "In recent years, the use of smartphones among teenagers has increased dramatically.",
          "In the long run, the effects of climate change will impact future generations.",
          "In addition to economic growth, the improvement of public services is essential for a nation's development.",
          "The growing popularity of online shopping among young consumers has significantly reduced the number of people visiting physical stores.",
          "The lack of investment in public transportation systems in many cities has resulted in severe traffic congestion.",
          "The pressure of academic success on students in competitive societies has negatively affected their mental health.",
        ],
      },
      {
        id: "subject-time",
        label: "Time Phrase Opening",
        bangla: "Time phrases এ subject বসে না।",
        sentences: [
          "From 2000 to 2010, the global economy experienced rapid growth.",
          "During the last decade, technological innovation has accelerated dramatically.",
          "Over the past few years, the use of renewable energy has increased significantly.",
          "In recent years, online education has gained widespread popularity.",
          "At present, many countries are focusing on economic stability.",
          "Before the introduction of modern technology, tasks were completed manually.",
          "After many years of research, scientists achieved a breakthrough.",
          "Since the beginning of the 21st century, technological advancements have accelerated rapidly.",
          "Throughout history, education has played a vital role in societal development.",
          "By the end of the century, significant environmental changes are expected.",
          "From early childhood to adolescence, individuals undergo significant psychological changes.",
          "During times of economic crisis, governments often introduce new reforms.",
          "Over the last century, medical science has made remarkable progress.",
          "In the past decade, social media usage has grown rapidly.",
          "At an early age, children develop language skills quickly.",
        ],
      },
    ],
  },
  {
    id: "prepositional-opening",
    label: "Prepositional Opening",
    hasDropdown: false,
    bangla: "Prepositional opening এ subject বসে না।",
    sentences: [
      "With the rapid advancement of technology, many traditional jobs are becoming obsolete.",
      "With the growing demand for renewable energy, governments are investing heavily in green solutions.",
      "With the expansion of online education, students have more flexible learning options.",
      "With the rise of social media platforms, communication has become faster but less personal.",
      "With the development of artificial intelligence, many industries are undergoing significant transformation.",
      "In recent years, the number of international students has increased significantly.",
      "In many developing countries, access to quality education remains limited.",
      "In the modern world, the importance of digital literacy cannot be ignored.",
      "In urban areas, traffic congestion has become a major issue.",
      "On the other hand, the disadvantages of excessive technology use are often overlooked.",
      "On a global scale, the issue of poverty continues to affect millions of people.",
      "Despite numerous challenges, the country has made significant economic progress.",
      "Despite rapid technological growth, traditional skills are still valued in some sectors.",
      "Because of increasing competition, companies are constantly seeking innovation.",
      "Because of climate change, extreme weather events are becoming more frequent.",
      "Without proper planning, large-scale projects often fail to achieve their objectives.",
      "Without government support, many public services cannot function effectively.",
      "Among young professionals, the demand for flexible working hours is increasing.",
      "Among various environmental issues, climate change remains the most pressing concern.",
      "Across the globe, governments are taking steps to address environmental challenges.",
    ],
  },
  {
    id: "time-phrases",
    label: "Time Phrases",
    hasDropdown: false,
    bangla: "Time phrases এ subject বসে না।",
    sentences: [
      "From 2000 to 2010, the global economy experienced rapid growth.",
      "From early childhood to adolescence, individuals undergo significant psychological changes.",
      "During the last decade, technological innovation has accelerated dramatically.",
      "During the Industrial Revolution, major advancements were made in manufacturing.",
      "Over the past few years, the use of renewable energy has increased significantly.",
      "Over the last century, medical science has made remarkable progress.",
      "In recent years, online education has gained widespread popularity.",
      "In the past decade, social media usage has grown rapidly.",
      "In the near future, artificial intelligence is expected to dominate many industries.",
      "At present, many countries are focusing on economic stability.",
      "Before the introduction of modern technology, tasks were completed manually.",
      "After many years of research, scientists achieved a breakthrough.",
      "Since the beginning of the 21st century, technological advancements have accelerated rapidly.",
      "Throughout history, education has played a vital role in societal development.",
      "By the end of the century, significant environmental changes are expected.",
    ],
  },
  {
    id: "comma",
    label: "Comma",
    hasDropdown: false,
    bangla: "Comma — explanation of previous Noun",
    sentences: [
      "The rapid advancement of technology, which has transformed nearly every aspect of modern life, continues to influence the way people communicate and work.",
      "The government, which is responsible for ensuring economic stability, must take effective measures to address rising inflation.",
      "Many students, who are under constant academic pressure, often struggle to maintain a healthy work-life balance.",
      "The increasing popularity of online education, which provides flexibility and accessibility, has changed traditional learning methods significantly.",
      "Climate change, which poses a serious threat to the environment, requires immediate global attention and action.",
      "The company, which was founded by young entrepreneurs, has grown rapidly in a highly competitive market.",
      "Social media platforms, which are widely used by teenagers, have both positive and negative effects on mental health.",
      "The education system, which plays a crucial role in shaping future generations, needs continuous improvement.",
      "The internet, which has revolutionized access to information, has made learning more convenient for students worldwide.",
      "The rise in global temperatures, which is largely caused by human activities, has led to severe environmental consequences.",
      "Albert Einstein, who developed the theory of relativity, revolutionized our understanding of physics and the universe.",
      "Marie Curie, a pioneer in radioactivity research, became the first woman to win a Nobel Prize.",
      "Isaac Newton, who formulated the laws of motion and universal gravitation, laid the foundation for classical physics.",
      "Charles Darwin, whose theory of evolution challenged traditional beliefs, influenced modern biology profoundly.",
      "Alan Turing, who laid the foundations for computer science, played a key role in codebreaking during World War II.",
    ],
  },
  {
    id: "hyphen",
    label: "Hyphen",
    hasDropdown: false,
    bangla: "Hyphen — joining compound ideas",
    sentences: [
      "The well-known scientist presented groundbreaking research at the international conference.",
      "A long-term solution is required to address the ongoing economic challenges.",
      "The government introduced a cost-effective policy to improve public transportation.",
      "High-quality education is essential for the development of a skilled workforce.",
      "The rapidly-changing technological landscape demands continuous professional development.",
      "A well-structured argument is necessary to score high in the IELTS writing section.",
      "Energy-efficient appliances are becoming increasingly popular among environmentally conscious consumers.",
      "The fast-growing population of urban areas has placed pressure on existing infrastructure.",
      "A thought-provoking documentary about climate change raised awareness among millions of viewers.",
      "The state-of-the-art facility opened last year has already attracted global attention.",
    ],
  },
  {
    id: "colon",
    label: "Colon",
    hasDropdown: false,
    bangla: "Colon — explanation of previous Noun/phrase",
    sentences: [
      "Albert Einstein made a revolutionary discovery: the theory of relativity, which changed physics forever.",
      "The Human Genome Project achieved a major milestone: mapping all three billion base pairs of human DNA.",
      "Marie Curie accomplished something extraordinary: she became the first person to win Nobel Prizes in two sciences.",
      "Charles Darwin made an observation that changed biology: species evolve through natural selection over generations.",
      "Nikola Tesla developed groundbreaking technology: alternating current systems that power modern electricity grids.",
      "Rosalind Franklin provided critical evidence: X-ray crystallography images that revealed DNA's structure.",
      "Stephen Hawking proposed a radical idea: black holes emit radiation, now called Hawking radiation.",
      "Jane Goodall dedicated her life to research: studying chimpanzee behavior in their natural habitat.",
      "Isaac Newton formulated the laws of motion: principles that still underpin classical mechanics.",
      "Gregor Mendel discovered a fundamental concept: the inheritance of traits through dominant and recessive genes.",
      "The Industrial Revolution triggered profound change: economies shifted from agriculture to industry worldwide.",
      "The internet transformed communication globally: information can now be accessed instantly from anywhere.",
      "Thomas Edison held over 1,000 patents: among them, the electric light bulb and phonograph.",
    ],
  },
  {
    id: "general-statement",
    label: "General Statement",
    hasDropdown: false,
    bangla: "General statement — broad introductory claims",
    sentences: [
      "Education is widely regarded as one of the most powerful tools for achieving social and economic progress.",
      "Technology has become an inseparable part of modern human life in virtually every corner of the world.",
      "Environmental sustainability has emerged as one of the most pressing global concerns of the 21st century.",
      "The rapid pace of urbanization has fundamentally transformed the social and economic fabric of many societies.",
      "Access to quality healthcare is considered a fundamental human right in many parts of the world.",
      "Globalization has brought both opportunities and challenges to economies and cultures around the world.",
      "The increasing influence of digital media has profoundly altered the way people consume information.",
      "Economic development and environmental protection are often seen as competing priorities by policymakers.",
      "The widening gap between the wealthy and the poor remains a persistent challenge in many nations.",
      "Cultural diversity is widely acknowledged as a source of strength and innovation in modern societies.",
    ],
  },
  {
    id: "relative-pronoun",
    label: "Relative Pronoun",
    hasDropdown: false,
    bangla: "Relative pronoun — who, which, whose, that",
    sentences: [
      "Students who dedicate consistent effort to their studies tend to achieve significantly better academic outcomes.",
      "The policy that was introduced last year has already shown measurable improvements in public health.",
      "Countries whose economies rely heavily on fossil fuels face significant challenges in the transition to green energy.",
      "Scientists who work in the field of artificial intelligence are exploring unprecedented possibilities.",
      "The technology that transformed communication in the 20th century continues to evolve at a rapid pace.",
      "Citizens who are well-informed about their rights are better equipped to participate in democratic processes.",
      "The initiative that was launched by the government aims to reduce youth unemployment significantly.",
      "Organizations whose primary focus is environmental protection play a vital role in combating climate change.",
      "Researchers who collaborate internationally often produce more impactful and widely cited scientific work.",
      "The reforms that were implemented over the past decade have contributed to improved living standards.",
    ],
  },
  {
    id: "contrast",
    label: "Contrast",
    hasDropdown: false,
    bangla: "Contrast — however, although, despite, while",
    sentences: [
      "Although technology has brought many benefits, it has also created new forms of social isolation.",
      "While urban areas offer greater economic opportunities, they are also associated with higher living costs.",
      "Despite the significant progress made in renewable energy, fossil fuels still dominate global energy production.",
      "However, critics argue that rapid economic growth often comes at the expense of environmental sustainability.",
      "While governments have introduced numerous policies to reduce poverty, inequality remains a persistent challenge.",
      "Although online education provides flexibility, it lacks the social interaction found in traditional classrooms.",
      "Despite increased awareness, many individuals continue to engage in environmentally harmful behaviors.",
      "While technology has improved efficiency in many industries, it has also contributed to widespread job displacement.",
      "Although globalization has boosted international trade, it has also led to the decline of some local industries.",
      "Despite the availability of information, misinformation continues to spread rapidly through digital platforms.",
    ],
  },
  {
    id: "cause-result",
    label: "Cause & Result",
    hasDropdown: false,
    bangla: "Cause & Result — therefore, as a result, consequently",
    sentences: [
      "The rapid growth of urban populations has led to increased demand for public transportation and housing.",
      "As a result of technological advancements, many traditional industries have been forced to adapt or face decline.",
      "The widespread use of social media has consequently altered the way individuals form and maintain relationships.",
      "Rising levels of air pollution have resulted in a significant increase in respiratory health problems.",
      "Therefore, governments must invest in sustainable infrastructure to support long-term economic development.",
      "Due to the increasing cost of living, many families are struggling to maintain their previous standard of living.",
      "Consequently, the education system must evolve to prepare students for the demands of a digital economy.",
      "The lack of investment in rural areas has led to increasing migration towards urban centres.",
      "As a result of climate change, extreme weather events are occurring with greater frequency and intensity.",
      "Therefore, international cooperation is essential to address the interconnected challenges of the modern world.",
    ],
  },
  {
    id: "past-participle",
    label: "Past Participle",
    hasDropdown: false,
    bangla: "Past Participle — used at the start of a clause",
    sentences: [
      "Founded in the early 20th century, the organization has grown into a globally respected institution.",
      "Driven by the desire for economic advancement, many young people pursue higher education abroad.",
      "Introduced in recent years, the new policy has significantly improved access to healthcare services.",
      "Faced with increasing competition, companies are investing more heavily in research and development.",
      "Motivated by environmental concerns, many consumers are choosing sustainable products over conventional ones.",
      "Established to promote international cooperation, the organization plays a vital role in global diplomacy.",
      "Inspired by the success of renewable energy projects, other nations are adopting similar strategies.",
      "Concerned about rising unemployment, the government has introduced several economic stimulus measures.",
      "Designed to improve efficiency, the new system has reduced operational costs significantly.",
      "Recognized for its academic excellence, the university attracts students from around the world.",
    ],
  },
  {
    id: "present-participle",
    label: "Present Participle",
    hasDropdown: false,
    bangla: "Present Participle — -ing form at the start",
    sentences: [
      "Recognizing the importance of environmental sustainability, many governments are adopting greener policies.",
      "Responding to public demand, the company introduced a new range of affordable products.",
      "Understanding the long-term benefits of education, parents are investing more in their children's learning.",
      "Facing rising costs, many small businesses are struggling to remain competitive in the market.",
      "Acknowledging the challenges of climate change, world leaders have committed to reducing carbon emissions.",
      "Seeking better opportunities, a growing number of young professionals are relocating to major cities.",
      "Adapting to changing consumer preferences, many retailers are expanding their online presence.",
      "Realizing the impact of poor nutrition, health organizations are promoting awareness about balanced diets.",
      "Considering the rapid pace of technological change, educational institutions must continuously update their curricula.",
      "Striving for a better quality of life, many individuals are prioritizing work-life balance over financial gain.",
    ],
  },
  {
    id: "previous-reference",
    label: "Previous Reference",
    hasDropdown: false,
    bangla: "Previous Reference — This/These/Such + noun",
    sentences: [
      "This growing trend reflects the increasing importance of digital literacy in modern professional environments.",
      "These developments highlight the urgent need for international cooperation on climate-related issues.",
      "Such challenges demonstrate why governments must prioritize investment in public education and infrastructure.",
      "This shift in consumer behavior has had significant implications for traditional retail businesses.",
      "These findings suggest that early childhood education plays a critical role in long-term academic success.",
      "Such rapid changes in technology have created both opportunities and uncertainties for the global workforce.",
      "This phenomenon has led researchers to reconsider previously held assumptions about human social behavior.",
      "These measures, if implemented effectively, could significantly reduce the environmental impact of industrial activity.",
      "Such disparities in income and opportunity continue to fuel social unrest in many parts of the world.",
      "This pattern of behavior, observed across multiple studies, underscores the need for targeted policy interventions.",
    ],
  },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────

function highlightSentence(sentence) {
  // Bold the subject (first noun phrase up to the verb) heuristically — just highlight opening phrase before first comma or verb
  return sentence;
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function SidebarItem({
  topic,
  isActive,
  onSelect,
  openDropdown,
  onToggleDropdown,
  activeSubtopic,
  onSelectSubtopic,
}) {
  if (topic.hasDropdown) {
    const isOpen = openDropdown === topic.id;
    return (
      <div>
        <button
          onClick={() => onToggleDropdown(topic.id)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
            ${isOpen || isActive ? "bg-red-50 text-red-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              className="w-4 h-4 shrink-0">
              <rect x="1.5" y="2" width="13" height="12" rx="1.5" />
              <path d="M4.5 5.5h7M4.5 8h5M4.5 10.5h3" strokeLinecap="round" />
            </svg>
            {topic.label}
          </div>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            <path
              d="M4 6l4 4 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="ml-3 mt-1 border-l-2 border-red-100 pl-3 space-y-0.5">
            {topic.subtopics.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSelectSubtopic(topic.id, sub.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-all duration-150
                  ${activeSubtopic === sub.id ? "bg-red-500 text-white" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}>
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(topic.id)}
      className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
        ${isActive ? "bg-red-500 text-white shadow-sm shadow-red-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-4 h-4 shrink-0">
        <rect x="1.5" y="2" width="13" height="12" rx="1.5" />
        <path d="M4.5 5.5h7M4.5 8h5M4.5 10.5h3" strokeLinecap="round" />
      </svg>
      {topic.label}
    </button>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function ReadingResources() {
  const [activeTopic, setActiveTopic] = useState("prepositional-opening");
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectTopic = (id) => {
    setActiveTopic(id);
    setActiveSubtopic(null);
    setSidebarOpen(false);
  };

  const handleToggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleSelectSubtopic = (topicId, subId) => {
    setActiveTopic(topicId);
    setActiveSubtopic(subId);
    setSidebarOpen(false);
  };

  // Resolve active content
  const activeTopicData = topics.find((t) => t.id === activeTopic);
  let content = null;
  if (activeTopicData?.hasDropdown && activeSubtopic) {
    content = activeTopicData.subtopics.find((s) => s.id === activeSubtopic);
  } else if (!activeTopicData?.hasDropdown) {
    content = activeTopicData;
  } else if (activeTopicData?.hasDropdown && !activeSubtopic) {
    // show first subtopic by default
    content = activeTopicData.subtopics[0];
  }

  return (
    // <UserRoute>
      <div className="min-h-screen bg-surface font-sans">
        {/* ── Top bar ── */}
        <div className="sticky top-0 z-30 bg-white border-b border-[#e5e7eb] px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9zm0 5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 14.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#111827]">
              Reading Resources
            </span>
            <span className="hidden sm:inline text-[#e5e7eb]">·</span>
            <span className="hidden sm:inline text-xs text-[#6b7280]">
              Grammar & Sentence Patterns
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-[#6b7280] bg-[#f3f4f6] px-2.5 py-1 rounded-full">
              {content?.sentences?.length ?? 0} examples
            </span>
          </div>
        </div>

        <div className="flex h-[calc(100vh-53px)]">
          {/* ── Mobile overlay ── */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* ── LEFT SIDEBAR ── */}
          <aside
            className={`
            fixed lg:static top-[53px] left-0 z-50 lg:z-auto
            h-[calc(100vh-53px)] lg:h-full
            w-64 bg-white border-r border-[#e5e7eb]
            flex flex-col overflow-y-auto
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}>
            <div className="p-4 border-b border-[#e5e7eb]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="white"
                    strokeWidth={1.8}
                    className="w-3.5 h-3.5">
                    <path
                      d="M2 3h12M2 6h8M2 9h10M2 12h6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-[#111827]">
                  Topics
                </span>
              </div>
            </div>

            <nav className="p-3 space-y-0.5 flex-1">
              {topics.map((topic) => (
                <SidebarItem
                  key={topic.id}
                  topic={topic}
                  isActive={activeTopic === topic.id && !topic.hasDropdown}
                  onSelect={handleSelectTopic}
                  openDropdown={openDropdown}
                  onToggleDropdown={handleToggleDropdown}
                  activeSubtopic={activeSubtopic}
                  onSelectSubtopic={handleSelectSubtopic}
                />
              ))}
            </nav>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 overflow-y-auto">
            {content ? (
              <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                      Reading Resources
                    </span>
                    <span className="text-[#e5e7eb]">/</span>
                    <span className="text-xs text-[#6b7280]">
                      {content.label}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-[#111827] mb-3">
                    {content.label}
                  </h1>

                  {/* Rule box */}
                  <div className="flex items-start gap-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl px-4 py-3">
                    <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-red-500 to-orange-500 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-0.5">
                        Rule
                      </p>
                      <p className="text-sm text-[#374151] font-medium">
                        {content.bangla}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sentence list */}
                <div className="space-y-3">
                  {content.sentences.map((sentence, i) => (
                    <div
                      key={i}
                      className="group flex gap-4 bg-white rounded-xl border border-[#e5e7eb] px-5 py-4
                               hover:border-red-200 hover:shadow-sm transition-all duration-150">
                      {/* Number */}
                      <span
                        className="shrink-0 w-7 h-7 rounded-lg bg-[#f3f4f6] group-hover:bg-red-50
                                 text-[#6b7280] group-hover:text-red-500 text-xs font-bold
                                 flex items-center justify-center transition-colors duration-150 mt-0.5">
                        {i + 1}
                      </span>

                      {/* Sentence */}
                      <p className="text-[#111827] text-sm sm:text-[15px] leading-relaxed flex-1">
                        {sentence}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer count */}
                <div className="mt-8 pt-6 border-t border-[#e5e7eb] flex items-center justify-between text-xs text-[#6b7280]">
                  <span>{content.sentences.length} example sentences</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    IELTS Writing &amp; Reading
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-[#6b7280] text-sm">
                Select a topic from the sidebar
              </div>
            )}
          </main>
        </div>
      </div>
    //// </UserRoute>
  );
}
