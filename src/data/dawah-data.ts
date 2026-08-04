import { NameOfAllah, FAQItem, DawahArticle, Announcement, StudyScheduleItem, Quiz } from '../types';

export const NAMES_OF_ALLAH: NameOfAllah[] = [
  { number: 1, name: "الرحمن", transliteration: "Ar-Rahman", meaning: "The Most Gracious" },
  { number: 2, name: "الرحيم", transliteration: "Ar-Raheem", meaning: "The Most Merciful" },
  { number: 3, name: "الملك", transliteration: "Al-Malik", meaning: "The Sovereign" },
  { number: 4, name: "القدوس", transliteration: "Al-Quddus", meaning: "The Pure" },
  { number: 5, name: "السلام", transliteration: "As-Salam", meaning: "The Source of Peace" },
  { number: 6, name: "المؤمن", transliteration: "Al-Mu'min", meaning: "The Giver of Belief" },
  { number: 7, name: "المهيمن", transliteration: "Al-Muhaymin", meaning: "The Guardian" },
  { number: 8, name: "العزيز", transliteration: "Al-Aziz", meaning: "The Almighty" },
  { number: 9, name: "الجبار", transliteration: "Al-Jabbar", meaning: "The Compeller" },
  { number: 10, name: "المتكبر", transliteration: "Al-Mutakabbir", meaning: "The Supreme" },
  { number: 11, name: "الخالق", transliteration: "Al-Khaliq", meaning: "The Creator" },
  { number: 12, name: "البارئ", transliteration: "Al-Bari'", meaning: "The Producer" },
  { number: 13, name: "المصور", transliteration: "Al-Musawwir", meaning: "The Fashioner" },
  { number: 14, name: "الغفار", transliteration: "Al-Ghaffar", meaning: "The All-Forgiving" },
  { number: 15, name: "القهار", transliteration: "Al-Qahhar", meaning: "The Subduer" },
  { number: 16, name: "الوهاب", transliteration: "Al-Wahhab", meaning: "The Bestower" },
  { number: 17, name: "الرزاق", transliteration: "Al-Razzaq", meaning: "The Provider" },
  { number: 18, name: "الفتاح", transliteration: "Al-Fattah", meaning: "The Opener" },
  { number: 19, name: "العليم", transliteration: "Al-Alim", meaning: "The All-Knowing" },
  { number: 20, name: "القابض", transliteration: "Al-Qabid", meaning: "The Restrainer" },
  { number: 21, name: "الباسط", transliteration: "Al-Basit", meaning: "The Expander" },
  { number: 22, name: "الخافض", transliteration: "Al-Khafid", meaning: "The Abaser" },
  { number: 23, name: "الرافع", transliteration: "Ar-Rafi'", meaning: "The Exalter" },
  { number: 24, name: "المعز", transliteration: "Al-Mu'izz", meaning: "The Giver of Honour" },
  { number: 25, name: "المذل", transliteration: "Al-Mudhill", meaning: "The Giver of Dishonour" },
  { number: 26, name: "السميع", transliteration: "As-Sami'", meaning: "The All-Hearing" },
  { number: 27, name: "البصير", transliteration: "Al-Baseer", meaning: "The All-Seeing" },
  { number: 28, name: "الحكم", transliteration: "Al-Hakam", meaning: "The Judge" },
  { number: 29, name: "العدل", transliteration: "Al-Adl", meaning: "The Just" },
  { number: 30, name: "اللطيف", transliteration: "Al-Lateef", meaning: "The Gentle / Subtle" },
  { number: 31, name: "الخبير", transliteration: "Al-Khabeer", meaning: "The All-Aware" },
  { number: 32, name: "الحليم", transliteration: "Al-Haleem", meaning: "The Forbearing" },
  { number: 33, name: "العظيم", transliteration: "Al-Atheem", meaning: "The Magnificent" },
  { number: 34, name: "الغفور", transliteration: "Al-Ghafoor", meaning: "The Forgiving" },
  { number: 35, name: "الشكور", transliteration: "Ash-Shakoor", meaning: "The Grateful" },
  { number: 36, name: "العلي", transliteration: "Al-Ali", meaning: "The Sublime" },
  { number: 37, name: "الكبير", transliteration: "Al-Kabeer", meaning: "The Most Great" },
  { number: 38, name: "الحفيظ", transliteration: "Al-Hafeeth", meaning: "The Preserver" },
  { number: 39, name: "المقيت", transliteration: "Al-Muqeet", meaning: "The Nourisher" },
  { number: 40, name: "الحسيب", transliteration: "Al-Haseeb", meaning: "The Bringer of Judgment" },
  { number: 41, name: "الجليل", transliteration: "Al-Jaleel", meaning: "The Majestic" },
  { number: 42, name: "الكريم", transliteration: "Al-Kareem", meaning: "The Most Generous" },
  { number: 43, name: "الرقيب", transliteration: "Ar-Raqeeb", meaning: "The Watchful" },
  { number: 44, name: "المجيب", transliteration: "Al-Mujeeb", meaning: "The Responder" },
  { number: 45, name: "الواسع", transliteration: "Al-Wasi'", meaning: "The All-Embracing" },
  { number: 46, name: "الحكيم", transliteration: "Al-Hakeem", meaning: "The Wise" },
  { number: 47, name: "الودود", transliteration: "Al-Wadood", meaning: "The Loving One" },
  { number: 48, name: "المجيد", transliteration: "Al-Majeed", meaning: "The Glorious" },
  { number: 49, name: "الباعث", transliteration: "Al-Ba'ith", meaning: "The Resurrector" },
  { number: 50, name: "الشهيد", transliteration: "Ash-Shaheed", meaning: "The Witness" },
  { number: 51, name: "الحق", transliteration: "Al-Haqq", meaning: "The Truth" },
  { number: 52, name: "الوكيل", transliteration: "Al-Wakeel", meaning: "The Trustee" },
  { number: 53, name: "القوي", transliteration: "Al-Qawiyy", meaning: "The Strong" },
  { number: 54, name: "المتين", transliteration: "Al-Mateen", meaning: "The Firm" },
  { number: 55, name: "الولي", transliteration: "Al-Waliyy", meaning: "The Protecting Friend" },
  { number: 56, name: "الحميد", transliteration: "Al-Hameed", meaning: "The All-Praiseworthy" },
  { number: 57, name: "المحصي", transliteration: "Al-Muhsee", meaning: "The Appraiser" },
  { number: 58, name: "المبدئ", transliteration: "Al-Mubdi'", meaning: "The Originator" },
  { number: 59, name: "المعيد", transliteration: "Al-Mu'eed", meaning: "The Restorer" },
  { number: 60, name: "المحيي", transliteration: "Al-Muhyee", meaning: "The Giver of Life" },
  { number: 61, name: "المميت", transliteration: "Al-Mumeet", meaning: "The Bringer of Death" },
  { number: 62, name: "الحي", transliteration: "Al-Hayy", meaning: "The Ever-Living" },
  { number: 63, name: "القيوم", transliteration: "Al-Qayyoom", meaning: "The Self-Sustaining" },
  { number: 64, name: "الواجد", transliteration: "Al-Wajid", meaning: "The Finder" },
  { number: 65, name: "الماجد", transliteration: "Al-Majid", meaning: "The Illustrious" },
  { number: 66, name: "الواحد", transliteration: "Al-Wahid", meaning: "The Unique" },
  { number: 67, name: "الأحد", transliteration: "Al-Ahad", meaning: "The One" },
  { number: 68, name: "الصمد", transliteration: "As-Samad", meaning: "The Eternal" },
  { number: 69, name: "القادر", transliteration: "Al-Qadir", meaning: "The Capable" },
  { number: 70, name: "المقتدر", transliteration: "Al-Muqtadir", meaning: "The Omnipotent" },
  { number: 71, name: "المقدم", transliteration: "Al-Muqaddim", meaning: "The Expediter" },
  { number: 72, name: "المؤخر", transliteration: "Al-Mu'akhkhir", meaning: "The Delayer" },
  { number: 73, name: "الأول", transliteration: "Al-Awwal", meaning: "The First" },
  { number: 74, name: "الأخر", transliteration: "Al-Akhir", meaning: "The Last" },
  { number: 75, name: "الظاهر", transliteration: "At-Thahir", meaning: "The Manifest" },
  { number: 76, name: "الباطن", transliteration: "Al-Batin", meaning: "The Hidden" },
  { number: 77, name: "الوالي", transliteration: "Al-Wali", meaning: "The Patron" },
  { number: 78, name: "المتعالي", transliteration: "Al-Muta'ali", meaning: "The Self-Exalted" },
  { number: 79, name: "البر", transliteration: "Al-Barr", meaning: "The Source of Goodness" },
  { number: 80, name: "التواب", transliteration: "At-Tawwab", meaning: "The Acceptor of Repentance" },
  { number: 81, name: "المنتقم", transliteration: "Al-Muntaqim", meaning: "The Avenger" },
  { number: 82, name: "العفو", transliteration: "Al-Afuww", meaning: "The Pardoner" },
  { number: 83, name: "الرؤوف", transliteration: "Ar-Ra'oof", meaning: "The Most Kind" },
  { number: 84, name: "مالك الملك", transliteration: "Malik-ul-Mulk", meaning: "Master of Sovereignty" },
  { number: 85, name: "ذو الجلال والإكرام", transliteration: "Dhul-Jalali wal-Ikram", meaning: "Possessor of Majesty and Honour" },
  { number: 86, name: "المقسط", transliteration: "Al-Muqsit", meaning: "The Equitable" },
  { number: 87, name: "الجامع", transliteration: "Al-Jami'", meaning: "The Gatherer" },
  { number: 88, name: "الغني", transliteration: "Al-Ghaniyy", meaning: "The Self-Sufficient" },
  { number: 89, name: "المغني", transliteration: "Al-Mughni", meaning: "The Enricher" },
  { number: 90, name: "المانع", transliteration: "Al-Mani'", meaning: "The Withholder" },
  { number: 91, name: "الضار", transliteration: "Ad-Darr", meaning: "The Distressor" },
  { number: 92, name: "النافع", transliteration: "An-Nafi'", meaning: "The Propitious" },
  { number: 93, name: "النور", transliteration: "An-Noor", meaning: "The Light" },
  { number: 94, name: "الهادي", transliteration: "Al-Hadi", meaning: "The Guide" },
  { number: 95, name: "البديع", transliteration: "Al-Badi'", meaning: "The Incomparable" },
  { number: 96, name: "الباقي", transliteration: "Al-Baqi", meaning: "The Everlasting" },
  { number: 97, name: "الوارث", transliteration: "Al-Warith", meaning: "The Inheritor" },
  { number: 98, name: "الرشيد", transliteration: "Ar-Rasheed", meaning: "The Guide to the Right Path" },
  { number: 99, name: "الصبور", transliteration: "As-Saboor", meaning: "The Patient" }
];

