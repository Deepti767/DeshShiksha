/**
 * i18n.js — Client-side translations for dashboard UI strings.
 * Stores language preference in localStorage.
 * Call I18n.apply() to translate the current page.
 */

const I18n = (() => {

    const TRANSLATIONS = {
        en: {
            welcome:           'Welcome back',
            learning_space:    'Your personalized learning space',
            total_points:      'Total Points',
            lessons_done:      'Lessons Done',
            badge:             'Badge',
            overall_progress:  'Overall Progress',
            lessons:           'lessons',
            learning_modules:  'Learning Modules',
            alphabets:         'Alphabets',
            numbers:           'Numbers',
            quiz:              'Quiz',
            ask_assistant:     'Ask Assistant',
            sign_practice:     'Sign Practice',
            start:             'Start →',
            take_quiz:         'Take Quiz →',
            open_chat:         'Open Chat →',
            practice:          'Practice →',
            no_badge:          'No Badge Yet',
            no_badge_sub:      'Earn 50 points to unlock your first badge!',
            beginner:          'Beginner Badge',
            beginner_sub:      '50+ points — Great start!',
            intermediate:      'Intermediate Badge',
            intermediate_sub:  '100+ points — Keep it up!',
            expert:            'Expert Badge',
            expert_sub:        '200+ points — Outstanding work!',
            logout:            'Logout',
            points_earned:     'points earned',
            visual_tip:        'Everything here is 100% visual — no audio needed.',
            deaf_space:        'Your visual sign language learning space.',
            blind_space:       'Your personalized learning space for Blind learners.',
            cognitive_space:   'Your personalized learning space for Cognitive learners.',
            learn_sign_az:     'Learn sign language A–Z',
            learn_braille_az:  'Learn Braille A–Z',
            learn_az_pics:     'Learn A–Z with pictures',
            learn_numbers:     'Learn numbers 1–10',
            test_knowledge:    'Test your knowledge',
            chat_bot:          'Chat with your learning bot',
            practice_signs:    'Practice signs with your camera',
        },
        hi: {
            welcome:           'वापस स्वागत है',
            learning_space:    'आपका व्यक्तिगत सीखने का स्थान',
            total_points:      'कुल अंक',
            lessons_done:      'पाठ पूरे',
            badge:             'बैज',
            overall_progress:  'कुल प्रगति',
            lessons:           'पाठ',
            learning_modules:  'सीखने के मॉड्यूल',
            alphabets:         'वर्णमाला',
            numbers:           'संख्याएँ',
            quiz:              'प्रश्नोत्तरी',
            ask_assistant:     'सहायक से पूछें',
            sign_practice:     'सांकेतिक अभ्यास',
            start:             'शुरू करें →',
            take_quiz:         'प्रश्नोत्तरी लें →',
            open_chat:         'चैट खोलें →',
            practice:          'अभ्यास →',
            no_badge:          'अभी कोई बैज नहीं',
            no_badge_sub:      'पहला बैज पाने के लिए 50 अंक अर्जित करें!',
            beginner:          'शुरुआती बैज',
            beginner_sub:      '50+ अंक — शानदार शुरुआत!',
            intermediate:      'मध्यवर्ती बैज',
            intermediate_sub:  '100+ अंक — जारी रखें!',
            expert:            'विशेषज्ञ बैज',
            expert_sub:        '200+ अंक — उत्कृष्ट कार्य!',
            logout:            'लॉग आउट',
            points_earned:     'अंक अर्जित',
            visual_tip:        'यहाँ सब कुछ दृश्य है — कोई ऑडियो नहीं।',
            deaf_space:        'आपका दृश्य सांकेतिक भाषा सीखने का स्थान।',
            blind_space:       'नेत्रहीन शिक्षार्थियों के लिए आपका स्थान।',
            cognitive_space:   'संज्ञानात्मक शिक्षार्थियों के लिए आपका स्थान।',
            learn_sign_az:     'A–Z सांकेतिक भाषा सीखें',
            learn_braille_az:  'A–Z ब्रेल सीखें',
            learn_az_pics:     'चित्रों के साथ A–Z सीखें',
            learn_numbers:     '1–10 संख्याएँ सीखें',
            test_knowledge:    'अपना ज्ञान परखें',
            chat_bot:          'अपने बॉट से चैट करें',
            practice_signs:    'कैमरे से संकेत अभ्यास करें',
        },
        ta: {
            welcome:           'மீண்டும் வரவேற்கிறோம்',
            learning_space:    'உங்கள் தனிப்பட்ட கற்றல் இடம்',
            total_points:      'மொத்த புள்ளிகள்',
            lessons_done:      'பாடங்கள் முடிந்தன',
            badge:             'பேட்ஜ்',
            overall_progress:  'மொத்த முன்னேற்றம்',
            lessons:           'பாடங்கள்',
            learning_modules:  'கற்றல் தொகுதிகள்',
            alphabets:         'எழுத்துக்கள்',
            numbers:           'எண்கள்',
            quiz:              'வினாடி வினா',
            ask_assistant:     'உதவியாளரிடம் கேளுங்கள்',
            sign_practice:     'சைகை பயிற்சி',
            start:             'தொடங்கு →',
            take_quiz:         'வினாடி வினா →',
            open_chat:         'அரட்டை திற →',
            practice:          'பயிற்சி →',
            no_badge:          'இன்னும் பேட்ஜ் இல்லை',
            no_badge_sub:      'முதல் பேட்ஜ் பெற 50 புள்ளிகள் சம்பாதிக்கவும்!',
            beginner:          'தொடக்க பேட்ஜ்',
            beginner_sub:      '50+ புள்ளிகள் — சிறந்த தொடக்கம்!',
            intermediate:      'இடைநிலை பேட்ஜ்',
            intermediate_sub:  '100+ புள்ளிகள் — தொடர்ந்து செல்லுங்கள்!',
            expert:            'நிபுணர் பேட்ஜ்',
            expert_sub:        '200+ புள்ளிகள் — சிறந்த பணி!',
            logout:            'வெளியேறு',
            points_earned:     'புள்ளிகள் சம்பாதித்தன',
            visual_tip:        'இங்கே எல்லாம் காட்சி — ஆடியோ தேவையில்லை.',
            deaf_space:        'உங்கள் காட்சி சைகை மொழி கற்றல் இடம்.',
            blind_space:       'பார்வையற்றோருக்கான உங்கள் இடம்.',
            cognitive_space:   'அறிவாற்றல் கற்பவர்களுக்கான உங்கள் இடம்.',
            learn_sign_az:     'A–Z சைகை மொழி கற்கவும்',
            learn_braille_az:  'A–Z பிரெய்ல் கற்கவும்',
            learn_az_pics:     'படங்களுடன் A–Z கற்கவும்',
            learn_numbers:     '1–10 எண்கள் கற்கவும்',
            test_knowledge:    'உங்கள் அறிவை சோதிக்கவும்',
            chat_bot:          'உங்கள் போட்டுடன் அரட்டை',
            practice_signs:    'கேமராவில் சைகை பயிற்சி',
        },
        te: {
            welcome:           'తిరిగి స్వాగతం',
            learning_space:    'మీ వ్యక్తిగత అభ్యాస స్థలం',
            total_points:      'మొత్తం పాయింట్లు',
            lessons_done:      'పాఠాలు పూర్తయ్యాయి',
            badge:             'బ్యాడ్జ్',
            overall_progress:  'మొత్తం పురోగతి',
            lessons:           'పాఠాలు',
            learning_modules:  'అభ్యాస మాడ్యూళ్ళు',
            alphabets:         'అక్షరమాల',
            numbers:           'సంఖ్యలు',
            quiz:              'క్విజ్',
            ask_assistant:     'సహాయకుడిని అడగండి',
            sign_practice:     'సైన్ ప్రాక్టీస్',
            start:             'ప్రారంభించు →',
            take_quiz:         'క్విజ్ తీసుకో →',
            open_chat:         'చాట్ తెరవండి →',
            practice:          'అభ్యాసం →',
            no_badge:          'ఇంకా బ్యాడ్జ్ లేదు',
            no_badge_sub:      'మొదటి బ్యాడ్జ్ కోసం 50 పాయింట్లు సంపాదించండి!',
            beginner:          'ప్రారంభ బ్యాడ్జ్',
            beginner_sub:      '50+ పాయింట్లు — గొప్ప ప్రారంభం!',
            intermediate:      'మధ్యస్థ బ్యాడ్జ్',
            intermediate_sub:  '100+ పాయింట్లు — కొనసాగించండి!',
            expert:            'నిపుణ బ్యాడ్జ్',
            expert_sub:        '200+ పాయింట్లు — అద్భుతమైన పని!',
            logout:            'లాగ్ అవుట్',
            points_earned:     'పాయింట్లు సంపాదించారు',
            visual_tip:        'ఇక్కడ అన్నీ దృశ్యమానం — ఆడియో అవసరం లేదు.',
            deaf_space:        'మీ దృశ్య సైన్ లాంగ్వేజ్ అభ్యాస స్థలం.',
            blind_space:       'అంధ అభ్యాసకుల కోసం మీ స్థలం.',
            cognitive_space:   'అభిజ్ఞా అభ్యాసకుల కోసం మీ స్థలం.',
            learn_sign_az:     'A–Z సైన్ లాంగ్వేజ్ నేర్చుకోండి',
            learn_braille_az:  'A–Z బ్రెయిల్ నేర్చుకోండి',
            learn_az_pics:     'చిత్రాలతో A–Z నేర్చుకోండి',
            learn_numbers:     '1–10 సంఖ్యలు నేర్చుకోండి',
            test_knowledge:    'మీ జ్ఞానాన్ని పరీక్షించుకోండి',
            chat_bot:          'మీ బాట్‌తో చాట్ చేయండి',
            practice_signs:    'కెమెరాతో సైన్ ప్రాక్టీస్',
        },
        bn: {
            welcome:           'আবার স্বাগতম',
            learning_space:    'আপনার ব্যক্তিগত শেখার জায়গা',
            total_points:      'মোট পয়েন্ট',
            lessons_done:      'পাঠ সম্পন্ন',
            badge:             'ব্যাজ',
            overall_progress:  'সামগ্রিক অগ্রগতি',
            lessons:           'পাঠ',
            learning_modules:  'শেখার মডিউল',
            alphabets:         'বর্ণমালা',
            numbers:           'সংখ্যা',
            quiz:              'কুইজ',
            ask_assistant:     'সহকারীকে জিজ্ঞাসা করুন',
            sign_practice:     'সাইন অনুশীলন',
            start:             'শুরু করুন →',
            take_quiz:         'কুইজ নিন →',
            open_chat:         'চ্যাট খুলুন →',
            practice:          'অনুশীলন →',
            no_badge:          'এখনো কোনো ব্যাজ নেই',
            no_badge_sub:      'প্রথম ব্যাজ পেতে ৫০ পয়েন্ট অর্জন করুন!',
            beginner:          'শিক্ষানবিস ব্যাজ',
            beginner_sub:      '৫০+ পয়েন্ট — দুর্দান্ত শুরু!',
            intermediate:      'মধ্যবর্তী ব্যাজ',
            intermediate_sub:  '১০০+ পয়েন্ট — চালিয়ে যান!',
            expert:            'বিশেষজ্ঞ ব্যাজ',
            expert_sub:        '২০০+ পয়েন্ট — অসাধারণ কাজ!',
            logout:            'লগ আউট',
            points_earned:     'পয়েন্ট অর্জিত',
            visual_tip:        'এখানে সব কিছু দৃশ্যমান — কোনো অডিও নেই।',
            deaf_space:        'আপনার দৃশ্য সাইন ভাষা শেখার জায়গা।',
            blind_space:       'দৃষ্টিহীন শিক্ষার্থীদের জন্য আপনার জায়গা।',
            cognitive_space:   'জ্ঞানীয় শিক্ষার্থীদের জন্য আপনার জায়গা।',
            learn_sign_az:     'A–Z সাইন ভাষা শিখুন',
            learn_braille_az:  'A–Z ব্রেইল শিখুন',
            learn_az_pics:     'ছবি দিয়ে A–Z শিখুন',
            learn_numbers:     '১–১০ সংখ্যা শিখুন',
            test_knowledge:    'আপনার জ্ঞান পরীক্ষা করুন',
            chat_bot:          'আপনার বটের সাথে চ্যাট করুন',
            practice_signs:    'ক্যামেরায় সাইন অনুশীলন করুন',
        },
        mr: {
            welcome:           'पुन्हा स्वागत आहे',
            learning_space:    'तुमची वैयक्तिक शिक्षण जागा',
            total_points:      'एकूण गुण',
            lessons_done:      'धडे पूर्ण',
            badge:             'बॅज',
            overall_progress:  'एकूण प्रगती',
            lessons:           'धडे',
            learning_modules:  'शिक्षण मॉड्यूल',
            alphabets:         'वर्णमाला',
            numbers:           'संख्या',
            quiz:              'प्रश्नमंजुषा',
            ask_assistant:     'सहाय्यकाला विचारा',
            sign_practice:     'सांकेतिक सराव',
            start:             'सुरू करा →',
            take_quiz:         'प्रश्नमंजुषा घ्या →',
            open_chat:         'चॅट उघडा →',
            practice:          'सराव →',
            no_badge:          'अजून बॅज नाही',
            no_badge_sub:      'पहिला बॅज मिळवण्यासाठी ५० गुण मिळवा!',
            beginner:          'नवशिक्या बॅज',
            beginner_sub:      '५०+ गुण — उत्तम सुरुवात!',
            intermediate:      'मध्यम बॅज',
            intermediate_sub:  '१००+ गुण — सुरू ठेवा!',
            expert:            'तज्ञ बॅज',
            expert_sub:        '२००+ गुण — उत्कृष्ट काम!',
            logout:            'लॉग आउट',
            points_earned:     'गुण मिळवले',
            visual_tip:        'येथे सर्व काही दृश्य आहे — ऑडिओ नाही.',
            deaf_space:        'तुमची दृश्य सांकेतिक भाषा शिक्षण जागा.',
            blind_space:       'दृष्टिहीन शिकणाऱ्यांसाठी तुमची जागा.',
            cognitive_space:   'संज्ञानात्मक शिकणाऱ्यांसाठी तुमची जागा.',
            learn_sign_az:     'A–Z सांकेतिक भाषा शिका',
            learn_braille_az:  'A–Z ब्रेल शिका',
            learn_az_pics:     'चित्रांसह A–Z शिका',
            learn_numbers:     '१–१० संख्या शिका',
            test_knowledge:    'तुमचे ज्ञान तपासा',
            chat_bot:          'तुमच्या बॉटशी चॅट करा',
            practice_signs:    'कॅमेऱ्याने सांकेतिक सराव करा',
        },
        kn: {
            welcome:           'ಮತ್ತೆ ಸ್ವಾಗತ',
            learning_space:    'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕಲಿಕೆಯ ಸ್ಥಳ',
            total_points:      'ಒಟ್ಟು ಅಂಕಗಳು',
            lessons_done:      'ಪಾಠಗಳು ಮುಗಿದಿವೆ',
            badge:             'ಬ್ಯಾಡ್ಜ್',
            overall_progress:  'ಒಟ್ಟು ಪ್ರಗತಿ',
            lessons:           'ಪಾಠಗಳು',
            learning_modules:  'ಕಲಿಕೆ ಮಾಡ್ಯೂಲ್‌ಗಳು',
            alphabets:         'ವರ್ಣಮಾಲೆ',
            numbers:           'ಸಂಖ್ಯೆಗಳು',
            quiz:              'ಕ್ವಿಜ್',
            ask_assistant:     'ಸಹಾಯಕರನ್ನು ಕೇಳಿ',
            sign_practice:     'ಸಂಕೇತ ಅಭ್ಯಾಸ',
            start:             'ಪ್ರಾರಂಭಿಸಿ →',
            take_quiz:         'ಕ್ವಿಜ್ ತೆಗೆದುಕೊಳ್ಳಿ →',
            open_chat:         'ಚಾಟ್ ತೆರೆಯಿರಿ →',
            practice:          'ಅಭ್ಯಾಸ →',
            no_badge:          'ಇನ್ನೂ ಬ್ಯಾಡ್ಜ್ ಇಲ್ಲ',
            no_badge_sub:      'ಮೊದಲ ಬ್ಯಾಡ್ಜ್ ಪಡೆಯಲು 50 ಅಂಕಗಳನ್ನು ಗಳಿಸಿ!',
            beginner:          'ಆರಂಭಿಕ ಬ್ಯಾಡ್ಜ್',
            beginner_sub:      '50+ ಅಂಕಗಳು — ಅದ್ಭುತ ಆರಂಭ!',
            intermediate:      'ಮಧ್ಯಮ ಬ್ಯಾಡ್ಜ್',
            intermediate_sub:  '100+ ಅಂಕಗಳು — ಮುಂದುವರಿಯಿರಿ!',
            expert:            'ತಜ್ಞ ಬ್ಯಾಡ್ಜ್',
            expert_sub:        '200+ ಅಂಕಗಳು — ಅತ್ಯುತ್ತಮ ಕೆಲಸ!',
            logout:            'ಲಾಗ್ ಔಟ್',
            points_earned:     'ಅಂಕಗಳು ಗಳಿಸಲಾಗಿದೆ',
            visual_tip:        'ಇಲ್ಲಿ ಎಲ್ಲವೂ ದೃಶ್ಯ — ಆಡಿಯೋ ಅಗತ್ಯವಿಲ್ಲ.',
            deaf_space:        'ನಿಮ್ಮ ದೃಶ್ಯ ಸಂಕೇತ ಭಾಷೆ ಕಲಿಕೆಯ ಸ್ಥಳ.',
            blind_space:       'ದೃಷ್ಟಿಹೀನ ಕಲಿಯುವವರಿಗೆ ನಿಮ್ಮ ಸ್ಥಳ.',
            cognitive_space:   'ಅರಿವಿನ ಕಲಿಯುವವರಿಗೆ ನಿಮ್ಮ ಸ್ಥಳ.',
            learn_sign_az:     'A–Z ಸಂಕೇತ ಭಾಷೆ ಕಲಿಯಿರಿ',
            learn_braille_az:  'A–Z ಬ್ರೈಲ್ ಕಲಿಯಿರಿ',
            learn_az_pics:     'ಚಿತ್ರಗಳೊಂದಿಗೆ A–Z ಕಲಿಯಿರಿ',
            learn_numbers:     '1–10 ಸಂಖ್ಯೆಗಳನ್ನು ಕಲಿಯಿರಿ',
            test_knowledge:    'ನಿಮ್ಮ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿ',
            chat_bot:          'ನಿಮ್ಮ ಬಾಟ್‌ನೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ',
            practice_signs:    'ಕ್ಯಾಮೆರಾದಲ್ಲಿ ಸಂಕೇತ ಅಭ್ಯಾಸ ಮಾಡಿ',
        },
    };

    const LANG_NAMES = { en:'English', hi:'हिंदी', ta:'தமிழ்', te:'తెలుగు', bn:'বাংলা', mr:'मराठी', kn:'ಕನ್ನಡ' };

    function getLang() {
        return localStorage.getItem('ds_lang') || 'en';
    }

    function setLang(code) {
        localStorage.setItem('ds_lang', code);
        // Update UI immediately without page reload
        apply();
        // Reload to re-render any server-side translated content
        // Use a small delay so the active button state updates visually first
        setTimeout(function() {
            window.location.reload();
        }, 150);
    }

    function t(key) {
        var lang = getLang();
        var dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
        return dict[key] || TRANSLATIONS['en'][key] || key;
    }

    // Apply translations to elements with data-i18n attribute
    function apply() {
        var lang = getLang();
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            var val = t(key);
            if (el.tagName === 'INPUT' || el.tagName === 'BUTTON') {
                el.value = val;
            } else {
                el.textContent = val;
            }
        });
        // Update lang switcher active state
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // Build the language switcher widget and inject into target element
    function buildSwitcher(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;
        var current = getLang();
        var html = '<div class="lang-switcher">';
        Object.keys(LANG_NAMES).forEach(function(code) {
            html += '<button class="lang-btn' + (code === current ? ' active' : '') + '" ' +
                    'data-lang="' + code + '" onclick="I18n.setLang(\'' + code + '\')">' +
                    LANG_NAMES[code] + '</button>';
        });
        html += '</div>';
        container.innerHTML = html;
    }

    // Auto-apply on DOM ready
    document.addEventListener('DOMContentLoaded', apply);

    return { t, setLang, getLang, apply, buildSwitcher, LANG_NAMES };
})();
