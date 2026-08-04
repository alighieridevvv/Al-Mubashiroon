export interface GlossaryTerm {
  id: string;
  term: string;
  arabic: string;
  transliteration: string;
  category: 'Aqeedah' | 'Fiqh' | 'Seerah' | 'Qur\'an Sciences' | 'Tasawwuf' | 'General';
  meaning: string;
  explanation: string;
  relatedTerms?: string[];
  reference?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "glo_1",
    term: "Ahad",
    arabic: "أحد",
    transliteration: "Aḥad",
    category: "Aqeedah",
    meaning: "The One; Unique",
    explanation: "The absolute, indivisible singularity of Allah. It denotes that He is uniquely One and there is none similar, equivalent, or comparable to Him.",
    relatedTerms: ["Tawheed", "Wahid"]
  },
  {
    id: "glo_2",
    term: "Aqeedah",
    arabic: "عقيدة",
    transliteration: "‘Aqīdah",
    category: "Aqeedah",
    meaning: "Islamic Creed / Belief System",
    explanation: "Derived from 'aqada' (to tie a knot). It refers to the firm theological beliefs that are knotted into a Muslim's heart, leaving no margin for doubt, specifically concerning the six articles of faith.",
    relatedTerms: ["Tawheed", "Iman"]
  },
  {
    id: "glo_3",
    term: "Asma al-Husna",
    arabic: "الأسماء الحسنى",
    transliteration: "Al-Asmā’ al-Ḥusnā",
    category: "Aqeedah",
    meaning: "The Most Beautiful Names of Allah",
    explanation: "The 99 attributes of God recorded in the Qur'an and Sunnah, representing His perfection, majesty, and mercy.",
    reference: "Surah Al-A'raf, 7:180"
  },
  {
    id: "glo_4",
    term: "Bid'ah",
    arabic: "بدعة",
    transliteration: "Bid‘ah",
    category: "Fiqh",
    meaning: "Religious Innovation",
    explanation: "Any invented ritual or theological belief introduced into Islam after the Prophet's ﷺ life that has no authentic scriptural basis, often warned against in Hadiths to prevent distortions.",
    reference: "Sahih Muslim"
  },
  {
    id: "glo_5",
    term: "Dawah",
    arabic: "دعوة",
    transliteration: "Da‘wah",
    category: "General",
    meaning: "Inviting to Islam",
    explanation: "The practice of calling and inviting individuals to understand the worship of one God, Allah, through wisdom and beautiful dialogue.",
    reference: "Surah An-Nahl, 16:125"
  },
  {
    id: "glo_6",
    term: "Dhikr",
    arabic: "ذكر",
    transliteration: "Dhikr",
    category: "Tasawwuf",
    meaning: "Remembrance of Allah",
    explanation: "A state or ritual of invoking the names of Allah, reciting phrases of glorification (like SubhanAllah or Alhamdulilah), or reading Qur'an to cleanse and reassure the spiritual heart.",
    reference: "Surah Al-Ra'd, 13:28"
  },
  {
    id: "glo_7",
    term: "Dua",
    arabic: "دعاء",
    transliteration: "Du‘ā’",
    category: "General",
    meaning: "Supplication / Personal Prayer",
    explanation: "Calling directly upon Allah for help, guidance, or forgiveness. Unlike formal Salah, Dua can be offered in any language, at any time, and in any posture.",
    relatedTerms: ["Salah", "Dhikr"]
  },
  {
    id: "glo_8",
    term: "Fatwa",
    arabic: "فتوى",
    transliteration: "Fatwā",
    category: "Fiqh",
    meaning: "Scholarly Legal Opinion",
    explanation: "An academic non-binding decree or legal ruling issued by a certified Islamic jurist (Mufti) in response to a contemporary question or dilemma.",
    relatedTerms: ["Fiqh", "Shariah"]
  },
  {
    id: "glo_9",
    term: "Fiqh",
    arabic: "فقه",
    transliteration: "Fiqh",
    category: "Fiqh",
    meaning: "Islamic Jurisprudence",
    explanation: "The study and academic extraction of practical laws from the source texts of primary revelation (Qur'an and Sunnah), yielding the categories of what is permitted or forbidden.",
    relatedTerms: ["Shariah", "Usul al-Fiqh"]
  },
  {
    id: "glo_10",
    term: "Fitrah",
    arabic: "فطرة",
    transliteration: "Fiṭrah",
    category: "Aqeedah",
    meaning: "Inherent Human Nature",
    explanation: "The natural, primordial state of pure monotheistic inclination that every child is born with, which instinctively recognizes a single Creator.",
    reference: "Sahih al-Bukhari"
  },
  {
    id: "glo_11",
    term: "Ghusl",
    arabic: "غسل",
    transliteration: "Ghusl",
    category: "Fiqh",
    meaning: "Full Ritual Ablution",
    explanation: "The mandatory full-body washing of purificatory nature required after specific events like marital relations or menstruation before a Muslim can practice prayers.",
    relatedTerms: ["Wudu", "Taharah"]
  },
  {
    id: "glo_12",
    term: "Hadith",
    arabic: "حديث",
    transliteration: "Ḥadīth",
    category: "General",
    meaning: "Prophetic Narration",
    explanation: "A record of the speech, action, approvals, or physical descriptions of the Prophet Muhammad ﷺ, which serves as the second authoritative source of Islamic law.",
    relatedTerms: ["Sunnah", "Sanad"]
  },
  {
    id: "glo_13",
    term: "Hafiz",
    arabic: "حافظ",
    transliteration: "Ḥāfiẓ",
    category: "Qur'an Sciences",
    meaning: "Guardian / Memorizer of Qur'an",
    explanation: "A Muslim who has completely committed all 114 Surahs (chapters) of the Qur'an to memory with perfect phonetic accuracy.",
    relatedTerms: ["Tajweed"]
  },
  {
    id: "glo_14",
    term: "Halal",
    arabic: "حلال",
    transliteration: "Ḥalāl",
    category: "Fiqh",
    meaning: "Permissible / Lawful",
    explanation: "Anything that is explicitly permitted under Islamic Shariah, ranging from types of food to transactions and general daily actions.",
    relatedTerms: ["Haram", "Makruh"]
  },
  {
    id: "glo_15",
    term: "Haram",
    arabic: "حرام",
    transliteration: "Ḥarām",
    category: "Fiqh",
    meaning: "Prohibited / Forbidden",
    explanation: "Any action, choice, or consumption that is strictly forbidden by the Lawgiver. Performing a Haram act constitutes a sin, while avoiding it earns reward.",
    relatedTerms: ["Halal"]
  },
  {
    id: "glo_16",
    term: "Hijrah",
    arabic: "هجرة",
    transliteration: "Hijrah",
    category: "Seerah",
    meaning: "Migration",
    explanation: "Specifically, the historic journey of the Prophet ﷺ and his Sahabah from Makkah to Madinah in 622 CE, which forms the starting epoch of the Islamic Hijri calendar.",
    relatedTerms: ["Muhajirun", "Ansar"]
  },
  {
    id: "glo_17",
    term: "Ihsan",
    arabic: "إحسان",
    transliteration: "Iḥsān",
    category: "Aqeedah",
    meaning: "Spiritual Perfection / Excellence",
    explanation: "To worship Allah as if you see Him; and if you cannot see Him, knowing with absolute certainty that He sees you.",
    reference: "Hadith of Jibreel"
  },
  {
    id: "glo_18",
    term: "Ijma",
    arabic: "إجماع",
    transliteration: "Ijmā‘",
    category: "Fiqh",
    meaning: "Consensus of Scholars",
    explanation: "The unanimous agreement of all qualified Islamic jurists on a particular legal point in a specific era, acting as a tertiary source of Islamic law.",
    relatedTerms: ["Qiyas", "Fiqh"]
  },
  {
    id: "glo_19",
    term: "Ijtihad",
    arabic: "اجتهاد",
    transliteration: "Ijtihād",
    category: "Fiqh",
    meaning: "Reasoned Scholarly Endeavor",
    explanation: "The process of a qualified legal scholar putting forth maximum mental effort to derive legal answers from primary scriptures where no explicit text exists.",
    relatedTerms: ["Fatwa", "Mufti"]
  },
  {
    id: "glo_20",
    term: "Iman",
    arabic: "إيمان",
    transliteration: "Īmān",
    category: "Aqeedah",
    meaning: "Faith / Conviction",
    explanation: "A bundle consisting of belief in the heart, verbal affirmation with the tongue, and physical manifestation through deeds. It increases with obedience and decreases with sin.",
    relatedTerms: ["Aqeedah", "Islam"]
  },
  {
    id: "glo_21",
    term: "Injeel",
    arabic: "الإنجيل",
    transliteration: "Al-Injīl",
    category: "Aqeedah",
    meaning: "The Gospel of Jesus",
    explanation: "The original holy Book revealed by Allah to the Prophet Isa (Jesus), which was subsequently altered by human scribes over centuries, requiring the restoration of the Qur'an.",
    reference: "Surah Al-Ma'idah, 5:46"
  },
  {
    id: "glo_22",
    term: "Isnad",
    arabic: "إسناد",
    transliteration: "Isnād",
    category: "General",
    meaning: "Chain of Narrators",
    explanation: "The chronological list of narrators passing a historical Hadith report from the sub-narrator down to the Prophet ﷺ, analyzed scientifically to grade authenticity.",
    relatedTerms: ["Hadith", "Matn"]
  },
  {
    id: "glo_23",
    term: "Jahannam",
    arabic: "جهنم",
    transliteration: "Jahannam",
    category: "Aqeedah",
    meaning: "Hellfire",
    explanation: "The final place of painful punishment and purification in the afterlife, created for rebels, persistent polytheists, and unrepentant sinners.",
    relatedTerms: ["Jannah", "Akhirah"]
  },
  {
    id: "glo_24",
    term: "Jannah",
    arabic: "جنة",
    transliteration: "Jannah",
    category: "Aqeedah",
    meaning: "Paradise / Heaven",
    explanation: "The eternal abode of peace, joy, and physical and spiritual bliss created for those who believe and do good deeds, where there is no illness, sorrow, or death.",
    reference: "Surah Al-Baqarah, 2:82"
  },
  {
    id: "glo_25",
    term: "Jihad",
    arabic: "جهاد",
    transliteration: "Jihād",
    category: "General",
    meaning: "Striving / Struggling in God's Path",
    explanation: "Any continuous effort to do good. It covers inner spiritual struggle to beat ego, voice truth facing tyrants, or defensive physical warfare governed strictly by rules of engagement.",
    relatedTerms: ["Nafs", "Sabr"]
  },
  {
    id: "glo_26",
    term: "Ka'bah",
    arabic: "الكعبة",
    transliteration: "Al-Ka‘bah",
    category: "General",
    meaning: "The Cubic Sanctuary",
    explanation: "The ancient stone shrine in Makkah first built by Ibrahim and Ismail. It acts as the physical focal center (Qiblah) toward which all Muslims pray, and the core site of Hajj.",
    reference: "Surah Ali 'Imran, 3:96"
  },
  {
    id: "glo_27",
    term: "Kufr",
    arabic: "كفر",
    transliteration: "Kufr",
    category: "Aqeedah",
    meaning: "Rejection of Faith / Disbelief",
    explanation: "Scribally linked to 'covering' or 'hiding'. In theology, it represents a refusal to believe in God, His messengers, or the basic tenets of Islamic scripture.",
    relatedTerms: ["Shirk", "Munafeeq"]
  },
  {
    id: "glo_28",
    term: "Mahr",
    arabic: "مهر",
    transliteration: "Mahr",
    category: "Fiqh",
    meaning: "Marital Gift / Dowry",
    explanation: "The mandatory marital gift paid solely by the groom to the bride at the time of marriage, which remains her exclusive financial property.",
    reference: "Surah An-Nisa, 4:4"
  },
  {
    id: "glo_29",
    term: "Makruh",
    arabic: "مكروه",
    transliteration: "Makrūh",
    category: "Fiqh",
    meaning: "Disliked / Detested",
    explanation: "An act that is discouraged but not strictly prohibited. Avoiding it earns rewards, whereas performing it does not bring sin.",
    relatedTerms: ["Halal", "Haram"]
  },
  {
    id: "glo_30",
    term: "Matn",
    arabic: "متن",
    transliteration: "Matn",
    category: "General",
    meaning: "Text of a Hadith",
    explanation: "The actual quote, sermon, action, or approved description of the Prophet ﷺ narrated after the chain of narrators terminates.",
    relatedTerms: ["Isnad", "Hadith"]
  },
  {
    id: "glo_31",
    term: "Mudarabah",
    arabic: "مضاربة",
    transliteration: "Muḍārabah",
    category: "Fiqh",
    meaning: "Partnership / Profit-Sharing",
    explanation: "An Islamic financial arrangement where one party provides capital while the other provides labor and expertise, sharing profits as agreed, with losses borne by the investor.",
    relatedTerms: ["Riba"]
  },
  {
    id: "glo_32",
    term: "Mufassir",
    arabic: "مفسر",
    transliteration: "Mufassir",
    category: "Qur'an Sciences",
    meaning: "Qur'anic Exegete / Tafsir Scholar",
    explanation: "A highly trained, high-standard scholar possessing expert mastery in Arabic grammar, lexicography, and Hadith sciences who writes academic Tafsir commentaries.",
    relatedTerms: ["Tafseer"]
  },
  {
    id: "glo_33",
    term: "Mufti",
    arabic: "مفتي",
    transliteration: "Muftī",
    category: "Fiqh",
    meaning: "Issuer of Fatwas",
    explanation: "An expert Islamic jurist qualified to give formal, academic legal decisions (Fatwas) regarding new questions or modern dilemmas.",
    relatedTerms: ["Fatwa", "Mujtahid"]
  },
  {
    id: "glo_34",
    term: "Mujahid",
    arabic: "مجاهد",
    transliteration: "Mujāhid",
    category: "General",
    meaning: "One who Strives",
    explanation: "Anyone actively engaging in spiritual, intellectual, or defensive struggle in the cause of Allah. In common misuse, it is tied to terrorists, but scripturally it denotes any upright striver.",
    relatedTerms: ["Jihad"]
  },
  {
    id: "glo_35",
    term: "Munafeeq",
    arabic: "منافق",
    transliteration: "Munāfiq",
    category: "Aqeedah",
    meaning: "Hypocrite",
    explanation: "An individual who externally displays Islam while inwardly harboring disbelief, disbelief, and hostility.",
    reference: "Surah Al-Munafiqun, 63"
  },
  {
    id: "glo_36",
    term: "Murabaha",
    arabic: "مرابحة",
    transliteration: "Murābaḥah",
    category: "Fiqh",
    meaning: "Cost-Plus Financing",
    explanation: "An equity-safe Islamic finance transaction where the bank purchases an asset and sells it to the client at a cost plus profit margin, avoiding interest payments.",
    relatedTerms: ["Riba"]
  },
  {
    id: "glo_37",
    term: "Murasal",
    arabic: "مرسل",
    transliteration: "Mursal",
    category: "General",
    meaning: "Disconnected Hadith",
    explanation: "A class of Hadith where a Successor (Tabi'i) quotes the Prophet ﷺ directly, skipping the connecting Sahabi who witnessed the event, requiring careful authenticity checks.",
    relatedTerms: ["Hadith", "Isnad"]
  },
  {
    id: "glo_38",
    term: "Mushrik",
    arabic: "مشرك",
    transliteration: "Mushrik",
    category: "Aqeedah",
    meaning: "Polytheist",
    explanation: "Any person who associates partners, equals, or intermediaries alongside Allah in His lordship, worship, or unique divine attributes.",
    relatedTerms: ["Shirk"]
  },
  {
    id: "glo_39",
    term: "Nafs",
    arabic: "نفس",
    transliteration: "Nafs",
    category: "Tasawwuf",
    meaning: "Self / Soul / Ego",
    explanation: "The human psyche, which has levels ranging from the evil-commanding soul (Nafs al-Ammarah) to the tranquil, purified soul (Nafs al-Mutma'innah).",
    reference: "Surah Al-Fajr, 89:27"
  },
  {
    id: "glo_40",
    term: "Qadar",
    arabic: "قدر",
    transliteration: "Qadar",
    category: "Aqeedah",
    meaning: "Divine Decree / Destiny",
    explanation: "The six articles of faith, denoting belief that Allah knows, writes, and permits all events before their physical occurrence, while granting humans free agency to choose.",
    reference: "Surah Al-Qamar, 54:49"
  },
  {
    id: "glo_41",
    term: "Qiyas",
    arabic: "العقل / القياس",
    transliteration: "Qiyās",
    category: "Fiqh",
    meaning: "Analogical Deduction",
    explanation: "The legal process of comparing a new contemporary issue to an established Qur'anic ruling based on a shared core cause ('Illah), like comparing recreational drugs to alcohol.",
    relatedTerms: ["Fiqh", "Ijma"]
  },
  {
    id: "glo_42",
    term: "Qur'an",
    arabic: "القرآن",
    transliteration: "Al-Qur’ān",
    category: "Qur'an Sciences",
    meaning: "The Recitation; Word of God",
    explanation: "The absolute, literal Word of Allah revealed in the Arabic language to Prophet Muhammad ﷺ over 23 years, preserved flawlessly since its revelation.",
    relatedTerms: ["Juz", "Surah"]
  },
  {
    id: "glo_43",
    term: "Riba",
    arabic: "ربا",
    transliteration: "Ribā",
    category: "Fiqh",
    meaning: "Usury / Interest",
    explanation: "Any unjust increase or interest charged on loans or trades. It is strictly prohibited in Islam, which promotes real risk-sharing, charity, and ethical business.",
    reference: "Surah Al-Baqarah, 2:275"
  },
  {
    id: "glo_44",
    term: "Rububiyyah",
    arabic: "ربوبية",
    transliteration: "Rubūbiyyah",
    category: "Aqeedah",
    meaning: "Oneness of Lordship",
    explanation: "The affirmation that Allah alone is the Creator, Sustainer, Owner, and Controller of everything in existence, without partners.",
    relatedTerms: ["Tawheed", "Uluhiyyah"]
  },
  {
    id: "glo_45",
    term: "Sabr",
    arabic: "صبر",
    transliteration: "Ṣabr",
    category: "Tasawwuf",
    meaning: "Patience / Forbearance",
    explanation: "Holding back the soul from panic, complaints, or sinful acts when facing severe distress, keeping firm compliance with Allah's decree.",
    reference: "Surah Al-Baqarah, 2:153"
  },
  {
    id: "glo_46",
    term: "Sadaqah",
    arabic: "صدقة",
    transliteration: "Ṣadaqah",
    category: "Fiqh",
    meaning: "Voluntary Charity",
    explanation: "Any voluntary act of financial charity, kindness, help, or smiling given solely to please Allah, without expectation of earthly return.",
    relatedTerms: ["Zakat"]
  },
  {
    id: "glo_47",
    term: "Sahaba",
    arabic: "صحابة",
    transliteration: "Ṣaḥābah",
    category: "Seerah",
    meaning: "Companions of the Prophet ﷺ",
    explanation: "Anyone who met the Prophet Muhammad ﷺ, believed in him, and died as a Muslim. They are revered as the premier generation of Islam.",
    relatedTerms: ["Ansar", "Muhajirun"]
  },
  {
    id: "glo_48",
    term: "Sahih",
    arabic: "صحيح",
    transliteration: "Ṣaḥīḥ",
    category: "General",
    meaning: "Authentic / Sound",
    explanation: "The highest grade of Hadith transmission reliability, satisfying strict conditions of narrator uprightness, memory mastery, and continuous chains.",
    relatedTerms: ["Hasan", "Da'if"]
  },
  {
    id: "glo_49",
    term: "Salah",
    arabic: "صلاة",
    transliteration: "Ṣalāh",
    category: "General",
    meaning: "Ritual Prayer",
    explanation: "The formal five-daily liturgical prayers required of every adult Muslim, performed facing the Qiblah in specific physical postures.",
    reference: "Surah Al-Ankabut, 29:45"
  },
  {
    id: "glo_50",
    term: "Seerah",
    arabic: "سيرة",
    transliteration: "Sīrah",
    category: "Seerah",
    meaning: "The Prophetic Biography",
    explanation: "The chronological recording of the Prophet Muhammad's ﷺ noble life, events, battles, and moral character prior to and during prophethood.",
    relatedTerms: ["Sunnah", "Sahaba"]
  },
  {
    id: "glo_51",
    term: "Shariah",
    arabic: "شريعة",
    transliteration: "Sharī‘ah",
    category: "Fiqh",
    meaning: "The Divine Path / Islamic Law",
    explanation: "Literally, 'the path leading to water'. It is the code of law and ethics derived from the Qur'an and Sunnah, designed to protect five goals: faith, life, intellect, wealth, and family.",
    relatedTerms: ["Fiqh", "Tazkiyah"]
  },
  {
    id: "glo_52",
    term: "Shirk",
    arabic: "شرك",
    transliteration: "Shirk",
    category: "Aqeedah",
    meaning: "Association of Partners with God",
    explanation: "The gravest sin in Islam—directing worship, prayer, fear, or ultimate devotion to any entity alongside, or instead of, Allah.",
    reference: "Surah An-Nisa, 4:48"
  },
  {
    id: "glo_53",
    term: "Sunnah",
    arabic: "سنة",
    transliteration: "Sunnah",
    category: "General",
    meaning: "The Way / Pattern of the Prophet",
    explanation: "The total model of behavior, legal judgments, lifestyle, and silent approvals of the Prophet ﷺ, which Muslims strive to emulate.",
    relatedTerms: ["Hadith", "Shariah"]
  },
  {
    id: "glo_54",
    term: "Surah",
    arabic: "سورة",
    transliteration: "Sūrah",
    category: "Qur'an Sciences",
    meaning: "Chapter of the Qur'an",
    explanation: "A distinct division or chapter of the Qur'an containing verses. There are exactly 114 Surahs within the holy text.",
    relatedTerms: ["Ayah", "Juz"]
  },
  {
    id: "glo_55",
    term: "Tafsir",
    arabic: "تفسير",
    transliteration: "Tafsīr",
    category: "Qur'an Sciences",
    meaning: "Exegesis / Commentary",
    explanation: "The academic, textual interpretation and explanation of the Qur'an to expand on historical context, legal meanings, and spiritual intents of the verses.",
    relatedTerms: ["Mufassir", "Wahy"]
  },
  {
    id: "glo_56",
    term: "Taharah",
    arabic: "طهارة",
    transliteration: "Ṭahārah",
    category: "Fiqh",
    meaning: "Ritual Purity",
    explanation: "The state of physical and ritual cleanliness required before performing acts of worship like Salah, attained through Wudu or Ghusl.",
    relatedTerms: ["Wudu", "Ghusl"]
  },
  {
    id: "glo_57",
    term: "Tajweed",
    arabic: "تجويد",
    transliteration: "Tajwīd",
    category: "Qur'an Sciences",
    meaning: "Rules of Qur'anic Recitation",
    explanation: "The science of articulating each Arabic letter of the Qur'an from its correct point of origin with all its phonetic attributes.",
    reference: "Surah Al-Muzzammil, 73:4"
  },
  {
    id: "glo_58",
    term: "Taqwa",
    arabic: "تقوى",
    transliteration: "Taqwā",
    category: "Tasawwuf",
    meaning: "Mindfulness of God / Piety",
    explanation: "Conscious awareness of Allah that motivates a believer to perform duties to earn His reward, and avoid sins to escape His anger.",
    reference: "Surah Al-Hujurat, 49:13"
  },
  {
    id: "glo_59",
    term: "Tawheed",
    arabic: "توحيد",
    transliteration: "Tawḥīd",
    category: "Aqeedah",
    meaning: "Monotheism",
    explanation: "The core, central pillar of Islam—singling out Allah in His Lordship (Rububiyyah), His sole right to be worshiped (Uluhiyyah), and His unique Names and Attributes (Asma was-Sifat).",
    relatedTerms: ["Shirk", "Aqeedah"]
  },
  {
    id: "glo_60",
    term: "Tazkiyah",
    arabic: "تزكية",
    transliteration: "Tazkiyah",
    category: "Tasawwuf",
    meaning: "Purification of the Soul",
    explanation: "The spiritual practice of cleansing the heart from negative traits (like greed, arrogance, envy) and nurturing virtues (like sincerity and love of Allah).",
    reference: "Surah Al-Shams, 91:9"
  },
  {
    id: "glo_61",
    term: "Uluhiyyah",
    arabic: "ألوهية",
    transliteration: "Ulūhiyyah",
    category: "Aqeedah",
    meaning: "Oneness of Worship",
    explanation: "The theological rule that all physical, verbal, and spiritual acts of devotion (prayer, slaughter, fear, vow) must be directed only to Allah.",
    relatedTerms: ["Tawheed", "Rububiyyah"]
  },
  {
    id: "glo_62",
    term: "Ummah",
    arabic: "أمة",
    transliteration: "Ummah",
    category: "General",
    meaning: "The Global Community",
    explanation: "The global community of believers bound together by their shared belief in one God and His messenger, transcending race, nationality, or language.",
    relatedTerms: ["Islam", "Sahabah"]
  },
  {
    id: "glo_63",
    term: "Wahy",
    arabic: "وحي",
    transliteration: "Waḥy",
    category: "Qur'an Sciences",
    meaning: "Divine Revelation",
    explanation: "The direct, miraculous speech or inspiration communicated by Allah to His chosen prophets, either through Jibreel inside dreams, or from behind a veil.",
    relatedTerms: ["Qur'an", "Injeel"]
  },
  {
    id: "glo_64",
    term: "Witr",
    arabic: "وتر",
    transliteration: "Witr",
    category: "Fiqh",
    meaning: "Odd-numbered Prayer",
    explanation: "The highly recommended odd-numbered prayer performed after Isha or in the last third of the night before Fajr, wrapping up the night's prayers.",
    reference: "Sahih al-Bukhari"
  },
  {
    id: "glo_65",
    term: "Wudu",
    arabic: "وضوء",
    transliteration: "Wuḍū’",
    category: "Fiqh",
    meaning: "Ritual Ablution",
    explanation: "The structured washing of specific parts of the body (hands, mouth, face, arms, head, feet) before a Muslim can practice Salah or touch the physical Qur'an script.",
    relatedTerms: ["Taharah", "Ghusl"]
  },
  {
    id: "glo_66",
    term: "Zakat",
    arabic: "زكاة",
    transliteration: "Zakāh",
    category: "Fiqh",
    meaning: "Obligatory Almsgiving",
    explanation: "One of the five pillars—an annual tax of 2.5% charged on a wealthy Muslim's net idle assets to distribute directly among eight needy categories.",
    reference: "Surah At-Tawbah, 9:60"
  },
  {
    id: "glo_67",
    term: "Baqat",
    arabic: "بيعة",
    transliteration: "Bay‘ah",
    category: "General",
    meaning: "Oath of Allegiance",
    explanation: "A pact or oath of loyalty sworn to an Islamic political or spiritual leader to support them in accordance with Shariah guidelines.",
    relatedTerms: ["Imamat"]
  },
  {
    id: "glo_68",
    term: "Barzakh",
    arabic: "برزخ",
    transliteration: "Barzakh",
    category: "Aqeedah",
    meaning: "The Partition / Interval",
    explanation: "The intermediate spiritual plane of existence where a human soul resides between the physical death of the body and the Day of Resurrection.",
    reference: "Surah Al-Mu'minun, 23:100"
  },
  {
    id: "glo_69",
    term: "Basirah",
    arabic: "بصيرة",
    transliteration: "Baṣīrah",
    category: "Tasawwuf",
    meaning: "Spiritual Insight",
    explanation: "Inner vision or deep intuitive wisdom granted to a believer whose heart has been purified, allowing them to perceive truth from falsehood.",
    relatedTerms: ["Tazkiyah"]
  },
  {
    id: "glo_70",
    term: "Duha",
    arabic: "ضحى",
    transliteration: "Ḍuḥā",
    category: "Fiqh",
    meaning: "Forenoon Prayer",
    explanation: "An optional, highly rewarding prayer performed between sunrise and the sun reaching its zenith (at midpoint before Dhuhr).",
    reference: "Sahih Muslim"
  },
  {
    id: "glo_71",
    term: "Hadith Qudsi",
    arabic: "الحديث القدسي",
    transliteration: "Ḥadīth Qudsī",
    category: "General",
    meaning: "Sacred Hadith",
    explanation: "A separate subcategory of Hadith where the Prophet ﷺ narrates words directly attributed to Allah, but which do not form part of the compiled text of the Qur'an.",
    relatedTerms: ["Hadith", "Wahy"]
  },
  {
    id: "glo_72",
    term: "Hajj",
    arabic: "حج",
    transliteration: "Ḥajj",
    category: "General",
    meaning: "The Holy Pilgrimage",
    explanation: "The annual pilgrimage to Makkah required once in a lifetime of every adult, healthy Muslim who is financially capable of making the journey.",
    reference: "Surah Ali 'Imran, 3:97"
  },
  {
    id: "glo_73",
    term: "Hasan",
    arabic: "حسن",
    transliteration: "Ḥasan",
    category: "General",
    meaning: "Good / Acceptable",
    explanation: "An authentic class of Hadith whose transmission chain is fully connected and free from major defects, but whose narrators display slightly lower memory retention speed than Sahih.",
    relatedTerms: ["Sahih", "Da'if"]
  },
  {
    id: "glo_74",
    term: "Istikharah",
    arabic: "استخارة",
    transliteration: "Istikhārah",
    category: "Fiqh",
    meaning: "Prayer for Divine Guidance",
    explanation: "A two-raka'at optional prayer and supplication performed when a Muslim needs to make an important decision, asking Allah to execute that which is best.",
    reference: "Sahih al-Bukhari"
  },
  {
    id: "glo_75",
    term: "Juz",
    arabic: "جزء",
    transliteration: "Juz’",
    category: "Qur'an Sciences",
    meaning: "One-Thirtieth part of Qur'an",
    explanation: "Any of the thirty equal divisions of the Quran's text, structured to facilitate complete reading and recitation over the thirty days of Ramadan.",
    relatedTerms: ["Surah", "Ayah"]
  },
  {
    id: "glo_76",
    term: "Khushu",
    arabic: "خشوع",
    transliteration: "Khushū‘",
    category: "Tasawwuf",
    meaning: "Submissiveness / Humility in Prayer",
    explanation: "The state of heart-felt humility, complete mental presence, and spiritual awe before Allah during Salah.",
    reference: "Surah Al-Mu'minun, 23:2"
  },
  {
    id: "glo_77",
    term: "Niyyah",
    arabic: "نية",
    transliteration: "Niyyah",
    category: "Fiqh",
    meaning: "Intention",
    explanation: "The internal, silent intention that must precede any act of Islamic worship (like Salah, Wudu, or Fasting) for the act to be valid.",
    reference: "Sahih al-Bukhari"
  },
  {
    id: "glo_78",
    term: "Raka'at",
    arabic: "ركعة",
    transliteration: "Rak‘ah",
    category: "Fiqh",
    meaning: "Unit of Prayer",
    explanation: "A complete cycle of liturgical prayer postures, consisting of standing, bowing (Ruku), sliding to prostrations (Sujud), and sitting.",
    relatedTerms: ["Salah", "Sujud"]
  },
  {
    id: "glo_79",
    term: "Sujud",
    arabic: "سجود",
    transliteration: "Sujūd",
    category: "Fiqh",
    meaning: "Prostration",
    explanation: "The deep act of placing seven skeletal points (forehead/nose, two palms, two knees, and toes) flat on the ground to worship Allah, representing absolute humility.",
    reference: "Sahih Muslim"
  },
  {
    id: "glo_80",
    term: "Tabi'i",
    arabic: "تابعي",
    transliteration: "Tābi‘ī",
    category: "Seerah",
    meaning: "Successor of Companions",
    explanation: "The grand second generation of Muslims, consisting of those who did not meet the Prophet ﷺ, but met and studied directly under the Sahabah.",
    relatedTerms: ["Sahabah", "Hadith"]
  },
  {
    id: "glo_81",
    term: "Tafsir Ibn Kathir",
    arabic: "تفسير ابن كثير",
    transliteration: "Tafsīr Ibn Kathīr",
    category: "Qur'an Sciences",
    meaning: "The Exegesis of Ibn Kathir",
    explanation: "The premier classical Tafsir work composed by Imad ad-Din Ibn Kathir (d. 774H), renowned for explaining the Qur'an by quoting other verses, Hadiths, and words of the Companions.",
    relatedTerms: ["Tafseer", "Mufassir"]
  },
  {
    id: "glo_82",
    term: "Umrah",
    arabic: "عمرة",
    transliteration: "‘Umrah",
    category: "Fiqh",
    meaning: "Lesser Pilgrimage",
    explanation: "The optional, highly rewarding lesser pilgrimage to Makkah involving Ihram, Tawaf, and Sa'i, which can be performed at any time of the year, unlike Hajj.",
    relatedTerms: ["Hajj", "Ka'bah"]
  }
];