export const PILLARS_OF_ISLAM = [
  {
    arabic: "الشهادة",
    english: "Shahada",
    translation: "Declaration of Faith",
    number: 1,
    explanation: "Sincere recitation of the phrase: 'La ilaha illa Allah, Muhammadur Rasulullah' (There is no god worthy of worship except Allah, and Muhammad is His Messenger). It is the gateway to Islam."
  },
  {
    arabic: "الصلاة",
    english: "Salah",
    translation: "Five Daily Prayers",
    number: 2,
    explanation: "Performing the five obligatory daily prayers at their prescribed times. These establishing physical and spiritual connections with Allah: Fajr, Dhuhr, Asr, Maghrib, and Isha."
  },
  {
    arabic: "الزكاة",
    english: "Zakah",
    translation: "Obligatory Charity",
    number: 3,
    explanation: "Paying a specified portion (traditionally 2.5%) of one's accumulated wealth over a lunar year to designated causes, primarily the poor and needy. It purifies wealth and fosters social solidarity."
  },
  {
    arabic: "الصوم",
    english: "Sawm",
    translation: "Fasting in Ramadan",
    number: 4,
    explanation: "Abstaining from eating, drinking, and intimate relations from dawn until sunset during the holy month of Ramadan, to grow in consciousness of God, discipline, and empathy for the hungry."
  },
  {
    arabic: "الحج",
    english: "Hajj",
    translation: "Pilgrimage to Makkah",
    number: 5,
    explanation: "Undertaking the holy pilgrimage to the Kaaba in Makkah, Saudi Arabia, at least once in a lifetime, for those who are physically and financially capable. It unites Muslims from all corners of the Earth."
  }
];

