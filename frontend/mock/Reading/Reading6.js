export const READING6_ANSWER_KEY = {
  1: "FALSE",
  2: "NOT GIVEN",
  3: "NOT GIVEN",
  4: "TRUE",
  5: "TRUE",
  6: "FALSE",
  7: "rule",
  8: "river",
  9: "confidence",
  10: "schools",
  11: "statistics",
  12: "clinics",
  13: "language",
  14: "i",
  15: "ix",
  16: "iv",
  17: "vii",
  18: "v",
  19: "iii",
  20: "FALSE",
  21: "FALSE",
  22: "FALSE",
  23: "TRUE",
  24: ["B", "C", "E"],
  25: ["B", "C", "E"],
  26: ["B", "C", "E"],
  27: "TRUE",
  28: "FALSE",
  29: "TRUE",
  30: "TRUE",
  31: "NOT GIVEN",
  32: "A",
  33: "C",
  34: "D",
  35: "anatomy",
  36: "resistance",
  37: "stress",
  38: "hypertension",
  39: "organs",
  40: "soles",
};

export const Reading6Passage = [
  {
    id: 1,
    label: "Passage 1",
    title: "Traditional Maori medicines",
    subtitle: "",
    text: `The Maori are the indigenous people of the islands of New Zealand. Their traditional medicine, which is believed to date back as far as the 13th century, was a system of healing that was passed down through the generations orally. It comprised diverse practices and placed an emphasis on the spiritual dimension of health. Its practice included remedies made from herbs, and physical therapies such as massage to relieve discomfort in the muscles and bones.

Maori systems for treating illness were well developed before European arrived in New Zealand in the late 1700s: they had quite detailed knowledge of anatomy and recognition of the healing properties of various plants. When Europeans first visited New Zealand, the average age of death for Maori adults was around 30. However, apart from this, the people were fit and healthy, and troubled by few diseases.

Illness was often seen as spiritually based. Maori saw themselves as guardians of the earth, and the focus of their existence was to remain at one with the natural and supernatural world. Rather than a medical problem, sickness was often viewed as a symptom of disharmony with natures.

In Maori culture, illnesses were divided into diseases of the gods (mate atua) and physical diseases (mate tangata). Diseases sent by the gods were often attributed to attacks by evil spirits, because the person had broken a religious rule. For instance, for Maori, Places where people had died, or places where their ancestors were buried were sacred, so if someone took food from a river where someone had died, or took a stick form a tree that had held their ancestor's bones and placed it on a cooking fire, it was believed that the gods could punish them for their disrespectful acts by making them SICK.

More than 200 plants were used medicinally by Maori. The leaves of the flax plant were used to treat skin infections and food poisoning, and the hard part of the leaf was also used as a splint or brace for broken bones and injured backs. Flax fibers were used along with a sharpened stick to sew up bad cuts. The bark and leaves of the pepper tree were used to heal cuts, wounds and stomach pain. People who had toothache were instructed to chew the leaves of this same tree, and this was found to be of considerable benefit. The pepper tree was also used in vapor baths to treat people with painful joints.

Colonization by European in the 1800s had a significant effect on traditional Maori healing. Europeans brought many new diseases with them which Maori healers had limited ability to combat. Though Western medicine was also relatively ineffectual at the time, this failure still strongly affected Maori confidence in their healers. Some western missionaries attributed the spread of disease to the fact the Maori did not believe in Christianity, and as Maori healers appeared powerless, many Maori accepted this explanation and turned to Christianity. Over time the schools of higher learning which ahd trained healers started to close and the tradition of the Maori healer declined.

From the late 20th century, there was renewed Maori interest in their traditional medicine. This was due to several factors. There was a resurgence of all aspects of Maori culture in New Zealand. Furthermore, people started to be less trusting of Western medicine-statistics from the 1970s came out revealing that Maori health continued to be poorer than that of other New Zealanders. There were also problems with access to health care for Maori. Additionally, there was and still a today a perceived lack of a spiritual dimension in Western health services.

Although Maori today largely accepted Western concepts of health and illness, and use the mainstream health system, there is significant demand for traditional medicine. This is true for unusual illnesses, or those that fail to respond to standard medical treatment, but also for common ailments such as the cold and influenza.

Today's healers differ significantly from those of old times. Training is highly variable, usually informal, and often less tribally bound than the rigorous education of the traditional houses of higher learning. Many modern healers work in urban clinics, some alongside mainstream health professionals. They experiment, incorporating knowledge from Western and other medical systems. As a result, their modern day work has no standard system of diagnosis or widespread agreement about treatments. Despite this, many healers are recognized as having knowledge and ability that has been passed down from their ancestors. The Maori language is also seen as important by many of those receiving treatment. `,
    questions: [
      {
        type: "tfng",
        heading: "Questions 1–6",
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
            text: "Early Maori healers learned their skills through studying written texts.",
          },
          {
            n: 2,
            text: "The first Europeans in New Zealand were surprised by how long the Maori lived.",
          },
          {
            n: 3,
            text: "Diseases of the gods were believed to be more serious than physical diseases.",
          },
          {
            n: 4,
            text: "The leaves of the pepper tree were used to treat toothache.",
          },
          {
            n: 5,
            text: "Western religion was one reason why traditional Maori medicine became less popular.",
          },
          {
            n: 6,
            text: "Modern day Maori healers often reach the same conclusion about the type of treatment which is best.",
          },
        ],
      },
      {
        type: "short",
        heading: "Questions 7–13",
        title: "Answer the questions below.",
        sub: "Choose ONE WORD ONLY from the passage for each answer.",
        bulletPoint: true,
        questionTitle: "A short history of Maori healing",
        themeTitle: "Pre-European arrival",
        items: [
          {
            n: 7,
            text: "Maori were using plant based remedies, as well as treatment including massage Diseases sent from the gods were thought to be caused by disobeying a spiritual",
          },
          {
            n: 8,
            text: "Sickness could be attributed to eating food from a sacred",
            afterText: "or burning sacred wood",
          },
        ],
      },
      {
        type: "short",
        bulletPoint: true,
        questionTitle: "After European arrival",
        themeTitle: "1800s",
        items: [
          {
            n: 9,
            text: "The inability of Maori healers to cure new diseases meant the Maori people lost",
            afterText: "in them.",
          },
          {
            n: 10,
            text: "Eventually the",
            afterText: "for Maori healing began shutting down",
          },
        ],
      },
      {
        type: "short",
        bulletPoint: true,
        themeTitle: "1970s",
        items: [
          {
            n: 11,
            text: "Published ",
            afterText: "showed that Maori were not as healthy as Europeans",
          },
        ],
      },
      {
        type: "short",
        bulletPoint: true,
        themeTitle: "2000s",
        items: [
          {
            n: 12,
            text: "Maori healers can be seen working with Western doctors in",
            afterText: "in cities",
          },
          {
            n: 13,
            text: " Many patients appreciate the fact that the Maoris",
            afterText: "in used by healers",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Passage 2",
    title: "Katherine Mansfield",
    subtitle:
      "Katherine Mansfield was a modernist writer of short fiction who was born and brought up in New Zealand",
    text: `[Paragraph A] E-learning is the unifying term to describe the fields of online learning, web-based training, and technology-delivered instruction, which can be a great benefit to corporate e-learning. IBM, for instance, claims that the institution of its e-training program, Basic Blue, whose purpose is to train new managers, saved the company in the range of $200 million in 1999. Cutting the travel expenses required to bring employees and instructors to a central classroom account for the lion’s share of the savings. With an online course, employees can learn from any Internet-connected PC, anywhere in the world. Ernst and Young reduced training costs by 35 percent while improving consistency and scalability.

[Paragraph B] In addition to generally positive economic benefits, other advantages such as convenience, standardized delivery, self-paced learning, and a variety of available content, have made e-learning a high priority for many corporations. E-learning is widely believed to offer flexible “any time, any place” learning. The claim for “any place” is valid in principle and is a great development. Many people can engage with rich learning materials that simply were not possible in a paper of broadcast distance learning era. For teaching specific information and skills, e-training holds great promise. It can be especially effective at helping employees prepare for IT certification programs. E-learning also seems to effectively address topics such as sexual harassment education’, safety training and management training – all areas where a clear set of objectives can be identified. Ultimately, training experts recommend a “blended” approach that combines both online and in-person training as the instruction requires. E-learning is not an end-all solution. But if it helps decrease costs and windowless classrooms filled with snoring students, it definitely has its advantages.

[Paragraph C] Much of the discussion about implementing e-learning has focused on the technology, but as Driscoll and others have reminded us, e-learning is not just about the technology, but also many human factors. As any capable manager knows, teaching employees new skills is critical to a smoothly run business. Having said that, however, the traditional route of classroom instruction runs the risk of being expensive, slow and, oftentimes, ineffective. Perhaps the classroom’s greatest disadvantage is the fact that it takes employees out of their jobs. Every minute an employee is sitting in a classroom training session is a minute they’re not out on the floor working. It now looks as if there is a way to circumvent these traditional training drawbacks. E-training promises more effective teaching techniques by integrating audio, video, animation, text and interactive materials with the intent of teaching each student at his or her own pace. In addition to higher performance results, there are other immediate benefits to students such as increased time on task, higher levels of motivation, and reduced test anxiety for many learners.

[Paragraph D] On the other hand, nobody said E-training technology would be cheap. E-training service providers, on the average, charge from $10,000 to $60,000 to develop one hour of online instruction. This price varies depending on the complexity of the training topic and the media used. HTML pages are a little cheaper to develop while streaming-video presentations or flash animations cost more. Course content is just the starting place for the cost. A complete e-learning solution also includes the technology platform (the computers, applications and network connections that are used to deliver the courses). This technology platform, known as a learning management system (LMS), can either be installed onsite or outsourced. Add to that cost the necessary investments in network bandwidth to deliver multimedia courses, and you’re left holding one heck of a bill. For the LMS infrastructure and a dozen or so online courses, costs can top $500,000 in the first year. These kinds of costs mean that custom e-training is, for the time being, an option only for large organizations. For those companies that have a large enough staff, the e-training concept pays for itself. Aware of this fact, large companies are investing heavily in online training. Today, over half of the 400-plus courses that Rockwell Collins offers are delivered instantly to its clients in an e-learning format, a change that has reduced its annual training costs by 40%. Many other success stories exist.

[Paragraph E] E-learning isn’t expected to replace the classroom entirely. For one thing, bandwidth limitations are still an issue in presenting multimedia over the Internet. Furthermore, e-training isn’t suited to every mode of instruction or topic. For instance, it’s rather ineffective imparting cultural values or building teams. If your company has a unique corporate culture is would be difficult to convey that to first-time employees through a computer monitor. Group training sessions are more ideal for these purposes. In addition, there is a perceived loss of research time because of the work involved in developing and teaching online classes. Professor Wallin estimated that it required between 500 and 1,000 person-hours, that is, Wallin-hours, to keep the course at the appropriate level of currency and usefulness. (Distance learning instructors often need technical skills, no matter how advanced the courseware system.) That amounts to between a quarter and half of a person-year. Finally, teaching materials require computer literacy and access to equipment. Any e-Learning system involves basic equipment and a minimum level of computer knowledge in order to perform the tasks required by the system. A student that does not possess these skills, or have access to these tools, cannot succeed in an e-Learning program.

[Paragraph F] While few people debate the obvious advantages of e-learning, systematic research is needed to confirm that learners are actually acquiring and using the skills that are being taught online, and that e-learning is the best way to achieve the outcomes in a corporate environment. Nowadays, a go-between style of Blended learning, which refers to a mixing of different learning environments, is gaining popularity. It combines traditional face-to-face classroom methods with more modern computer-mediated activities. According to its proponents, the strategy creates a more integrated approach for both instructors and learners. Formerly, technology-based materials played a supporting role in face-to-face instruction. Through a blended learning approach, technology will be more important.
            `,
    headingsList: [
      {
        id: "i",
        text: "overview of the benefits for application of E-training",
      },
      { id: "ii", text: " IBM’s successful choice of training" },
      { id: "iii", text: "Future directions and a new style of teaching" },
      {
        id: "iv",
        text: "learners’ achievement and advanced teaching materials",
      },
      {
        id: "v",
        text: " limitations when E-training compares with traditional class",
      },
      { id: "vi", text: "multimedia over the Internet can be a solution" },
      { id: "vii", text: "technology can be a huge financial burden" },
      {
        id: "viii",
        text: "the distance learners outperformed the traditional university learners worldwide",
      },
      { id: "ix", text: "other advantages besides economic consideration" },
      {
        id: "x",
        text: "Training offered to help people learn using computers ",
      },
      {
        id: "vii",
        text: "public's increasing ability to influence the law",
      },
      { id: "viii", text: "growth in laws" },
    ],
    paragraphQuestions: {
      A: 14,
      B: 15,
      C: 16,
      D: 17,
      E: 18,
      F: 19,
    },
    questions: [
      {
        type: "headings",
        heading: "Questions 14–19",
        title:
          "Choose the correct heading for each paragraph from the list of headings below. Write the correct number i-viii in boxes 14-19 on your answer sheet.",
        sub: "Reading Passage 2 has six paragraphs A-F.",

        items: [
          { n: 14, label: "Paragraph A" },
          { n: 15, label: "Paragraph B" },
          { n: 16, label: "Paragraph C" },
          { n: 17, label: "Paragraph D" },
          { n: 18, label: "Paragraph E" },
          { n: 19, label: "Paragraph F" },
        ],
      },
      {
        type: "tfng",
        heading: "Questions 20–23",
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
            n: 20,
            text: "IBM's Basic Blue program was designed to train experienced senior executives.",
          },
          {
            n: 21,
            text: "E-learning is generally considered less effective than classroom training for teaching specific skills like IT certification.",
          },
          {
            n: 22,
            text: "The cost of developing e-training courses is unaffected by the type of media used.",
          },
          {
            n: 23,
            text: "Blended learning combines both traditional classroom teaching and computer-based methods.",
          },
        ],
      },
      {
        type: "multiChoiceMCQ",
        heading: "Questions 24–26",
        title: "Write your answers in boxes 20-21 on your answer sheet.",
        sub: "Choose THREE letters A-E.",
        items: [
          {
            n: [24, 25, 26],
            q: "Which TWO of the following statements does the writer make about legal skills in today's world?",
            opts: [
              "Technical facilities are hardly obtained.",
              "Presenting multimedia over the Internet is restricted due to the bandwidth limit.",
              "It is ineffective imparting a unique corporate value to fresh employees.",
              "Employees need to block a long time leaving their position attending training.",
              "More preparation time is needed to keep the course at a suitable level.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Passage 3",
    title: "Learning to Walk",
    subtitle: "",
    text: `
    
    These days the feet of a typical city dweller rarely encounter terrain any more uneven than a crack in the pavement. While that may not seem like a problem, it turns out that by flattening our urban environment we have put ourselves at risk of a surprising number of chronic illnesses and disabilities. Fortunately, the commercial market has come to the rescue with a choice of products. Research into the idea that flat floors could be detrimental to our health was pioneered back in the late 1960s in Long Beach, California. Podiatrist Charles Brantingham and physiologist Bruce Beekman were concerned with the growing epidemic of high blood pressure, varicose veins and deep-vein thromboses and reckoned they might be linked to the uniformity of the surfaces that we tend to stand and walk on.

The trouble, they believed, was that walking continuously on flat floors, sidewalks and streets concentrates forces on just a few areas of the foot. As a result, these surfaces are likely to be far more conducive to chronic stress syndromes than natural surfaces, where the foot meets the ground in a wide variety of orientations. They understood that the anatomy of the foot parallels that of the human hand - each having 26 bones, 33 joints and more than 100 muscles, tendons and ligaments - and that modern lifestyles waste all this potential flexibility.

Brantingham and Beekman became convinced that the damage could be rectified by making people wobble. To test their ideas, they got 65 factory workers to try standing on a variable terrain floor - spongy mats with varying degrees of resistance across the surface. This modest irregularity allowed the soles of the volunteers' feet to deviate slightly from the horizontal each time they shifted position. As the researchers hoped, this simple intervention made a huge difference, within a few weeks. Even if people were wobbling slightly, it activated a host of muscles in their legs, which in turn helped pump blood back to their hearts. The muscle action prevented the pooling of blood in their feet and legs, reducing the stress on the heart and circulation. Yet decades later, the flooring of the world's largest workplaces remains relentlessly smooth. Earlier this year, however, the idea was revived when other researchers in the US announced findings from a similar experiment with people over 60. John Fisher and colleagues at the Oregon Research Institute in Eugene designed a mat intended to replicate the effect of walking on cobblestones*.

In tests funded by the National Institute of Aging, they got some 50 adults to walk on the toots in their bare feet for less than an hour, three times a week. After 16 weeks, these people showed marked improvements in mobility, and even a significant reduction in blood pressure. People in a control group who walked on ordinary floors also improved but not as dramatically. The mats are now available for purchase and production is being scaled up. Even so, demand could exceed supply if this footstimulating activity really is a 'useful nonpharmacological approach for preventing or controlling hypertension of older adults, as the researchers believe. They are not alone in recognising the benefits of cobblestones. Reflexologists have long advocated walking on textured surfaces to stimulate so-called 'acupoints' on the soles of the feet. They believe that pressure applied to particular spots on the foot connects directly to particular organs of the body and somehow enhances their function. In China, spas, apartment blocks and even factories promote their cobblestone paths as healthful amenities. Fisher admits he got the concept from regular visits to the country. Here, city dwellers take daily walks along cobbled paths for five or ten minutes, perhaps several times a day, to improve their health. The idea is now taking off in Europe too.

People in Germany, Austria and Switzerland can now visit 'barefoot parks' and walk along 'paths of the senses - with mud, logs, stone and moss underfoot. And it is not difficult to construct your own path with simple everyday objects such as stones or bamboo poles. But if none of these solutions appeal, there is another option. A new shoe on the market claims to transform flat, hard, artificial surfaces into something like uneven ground. 'These shoes have an unbelievable effect,' says Benno Nigg, an exercise scientist at Calgary University in Canada.

Known as the Masai Barefoot Technology, the shoes have rounded soles that cause you to rock slightly when you stand still, exercising the small muscles around the ankle that are responsible for stability. Forces in the joint are reduced, putting less strain on the system, Nigg claims.

Some of these options may not appeal to all consumers and there is a far simpler alternative.

If the urban environment is detrimental to our health, then it is obvious where we should turn. A weekend or even a few hours spent in the countryside could help alleviate a sufferer's aches and pains, and would require only the spending of time.

However, for many modern citizens, the countryside is not as accessible as it once was and is in fact a dwindling resource. Our concrete cities are growing at a terrifying rate - perhaps at the same rate as our health problems.

    `,
    questions: [
      {
        type: "tfng",
        heading: "Questions 27–31",
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
            text: "Brantingham and Beekman were the first researchers to investigate the relationship between health problems and flat floor",
          },
          {
            n: 28,
            text: "The subjects in Fisher's control group experienced a decline in their physical condition.",
          },
          {
            n: 29,
            text: "The manufacturers are increasing the number of cobblestone mats they are making.",
          },
          {
            n: 30,
            text: "Fisher based his ideas on what he saw during an overseas trip.",
          },
          {
            n: 31,
            text: "The Masai Barefoot Technology shoes are made to fit people of all ages.",
          },
        ],
      },
      {
        type: "mcq",
        heading: "Questions 32–34",
        title: "Choose the correct letter, A, B, C or D.",
        items: [
          {
            n: 32,
            text: "The writer suggests that Brantingham and Beekman's findings were",
            options: [
              {
                id: "A",
                text: "ignored by big companies.",
              },
              {
                id: "B",
                text: "doubted by other researchers.",
              },
              {
                id: "C",
                text: "applicable to a narrow range of people. ",
              },
              {
                id: "D",
                text: "surprising to them.",
              },
            ],
          },
          {
            n: 33,
            text: "What claim is made by the designers of the cobblestone mats?",
            options: [
              {
                id: "A",
                text: "They need to be used continuously in order to have a lasting effect.",
              },
              {
                id: "B",
                text: "They would be as beneficial to younger people as to older people.",
              },
              {
                id: "C",
                text: "They could be an effective alternative to medical intervention.",
              },
              {
                id: "D",
                text: "Their effects may vary depending on individual users.",
              },
            ],
          },
          {
            n: 34,
            text: "Which of the following points does the writer make in the final paragraph?",
            options: [
              {
                id: "A",
                text: "People should question new theories that scientists put forward.",
              },
              {
                id: "B",
                text: "High prices do not necessarily equate to a quality product.",
              },
              {
                id: "C",
                text: "People are setting up home in the country for health reasons.",
              },
              {
                id: "D",
                text: " The natural environment is fast disappearing.",
              },
            ],
          },
        ],
      },
      {
        type: "summary_complete",
        heading: "Questions 35–40",
        title: "Choose ONE WORD ONLY from the passage for each answer.",
        sub: "Complete the notes below.",
        items: [
          {
            text: "In their research, Brantingham and Beekman looked at the complex physical",
          },
          { n: 35 },
          {
            text: " of the foot and noted that the surfaces of modem environments restrict its movement. They invented a mat which they tried out on factory workers. Whenever the workers walked on it, the different levels of ",
          },
          { n: 36 },
          {
            text: " in the mat would encourage greater muscle action. In turn, this lessened the effect of ",
          },
          { n: 37 },
          {
            text: " on the cardiovascular system. ",
          },
        ],
      },
      {
        type: "summary_complete",
        items: [
          {
            text: " Similar research was undertaken by John Fisher and colleagues in Oregon. As a result of their findings, they decided to market cobblestone mats to the elderly as a means of dealing with ",
          },
          { n: 38 },
          {
            text: " to their work. What's more, a lot of lawyers' time is spent writing ",
          },
          { n: 39 },
          {
            text: " will also improve. Finally, Benno Nigg at Calgary University believes that specially shaped ",
          },
          { n: 40 },
          {
            text: "on shoes should give health benefits.",
          },
        ],
      },
    ],
  },
];
