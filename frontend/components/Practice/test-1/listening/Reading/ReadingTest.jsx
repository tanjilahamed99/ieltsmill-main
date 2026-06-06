"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_SEC = 40 * 60;
const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const ANSWER_KEY = {
  1: "FALSE",
  2: "TRUE",
  3: "NOT GIVEN",
  4: "NOT GIVEN",
  5: "TRUE",
  6: "pavilions",
  7: "drought",
  8: "tourists",
  9: "earthquake",
  10: "four sides",
  11: "tank",
  12: "verandas",
  13: "underwater",
  14: "viii",
  15: "iii",
  16: "xi",
  17: "i",
  18: "v",
  19: "x",
  20: "ii",
  21: "iv",
  22: "TRUE",
  23: "FALSE",
  24: "NOT GIVEN",
  25: "NOT GIVEN",
  26: "FALSE",
  27: "C",
  28: "G",
  29: "E",
  30: "A",
  31: "F",
  32: "B",
  36: "NO",
  37: "YES",
  38: "NOT GIVEN",
  39: "NOT GIVEN",
  40: "NO",
};

const ALT_ANSWERS = {
  10: ["four sides", "4 sides"],
  12: ["verandas", "verandahs"],
  9: ["earthquake"],
};

const RANGES = [
  [1, 13],
  [14, 26],
  [27, 40],
];

function normalise(s) {
  return (s || "").toLowerCase().trim().replace(/\s+/g, " ");
}
function isCorrect(n, userVal) {
  if (!userVal) return false;
  const key = normalise(ANSWER_KEY[n]);
  const uv = normalise(userVal);
  if (uv === key) return true;
  const alts = ALT_ANSWERS[n];
  if (alts) return alts.some((a) => normalise(a) === uv);
  return false;
}