export const PILLARS_OF_IMAN = [
  {
    arabic: "الإيمان بالله",
    english: "Belief in Allah",
    number: 1,
    explanation: "Believing in His existence, absolute oneness (Tawheed), perfect lordship, sole worthiness of worship, and His beautiful names and attributes, with absolutely no partners associated with Him."
  },
  {
    arabic: "الإيمان بالملائكة",
    english: "Belief in the Angels",
    number: 2,
    explanation: "Believing in noble creatures of Allah made from light who never disobey Him. Prominent of whom is Gabriel (Jibreel), who delivered the revelation to all prophets."
  },
  {
    arabic: "الإيمان بالكتب",
    english: "Belief in the Books",
    number: 3,
    explanation: "Believing in all books revealed by Allah to His messengers as pure guidance, including the Torah (Tawrat) of Moses, the Psalms (Zabur) of David, the Gospel (Injeel) of Jesus, and the final Qur'an."
  },
  {
    arabic: "الإيمان بالرسل",
    english: "Belief in the Messengers",
    number: 4,
    explanation: "Believing in all prophets sent by Allah to guide humanity, from Adam, Noah, Abraham, Job, Moses, Jesus, up to the seal of all Prophets, Muhammad ﷺ."
  },
  {
    arabic: "الإيمان باليوم الآخر",
    english: "Belief in the Last Day",
    number: 5,
    explanation: "Believing in the reality of death, the grave, the day of Resurrection, the absolute justice of the Scales, and the ultimate destination of either Paradise (Jannah) or Hellfire (Jahannam)."
  },
  {
    arabic: "الإيمان بالقدر",
    english: "Belief in Divine Decree",
    number: 6,
    explanation: "Believing that everything that happens, good or seemingly bad, succeeds or fails, occurs with Allah's absolute knowledge, written in the Preserved Tablet, and by His infinite will and creation."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq_1",
    question: "Why does God allow suffering and pain in the world?",
    answer: "This life is not intended to be a final paradise, but rather a temporary testing ground. Allah tests both with hardship to foster patience, and with ease to foster gratitude. Through tests, gold is purified of its dross; similarly, human faith is purified and elevated. True compensation and perfect justice occur in the eternal Hereafter, where those who suffered pattern-wise and held onto faith are rewarded past measure.",
    evidenceText: "Who has created death and life that He may test you which of you is best in deed. And He is the All-Mighty, the All-Forgiving.",
    evidenceSource: "Al-Mulk 67:2"
  },
  {
    id: "faq_2",
    question: "Is the Qur'an truly the literal word of God?",
    answer: "Yes, Muslims believe the Qur'an is the literal, unchanged word of Allah, revealed verbatim to the Prophet Muhammad ﷺ via the Angel Gabriel over 23 years. Its preservation is unique: millions of individuals across generations have memorized it cover-to-cover, syllable-for-syllable. It stands as an eternal linguistic and scientific miracle that challenges humanity to produce even a single chapter resembling its literary grandeur.",
    evidenceText: "Indeed, it is We who sent down the Qur'an and indeed, We will be its guardian.",
    evidenceSource: "Al-Hijr 15:9"
  },
  {
    id: "faq_3",
    question: "Does Islam oppress women?",
    answer: "Far from it. Over 1,400 years ago, Islam granted women legal rights to own property, inherit capital, select their spouses, obtain divorces, work, receive an education, and vote — rights Western women did not attain until the late 1900s. Islam views men and women as spiritual equals with complementary roles. The Prophet Muhammad ﷺ emphasized that the best of believers are those who treat their wives with kindness.",
    evidenceText: "And due to the wives is similar to what is expected of them, according to what is reasonable.",
    evidenceSource: "Al-Baqarah 2:228"
  },
  {
    id: "faq_4",
    question: "What is Jihad?",
    answer: "The word 'Jihad' is a Arabic term meaning 'striving' or 'struggling' in the path of God. The 'Greater Jihad' is the inner spiritual struggle to overcome one's negative desires, obey Allah, and maintain high ethics. The 'Lesser Jihad' is physical warfare, which in Islamic law is strictly defensive or pre-emptive against severe tyranny. It strictly forbids harming civilians, women, children, monks, non-combatants, cutting down trees, or destroying property.",
    evidenceText: "Fight in the way of Allah those who fight you but do not transgress. Indeed. Allah does not like transgressors.",
    evidenceSource: "Al-Baqarah 2:190"
  },
  {
    id: "faq_5",
    question: "How is Islam different from Christianity and Judaism?",
    answer: "Islam is not a brand-new religion; it is the final completion and purification of the original monotheistic message taught by Abraham, Moses, David, and Jesus. Muslims believe in all these prophets and their original scriptures. The key difference is that Islam maintains strict monotheism (Tawheed), refusing to elevate any creature (including Jesus, whom we love and revere as a mighty prophet) to divine status, or to view God as partnerships or fatherhood.",
    evidenceText: "Say, 'We believe in Allah and what has been revealed to us and what was revealed to Abraham, Ishmael, Isaac, Jacob, and the Descendants, and in what was given to Moses and Jesus and to the prophets from their Lord. We make no distinction between any of them, and we are Muslims [submitting] to Him.'",
    evidenceSource: "Aal-Imran 3:84"
  }
];

