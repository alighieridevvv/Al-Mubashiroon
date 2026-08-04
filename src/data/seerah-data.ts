export interface SeerahEvent {
  id: string;
  yearCE: number;
  yearHijri?: number;
  title: string;
  phase: 'Pre-Prophethood' | 'Meccan Period' | 'Hijrah' | 'Medinan Period' | 'Final Years';
  category: 'General' | 'Revelation' | 'Treaty' | 'Battle' | 'Milestone';
  description: string;
  referenceQuote?: string; // Qur'an or Hadith
  referenceSource?: string;
  location: string;
}

export const SEERAH_EVENTS: SeerahEvent[] = [
  {
    id: "see_1",
    yearCE: 570,
    title: "Year of the Elephant & Birth",
    phase: "Pre-Prophethood",
    category: "Milestone",
    description: "The Prophet Muhammad ﷺ was born in Makkah on a Monday in Rabi' al-Awwal. This year was known as the Year of the Elephant, when Abrahah's army of elephants attempting to destroy the Ka'bah was miraculously decimated by swarms of birds.",
    referenceQuote: "Have you not seen how your Lord dealt with the companions of the elephant?",
    referenceSource: "Surah Al-Feel, 105:1",
    location: "Makkah"
  },
  {
    id: "see_2",
    yearCE: 576,
    title: "Passing of Aminah (His Noble Mother)",
    phase: "Pre-Prophethood",
    category: "Milestone",
    description: "After spending his early childhood in the pristine desert with Halimah as-Sa'diyyah, Muhammad returned to his mother, Aminah. At the age of six, she passed away on her return from Madinah, leaving him orphaned and placed in the loving care of his grandfather, Abdul-Muttalib.",
    location: "Al-Abwa"
  },
  {
    id: "see_3",
    yearCE: 578,
    title: "Care of Abdul-Muttalib and Abu Talib",
    phase: "Pre-Prophethood",
    category: "Milestone",
    description: "His beloved grandfather Abdul-Muttalib passed away when Muhammad ﷺ was eight years old. Consequently, his warm paternal uncle, Abu Talib, took guardianship of him, caring for him with greater devotion than his own children.",
    location: "Makkah"
  },
  {
    id: "see_4",
    yearCE: 582,
    title: "First Journey to Syria & Bahira",
    phase: "Pre-Prophethood",
    category: "Milestone",
    description: "While traveling to Syria in a trade caravan with his uncle Abu Talib at twelve years old, they met a Christian monk named Bahira. Bahira recognized signs of future prophethood in him described in early manuals and advised Abu Talib to protect him from adversaries.",
    location: "Busra, Syria"
  },
  {
    id: "see_5",
    yearCE: 590,
    title: "Hilf al-Fudul (Pact of the Virtuous)",
    phase: "Pre-Prophethood",
    category: "Treaty",
    description: "An alliance took place in Makkah to establish justice for vulnerable foreign traders. The youthful Muhammad took part in this pact, which vowed to defense any oppressed citizen or merchant. He famously praised this noble treaty throughout his high prophetic years.",
    referenceQuote: "I witnessed a pact in the house of Abdullah ibn Jud'an, more beloved to me than red camels.",
    referenceSource: "Sunan Al-Kubra",
    location: "Makkah"
  },
  {
    id: "see_6",
    yearCE: 595,
    title: "Marriage to Khadijah bint Khuwaylid",
    phase: "Pre-Prophethood",
    category: "Milestone",
    description: "Impressed by Muhammad's unparalleled honesty, business ethics, and noble character while handling her commercial caravan, the esteemed noblewoman Khadijah (40) proposed marriage to Muhammad (25). He accepted, starting a deeply loving life partnership.",
    location: "Makkah"
  },
  {
    id: "see_7",
    yearCE: 605,
    title: "Rebuilding the Ka'bah & Stone Resolution",
    phase: "Pre-Prophethood",
    category: "Milestone",
    description: "When the Ka'bah was flooded and reconstructed, rival Quraish clans disputed fiercely over who should have the honor of placing the sacred Black Stone back in its corner. Muhammad ﷺ resolved the issue by placing the stone on a cloak, asking all chiefs to lift it together.",
    location: "Ka'bah, Makkah"
  },
  {
    id: "see_8",
    yearCE: 610,
    yearHijri: -13,
    title: "The First Divine Revelation",
    phase: "Meccan Period",
    category: "Revelation",
    description: "At forty years of age, while meditating in loneliness within the Cave of Hira, the Angel Jibreel (Gabriel) appeared to Muhammad ﷺ. Jibreel squeezed him and commanded: 'Read!' starting the majestic dynamic launch of the final revelation.",
    referenceQuote: "Read in the name of your Lord who created—Created man from a clinging substance.",
    referenceSource: "Surah Al-Alaq, 96:1-2",
    location: "Cave of Hira, Jabal an-Nur"
  },
  {
    id: "see_9",
    yearCE: 613,
    yearHijri: -10,
    title: "The Calling goes Public (Safa Mountain)",
    phase: "Meccan Period",
    category: "Milestone",
    description: "After three years of quiet, private calling, Allah commanded the Prophet ﷺ to speak publicly. He ascended Mount Safa and addressed his relatives, warning them of accountability. His uncle Abu Lahab rudely rejected him, prompting divine condemnation of Abu Lahab's actions.",
    referenceQuote: "And warn, [O Muhammad], your closest relations.",
    referenceSource: "Surah Ash-Shu'ara, 26:214",
    location: "Mount Safa, Makkah"
  },
  {
    id: "see_10",
    yearCE: 615,
    yearHijri: -8,
    title: "First Migration to Abyssinia (Axum)",
    phase: "Meccan Period",
    category: "Milestone",
    description: "To safeguard newly converted companions from systematic torture and persecution at the hands of pagan chieftains, the Prophet ﷺ advised a small group of Muslims to migrate to Abyssinia (modern Ethiopia) under the justice of the Christian King Negus.",
    referenceQuote: "If you were to go to Abyssinia, it has a king under whom no one is oppressed.",
    referenceSource: "Seerah Ibn Hisham",
    location: "Abyssinia"
  },
  {
    id: "see_11",
    yearCE: 616,
    yearHijri: -7,
    title: "Conversions of Hamzah & Umar",
    phase: "Meccan Period",
    category: "Milestone",
    description: "The Islamic message received massive fortitude when two formidable fighters embraced Islam back-to-back: the noble uncle Hamzah ibn Abdul-Muttalib, and the strong-willed Umar ibn al-Khattab. After Umar's conversion, the Muslims declared their prayers publicly at the Ka'bah.",
    location: "Makkah"
  },
  {
    id: "see_12",
    yearCE: 617,
    yearHijri: -6,
    title: "The Three-Year Boycott of Banu Hashim",
    phase: "Meccan Period",
    category: "Treaty",
    description: "Desperate to halt the spread of Islam, the Quraish pagan houses enforced a strict social and economic boycott against the Banu Hashim and Banu Muttalib clans, forcing them into a barren rock valley called Shib Abi Talib. The companion suffered extreme hunger.",
    location: "Makkah"
  },
  {
    id: "see_13",
    yearCE: 619,
    yearHijri: -3,
    title: "Year of Sorrow ('Aam al-Huzn)",
    phase: "Meccan Period",
    category: "Milestone",
    description: "Soon after the end of the boycott, Abu Talib (his protective uncle) and Khadijah (his loving, devoted wife) passed away within months. Heavily saddened and unprotected by tribal lines, the Prophet ﷺ faced worst public insults on the streets.",
    location: "Makkah"
  },
  {
    id: "see_14",
    yearCE: 620,
    yearHijri: -2,
    title: "The Rejection and Agony at At-Ta'if",
    phase: "Meccan Period",
    category: "Milestone",
    description: "Seeking refuge and supportive ears for Islam, the Prophet ﷺ walked to the mountain city of Ta'if. The local chieftains rejected him with severe cruelty, inciting street children to stone him until his boots filled with blood. He prayed for their future guidance.",
    referenceQuote: "O Allah, to You I complain of my weakness and lack of resources...",
    referenceSource: "The Supplication of Ta'if",
    location: "At-Ta'if"
  },
  {
    id: "see_15",
    yearCE: 620,
    yearHijri: -2,
    title: "Isra' wal-Mi'raj (Night Journey)",
    phase: "Meccan Period",
    category: "Milestone",
    description: "In the depth of personal spiritual grief, Allah Honored His Rasul by transporting him from Makkah to Jerusalem (Al-Aqsa), and then through the seven heavens in one night. This was where the five daily obligatory prayers (Salah) were commanded.",
    referenceQuote: "Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa...",
    referenceSource: "Surah Al-Isra', 17:1",
    location: "Makkah & Jerusalem"
  },
  {
    id: "see_16",
    yearCE: 621,
    yearHijri: -1,
    title: "First Pledge of Aqabah",
    phase: "Meccan Period",
    category: "Treaty",
    description: "During the annual Hajj pilgrimage season, twelve men from Yathrib (Madinah) clandestinely met the Prophet ﷺ at Aqabah. They converted and pledged to avoid polytheism, theft, and lies. The Prophet sent Mus'ab ibn Umayr with them to teach Madinah.",
    location: "Makkah"
  },
  {
    id: "see_17",
    yearCE: 622,
    yearHijri: 1,
    title: "Second Pledge of Aqabah",
    phase: "Meccan Period",
    category: "Treaty",
    description: "A year later, seventy-three men and two women from Yathrib traveled back to take a historic pledge, swearing to shelter and defend the Prophet ﷺ and the Meccan believers if they migrated to their northern home.",
    location: "Makkah"
  },
  {
    id: "see_18",
    yearCE: 622,
    yearHijri: 1,
    title: "The Historic Migration (Hijrah) to Yathrib",
    phase: "Hijrah",
    category: "Milestone",
    description: "Knowing that pagan assassins surrounded his home, the Prophet ﷺ escaped Makkah under divine alert. Accompanied by his loyal friend Abu Bakr, they hid in Cave Thawr for three days, eventually reaching Yathrib, which was renamed Al-Madinah Al-Munawwarah.",
    referenceQuote: "...when they were in the cave and he said to his companion, 'Do not grieve; indeed Allah is with us.'",
    referenceSource: "Surah At-Tawbah, 9:40",
    location: "Cave Thawr & Yathrib"
  },
  {
    id: "see_19",
    yearCE: 622,
    yearHijri: 1,
    title: "Foundation of Quba Mosque First Sanctuary",
    phase: "Hijrah",
    category: "Milestone",
    description: "Just prior to entering Madinah proper, the Prophet ﷺ stopped in the village of Quba. During this brief rest, he established the foundations of the Quba Mosque, the first masjid built by the early Muslims.",
    referenceQuote: "A mosque founded on righteousness from the first day is more worthy for you to stand in...",
    referenceSource: "Surah At-Tawbah, 9:108",
    location: "Quba"
  },
  {
    id: "see_20",
    yearCE: 622,
    yearHijri: 1,
    title: "Constructing Al-Masjid an-Nabawi",
    phase: "Medinan Period",
    category: "Milestone",
    description: "Upon arriving in Madinah, the Prophet ﷺ let his camel choose the spot of residence. It knelt on ground belonging to two orphans. He bought the land and immediately began construction of his house and the Prophet's Mosque which served as a dynamic community center.",
    location: "Madinah"
  },
  {
    id: "see_21",
    yearCE: 622,
    yearHijri: 1,
    title: "Muwakhat (Brotherhood Pact)",
    phase: "Medinan Period",
    category: "Treaty",
    description: "To foster social harmony and alleviate economic misery for refugees, the Prophet ﷺ paired each Meccan Muhajir (Emigrant) with a Medinan Ansar (Helper) in a holy brotherhood bond. The Ansar shared half of their assets, properties, and trade secrets.",
    location: "Madinah"
  },
  {
    id: "see_22",
    yearCE: 623,
    yearHijri: 1,
    title: "The Constitution of Madinah",
    phase: "Medinan Period",
    category: "Treaty",
    description: "The Prophet drafted a historic treaty establishing the pluralistic federal state of Madinah. It defined the rights, defense duties, and religious freedom of all Muslim, Jewish, and non-Muslim communities, declaring Madinah a sacred, protected city.",
    location: "Madinah"
  },
  {
    id: "see_23",
    yearCE: 624,
    yearHijri: 2,
    title: "The Shifting of the Qiblah direction",
    phase: "Medinan Period",
    category: "Milestone",
    description: "For seventeen months in Madinah, Muslims faced northward toward Jerusalem in prayer. While praying the Dhuhr prayer, the Prophet ﷺ received divine command to turn southward toward the Ka'bah in Makkah, establishing worldwide liturgical focus.",
    referenceQuote: "We have certainly seen the turning of your face, [O Muhammad], toward the heaven, and We will surely turn you to a qiblah with which you will be pleased.",
    referenceSource: "Surah Al-Baqarah, 2:144",
    location: "Masjid al-Qiblatayn, Madinah"
  },
  {
    id: "see_24",
    yearCE: 624,
    yearHijri: 2,
    title: "The Battle of Badr - Divine Deliverance",
    phase: "Medinan Period",
    category: "Battle",
    description: "A small, poorly equipped force of 313 Muslims stood bravely against 1,000 elite Quraish pagan warriors. Through absolute faith, strategic leadership, and divine assistance, the Muslims won a great victory, proving they could defend their faith.",
    referenceQuote: "And already had Allah given you victory at [the battle of] Badr while you were few...",
    referenceSource: "Surah Ali 'Imran, 3:123",
    location: "Wells of Badr"
  },
  {
    id: "see_25",
    yearCE: 624,
    yearHijri: 2,
    title: "Mandate of Ramadan Fasting",
    phase: "Medinan Period",
    category: "Milestone",
    description: "The divine prescription for fasts during the holy month of Ramadan was revealed in Surah Al-Baqarah during the second year of Hijrah. Fasting was declared one of the main pillars of the Islamic system.",
    referenceQuote: "O you who have believed, decreed upon you is fasting as it was decreed upon those before you...",
    referenceSource: "Surah Al-Baqarah, 2:183",
    location: "Madinah"
  },
  {
    id: "see_26",
    yearCE: 625,
    yearHijri: 3,
    title: "The Battle of Uhud & Lesson of Obedience",
    phase: "Medinan Period",
    category: "Battle",
    description: "Eager for revenge, the Quraish marched with 3,000 troops. Muslims met them at Mount Uhud. The early phase favored the Muslims; however, when the archers abandoned their mountain post against the Prophet's strict order, the cavalry ambushed them. The uncle Hamzah was martyred.",
    referenceQuote: "And Allah had certainly fulfilled His promise to you when you were killing them by His permission...",
    referenceSource: "Surah Ali 'Imran, 3:152",
    location: "Mount Uhud"
  },
  {
    id: "see_27",
    yearCE: 626,
    yearHijri: 4,
    title: "Ban on Intoxicants (Khamr) Final Stage",
    phase: "Medinan Period",
    category: "Milestone",
    description: "To construct a pure society, the absolute ban on alcohol and gambling was revealed, bringing immediate compliance from the citizens of Madinah, who emptied their cellars onto the streets.",
    referenceQuote: "O you who have believed, indeed, intoxicants, gambling, [sacrificing on] stone alters... are but defilement from the work of Satan...",
    referenceSource: "Surah Al-Ma'idah, 5:90",
    location: "Madinah"
  },
  {
    id: "see_28",
    yearCE: 627,
    yearHijri: 5,
    title: "Battle of the Trench (Al-Ahzab)",
    phase: "Medinan Period",
    category: "Battle",
    description: "A huge confederacy of 10,000 pagans and allied tribes laid siege to Madinah. Salman al-Farsi suggested digging a wide outer trench around the vulnerable borders. This brilliant defensive strategy successfully frustrated and broke the coalition.",
    referenceQuote: "When they came at you from above you and from below you, and when eyes shifted...",
    referenceSource: "Surah Al-Ahzab, 33:10",
    location: "Madinah"
  },
  {
    id: "see_29",
    yearCE: 628,
    yearHijri: 6,
    title: "The Treaty of Hudaybiyyah",
    phase: "Medinan Period",
    category: "Treaty",
    description: "The Prophet and 1,400 unarmed companions traveled toward Makkah for Umrah. Blocked by Quraish elite scouts, negotiations ensued, resulting in a peace treaty. Although some clauses seemed initially unfavorable, they enabled peaceful propagation, which led to high conversions.",
    referenceQuote: "Indeed, We have given you, [O Muhammad], a clear conquest.",
    referenceSource: "Surah Al-Fath, 48:1",
    location: "Hudaybiyyah"
  },
  {
    id: "see_30",
    yearCE: 628,
    yearHijri: 7,
    title: "Dawah Letters to World Emperors",
    phase: "Medinan Period",
    category: "Milestone",
    description: "Utilizing the Hudaybiyyah peace period, the Prophet ﷺ dispatched emissaries with official letters to global emperors—including Heraclius of the Byzantine Empire, Khosrow of Persia, and the Negus of Abyssinia, calling them to Islam.",
    location: "Madinah & Beyond"
  },
  {
    id: "see_31",
    yearCE: 628,
    yearHijri: 7,
    title: "Khaybar Campaign & Jewish Resolution",
    phase: "Medinan Period",
    category: "Milestone",
    description: "To neutralise continuous hostile subversion and planning by exiled tribes, the Muslims neutralized the fortresses of Khaybar, ensuring safety on Madinah's northern borders.",
    location: "Khaybar Oases"
  },
  {
    id: "see_32",
    yearCE: 629,
    yearHijri: 7,
    title: "The Fulfilled Pilgrimage ('Umrat al-Qada')",
    phase: "Medinan Period",
    category: "Milestone",
    description: "In accordance with the Treaty of Hudaybiyyah, the Prophet and his companions traveled peacefully to Makkah to perform their long-awaited three-day pilgrimage, restoring public Islamic rituals to the safe city.",
    location: "Al-Masjid Al-Haram, Makkah"
  },
  {
    id: "see_33",
    yearCE: 629,
    yearHijri: 8,
    title: "The Battle of Mu'tah",
    phase: "Medinan Period",
    category: "Battle",
    description: "When an Islamic envoy was executed by Ghassanid allies of Rome, the Prophet ﷺ sent 3,000 soldiers to Mu'tah. They faced an army of 100,000 Romans. Facing impossible odds, the military genius Khalid ibn al-Walid fought bravely, engineering a tactical withdrawal with limited losses.",
    location: "Mu'tah (Jordan)"
  },
  {
    id: "see_34",
    yearCE: 630,
    yearHijri: 8,
    title: "The Peaceful Conquest of Makkah",
    phase: "Medinan Period",
    category: "Milestone",
    description: "After the Quraish violated the HUDAYBIYYAH treaty, the Prophet marched with an army of 10,000. Realising resistance was useless, Makkah surrendered peacefully. Entering with full humility, the Prophet ﷺ forgave all old adversaries and smashed all pagan idols inside the Ka'bah.",
    referenceQuote: "And say, 'Truth has come, and falsehood has departed. Indeed falsehood is ever bound to depart.'",
    referenceSource: "Surah Al-Isra', 17:81",
    location: "Makkah"
  },
  {
    id: "see_35",
    yearCE: 630,
    yearHijri: 8,
    title: "The Battle of Hunayn & Siege of Ta'if",
    phase: "Medinan Period",
    category: "Battle",
    description: "Unprecedented forces of pagan Bedouins attempted a massive strike shortly after Makkah's opening. At Hunayn, they ambushed the vanguard. True bravery from the Prophet ﷺ turned the tide. He subsequently forgave the captive and returned their wealth.",
    referenceQuote: "Allah has already given you victory in many regions and [even] on the day of Hunayn...",
    referenceSource: "Surah At-Tawbah, 9:25",
    location: "Hunayn Valley"
  },
  {
    id: "see_36",
    yearCE: 630,
    yearHijri: 9,
    title: "Tabuk Expedition (The Hardship Campaign)",
    phase: "Medinan Period",
    category: "Battle",
    description: "A force of 30,000 Muslims marched in scorching summer heat to the Roman borders at Tabuk after reports of a pre-emptive imperial strike. Finding no active army, they established treaties with native border chiefs, showing massive defense readiness.",
    location: "Tabuk"
  },
  {
    id: "see_37",
    yearCE: 631,
    yearHijri: 9,
    title: "Year of Delegations (Aam al-Wufood)",
    phase: "Medinan Period",
    category: "Milestone",
    description: "Seeing the victory of monotheism over Makkah, tribal chiefs and delegations from all corners of the Arabian peninsula flocked to Madinah, giving pledges and converting to Islam. The entire peninsula was united under Islamic statehood.",
    referenceQuote: "When the victory of Allah has come and the conquest, And you see the people entering into the religion of Allah in multitudes...",
    referenceSource: "Surah An-Nasr, 110:1-2",
    location: "Madinah"
  },
  {
    id: "see_38",
    yearCE: 632,
    yearHijri: 10,
    title: "The Farewell Pilgrimage (Hajjat al-Wada')",
    phase: "Final Years",
    category: "Milestone",
    description: "The Prophet performed his final pilgrimage with over 100,000 companions. While standing on Mount Arafat, he delivered his historic Farewell Sermon, declaring civil equality of races, outlawing interest, establishing women's rights, and completing the message.",
    referenceQuote: "This day I have perfected for you your religion and completed My favor upon you...",
    referenceSource: "Surah Al-Ma'idah, 5:3",
    location: "Mount Arafat, Makkah"
  },
  {
    id: "see_39",
    yearCE: 632,
    yearHijri: 11,
    title: "The Final Sickness of the Prophet ﷺ",
    phase: "Final Years",
    category: "Milestone",
    description: "Shortly after returning from Hajj, the Prophet fell ill with a fever. He asked Abu Bakr to lead the congregational prayers, indicating his future succession. In his final days, he repeatedly advised companions to guard their prayers and treat others with absolute kindness.",
    location: "Madinah"
  },
  {
    id: "see_40",
    yearCE: 632,
    yearHijri: 11,
    title: "The Passing of the Messenger of Allah ﷺ",
    phase: "Final Years",
    category: "Milestone",
    description: "On Monday, the 12th of Rabi' al-Awwal, the Prophet ﷺ passed away while rested in the arms of his wife Aisha. His final words were: 'O Allah, the Supreme Companion.' This ended the apostolic era of active divine revelation on earth.",
    referenceQuote: "Muhammad is not but a messenger. [Other] messengers have passed on before him...",
    referenceSource: "Surah Ali 'Imran, 3:144",
    location: "Aisha's Chambers, Madinah"
  }
];
