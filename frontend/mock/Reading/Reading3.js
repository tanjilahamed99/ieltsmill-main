export const READING3_ANSWER_KEY = {
  1: "NOT GIVEN",
  2: "NOT GIVEN",
  3: "TRUE",
  4: "NOT GIVEN",
  5: "FALSE",
  6: "ACQUIRED",
  7: "DIFFERENTIATE",
  8: "GOOD",
  9: "AROMA",
  10: "SEASONINGS",
  11: "FLAVOUR",
  12: "INDELIBLE",
  13: "CHEMICAL AROMAS",
  14: "D",
  15: "G",
  16: "E",
  17: "A",
  18: "G",
  19: "FALSE",
  20: "TRUE",
  21: "TRUE",
  22: "NOT GIVEN",
  23: "the military",
  24: "high density",
  25: "self-sharpening",
  26: "chemical toxicity",
  27: "FALSE",
  28: "TRUE",
  29: "FALSE",
  30: "TRUE",
  31: "NOT GIVEN",
  32: "FALSE",
  33: "seeds",
  34: "shells",
  35: "fish",
  36: "canals",
  37: "maize",
  38: "cotton",
  39: "flotation",
  40: "shellfish",
};

export const Reading3Passage = [
  {
    id: 1,
    label: "Passage 1",
    title: "The sense of flavour 2",
    subtitle:
      "For thousands of years, the handshake has been used for different purposes. ",
    text: `{A} Scientists now believe that human beings acquired the sense of taste as a way to avoid being poisoned. Edible plants generally taste sweet; deadly ones, bitter. Taste is supposed to help us differentiate food that’s good for us from food that’s not. The taste buds on our tongues can detect the presence of half a dozen or so basic tastes, including sweet, sour, bitter, salty, and umami (a taste discovered by Japanese researchers, a rich and full sense of deliciousness triggered by amino acids in foods such as shellfish, mushrooms, potatoes, and seaweed). Tastebuds offers a limited means of detection, however, compared with the human olfactory system, which can perceive thousands of different chemical aromas. Indeed, ‘flavor’ is primarily the smell of gases being released by the chemicals you’ve just put in your mouth. The aroma of food can be responsible for as much as 90% of its flavor.

{B} The act of drinking, sucking or chewing a substance releases its volatile gases. They flow out of the mouth and up the nostrils, or up the passageway at the back of the mouth, to a thin layer of nerve cells called the olfactory epithelium, located at the base of the nose, right between the eyes. The brain combines the complex smell signals from the epithelium with the simple taste signals from the tongue, assigns a flavor to what’s in your mouth, and decides if it’s something you want to eat.

{C} Babies like sweet tastes and reject bitter ones; we know this because scientists have rubbed various flavors inside the mouths of infants and then recorded their facial reactions. A person’s food preferences, like his or her personality, are formed during the first few years of life, through a process of socialization. Toddlers can learn to enjoy hot and spicy food, bland health food, or fast food, depending upon what the people around them eat. The human sense of smell is still not fully understood. It is greatly affected by psychological factors and expectations. The mind filters out the overwhelming majority of chemical aromas that surround us, focusing intently on some, ignoring others. People can grow accustomed to bad smells or good smells; they stop noticing what once seemed overpowering.

{D} Aroma and memory are somehow inextricably linked. A smell can suddenly evoke a long-forgotten moment. The flavours of childhood foods seem to leave an indelible mark, and adults often return to them, without always knowing why. These ‘comfort foods’ become a source of pleasure and reassurance a fact that fast-food chains work hard to promote Childhood memories of Happy Meals can translate into frequent adult visits to McDonald’s’, like those of the chain’s ‘heavy users’, the customers who eat there four or five times a week.

{E} The human craving for flavour has been a large unacknowledged and unexamined force in history. Royal empires have been built, unexplored lands have been traversed, great religions and philosophies have been forever changed by the spice trade. In 1492, Christopher Columbus set sail in order to try to find new seasonings and thus to make his fortune with this most desired commodity of that time. Today, the influence of flavour in the world marketplace is no less decisive. The rise and fall of corporate empires – soft-drink companies, snack-food companies, and fast-food chains – is frequently determined by how their products taste.

{F} The flavor industry emerged in the mid-1800s, as processed foods began to be manufactured on a large scale. Recognizing the need for flavor additives, the early food processors turned to perfume companies that had years of experience working with essential oils and volatile aromas. The great perfume houses of England, France, and the Netherlands produced many of the first flavor compounds. In the early part of the 20th century, Germany’s powerful chemical industry assumed the lead in flavour production. Legend has it that a German scientist discovered methyl anthranilate, one of the first artificial flavours, by accident while mixing chemicals in his laboratory. Suddenly, the lab was filled with the sweet smell of grapes. Methyl anthranilate later became the chief flavoring compound of manufactured grape juice.

{G} The quality that people seek most of all in a food, its flavour, is usually present in a quantity too infinitesimal to be measured by any traditional culinary terms such as ounces or teaspoons. Today’s sophisticated spectrometers, gas chromatograph, and headspace vapor analyzers provide a detailed map of a food’s flavour components, detecting chemical aromas in amounts as low as one part per billion. The human nose, however, is still more sensitive than any machine yet invented. A nose can detect aromas present in quantities of a few parts per trillion. Complex aromas, such as those of coffee or roasted meat, may be composed of gases from nearly a thousand different chemicals. The chemical that provides the dominant flavour of bell pepper can be tasted in amounts as low as 0.02 parts per billion; one drop is sufficient to add flavour to the amount of water needed to fill five average-sized swimming pools

  `,
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
            text: "The brain determines which aromas we are aware of.",
          },
          {
            n: 2,
            text: "The sense of taste is as efficient as the sense of smell.",
          },
          {
            n: 3,
            text: "Personal tastes in food are developed in infancy.",
          },
          {
            n: 4,
            text: "Christopher Columbus found many different spices on his travels. ",
          },
          {
            n: 5,
            text: "In the mid-1880s, man-made flavors were originally invented on purpose.",
          },
        ],
      },
      {
        type: "summary_complete",
        heading: "Questions 6–11",
        sub: "Choose ONE WORD from the passage for each answer.",
        title: "Write your answers in boxes 6 – 11 on your answer sheet",
        items: [
          {
            text: " It is thought that the sense of taste was ",
          },
          { n: 6 },
          {
            text: " in order to ",
          },
          { n: 7 },
          {
            text: " the foods which are harmless to us from those that are not ",
          },
          { n: 8 },
          {
            text: ".  The sense of smell, which gives us the flavour we detect in our food, helps us to take pleasure in our food. Indeed this ",
          },
          { n: 9 },
          {
            text: " for flavour was, in the past, the reason why so many explorers ventured to distant lands to bring back new ",
          },
          { n: 10 },
          {
            text: " .which were greatly sought after in Europe. Here they were used in cooking to enhance the usual ",
          },
          { n: 11 },
          {
            text: " and unappetizing dishes eaten by rich and poor alike. ",
          },
        ],
      },
      {
        type: "short",
        heading: "Questions 12–13",
        title: "Answer the questions below.",
        sub: "Choose no more than TWO WORDS AND/OR A NUMBER from the passage for each answer.",
        bulletPoint: true,
        items: [
          {
            n: 12,
            text: "We associate certain smells with the past as they are",
          },
          {
            n: 13,
            text: "Modern technology is able to help determine the minute quantities of",
            afterText: "found in food.",
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

Could the mystery over how depleted uranium might cause genetic damage be closer to being solved? It may be, if a controversial claim by two researchers is right. They say that minute quantities of the material lodged in the body may kick out energetic electrons that mimic the effect of beta radiation. This, they argue, could explain how residues of depleted uranium scattered across former war zones could be increasing the risk of cancers and other problems among soldiers and local people.

B

Depleted uranium is highly valued by the military, who use it in the tips of armour­piercing weapons. The material’s high density and self-sharpening properties help it to penetrate the armour of enemy tanks and bunkers. Its use in conflicts has risen sharply in recent years. The UN Environment Programme (UNEP) estimates that shells containing 1700 tonnes of the material were fired during the 2003 Iraq war. Some researchers and campaigners are convinced that depleted uranium left in the people exposed to it. Governments and the military disagree, and point out that there is no conclusive epidemiological evidence for this. And while they acknowledge that the material is weakly radioactive, they say this effect is too small to explain the genetic damage at the levels seen in war veterans and civilians.

C

Organisations such as the UK’s Royal Society, the US Department of Veterans Affairs and UNEP have called for more comprehensive epidemiological studies to clarify the link between depleted uranium and any ill effects. Meanwhile, various test­tube and animal studies have suggested that depleted uranium may increase the risk of cancer, according to a review of the scientific literature published in May 2008 by the US National Research Council. The authors of the NRC report argue that more long-term and quantitative research is needed on the effects of uranium’s chemical toxicity. They say the science seems to support the theory that genetic damage might be occurring because uranium’s chemical toxicity and weak radioactivity could somehow reinforce each other, though no one knows what the mechanism for this might be.

D

Now two researchers, Chris Busby and Ewald Schnug, have a new theory that they say explains how depleted uranium could cause genetic damage. Their theory invokes a well-known process called the photoelectric effect. This is the main mechanism by which gamma photons with energies of about 100 kiloelectronvolts (keV) or less are blocked by matter: the photon transfers its energy to an electron in the atom’s electron cloud, which is ejected into the surroundings.

An atom’s ability to stop photons by this mechanism depends on the fourth power of its atomic number - the number of protons in its nucleus - so heavy elements are far better at intercepting gamma radiation and X-rays than light elements. This means that uranium could be especially effective at capturing photons and kicking out damaging photoelectrons: with an atomic number of 92, uranium blocks low-energy gamma photons over 450 times as effectively as the lighter element calcium, for instance.

E

Busby and Schnug say that previous risk models have ignored this well-established physical effect. They claim that depleted uranium could be kicking out photoelectrons in the body’s most vulnerable spots. Various studies have shown that dissolved uranium - ingested in food or water, for example - is liable to attach to DNA strands within cells, because uranium binds strongly to DNA phosphate. “Photoelectrons from uranium are therefore likely to be emitted precisely where they will cause most damage to genetic material,” says Busby.

F

Busby and Schnug base their claim on calculations of the photoelectrons that would be produced by the interation between normal background levels of gamma radiation and uranium in the body. “Our detailed calculations indicate that the phantom photoelectrons are the predominant effect by far for uranium genome toxicity, and that uranium could be 1500 times as powerful as an emitter of photoelectrons than as an alpha emitter.” Their computer modelling results are described in a peer-reviewed paper to be published in this month by the IPNSS in a book called Loads and Fate of Fertiliser Derived Uranium.

G

Hans-Georg Menzel, who chairs the International Commission on Radiological Protection’s committee on radiation doses, acknowledges that the theory should be considered, but he doubts that it will prove significant. He suspects that under normal background radiation the effect is too weak to inflict many of the “double hits” of energy that are known to be most damaging to cells. “It is very unlikely that individual cells would be subject to two or more closely spaced photoelectron impacts under normal background gamma irradiation,” he says. Despite his doubts, Menzel raised the issue last week with his committee in St Petersburg, Russia, and says that several colleagues “intended to collect relevant data and perform calculations to check whether there was any possibility of a real effect in living tissues”. Organisations in the UK, including the Ministry of Defence and the Health Protection Agency, say they have no plans to investigate Busby’s hypothesis.

H

Radiation biophysicist Mark Hill of the University of Oxford would like to see a fuller investigation, though he suggests this might show that the photoelectric effect is not as powerful as Busby claims. “We really need more detailed calculations and dose estimates for realistic situations with and without uranium present,” he says. Hill’s doubts centre on an effect called Compton scattering, which he believes needs to be factored into any calculations. With Compton scattering, uranium is only 4.5 times as effective as calcium at stopping gamma photons, so Hill says that taking it into account would reduce the relative importance of uranium as an emitter of secondary electrons. If he is right, this would dilute the mechanism proposed by Busby and Schnug.

I

The arguments over depleted uranium are likely to continue, whatever the outcome of these experiments. Whether Busby’s theory holds up or not remains to be seen, but investigating it can only help to clear up some of the doubts about this mysterious substance.
`,
    questions: [
      {
        type: "matrix_match",
        heading: "Questions 14–18",
        title: "Reading Passage 2 paragraphs, A–I.",
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
            { id: "I" },
          ],
        },
        items: [
          {
            n: 14,
            text: "a famous process is given relating to the new theory.",
          },
          {
            n: 15,
            text: "a person who acknowledges but suspects the theory.",
          },
          { n: 16, text: "the explanation of damage to DNA" },
          {
            n: 17,
            text: "a debatable and short explanation of the way creating the problems of soldiers.",
          },
          {
            n: 18,
            text: "Busby’s hypothesis is not in the investigation plans of organizations.",
          },
        ],
      },

      {
        type: "tfng",
        heading: "Questions 19–22",
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
            n: 19,
            text: "All people believe that depleted uranium is harmful to people’s health.",
          },
          {
            n: 20,
            text: "Heavier elements can perform better at preventing X-rays and gamma radiation.",
          },
          {
            n: 21,
            text: "By particular calculations, it is known that the main effect of uranium genome toxicity is phantom photoelectrons.",
          },
          {
            n: 22,
            text: "Most scientists support Mark Hill’s opinion.",
          },
        ],
      },
      {
        type: "summary_complete",
        heading: "Questions 23–26",
        sub: "Choose ONE WORD from the passage for each answer.",
        title: "Write your answers in boxes 23 – 26 on your answer sheet",
        items: [
          { n: 23 },
          {
            text: " attaches importance to depleted uranium due to its ",
          },
          { n: 24 },
          {
            text: " and  ",
          },
          { n: 25 },
          {
            text: " features, which are helpful in the war. However, it has ill effects in people, and then causes organisations’ appeal to do more relative studies. According to some scientists, we should do research about the impact of uranium’s ",
          },
          { n: 26 },
          {
            text: " which may be enhanced with weak radioactivity. ",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Passage 3",
    title: "Caral: an ancient South American city",
    subtitle: "",
    text: `Huge earth and rock mounds rise out of the desert of the Supe Valley near the coast of Peru in South America. These immense mounds appear simply to be part of the geographical landscape in this arid region squeezed between the Pacific Ocean and the Andes mountains.But looks deceive. These are actually human-made pyramids strong evidence indicates they are the remains of a city known as Caral that flourished nearly 5,000 years ago. It true, it would be the oldest known urban center in the America and among the most ancient in the world.

Research undertaken by Peruvian archaeologist Ruth Shady suggests that the 150-acre plex of pyramids, plazas and residential buildings was a thriving metropolis when Egypt's great pyramids were still being built. Though discovered in 1905, for years Caral attracted little attention, largely because archaeologists believed the structures were rainy recent. But the monumental scale of the pyramids had long interested Shady, who began excavations at the site in 1996, about 22 kilometers from the coast and 190 kilometers north of Peru's capital city of Lima.

Shady and her crew searched for broken remains of the pots and containers that most such sites contain. Not finding any only made her more excited: it meant Caral could be what archaeologists term pre-ceramic, that is, existing before the advent in the area of pot-firing techniques. Shady's team undertook the task of excavating Piramide Mayor, the largest of the pyramids. After carefully clearing away many hundreds of years' worth of rubble and sand, they identified staircases, walls covered with remnants of colored plaster, and brickwork. In the foundations, they found the remains of grass-like reeds woven into bags. The original workers, she surmised, must have filled these bags with stones from a nearby quarry and laid them atop one another inside retaining walls, gradually giving rise to the pyramid's immense structure. Shady had samples of the reeds subjected to radiocarbon dating and found that the reeds were 4,600 years old. This evidence indicated that Caral was, in fact, more than 1,000 years older than what had previously been thought to be the oldest urban center in the Americas.

What amazed archaeologists was not just the age, but the complexity and scope of Caral. Piramide Mayor alone covers an area nearly the size of four football fields and is 18 meters tall. A nine-meter-wide staircase rises from a circular plaza at the foot of the pyramid, passing over three terraced levels until it reaches the top. Thousands of manual laborers would have been needed to build such a project, not counting the many architects, craftsmen, and managers. Shady's team found the remains of a large amphitheater, containing almost 70 musical instruments made of bird and deer bones Clearly music plaved an important role in Caral's society. Around the perimeter of Caral are a series of smaller mounds and various buildings. These indicate a hierarchy of living arrangements: large, well-kept rooms atop pyramids for the elite, ground-level quarters for shabbier outlying dwellings for workers

But why had Caral been built in the first place? Her excavations convinced Shady that Caral once served as a trade center for the region, which extends from the rainforests of the Amazon to the high forests of the Andes. Shady found evidence of a rich trading environment, including seeds of the cocoa bush and necklaces of shells, neither of which was native to the immediate Caral area. This environment gave rise to people who did not take part in the production of food, allowing them to become priests and planners, builders and designers. Thus occupational specialization, elemental to an urban society, emerged.

But what sustained such a trading center and drew travelers to it? Was it food? Shady and her team found the bones of small edible fish, which must have come from the Pacific coast to the west, in the excavations. But they also found evidence of squash, sweet potatoes and beans having been grown locally. Shady theorized that Caral's early farmers diverted the area's rivers into canals, which still cross the Supe Valley today, to irrigate their fields.But because she found no traces of maize, which can be traded or stored and used in times of crop failure, she concluded that Caral's trade leverage was not based on stockpiling food supplies.

It was evidence of another crop in the excavations that gave Shady the best clue to Caral’s success. In nearly every excavated building, her team discovered evidence of cotton - seeds, fibers and textiles. Her theory fell into place when a large fishing net made of those fibers, unearthed in an unrelated dig on Peru's coast, turned out to be as old as Caral. 'The farmers of Caral grew the cotton that the fishermen needed to make their nets, Shady speculates. And the fishermen gave them shellfish and dried fish in exchange for these nets.' In essence, the people of Caral enabled fishermen to work with larger and more effective nets, which made the resources of the sea more readily available, and the fishermen probably used dried squash grown by the Caral people as flotation devices for their nets.`,
    questions: [
      {
        type: "tfng",
        heading: "Questions 27–32",
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
            n: 27,
            text: "Caral was built at the same time as the construction of the Egyptian pyramids.",
          },
          {
            n: 28,
            text: "The absence of pottery at the archaeological dig gave Shady a significant clue to the age of the site.",
          },
          {
            n: 29,
            text: "The stones used to build Piramide Mayor came from a location far away",
          },
          {
            n: 30,
            text: "The huge and complicated structures of Piramide Mayor suggest that its construction required an organised team of builders.",
          },
          {
            n: 31,
            text: "Archaeological evidence shows that the residents of Caral were highly skilled musicians.",
          },
          {
            n: 32,
            text: "The remains of housing areas at Caral suggest that there were no class distinctions in residential areas.",
          },
        ],
      },
      {
        type: "short",
        heading: "Questions 33–40",
        title: "Answer the questions below.",
        sub: "Choose ONE WORDS ONLY from the passage for each answer.",
        bulletPoint: true,
        questionTitle: "Caral as a trading centre",
        themeTitle:
          "Items discovered at Caral but not naturally occurring in the area",
        items: [
          {
            n: 33,
            text: "the ",
            afterText: "of a certain plant",
          },
          {
            n: 34,
            text: "",
            afterText: "used to make jewellery",
          },
          {
            n: 35,
            text: "the remains of certain food such as",
          },
        ],
      },
      {
        type: "short",
        bulletPoint: true,
        themeTitle: "Clues to farming around Caral",
        items: [
          {
            n: 36,
            text: "",
            afterText:
              "still in existence today indicate water diverted from rivers",
          },
          {
            n: 37,
            text: "no evidence that ",
            afterText: "was grown",
          },
        ],
      },
      {
        type: "short",
        bulletPoint: true,
        themeTitle: "Evidence of relationship with fishing communities",
        items: [
          {
            n: 38,
            text: "the excavation findings and fishing nets found on the coast suggest Caral farmers traded",
          },
          {
            n: 39,
            text: "dried squash may have been used to aid",
          },
          {
            n: 40,
            text: "in exchange for cotton fishing nets, farmers received",
            afterText: "and dried fish",
          },
        ],
      },
      ,
    ],
  },
];