export const DAWAH_ARTICLES: DawahArticle[] = [
  {
    id: "art_1",
    title: "Understanding Tawheed: The Backbone of Islamic Creed",
    category: "Aqeedah",
    summary: "An in-depth explanation of pure monotheism in Islam and why it acts as the foundation of all righteous deeds.",
    content: "Tawheed is the defining doctrine of Islam. It is not merely a statement that God is one; rather, it is the active singling out of Allah in all aspects of authority and worship. It serves as the ultimate anchor of the soul.",
    author: "Ustadh Abu Bilal",
    readTime: "12 min read",
    date: "2026-06-15",
    sections: [
      {
        heading: "Tawheed ar-Rububiyyah (Oneness of Lordship)",
        body: "This dimension calls for declaring Allah as the sole Creator, Sustainer, and Master of everything in existence. He alone controls life, death, provision, and astronomical movements.\n\nKey Evidences:\n1. 'Unquestionably, His is the creation and the command; blessed is Allah, Lord of the worlds.' (Surah Al-A'raf, 7:54)\n2. Classical reasoning teaches that the existence of perfectly aligned celestial bodies cannot arise from chaos; they necessitate a single, omnipotent Regulator."
      },
      {
        heading: "Tawheed al-Uluhiyyah (Oneness of Worship)",
        body: "This is the core reason for which prophets were sent. It demands that all acts of physical and spiritual worship (such as prayer, swearing of oaths, fear, love, hope, and supplications) be directed strictly to Allah alone, with absolutely no intermediaries, saints, angels, or graves invoked.\n\nPractical Applications:\n- Supplicating to Allah directly without praying to mediators.\n- Performing acts of charity or fasting solely to please Him.\n- Reaffirming the verse of Surah Al-Fatihah, 'It is You we worship and You we ask for help.'"
      },
      {
        heading: "Tawheed al-Asma was-Sifat (Oneness of Names & Attributes)",
        body: "This is the affirmation of the beautiful names and perfect attributes of Allah exactly as reported in the Qur'an and authentic Sunnah, without distorting their meanings, explaining them away, denying them, or comparing them to the creation.\n\nExample Concepts:\n- Allah is 'Al-Alim' (The All-Knowing); His knowledge encompasses all atoms and thoughts simultaneously, yet has no resemblance to human brains or restricted memory systems.\n- 'There is nothing like unto Him, and He is the Hearing, the Seeing.' (Surah Ash-Shura, 42:11)."
      }
    ]
  },
  {
    id: "art_2",
    title: "The Etiquettes of Seeking Knowledge",
    category: "Manners & Ethics",
    summary: "Practical advice from classical scholars on how to approach learning the Qur'an and Sunnah with sincerity and humility.",
    content: "Seeking knowledge is not a secular accumulation of letters and facts; rather, it is a sacred act of worship that requires purifying the heart before entering its gates.",
    author: "Dr. Sarah Aminah",
    readTime: "10 min read",
    date: "2026-06-12",
    sections: [
      {
        heading: "Ikhlas: Absolute Purity of Sincerity",
        body: "A seeker must constantly audit their intentions. The sole purpose of seeking knowledge must be to lift the veil of ignorance from yourself and your family to act correctly and earn Allah's pleasure.\n\nWarnings from Prophetic Traditions:\n- Seeking knowledge to argue with fools, show off in gatherings, or gain fame are severe transgressions that render deeds useless."
      },
      {
        heading: "Adab (Propitious Manners) and Sincerity",
        body: "Classical scholars prioritized manners (Adab) before learning academic texts. Imam Malik used to wash, apply perfume, and dress formally out of respect before lecturing on Hadith.\n\nRules of Class Engagement:\n- Listen to teachers with full focus and avoid laughing or interrupting.\n- Treat peers with high regard, avoiding disputes.\n- Keep your study books clean and formatted."
      },
      {
        heading: "The Ultimate Goal: Action and Implementation",
        body: "Knowledge is a seed; action is the fruit. Seeking rules without implementing them is a pathway of self-ruin.\n\nScholarly Saying:\n- 'Knowledge calls out for action; if action answers, it stays, otherwise it departs.'"
      }
    ]
  },
  {
    id: "art_3",
    title: "The Legacy of Mercy: Character of the Prophet ﷺ",
    category: "Seerah",
    summary: "Exploring the exceptional manners, patience, and forgiveness of the Prophet Muhammad ﷺ toward his greatest enemies.",
    content: "The mission of the Prophet Muhammad ﷺ was summarized by the Qur'an as 'a mercy to the worlds.' His sublime character remains the supreme model for dawah and communication.",
    author: "Sheikh Yusuf Mansoor",
    readTime: "11 min read",
    date: "2026-06-10",
    sections: [
      {
        heading: "Patience and Endurance Under Local Persecution",
        body: "During the early thirteen years in Makkah, the pagan elites subjected him and his followers to economic blockade, starvation, slander, and physical assaults. When they threw offal on his neck during prayer, he did not strike back; instead, he stood with absolute spiritual posture.\n\nReflections:\n- Sincere dawah requires absorbing anger, answering slander with soft arguments, and patience on difficulties."
      },
      {
        heading: "The Victory of Makkah: General Amnesty",
        body: "When the Prophet ﷺ returned to Makkah as a victorious commander at the head of 10,000 soldiers, he stood in complete humility. Facing the very enemies who had assassinated his family, boycotted his companions, and expelled him from his home, he asked, 'What do you think I am going to do to you?'\n\nThey said: 'You are a noble brother, son of a noble brother.'\nHe replied: 'I say to you as Joseph said to his brothers: Clear of any blame this day. Go, you are free.' This unmatched amnesty drove entire tribes to enter Islam willingly."
      },
       {
        heading: "Gentleness in Domestic and Commercial Transactions",
        body: "Anas ibn Malik, who served the Prophet ﷺ for ten years, reported: 'He never said \"Uff\" to me, nor did he criticize anything I did or left undone.'\n\nIn business, he commanded absolute transparency, outlawing deceit, price manipulation, and taking advantage of buyer ignorance."
      }
    ]
  },
  {
    id: "art_4",
    title: "Introduction to Hadith Sciences: How Sayings Were Preserved",
    category: "Hadith",
    summary: "Discover the rigorous, complex authentication methodology that ensures the words of the Prophet ﷺ remain perfectly preserved.",
    content: "To safeguard Prophetic statements against forgery, classical scholars developed a sophisticated, highly objective methodology that remains a peak of historiographical critique.",
    author: "Ustadh Abu Bilal",
    readTime: "15 min read",
    date: "2026-06-08",
    sections: [
      {
        heading: "The Sanad: Tracking the Chains of Custody",
        body: "The Sanad is the contiguous sequence of narrators who delivered a saying from one to another until reaching the Companion who heard it directly from the Prophet ﷺ.\n\nHistorical Quote:\n- Abdullah ibn al-Mubarak said: 'The Sanad is part of religion. Were it not for the Sanad, anyone would say whatever they wished.'"
      },
      {
        heading: "Ilm ar-Rijal (Biographical Evaluation of Narrators)",
        body: "This is a specialized science dedicated to evaluating the precision, character, and reliability of narrators in the chains. Hundreds of thick biographical registries were compiled, mapping out each narrator's:\n- Academic teachers and students\n- Truthfulness rating\n- Level of memory retention (Dabt)\n- Sincerity in practice (Adalah)"
      },
      {
        heading: "The Five Criteria for a Sahih (Authentic) Narration",
        body: "A Hadith is graded 'Sahih' (authentic) if it fully satisfies five conditions simultaneously:\n1. Contiguity of Section (Ittisal as-Sanad): No gaps, skips, or anonymous narrators in the sequence.\n2. Integrity of Character (Adalat ar-Ruwat): All narrators are upright, practicing Muslims known for truthfulness.\n3. Precision of Memory (Dabt ar-Ruwat): All narrators are certified to possess flawless memory or records.\n4. Absence of Isolation (Shudhudh): The narration does not contradict more authentic testimonies.\n5. Absence of Hidden Defects (Illah): Free from subtle, hidden inaccuracies discovered by master experts."
      }
    ]
  },
  {
    id: "art_5",
    title: "Developing Khushu: Tranquility in the Five Daily Prayers",
    category: "Fiqh",
    summary: "Unlocking the deep spiritual tranquility and focus (Khushu) required to transform your prayer from a habit into a spiritual ascent.",
    content: "Salah is an intimate conversation between the believer and the Lord. Turning it from a physical, mechanical sequence into a spiritual sanctuary is the path of success.",
    author: "Dr. Sarah Aminah",
    readTime: "9 min read",
    date: "2026-06-05",
    sections: [
      {
        heading: "Understanding the Positions' Spiritual Meanings",
        body: "Every position in Salah carries a deep internal reality:\n- Saying 'Allahu Akbar' and lifting hands: Symbolizes casting the entire material world and its small anxieties behind your back.\n- Ruku (Bowing): Signifies physical and spiritual surrender to His Majesty.\n- Sujud (Prostration): Placing the face (our highest point of pride) on the ground represents the ultimate humility. This is the closest a servant can get to Allah; hence, make abundant supplications here."
      },
      {
        heading: "Active Methods to Overcome Distractions",
        body: "To build focus before the Takbeer:\n- Perform a slow, conscious ablution (Wudu), feeling the water wash away minor sins.\n- Recite the words slowly (Tarteel), pausing at the end of each verse of Surah Al-Fatihah, giving time to reflect on Allah's response to your reading.\n- Pray as if it is your farewell prayer on Earth, not knowing if you will survive to see the next."
      }
    ]
  }
];