// ── PASSAGE DATA ──────────────────────────────
const PASSAGES = [
  {
    id: 1,
    label: "Passage 1",
    title: "Stepwells",
    subtitle:
      "A millennium ago, stepwells were fundamental to life in the driest parts of India.",
    text: `A millennium ago, stepwells were fundamental to life in the driest parts of India. Although many have been neglected, recent restoration has returned them to their former glory. Richard Cox travelled to north-western India to document these spectacular monuments from a bygone era.

During the sixth and seventh centuries, the inhabitants of the modern-day states of Gujarat and Rajasthan in North-western India developed a method of gaining access to clean, fresh groundwater during the dry season for drinking, bathing, watering animals and irrigation. However, the significance of this invention — the stepwell — goes beyond its utilitarian application.

Unique to the region, stepwells are often architecturally complex and vary widely in size and shape. During their heyday, they were places of gathering, of leisure, of relaxation and of worship for villagers of all but the lowest castes. Most stepwells are found dotted round the desert areas of Gujarat (where they are called vav) and Rajasthan (where they are known as baoli), while a few also survive in Delhi. Some were located in or near villages as public spaces for the community; others were positioned beside roads as resting places for travellers.

As their name suggests, stepwells comprise a series of stone steps descending from ground level to the water source (normally an underground aquifer) as it recedes following the rains. When the water level was high, the user needed only to descend a few steps to reach it; when it was low, several levels would have to be negotiated.

Some wells are vast, open craters with hundreds of steps paving each sloping side, often in tiers. Others are more elaborate, with long stepped passages leading to the water via several storeys. Built from stone and supported by pillars, they also included pavilions that sheltered visitors from the relentless heat. But perhaps the most impressive features are the intricate decorative sculpture that embellishes many stepwells, showing activities from fighting and dancing to everyday acts such as women combing their hair and churning butter.

Down the centuries, thousands of wells were constructed throughout north-western India, but the majority have now fallen into disuse; many are derelict and dry, as groundwater has been diverted for industrial use and the wells no longer reach the water table. Their condition hasn't been helped by recent dry spells: southern Rajasthan suffered an eight-year drought between 1996 and 2004.

However, some important sites in Gujarat have recently undergone major renovation, and the state government announced last year that it plans to restore the stepwells throughout the state.

In Patan, the state's ancient capital, the stepwell of Rani Ki Vav (Queen's Stepwell) is perhaps the finest current example. It was built by Queen Udayamati during the late 11th century, but became silted up following a flood during the 13th century. The Archaeological Survey of India began restoring it in the 1960s, and today it's in pristine condition. At 65 metres long, 20 metres wide and 27 metres deep, Rani Ki Vav features 500 distinct sculptures decorated niche-like throughout the monument, depicting gods such as Vishnu and Ganesh in various incarnations. Incredibly, in January 2001, this ancient structure survived a devastating earthquake that measured 7.5 on the Richter scale.

Another example is the Surya Kund in Modhera, northern Gujarat, next to the Sun Temple, built by King Bhima I in 1026 to honour the sun god Surya. It actually resembles a tank (kund means reservoir or pond) rather than a well, but displays the hallmarks of stepwell architecture, including four sides of steps that descend to the bottom in a stunning geometrical formation. The terraces house 100 small, intricately carved shrines between the sets of steps.

Rajasthan also has a wealth of wells. The ancient city of Bundi, 200 kilometres south of Jaipur, is renowned for its architecture, including its stepwells. One of the larger examples is Raniji Ki Baori, which was built by the queen of the region, Nathavatiji, in 1699. At 46 metres deep, 20 metres wide and 40 metres long, the intricately carved monument is one of 21 baories commissioned in the Bundi area by Nathavatiji.

Still in public use is Neemrana Ki Baori, located just off the Jaipur–Delhi highway. Constructed in around 1700, it's nine storeys deep, with the last two being underwater. At ground level, there are six colonnaded openings from where the visitor descends 170 steps to the deepest water source.

Today, following years of neglect, many of these monuments to medieval engineering have been saved by the Archaeological Survey of India, which has recognised the importance of preserving them as part of the country's rich history. Tourists flock to wells in far-flung corners of north-western India to gaze in wonder at these architectural marvels from 1,000 years ago, which serve as a reminder of both the ingenuity and artistry of ancient civilisations and of the value of water to human existence.`,
    questions: [
      {
        type: "tfng",
        heading: "Questions 1–5",
        title:
          "Do the following statements agree with the information given in Reading Passage 1?",
        sub: "In boxes on your answer sheet, write",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        optionLabels: {
          TRUE: "if the statement agrees with the information",
          FALSE: "if the statement contradicts the information",
          "NOT GIVEN": "if there is no information on this",
        },
        items: [
          {
            n: 1,
            text: "Examples of ancient stepwells can be found all over the world.",
          },
          {
            n: 2,
            text: "Stepwells had a range of functions, in addition to those related to water collection.",
          },
          {
            n: 3,
            text: "The few existing stepwells in Delhi are more attractive than those found elsewhere.",
          },
          {
            n: 4,
            text: "It took workers many years to build the stone steps characteristic of stepwells.",
          },
          {
            n: 5,
            text: "The number of steps above the water level in a stepwell altered during the course of a year.",
          },
        ],
      },
      {
        type: "short",
        heading: "Questions 6–8",
        title: "Answer the questions below.",
        sub: "Choose ONE WORD ONLY from the passage for each answer.",
        items: [
          {
            n: 6,
            text: "Which part of some stepwells provided shade for people?",
          },
          {
            n: 7,
            text: "What type of serious climatic event, which took place in southern Rajasthan, is mentioned in the article?",
          },
          { n: 8, text: "Who are frequent visitors to stepwells nowadays?" },
        ],
      },
      {
        type: "table",
        heading: "Questions 9–13",
        title: "Complete the table below.",
        sub: "Choose ONE WORD AND/OR A NUMBER from the passage for each answer.\nWrite your answers in boxes on your answer sheet.",
        headers: ["Stepwells", "Date", "Features", "Other notes"],
        rows: [
          {
            col0: "Rani Ki Vav",
            col1: "Late 11th century",
            col2: [
              { text: "As many as 500 sculptures decorate the monument." },
            ],
            col3: [
              {
                text: "Restored in the 1960s.\n\nExcellent condition, despite the ",
              },
              { n: 9 },
              { text: " of 2001." },
            ],
          },
          {
            col0: "Surya Kund",
            col1: "1026",
            col2: [
              { text: "Steps on the " },
              { n: 10 },
              { text: " produce a geometric pattern.\n\nCarved shrines." },
            ],
            col3: [
              { text: "Looks more like a " },
              { n: 11 },
              { text: " than a well." },
            ],
          },
          {
            col0: "Raniji Ki Baori",
            col1: "1699",
            col2: [{ text: "Intricately carved monument." }],
            col3: [
              {
                text: "One of 21 baories in the area commissioned by Queen Nathavatiji.",
              },
            ],
          },
          {
            col0: "Chand Baori",
            col1: "850 AD",
            col2: [{ text: "Steps take you down 11 storeys to the bottom." }],
            col3: [
              { text: "Old, deep and very dramatic.\n\nHas " },
              { n: 12 },
              { text: " which provide a view to the steps." },
            ],
          },
          {
            col0: "Neemrana Ki Baori",
            col1: "1700",
            col2: [{ text: "Has two " }, { n: 13 }, { text: " levels." }],
            col3: [{ text: "Used by public today." }],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Passage 2",
    title: "European Transport Systems 1990–2010",
    subtitle:
      "What have been the trends and what are the prospects for European transport systems?",
    text: `[Paragraph A] It is difficult to conceive of vigorous economic growth without an efficient transport system. Although modern information technologies can reduce the demand for physical transport by facilitating teleworking and teleshopping, the requirement for transport continues to increase. There are two key factors behind this trend. For passenger transport, the determining factor is the spectacular growth in car use. The number of cars on European Union (EU) roads saw an increase of three million cars each year from 1990 to 2010, and in the next decade the EU will see a further substantial increase in its fleet.

[Paragraph B] As far as goods transport is concerned, growth is due to a large extent to changes in the European economy and its system of production. In the last 20 years, as internal frontiers have been abolished, the EU has moved from a 'stock' economy to a 'flow' economy. This phenomenon has been emphasised by the relocation of some industries, particularly those which are labour intensive, to reduce production costs, even though the production site is hundreds or even thousands of kilometres away from the final assembly plant or away from users.

[Paragraph C] The strong economic growth expected in countries which are candidates for entry to the EU will also increase transport flows, in particular road haulage traffic. In 1998, some of these countries already exported more than twice their 1990 volumes and imported more than five times their 1990 volumes. And although many candidate countries inherited a transport system which encouraged rail, the distribution between modes has tipped sharply in favour of road transport since the 1990s. Between 1990 and 1998, road haulage increased by 19.4%, while during the same period rail haulage decreased by 43.5%, although it is still on average at a much higher level than in existing member states.

[Paragraph D] However, a new imperative — sustainable development — offers an opportunity for adapting the EU's common transport policy. The objective, agreed by the Gothenburg European Council, is to be fully achieved by 2020, but proposed measures are nonetheless a firm essential step towards a sustainable transport system which will ideally be in place in 30 years' time, that is by 2040.

[Paragraph E] In 1994, energy consumption in the transport sector was to blame for 28% of emissions of CO2, the leading greenhouse gas. According to the latest estimates, if nothing is done to reverse the traffic growth trend, CO2 emissions from transport can be expected to increase by around 50% to 1,113 billion tonnes by 2020, compared with the 739 billion tonnes recorded in 1990. Once again, road transport is the main culprit since it alone accounts for 84% of the CO2 emissions attributable to transport. Using alternative fuels and improving energy efficiency is thus both an ecological necessity and a technological challenge.

[Paragraph F] At the same time greater efforts must be made to achieve a modal shift. Such a change cannot be achieved overnight, all the less so after over half a century of constant deterioration in favour of road. This has reached such a pitch that today rail freight services are facing marginalisation, with just 8% of market share, and with international goods trains struggling along at an average speed of 18 km/h.

[Paragraph G] Three possible options have emerged. The first approach would consist of focusing on road transport solely through pricing. This option would not be accompanied by complementary measures in the other modes of transport. In the short term it might curb the growth in road transport through the better loading ratio of goods vehicles and occupancy rates of passenger vehicles. However, the lack of measures available to mobilise other modes of transport would make it impossible for more sustainable modes to take up the baton.

[Paragraph H] The second approach also concentrates on road transport pricing but is accompanied by measures to increase the efficiency of the other modes: better quality of services, logistics, technology. However, this approach does not include investment in new infrastructure, nor does it guarantee better regional cohesion. It could help to achieve greater uncoupling than the first approach, but road transport would keep the lion's share of the market and continue to concentrate on unsuited arteries, despite being the most polluting of the modes.

[Paragraph I] The third approach, which is new, comprises a series of measures ranging from pricing to mobilising alternative modes of transport and targeting investment in the trans-European network. The integrated approach would allow the market shares of the other modes to return to their 1998 levels and thus achieve a shift of balance. It is far more ambitious than it looks, bearing in mind the historical imbalance in favour of roads for the last fifty years, but would achieve a marked break in the link between road transport growth and economic growth, without placing restrictions on the mobility of people and goods.`,
    headingsList: [
      { id: "i", text: "A fresh and important long-term goal" },
      {
        id: "ii",
        text: "Restricting road use through changing policies alone",
      },
      {
        id: "iii",
        text: "Changes affecting the distances goods may be transported",
      },
      {
        id: "iv",
        text: "Taking all the steps necessary to change transport patterns",
      },
      { id: "v", text: "The environmental costs of road transport" },
      { id: "vi", text: "The escalating cost of rail transport" },
      { id: "vii", text: "The trend to achieve transport rebalance" },
      { id: "viii", text: "The rapid growth of private transport" },
      { id: "ix", text: "Plans to develop major road networks" },
      { id: "x", text: "Transport trends in countries awaiting EU admission" },
      {
        id: "xi",
        text: "Changing for needs and improving other transport methods",
      },
    ],
    questions: [
      {
        type: "headings",
        heading: "Questions 14–21",
        title: "Reading Passage 2 has nine paragraphs, A–I.",
        sub: "Choose the correct heading for each paragraph from the list of headings below.\nDrag each heading into the matching slot, or type the Roman numeral.",
        items: [
          { n: 14, label: "Paragraph A" },
          { n: 15, label: "Paragraph B" },
          { n: 16, label: "Paragraph C" },
          { n: 17, label: "Paragraph D" },
          { n: 18, label: "Paragraph E" },
          { n: 19, label: "Paragraph F" },
          { n: 20, label: "Paragraph G" },
          { n: 21, label: "Paragraph I" },
        ],
      },
      {
        type: "tfng",
        heading: "Questions 22–26",
        title:
          "Do the following statements agree with the information given in Reading Passage 2?",
        sub: "In boxes on your answer sheet, write",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        optionLabels: {
          TRUE: "if the statement agrees with the information",
          FALSE: "if the statement contradicts the information",
          "NOT GIVEN": "if there is no information on this",
        },
        items: [
          {
            n: 22,
            text: "The need for transport is growing, despite technological developments.",
          },
          {
            n: 23,
            text: "To reduce production costs, some industries have been moved closer to their relevant consumers.",
          },
          {
            n: 24,
            text: "Cars are prohibitively expensive in some EU candidate countries.",
          },
          {
            n: 25,
            text: "The Gothenburg European Council was set up 10 years ago.",
          },
          {
            n: 26,
            text: "By the end of this decade, CO2 emissions from transport are predicted to reach 739 billion tonnes.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Passage 3",
    title: "The Psychology of Innovation",
    subtitle: "Why are so few companies truly innovative?",
    text: `Innovation is key to business survival, and companies put substantial resources into inspiring employees to develop new ideas. There are, nevertheless, people working in luxurious, state-of-the-art centres designed to stimulate innovation who find that their environment doesn't make them feel at all creative. And there are those who don't have a widget or much space, but who innovate successfully.

According to Robert B. Cialdini, Professor of Psychology at Arizona State University, one reason that companies don't succeed as often as they should is that innovation starts with recruitment. Research shows that the fit between an employee's values and a company's values makes a difference to what contribution they make and whether, two years after they join, they're still at the company. Studies at Harvard Business School show that, although some individuals may be more creative than others, almost every individual can be creative in the right circumstances.

The most famous photograph in the story of rock 'n' roll emphasises Cialdini's view. The 1956 picture of singers Elvis Presley, Carl Perkins, Johnny Cash and Jerry Lee Lewis jamming at a piano in Sun Studios in Memphis tells a hidden story. Sam's 'million-dollar quartet' could have been a quintet. Missing from the picture is Roy Orbison, a greater musical technician than Lewis, Perkins or Cash. Sam Phillips, who owned Sun, wanted to revolutionise popular music with songs that fused black and white music, and country and blues. Presley, Cash, Perkins and Lewis instinctively understood Phillips's ambition and believed in it. Orbison wasn't inspired by the goal, and only ever achieved one hit with the Sun label.

Values fit matters, says Cialdini, because innovation is, in part, a process of change, and we are hard-wired to resist change. Managers should therefore adopt an approach that appears counterintuitive — they should explain what stands to be lost if the company fails to seize a particular opportunity. Studies show that we invariably take more gambles when we are threatened with a loss than when offered a reward.

Cialdini believes that the 'follow-the-leader syndrome' is dangerous, not least because it encourages bosses to 'go it alone'. 'It's been scientifically proven that three people will be better than one at solving problems, even if that one person is the smartest person in the field.' To prove his point, Cialdini cites an interview with molecular biologist James Watson. Watson, together with Francis Crick, discovered the structure of DNA, the genetic information carrier of all living organisms. When asked how they had cracked the code, Watson said something remarkable. He said that Crick had succeeded because they were aware that they weren't the most intelligent of the scientists pursuing the answer. The smartest scientist was Rosalind Franklin who, Watson said, 'was so intelligent she rarely sought advice'.

Network taps into one of the basic drivers of human behaviour. 'The principle of social proof is so pervasive that we don't even recognise it,' says Cialdini. 'If your project is being overlooked by a group of veteran employees, ask another old-timer to speak up for it.' Cialdini is not alone in advocating this strategy. Research shows that peer influence, used horizontally, not vertically, is much more powerful than any boss's speech.

Writing, visualising, and prototyping can stimulate the flow of new ideas. Cialdini cites scores of research papers and historical events that prove that even something as simple as writing deepens every individual's engagement in the project. It is, he says, the reason why all those competitions on breakfast cereal packets encouraged us to write in no more than 50 words. 'I like Kellogg's Corn Flakes because…' 'The very act of writing makes us more likely to believe it.'

Authority doesn't have to inhibit innovation but it often does. The wrong kind of leadership will lead to what Cialdini calls 'captainitis' — the regrettable tendency of team members to opt out of team responsibilities that are properly theirs. He calls it 'captainitis' because, he says, 'crew members of multipilot aircraft exhibit a sometimes deadly passivity when the flight captain makes a clearly wrong-headed decision'. This behaviour is not, he says, unique to air travel, but can happen in any workplace where the leader is overbearing.

At the other end of the scale is the 1960s Memphis design collective, a group of young designers for whom the only rule was that there were no rules. The environment encouraged a free interchange of ideas, which led to more creativity with form, function, colour and materials that revolutionised attitudes to furniture design.

Finally, Cialdini believes the ideal team should have brilliant leaders who celebrate accomplishment and give credit where it is due. Cialdini says: 'Leaders should encourage everyone to contribute and simultaneously ensure all concerned that every recommendation is important to making the right decision and will be given full attention.' The satisfying thing about innovation is that there are many approaches, but no magic formula. However, a manager who wants to create a truly innovative culture can make their job a lot easier by recognising three psychological realities.`,
    questions: [
      // ── FIXED: Questions 27–30 — proper multi-question MCQ block ──
      {
        type: "mcq",
        heading: "Questions 27–30",
        title: "Choose the correct letter, A, B, C or D.",
        sub: "Write the correct letter in boxes on your answer sheet.",
        items: [
          {
            n: 27,
            text: "The example of the 'million-dollar quartet' underlines the writer's point about",
            options: [
              { id: "A", text: "recognising talent." },
              { id: "B", text: "working as a team." },
              { id: "C", text: "having a shared objective." },
              { id: "D", text: "being an effective leader." },
            ],
          },
          {
            n: 28,
            text: "James Watson suggests that he and Francis Crick won the race to discover the DNA code because they",
            options: [
              { id: "A", text: "were conscious of their own limitations." },
              { id: "B", text: "brought complementary skills to their partnership." },
              { id: "C", text: "were determined to outperform their brighter rivals." },
              { id: "D", text: "encouraged each other to realise their joint ambition." },
            ],
          },
          {
            n: 29,
            text: "The writer mentions competitions on breakfast cereal packets as an example of how to",
            options: [
              { id: "A", text: "inspire creative thinking." },
              { id: "B", text: "generate concise writing." },
              { id: "C", text: "promote loyalty to a group." },
              { id: "D", text: "strengthen commitment to an idea." },
            ],
          },
          {
            n: 30,
            text: "In the last paragraph, the writer suggests that it is important for employees to",
            options: [
              { id: "A", text: "feel that their contributions are valued." },
              { id: "B", text: "be aware of their company's goals." },
              { id: "C", text: "have respect for their co-workers' achievements." },
              { id: "D", text: "understand why certain management decisions are made." },
            ],
          },
        ],
      },
      {
        type: "complete_drag",
        heading: "Questions 31–35",
        title: "Complete each sentence with the correct ending, A–G, below.",
        sub: "Write the correct letter, A–G, in boxes on your answer sheet.",
        endings: [
          { id: "A", text: "take chances." },
          { id: "B", text: "share their ideas." },
          { id: "C", text: "become competitive." },
          { id: "D", text: "get promotion." },
          { id: "E", text: "avoid risk." },
          { id: "F", text: "ignore their duties." },
          { id: "G", text: "remain in their jobs." },
        ],
        items: [
          {
            n: 31,
            stem: "Employees whose values match those of their employers are more likely to",
          },
          { n: 32, stem: "At times of change, people tend to" },
          {
            n: 33,
            stem: "If people are aware of what they might lose, they will often",
          },
          { n: 34, stem: "People working under a dominant boss are liable to" },
          {
            n: 35,
            stem: "Employees working in organisations with few rules are more likely to",
          },
        ],
      },
      {
        type: "tfng",
        heading: "Questions 36–40",
        title:
          "Do the following statements agree with the claims of the writer in Reading Passage 3?",
        sub: "In boxes on your answer sheet, write",
        options: ["YES", "NO", "NOT GIVEN"],
        optionLabels: {
          YES: "if the statement agrees with the claims of the writer",
          NO: "if the statement contradicts the claims of the writer",
          "NOT GIVEN":
            "if it is impossible to say what the writer thinks about this",
        },
        items: [
          {
            n: 36,
            text: "The physical surroundings in which a person works play a key role in determining their creativity.",
          },
          { n: 37, text: "Most people have the potential to be creative." },
          {
            n: 38,
            text: "Teams work best when their members are of equally matched intelligence.",
          },
          {
            n: 39,
            text: "It is easier for smaller companies to be innovative.",
          },
          {
            n: 40,
            text: "A manager's approval of an idea is more persuasive than that of a colleague.",
          },
        ],
      },
    ],
  },
];

// ── HIGHLIGHT UTILS ───────────────────────────
function buildSpans(text, zoneHighlights) {
  if (!zoneHighlights.length) return [{ text, hl: false }];
  let pts = new Set([0, text.length]);
  zoneHighlights.forEach((h) => {
    pts.add(h.start);
    pts.add(h.end);
  });
  pts = [...pts].sort((a, b) => a - b);
  return pts.slice(0, -1).map((start, i) => {
    const end = pts[i + 1];
    const hl = zoneHighlights.some((h) => h.start <= start && h.end >= end);
    return { text: text.slice(start, end), hl };
  });
}

function useHighlights() {
  const [highlights, setHighlights] = useState([]);
  const [selection, setSelection] = useState(null);
  const isHighlighted = selection
    ? highlights.some(
        (h) =>
          h.zoneId === selection.zoneId &&
          h.start <= selection.start &&
          h.end >= selection.end,
      )
    : false;
  const handleSelect = useCallback((sel) => setSelection(sel), []);
  const addHighlight = useCallback(() => {
    if (!selection) return;
    setHighlights((prev) => {
      const rest = prev.filter(
        (h) =>
          !(
            h.zoneId === selection.zoneId &&
            h.end > selection.start &&
            h.start < selection.end
          ),
      );
      return [...rest, { id: Date.now(), ...selection }];
    });
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  }, [selection]);
  const clearHighlight = useCallback(() => {
    if (!selection) return;
    setHighlights((prev) =>
      prev.filter(
        (h) =>
          !(
            h.zoneId === selection.zoneId &&
            h.start < selection.end &&
            h.end > selection.start
          ),
      ),
    );
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  }, [selection]);
  const dismiss = useCallback(() => {
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  }, []);
  return {
    highlights,
    selection,
    isHighlighted,
    handleSelect,
    addHighlight,
    clearHighlight,
    dismiss,
  };
}

function HighlightableText({ zoneId, text, highlights, onSelect }) {
  const ref = useRef(null);
  const handlePointerUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
    const range = sel.getRangeAt(0);
    if (!ref.current?.contains(range.commonAncestorContainer)) return;
    const rect = range.getBoundingClientRect();
    const pre = document.createRange();
    pre.setStart(ref.current, 0);
    pre.setEnd(range.startContainer, range.startOffset);
    const start = pre.toString().length;
    onSelect({
      zoneId,
      start,
      end: start + sel.toString().length,
      rect: {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      },
    });
  }, [zoneId, onSelect]);
  const myHL = highlights.filter((h) => h.zoneId === zoneId);
  const spans = buildSpans(text, myHL);
  return (
    <span
      ref={ref}
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
      style={{ userSelect: "text", WebkitUserSelect: "text", cursor: "text" }}>
      {spans.map((s, i) =>
        s.hl ? (
          <mark key={i} className="rt-mark">
            {s.text}
          </mark>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </span>
  );
}

function SelectionPopup({
  selection,
  isHighlighted,
  onHighlight,
  onClear,
  onDismiss,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ top: -999, left: -999, ready: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pw = el.offsetWidth || 160;
    const ph = el.offsetHeight || 44;
    const { rect } = selection;
    const sy = window.scrollY;
    const cx = (rect.left + rect.right) / 2;
    let top = rect.top + sy - ph - 12;
    if (top < sy + 8) top = rect.bottom + sy + 12;
    let left = Math.max(8, Math.min(cx - pw / 2, window.innerWidth - pw - 8));
    setPos({ top, left, ready: true });
  }, [selection]);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onDismiss();
    };
    document.addEventListener("mousedown", h);
    document.addEventListener("touchstart", h);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("touchstart", h);
    };
  }, [onDismiss]);
  return (
    <div
      ref={ref}
      className="rt-popup"
      style={{
        top: pos.top,
        left: pos.left,
        opacity: pos.ready ? 1 : 0,
        pointerEvents: pos.ready ? "auto" : "none",
      }}>
      {!isHighlighted ? (
        <button className="rt-pop-btn rt-pop-hl" onClick={onHighlight}>
          ✏ Highlight
        </button>
      ) : (
        <button className="rt-pop-btn rt-pop-cl" onClick={onClear}>
          ✕ Clear
        </button>
      )}
    </div>
  );
}

// ── Q NUMBER BADGE ────────────────────────────
function QNum({ n, submitted, vals }) {
  const cls =
    submitted && ANSWER_KEY[n] !== undefined
      ? isCorrect(n, vals[n])
        ? " qnum-ok"
        : " qnum-bad"
      : "";
  return <span className={`qnum${cls}`}>{n}</span>;
}

// ── TRUE/FALSE/NOT GIVEN ──────────────────────
function TFNGBlock({ block, vals, onChange, submitted }) {
  const optLetters = ["A", "B", "C"];
  return (
    <div className="qblock">
      <div className="qblock-head">
        <div className="qblock-label">{block.heading}</div>
        <p className="qblock-title">{block.title}</p>
        {block.sub && <p className="qblock-sub-italic">{block.sub}</p>}
        {block.optionLabels && (
          <div className="tfng-legend">
            {block.options.map((opt) => (
              <div key={opt} className="tfng-legend-row">
                <span className="tfng-legend-key">{opt}</span>
                <span className="tfng-legend-val">
                  {block.optionLabels[opt]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="tfng-list">
        {block.items.map(({ n, text }) => (
          <div key={n} className="tfng-item">
            <div className="tfng-qrow">
              <QNum n={n} submitted={submitted} vals={vals} />
              <p className="tfng-stmt">{text}</p>
            </div>
            <div className="tfng-opts-abc">
              {block.options.map((opt, i) => {
                const letter = optLetters[i];
                const isSelected = vals[n] === opt;
                let state = "";
                if (submitted && ANSWER_KEY[n] !== undefined) {
                  if (normalise(opt) === normalise(ANSWER_KEY[n]))
                    state = "correct";
                  else if (isSelected) state = "wrong";
                } else if (isSelected) state = "selected";
                return (
                  <label
                    key={opt}
                    className={`abc-label ${state}`}
                    onClick={() => !submitted && onChange(n, opt)}>
                    <span className={`abc-circle ${state}`}>{letter}</span>
                    <span className="abc-text">{opt}</span>
                  </label>
                );
              })}
            </div>
            {submitted &&
              ANSWER_KEY[n] !== undefined &&
              !isCorrect(n, vals[n]) && (
                <div className="correct-ans-row">
                  ✓ Correct answer: <strong>{ANSWER_KEY[n]}</strong>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SHORT ANSWER ──────────────────────────────
function ShortBlock({ block, vals, onChange, submitted }) {
  return (
    <div className="qblock">
      <div className="qblock-head">
        <div className="qblock-label">{block.heading}</div>
        <p className="qblock-title">{block.title}</p>
        {block.sub && <p className="qblock-sub">{block.sub}</p>}
      </div>
      <div>
        {block.items.map(({ n, text }) => {
          const ok =
            submitted && ANSWER_KEY[n] !== undefined && isCorrect(n, vals[n]);
          const bad =
            submitted && ANSWER_KEY[n] !== undefined && !isCorrect(n, vals[n]);
          return (
            <div key={n} className="short-row">
              <QNum n={n} submitted={submitted} vals={vals} />
              <span className="short-text">{text}</span>
              <input
                type="text"
                value={vals[n] ?? ""}
                onChange={(e) => !submitted && onChange(n, e.target.value)}
                className={`short-input ${ok ? "input-ok" : bad ? "input-bad" : ""}`}
                placeholder="............"
                readOnly={submitted}
              />
              {bad && <span className="correct-badge">✓ {ANSWER_KEY[n]}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── TABLE GAP FILL ────────────────────────────
function CellContent({ parts, vals, onChange, submitted }) {
  return (
    <span>
      {parts.map((part, i) => {
        if (part.text !== undefined) {
          return (
            <span key={i} style={{ whiteSpace: "pre-line" }}>
              {part.text}
            </span>
          );
        }
        const n = part.n;
        const ok =
          submitted && ANSWER_KEY[n] !== undefined && isCorrect(n, vals[n]);
        const bad =
          submitted && ANSWER_KEY[n] !== undefined && !isCorrect(n, vals[n]);
        return (
          <span key={i} className="tbl-cell-gap">
            <span className="tbl-qnum-inline">{n}</span>
            <input
              type="text"
              value={vals[n] ?? ""}
              onChange={(e) => !submitted && onChange(n, e.target.value)}
              className={`tbl-input ${ok ? "input-ok" : bad ? "input-bad" : ""}`}
              placeholder="Drop answer here"
              readOnly={submitted}
            />
            {bad && <span className="correct-badge"> ✓ {ANSWER_KEY[n]}</span>}
          </span>
        );
      })}
    </span>
  );
}

function TableBlock({ block, vals, onChange, submitted }) {
  return (
    <div className="qblock">
      <div className="qblock-head">
        <div className="qblock-label">{block.heading}</div>
        <p className="qblock-title">{block.title}</p>
        {block.sub && (
          <p className="qblock-sub" style={{ whiteSpace: "pre-line" }}>
            {block.sub}
          </p>
        )}
      </div>
      <div className="tbl-wrap">
        <table className="rt-table">
          <thead>
            <tr>
              {block.headers.map((h) => (
                <th key={h} className="rt-th">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                <td className="rt-td rt-td-b">{row.col0}</td>
                <td className="rt-td">{row.col1}</td>
                <td className="rt-td">
                  <CellContent
                    parts={row.col2}
                    vals={vals}
                    onChange={onChange}
                    submitted={submitted}
                  />
                </td>
                <td className="rt-td">
                  <CellContent
                    parts={row.col3}
                    vals={vals}
                    onChange={onChange}
                    submitted={submitted}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── HEADINGS DRAG AND DROP ────────────────────
function HeadingsDragBlock({ block, passage, vals, onChange, submitted }) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [touchDrag, setTouchDrag] = useState(null);

  const placedIds = block.items
    .map((item) => vals[item.n])
    .filter(Boolean)
    .map(normalise);

  const getHeading = (id) =>
    passage.headingsList.find((h) => h.id === normalise(id));

  const onDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };
  const onDragEnd = () => {
    setDraggedId(null);
    setDragOverSlot(null);
  };

  const onDropSlot = (e, n) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    block.items.forEach((item) => {
      if (normalise(vals[item.n]) === normalise(id)) onChange(item.n, "");
    });
    onChange(n, id);
    setDragOverSlot(null);
    setDraggedId(null);
  };

  const onDragStartFromSlot = (e, n, id) => {
    onChange(n, "");
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const onDropPool = (e) => {
    e.preventDefault();
    setDraggedId(null);
  };

  const onTouchStartChip = (e, id) => {
    const t = e.touches[0];
    setTouchDrag({ id, x: t.clientX, y: t.clientY });
  };
  const onTouchStartSlotChip = (e, n, id) => {
    onChange(n, "");
    const t = e.touches[0];
    setTouchDrag({ id, x: t.clientX, y: t.clientY });
  };
  useEffect(() => {
    if (!touchDrag) return;
    const move = (e) => {
      const t = e.touches[0];
      setTouchDrag((p) => (p ? { ...p, x: t.clientX, y: t.clientY } : null));
      e.preventDefault();
    };
    const end = () => {
      if (!touchDrag) return;
      const el = document.elementFromPoint(touchDrag.x, touchDrag.y);
      const slot = el?.closest("[data-slot]");
      if (slot) {
        onChange(Number(slot.dataset.slot), touchDrag.id);
      }
      setTouchDrag(null);
    };
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, [touchDrag, onChange]);

  return (
    <div className="qblock">
      <div className="qblock-head">
        <div className="qblock-label">{block.heading}</div>
        <p className="qblock-title">{block.title}</p>
        {block.sub && (
          <p className="qblock-sub" style={{ whiteSpace: "pre-line" }}>
            {block.sub}
          </p>
        )}
      </div>

      <div
        className="hdg-pool"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropPool}>
        <p className="hdg-pool-label">
          List of Headings — drag into the matching slot
        </p>
        <div className="hdg-chips">
          {passage.headingsList.map((h) => {
            const placed = placedIds.includes(h.id);
            const dragging = draggedId === h.id;
            return (
              <div
                key={h.id}
                className={`hdg-chip ${placed ? "hdg-chip-placed" : ""} ${dragging ? "hdg-chip-dragging" : ""}`}
                draggable={!placed && !submitted}
                onDragStart={
                  !placed && !submitted
                    ? (e) => onDragStart(e, h.id)
                    : undefined
                }
                onDragEnd={onDragEnd}
                onTouchStart={
                  !placed && !submitted
                    ? (e) => onTouchStartChip(e, h.id)
                    : undefined
                }>
                <span className="hdg-chip-id">{h.id}</span>
                <span className="hdg-chip-text">{h.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hdg-slots">
        {block.items.map(({ n, label }) => {
          const placedId = vals[n] ? normalise(vals[n]) : null;
          const heading = placedId ? getHeading(placedId) : null;
          const over = dragOverSlot === n;
          const ok = submitted && ANSWER_KEY[n] && isCorrect(n, vals[n]);
          const bad = submitted && ANSWER_KEY[n] && !isCorrect(n, vals[n]);
          return (
            <div key={n} className="hdg-slot-row">
              <span
                className={`qnum${ok ? " qnum-ok" : bad ? " qnum-bad" : ""}`}>
                {n}
              </span>
              <span className="hdg-para-label">{label}</span>
              <div
                className={`hdg-slot ${over ? "hdg-slot-over" : ""} ${heading ? "hdg-slot-filled" : ""} ${ok ? "hdg-slot-ok" : bad ? "hdg-slot-bad" : ""}`}
                data-slot={n}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverSlot(n);
                }}
                onDragLeave={() => setDragOverSlot(null)}
                onDrop={(e) => onDropSlot(e, n)}>
                {heading ? (
                  <div
                    className="hdg-chip hdg-chip-inslot"
                    draggable={!submitted}
                    onDragStart={
                      !submitted
                        ? (e) => onDragStartFromSlot(e, n, placedId)
                        : undefined
                    }
                    onDragEnd={onDragEnd}
                    onTouchStart={
                      !submitted
                        ? (e) => onTouchStartSlotChip(e, n, placedId)
                        : undefined
                    }>
                    <span className="hdg-chip-id">{heading.id}</span>
                    <span className="hdg-chip-text">{heading.text}</span>
                    {!submitted && (
                      <span
                        className="hdg-chip-remove"
                        onClick={() => onChange(n, "")}>
                        ✕
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="hdg-slot-empty">
                    {over ? "Release to place" : "Drop heading here"}
                  </span>
                )}
              </div>
              {!heading && (
                <input
                  type="text"
                  className={`hdg-text-input ${submitted && ANSWER_KEY[n] && isCorrect(n, vals[n]) ? "input-ok" : submitted && ANSWER_KEY[n] && !isCorrect(n, vals[n]) ? "input-bad" : ""}`}
                  value={vals[n] ?? ""}
                  onChange={(e) =>
                    !submitted && onChange(n, e.target.value.toLowerCase())
                  }
                  placeholder="i–xi"
                  maxLength={4}
                  readOnly={submitted}
                />
              )}
              {bad && <span className="correct-badge">✓ {ANSWER_KEY[n]}</span>}
            </div>
          );
        })}
      </div>

      {touchDrag && (
        <div
          className="hdg-touch-ghost"
          style={{
            left: touchDrag.x - 90,
            top: touchDrag.y - 22,
            position: "fixed",
            zIndex: 9999,
            pointerEvents: "none",
          }}>
          <span className="hdg-chip-id">{touchDrag.id}</span>
          <span className="hdg-chip-text">
            {getHeading(touchDrag.id)?.text}
          </span>
        </div>
      )}
    </div>
  );
}

// ── MCQ — FIXED: supports multiple questions, each with own options ──
function MCQBlock({ block, vals, onChange, submitted }) {
  return (
    <div className="qblock">
      <div className="qblock-head">
        <div className="qblock-label">{block.heading}</div>
        <p className="qblock-title">{block.title}</p>
        {block.sub && <p className="qblock-sub">{block.sub}</p>}
      </div>
      <div className="mcq-multi-list">
        {block.items.map(({ n, text, options }) => (
          <div key={n} className="mcq-question-group">
            <div className="mcq-qrow">
              <QNum n={n} submitted={submitted} vals={vals} />
              {text && <p className="mcq-qtext">{text}</p>}
            </div>
            <div className="mcq-list">
              {options.map((opt) => {
                const isSelected = vals[n] === opt.id;
                let state = "";
                if (submitted && ANSWER_KEY[n]) {
                  if (normalise(opt.id) === normalise(ANSWER_KEY[n]))
                    state = "correct";
                  else if (isSelected) state = "wrong";
                } else if (isSelected) state = "selected";
                return (
                  <label
                    key={opt.id}
                    className={`mcq-option ${state}`}
                    onClick={() => !submitted && onChange(n, opt.id)}>
                    <span className={`mcq-circle ${state}`}>{opt.id}</span>
                    <span className="mcq-text">{opt.text}</span>
                  </label>
                );
              })}
            </div>
            {submitted && ANSWER_KEY[n] && !isCorrect(n, vals[n]) && (
              <div className="correct-ans-row">
                ✓ Correct answer: <strong>{ANSWER_KEY[n]}</strong>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── COMPLETE WITH DRAG-DROP ENDINGS ──────────
function CompleteDragBlock({ block, vals, onChange, submitted }) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [touchDrag, setTouchDrag] = useState(null);

  const placedIds = block.items
    .map((item) => vals[item.n])
    .filter(Boolean)
    .map((v) => v.toUpperCase());
  const getEnding = (id) =>
    block.endings.find((e) => e.id === id?.toUpperCase());

  const onDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };
  const onDragEnd = () => {
    setDraggedId(null);
    setDragOverSlot(null);
  };

  const onDropSlot = (e, n) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    block.items.forEach((item) => {
      if ((vals[item.n] || "").toUpperCase() === id.toUpperCase())
        onChange(item.n, "");
    });
    onChange(n, id.toUpperCase());
    setDragOverSlot(null);
    setDraggedId(null);
  };

  const onDragStartFromSlot = (e, n, id) => {
    onChange(n, "");
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const onTouchStartChip = (e, id) => {
    const t = e.touches[0];
    setTouchDrag({ id, x: t.clientX, y: t.clientY });
  };
  const onTouchStartSlotChip = (e, n, id) => {
    onChange(n, "");
    const t = e.touches[0];
    setTouchDrag({ id, x: t.clientX, y: t.clientY });
  };

  useEffect(() => {
    if (!touchDrag) return;
    const move = (e) => {
      const t = e.touches[0];
      setTouchDrag((p) => (p ? { ...p, x: t.clientX, y: t.clientY } : null));
      e.preventDefault();
    };
    const end = () => {
      if (!touchDrag) return;
      const el = document.elementFromPoint(touchDrag.x, touchDrag.y);
      const slot = el?.closest("[data-cslot]");
      if (slot) {
        onChange(Number(slot.dataset.cslot), touchDrag.id.toUpperCase());
      }
      setTouchDrag(null);
    };
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, [touchDrag, onChange]);

  return (
    <div className="qblock">
      <div className="qblock-head">
        <div className="qblock-label">{block.heading}</div>
        <p className="qblock-title">{block.title}</p>
        {block.sub && <p className="qblock-sub">{block.sub}</p>}
      </div>

      <div className="cmp-items">
        {block.items.map(({ n, stem }) => {
          const placedId = vals[n] ? vals[n].toUpperCase() : null;
          const ending = placedId ? getEnding(placedId) : null;
          const over = dragOverSlot === n;
          const ok = submitted && ANSWER_KEY[n] && isCorrect(n, vals[n]);
          const bad = submitted && ANSWER_KEY[n] && !isCorrect(n, vals[n]);
          return (
            <div key={n} className="cmp-row">
              <div className="cmp-stem-line">
                <span
                  className={`qnum${ok ? " qnum-ok" : bad ? " qnum-bad" : ""}`}>
                  {n}
                </span>
                <span className="cmp-stem">{stem}</span>
                <div
                  className={`cmp-slot ${over ? "cmp-slot-over" : ""} ${ending ? "cmp-slot-filled" : ""} ${ok ? "cmp-slot-ok" : bad ? "cmp-slot-bad" : ""}`}
                  data-cslot={n}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverSlot(n);
                  }}
                  onDragLeave={() => setDragOverSlot(null)}
                  onDrop={(e) => onDropSlot(e, n)}>
                  {ending ? (
                    <span
                      className="cmp-placed"
                      draggable={!submitted}
                      onDragStart={
                        !submitted
                          ? (e) => onDragStartFromSlot(e, n, placedId)
                          : undefined
                      }
                      onDragEnd={onDragEnd}
                      onTouchStart={
                        !submitted
                          ? (e) => onTouchStartSlotChip(e, n, placedId)
                          : undefined
                      }>
                      <strong>{ending.id}.</strong> {ending.text}
                      {!submitted && (
                        <span
                          className="cmp-remove"
                          onClick={() => onChange(n, "")}>
                          ✕
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="cmp-empty">
                      {over ? "Release" : "Drop answer here"}
                    </span>
                  )}
                </div>
              </div>
              {bad && (
                <div className="correct-ans-row" style={{ marginLeft: 36 }}>
                  ✓ Correct:{" "}
                  <strong>
                    {ANSWER_KEY[n]}. {getEnding(ANSWER_KEY[n])?.text}
                  </strong>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className="cmp-pool"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDraggedId(null);
        }}>
        <p className="hdg-pool-label">
          Drag and drop an option to fill in each blank.
        </p>
        <div className="cmp-endings-list">
          {block.endings.map((end) => {
            const placed = placedIds.includes(end.id);
            const dragging = draggedId === end.id;
            return (
              <div
                key={end.id}
                className={`cmp-ending-chip ${placed ? "cmp-ending-placed" : ""} ${dragging ? "cmp-ending-dragging" : ""}`}
                draggable={!placed && !submitted}
                onDragStart={
                  !placed && !submitted
                    ? (e) => onDragStart(e, end.id)
                    : undefined
                }
                onDragEnd={onDragEnd}
                onTouchStart={
                  !placed && !submitted
                    ? (e) => onTouchStartChip(e, end.id)
                    : undefined
                }>
                <span className="cmp-end-letter">{end.id}.</span>
                <span className="cmp-end-text">{end.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {touchDrag && (
        <div
          className="hdg-touch-ghost"
          style={{
            left: touchDrag.x - 60,
            top: touchDrag.y - 18,
            position: "fixed",
            zIndex: 9999,
            pointerEvents: "none",
          }}>
          <span className="hdg-chip-id">{touchDrag.id}.</span>
          <span className="hdg-chip-text">{getEnding(touchDrag.id)?.text}</span>
        </div>
      )}
    </div>
  );
}

function QuestionBlock({ block, passage, vals, onChange, submitted }) {
  if (block.type === "tfng")
    return (
      <TFNGBlock
        block={block}
        vals={vals}
        onChange={onChange}
        submitted={submitted}
      />
    );
  if (block.type === "short")
    return (
      <ShortBlock
        block={block}
        vals={vals}
        onChange={onChange}
        submitted={submitted}
      />
    );
  if (block.type === "table")
    return (
      <TableBlock
        block={block}
        vals={vals}
        onChange={onChange}
        submitted={submitted}
      />
    );
  if (block.type === "headings")
    return (
      <HeadingsDragBlock
        block={block}
        passage={passage}
        vals={vals}
        onChange={onChange}
        submitted={submitted}
      />
    );
  if (block.type === "mcq")
    return (
      <MCQBlock
        block={block}
        vals={vals}
        onChange={onChange}
        submitted={submitted}
      />
    );
  if (block.type === "complete_drag")
    return (
      <CompleteDragBlock
        block={block}
        vals={vals}
        onChange={onChange}
        submitted={submitted}
      />
    );
  return null;
}

// ── DIVIDER ───────────────────────────────────
function useDivider(initial = 50) {
  const [split, setSplit] = useState(initial);
  const dragging = useRef(false);
  const containerRef = useRef(null);
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
    const move = (ev) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const pct = Math.min(
        80,
        Math.max(20, ((clientX - rect.left) / rect.width) * 100),
      );
      setSplit(pct);
    };
    const up = () => {
      dragging.current = false;
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("mouseup", up);
    document.addEventListener("touchend", up);
  }, []);
  return { split, setSplit, containerRef, onMouseDown };
}

// ── BAND SCORE ────────────────────────────────
function getBand(score) {
  if (score >= 39) return { band: "9.0", desc: "Expert user" };
  if (score >= 37) return { band: "8.5", desc: "Very good user" };
  if (score >= 35) return { band: "8.0", desc: "Very good user" };
  if (score >= 33) return { band: "7.5", desc: "Good user" };
  if (score >= 30) return { band: "7.0", desc: "Good user" };
  if (score >= 27) return { band: "6.5", desc: "Competent user" };
  if (score >= 23) return { band: "6.0", desc: "Competent user" };
  if (score >= 19) return { band: "5.5", desc: "Modest user" };
  if (score >= 15) return { band: "5.0", desc: "Modest user" };
  if (score >= 13) return { band: "4.5", desc: "Limited user" };
  if (score >= 10) return { band: "4.0", desc: "Limited user" };
  return { band: "3.5", desc: "Extremely limited user" };
}

// ── INTRO MODAL ───────────────────────────────
function IntroModal({ onStart }) {
  return (
    <div className="rt-modal-overlay">
      <div className="rt-modal">
        <p className="rt-modal-eyebrow">Cambridge IELTS 10 — Academic</p>
        <h2 className="rt-modal-title">Reading Test 1</h2>
        <p className="rt-modal-sub">40 minutes · 40 questions · 3 passages</p>
        <div className="rt-modal-notice">
          <p className="rt-notice-title">Before you begin</p>
          <p>• Read each passage carefully before answering</p>
          <p>
            • <strong>Select any text</strong> in the passage to highlight it
          </p>
          <p>
            • <strong>Drag headings/endings</strong> into the correct slots
          </p>
          <p>• Drag the centre divider to resize the panels</p>
          <p>• Submit when done to see your band score</p>
        </div>
        <button onClick={onStart} className="rt-modal-btn">
          ▶ Start Reading Test
        </button>
      </div>
    </div>
  );
}

// ── RESULT MODAL ──────────────────────────────
function ResultModal({ vals, onClose, onRestart }) {
  const allNs = Object.keys(ANSWER_KEY).map(Number);
  const score = allNs.filter((n) => isCorrect(n, vals[n])).length;
  const { band, desc } = getBand(score);
  return (
    <div className="rt-modal-overlay">
      <div className="rt-modal rt-result-modal">
        <p className="rt-modal-eyebrow">Results</p>
        <h2 className="rt-modal-title">Test Complete</h2>
        <p className="rt-modal-sub">
          Cambridge IELTS 10 · Academic Reading Test 1
        </p>
        <div className="result-score">{score}</div>
        <p className="score-label">out of {allNs.length} correct</p>
        <div className="band-row">
          <div className="band-num">{band}</div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14 }}>
              Estimated Band Score
            </p>
            <p style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{desc}</p>
          </div>
        </div>
        <p className="ans-grid-label">All answers</p>
        <div className="ans-grid">
          {allNs.map((n) => {
            const ok = isCorrect(n, vals[n]);
            const blank = !vals[n];
            return (
              <div
                key={n}
                className={`ans-cell ${blank ? "ans-blank" : ok ? "ans-ok" : "ans-bad"}`}>
                <span className="ans-n">{n}</span>
                <span className="ans-v">
                  {(vals[n] || "—").toString().toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
        <div className="result-btns">
          <button className="rbtn rbtn-sec" onClick={onClose}>
            Review answers
          </button>
          <button className="rbtn rbtn-primary" onClick={onRestart}>
            Take test again
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TOP BAR ───────────────────────────────────
function TopBar({
  activePassage,
  setActivePassage,
  vals,
  timeLeft,
  onSubmit,
  split,
  setSplit,
}) {
  const urgent = timeLeft < 300;
  const answered = (a, b) => {
    let c = 0;
    for (let i = a; i <= b; i++) if (vals[i]) c++;
    return c;
  };
  return (
    <div className="rt-topbar">
      <div className="rt-logo">
        Cambridge IELTS 10{" "}
        <span className="rt-logo-sub"> · Academic Reading · Test 1</span>
      </div>
      <div className="rt-tabs">
        {PASSAGES.map((p, i) => {
          const [a, b] = RANGES[i];
          return (
            <button
              key={p.id}
              onClick={() => setActivePassage(i)}
              className={`rt-tab ${activePassage === i ? "rt-tab-active" : ""}`}>
              <span>{p.label}</span>
              <span
                className={`rt-tab-badge ${activePassage === i ? "rt-tab-badge-active" : ""}`}>
                {answered(a, b)}/{b - a + 1}
              </span>
            </button>
          );
        })}
      </div>
      <div className="rt-topbar-right">
        <div className="rt-split-btns">
          <button
            className="rt-split-btn"
            title="50/50"
            onClick={() => setSplit(50)}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="12" y1="3" x2="12" y2="21" />
            </svg>
          </button>
          <button
            className="rt-split-btn"
            title="Wide passage"
            onClick={() => setSplit(65)}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </button>
          <button
            className="rt-split-btn"
            title="Wide questions"
            onClick={() => setSplit(35)}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </button>
        </div>
        <span className={`rt-timer ${urgent ? "rt-timer-urgent" : ""}`}>
          {fmt(timeLeft)}
        </span>
        <button onClick={onSubmit} className="rt-submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
}

// ── PASSAGE PANEL ─────────────────────────────
function PassagePanel({ passage, highlights, onSelect }) {
  const paragraphs = passage.text.split(/\n\n+/);
  return (
    <div className="rt-passage-panel">
      <div className="rt-passage-inner">
        <span className="rt-passage-badge">{passage.label}</span>
        <h1 className="rt-passage-title">{passage.title}</h1>
        <p className="rt-passage-sub">{passage.subtitle}</p>
        <div className="rt-passage-rule" />
        {paragraphs.map((para, i) => (
          <p key={i} className="rt-para">
            <HighlightableText
              zoneId={`p${passage.id}-${i}`}
              text={para}
              highlights={highlights}
              onSelect={onSelect}
            />
          </p>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────
export default function ReadingTest() {
  const [phase, setPhase] = useState("intro");
  const [activePassage, setActivePassage] = useState(0);
  const [vals, setVals] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SEC);
  const [showResult, setShowResult] = useState(false);
  const submitted = phase === "done";
  const { split, setSplit, containerRef, onMouseDown } = useDivider(50);
  const {
    highlights,
    selection,
    isHighlighted,
    handleSelect,
    addHighlight,
    clearHighlight,
    dismiss,
  } = useHighlights();

  useEffect(() => {
    if (phase !== "test") return;
    if (timeLeft <= 0) {
      setPhase("done");
      setShowResult(true);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft]);

  const onChange = useCallback(
    (n, v) => setVals((p) => ({ ...p, [n]: v })),
    [],
  );
  const handleSubmit = useCallback(() => {
    setPhase("done");
    setShowResult(true);
  }, []);
  const handleRestart = useCallback(() => {
    setVals({});
    setTimeLeft(TOTAL_SEC);
    setActivePassage(0);
    setShowResult(false);
    setPhase("intro");
  }, []);

  const passage = PASSAGES[activePassage];
  const totalAnswered = Object.values(vals).filter(Boolean).length;

  return (
    <div className="rt-root">
      {phase === "intro" && <IntroModal onStart={() => setPhase("test")} />}
      {showResult && (
        <ResultModal
          vals={vals}
          onClose={() => setShowResult(false)}
          onRestart={handleRestart}
        />
      )}

      {phase !== "intro" && (
        <TopBar
          activePassage={activePassage}
          setActivePassage={setActivePassage}
          vals={vals}
          timeLeft={timeLeft}
          onSubmit={handleSubmit}
          split={split}
          setSplit={setSplit}
        />
      )}
      {phase !== "intro" && (
        <div className="rt-progress">
          <div
            className="rt-progress-bar"
            style={{ width: `${(totalAnswered / 40) * 100}%` }}
          />
        </div>
      )}
      {phase !== "intro" && (
        <div className="rt-body" ref={containerRef}>
          <div className="rt-left" style={{ width: `${split}%` }}>
            <PassagePanel
              passage={passage}
              highlights={highlights}
              onSelect={handleSelect}
            />
          </div>
          <div
            className="rt-divider"
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}>
            <div className="rt-div-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="rt-right" style={{ width: `${100 - split}%` }}>
            <div className="rt-questions-inner">
              {passage.questions.map((block, i) => (
                <QuestionBlock
                  key={i}
                  block={block}
                  passage={passage}
                  vals={vals}
                  onChange={onChange}
                  submitted={submitted}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {selection && phase === "test" && (
        <SelectionPopup
          selection={selection}
          isHighlighted={isHighlighted}
          onHighlight={addHighlight}
          onClear={clearHighlight}
          onDismiss={dismiss}
        />
      )}

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rt-root { font-family: 'Times New Roman', Times, serif; background: #f5f5f5; min-height: 100vh; display: flex; flex-direction: column; overflow: hidden; color: #1a1a1a; }

        /* ── TOP BAR ── */
        .rt-topbar { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; background: #fff; border-bottom: 1px solid #ddd; padding: 0 16px; height: 50px; flex-shrink: 0; gap: 12px; }
        .rt-logo { font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #1a3b6e; white-space: nowrap; flex-shrink: 0; }
        .rt-logo-sub { color: #888; font-weight: 400; }
        .rt-tabs { display: flex; gap: 2px; overflow-x: auto; flex: 1; justify-content: center; }
        .rt-tab { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 4px; border: 1px solid #ddd; font-family: Arial, sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: all .15s; background: #f5f5f5; color: #555; white-space: nowrap; }
        .rt-tab:hover { background: #e8e8e8; color: #111; }
        .rt-tab-active { background: #1a3b6e; color: #fff; border-color: #1a3b6e; }
        .rt-tab-badge { font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px; background: rgba(0,0,0,.1); }
        .rt-tab-badge-active { background: rgba(255,255,255,.25); color: #fff; }
        .rt-topbar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .rt-split-btns { display: flex; gap: 2px; }
        .rt-split-btn { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 4px; background: #fff; cursor: pointer; color: #666; transition: all .15s; }
        .rt-split-btn:hover { background: #f0f0f0; color: #111; }
        .rt-timer { font-family: 'Courier New', monospace; font-size: 14px; font-weight: 700; color: #111; min-width: 52px; text-align: center; }
        .rt-timer-urgent { color: #c00; animation: rt-pulse 1s ease infinite; }
        @keyframes rt-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .rt-submit-btn { padding: 6px 16px; border-radius: 4px; border: none; background: #1a3b6e; color: #fff; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: background .15s; }
        .rt-submit-btn:hover { background: #0f2a52; }

        /* ── PROGRESS ── */
        .rt-progress { height: 3px; background: #e0e0e0; flex-shrink: 0; }
        .rt-progress-bar { height: 100%; background: #1a3b6e; transition: width .4s ease; }

        /* ── BODY / SPLIT ── */
        .rt-body { display: flex; flex: 1; overflow: hidden; height: calc(100vh - 53px); }
        .rt-left { overflow-y: auto; flex-shrink: 0; background: #fff; border-right: 1px solid #ddd; }
        .rt-passage-panel { min-height: 100%; }
        .rt-passage-inner { padding: 28px 36px 80px; max-width: 760px; margin: 0 auto; }
        .rt-passage-badge { display: inline-block; font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #1a3b6e; background: #e8edf7; padding: 3px 9px; border-radius: 3px; margin-bottom: 10px; }
        .rt-passage-title { font-size: 22px; font-weight: 700; color: #111; line-height: 1.3; margin-bottom: 6px; }
        .rt-passage-sub { font-size: 14px; color: #555; font-style: italic; margin-bottom: 18px; line-height: 1.5; }
        .rt-passage-rule { width: 40px; height: 2px; background: #1a3b6e; margin-bottom: 22px; }
        .rt-para { font-size: 15px; line-height: 1.85; color: #1a1a1a; margin-bottom: 16px; user-select: text; -webkit-user-select: text; }

        /* ── DIVIDER ── */
        .rt-divider { width: 6px; flex-shrink: 0; background: #ddd; cursor: col-resize; display: flex; align-items: center; justify-content: center; transition: background .15s; }
        .rt-divider:hover { background: #bbb; }
        .rt-div-dots { display: flex; flex-direction: column; gap: 3px; }
        .rt-div-dots span { display: block; width: 2px; height: 2px; border-radius: 50%; background: #999; }

        /* ── QUESTIONS PANEL ── */
        .rt-right { overflow-y: auto; flex-shrink: 0; background: #f5f5f5; }
        .rt-questions-inner { padding: 20px 24px 80px; max-width: 700px; }

        /* ── QUESTION BLOCK COMMON ── */
        .qblock { margin-bottom: 28px; background: #fff; border: 1px solid #e0e0e0; border-radius: 4px; padding: 18px 20px; }
        .qblock-head { margin-bottom: 14px; }
        .qblock-label { display: inline-block; font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #1a3b6e; margin-bottom: 7px; }
        .qblock-title { font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; color: #111; line-height: 1.5; margin-bottom: 4px; }
        .qblock-sub { font-family: Arial, sans-serif; font-size: 12.5px; color: #555; line-height: 1.6; margin-top: 4px; }
        .qblock-sub-italic { font-family: Arial, sans-serif; font-size: 13px; color: #333; font-style: italic; margin-top: 4px; margin-bottom: 6px; }

        /* ── Q NUMBER ── */
        .qnum { display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; padding: 0 4px; border: 1.5px solid #bbb; border-radius: 3px; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; color: #555; flex-shrink: 0; }
        .qnum-ok { border-color: #2e7d52; color: #2e7d52; background: #f0faf4; }
        .qnum-bad { border-color: #b71c1c; color: #b71c1c; background: #fff5f5; }

        /* ── TRUE/FALSE/NOT GIVEN ── */
        .tfng-legend { margin: 10px 0 14px; border: 1px solid #e0e0e0; border-radius: 3px; padding: 10px 14px; background: #fafafa; }
        .tfng-legend-row { display: flex; gap: 12px; margin-bottom: 3px; font-family: Arial, sans-serif; font-size: 12.5px; line-height: 1.5; }
        .tfng-legend-row:last-child { margin-bottom: 0; }
        .tfng-legend-key { font-weight: 700; color: #111; min-width: 80px; flex-shrink: 0; }
        .tfng-legend-val { color: #444; }
        .tfng-list { display: flex; flex-direction: column; gap: 0; }
        .tfng-item { border-bottom: 1px solid #ebebeb; padding: 14px 0; }
        .tfng-item:last-child { border-bottom: none; padding-bottom: 0; }
        .tfng-qrow { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
        .tfng-stmt { font-family: Arial, sans-serif; font-size: 13.5px; color: #1a1a1a; line-height: 1.6; flex: 1; }
        .tfng-opts-abc { display: flex; flex-direction: column; gap: 5px; padding-left: 34px; }
        .abc-label { display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 5px 0; font-family: Arial, sans-serif; font-size: 13px; color: #333; user-select: none; }
        .abc-label:hover .abc-circle { border-color: #1a3b6e; }
        .abc-circle { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #bbb; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #555; flex-shrink: 0; transition: all .12s; background: #fff; }
        .abc-circle.selected { border-color: #1a3b6e; background: #1a3b6e; color: #fff; }
        .abc-circle.correct { border-color: #2e7d52; background: #2e7d52; color: #fff; }
        .abc-circle.wrong { border-color: #b71c1c; background: #b71c1c; color: #fff; }
        .abc-label.selected .abc-text { color: #1a3b6e; font-weight: 600; }
        .abc-label.correct .abc-text { color: #2e7d52; font-weight: 600; }
        .abc-label.wrong .abc-text { color: #b71c1c; }
        .correct-ans-row { font-family: Arial, sans-serif; font-size: 12px; color: #2e7d52; margin-top: 6px; padding-left: 34px; }

        /* ── SHORT ANSWER ── */
        .short-row { display: flex; align-items: flex-start; gap: 8px; padding: 10px 0; border-bottom: 1px solid #ebebeb; flex-wrap: wrap; }
        .short-row:last-child { border-bottom: none; }
        .short-text { font-family: Arial, sans-serif; font-size: 13px; color: #222; flex: 1; min-width: 140px; line-height: 1.55; padding-top: 2px; }
        .short-input { border: 1px dashed #aaa; background: #fafafa; font-family: Arial, sans-serif; font-size: 13px; color: #111; outline: none; padding: 4px 8px; min-width: 140px; border-radius: 3px; transition: border-color .15s; }
        .short-input:focus { border-color: #1a3b6e; border-style: solid; background: #fff; }
        .input-ok { border-color: #2e7d52 !important; border-style: solid !important; color: #2e7d52 !important; }
        .input-bad { border-color: #b71c1c !important; border-style: solid !important; color: #b71c1c !important; }
        .correct-badge { font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; color: #2e7d52; white-space: nowrap; padding-top: 5px; }

        /* ── TABLE GAP FILL ── */
        .tbl-wrap { overflow-x: auto; margin-top: 10px; }
        .rt-table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 12.5px; }
        .rt-th { background: #e8edf7; border: 1px solid #ccc; padding: 8px 10px; font-weight: 700; color: #1a3b6e; text-align: left; font-size: 12px; }
        .rt-td { border: 1px solid #ddd; padding: 10px; color: #333; vertical-align: top; line-height: 1.65; }
        .rt-td-b { font-weight: 700; color: #111; }
        .tbl-cell-gap { display: inline-flex; align-items: center; gap: 4px; }
        .tbl-qnum-inline { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; height: 20px; border: 1.5px solid #bbb; border-radius: 3px; font-size: 10px; font-weight: 700; color: #555; font-family: Arial, sans-serif; }
        .tbl-input { border: 1px dashed #aaa; background: #fafafa; font-family: Arial, sans-serif; font-size: 12px; color: #111; outline: none; padding: 3px 7px; width: 120px; border-radius: 3px; transition: border-color .15s; }
        .tbl-input:focus { border-color: #1a3b6e; border-style: solid; background: #fff; }

        /* ── HEADINGS DRAG ── */
        .hdg-pool { background: #fafbff; border: 1px solid #dce3f0; border-radius: 4px; padding: 14px 16px; margin-bottom: 16px; }
        .hdg-pool-label { font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; color: #1a3b6e; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 10px; }
        .hdg-chips { display: flex; flex-direction: column; gap: 6px; }
        .hdg-chip { display: flex; align-items: flex-start; gap: 8px; background: #fff; border: 1px solid #cdd5e8; border-radius: 3px; padding: 8px 12px; font-family: Arial, sans-serif; font-size: 12.5px; color: #1a1a1a; cursor: grab; transition: box-shadow .15s, opacity .15s; user-select: none; line-height: 1.4; }
        .hdg-chip:hover { box-shadow: 0 2px 10px rgba(26,59,110,.15); border-color: #1a3b6e; }
        .hdg-chip:active { cursor: grabbing; }
        .hdg-chip-id { font-weight: 700; color: #1a3b6e; flex-shrink: 0; font-family: monospace; min-width: 22px; }
        .hdg-chip-text { color: #222; }
        .hdg-chip-placed { opacity: .25; cursor: not-allowed; box-shadow: none !important; }
        .hdg-chip-dragging { opacity: .35; }
        .hdg-chip-inslot { background: #eef2fb; border-color: #1a3b6e; width: 100%; }
        .hdg-chip-remove { margin-left: auto; padding-left: 8px; font-size: 11px; color: #999; cursor: pointer; flex-shrink: 0; }
        .hdg-chip-remove:hover { color: #b71c1c; }
        .hdg-slots { display: flex; flex-direction: column; gap: 8px; }
        .hdg-slot-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 4px 0; border-bottom: 1px solid #f0f0f0; }
        .hdg-slot-row:last-child { border-bottom: none; }
        .hdg-para-label { font-family: Arial, sans-serif; font-size: 12.5px; font-weight: 600; color: #333; width: 90px; flex-shrink: 0; }
        .hdg-slot { flex: 1; min-width: 160px; min-height: 38px; border: 1px dashed #ccc; border-radius: 3px; display: flex; align-items: center; padding: 4px 8px; transition: border-color .15s, background .15s; background: #fafafa; }
        .hdg-slot-empty { font-family: Arial, sans-serif; font-size: 11.5px; color: #bbb; font-style: italic; }
        .hdg-slot-over { border-color: #1a3b6e; border-style: solid; background: #eef2fb; }
        .hdg-slot-filled { border-style: solid; border-color: #1a3b6e; background: #fff; }
        .hdg-slot-ok { border-color: #2e7d52 !important; background: #f0faf4 !important; }
        .hdg-slot-bad { border-color: #b71c1c !important; background: #fff5f5 !important; }
        .hdg-text-input { border: none; border-bottom: 1.5px dashed #bbb; background: transparent; font-family: monospace; font-size: 13px; font-weight: 700; color: #111; outline: none; padding: 2px 4px; width: 56px; text-align: center; }
        .hdg-text-input:focus { border-color: #1a3b6e; }
        .hdg-touch-ghost { display: inline-flex; align-items: flex-start; gap: 6px; background: #1a3b6e; border-radius: 4px; padding: 7px 12px; font-family: Arial, sans-serif; font-size: 12px; color: #fff; box-shadow: 0 6px 24px rgba(26,59,110,.4); max-width: 200px; }
        .hdg-touch-ghost .hdg-chip-id { color: #a8c0ff; }

        /* ── MCQ — multi-question ── */
        .mcq-multi-list { display: flex; flex-direction: column; gap: 0; }
        .mcq-question-group { border-bottom: 1px solid #ebebeb; padding: 14px 0; }
        .mcq-question-group:last-child { border-bottom: none; padding-bottom: 0; }
        .mcq-qrow { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
        .mcq-qtext { font-family: Arial, sans-serif; font-size: 13.5px; color: #1a1a1a; line-height: 1.6; flex: 1; }
        .mcq-list { display: flex; flex-direction: column; gap: 5px; padding-left: 34px; }
        .mcq-option { display: flex; align-items: flex-start; gap: 10px; padding: 6px 10px; border: 1px solid #e8e8e8; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; font-size: 13px; color: #333; transition: all .12s; background: #fafafa; line-height: 1.5; }
        .mcq-option:hover { border-color: #1a3b6e; background: #f5f7fb; }
        .mcq-option.selected { border-color: #1a3b6e; background: #eef2fb; }
        .mcq-option.correct { border-color: #2e7d52; background: #f0faf4; }
        .mcq-option.wrong { border-color: #b71c1c; background: #fff5f5; }
        .mcq-circle { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; flex-shrink: 0; color: #555; transition: all .12s; background: #fff; margin-top: 1px; }
        .mcq-option.selected .mcq-circle { border-color: #1a3b6e; background: #1a3b6e; color: #fff; }
        .mcq-option.correct .mcq-circle { border-color: #2e7d52; background: #2e7d52; color: #fff; }
        .mcq-option.wrong .mcq-circle { border-color: #b71c1c; background: #b71c1c; color: #fff; }
        .mcq-text { flex: 1; }

        /* ── COMPLETE DRAG ── */
        .cmp-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .cmp-row { }
        .cmp-stem-line { display: flex; align-items: flex-start; gap: 8px; flex-wrap: wrap; }
        .cmp-stem { font-family: Arial, sans-serif; font-size: 13px; color: #222; line-height: 1.6; padding-top: 3px; flex-shrink: 0; }
        .cmp-slot { min-width: 160px; min-height: 32px; border: 1px dashed #ccc; border-radius: 3px; display: inline-flex; align-items: center; padding: 4px 8px; margin-left: 4px; transition: border-color .15s, background .15s; background: #fafafa; flex: 1; max-width: 280px; }
        .cmp-slot-empty { font-family: Arial, sans-serif; font-size: 11.5px; color: #bbb; font-style: italic; }
        .cmp-slot-over { border-color: #1a3b6e; border-style: solid; background: #eef2fb; }
        .cmp-slot-filled { border-style: solid; border-color: #1a3b6e; background: #fff; }
        .cmp-slot-ok { border-color: #2e7d52 !important; background: #f0faf4 !important; }
        .cmp-slot-bad { border-color: #b71c1c !important; background: #fff5f5 !important; }
        .cmp-placed { font-family: Arial, sans-serif; font-size: 12.5px; color: #1a3b6e; cursor: grab; display: flex; align-items: center; gap: 4px; width: 100%; }
        .cmp-placed:active { cursor: grabbing; }
        .cmp-remove { margin-left: auto; font-size: 11px; color: #999; cursor: pointer; padding-left: 6px; flex-shrink: 0; }
        .cmp-remove:hover { color: #b71c1c; }
        .cmp-pool { background: #fafbff; border: 1px solid #dce3f0; border-radius: 4px; padding: 14px 16px; margin-top: 6px; }
        .cmp-endings-list { display: flex; flex-direction: column; gap: 0; }
        .cmp-ending-chip { display: flex; align-items: flex-start; gap: 8px; padding: 9px 12px; border-bottom: 1px solid #eee; font-family: Arial, sans-serif; font-size: 13px; color: #1a1a1a; cursor: grab; transition: background .12s, opacity .15s; user-select: none; }
        .cmp-ending-chip:last-child { border-bottom: none; }
        .cmp-ending-chip:hover { background: #eef2fb; }
        .cmp-ending-chip:active { cursor: grabbing; }
        .cmp-ending-placed { opacity: .28; cursor: not-allowed; }
        .cmp-ending-dragging { opacity: .35; }
        .cmp-end-letter { font-weight: 700; color: #1a3b6e; min-width: 20px; flex-shrink: 0; }
        .cmp-end-text { color: #222; }

        /* ── HIGHLIGHT ── */
        .rt-mark { background: #fff176; border-radius: 2px; padding: 0 1px; color: inherit; }

        /* ── POPUP ── */
        .rt-popup { position: fixed; z-index: 500; background: #1e293b; border-radius: 6px; padding: 4px; box-shadow: 0 8px 28px rgba(0,0,0,.25); transition: opacity .1s; }
        .rt-popup::after { content: ''; position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #1e293b; }
        .rt-pop-btn { border: none; border-radius: 4px; padding: 6px 12px; font-family: Arial, sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; }
        .rt-pop-hl { background: #fff176; color: #5a4000; }
        .rt-pop-cl { background: #fee2e2; color: #991b1b; }

        /* ── MODAL ── */
        .rt-modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; padding: 16px; }
        .rt-modal { background: #fff; border-radius: 6px; padding: 32px 36px; max-width: 440px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
        .rt-result-modal { max-width: 560px; max-height: 90vh; overflow-y: auto; }
        .rt-modal-eyebrow { font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #888; margin-bottom: 4px; }
        .rt-modal-title { font-size: 24px; font-weight: 700; color: #111; margin-bottom: 4px; }
        .rt-modal-sub { font-family: Arial, sans-serif; font-size: 13px; color: #777; margin-bottom: 20px; }
        .rt-modal-notice { background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 12px 16px; font-family: Arial, sans-serif; font-size: 13px; color: #78350f; line-height: 1.8; margin-bottom: 20px; }
        .rt-notice-title { font-weight: 700; margin-bottom: 4px; }
        .rt-modal-btn { width: 100%; padding: 12px; border-radius: 4px; border: none; background: #1a3b6e; color: #fff; font-family: Arial, sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; transition: background .15s; }
        .rt-modal-btn:hover { background: #0f2a52; }

        /* ── RESULT ── */
        .result-score { font-size: 60px; font-weight: 700; color: #1a3b6e; line-height: 1; }
        .score-label { font-family: Arial, sans-serif; font-size: 13px; color: #888; margin-top: 4px; margin-bottom: 20px; }
        .band-row { display: flex; align-items: center; gap: 16px; background: #e8edf7; border-radius: 4px; padding: 12px 16px; margin-bottom: 20px; }
        .band-num { font-size: 32px; font-weight: 700; color: #1a3b6e; }
        .ans-grid-label { font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #888; margin-bottom: 8px; }
        .ans-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; margin-bottom: 20px; }
        .ans-cell { border-radius: 3px; padding: 5px 3px; text-align: center; border: 1px solid #e0e0e0; }
        .ans-n { font-family: Arial, sans-serif; font-weight: 700; font-size: 9px; color: #888; display: block; margin-bottom: 2px; }
        .ans-v { font-family: Arial, sans-serif; font-weight: 600; font-size: 10px; color: #111; display: block; }
        .ans-ok { border-color: rgba(46,125,82,.3); background: rgba(46,125,82,.07); }
        .ans-ok .ans-v { color: #2e7d52; }
        .ans-bad { border-color: rgba(183,28,28,.3); background: rgba(183,28,28,.06); }
        .ans-bad .ans-v { color: #b71c1c; }
        .ans-blank .ans-v { color: #bbb; }
        .result-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .rbtn { flex: 1; padding: 10px 14px; border-radius: 4px; border: none; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: all .15s; }
        .rbtn-primary { background: #1a3b6e; color: #fff; }
        .rbtn-primary:hover { background: #0f2a52; }
        .rbtn-sec { background: #f0f0f0; color: #111; border: 1px solid #ddd; }
        .rbtn-sec:hover { background: #e4e4e4; }

        /* ── SCROLLBARS ── */
        .rt-left::-webkit-scrollbar, .rt-right::-webkit-scrollbar { width: 5px; }
        .rt-left::-webkit-scrollbar-thumb, .rt-right::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .rt-body { flex-direction: column; height: auto; overflow: visible; }
          .rt-left { width: 100% !important; max-height: 45vh; border-bottom: 3px solid #ddd; border-right: none; }
          .rt-right { width: 100% !important; }
          .rt-divider { display: none; }
          .rt-passage-inner { padding: 16px 16px 40px; }
          .rt-questions-inner { padding: 12px 12px 60px; }
          .rt-topbar { padding: 0 10px; gap: 6px; height: 46px; }
          .rt-split-btns { display: none; }
          .rt-logo { font-size: 11px; }
          .rt-logo-sub { display: none; }
          .rt-para { font-size: 14px; }
          .qblock { padding: 14px 14px; }
          .cmp-stem-line { flex-direction: column; gap: 6px; }
          .cmp-slot { max-width: 100%; }
          .hdg-slot-row { flex-direction: column; align-items: flex-start; }
          .hdg-slot { min-width: 100%; }
          .tfng-opts-abc { padding-left: 0; }
          .tfng-qrow { flex-wrap: wrap; }
          .mcq-list { padding-left: 0; }
          .mcq-qrow { flex-wrap: wrap; }
          .ans-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 480px) {
          .rt-tab { padding: 4px 8px; font-size: 11px; }
          .rt-timer { font-size: 13px; }
          .rt-submit-btn { padding: 5px 10px; font-size: 12px; }
          .ans-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
      `}</style>
    </div>
  );
}