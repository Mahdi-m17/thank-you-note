window.ThankYouGenerator = (() => {
  function clean(text) {
    return (text || "").trim().replace(/\s+/g, " ");
  }

  /** Strip leading thank-phrases; keep useful detail. */
  function ideaClause(idea) {
    const t = clean(idea);
    if (!t) return null;
    let s = t.replace(/[.!?…]+$/u, "");
    s = s.replace(
      /^(please\s+)?(write\s+|make\s+|generate\s+|create\s+)?(a\s+)?(note|message|letter)?\s*(to\s+say\s+|for\s+|about\s+)?/i,
      ""
    );
    s = s.replace(/^(for|thank you for|thanks for|i want to thank .+ for)\s+/i, "");
    s = s.trim();
    return s || null;
  }

  const WISH_INTENTS = new Set([
    "birthday",
    "congratulations",
    "getwell",
    "apology",
    "farewell",
    "goodluck",
    "welcome",
    "newyear",
  ]);

  function detectIntent(idea) {
    const text = clean(idea);
    if (!text) return null;
    const rules = [
      { id: "birthday", re: /happy\s*birthday|birthday|b-?day|\bhb\b|تولد(?:ت|تون)?|عيد\s*ميلاد|سالگرد\s*تولد/i },
      {
        id: "congratulations",
        re: /congratulat|congrats|well\s*done|proud of you|you did it|graduation|promot|تبریک|آفرین|موفقیت|فارغ/i,
      },
      { id: "getwell", re: /get\s*well|feel\s*better|recover|speedy recovery|شفا|خوب\s*شو|بهبود/i },
      { id: "apology", re: /\bsorry\b|apologize|apology|forgive me|عذر|متاسف|متأسف|ببخشید/i },
      { id: "farewell", re: /good\s*bye|goodbye|farewell|miss you|leaving|خداحافظ|بدرود|دلتنگ/i },
      { id: "goodluck", re: /good\s*luck|best of luck|nail it|موفق باشی|موفقیت/i },
      { id: "welcome", re: /\bwelcome\b|خوش\s*آمد/i },
      { id: "newyear", re: /new\s*year|سال\s*نو|نوروز/i },
      { id: "gift", re: /\bgift\b|\bpresent\b|هدیه|کادو/i },
      { id: "help", re: /\bhelp(ed|ing)?\b|support|کمک|حمایت/i },
      { id: "student", re: /student|teacher|class|معلم|دانش\s*آموز|شاگرد/i },
      { id: "friend", re: /friend|دوستی|دوست/i },
      { id: "colleague", re: /colleague|coworker|co-worker|همکار/i },
      { id: "family", re: /family|mother|father|sister|brother|خانواده|مادر|پدر/i },
      { id: "thank", re: /thank|grateful|appreciation|ممنون|تشکر|سپاس|قدردان/i },
    ];
    for (const rule of rules) {
      if (rule.re.test(text)) return rule.id;
    }
    return null;
  }

  function resolveOccasion(idea, occasion) {
    const detected = detectIntent(idea);
    const chosen = !occasion || occasion === "auto" ? "general" : occasion;
    if (!detected) return chosen;
    if (WISH_INTENTS.has(detected)) return detected;
    if (chosen === "general") return detected === "thank" ? "general" : detected;
    return chosen;
  }

  /** For wish-type notes, don't treat "happy birthday" as a "thanks for …" clause. */
  function detailForOccasion(occasion, clause) {
    if (!clause) return null;
    if (WISH_INTENTS.has(occasion)) {
      const stripped = clause
        .replace(/happy\s*birthday( to you)?/gi, "")
        .replace(/birthday/gi, "")
        .replace(/تولد(?:ت|تون)?\s*(مبارک)?/gi, "")
        .replace(/congratulat\w*/gi, "")
        .replace(/تبریک/gi, "")
        .replace(/good\s*luck/gi, "")
        .trim();
      return stripped.length > 2 ? stripped : null;
    }
    // Avoid nonsense like thanking someone "for happy birthday"
    if (/^(happy\s+)?birthday\b/i.test(clause) || /تولد/i.test(clause)) return null;
    return clause;
  }

  function pick(map, tone) {
    return map[tone] || map.warm || Object.values(map)[0];
  }

  function wishBankEn(occasion, tone, detail) {
    const banks = {
      birthday: {
        warm: [
          "Happy birthday. I hope this year brings you joy, steady light, and reasons to smile that feel entirely yours.",
          "You deserve a day that feels as kind as you are — and a year that keeps surprising you for the better.",
          "Celebrate loudly or quietly; either way, I’m glad you were born, and I’m glad I get to say it.",
          "Here’s to another trip around the sun — may it be gentle where you need gentleness, and bright where you need fire.",
        ],
        formal: [
          "Please accept my warmest wishes on your birthday. May the year ahead bring health, fulfillment, and continued success.",
          "Your presence has been a valued part of the lives around you, and today is a fine occasion to recognize that.",
          "I hope this celebration marks the beginning of a rewarding chapter.",
          "With sincere regards on your special day, and best wishes for the year to come.",
        ],
        playful: [
          "Happy birthday! Another year older, still impossible to replace. That’s science.",
          "Cake privileges: unlocked. Wish privileges: also unlocked. I’m using both on you.",
          "May your day include snacks, compliments, and zero boring meetings.",
          "Blow out the candles. Make the wish. Then tell me if it comes true so I can take partial credit.",
        ],
        heartfelt: [
          "Happy birthday. The world is better with you in it — not as a line people say, but as something I’ve actually felt.",
          "I hope you feel loved today in the quiet ways and the loud ones.",
          "Thank you for being someone whose life is worth celebrating.",
          "Wherever this next year takes you, I hope you carry the reminder that you matter deeply.",
        ],
      },
      congratulations: {
        warm: [
          detail
            ? `Congratulations — especially on ${detail}. You earned this, and it shows.`
            : "Congratulations. You earned this moment, and it shows.",
          "I’m genuinely happy for you. Hard work and heart have a way of meeting like this.",
          "Take a breath and enjoy it. You don’t get days like this every week.",
          "Onward — with pride that’s been properly earned.",
        ],
        formal: [
          detail
            ? `Congratulations on ${detail}. Your achievement is noteworthy and well deserved.`
            : "Congratulations on your achievement. It is noteworthy and well deserved.",
          "Please accept my sincere recognition of your success.",
          "I wish you continued excellence in what follows.",
          "With every good wish for the path ahead.",
        ],
        playful: [
          "Congrats! You did the thing. The thing is done. Celebration mode: on.",
          "I’d say I’m shocked, but I’ve seen how you work. Still: huge win.",
          "Confetti, metaphorically. Also literally if you have any.",
          "Go enjoy this. You’ve got bragging rights — use them kindly.",
        ],
        heartfelt: [
          "I’m so proud of you. Not the polite kind of proud — the real kind.",
          detail
            ? `What you did with ${detail} says a lot about who you are.`
            : "What you’ve accomplished says a lot about who you are.",
          "Hold onto this feeling. You built it.",
          "Wherever you go next, take this joy with you.",
        ],
      },
      getwell: {
        warm: [
          "I’m thinking of you and hoping you feel better soon — truly, steadily, and soon.",
          "Rest as much as you need. Healing doesn’t have to hurry to be real.",
          "You’re not alone in this. I’m rooting for your recovery every day.",
          "When you’re ready, the world will still be here — softer, hopefully, for your return.",
        ],
        formal: [
          "Please accept my best wishes for a swift and full recovery.",
          "I hope you are able to rest and regain your strength in the days ahead.",
          "You are in my thoughts during this time.",
          "Wishing you renewed health and comfort soon.",
        ],
        playful: [
          "Get well soon — doctor’s orders, friend orders, and snack orders.",
          "Your only job right now is rest. Everything else can wait in the hallway.",
          "Sending soup energy and good vibes. Mostly soup energy.",
          "Heal up. We need you back at full brightness.",
        ],
        heartfelt: [
          "I’m holding you gently in my thoughts. Please be kind to yourself while you heal.",
          "You don’t have to be strong every hour. Resting is part of getting better.",
          "I care about you, and I want you well.",
          "Whenever you’re ready to lean on someone, I’m here.",
        ],
      },
      apology: {
        warm: [
          detail
            ? `I’m sorry for ${detail}. I regret the hurt, and I want to make things right.`
            : "I’m sorry. I regret the hurt, and I want to make things right.",
          "You deserved better from me in that moment, and I see that clearly now.",
          "I’m listening, and I’m willing to do the work that follows an apology.",
          "Thank you for reading this. I hope we can find our way forward.",
        ],
        formal: [
          detail
            ? `Please accept my sincere apology regarding ${detail}.`
            : "Please accept my sincere apology.",
          "I take responsibility for my part and regret any distress caused.",
          "I am committed to doing better going forward.",
          "With respect, and hope for understanding.",
        ],
        playful: [
          "I messed up. This is me saying it without the fancy escape hatches.",
          "If apologies came with stickers, I’d send a whole sheet. For now: I’m sorry.",
          "I value you more than my pride. That’s why this note exists.",
          "Hoping we can laugh about this someday — after I’ve earned that laugh.",
        ],
        heartfelt: [
          "I’m sorry — not as a performance, but because I care about you and what happened.",
          "I hate that I caused weight you shouldn’t have had to carry.",
          "I’m here to listen, repair, and do better.",
          "You matter to me. I hope this is a beginning, not an ending.",
        ],
      },
      farewell: {
        warm: [
          "As you go, I want you to know how glad I am that our paths met.",
          "Farewells are strange — heavy and hopeful at once. I’m feeling both for you.",
          "Wherever you’re headed, I hope it welcomes you kindly.",
          "Stay in touch if you can. You’ll be missed in the ordinary hours.",
        ],
        formal: [
          "As you depart, please accept my best wishes for your next chapter.",
          "It has been a privilege to know and work alongside you.",
          "I wish you every success in what lies ahead.",
          "With warm regards, and gratitude for the time shared.",
        ],
        playful: [
          "Don’t be a stranger — or do, but then send memes anyway.",
          "Go shine somewhere new. We’ll pretend we’re not jealous.",
          "Safe travels. Text when you land, emotionally or literally.",
          "This isn’t delete. It’s pause. Still: bye for now.",
        ],
        heartfelt: [
          "I’m going to miss you more than a neat goodbye can hold.",
          "Thank you for the chapters we shared — even the quiet ones.",
          "May the road ahead be gentle, and may you feel accompanied.",
          "You take a piece of this place with you. You leave a piece of yourself here.",
        ],
      },
      goodluck: {
        warm: [
          detail
            ? `Good luck with ${detail}. You’ve prepared for this — trust that.`
            : "Good luck. You’ve prepared for this — trust that.",
          "I believe in your ability to meet the moment with clarity and courage.",
          "Whatever happens, you’ve already shown up. That counts.",
          "Go do the thing. I’ll be cheering from here.",
        ],
        formal: [
          detail
            ? `Best of luck with ${detail}. I am confident in your preparation.`
            : "Best of luck. I am confident in your preparation and ability.",
          "Please accept my sincere wishes for a successful outcome.",
          "May your efforts be met with the recognition they deserve.",
          "With every good wish.",
        ],
        playful: [
          "Good luck! You’ve got this. Also you’ve got snacks, hopefully.",
          "Go be excellent. Then report back so we can celebrate.",
          "Luck is nice. Your skills are nicer. Use both.",
          "Knock ’em out — metaphorically, unless it’s sports.",
        ],
        heartfelt: [
          "I’m wishing you steadiness and courage for what’s ahead.",
          "No matter the result, you are already enough.",
          "I’ll be thinking of you as you step into it.",
          "Come back and tell me everything when you can.",
        ],
      },
      welcome: {
        warm: [
          "Welcome. I’m glad you’re here — truly glad.",
          "I hope this new beginning feels open, kind, and full of good people.",
          "If you need a hand finding your footing, I’m happy to help.",
          "Here’s to new rooms, new rhythms, and belonging that grows over time.",
        ],
        formal: [
          "Welcome. It is a pleasure to have you with us.",
          "I hope your arrival marks the start of a rewarding experience.",
          "Please do not hesitate to reach out should you need assistance.",
          "With warm regards, and best wishes as you begin.",
        ],
        playful: [
          "Welcome aboard! Wi-Fi password not included in this note, sadly.",
          "You’re new here. We’re lucky. That’s the math.",
          "Make yourself at home — within reason, and with snacks.",
          "Tour guide energy: activated. Ask me anything.",
        ],
        heartfelt: [
          "Welcome. I hope you feel safe and seen as you settle in.",
          "New places can be tender. You’re not alone in that.",
          "I’m glad your story includes this chapter now.",
          "May belonging find you quickly here.",
        ],
      },
      newyear: {
        warm: [
          "Happy New Year. May this one be kinder, clearer, and full of quiet wins.",
          "I hope you carry forward what served you, and set down what didn’t.",
          "Here’s to fresh pages — and to writing them at your own pace.",
          "Wishing you health, warmth, and good company in the year ahead.",
        ],
        formal: [
          "Happy New Year. Please accept my best wishes for health and prosperity in the year ahead.",
          "May the coming months bring fulfillment and continued success.",
          "I look forward to what this year may hold.",
          "With sincere regards for a bright beginning.",
        ],
        playful: [
          "Happy New Year! New calendar, same legendary you.",
          "Resolutions optional. Joy mandatory. Snacks encouraged.",
          "May your year include fewer emails and more good days.",
          "Cheers to another lap around the sun together.",
        ],
        heartfelt: [
          "Happy New Year. I’m grateful we get another stretch of time in the same world.",
          "May this year meet you gently where you’ve been hurting, and brightly where you’re ready.",
          "Thank you for being part of my last year — and, I hope, this one too.",
          "With love for the days ahead.",
        ],
      },
    };

    const set = banks[occasion];
    if (!set) return null;
    const lines = pick(set, tone);
    return { first: lines[0], second: lines[1], third: lines[2], fourth: lines[3] };
  }

  function wishBankFa(occasion, tone, detail) {
    const banks = {
      birthday: {
        warm: [
          "تولدت مبارک. امیدوارم امسال برایت شادی، آرامش و دلیل‌های تازه برای لبخند بیاورد.",
          "روزی به مهربانی خودت برایت می‌خواهم — و سالی که تو را غافلگیر کند، به خوبی.",
          "بلند جشن بگیر یا آرام؛ در هر حال خوشحالم که به دنیا آمدی و می‌توانم این را بگویم.",
          "به یک دور دیگر به دور خورشید: امیدوارم جایی که نرمی می‌خواهی نرم باشد، و جایی که آتش می‌خواهی روشن.",
        ],
        formal: [
          "تولدتان را صمیمانه تبریک می‌گویم. سال پیش‌رو سلامت، موفقیت و کامیابی برایتان به همراه داشته باشد.",
          "حضور شما برای اطرافیانتان ارزشمند بوده و امروز فرصت خوبی برای قدردانی از آن است.",
          "امیدوارم این جشن آغاز فصلی پربار برای شما باشد.",
          "با بهترین آرزوها برای روز خاص شما و سالی که می‌آید.",
        ],
        playful: [
          "تولدت مبارک! یک سال دیگر، هنوز هم غیرقابل جایگزینی. این دیگه علمه.",
          "حق کیک: فعال شد. حق آرزو: هم فعال شد. هر دو را برای تو خرج می‌کنم.",
          "امیدوارم روزت پر از خوراکی، تعریف و صفر جلسه حوصله‌سربر باشد.",
          "شمع‌ها را فوت کن، آرزو کن، بعد بگو برآورده شد تا سهمی از افتخارش مال من شود.",
        ],
        heartfelt: [
          "تولدت مبارک. دنیا با بودن تو بهتر است — نه به‌عنوان جمله تزئینی، بلکه چیزی که واقعاً حس کرده‌ام.",
          "امیدوارم امروز هم در شکل‌های آرام و هم بلند، احساس دوست‌داشته‌شدن کنی.",
          "ممنون که کسی هستی که زندگی‌اش ارزش جشن گرفتن دارد.",
          "هر جا سال بعد ببردت، امیدوارم این یادآوری را با خود ببری که عمیقاً مهم هستی.",
        ],
      },
      congratulations: {
        warm: [
          detail
            ? `تبریک می‌گویم — مخصوصاً بابت ${detail}. حقش را داشته‌ای و معلوم است.`
            : "تبریک می‌گویم. این لحظه را حقش را داشته‌ای و معلوم است.",
          "از ته دل برایت خوشحالم. کار سخت و دل، گاهی همین‌طور به هم می‌رسند.",
          "نفس بکش و لذتش را ببر. چنین روزهایی هر هفته نمی‌آیند.",
          "به پیش — با افتخاری که درست به دست آمده.",
        ],
        formal: [
          detail
            ? `موفقیت شما در ${detail} را صمیمانه تبریک می‌گویم. دستاوردتان شایسته تقدیر است.`
            : "موفقیت شما را صمیمانه تبریک می‌گویم. دستاوردتان شایسته تقدیر است.",
          "لطفاً قدردانی صادقانه مرا بابت این موفقیت بپذیرید.",
          "ادامه درخشش را در مسیر پیش‌رو برایتان آرزو می‌کنم.",
          "با بهترین آرزوها برای آینده.",
        ],
        playful: [
          "تبریک! کار را کردی. کار تمام شد. حالت جشن: روشن.",
          "می‌گویم شوکه شدم، اما شیوه‌ات را دیده‌ام. با این حال: برد بزرگ.",
          "پولک‌های خیالی — و اگر داشتی، واقعی.",
          "برو لذت ببر. حق تعریف داری — مهربانانه خرجش کن.",
        ],
        heartfelt: [
          "بهت افتخار می‌کنم. نه افتخار مودبانه — نوع واقعی‌اش.",
          detail
            ? `کاری که با ${detail} کردی زیاد درباره تو می‌گوید.`
            : "آنچه به دست آوردی زیاد درباره تو می‌گوید.",
          "این حس را نگه دار. خودت ساخته‌ای‌اش.",
          "هر جا بعد می‌روی، این شادی را با خود ببر.",
        ],
      },
      getwell: {
        warm: [
          "به یاد تو هستم و امیدوارم زود، پیوسته و واقعی بهتر شوی.",
          "هرقدر لازم است استراحت کن. شفا لازم نیست عجله کند تا واقعی باشد.",
          "در این مسیر تنها نیستی. هر روز برایت دعا و امید دارم.",
          "وقتی آماده باشی، دنیا هنوز اینجاست — امیدوارم نرم‌تر برای برگشتنت.",
        ],
        formal: [
          "بهبودی سریع و کامل را برایتان آرزو می‌کنم.",
          "امیدوارم در روزهای پیش‌رو بتوانید استراحت کنید و توان بازگردید.",
          "در این زمان در افکار من هستید.",
          "سلامتی و آرامش دوباره را به‌زودی برایتان می‌خواهم.",
        ],
        playful: [
          "زود خوب شو — دستور پزشک، دستور دوست، و دستور خوراکی.",
          "تنها شغلت الآن استراحت است. بقیه چیزها می‌توانند در راهرو منتظر بمانند.",
          "انرژی سوپ و حال خوب می‌فرستم. بیشتر انرژی سوپ.",
          "خوب شو. به درخشش کاملت نیاز داریم.",
        ],
        heartfelt: [
          "نرم در فکرم نگهت می‌دارم. لطفاً تا خوب می‌شوی با خودت مهربان باش.",
          "لازم نیست هر ساعت قوی باشی. استراحت بخشی از خوب شدن است.",
          "برات مهم هستی و می‌خواهم خوب شوی.",
          "هر وقت خواستی تکیه کنی، اینجام.",
        ],
      },
      apology: {
        warm: [
          detail
            ? `بابت ${detail} متأسفم. از آسیب پشیمانم و می‌خواهم جبران کنم.`
            : "متأسفم. از آسیب پشیمانم و می‌خواهم جبران کنم.",
          "در آن لحظه سزاوار بهتر از من بودی و الآن واضح می‌بینمش.",
          "گوش می‌دهم و آماده‌ام کاری را بکنم که بعد از عذرخواهی می‌آید.",
          "ممنون که این را می‌خوانی. امیدوارم راهی به جلو پیدا کنیم.",
        ],
        formal: [
          detail ? `بدین‌وسیله بابت ${detail} صمیمانه عذرخواهی می‌کنم.` : "بدین‌وسیله صمیمانه عذرخواهی می‌کنم.",
          "مسئولیت سهم خود را می‌پذیرم و از هر ناراحتی ایجادشده پشیمانم.",
          "متعهد به بهتر شدن در ادامه هستم.",
          "با احترام و امید به درک.",
        ],
        playful: [
          "خراب کردم. بدون در فرار لوکس دارم می‌گویم.",
          "اگر عذرخواهی برچسب داشت، یک برگ کامل می‌فرستادم. فعلاً: متأسفم.",
          "تو از غرورم برایم مهم‌تری. برای همین این یادداشت هست.",
          "امیدوارم روزی بخندیم رویش — بعد از اینکه آن خنده را درآورده باشم.",
        ],
        heartfelt: [
          "متأسفم — نه به‌عنوان نمایش، بلکه چون به تو و به آنچه شد اهمیت می‌دهم.",
          "از اینکه وزنی روی دوشت گذاشتم که نباید، بدم می‌آید.",
          "اینجام برای شنیدن، جبران و بهتر شدن.",
          "برایم مهمی. امیدوارم این آغاز باشد نه پایان.",
        ],
      },
      farewell: {
        warm: [
          "وقتی می‌روی، می‌خواهم بدانی چقدر خوشحالم که راه‌هایمان به هم رسید.",
          "خداحافظی‌ها عجیب‌اند — هم سنگین هم امیدوار. هر دو را برای تو حس می‌کنم.",
          "هر جا می‌روی، امیدوارم با مهربانی پذیرفته شوی.",
          "اگر توانستی در تماس بمان. در ساعت‌های معمولی جایت خالی می‌شود.",
        ],
        formal: [
          "در زمان رفتنتان، بهترین آرزوها را برای فصل بعدتان دارم.",
          "شناخت و همکاری با شما افتخار بوده است.",
          "موفقیت کامل را در مسیر پیش‌رو برایتان آرزو می‌کنم.",
          "با احترام و سپاس بابت زمانی که سهیم بودیم.",
        ],
        playful: [
          "غریبه نشو — یا شو، ولی باز میم بفرست.",
          "برو جایی تازه بدرخش. ما وانمود می‌کنیم حسادت نمی‌کنیم.",
          "سفر به‌خیر. وقتی رسیدی خبر بده — جسمی یا روحی.",
          "این حذف نیست. مکث است. با این حال: فعلاً خداحافظ.",
        ],
        heartfelt: [
          "بیشتر از یک خداحافظی مرتب دلم برایت تنگ می‌شود.",
          "ممنون بابت فصل‌هایی که داشتیم — حتی آرام‌هایش.",
          "امیدوارم جاده پیش‌رو نرم باشد و حس همراهی کنی.",
          "قطعه‌ای از اینجا را با خود می‌بری. قطعه‌ای از خودت را اینجا می‌گذاری.",
        ],
      },
      goodluck: {
        warm: [
          detail
            ? `برای ${detail} موفق باشی. آماده شده‌ای — به آن اعتماد کن.`
            : "موفق باشی. آماده شده‌ای — به آن اعتماد کن.",
          "به توانایی‌ات برای روبه‌رو شدن با لحظه با وضوح و شجاعت باور دارم.",
          "هرچه شود، تو حاضر شده‌ای. این مهم است.",
          "برو انجامش بده. از اینجا هوات را دارم.",
        ],
        formal: [
          detail
            ? `برای ${detail} بهترین‌ها را آرزو می‌کنم. به آمادگی شما اطمینان دارم.`
            : "بهترین‌ها را آرزو می‌کنم. به آمادگی و توانایی شما اطمینان دارم.",
          "لطفاً آرزوهای صادقانه مرا برای نتیجه موفق بپذیرید.",
          "امیدوارم تلاش‌هایتان با قدردانی شایسته‌شان روبه‌رو شود.",
          "با همه آرزوهای نیک.",
        ],
        playful: [
          "موفق باشی! از پسش برمی‌آیی. امیدوارم خوراکی هم داشته باشی.",
          "برو عالی باش. بعد گزارش بده تا جشن بگیریم.",
          "شانس خوب است. مهارت تو بهتر است. از هر دو استفاده کن.",
          "بترکان — مجازی، مگر اینکه ورزش باشد.",
        ],
        heartfelt: [
          "برای پیش‌رو ثبات و شجاعت برایت می‌خواهم.",
          "هر نتیجه‌ای شود، تو همین حالا کافی هستی.",
          "وقتی پا می‌گذاری توی آن، به یادت هستم.",
          "هر وقت توانستی برگرد و همه‌چیز را بگو.",
        ],
      },
      welcome: {
        warm: [
          "خوش آمدی. واقعاً خوشحالم که اینجایی.",
          "امیدوارم این شروع تازه باز، مهربان و پر از آدم‌های خوب باشد.",
          "اگر برای جا افتادن کمک خواستی، خوشحال می‌شوم کمک کنم.",
          "به اتاق‌های تازه، ریتم تازه، و حس تعلقی که با زمان رشد می‌کند.",
        ],
        formal: [
          "خوش آمدید. از حضور شما خوشوقتیم.",
          "امیدوارم ورودتان آغاز تجربه‌ای پربار باشد.",
          "در صورت نیاز به کمک، در خدمتیم.",
          "با احترام و بهترین آرزوها برای آغازتان.",
        ],
        playful: [
          "خوش آمدی به کشتی! رمز وای‌فای متأسفانه داخل این یادداشت نیست.",
          "تازه‌ای. ما خوش‌شانسیم. ریاضیات همین است.",
          "مثل خانه راحت باش — در حد معقول، و با خوراکی.",
          "حالت راهنما: روشن. هرچه می‌خواهی بپرس.",
        ],
        heartfelt: [
          "خوش آمدی. امیدوارم وقتی جا می‌افتی امن و دیده‌شده حس کنی.",
          "جاهای تازه می‌توانند حساس باشند. در این حس تنها نیستی.",
          "خوشحالم که داستانت حالا این فصل را دارد.",
          "امیدوارم تعلق زود اینجا پیدایت کند.",
        ],
      },
      newyear: {
        warm: [
          "سال نو مبارک. امیدوارم امسال مهربان‌تر، روشن‌تر و پر از بردهای آرام باشد.",
          "امیدوارم آنچه برایت مفید بود بمانی، و آنچه نه را زمین بگذاری.",
          "به صفحه‌های تازه — و نوشتنشان با سرعت خودت.",
          "سلامتی، گرمی و هم‌نشینی خوب در سال پیش‌رو برایت می‌خواهم.",
        ],
        formal: [
          "سال نو را تبریک می‌گویم. سلامت و کامیابی سال پیش‌رو را برایتان آرزو می‌کنم.",
          "ماه‌های آینده سرشار از کامیابی و موفقیت پیوسته باشد.",
          "مشتاقانه در انتظار آنچه این سال می‌آورد هستم.",
          "با احترام برای آغازی روشن.",
        ],
        playful: [
          "سال نو مبارک! تقویم تازه، همان توِ افسانه‌ای.",
          "قول سال نو اختیاری است. شادی اجباری. خوراکی توصیه‌شده.",
          "امسال ایمیل کمتر و روز خوب بیشتر داشته باشی.",
          "به یک دور دیگر دور خورشید با هم.",
        ],
        heartfelt: [
          "سال نو مبارک. سپاس‌گزارم که یک بازه دیگر زمان در یک دنیا سهمیم.",
          "امیدوارم امسال جایی که زخم خورده‌ای نرم باشد و جایی که آماده‌ای روشن.",
          "ممنون که بخشی از سال گذشتم بودی — و امیدوارم امسال هم باشی.",
          "با مهر برای روزهای پیش‌رو.",
        ],
      },
    };

    const set = banks[occasion];
    if (!set) return null;
    const lines = pick(set, tone);
    return { first: lines[0], second: lines[1], third: lines[2], fourth: lines[3] };
  }

  function thanksBankEn(tone, occasion, clause) {
    const thanks = clause
      ? {
          warm: `I want to thank you for ${clause}. You made a real difference, and I’d like you to know how valuable that is.`,
          formal: `I write to express my sincere thanks regarding ${clause}. Your contribution has been noteworthy, and I wanted you to know it has been valued.`,
          playful: `Quick version: thank you — especially for ${clause}. You’ve made ordinary days feel a lot brighter.`,
          heartfelt: `From the heart: thank you for ${clause}. I carry that with me more than I usually say out loud.`,
        }
      : {
          warm: "I want to thank you for being such an admirable person to work with. You made a real difference, and I’d like you to know how valuable that is.",
          formal:
            "I write to express my sincere appreciation for your dedication and character. Your contribution has been noteworthy, and I wanted you to know it has been valued.",
          playful:
            "Quick version: thank you. You’ve made ordinary days feel a lot brighter, and that deserves more than a shrug.",
          heartfelt:
            "From the heart: thank you. Your presence has meant more than a short note can hold, but this is a start.",
        };
    const noticed = {
      warm: "Keep this as a reminder: you were noticed. Not only for what you scored, but for who you are becoming.",
      formal:
        "Please accept this note as recognition of your progress — not only in outcomes, but in the person you continue to become.",
      playful: "Keep this as proof that you were noticed — the good kind of noticed, the kind that sticks.",
      heartfelt: "I hope you keep this as a quiet reminder that you were seen carefully, gratefully, and completely.",
    };
    const future = {
      warm: "Keep trying and don’t lose your faith. You are going to have a bright future.",
      formal: "Continue to apply yourself with resolve. I am confident that a strong future lies ahead of you.",
      playful: "Keep going. You’re building something good.",
      heartfelt: "Whatever comes next, I hope you walk into it knowing you already matter — deeply.",
    };
    const extra = {
      warm: "Ordinary hours feel different because of people like you. Thank you for that.",
      formal: "It has been a privilege to observe your consistency and integrity at close range.",
      playful: "Also: you’re kind of great. That’s the whole note.",
      heartfelt: "If gratitude had a weight, this would be heavier than it looks on the page.",
    };
    const byOccasion = {
      student: {
        warm: clause
          ? `As your teacher, I want to thank you for ${clause}. Your curiosity and effort have stood out.`
          : "As your teacher, I want to thank you for the curiosity and effort you bring. You have stood out in the best way.",
        formal: "As your instructor, I formally acknowledge your dedication and character as a student.",
        playful: "Teacher note: you’ve been a star in class — thank you for showing up the way you do.",
        heartfelt: "Teaching is busy, but some students leave a quiet mark. Thank you for being one of them.",
      },
      friend: {
        warm: clause
          ? `Thank you for ${clause}. Friendship like yours doesn’t ask for credit — it just shows up.`
          : "Thank you for the kind of friendship that doesn’t ask for credit — it just shows up.",
        formal: "I am grateful for your friendship and the steadiness you bring.",
        playful: "Friend note: you were excellent. Consider this my official thank-you.",
        heartfelt: "Having you in my life is one of the quieter gifts I don’t take lightly.",
      },
      colleague: {
        warm: clause
          ? `Thank you for ${clause}. Working alongside you has made the work better.`
          : "Thank you for the way you work. Collaborating with you has made the days better.",
        formal: "I appreciate your professionalism and the quality you bring to our shared work.",
        playful: "Work win: you made the hard parts less hard. Thanks for that.",
        heartfelt: "I’m grateful we got to build something together. Your part in it mattered.",
      },
      family: {
        warm: clause
          ? `Thank you for ${clause}. Family support like yours is a kind of home.`
          : "Thank you for the way you care. Family support like yours is a kind of home.",
        formal: "I am deeply grateful for your support and the role you play in my life.",
        playful: "Family thank-you: you’re the best, and I’m saying it in writing.",
        heartfelt: "Thank you for loving me in the ordinary ways that somehow mean everything.",
      },
      gift: {
        warm: clause
          ? `Thank you for the gift — and for ${clause}. It was thoughtful in the best way.`
          : "Thank you for the gift. It was thoughtful, and it meant more than you may know.",
        formal: "Thank you for your generous gift. I appreciate your thoughtfulness.",
        playful: "Gift received. Heart: happy. Thank you!",
        heartfelt: "Your gift felt like being understood. Thank you for that kindness.",
      },
      help: {
        warm: clause
          ? `Thank you for ${clause}. Your help arrived exactly when it was needed.`
          : "Thank you for your help. It arrived exactly when it was needed.",
        formal: "I am grateful for the assistance you provided. It made a meaningful difference.",
        playful: "You helped. I noticed. Thank you (big time).",
        heartfelt: "When I needed support, you were there. I won’t forget that.",
      },
    };
    const tn = tone in thanks ? tone : "warm";
    const first =
      occasion !== "general" && byOccasion[occasion]
        ? byOccasion[occasion][tn] || byOccasion[occasion].warm
        : thanks[tn];
    return { first, second: noticed[tn], third: future[tn], fourth: extra[tn] };
  }

  function thanksBankFa(tone, occasion, clause) {
    const thanks = clause
      ? {
          warm: `می‌خواهم بابت ${clause} از تو تشکر کنم. واقعاً فرق گذاشتی و دوست دارم بدانی چقدر ارزشمند بود.`,
          formal: `بدین‌وسیله بابت ${clause} سپاس خود را اعلام می‌کنم. نقش شما شایسته تقدیر بوده است.`,
          playful: `نسخه کوتاه: ممنون — مخصوصاً بابت ${clause}. روزهای معمولی را روشن‌تر کردی.`,
          heartfelt: `از ته دل بابت ${clause} ممنونم. این را بیشتر از آن‌که معمولاً بگویم، با خودم دارم.`,
        }
      : {
          warm: "می‌خواهم از تو برای بودن و تلاشت تشکر کنم. واقعاً فرق گذاشتی و دوست دارم بدانی چقدر ارزشمند هستی.",
          formal: "بدین‌وسیله از تعهد و شخصیت شما صمیمانه قدردانی می‌کنم. حضور شما ارزشمند بوده است.",
          playful: "نسخه کوتاه: ممنون. روزهای معمولی را روشن‌تر کردی و این ارزشش را دارد که نوشته شود.",
          heartfelt: "از ته دل ممنونم. حضورت بیشتر از چیزی است که یک یادداشت کوتاه بتواند نگه دارد.",
        };
    const noticed = {
      warm: "این را نگه دار به‌عنوان یادآوری: دیده شدی. نه فقط برای نمره، بلکه برای کسی که داری می‌شوی.",
      formal: "لطفاً این یادداشت را به‌عنوان تقدیر از پیشرفت خود بپذیرید — نه فقط در نتیجه، بلکه در شخصیت.",
      playful: "این سند رسمی است که دیده شده‌ای — نوع خوبش، همان که می‌ماند.",
      heartfelt: "امیدوارم این یادآوری آرام باشد که با دقت، سپاس و کامل دیده شدی.",
    };
    const future = {
      warm: "به تلاش ادامه بده و ایمانت را از دست نده. آینده روشنی پیش رو داری.",
      formal: "با جدیت ادامه دهید. اطمینان دارم آینده‌ای روشن در انتظارتان است.",
      playful: "ادامه بده. داری چیز خوبی می‌سازی.",
      heartfelt: "هرچه پیش بیاید، امیدوارم بدانی که همین حالا هم عمیقاً مهم هستی.",
    };
    const extra = {
      warm: "ساعات معمولی به‌خاطر آدم‌هایی مثل تو فرق می‌کند. ممنون بابت این.",
      formal: "مشاهده نظم و درستکاری شما مایه افتخار بوده است.",
      playful: "ضمناً: تو خیلی خوبی. کل پیام همین بود.",
      heartfelt: "اگر قدردانی وزن داشت، این از چیزی که روی کاغذ می‌بینی سنگین‌تر بود.",
    };
    const byOccasion = {
      student: {
        warm: clause
          ? `به‌عنوان معلمت می‌خواهم بابت ${clause} از تو تشکر کنم. کنجکاوی و تلاشت برجسته بوده.`
          : "به‌عنوان معلمت می‌خواهم بابت کنجکاوی و تلاشت تشکر کنم. به بهترین شکل دیده شدی.",
        formal: "به‌عنوان مدرس شما، تعهد و شخصیت دانش‌آموزی‌تان را رسماً ارج می‌نهم.",
        playful: "یادداشت معلم: ستاره کلاس بودی — ممنون که این‌طور حاضر می‌شوی.",
        heartfelt: "تدریس شلوغ است، اما بعضی دانش‌آموزان رد آرام می‌گذارند. ممنون که یکی از آن‌ها بودی.",
      },
      friend: {
        warm: clause
          ? `بابت ${clause} ممنونم. دوستی مثل تو دنبال اعتبار نیست — فقط حاضر می‌شود.`
          : "ممنون بابت دوستی‌ای که دنبال اعتبار نیست — فقط حاضر می‌شود.",
        formal: "از دوستی و ثباتی که به زندگی‌ام می‌آوری سپاس‌گزارم.",
        playful: "یادداشت دوستانه: عالی بودی. این تشکر رسمی من است.",
        heartfelt: "داشتنت در زندگی‌ام از آن هدایای آرامی است که سرسری نمی‌گیرم.",
      },
      colleague: {
        warm: clause
          ? `بابت ${clause} ممنونم. کار کنار تو کار را بهتر کرده.`
          : "ممنون بابت شیوه‌ات در کار. همکاری با تو روزها را بهتر کرده.",
        formal: "از حرفه‌ای‌گری و کیفیتی که به کار مشترک می‌آورید قدردانی می‌کنم.",
        playful: "برد کاری: بخش‌های سخت را آسان‌تر کردی. ممنون.",
        heartfelt: "خوشحالم که با هم چیزی ساختیم. سهم تو مهم بود.",
      },
      family: {
        warm: clause
          ? `بابت ${clause} ممنونم. حمایت خانوادگی مثل تو نوعی خانه است.`
          : "ممنون بابت مراقبتت. حمایت خانوادگی مثل تو نوعی خانه است.",
        formal: "از حمایت شما و نقشی که در زندگی‌ام دارید عمیقاً سپاس‌گزارم.",
        playful: "تشکر خانوادگی: تو بهترین هستی و دارم می‌نویسمش.",
        heartfelt: "ممنون که در راه‌های معمولی‌ای دوستم داری که همه‌چیز معنا می‌دهد.",
      },
      gift: {
        warm: clause
          ? `بابت هدیه — و بابت ${clause} — ممنونم. خیلی بافکر بود.`
          : "بابت هدیه ممنونم. بافکر بود و بیشتر از آنچه شاید بدانی معنا داشت.",
        formal: "از هدیه سخاوتمندانه شما سپاس‌گزارم. قدردان فکر شما هستم.",
        playful: "هدیه رسید. قلب: خوشحال. ممنون!",
        heartfelt: "هدیه‌ات حس فهمیده شدن داد. ممنون بابت این مهربانی.",
      },
      help: {
        warm: clause
          ? `بابت ${clause} ممنونم. کمکت درست وقتی لازم بود رسید.`
          : "بابت کمکت ممنونم. درست وقتی لازم بود رسید.",
        formal: "از کمکی که ارائه دادید سپاس‌گزارم. تفاوت معناداری ایجاد کرد.",
        playful: "کمک کردی. دیدم. ممنون (خیلی زیاد).",
        heartfelt: "وقتی به حمایت نیاز داشتم، بودی. فراموشش نمی‌کنم.",
      },
    };
    const tn = tone in thanks ? tone : "warm";
    const first =
      occasion !== "general" && byOccasion[occasion]
        ? byOccasion[occasion][tn] || byOccasion[occasion].warm
        : thanks[tn];
    return { first, second: noticed[tn], third: future[tn], fourth: extra[tn] };
  }

  const packs = {
    en: {
      friend: "friend",
      greet: {
        dear: (w) => `Dear ${w},`,
        hi: (w) => `Hi ${w},`,
        hello: (w) => `Hello ${w},`,
        to: (w) => `To ${w},`,
        mydear: (w) => `My dear ${w},`,
        dearest: (w) => `Dearest ${w},`,
        hey: (w) => `Hey ${w},`,
        greetings: (w) => `Greetings ${w},`,
      },
      close: {
        warm: "With warm thanks,",
        sincerely: "Sincerely,",
        appreciation: "With appreciation,",
        cheers: "Cheers,",
        grateful: "Yours gratefully,",
        love: "With love,",
        bestwishes: "Best wishes,",
        takeCare: "Take care,",
        fondly: "Fondly,",
        respectfully: "Respectfully,",
        untilThen: "Until next time,",
        allTheBest: "All the best,",
        formal: "With appreciation,",
        playful: "Cheers and thanks,",
        heartfelt: "Yours gratefully,",
      },
      sigAnon: {
        formal: "With appreciation",
        playful: "— someone grateful",
        default: "— someone who means it",
      },
      longAdd: "I’m glad I get to say this in writing.",
      bank(tone, occasion, clause) {
        const wish = wishBankEn(occasion, tone, clause);
        if (wish) return wish;
        return thanksBankEn(tone, occasion, clause);
      },
    },
    fa: {
      friend: "دوست",
      greet: {
        dear: (w) => `${w} عزیز،`,
        hi: (w) => `سلام ${w}،`,
        hello: (w) => `درود ${w}،`,
        to: (w) => `به ${w}،`,
        mydear: (w) => `${w} عزیزم،`,
        dearest: (w) => `${w} بسیار عزیز،`,
        hey: (w) => `هی ${w}،`,
        greetings: (w) => `با سلام به ${w}،`,
      },
      close: {
        warm: "با سپاس گرم،",
        sincerely: "ارادتمند،",
        appreciation: "با قدردانی،",
        cheers: "به امید دیدار،",
        grateful: "با سپاس فراوان،",
        love: "با مهر،",
        bestwishes: "با بهترین آرزوها،",
        takeCare: "مواظب خودت باش،",
        fondly: "با علاقه،",
        respectfully: "با احترام،",
        untilThen: "تا بعد،",
        allTheBest: "برایت بهترین‌ها را می‌خواهم،",
        formal: "با احترام و قدردانی،",
        playful: "با کلی تشکر،",
        heartfelt: "از ته دل سپاس‌گزارم،",
      },
      sigAnon: {
        formal: "با احترام",
        playful: "— کسی که ممنون است",
        default: "— کسی که جدی می‌گوید",
      },
      longAdd: "خوشحالم که این را می‌توانم بنویسم.",
      bank(tone, occasion, clause) {
        const wish = wishBankFa(occasion, tone, clause);
        if (wish) return wish;
        return thanksBankFa(tone, occasion, clause);
      },
    },
  };

  // Other languages: greet/close + fall back to English wish/thanks banks (user can edit)
  function simplePack(friend, greet, close, longAdd, sigAnon) {
    return {
      friend,
      greet,
      close: { ...close, formal: close.sincerely || close.appreciation, playful: close.cheers, heartfelt: close.grateful },
      sigAnon,
      longAdd,
      bank(tone, occasion, clause) {
        const wish = wishBankEn(occasion, tone, clause);
        if (wish) return wish;
        return thanksBankEn(tone, occasion, clause);
      },
    };
  }

  packs.ar = simplePack(
    "صديقي",
    {
      dear: (w) => `عزيزي ${w}،`,
      hi: (w) => `مرحبًا ${w}،`,
      hello: (w) => `السلام عليكم ${w}،`,
      to: (w) => `إلى ${w}،`,
      mydear: (w) => `يا عزيزي ${w}،`,
      dearest: (w) => `أغلى ${w}،`,
      hey: (w) => `أهلاً ${w}،`,
      greetings: (w) => `تحياتي ${w}،`,
    },
    {
      warm: "مع خالص الشكر،",
      sincerely: "مع التحية،",
      appreciation: "مع التقدير،",
      cheers: "إلى اللقاء،",
      grateful: "مع الامتنان،",
      love: "مع المحبة،",
      bestwishes: "مع أطيب الأمنيات،",
      takeCare: "اعتنِ بنفسك،",
      fondly: "بكل ود،",
      respectfully: "مع الاحترام،",
      untilThen: "إلى اللقاء،",
      allTheBest: "كل التوفيق،",
    },
    "يسعدني أن أكتب هذا.",
    { formal: "مع التقدير", playful: "— شخص ممتن", default: "— شخص يقصده بصدق" }
  );

  packs.es = simplePack(
    "amigo/a",
    {
      dear: (w) => `Querido/a ${w}:`,
      hi: (w) => `Hola ${w},`,
      hello: (w) => `Hello ${w},`,
      to: (w) => `Para ${w},`,
      mydear: (w) => `Mi querido/a ${w},`,
      dearest: (w) => `Queridísimo/a ${w},`,
      hey: (w) => `Hey ${w},`,
      greetings: (w) => `Saludos ${w},`,
    },
    {
      warm: "Con cálido agradecimiento,",
      sincerely: "Atentamente,",
      appreciation: "Con aprecio,",
      cheers: "Un abrazo,",
      grateful: "Con gratitud,",
      love: "Con cariño,",
      bestwishes: "Mis mejores deseos,",
      takeCare: "Cuídate,",
      fondly: "Con afecto,",
      respectfully: "Respetuosamente,",
      untilThen: "Hasta pronto,",
      allTheBest: "Todo lo mejor,",
    },
    "Me alegra poder decirlo por escrito.",
    { formal: "Atentamente", playful: "— alguien agradecido", default: "— alguien que lo dice en serio" }
  );

  packs.fr = simplePack(
    "ami(e)",
    {
      dear: (w) => `Cher/Chère ${w},`,
      hi: (w) => `Salut ${w},`,
      hello: (w) => `Bonjour ${w},`,
      to: (w) => `À ${w},`,
      mydear: (w) => `Mon cher/Ma chère ${w},`,
      dearest: (w) => `Très cher/chère ${w},`,
      hey: (w) => `Hey ${w},`,
      greetings: (w) => `Salutations ${w},`,
    },
    {
      warm: "Avec mes chaleureux remerciements,",
      sincerely: "Cordialement,",
      appreciation: "Avec gratitude,",
      cheers: "À bientôt,",
      grateful: "Reconnaissant(e),",
      love: "Avec amour,",
      bestwishes: "Meilleurs vœux,",
      takeCare: "Prends soin de toi,",
      fondly: "Affectueusement,",
      respectfully: "Respectueusement,",
      untilThen: "À la prochaine,",
      allTheBest: "Bien à toi,",
    },
    "Je suis heureux/heureuse de pouvoir l’écrire.",
    { formal: "Cordialement", playful: "— quelqu’un de reconnaissant", default: "— quelqu’un de sincère" }
  );

  packs.de = simplePack(
    "Freund/in",
    {
      dear: (w) => `Liebe(r) ${w},`,
      hi: (w) => `Hallo ${w},`,
      hello: (w) => `Guten Tag ${w},`,
      to: (w) => `An ${w},`,
      mydear: (w) => `Meine(r) liebe(r) ${w},`,
      dearest: (w) => `Liebste(r) ${w},`,
      hey: (w) => `Hey ${w},`,
      greetings: (w) => `Grüße ${w},`,
    },
    {
      warm: "Mit herzlichem Dank,",
      sincerely: "Mit freundlichen Grüßen,",
      appreciation: "Mit Wertschätzung,",
      cheers: "Alles Gute,",
      grateful: "In Dankbarkeit,",
      love: "Mit Liebe,",
      bestwishes: "Beste Wünsche,",
      takeCare: "Pass auf dich auf,",
      fondly: "Herzlich,",
      respectfully: "Hochachtungsvoll,",
      untilThen: "Bis bald,",
      allTheBest: "Alles Liebe,",
    },
    "Ich bin froh, das schreiben zu können.",
    { formal: "Mit freundlichen Grüßen", playful: "— jemand Dankbarer", default: "— jemand, der es ernst meint" }
  );

  function getPack(lang) {
    return packs[lang] || packs.en;
  }

  function buildGreeting(who, style, pack) {
    if (style === "none") return "";
    const fn = pack.greet[style] || pack.greet.dear;
    return fn(who);
  }

  function closingFor(tone, closingStyle, pack, occasion) {
    if (closingStyle && closingStyle !== "auto" && pack.close[closingStyle]) {
      return pack.close[closingStyle];
    }
    if (closingStyle === "auto" || !closingStyle) {
      if (occasion === "birthday" || occasion === "congratulations" || occasion === "newyear" || occasion === "goodluck") {
        return pack.close.bestwishes || pack.close.warm;
      }
      if (occasion === "getwell") return pack.close.takeCare || pack.close.warm;
      if (occasion === "apology") return pack.close.sincerely || pack.close.warm;
      if (occasion === "farewell") return pack.close.untilThen || pack.close.warm;
    }
    return pack.close[tone] || pack.close.warm;
  }

  function senderLine(sender, tone, pack) {
    const name = clean(sender);
    if (!name) return pack.sigAnon[tone] || pack.sigAnon.default;
    if (tone === "formal") return name;
    return `— ${name}`;
  }

  function trimForLength(paragraphs, length, pack) {
    if (length === "short") {
      return paragraphs.map((p) => {
        const cut = p.split(/(?<=[.!?۔؟])\s+/u);
        return cut.slice(0, Math.min(2, cut.length)).join(" ");
      });
    }
    if (length === "long") {
      return paragraphs.map((p, i) => (i === 0 ? p : `${p} ${pack.longAdd}`));
    }
    return paragraphs;
  }

  function generate(opts = {}) {
    const {
      idea,
      recipient,
      sender,
      tone = "warm",
      length = "medium",
      paragraphs = 2,
      occasion = "auto",
      greetingStyle = "dear",
      closingStyle = "auto",
      language = "en",
    } = opts;

    const pack = getPack(language);
    const who = clean(recipient) || pack.friend;
    const resolved = resolveOccasion(idea, occasion);
    const rawClause = ideaClause(idea);
    const clause = detailForOccasion(resolved, rawClause);
    const count = Math.min(4, Math.max(1, Number(paragraphs) || 2));
    const bank = pack.bank(tone, resolved, clause);
    const pool = [bank.first, bank.second, bank.third, bank.fourth];
    const body = trimForLength(pool.slice(0, count), length, pack);

    return {
      greeting: buildGreeting(who, greetingStyle, pack),
      paragraphs: body,
      closing: closingFor(tone, closingStyle, pack, resolved),
      signature: senderLine(sender, tone, pack),
      language,
      detectedOccasion: resolved,
    };
  }

  function isRtl(lang) {
    return lang === "fa" || lang === "ar";
  }

  return { generate, clean, isRtl, getPack, detectIntent, resolveOccasion };
})();