export const HADITHS_OF_THE_DAY = [
  {
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    transliteration: "Man salaka tareeqan yaltamisu feehi 'ilman sahhalallahu lahu bihi tareeqan ilal Jannah.",
    english: "Whoever walks a path traversing it to seek knowledge, Allah will make easy for him a path to Paradise.",
    source: "Sahih Muslim 2699"
  },
  {
    arabic: "إِنَّمَا بُعِثْتُ لأُتَمِّمَ مَكَارِمَ الأَخْلاقِ",
    transliteration: "Innama bu'ithtu li-utammima makarima-l-akhlaq.",
    english: "Verily, I was sent only to perfect noble character.",
    source: "Al-Muatta 1614"
  },
  {
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    transliteration: "La yu'minu ahadukum hatta yuhibba li-akheehi ma yuhibbu linafsih.",
    english: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Sahih Al-Bukhari 13"
  }
];

export const STUDY_SCHEDULE: StudyScheduleItem[] = [
  {
    id: "sched_1",
    topic: "Tafseer of Surah Al-Kahf - The Four Trials of Faith",
    reference: "Surah Al-Kahf (18:1-110)",
    date: "Every Saturday",
    time: "10:00 AM - 11:30 AM PST",
    location: "Online (Google Meet)",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    rsvps: { "Ahmed": "yes", "Mariam": "yes", "Sara": "yes" }
  },
  {
    id: "sched_2",
    topic: "Introduction to Aqeedah Al-Tahawiyyah",
    reference: "Al-Tahawiyyah text (Chapters 1-3)",
    date: "Every Tuesday",
    time: "07:00 PM - 08:30 PM PST",
    location: "Study Group Mosque Room A & Online",
    meetingLink: "https://meet.google.com/xyz-pqrs-uvw",
    rsvps: { "Ahmed": "yes", "Zayd": "yes", "Bilal": "not-sure" }
  }
];

