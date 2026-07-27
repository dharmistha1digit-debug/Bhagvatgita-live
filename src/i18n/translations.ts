// ─────────────────────────────────────────────────────────────
// Full site translations for all supported languages
// ─────────────────────────────────────────────────────────────

export type LangCode = 'en' | 'hi' | 'sa';

export interface Translations {
  // ── Navbar ──
  nav_home: string;
  nav_bookmarks: string;
  nav_ask_krishna: string;
  nav_search_placeholder: string;
  nav_quick_access: string;
  nav_sign_in: string;
  nav_register: string;
  nav_sign_out: string;
  nav_welcome_back: string;
  nav_join_journey: string;
  nav_portal_name: string;
  nav_about_gita: string;
  nav_quotes: string;
  nav_search: string;
  nav_music_on: string;
  nav_music_off: string;
  nav_light_mode: string;
  nav_dark_mode: string;
  nav_divine_quotes: string;
  nav_about_sacred: string;
  nav_about_desc: string;
  nav_chapters_label: string;
  nav_verses_label: string;
  nav_composed_label: string;
  nav_suggested_inquiry: string;
  nav_email: string;
  nav_password: string;
  nav_your_name: string;
  nav_fill_fields: string;
  nav_spiritual_journey: string;

  // ── Splash ──
  splash_subtitle: string;
  splash_quote: string;
  splash_button: string;
  splash_tagline: string;

  // ── Home ──
  home_hero_title: string;
  home_hero_desc: string;
  home_explore: string;
  home_ask_ai: string;
  home_shloka_day: string;
  home_view_translation: string;
  home_18_chapters: string;
  home_chapter_journey: string;
  home_verses: string;
  home_explore_chapter: string;

  // ── Ask Krishna ──
  ask_welcome: string;
  ask_placeholder: string;
  ask_suggested: string;
  ask_q1: string;
  ask_q2: string;
  ask_q3: string;
  ask_q4: string;
  ask_divine_online: string;

  // ── Bookmarks ──
  bm_title: string;
  bm_subtitle: string;
  bm_back: string;
  bm_clear_all: string;
  bm_empty_title: string;
  bm_empty_desc: string;
  bm_explore: string;
  bm_read_verse: string;
  bm_loading: string;
  bm_read_chapter: string;

  // ── Chapter ──
  ch_back: string;
  ch_summary: string;
  ch_english: string;
  ch_hindi: string;
  ch_select_verse: string;
  ch_choose_verse: string;
  ch_loading: string;
  ch_error: string;
  ch_retry: string;
  ch_meaning: string;
}

