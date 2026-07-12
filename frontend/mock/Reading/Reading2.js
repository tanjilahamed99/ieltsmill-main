export const READING2_ANSWER_KEY = {
  1: "religious ceremonies",
  2: "fidelity",
  3: "two kisses",
  4: "400 years",
  5: "swine flu",
  6: "social contacts",
  7: "germs or bacteria",
  8: "TRUE",
  9: "FALSE",
  10: "NOT GIVEN",
  11: "TRUE",
  12: "TRUE",
  13: "FALSE",
  14: "D",
  15: "C",
  16: "G",
  17: "A",
  18: "H",
  19: "E",
  20: "A",
  21: "NOT GIVEN",
  22: "TRUE",
  23: "NOT GIVEN",
  24: "threat",
  25: "scientists",
  26: "sanctuaries",
  27: "C",
  28: "C",
  29: "NOT GIVEN",
  30: "FALSE",
  31: "TRUE",
  32: "TRUE",
  33: "NOT GIVEN",
  34: ["C", "E"],
  35: ["C", "E"],
  36: "COMPLEXITY",
  37: "EVOLUTION AND ECONOMICS",
  38: "COMPLEX ADAPTIVE SYSTEMS",
  39: "RANDOM GENETIC MUTATIONS",
  40: "PERMUTATIONS",
};