export const GROUP_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann_1",
    title: "Summer Qur'an Memorization Circle Launches!",
    body: "Alhamdulillah, we are launching our Summer Memorization Circle targeting the last Juz (Juz Amma) and Surah Al-Kahf. Brothers' circle meets Sat after Fajr; Sisters' circle meets Sun after Asr. Dedicated review trackers have been updated on the progress dashboards.",
    date: "2026-06-18",
    reference: "Juz 30 & Surah 18",
    isPinned: true
  },
  {
    id: "ann_2",
    title: "Dawah Information Booth - Volunteers Needed",
    body: "We will be hosting a local community Dawah and Qur'an educational Booth next Saturday at the downtown library complex. We need brothers and sisters to distribute educational pamphlets, translate Arabic verses, and welcome local seekers.",
    date: "2026-06-14",
    isPinned: false
  }
];

export const STUDY_QUIZZES: Quiz[] = [
  {
    id: "quiz_quran",
    title: "Qur'an Knowledge Challenge",
    category: "Qur'an",
    questions: [
      {
        question: "Which Surah is referred to as 'The Heart of the Qur'an'?",
        options: ["Surah Al-Mulk", "Surah Ya-Sin", "Surah Al-Fatihah", "Surah Ar-Rahman"],
        answerIndex: 1,
        explanation: "Surah Ya-Sin is widely considered extremely virtuous and central, often referred spiritually by classical scholars as the heart of the Qur'an due to its grand themes of Resurrection and Message."
      },
      {
        question: "In which Surah is the Verse of the Throne (Ayat al-Kursi) located?",
        options: ["Surah Aal-Imran", "Surah An-Nisa", "Surah Al-Baqarah", "Surah Al-Ma'idah"],
        answerIndex: 2,
        explanation: "Ayat al-Kursi is verse 255 of Surah Al-Baqarah (the 2nd Surah) and is the greatest individual verse in the Holy Qur'an."
      },
      {
        question: "Which Surah does not begin with the 'Bismillah'?",
        options: ["Surah At-Tawbah", "Surah Al-Hadid", "Surah Al-Kahf", "Surah An-Najm"],
        answerIndex: 0,
        explanation: "Surah At-Tawbah (Surah 9) is the only Surah in the Qur'an that does not start with Bismillah, which scholars state is due to its stern warnings, or because it is a direct continuation of Surah Al-Anfal."
      }
    ]
  },
  {
    id: "quiz_seerah",
    title: "Seerah (Prophetic History)",
    category: "Seerah",
    questions: [
      {
        question: "Where did the Prophet Muhammad ﷺ receive his very first revelation?",
        options: ["The Cave of Hira", "The Cave of Thawr", "The Kaaba", "Mount Uhud"],
        answerIndex: 0,
        explanation: "The Prophet ﷺ received the first five verses of Surah Al-Alaq inside the Cave of Hira on Mount Al-Noor."
      },
      {
        question: "What was the name of the Prophet's grandfather who guarded him in childhood?",
        options: ["Abu Talib", "Abdul-Muttalib", "Abu Lahab", "Hamzah"],
        answerIndex: 1,
        explanation: "His grandfather Abdul-Muttalib raised him with immense love after his mother Aminah passed away, until his grandfather's death when Muhammad was eight years old."
      }
    ]
  },
  {
    id: "quiz_pillars",
    title: "Pillars of Islam & Iman",
    category: "Pillars",
    questions: [
      {
        question: "How many Pillars of Iman (Articles of Faith) are there in Islamic creed?",
        options: ["Five", "Six", "Seven", "Four"],
        answerIndex: 1,
        explanation: "There are Six Pillars of Iman: Belief in Allah, His Angels, His Books, His Messengers, the Last Day, and Divine Decree (Qadar)."
      },
      {
        question: "What percentage of eligible accumulated wealth is traditionally paid as Zakat?",
        options: ["1.0%", "5.0%", "2.5%", "10%"],
        answerIndex: 2,
        explanation: "Zakah is calculated as 2.5% of a Muslim's savings and financial assets that exceed the threshold (Nisab) for a full lunar year."
      }
    ]
  }
];