// ─────────────────────────────────────────────────────────────
export const translations: Record<LangCode, Translations> = {

  // ══════════════════════════════════════════════════════════
  en: {
    nav_home: 'Home', nav_bookmarks: 'Bookmarks', nav_ask_krishna: 'Ask Krishna AI',
    nav_search_placeholder: 'Search chapters, verses, topics...', nav_quick_access: 'Quick Access',
    nav_sign_in: 'Sign In', nav_register: 'Register', nav_sign_out: 'Sign Out',
    nav_welcome_back: 'Welcome Back', nav_join_journey: 'Join the Journey',
    nav_portal_name: 'Bhagavad Gita Portal', nav_about_gita: 'About Gita',
    nav_quotes: 'Quotes', nav_search: 'Search',
    nav_music_on: 'Playing', nav_music_off: 'Music Off',
    nav_light_mode: 'Light Mode', nav_dark_mode: 'Dark Mode',
    nav_divine_quotes: 'Divine Quotes • Bhagavad Gita',
    nav_about_sacred: 'About the Sacred Text',
    nav_about_desc: 'The Bhagavad Gita is a 700-verse Hindu scripture part of the epic Mahabharata, a dialogue between prince Arjuna and Lord Krishna.',
    nav_chapters_label: 'Chapters', nav_verses_label: 'Verses', nav_composed_label: 'Composed',
    nav_suggested_inquiry: 'Suggested Inquiries:', nav_email: 'Email', nav_password: 'Password',
    nav_your_name: 'Your Name', nav_fill_fields: 'Please fill all fields.',
    nav_spiritual_journey: '🕉️ Your spiritual journey awaits',
    splash_subtitle: 'AI Spiritual Portal',
    splash_quote: '"The soul is never born nor dies at any time..."',
    splash_button: 'प्रवेश करें | Enter Portal',
    splash_tagline: '18 Chapters · 700 Verses · Timeless Wisdom',
    home_hero_title: 'श्रीमद्भगवद्गीता',
    home_hero_desc: 'Experience the absolute wisdom of the cosmos. Read all 18 Chapters and 700 verses, study commentaries from ancient scholars, and converse with Lord Krishna\'s AI avatar.',
    home_explore: 'Explore Chapters', home_ask_ai: 'Ask Krishna AI',
    home_shloka_day: 'Shloka of the Day', home_view_translation: 'View Translation →',
    home_18_chapters: 'The 18 Chapters', home_chapter_journey: 'Journey through eternal divine dialogue',
    home_verses: 'Verses', home_explore_chapter: 'Explore',
    ask_welcome: "Radhe Radhe! I am Krishna. In the middle of life's battlefield, when doubts cloud your mind and duty feels heavy, speak to me. What troubles your soul today, my friend?",
    ask_placeholder: 'Seek spiritual guidance from Krishna...',
    ask_suggested: 'Suggested Inquiries:',
    ask_q1: 'How do I deal with stress and anxiety?', ask_q2: 'What should I do when confused about my duty?',
    ask_q3: 'How can I control my wandering mind?', ask_q4: 'How to cope with the pain of losing someone?',
    ask_divine_online: 'Divine Presence Online',
    bm_title: 'Bookmarked Verses', bm_subtitle: 'Your saved spiritual verses',
    bm_back: 'Back to Home', bm_clear_all: 'Clear All',
    bm_empty_title: 'No Bookmarks Saved Yet',
    bm_empty_desc: 'As you read the Bhagavad Gita, click the heart icon on any verse detail page to save it here for quick contemplation.',
    bm_explore: 'Explore Chapters', bm_read_verse: 'Read Verse',
    bm_loading: 'Loading Bookmarks...', bm_read_chapter: 'Read Chapter',
    ch_back: 'Back to Home', ch_summary: 'Chapter Summary', ch_english: 'English', ch_hindi: 'Hindi',
    ch_select_verse: 'Select a Verse', ch_choose_verse: 'Choose from the {n} verses of Chapter {c}',
    ch_loading: 'Loading Divine Chapter...', ch_error: 'Chapter Could Not Be Loaded',
    ch_retry: 'Retry', ch_meaning: 'Meaning:',
  },

  // ══════════════════════════════════════════════════════════
  hi: {
    nav_home: 'होम', nav_bookmarks: 'बुकमार्क', nav_ask_krishna: 'कृष्ण AI से पूछें',
    nav_search_placeholder: 'अध्याय, श्लोक, विषय खोजें...', nav_quick_access: 'त्वरित पहुँच',
    nav_sign_in: 'साइन इन', nav_register: 'पंजीकरण', nav_sign_out: 'साइन आउट',
    nav_welcome_back: 'वापस स्वागत है', nav_join_journey: 'यात्रा में शामिल हों',
    nav_portal_name: 'भगवद्गीता पोर्टल', nav_about_gita: 'गीता के बारे में',
    nav_quotes: 'उद्धरण', nav_search: 'खोजें',
    nav_music_on: 'चल रहा है', nav_music_off: 'संगीत बंद',
    nav_light_mode: 'प्रकाश मोड', nav_dark_mode: 'अंधेरा मोड',
    nav_divine_quotes: 'दिव्य उद्धरण • भगवद्गीता',
    nav_about_sacred: 'पवित्र ग्रंथ के बारे में',
    nav_about_desc: 'भगवद्गीता महाभारत का एक 700-श्लोकों वाला हिंदू ग्रंथ है, जो राजकुमार अर्जुन और भगवान कृष्ण के बीच संवाद है।',
    nav_chapters_label: 'अध्याय', nav_verses_label: 'श्लोक', nav_composed_label: 'रचना',
    nav_suggested_inquiry: 'सुझाई गई जिज्ञासाएँ:', nav_email: 'ईमेल', nav_password: 'पासवर्ड',
    nav_your_name: 'आपका नाम', nav_fill_fields: 'कृपया सभी फ़ील्ड भरें।',
    nav_spiritual_journey: '🕉️ आपकी आध्यात्मिक यात्रा प्रतीक्षारत है',
    splash_subtitle: 'AI आध्यात्मिक पोर्टल',
    splash_quote: '"आत्मा का कभी जन्म नहीं होता और न ही मृत्यु..."',
    splash_button: 'प्रवेश करें | Enter Portal',
    splash_tagline: '18 अध्याय · 700 श्लोक · कालातीत ज्ञान',
    home_hero_title: 'श्रीमद्भगवद्गीता',
    home_hero_desc: 'ब्रह्मांड के परम ज्ञान का अनुभव करें। सभी 18 अध्याय और 700 श्लोक पढ़ें, प्राचीन विद्वानों की टीकाएँ पढ़ें, और भगवान कृष्ण के AI अवतार से बातचीत करें।',
    home_explore: 'अध्याय देखें', home_ask_ai: 'कृष्ण AI से पूछें',
    home_shloka_day: 'दिन का श्लोक', home_view_translation: 'अनुवाद देखें →',
    home_18_chapters: '18 अध्याय', home_chapter_journey: 'शाश्वत दिव्य संवाद की यात्रा',
    home_verses: 'श्लोक', home_explore_chapter: 'जानें',
    ask_welcome: 'राधे राधे! मैं कृष्ण हूँ। जीवन के इस युद्धक्षेत्र में, जब संशय आपके मन को घेरे और कर्तव्य भारी लगे, तब मुझसे बात करें। आज आपकी आत्मा को क्या कष्ट है, मित्र?',
    ask_placeholder: 'कृष्ण से आध्यात्मिक मार्गदर्शन माँगें...',
    ask_suggested: 'सुझाई गई जिज्ञासाएँ:',
    ask_q1: 'तनाव और चिंता से कैसे निपटें?', ask_q2: 'जब कर्तव्य को लेकर भ्रम हो तो क्या करें?',
    ask_q3: 'अपने भटकते मन को कैसे नियंत्रित करें?', ask_q4: 'किसी को खोने के दर्द से कैसे उबरें?',
    ask_divine_online: 'दिव्य उपस्थिति ऑनलाइन',
    bm_title: 'बुकमार्क किए श्लोक', bm_subtitle: 'आपके सहेजे गए आध्यात्मिक श्लोक',
    bm_back: 'होम पर वापस', bm_clear_all: 'सब हटाएँ',
    bm_empty_title: 'अभी कोई बुकमार्क नहीं',
    bm_empty_desc: 'गीता पढ़ते समय, किसी भी श्लोक विवरण पृष्ठ पर हृदय चिह्न पर क्लिक करके यहाँ सहेजें।',
    bm_explore: 'अध्याय देखें', bm_read_verse: 'श्लोक पढ़ें',
    bm_loading: 'बुकमार्क लोड हो रहे हैं...', bm_read_chapter: 'अध्याय पढ़ें',
    ch_back: 'होम पर वापस', ch_summary: 'अध्याय सारांश', ch_english: 'अंग्रेज़ी', ch_hindi: 'हिन्दी',
    ch_select_verse: 'श्लोक चुनें', ch_choose_verse: 'अध्याय {c} के {n} श्लोकों में से चुनें',
    ch_loading: 'दिव्य अध्याय लोड हो रहा है...', ch_error: 'अध्याय लोड नहीं हो सका',
    ch_retry: 'पुनः प्रयास', ch_meaning: 'अर्थ:',
  },

  // ══════════════════════════════════════════════════════════
  sa: {
    nav_home: 'गृहम्', nav_bookmarks: 'पुस्तिकाः', nav_ask_krishna: 'कृष्णम् पृच्छ',
    nav_search_placeholder: 'अध्यायं, श्लोकं, विषयं अन्विष्य...', nav_quick_access: 'शीघ्रप्रवेशः',
    nav_sign_in: 'प्रवेशः', nav_register: 'नामांकनम्', nav_sign_out: 'निर्गमनम्',
    nav_welcome_back: 'पुनरागमनस्वागतम्', nav_join_journey: 'यात्रायां योगदानम्',
    nav_portal_name: 'भगवद्गीता पोर्टलः', nav_about_gita: 'गीतायाः विषये',
    nav_quotes: 'सूक्तयः', nav_search: 'अन्वेषणम्',
    nav_music_on: 'वादनम्', nav_music_off: 'संगीतं नास्ति',
    nav_light_mode: 'प्रकाशः', nav_dark_mode: 'तमः',
    nav_divine_quotes: 'दिव्यसूक्तयः • भगवद्गीता',
    nav_about_sacred: 'पवित्रग्रन्थस्य विषये',
    nav_about_desc: 'भगवद्गीता महाभारतस्य ७०० श्लोकयुक्तं हिन्दुशास्त्रं, अर्जुनस्य कृष्णस्य च संवादः।',
    nav_chapters_label: 'अध्यायाः', nav_verses_label: 'श्लोकाः', nav_composed_label: 'रचनाकालः',
    nav_suggested_inquiry: 'सूचितप्रश्नाः:', nav_email: 'विद्युत्संवाद', nav_password: 'गुप्तशब्दः',
    nav_your_name: 'भवतः नाम', nav_fill_fields: 'कृपया सर्वक्षेत्राणि पूरयतु।',
    nav_spiritual_journey: '🕉️ भवतः आध्यात्मिकयात्रा प्रतीक्षते',
    splash_subtitle: 'AI आध्यात्मिक पोर्टलः',
    splash_quote: '"आत्मा न जायते म्रियते वा कदाचित्..."',
    splash_button: 'प्रवेशं कुरु | Enter Portal',
    splash_tagline: '१८ अध्यायाः · ७०० श्लोकाः · शाश्वतज्ञानम्',
    home_hero_title: 'श्रीमद्भगवद्गीता',
    home_hero_desc: 'ब्रह्माण्डस्य परमज्ञानम् अनुभवतु। सर्वान् १८ अध्यायान् ७०० श्लोकांश्च पठतु।',
    home_explore: 'अध्यायान् पश्यतु', home_ask_ai: 'कृष्णम् पृच्छतु',
    home_shloka_day: 'दिनस्य श्लोकः', home_view_translation: 'अनुवादं पश्यतु →',
    home_18_chapters: '१८ अध्यायाः', home_chapter_journey: 'शाश्वतदिव्यसंवादस्य यात्रा',
    home_verses: 'श्लोकाः', home_explore_chapter: 'अन्वेषणम्',
    ask_welcome: 'राधे राधे! अहं कृष्णः। जीवनस्य युद्धक्षेत्रे, यदा संशयः मनः आच्छादयति, तदा मां वदतु। अद्य भवतः आत्मा किं पीड्यते?',
    ask_placeholder: 'कृष्णात् आध्यात्मिकमार्गदर्शनं याचतु...',
    ask_suggested: 'सूचितप्रश्नाः:',
    ask_q1: 'चिन्तायाः तनावस्य च निवारणं कथं करणीयम्?', ask_q2: 'धर्मे भ्रान्तिः यदा भवति तदा किं करणीयम्?',
    ask_q3: 'चञ्चलं मनः कथं नियंत्रयेत्?', ask_q4: 'प्रियस्य वियोगशोकं कथं सहेत?',
    ask_divine_online: 'दिव्यसाक्षात्कारः ऑनलाइन',
    bm_title: 'संगृहीताः श्लोकाः', bm_subtitle: 'भवतः सुरक्षिताः आध्यात्मिकश्लोकाः',
    bm_back: 'गृहं प्रति', bm_clear_all: 'सर्वं मार्जयतु',
    bm_empty_title: 'अद्यापि संग्रहः नास्ति',
    bm_empty_desc: 'गीतां पठन्, किमपि श्लोकविवरणपृष्ठे हृदयचिह्नं क्लिक्ट्वा अत्र संगृह्यताम्।',
    bm_explore: 'अध्यायान् पश्यतु', bm_read_verse: 'श्लोकं पठतु',
    bm_loading: 'संग्रहः लोड्यते...', bm_read_chapter: 'अध्यायं पठतु',
    ch_back: 'गृहं प्रति', ch_summary: 'अध्यायसारांशः', ch_english: 'आंग्लम्', ch_hindi: 'हिन्दी',
    ch_select_verse: 'श्लोकं चिनुतु', ch_choose_verse: 'अध्यायस्य {c} {n} श्लोकेभ्यः चिनुतु',
    ch_loading: 'दिव्याध्यायः लोड्यते...', ch_error: 'अध्यायः लोडयितुं न शक्यते',
    ch_retry: 'पुनः प्रयत्नम्', ch_meaning: 'अर्थः:',
  },

};