export const Reading2Passage = [
  {
    id: 1,
    label: "Passage 1",
    title:
      "Why Do We Touch Strangers So Much? A History Of The Handshake Offers Clues",
    subtitle:
      "For thousands of years, the handshake has been used for different purposes. ",
    text: `There is a lot that can be conveyed in a handshake, a kiss, or a hug. Throughout history, such a greeting was used to signal friendship, finalize a business transaction, or indicate religious devotion. Touching strangers, however, can also transmit other, less beneficial shared outcomes—like disease outbreaks.
As fears about COVID-19, or coronavirus, mount, France has warned its citizens to pause their famous cheek kisses, and across the world, business deals are being sealed with an elbow bump. But with histories tracing back thousands of years, both greetings are likely too entrenched to be so easily halted.

A popular theory on the handshake’s origin is that it began as a gesture of peace. Grasping hands proved one was not holding a weapon—and shaking them was a way to ensure a partner had nothing hiding up their sleeve. So far, there has not been any reliable evidence to prove this assumption. Throughout the ancient world, the handshake appears on vases, gravestones, and stone slabs in scenes of weddings, gods making deals, young warriors departing for war, and the newly dead’s arrival to the afterlife. In the literary canon, it stretches to the Iliad and the Odyssey.

The handshake’s catch-all utility, used in friendship, romance, and business alike, makes interpretation difficult. “The handshake continues to be a popular image today because we too see it as a complex and ambiguous motif,” writes art historian Glenys Davies in an analysis of its use in classical art.

In America, it is likely that the handshake’s popularity was propelled by 18th century Quakers. In their efforts to eschew the hierarchy and social rank, they found the handshake a more democratic form of greeting to the then-common bow, curtsy, or hat doffing. “In their place, Quakers put the practice of the handshake, extended to everyone regardless of station, as we still do,” writes historian Michael Zuckerman.

There may be a scientific explanation for its lasting power. In a 2015 study, researchers in Israel filmed handshakes between hundreds of strangers and found nearly a quarter of participants sniffed their hands afterwards. They theorized that a handshake might be unconsciously used to detect chemical signals, and possibly as a means of communication—just as other animals do by smelling each other.

The kiss-as-greeting has a similarly rich history. It was incorporated into early Christianity and used in religious ceremonies. “In his Epistle to the Romans, St. Paul instructed followers to ‘salute one another with a holy kiss,’” writes Andy Scott in the book One Kiss or Two: In Search of the Perfect Greeting. In the Middle Ages, a kiss was used as a sign of fidelity and to seal agreements like property transfers.

Today, a swift kiss on the cheek known in French as “la bise,” is a standard greeting in much of the world. The word may have originated with the Romans, who had a different term for each type of kiss and called the polite version “basium.” In Paris, two kisses are common. In Provence expect three, and four is the norm in the Loire Valley. The cheek kiss is also common in countries like Egypt, where three kisses is customary, Latin America, and the Philippines. It is thought that during the plague in the 14th century, la bise may have stopped and was not revived again until 400 years later, after the French Revolution. In 2009, la bise was temporarily paused as swine flu became a concern. At the end of February, the French Health Minister advised against it as the coronavirus cases increased. “The reduction in social contacts of a physical nature is advised,” he said. “That includes the practice of the bise.”

In her book Don’t Look, Don’t Touch, behavioural scientist Val Curtis of the London School of Hygiene and Tropical Medicine, says that one possible reason for the kiss and handshake as a greeting is to signify that the other person is trusted enough to share germs with. Because of this, the practice can go in and out of style depending on public health concerns.

In a 1929 study, a nurse named Leila Given wrote an article in the American Journal of Nursing lamenting the loss of the last generation’s “finger-tipping and the high handshake” customs in favour of a handshake. She warned that hands “are agents of bacterial transfer” and cited early studies showing that a handshake could easily spread germs. In conclusion, she recommended that Americans adopt the Chinese custom at the time of shaking one’s own hands together when greeting a friend. “At least our bacteria would then stay at home,” she wrote.`,
    questions: [
      {
        type: "short",
        heading: "Questions 1–7",
        title: "Answer the questions below.",
        sub: "Choose no more than THREE WORDS AND/OR A NUMBER from the passage for each answer.",
        bulletPoint: true,
        questionTitle: "The history of cheek kissing",
        items: [
          {
            n: 1,
            text: "In the past, Christian used cheek kisses in",
          },
          {
            n: 2,
            text: "In the Middle Age, the kiss-as-greeting was used to show",
            afterText: "or used in making agreements",
          },
          {
            n: 3,
            text: "It is common for people in Paris to exchange",
          },
          {
            n: 4,
            text: "People believe that in the 14th century, the cheek kiss might have been paused and it remained so for",
          },
          {
            n: 5,
            text: "In 2009, due to",
            afterText: "cheek kisses were also stopped for a while.",
          },
          {
            n: 6,
            text: "What did French Health Minister advise people to avoid to prevent the spread of coronavirus?",
          },
          {
            n: 7,
            text: "What can be transferred from a handshake?",
          },
        ],
      },
      {
        type: "tfng",
        heading: "Questions 8–13",
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
            n: 8,
            text: "Shaking hands is an indicator of hospitality.",
          },
          {
            n: 9,
            text: "Evidence showed that the handshake started as a sign of peace.",
          },
          {
            n: 10,
            text: "When shaking hands, people often rolled up their sleeves.",
          },
          {
            n: 11,
            text: "The use of a handshake in different situations can be unpredictable.",
          },
          {
            n: 12,
            text: "In America, handshakes became prevalent because they represented equality and freedom.",
          },
          {
            n: 13,
            text: "A research conducted in 2015 showed that exactly 25% of participants smelled their hands after a handshake.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Passage 2",
    title: "Chinstrap Penguin Population In The Last 50 Years",
    subtitle: "",
    text: `
A

The chinstrap penguin has a cap of black plumage, a white face, and a continuous band of black feathers extending from one side of the head to the other, the “chinstrap.” The northern part of the Antarctic Peninsula, several Antarctic and subantarctic islands, and the uninhabited Balleny Islands between Antarctica and New Zealand are the habitats of the species.

B

Antarctic penguin colonies in some parts of the Antarctic have declined over the last 50 years, mostly because of climate change, researchers say. The colonies of chinstrap penguins, also known as ringed or bearded penguins, have dramatically dropped since they were last surveyed almost 50 years ago, scientists discovered. The findings became surprising because, until now, the chinstraps have been deemed of “least concern” by the International Union for Conservation of Nature (IUCN). “We really didn’t know what to expect, and then we found this huge decline on Elephant Island,” Noah Strycker, an ornithologist and penguin researcher at Stony Brook University, told CNN from Greenpeace’s Esperanza ship in the Antarctic. “It’s a little bit worrying as it means that something is shifting in the ecosystem and the fall in penguin numbers is reflecting that shift.”

C

Every colony of Elephant Island, which is a crucial penguin habitat northeast of the Antarctic Peninsula, when surveyed, experienced a population fall, as per the independent researchers who joined a Greenpeace expedition to the region. Elephant Island was last surveyed in 1971, and there were 122,550 pairs of penguins across all colonies. However, the recent count revealed just 52,786 pairs with a drop of almost 60%. On Elephant Island, the size of the population change varied from colony to colony, and the most significant decline was recorded at a colony known as Chinstrap Camp, which is 77%.

D

Just the days after temperatures hit an all-time high in the Antarctic with 18.3 Celsius (64.94 Fahrenheit) recorded on February 6, the latest study is published. The previous high 17.5 C (63.5 F) was recorded in March 2015. Scientists recorded the temperature at Argentina’s Esperanza research station, according to the meteorological agency of the country.

E

The reduced sea ice and warmer oceans due to climate change have led to less krill, the main component of the penguins’ diet. “Climate change is probably the underlying factor, and the effects are rippling through the food chain,” Strycker said. “Penguins, seals, and whales all depend on krill, which depends on ice. So if climate change affects the ice, that impacts on everything else.” Heather J. Lynch, associate professor of ecology and evolution at New York’s Stony Brook University and one of the expedition’s research leads, said: “Such significant declines in penguin numbers suggest that the Southern Ocean’s ecosystem has fundamentally changed in the last 50 years and that the impacts of this are rippling up the food web to species like chinstrap penguins.” She added that “while several factors may have a role to play, all the evidence we have pointed to climate change as being responsible for the changes we are seeing.”

F

However, some good news was also there, as the researchers reported an increase in gentoo penguins population in neighbouring colonies, beyond Elephant Island. “It’s interesting, as a tale of two penguins on the Antarctic Peninsula,” said Strycker. “Gentoo is a species from further north and they appear to be colonizing the area and are actually increasing in numbers.”

G

The Greenpeace ship Esperanza has been documenting the threat to the oceans worldwide and taking the scientists for travelling abroad. For the first time, the Low Island in the South Shetland Islands, north of the Antarctic Peninsula, has been surveyed properly. The manual and drone techniques are used by the researchers, from Stony Brook and Northeastern University in Boston, to survey a series of significant but relatively unknown colonies of chinstrap penguin here. The results are, however, not yet available. Greenpeace has been campaigning for the three Antarctic sanctuaries that it would establish to offer protection to many of the colonies surveyed. These would be off-limits to humans.

H

Louisa Casson, Greenpeace Oceans Campaigner, said in a statement: “Penguins are an iconic species, but this new research shows how the climate emergency is decimating their numbers and having far-reaching impacts on wildlife in the most remote corners of Earth. This is a critical year for our oceans. “Governments must respond to the science and agree on a strong Global Ocean Treaty at the United Nations this spring that can create a network of ocean sanctuaries to protect marine life and help these creatures adapt to our rapidly changing climate.”`,
    questions: [
      {
        type: "matrix_match",
        heading: "Questions 14–20",
        title: "Reading Passage 2 has eight paragraphs, A–H.",
        sub: "Which paragraph contains the following information?",
        note: "NB You may use any letter more than once.",
        optionsList: {
          heading: "List of Mapmakers",
          optionHide: true,
          options: [
            { id: "A" },
            { id: "B" },
            { id: "C" },
            { id: "D" },
            { id: "E" },
            { id: "F" },
            { id: "G" },
            { id: "H" },
          ],
        },
        items: [
          {
            n: 14,
            text: "the highest temperatures ever recorded in Antarctica.",
          },
          {
            n: 15,
            text: "the difference between current and past records on penguin population.",
          },
          { n: 16, text: "places where people cannot go to." },
          { n: 17, text: "places where chinstrap penguins live." },
          { n: 18, text: "measures to protect ocean species." },
          {
            n: 19,
            text: "factors contributing to the decline in the amount of food available.",
          },
          {
            n: 20,
            text: "description of a specific species expanding its territory.",
          },
        ],
      },
      {
        type: "tfng",
        heading: "Questions 21–23",
        title:
          "Do the following statements agree with the information in the text?",
        sub: "Choose TRUE if the statement agrees, FALSE if it contradicts, or NOT GIVEN if there is no information.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        optionLabels: {
          TRUE: "if the statement agrees with the information",
          FALSE: "if the statement contradicts the information",
          "NOT GIVEN": "if there is no information on this",
        },
        items: [
          {
            n: 21,
            text: "The IUCN showed little concern about the fall in penguin numbers.",
          },
          {
            n: 22,
            text: "Climate change is a reason for the changes in the food chain of chinstrap penguins.",
          },
          {
            n: 23,
            text: "Gentoo penguins are not affected by climate change.",
          },
        ],
      },
      {
        type: "short",
        heading: "Questions 24–26",
        title: "Answer the questions below.",
        sub: "Choose no more than THREE WORDS AND/OR A NUMBER from the passage for each answer.",
        bulletPoint: true,
        questionTitle: "The Greenpeace ship has been used to : ",
        items: [
          {
            n: 24,
            text: "record the",
            afterText: "to marine life over the world.",
          },
          { n: 25, text: "carry the", afterText: "overseas." },
          {
            n: 26,
            text: "Build",
            afterText: "to protect many surveyed colonies.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Passage 3",
    title: "Economic Evolution",
    subtitle: "",
    text: `{A} Living along the Orinoco River that borders Brazil and Venezuela are the Yanomami people, hunter-gatherers whose average annual income has been estimated at the equivalent of $90 per person per year. Living along the Hudson River that borders New York State and New Jersey are the Manhattan people, consumer traders whose average annual income has been estimated at $36,000 per person per year. That dramatic difference of 400 times, however, pales in comparison to the differences in Stock Keeping Units (SKUs, a measure of the number of types of retail products available), which has been estimated at 300 for the Yanomami and 10 billion for the Manhattans, a difference of 33 million times.

{B} How did this happen? According to economist Eric D. Beinhocker, who published these calculations in his revelatory work The Origin of Wealth (Harvard Business School Press, 2006), the explanation is to be found in complexity theory. Evolution and economics are not just analogous to each other, but they are actually two forms of a larger phenomenon called complex adaptive systems, in which individual elements, parts or agents interact, then process information and adapt their behaviour to changing conditions. Immune systems, ecosystems, language, the law and the Internet are all examples of complex adaptive systems.

{C} In biological evolution, nature selects from the variation produced by random genetic mutations and the mixing of parental genes. Out of that process of cumulative selection emerges complexity and diversity. In economic evolution, our material economy proceeds through the production and selection of numerous permutations of countless products. Those 10 billion products in the Manhattan village represent only those variations that made it to market, after which there is a cumulative selection by consumers in the marketplace for those deemed most useful: VHS over Betamax, DVDs over VHS, CDs over vinyl records, flip phones over brick phones, computers over typewriters, Google over Altavista, SUVs over station wagons, paper books over e-books (still), and Internet news over network news (soon). Those that are purchased “survive” and “reproduce” into the future through repetitive use and remanufacturing.

{D} As with living organisms and ecosystems, the economy looks designed—so just as Humans naturally deduce the existence of a top-down intelligent designer, humans also (understandably) infer that a top-down government designer is needed in nearly every aspect of the economy. But just as living organisms are shaped from the bottom up by natural selection, the economy is moulded from the bottom up by the invisible hand. The correspondence between evolution and economics is not perfect, because some top-down institutional rules and laws are needed to provide a structure within which free and fair trade can occur. But too much top-down interference into the marketplace makes trade neither free nor fair. When such attempts have been made in the past, they have failed—because markets are far too complex, interactive and autocatalytic to be designed from the top down. In his 1922 book, Socialism, Ludwig Von Mises spelt out the reasons why most notably the problem of “economic calculation” in a planned socialist economy. In capitalism, prices are in constant and rapid flux and are determined from below by individuals freely exchanging in the marketplace. Money is a means of exchange, and prices are the information people use to guide their choices. Von Mises demonstrated that socialist economies depend on capitalist economies to determine what prices should be assigned to goods and services. And they do so cumbersomely and inefficiently. Relatively free markets are, ultimately, the only way to find out what buyers are willing to pay and what sellers are willing to accept.

{E} Economics helps to explain how Yanomami-like hunter-gatherers evolved into Manhattan-like consumer traders. In the Nineteenth century French economist Frédéric Bastiat well captured the principle: “Where goods do not cross frontiers, armies will.” In addition to being fierce warriors, the Yanomami are also sophisticated traders, and the more they trade the less they fight. The reason is that trade is a powerful social adhesive that creates political alliances. One village cannot go to another village and announce that they are worried about being conquered by a third, more powerful village—that would reveal weakness. Instead, they mask the real motives for alliance through trade and reciprocal feasting. And, as a result, not only gain military protection but also initiate a system of trade that—in the long run—leads to an increase in both wealth and SKUs. 

{F} Free and fair trade occurs in societies where most individuals interact in ways that provide mutual benefit. The necessary rules weren’t generated by wise men in a sacred temple or lawmakers in congress, but rather evolved over generations and were widely accepted and practised before the law was ever written. Laws that fail this test are ignored. If enforcement becomes too onerous, there is rebellion. Yet the concept that human interaction must, and can be controlled by a higher force is universal. Interestingly, there is no widespread agreement on who the “higher force” is. Religious people ascribe good behaviour to God’s law. They cannot conceive of an orderly society of atheists. Secular people credit the government. They consider anarchy to be synonymous with barbarity. Everyone seems to agree on the concept that an orderly society requires an omnipotent force. Yet, everywhere there is evidence that this is not so. An important distinction between spontaneous social order and social anarchy is that the former is developed by work and investment, under the rule of law and with a set of evolved morals while the latter is chaos. The classical liberal tradition of von Mises and Hayek never makes the claim that the complete absence of top-down rules leads to the optimal social order. It simply says we should be sceptical about our ability to manage them in the name of social justice, equality, or progress.`,
    questions: [
      {
        type: "mcq",
        heading: "Questions 27–28",
        title: "Choose the correct letter, A, B, C or D.",
        items: [
          {
            n: 27,
            text: "What ought to play a vital role in each field of the economy?",
            options: [
              { id: "A", text: "A strict rule." },
              { id: "B", text: "A smart strategy." },
              { id: "C", text: "A tightly managed authority." },
              { id: "D", text: "A powerful legislation." },
            ],
          },
          {
            n: 28,
            text: "According to the passage, what happens when governments try to control the economy too much?",
            options: [
              {
                id: "A",
                text: "It creates a fairer and more equal society for all citizens.",
              },
              {
                id: "B",
                text: "It always leads to military conflicts between nations.",
              },
              {
                id: "C",
                text: "It fails because markets are too complex to be designed from the top down.",
              },
              {
                id: "D",
                text: "It encourages more trade between individuals in the marketplace.",
              },
            ],
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
            n: 29,
            text: "SKUs is a more precise measurement to demonstrate the economic level of a community.",
          },
          {
            n: 30,
            text: "No concrete examples are presented when the author makes the statement concerning economic evolution.",
          },
          {
            n: 31,
            text: "Evolution and economics show a defective homolog.",
          },
          {
            n: 32,
            text: "Martial actions might be taken to cross the borders if trades do not work.",
          },
          {
            n: 33,
            text: "Profit is the invisible hand to guide the market.",
          },
        ],
      },
      {
        type: "multiChoiceMCQ",
        heading: "Questions 34–35",
        title: "Write your answers in boxes 34-35 on your answer sheet.",
        sub: "Choose THREE letters A-F.",
        items: [
          {
            n: [34, 35],
            q: "Which two of the following tools are used to pretend to ask for union according to one explanation from the perspective of economics ",
            opts: [
              "an official announcement",
              "a diplomatic event",
              "the exchange of goods",
              "certainly written correspondence",
              "some enjoyable treatment in a win-win situation",
            ],
          },
        ],
      },
      {
        type: "summary_complete",
        heading: "Questions 36–40",
        sub: "Complete the following summary of the paragraphs of Reading Passage, using no more than three words from the Reading Passage for each answer. Write your answers in boxes 36–40 on your answer sheet.",

        items: [
          {
            text: "In response to the search for reasons for the phenomenon shown by the huge difference in the income between two groups of people both dwelling near the rivers, several researchers made their effort and gave certain explanations. One attributes ",
          },
          { n: 36 },
          {
            text: " to the interesting change claiming that it is not as simple as it seems to be in appearance that the relationship between ",
          },
          { n: 37 },
          { text: " which is a good example of " },
          { n: 38 },
          {
            text: ", which involved in the interaction of separate factors for the processing of information as well as the behavioural adaptation to unstable conditions. As far as the biological transformation is concerned, both ",
          },
          { n: 39 },
          {
            text: " and the blend of genres from the last generation brings about the difference. The economic counterpart shows how generating and choosing the ",
          },
          { n: 40 },
          {
            text: " of innumerable goods moves forward the material-oriented economy.",
          },
        ],
      },
      ,
    ],
  },
];
