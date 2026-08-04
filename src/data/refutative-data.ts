export interface RefutationItem {
  id: string;
  category: 'Allah & Tawheed' | 'The Qur\'an' | 'The Prophet ﷺ' | 'Women in Islam' | 'Jihad & Violence' | 'Islam & Science' | 'Other Religions' | 'Modern Issues';
  claim: string;
  summary: string;
  introduction: string;
  evidenceQuran: { textArabic: string; translation: string; source: string }[];
  evidenceHadith: { translation: string; source: string }[];
  scholarlyAnalysis: string;
  conclusion: string;
  furtherReading: string[];
}

export const REFUTATIONS_DATA: RefutationItem[] = [
  {
    id: "ref_1",
    category: "Allah & Tawheed",
    claim: "Muslims worship a crescent moon god, and Allah is a lunar deity separate from the God of Abraham.",
    summary: "Refuting the claim that 'Allah' is a pagan moon god by showing linguistic, historical, and theological monotheism in the Qur'an.",
    introduction: "This claim is a modern polemical invention with no basis in history or linguistics. The word 'Allah' is simply the Arabic proper name for the One, True God, used by Arabic-speaking Muslims, Christians, and Jews alike. Historically, Christian Arabic Bibles printed centuries before Islam used the word 'Allah' for God. The Qur'an explicitly forbids the worship of the moon, sun, or any celestial body, commanding the worship of the Creator alone.",
    evidenceQuran: [
      {
        textArabic: "وَمِنْ آيَاتِهِ اللَّيْلُ وَالنَّهَارُ وَالشَّمْسُ وَالْقَمَرُ ۚ لَا تَسْجُدُوا لِلشَّمْسِ وَلَا لِلْقَمَرِ وَاسْجُدُوا لِلَّهِ الَّذِي خَلَقَهُنَّ",
        translation: "And of His signs are the night and the day and the sun and the moon. Do not prostrate to the sun or to the moon, but prostrate to Allah, who created them...",
        source: "Surah Fussilat, 41:37"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ said: 'Verily, the sun and the moon are two signs among the signs of Allah. They do not eclipse for the death or life of anyone. When you see an eclipse, supplicate to Allah...'",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "Linguistically, 'Allah' is a contraction of the Arabic words 'al-ilah', meaning 'The unique object of absolute adoration'. Western academic scholars of religion, including non-Muslim Arabists, unanimously reject the 'moon god' claim. The crescent symbol was never used by the Prophet ﷺ or early Caliphs; it was adopted centuries later as a political emblem by the Byzantine-influenced Ottoman empire and has no theological weight in Islamic creed.",
    conclusion: "Allah is the supreme, unique God of Abraham, Moses, Jesus, and Muhammad. Associating Him with lunar or celestial pagan worship violates the absolute core foundation of monotheism (Tawheed) in Islam.",
    furtherReading: ["The History of the Qur'anic Text by Prof. M.M. Al-Azami", "Belief in Allah by Dr. Umar Al-Ashqar"]
  },
  {
    id: "ref_2",
    category: "Women in Islam",
    claim: "Islam treats women as second-class citizens or properties of men, denying them basic civil and human rights.",
    summary: "Refuting the stereotype of female oppression in Islam by highlighting spiritual equality, financial rights, and historical empowerment.",
    introduction: "Before the arrival of Islam in the 7th century, women in Arabia had no legal status, were buried alive as infants, and were inherited as property. Islam revolutionized female status, granting women independent legal identity, the right to own and inherit property, the right to choose their spouse, divorce, and obtain education—rights that Western women did not obtain until the 19th and 20th centuries.",
    evidenceQuran: [
      {
        textArabic: "مَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً",
        translation: "Whoever does righteousness, whether male or female, while he is a believer - We will surely cause him to live a good life...",
        source: "Surah An-Nahl, 16:97"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Messenger of Allah ﷺ said: 'Women are indeed the twin halves of men.'",
        source: "Sunan Abu Dawud (Sahih)"
      },
      {
        translation: "The Prophet ﷺ said: 'The most complete of believers in faith is the one with the best character, and the best of you are those who are best to their wives.'",
        source: "Sunan at-Tirmidhi (Sahih)"
      }
    ],
    scholarlyAnalysis: "While Islam designates complementary roles inside the family unit (assigning the husband the non-privileged duty of financial protection and maintenance), men and women are spiritually identical in the eyes of Allah. A Muslim woman retains her maiden name after marriage, owns her financial funds, and is under no obligation to spend her money on the household. Mispractices seen in certain developing countries are tribal customs that directly contradict Islamic law.",
    conclusion: "Islam established complete spiritual, legal, and financial autonomy for women over 1,400 years ago, elevating motherhood and sisterhood to supreme moral ranks.",
    furtherReading: ["Women in Islam by IslamKotob", "The Rights of Women in Islam by Murtadha Mutahhari"]
  },
  {
    id: "ref_3",
    category: "Jihad & Violence",
    claim: "Islam was spread primarily by the sword, and Jihad means holy war to kill all non-Muslims.",
    summary: "Deconstructing the historical myth of forced conversions and clarifying the defensive, highly regulated nature of Jihad.",
    introduction: "The idea that billions of Muslims globally embraced Islam under the threat of a sword is both physically impossible and historically refuted by non-Muslim historians like De Lacy O'Leary and Arnold Toynbee. The Qur'an explicitly outlaws forced conversions. Jihad means 'striving' and is primarily spiritual. Physical warfare is defensive or a response to extreme, systematic tyranny, and is heavily governed by strict humanitarian parameters.",
    evidenceQuran: [
      {
        textArabic: "لَا إِكْرَاهَ فِي الدِّينِ ۖ قَد تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ",
        translation: "There is no compulsion in religion. The right path has become distinct from the wrong path...",
        source: "Surah Al-Baqarah, 2:256"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ strictly commanded his armies: 'Do not kill women, children, or old men. Do not cut down fruit-bearing trees, and do not destroy populated sanctuaries of worship.'",
        source: "Muwatta Imam Malik"
      }
    ],
    scholarlyAnalysis: "Historically, major populations of the Islamic world (such as Indonesia, Malaysia, and East Africa) never saw a single Muslim soldier; Islam spread there entirely through peaceful merchant transactions, spiritual examples, and intellectual debates. Under Islamic rule, minority communities like the Coptic Christians of Egypt or the Jews of Spain lived in relative safety, preserving their synagogues and churches through centuries of European medieval inquisitions.",
    conclusion: "Forced conversion is an explicit sin in Islamic theology. Jihad is an honorable struggle to defend human dignity, rights, and the freedom of conscience from absolute oppression.",
    furtherReading: ["The Preaching of Islam by Sir Thomas Arnold", "Jihad: Expansion and Defense by classical jurists"]
  },
  {
    id: "ref_4",
    category: "The Qur'an",
    claim: "The Qur'an is copied or plagiarized from earlier Jewish and Christian scriptures.",
    summary: "Refuting the plagiarism claim through comparative textual analysis, linguistic perfection, and theological refinement.",
    introduction: "Critics argue that because the Qur'an contains narratives about prophets like Abraham, Noah, Moses, and Jesus, it must have been plagiarized. However, the Prophet ﷺ was entirely unlettered (unable to read or write) and had no access to Hebrew or Greek Biblical scrolls, which were not even translated into Arabic until centuries after his passing. The Qur'an treats these stories not as plagiarism, but as a divine correction and restoration of the original Abrahamic truth.",
    evidenceQuran: [
      {
        textArabic: "وَأَنزَلْنَا إِلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ مِنَ الْكِتَابِ وَمُهَيْمِنًا عَلَيْهِ",
        translation: "And We have revealed to you, [O Muhammad], the Book in truth, confirming what preceded it of the Scripture and as a supreme corrector over it...",
        source: "Surah Al-Ma'idah, 5:48"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Companions stated that the Prophet ﷺ did not read any book before the revelation, nor did he travel to sit under any scholar of foreign texts.",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "While the Bible and Qur'an share ethical foundations, their theological realities differ fundamentally. The Qur'an rejects the biblical claims of prophets committing major sins (such as idolatry or incest), corrects historical chronologies, and maintains absolute linguistic and rhetorical supremacy that left the highly sophisticated classical poets of Arabia utterly speechless, a miracle that remains unchallenged.",
    conclusion: "The Qur'an is the original, uncorrupted, and final revelation of the Creator, revealed to restore the pure monotheism of Abraham after earlier scriptures suffered human interpolations.",
    furtherReading: ["Koran Challenged by Gary Miller", "The Divine Reality by Hamza Tzortzis"]
  },
  {
    id: "ref_5",
    category: "The Prophet ﷺ",
    claim: "Muhammad was an ambitious impostor or warlord who sought personal power, wealth, and sensual pleasure.",
    summary: "Rebutting the fraud claim by demonstrating the Prophet's extreme poverty, lifelong suffering, and absolute sincerity.",
    introduction: "If the Prophet ﷺ was an impostor seeking worldly gains, his choices would reflect a thirst for luxury and power. In reality, the Prophet's life was a testament to extreme asceticism, physical suffering, and humility. At the height of his political authority over the entire Arabian peninsula, he slept on a rough palm-leaf mat that left deep marks on his back, and months would pass without a fire being lit in his kitchen for hot food.",
    evidenceQuran: [
      {
        textArabic: "قُل لَّا أَقُولُ لَكُمْ عِندِي خَزَائِنُ اللَّهِ وَلَا أَعْلَمُ الْغَيْبَ وَلَا أَقُولُ لَكُمْ إِنِّي مَلَكٌ",
        translation: "Say, [O Muhammad], 'I do not tell you that I have the depositories of Allah or that I know the unseen, nor do I tell you that I am an angel...'",
        source: "Surah Al-An'am, 6:50"
      }
    ],
    evidenceHadith: [
      {
        translation: "When Quraish offered the Prophet ﷺ absolute kingship, infinite wealth, and the medical help of their doctors to cease preaching, he replied: 'By Allah, if they put the sun in my right hand and the moon in my left to abandon this, I will never do so until Allah makes it triumph or I perish.'",
        source: "Seerah Ibn Hisham"
      },
      {
        translation: "Aisha narrated: 'The family of Muhammad never ate their fill of barley bread for two consecutive days until he passed away.'",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "An impostor seeking power would have claimed credit for natural marvels. When the Prophet's beloved son Ibrahim died and an eclipse occurred simultaneously, people said the sun eclipsed in grief. The Prophet ﷺ immediately stood up and corrected them, stating that eclipses are signs of Allah and have no relation to the birth or death of any human, demonstrating absolute theological integrity.",
    conclusion: "The unmatched moral character, profound humility, and voluntary material poverty of the Prophet ﷺ prove beyond a doubt his absolute sincerity as a messenger of Allah.",
    furtherReading: ["Muhammad: His Life Based on the Earliest Sources by Martin Lings", "The First and the Last Revelations"]
  },
  {
    id: "ref_6",
    category: "Islam & Science",
    claim: "Islam is a dogmatic religion that is incompatible with scientific inquiry and reasoning.",
    summary: "Refuting the claim of faith-science conflict by showing how Qur'anic verses inspire exploration and checking the Golden Age.",
    introduction: "The European conflict between dogmatic church authorities and science did not occur in the Islamic world. In Islam, seeking knowledge of the cosmos is a divine form of worship. The Qur'an contains hundreds of verses urging humans to observe, reflect, and apply reason to natural phenomena. This scriptural drive birthed the Islamic Golden Age, which laid the mathematical and scientific foundations of the modern world.",
    evidenceQuran: [
      {
        textArabic: "سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ حَتَّىٰ يَتَبَيَّنَ لَهُمْ أَنَّهُ الْحَقُّ",
        translation: "We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth...",
        source: "Surah Fussilat, 41:53"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ said: 'Seeking knowledge is a mandatory duty upon every single Muslim.'",
        source: "Sunan Ibn Majah (Sahih)"
      }
    ],
    scholarlyAnalysis: "During the medieval ages when Europe burned scientists, Islamic cities like Baghdad, Cordoba, and Cairo were home to massive universities, observatories, and free hospitals. Polymaths like Ibn al-Haytham (inventor of the scientific method), Al-Khwarizmi (father of algebra), and Ibn Sina (pioneer of modern medicine) were devout Muslims who derived their intellectual curiosity directly from their faith in a structured, orderly Creator.",
    conclusion: "The Qur'an encourages intellectual investigation of the physical universe, establishing a perfect, absolute harmony between spiritual faith and scientific truth.",
    furtherReading: ["The House of Wisdom by Jonathan Lyons", "Quran and Modern Science by Dr. Maurice Bucaille"]
  },
  {
    id: "ref_7",
    category: "Modern Issues",
    claim: "Islam justifies, permits, or encourages terrorism and civilian bombings.",
    summary: "Exposing terrorism as a modern political heresy that explicitly violates foundational Islamic laws of war and life sanctity.",
    introduction: "Terrorism is an egregious violation of Islamic theology. The Qur'an establishes that taking a single innocent life is equivalent to destroying the entire human race. Islamic international law strictly prohibits harming non-combatants, and modern acts of suicide bombing are political innovations that violate both the rules of warfare and the absolute ban on suicide.",
    evidenceQuran: [
      {
        textArabic: "مَن قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِي الْأَرْضِ فَكَأَنَّمَا قَتَلَ النَّاسَ جَمِيعًا",
        translation: "Whoever kills a soul unless for a soul or for corruption [done] in the land - it is as if he had slain mankind entirely...",
        source: "Surah Al-Ma'idah, 5:32"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ said: 'Whoever kills a non-Muslim citizen living peacefully under treaty will not smell the fragrance of Paradise.'",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "The classical consensus of Islamic jurists across all major schools of thoughts has ruled that acts of indiscriminate violence, hijacking, and civilian bombings constitute the crime of 'Hirabah' (armed highway robbery/societal terror), which is punished with the most severe legal penalties. Extremist groups cherry-pick and rip verses out of their distinct 7th-century defensive military contexts to cover up their secular political grievances.",
    conclusion: "Terrorism finds zero refuge in Islamic law, scripture, or history. It is a modern ideological heresy that stands condemned by the global consensus of Islamic scholars.",
    furtherReading: ["Fatwa on Terrorism and Suicide Bombings by Dr. Tahir-ul-Qadri", "The Sanctity of Life in Islam"]
  },
  {
    id: "ref_8",
    category: "Women in Islam",
    claim: "Islamic inheritance laws discriminate against women by awarding them only half of a male's share.",
    summary: "Highlighting the financial equity and burden-sharing structure of Islamic inheritance, showing women often inherit more.",
    introduction: "A superficial reading of Islamic inheritance observes that in certain direct relations, a sister inherits half of her brother's share. However, critics ignore the wider financial system of Islam, which places all financial burdens on men while completely exempting women.",
    evidenceQuran: [
      {
        textArabic: "لِّلرِّجَالِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالأَقْرَبُونَ وَلِلنِّسَاءِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالأَقْرَبُونَ",
        translation: "For men is a share of what the parents and close relatives leave, and for women is a share of what the parents and close relatives leave...",
        source: "Surah An-Nisa, 4:7"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ ordered companions to satisfy the exact inheritance fractions set by Allah, protecting female shares from tribal customs.",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "In Islamic law, a woman has zero financial obligations; her husband, father, or brother must completely pay for her food, housing, medical care, and clothing. A brother must use his inheritance to support his family and female relatives, while the sister's inheritance is 100% her personal savings. Out of over 30 inheritance scenarios in Islam, a woman inherits equivalent to, or more than her male counterpart in over 20 cases.",
    conclusion: "Islamic inheritance is structured on absolute financial burden-sharing, not gender discrimination, providing profound security for women.",
    furtherReading: ["Inheritance Rules in Shariah by classic Islamic publications"]
  },
  {
    id: "ref_9",
    category: "Allah & Tawheed",
    claim: "Islam is a fatalistic religion where human free will does not exist because of God's absolute destining.",
    summary: "Explaining the harmonious balance between divine omniscience (Qadar) and genuine, accountable human free choice.",
    introduction: "Critics claim that if Allah knows and writes everything, humans are mere puppets with no choice, rendering judgment unfair. This stems from a misunderstanding of how divine knowledge works. Allah is outside the dimension of time, and His writing of our choices is an recording of what we freely choose, not a dictation that forces our decisions.",
    evidenceQuran: [
      {
        textArabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
        translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves...",
        source: "Surah Al-Ra'd, 13:11"
      }
    ],
    evidenceHadith: [
      {
        translation: "A companion asked: 'Should we not rely on our book?' The Prophet ﷺ replica was: 'No, strive and work, for every person will find facilitated that for which he was created.'",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "Muslim scholars describe this with the concept of raw agency. Allah possesses ultimate, absolute Will (Mashee'ah), but He has willed that humans possess a delegated, real free choice (Ikhtiyar) in their moral decisions. Our choice is real, and our accountability is absolute because we act according to our own intentions and wishes.",
    conclusion: "Islam rejects both fatalism and chaotic autonomy, striking a perfect balance: Allah holds ultimate sovereign control, while humans possess real choice and full accountability.",
    furtherReading: ["The Creed of Al-Tahawi with Commentary"]
  },
  {
    id: "ref_10",
    category: "The Qur'an",
    claim: "The Qur'an contains scientific errors, such as saying the sun sets in a muddy spring.",
    summary: "Clarifying the linguistic use of phenomenological perspective in the story of Dhul-Qarnayn.",
    introduction: "This claim cites Surah Al-Kahf, where it describes the travelers reaching the setting place of the sun, finding it setting in a spring of dark mud. Critics read this literally, claiming the Qur'an teaches the sun literally drowns in mud, ignoring basic Arabic idioms and perspective.",
    evidenceQuran: [
      {
        textArabic: "حَتَّىٰ إِذَا بَلَغَ مَغْرِبَ الشَّمْسِ وَجَدَهَا تَغْرُبُ فِي عَيْنٍ حَمِئَةٍ",
        translation: "Until, when he reached the setting of the sun, he found it setting in a spring of dark mud...",
        source: "Surah Al-Kahf, 18:86"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ explained classical verses of perspective to companions, indicating they represent what the human eye perceives.",
        source: "Musnad Ahmad"
      }
    ],
    scholarlyAnalysis: "In classical Arabic, describing a sunset from a coastal viewpoint is done using phenomenological language. Just as a modern meteorologist says 'The sun rises at 6:00 AM' (which is astronomically inaccurate as the earth is rotating, not the sun rising), the Qur'an describes what Dhul-Qarnayn saw from his physical perspective on the shore. Great classical scholars like Ibn Kathir and Al-Qurtubi explicitly clarified this centuries ago, long before modern astronomy.",
    conclusion: "The verse describes a majestic human optical landscape, not an astronomical fact, using standard, beautiful Arabic linguistic metaphors.",
    furtherReading: ["Tafsir Ibn Kathir on Surah Al-Kahf", "The Miraculous Language of the Qur'an"]
  },
  {
    id: "ref_11",
    category: "Other Religions",
    claim: "Islam is intolerant of other faiths, demanding that they convert, pay exorbitant taxes, or die.",
    summary: "Analyzing historical minority preservation, the real meaning of Jizyah, and freedom of belief in Islamic lands.",
    introduction: "Historically, Islamic civilizations have been uniquely pluralistic. Non-Muslims living under Islamic rule were granted complete religious freedom, security, and internal autonomy under a civil contract. The small tax they paid, called Jizyah, was a minor tax that exempted them from military service and granted them continuous state protection.",
    evidenceQuran: [
      {
        textArabic: "لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ وَلَمْ يُخْرِجُوكُم مِّن دِيَارِكُمْ أَن تَبَرُّوهُمْ وَتُقْسِطُوا إِلَيْهِمْ",
        translation: "Allah does not forbid you from those who do not fight you because of religion and do not expel you from your homes - from being righteous toward them and acting justly toward them...",
        source: "Surah Al-Mumtahanah, 60:8"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ said: 'On the Day of Judgment, I will personally complain against anyone who wrongs a peaceful non-Muslim citizen, or burdens them beyond their capacity.'",
        source: "Sunan Abu Dawud"
      }
    ],
    scholarlyAnalysis: "While medieval Europe systematically tortured and expelled all non-Christians (such as Jews and Muslims in Spain), Islamic lands protected Jewish and Christian minorities. The Jizyah tax was far lower than the Zakat tax paid by Muslims. Poor, elderly, female, infant, or disabled non-Muslims, as well as priests, were entirely exempt from paying any Jizyah.",
    conclusion: "Islam codified religious minority rights, legal autonomy, and freedom of worship centuries before the Western world developed modern, secular civil rights.",
    furtherReading: ["The Preaching of Islam by Sir T.W. Arnold"]
  },
  {
    id: "ref_12",
    category: "Modern Issues",
    claim: "Shariah law is barbaric, outdated, and cruel, featuring physical amputations for petty offenses.",
    summary: "Explaining the profound preventive philosophy, strict burden of proof, and spiritual mercy of Shariah criminal law.",
    introduction: "Critics highlight Shariah corporal punishments to paint Islam as cruel. However, they ignore that these maximum sentences are designed as extreme public deterrents. They are almost impossible to carry out because of hyper-strict evidentiary requirements that favor mercy and doubt over execution.",
    evidenceQuran: [
      {
        textArabic: "وَلَكُمْ فِي الْقِصَاصِ حَيَاةٌ يَا أُولِي الْأَلْبَابِ لَعَلَّكُمْ تَتَّقُونَ",
        translation: "And there is for you in legal retribution [saving of] life, O you of understanding, that you may become pious...",
        source: "Surah Al-Baqarah, 2:179"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ said: 'Ward off the corporal punishments from the Muslims as much as you can. If there is any path of doubt, let him go, for a ruler to err in forgiveness is better than to err in punishment.'",
        source: "Sunan at-Tirmidhi"
      }
    ],
    scholarlyAnalysis: "To execute a penalty like hand amputation for theft, over sixteen stringent conditions must be satisfied simultaneously: the item must be stolen from a locked safe, it must not be food taken to appease hunger, there must be no economic famine in the land, and multiple upright witnesses must testify. Historically, in centuries of classical Shariah jurisdictions, these punishments were exceptionally rare because any minor doubt dismissed the corporal sentence, replacing it with rehabilitation.",
    conclusion: "Shariah criminal law is a majestic, preventive system that prioritizes societal safety, absolute mercy, and the total eradication of crimes through deep moral education.",
    furtherReading: ["Maqasid al-Shariah (The Objectives of Islamic Law) by Ibn Ashur"]
  },
  {
    id: "ref_13",
    category: "The Prophet ﷺ",
    claim: "Muhammad was a polygamist who married and abused very young girls, which is unacceptable today.",
    summary: "Providing the deep sociological, historical, and biological context of the Prophet's marriages and Aisha's active scholarship.",
    introduction: "Critics judge 7th-century Arabian society through modern lenses. All marriages of the Prophet ﷺ were conducted for diplomatic alliances, social protection of widows, or to nurture scholars. His marriage to Aisha was an honorable union characterized by profound love, and she grew to become one of the premier scholarly, legal, and medical giants of the early Islamic world.",
    evidenceQuran: [
      {
        textArabic: "لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ",
        translation: "There has certainly been for you in the Messenger of Allah an excellent pattern...",
        source: "Surah Al-Ahzab, 33:21"
      }
    ],
    evidenceHadith: [
      {
        translation: "Aisha narrated that her marriage was filled with deep mutual love, racing in the desert, and high intellectual training. She answered over a quarter of early legal rulings.",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "In 7th-century Arabia, age was measured by physical puberty and readiness rather than birth certificates. Aisha was biologically mature and consented, which was standard practice globally for centuries, including in medieval Europe and early American laws. She was never a passive victim; she was a fierce debater, commanded troops in strategic events, and personally narrated over 2,210 authentic Hadiths.",
    conclusion: "The Prophet's marriages were strategic, compassionate, divine actions that supported vulnerable widows and produced powerful female leaders for the community.",
    furtherReading: ["Aisha: The Beloved of the Prophet by classical biographers"]
  },
  {
    id: "ref_14",
    category: "Islam & Science",
    claim: "The Qur'an says the earth is flat, referring to it as a carpet or spreadsheet.",
    summary: "Linguistically parsing verses describing the practical, flat layout of the earth's surface for agriculture, showing early consensus on a spherical earth.",
    introduction: "Critics point to verses that describe the earth as 'stretched out' (basa-taha) or like a 'carpet' (mihada) to claim the Qur'an teaches flat-earth cosmology. However, these terms refer strictly to the earth's crust being laid out flat and smooth for human walking and agriculture, not its global shape.",
    evidenceQuran: [
      {
        textArabic: "يُكَوِّرُ اللَّيْلَ عَلَى النَّهَارِ وَيُكَوِّرُ النَّهَارَ عَلَى اللَّيْلِ",
        translation: "He wraps the night over the day and wraps the day over the night...",
        source: "Surah Al-Zumar, 39:5"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Companions stated there was complete consensus (Ijma) among scholars that the celestial bodies, including the earth, are spherical.",
        source: "Fatawa Ibn Taymiyyah"
      }
    ],
    scholarlyAnalysis: "The Arabic verb 'Yukawwiru' used in Surah 39:5 explicitly means 'to wind or wrap in a sphere', like wrapping a turban around a head. This process of continuous wrapping of day and night demands a ball-shaped earth. Great classical commentators like Ibn Hazm (d. 456H) and Ibn Taymiyyah wrote centuries ago that all geographical scholars agree the earth is an absolute sphere from every dimension.",
    conclusion: "The Qur'an uses phenomenological language to describe how the earth's surface behaves as a smooth field for human agriculture, while maintaining its spherical nature.",
    furtherReading: ["The Spherical Earth in Classical Islamic Thought"]
  },
  {
    id: "ref_15",
    category: "Women in Islam",
    claim: "The Qur'an permits husbands to beat their wives in Surah An-Nisa verse 34.",
    summary: "Deconstructing the linguistic translation of the word 'Idribuhunna' and showing the strict Prophetic banning of all violence.",
    introduction: "The verse Surah An-Nisa:34 contains the word 'idribuhunna', which is often translated as 'beat them'. Critics use this to claim Islam permits domestic abuse. This is a severe translation error that ignores the strict limitations placed by Arabic lexicography and the explicit actions of the Prophet ﷺ.",
    evidenceQuran: [
      {
        textArabic: "وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ",
        translation: "And live with them in absolute honorable kindness...",
        source: "Surah An-Nisa, 4:19"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ said: 'Do not strike the female servants of Allah!'",
        source: "Sunan Abu Dawud (Sahih)"
      },
      {
        translation: "Aisha narrated: 'The Messenger of Allah ﷺ never once hit a woman, a servant, or anyone in his entire life with his hand.'",
        source: "Sahih Muslim"
      },
      {
        translation: "When asked about the maximum limit of this verse, Ibn Abbas (the Prophet's cousin) replied: 'It is a gentle nudge with a miswak (toothstick/tissue) that leaves absolutely no mark or pain.'",
        source: "Tafsir al-Tabari"
      }
    ],
    scholarlyAnalysis: "The verb 'Daraba' in Arabic has over a hundred linguistic meanings, including 'to tap gently', 'to set as an example', or 'to separate/isolate'. If couples face serious marital rebellion, this symbolic gesture serves only to express deep disappointment, not to hurt. Striking a wife's face, leaving any trace (even redness), or causing any pain is strictly forbidden (Haram) in Shariah, and is grounds for immediate legal divorce and civil damages.",
    conclusion: "Islam has zero tolerance for domestic violence of any kind, commanding husbands to treat their wives with pure love, mercy, and gentlesness.",
    furtherReading: ["Domestic Violence: An Islamic Perspective by multiple Muftis"]
  },
  {
    id: "ref_16",
    category: "Other Religions",
    claim: "Islam tells Muslims to hate and fight all non-Muslims until they perish.",
    summary: "Rebutting the misapplication of Surah At-Tawbah's 'Sword Verse' by clarifying its historical war context.",
    introduction: "Critics frequently quote: 'Kill the polytheists wherever you find them' out of context to claim Islam is inherently violent. This verse was revealed during an active war against pagan clans who repeatedly breached their treaties and massacred Muslims. It does not apply to peaceful non-Muslims.",
    evidenceQuran: [
      {
        textArabic: "وَإِنْ أَحَدٌ مِّنَ الْمُشْرِكِينَ اسْتَجَارَكَ فَأَجِرْهُ حَتَّىٰ يَسْمَعَ كَلَامَ اللَّهِ ثُمَّ أَبْلِغْهُ مَأْمَنَهُ",
        translation: "And if any of the polytheists asks you for protection, then grant him protection so that he may hear the words of Allah . Then deliver him to his place of safety...",
        source: "Surah At-Tawbah, 9:6"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ made alliances with Christian kingdoms and Jewish tribes, trading with them and visiting their sick.",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "If this verse were a general command to kill all non-Muslims, the next verse (Surah At-Tawbah:6) would not command Muslims to protect and escort any seeking pagan enemy to a place of absolute safety. Classical jurists agree that the rules of war in Islam only permit fighting active combatants during a state of war.",
    conclusion: "Islam promotes peaceful coexistence, justice, and absolute kindness with all non-hostile people, reserving military action exclusively for active aggressors.",
    furtherReading: ["The Right of Non-Muslims in Islam"]
  },
  {
    id: "ref_17",
    category: "Islam & Science",
    claim: "The Qur'an claims that human embryo is formed from semen mixed with the mother’s bone fluid, representing ancient Greek myths.",
    summary: "Demonstrating how embryological stages in the Qur'an are medically precise and ahead of 7th-century knowledge.",
    introduction: "Critics claim the Qur'anic embryology in Surah Al-Mu'minun is plagiarized from Galen or Aristotelian errors. In reality, the Qur'an corrects ancient Greek errors (such as the belief that the embryo is pre-formed in the sperm) by outlining detailed, chronologically precise developmental stages.",
    evidenceQuran: [
      {
        textArabic: "ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً فَخَلَقْنَا الْعَلَقَةَ مُضْغَةً فَخَلَقْنَا الْمُضْغَةَ عِظَامًا فَكَسَوْنَا الْعِظَامَ لَحْمًا",
        translation: "Then We made the sperm-drop into a clinging clot, and We made the clot into a lump [of flesh], and We made [from] the lump, bones, and We covered the bones with flesh...",
        source: "Surah Al-Mu'minun, 23:14"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ detailed the exact chronological days of embryological development, aligning perfectly with modern timeline counts.",
        source: "Sahih Muslim"
      }
    ],
    scholarlyAnalysis: "Renowned embryologists, including Dr. Keith L. Moore (former President of the American Association of Anatomists), reviewed these verses and declared that these detailed stages (clinging clot, chewed-like lump, bone covering) are scientifically perfect and could not have been known in the 7th century without modern microscopes.",
    conclusion: "The medically accurate, microscopic phases of embryology recorded in the Qur'an are a sign of its divine origin.",
    furtherReading: ["The Developing Human by Dr. Keith Moore"]
  },
  {
    id: "ref_18",
    category: "Allah & Tawheed",
    claim: "The Qur'an speaks of Allah having a hand, face, and sitting on a throne, which is physical anthropomorphism.",
    summary: "Explaining the classical Sunni creed of affirming Allah's attributes 'Bila Kayf' (without asking how) and rejecting any comparison to creation.",
    introduction: "Critics claim the Qur'an attributes physical limbs to God. Classical Sunni scholars explicitly reject this, clarifying that these terms are either metaphorical or affirmed exactly as revealed without suggesting any physical body or likeness to humans.",
    evidenceQuran: [
      {
        textArabic: "لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ",
        translation: "There is nothing like unto Him, and He is the Hearing, the Seeing...",
        source: "Surah Ash-Shura, 42:11"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ taught that Allah is completely separate from His creation and does not reside inside physical shapes or materials.",
        source: "Sahih Muslim"
      }
    ],
    scholarlyAnalysis: "The foundational rule of Islamic theology is Al-Tanzih (keeping Allah completely transcendent of creation). While the Qur'an uses terms like 'Hand' (Yad) to denote Divine Power or 'Throne' (Arsh) to denote Divine Sovereignty, they do not resemble physical skin, bones, or positions. We affirm them while declaring He has no physical dimensions.",
    conclusion: "Islam rejects all forms of physical anthropomorphism, maintaining that God is completely transcendent of any material qualities.",
    furtherReading: ["The Creed of Imam Al-Tahawi"]
  },
  {
    id: "ref_19",
    category: "Modern Issues",
    claim: "Islam is incompatible with modern democracy and civic participation.",
    summary: "Exploring the principle of Shura (mutual consultation), rule of law, and historic civic engagement of Muslims in pluralistic societies.",
    introduction: "Islam does not mandate a single, rigid political structure. Instead, it defines universal principles: absolute justice, the rule of law, the protection of human rights, and 'Shura' (mutual consultation) between citizens and rulers. These principles align perfectly with ethical civic engagement and democratic representation.",
    evidenceQuran: [
      {
        textArabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
        translation: "And whose affair is determined by mutual consultation among themselves...",
        source: "Surah Ash-Shura, 42:38"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ consulted his companions on almost all political and military choices, accepting their superior strategies.",
        source: "Sahih al-Bukhari"
      }
    ],
    scholarlyAnalysis: "The 'Constitution of Madinah' drafted by the Prophet ﷺ was the first written constitution in human history. It established a pluralistic federal state where all tribes had equal civic representation and judicial autonomy, demonstrating the high compatibility of Islam with civic contracts.",
    conclusion: "Islam's core political and social principles promote consultative governance, rule of law, and active civic responsibility in any society.",
    furtherReading: ["The Principles of State and Government in Islam"]
  },
  {
    id: "ref_20",
    category: "Women in Islam",
    claim: "Hijab and modest dress are tools of patriarchal control forced upon unwilling women.",
    summary: "Exploring the spiritual empowerment, modesty, and security of Hijab as a personal choice of devotion.",
    introduction: "For millions of Muslim women, the Hijab is a proud symbol of liberation, letting them be judged for their intellect and character rather than their body. It is a divine obligation of modesty prescribed for both men (who must lower their gaze first) and women.",
    evidenceQuran: [
      {
        textArabic: "يَا أَيُّهَا النَّبِيُّ قُل لِّأَزْوَاجِكَ وَبَنَاتِكَ وَنِسَاءِ الْمُؤْمِنِينَ يُدْنِينَ عَلَيْهِنَّ مِن جَلَابِيبِهِنَّ ۚ ذَٰلِكَ أَدْنَىٰ أَن يُعْرَفْنَ فَلَا يُؤْذَيْنَ",
        translation: "O Prophet, tell your wives and your daughters and the women of the believers to draw their outer garments close over themselves. That is more suitable that they will be known and not be abused...",
        source: "Surah Al-Ahzab, 33:59"
      }
    ],
    evidenceHadith: [
      {
        translation: "The Prophet ﷺ commanded that modesty (Haya') is a beautiful branch of spiritual faith.",
        source: "Sahih Muslim"
      }
    ],
    scholarlyAnalysis: "While Islam commands the Hijab as a beautiful act of worship, forcing a woman to wear it or beating her to comply is a sin in Shariah. True Islamic modesty is based on internal love and devotion to Allah, freeing women from the toxic standards of modern commercialized beauty.",
    conclusion: "The Hijab is a symbol of dignity, modesty, and spiritual independence that empowers women to navigate society on their own terms.",
    furtherReading: ["Modesty and Shariah guidelines for both genders"]
  }
];