import { fetchTafsirForAyah } from '../services/tafsirService';

export async function getTafsirExcerpt(surahNumber: number, ayahNumber: number): Promise<string> {
  try {
    const tafsir = await fetchTafsirForAyah(surahNumber, ayahNumber);
    if (!tafsir || !tafsir.text) {
      return 'Tafsir not available for this ayah.';
    }
    // Return first 300 characters as excerpt for the drawer
    const excerpt = tafsir.text.slice(0, 300);
    return excerpt.length < tafsir.text.length ? `${excerpt}...` : excerpt;
  } catch {
    return 'Tafsir temporarily unavailable. Open the Tafsir section for full access.';
  }
}

// Module-level cache for word translations
const wordTranslationCache = new Map<string, { word: string; translation: string }[]>();

export async function getWordTranslations(surahNumber: number, ayahNumber: number): Promise<{ word: string; translation: string }[]> {
  const cacheKey = `${surahNumber}:${ayahNumber}`;
  
  // Return cached result if available
  if (wordTranslationCache.has(cacheKey)) {
    return wordTranslationCache.get(cacheKey)!;
  }

  try {
    // Use Quran.com API for word-by-word translations
    // Request both translation and text fields to get actual Arabic words
    const url = `https://api.quran.com/api/v4/verses/by_key/${surahNumber}:${ayahNumber}?words=true&word_fields=text_uthmani,translation_english&translations=0&recitation=0&audio=0&text=0`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.verse && data.verse.words) {
      // Extract word translations from Quran.com API response
      const wordTranslations = data.verse.words
        .filter((w: any) => w.translation && w.translation.text)
        .map((w: any) => ({
          word: w.text_uthmani || w.text_qpc_uthmani || w.text || '',
          translation: w.translation.text
        }));
      
      // Cache the result
      wordTranslationCache.set(cacheKey, wordTranslations);
      return wordTranslations;
    }

    throw new Error('Invalid API response structure');
  } catch (error) {
    console.error(`Failed to fetch word translations for ${surahNumber}:${ayahNumber}:`, error);
    
    // Fallback to hardcoded translations for common verses
    if (surahNumber === 1 && ayahNumber === 1) {
      return [
        { word: "بِسْمِ", translation: "In the name" },
        { word: "اللَّهِ", translation: "of Allah" },
        { word: "الرَّحْمَٰنِ", translation: "the Most Gracious" },
        { word: "الرَّحِيمِ", translation: "the Most Merciful" }
      ];
    }
    if (surahNumber === 1 && ayahNumber === 2) {
      return [
        { word: "الْحَمْدُ", translation: "All praise" },
        { word: "لِلَّهِ", translation: "is for Allah" },
        { word: "رَبِّ", translation: "the Lord" },
        { word: "الْعَالَمِينَ", translation: "of the worlds" }
      ];
    }
    if (surahNumber === 112 && ayahNumber === 1) {
      return [
        { word: "قُلْ", translation: "Say" },
        { word: "هُوَ", translation: "He is" },
        { word: "اللَّهُ", translation: "Allah" },
        { word: "أَحَدٌ", translation: "One" }
      ];
    }
    
    // Generic fallback
    return [
      { word: "Word", translation: "Translation unavailable" }
    ];
  }
}
