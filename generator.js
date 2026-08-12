window.ThankYouGenerator = (() => {
  function clean(text) {
    return (text || "").trim().replace(/\s+/g, " ");
  }

  function hashPick(seed, arr) {
    if (!arr || !arr.length) return "";
    let h = 2166136261;
    const s = String(seed || "");
    for (let i = 0; i < s.length; i += 1) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return arr[Math.abs(h) % arr.length];
  }

  /** Prefer random pick so each Generate click feels different; seed breaks ties. */
  function pickLine(seed, arr) {
    if (!arr || !arr.length) return "";
    if (arr.length === 1) return arr[0];
    const i = Math.floor(Math.random() * arr.length);
    return arr[i] || hashPick(seed, arr);
  }

  function contextFitsAcademic(idea, occasion) {
    if (occasion === "student") return true;
    return /score|grade|class|student|teacher|exam|study|learn|school|university|course|assignment|homework|classroom|معلم|دانش|نمره|کلاس|امتحان|درس|تحصیل|آموزش/i.test(
      idea || ""
    );
  }

  const ACADEMIC_EN = [
    "Keep this as a reminder: you were noticed. Not only for what you scored, but for who you are becoming.",
    "You were noticed — not only for the grade, but for the person you are becoming.",
    "What stands out is not only what you scored, but how you keep growing.",
    "I see both the results and the character behind them: not only what you scored, but who you are becoming.",
    "This is recognition of progress — in marks, yes, and more in who you are becoming.",
    "Remember: you were seen carefully — not only for what you scored, but for who you are becoming.",
  ];

  const ACADEMIC_FA = [
    "این را نگه دار به‌عنوان یادآوری: دیده شدی. نه فقط برای نمره، بلکه برای کسی که داری می‌شوی.",
    "دیده شدی — نه فقط به‌خاطر نمره، بلکه به‌خاطر کسی که داری می‌شوی.",
    "آنچه برجسته است فقط نمره نیست؛ رشد تو هم هست.",
    "هم نتیجه را می‌بینم و هم شخصیت پشت آن را: نه فقط نمره، بلکه کسی که داری می‌شوی.",
  ];

  const SUPPORT_EN = [
    "What stayed with me wasn’t loud — it was steady, and it mattered.",
    "I keep returning to that moment with fresh gratitude.",
    "Small as it may have looked from the outside, it landed deeply with me.",
    "Because of what you did, ordinary hours felt lighter and clearer.",
    "Care like yours shows up in concrete ways, and I noticed.",
    "I’m still struck by the thoughtfulness, the timing, and the effect.",
    "That kind of kindness doesn’t ask for credit — it just changes the day.",
    "I don’t want the detail of it to get lost in a vague thank-you.",
    "You’ve made room for steadiness when things could have felt sharp.",
    "I’m grateful in a pointed way, not a polite, empty way.",
    "The difference you made was practical and human at once.",
    "I felt supported, seen, and less alone because of you.",
    "That gesture had weight — the good kind.",
    "I’m carrying the memory of it with sincere thanks.",
    "You turned a hard stretch into something bearable.",
    "It’s rare for help to arrive so cleanly. Yours did.",
    "I hope you feel how valued that was from my side.",
    "Please know it registered fully with me.",
    "I’m better for having received that from you.",
    "Thank you for showing up in a way that counted.",
    "Your presence rearranged the day for the better.",
    "I noticed the care in the details — and it meant a lot.",
    "That was generosity without drama, and I appreciate it.",
    "You gave something I didn’t know how to ask for.",
    "What you offered stays with me longer than a quick thanks can hold.",
    "You made the complicated feel manageable.",
    "I’m sincerely glad you were part of that moment.",
    "Your timing was a gift in itself.",
    "I felt the intention behind it, not only the action.",
    "That kind of support builds trust quietly.",
    "I’m thankful for the steadiness you brought.",
    "You didn’t have to do it that well — and you did.",
    "I’m still smiling about how it landed.",
    "Gratitude like this wants clearer words than ‘thanks’ alone.",
    "You left the day kinder than you found it.",
    "I hope this note returns a fraction of that warmth.",
    "What you did was simple and significant at the same time.",
    "I’m holding onto it as proof that people can be good.",
    "Thank you for the way you handled it — gently and fully.",
    "You made space where there wasn’t much.",
    "I’m grateful for both the help and the heart in it.",
    "That memory has become one I revisit with thanks.",
    "You bridged a gap I was struggling to cross alone.",
    "I felt less heavy afterward — and that was you.",
    "Please accept this as real recognition, not routine courtesy.",
    "Your kindness had a clear shape, and I’m naming it here.",
    "I’m better oriented because of what you offered.",
    "Thank you for being exact where it mattered.",
    "You answered a need without making it awkward.",
    "I’m still absorbing how helpful that was.",
    "That was care in motion, not in theory.",
    "I don’t take it lightly, even if I smiled lightly then.",
    "You restored a bit of ease I had misplaced.",
    "What you gave wasn’t flashy — it was faithful.",
    "Thank you for the patience inside the help.",
    "You made the next step possible.",
    "I’m sincerely glad our paths met there.",
    "That moment deserves more than a shrug of thanks.",
    "You brought calm into a place that needed it.",
    "I felt chosen for care, not handled out of duty.",
    "There’s a particular relief that only arrives when someone shows up like you did.",
    "You made loyalty feel ordinary and extraordinary at once.",
    "I’m naming the good so it doesn’t blur into background noise.",
    "Your honesty helped as much as your kindness.",
    "I trusted the moment more because you were in it.",
    "Thank you for staying when it would have been easier to drift.",
    "You offered presence, not performance.",
    "That support had no sharp edges — only clarity.",
    "I’m grateful for the quiet courage in how you helped.",
    "You reminded me that being known can feel safe.",
    "The day changed temperature because you were there.",
    "Thank you for listening all the way through.",
    "You didn’t minimize what mattered; you met it.",
    "I’m keeping the proof that someone cared carefully.",
    "Your humor softened what could have stayed hard.",
    "Thank you for the follow-through, not only the first gesture.",
    "You made belonging feel less theoretical.",
    "I felt less rushed to be okay, and more allowed to be human.",
    "That was grace in a practical form.",
    "You treated my worry as real — and that helped.",
    "I’m thankful for the dignity you left intact.",
    "You showed up without making me earn it first.",
    "The help was specific, and so is my thanks.",
    "You noticed what others walked past.",
    "I’m grateful for the unhurried way you cared.",
    "That kindness had excellent manners — no fuss, all substance.",
    "You made a rough corner of life feel navigable again.",
    "Thank you for the courage it took to be kind that day.",
    "I felt steadied by something as simple as your attention.",
    "You didn’t fix everything — you made enough room for hope.",
    "I’m still learning how much that mattered.",
    "Your help arrived without a scoreboard attached.",
    "Thank you for making generosity look ordinary.",
    "You gave me back a little confidence I had misplaced.",
    "I’m grateful for the way you held the hard parts gently.",
    "That was the kind of support people remember years later.",
    "You met me where I was, not where it was convenient.",
    "Thank you for the clarity you brought into confusion.",
    "I’m glad the day included you — it changed the outcome.",
    "You made kindness feel like a skill, not an accident.",
    "Looking back, your care felt exact and it mattered.",
    "Looking back, your care felt exact and I’m grateful.",
    "Looking back, your care felt exact and I want you to know.",
    "Looking back, your care felt exact and it still sits with me.",
    "Looking back, your help changed the day and it mattered.",
    "Looking back, your help changed the day and I’m grateful.",
    "Looking back, your help changed the day and I want you to know.",
    "Looking back, your help changed the day and it still sits with me.",
    "Looking back, I felt less alone because of you and it mattered.",
    "Looking back, I felt less alone because of you and I’m grateful.",
    "Looking back, I felt less alone because of you and I want you to know.",
    "Looking back, I felt less alone because of you and it still sits with me.",
    "Looking back, the kindness had a clear shape and it mattered.",
    "Looking back, the kindness had a clear shape and I’m grateful.",
    "Looking back, the kindness had a clear shape and I want you to know.",
    "Looking back, the kindness had a clear shape and it still sits with me.",
    "Looking back, your timing mattered as much as the gesture and it mattered.",
    "Looking back, your timing mattered as much as the gesture and I’m grateful.",
    "Looking back, your timing mattered as much as the gesture and I want you to know.",
    "Looking back, your timing mattered as much as the gesture and it still sits with me.",
    "Looking back, I noticed how carefully you showed up and it mattered.",
    "Looking back, I noticed how carefully you showed up and I’m grateful.",
    "Looking back, I noticed how carefully you showed up and I want you to know.",
    "Looking back, I noticed how carefully you showed up and it still sits with me.",
    "Looking back, the support arrived without drama and it mattered.",
    "Looking back, the support arrived without drama and I’m grateful.",
    "Looking back, the support arrived without drama and I want you to know.",
    "Looking back, the support arrived without drama and it still sits with me.",
    "Looking back, you made a hard stretch bearable and it mattered.",
    "Looking back, you made a hard stretch bearable and I’m grateful.",
    "Looking back, you made a hard stretch bearable and I want you to know.",
    "Looking back, you made a hard stretch bearable and it still sits with me.",
    "Looking back, I felt seen rather than handled and it mattered.",
    "Looking back, I felt seen rather than handled and I’m grateful.",
    "Looking back, I felt seen rather than handled and I want you to know.",
    "Looking back, I felt seen rather than handled and it still sits with me.",
    "Looking back, your presence rearranged what seemed stuck and it mattered.",
    "Looking back, your presence rearranged what seemed stuck and I’m grateful.",
    "Looking back, your presence rearranged what seemed stuck and I want you to know.",
    "Looking back, your presence rearranged what seemed stuck and it still sits with me.",
    "Looking back, you answered a need without awkwardness and it mattered.",
    "Looking back, you answered a need without awkwardness and I’m grateful.",
    "Looking back, you answered a need without awkwardness and I want you to know.",
    "Looking back, you answered a need without awkwardness and it still sits with me.",
    "Looking back, you left dignity intact while you helped and it mattered.",
    "Looking back, you left dignity intact while you helped and I’m grateful.",
    "Looking back, you left dignity intact while you helped and I want you to know.",
    "Looking back, you left dignity intact while you helped and it still sits with me.",
    "Looking back, you restored a bit of ease I had misplaced and it mattered.",
    "Looking back, you restored a bit of ease I had misplaced and I’m grateful.",
    "Looking back, you restored a bit of ease I had misplaced and I want you to know.",
    "Looking back, you restored a bit of ease I had misplaced and it still sits with me.",
    "Looking back, you stayed when drifting would have been easier and it mattered.",
    "Looking back, you stayed when drifting would have been easier and I’m grateful.",
    "Looking back, you stayed when drifting would have been easier and I want you to know.",
    "Looking back, you stayed when drifting would have been easier and it still sits with me.",
    "Looking back, you made the next step possible and it mattered.",
    "Looking back, you made the next step possible and I’m grateful.",
    "Looking back, you made the next step possible and I want you to know.",
    "Looking back, you made the next step possible and it still sits with me.",
    "Even now, your care felt exact and it mattered.",
    "Even now, your care felt exact and I’m grateful.",
    "Even now, your care felt exact and I want you to know.",
    "Even now, your care felt exact and it still sits with me.",
    "Even now, your help changed the day and it mattered.",
    "Even now, your help changed the day and I’m grateful.",
    "Even now, your help changed the day and I want you to know.",
    "Even now, your help changed the day and it still sits with me.",
    "Even now, I felt less alone because of you and it mattered.",
    "Even now, I felt less alone because of you and I’m grateful.",
    "Even now, I felt less alone because of you and I want you to know.",
    "Even now, I felt less alone because of you and it still sits with me.",
    "Even now, the kindness had a clear shape and it mattered.",
    "Even now, the kindness had a clear shape and I’m grateful.",
    "Even now, the kindness had a clear shape and I want you to know.",
    "Even now, the kindness had a clear shape and it still sits with me.",
    "Even now, your timing mattered as much as the gesture and it mattered.",
    "Even now, your timing mattered as much as the gesture and I’m grateful.",
    "Even now, your timing mattered as much as the gesture and I want you to know.",
    "Even now, your timing mattered as much as the gesture and it still sits with me.",
    "Even now, I noticed how carefully you showed up and it mattered.",
    "Even now, I noticed how carefully you showed up and I’m grateful.",
    "Even now, I noticed how carefully you showed up and I want you to know.",
    "Even now, I noticed how carefully you showed up and it still sits with me.",
    "Even now, the support arrived without drama and it mattered.",
    "Even now, the support arrived without drama and I’m grateful.",
    "Even now, the support arrived without drama and I want you to know.",
    "Even now, the support arrived without drama and it still sits with me.",
    "Even now, you made a hard stretch bearable and it mattered.",
    "Even now, you made a hard stretch bearable and I’m grateful.",
    "Even now, you made a hard stretch bearable and I want you to know.",
    "Even now, you made a hard stretch bearable and it still sits with me.",
    "Even now, I felt seen rather than handled and it mattered.",
    "Even now, I felt seen rather than handled and I’m grateful.",
    "Even now, I felt seen rather than handled and I want you to know.",
    "Even now, I felt seen rather than handled and it still sits with me.",
    "Even now, your presence rearranged what seemed stuck and it mattered.",
    "Even now, your presence rearranged what seemed stuck and I’m grateful.",
    "Even now, your presence rearranged what seemed stuck and I want you to know.",
    "Even now, your presence rearranged what seemed stuck and it still sits with me.",
    "Even now, you answered a need without awkwardness and it mattered.",
    "Even now, you answered a need without awkwardness and I’m grateful.",
    "Even now, you answered a need without awkwardness and I want you to know.",
    "Even now, you answered a need without awkwardness and it still sits with me.",
    "Even now, you left dignity intact while you helped and it mattered.",
    "Even now, you left dignity intact while you helped and I’m grateful.",
    "Even now, you left dignity intact while you helped and I want you to know.",
    "Even now, you left dignity intact while you helped and it still sits with me.",
    "Even now, you restored a bit of ease I had misplaced and it mattered.",
    "Even now, you restored a bit of ease I had misplaced and I’m grateful.",
    "Even now, you restored a bit of ease I had misplaced and I want you to know.",
    "Even now, you restored a bit of ease I had misplaced and it still sits with me.",
    "Even now, you stayed when drifting would have been easier and it mattered.",
    "Even now, you stayed when drifting would have been easier and I’m grateful.",
    "Even now, you stayed when drifting would have been easier and I want you to know.",
    "Even now, you stayed when drifting would have been easier and it still sits with me.",
    "Even now, you made the next step possible and it mattered.",
    "Even now, you made the next step possible and I’m grateful.",
    "Even now, you made the next step possible and I want you to know.",
    "Even now, you made the next step possible and it still sits with me."
  ];

  const FORWARD_EN = [
    "Keep going — you’re building something good, even on the quiet days.",
    "Whatever comes next, I hope you walk into it with confidence you’ve earned.",
    "May the road ahead be a little kinder because of people like you — including you yourself.",
    "I hope you protect the same care you so freely give.",
    "Here’s to more ordinary hours made better by who you are.",
    "Take this as fuel, not pressure: you’re already making a difference.",
    "I hope good things find you with the same timing you offered others.",
    "Carry forward the proof that your presence matters.",
    "May you feel as supported as you’ve made others feel.",
    "Onward — with steadiness, and with joy where it fits.",
    "I hope the next chapter returns the warmth you’ve been giving.",
    "Keep trusting the quiet strengths that show up in you.",
    "Wishing you ease, clarity, and company on the path ahead.",
    "May you rest when you need rest, and rise when you’re ready.",
    "I hope life meets you halfway more often.",
    "Go gently, and go proudly — both can be true.",
    "May your days ahead hold room for the good you’ve sown.",
    "I’m rooting for the version of you that keeps choosing care.",
    "Hope the future feels open, not heavy.",
    "Wherever you head next, take this gratitude with you.",
    "May luck be practical and kindness be frequent for you.",
    "I hope you get as many soft landings as you’ve given.",
    "Keep building; the foundation is already solid.",
    "Wishing you momentum without burnout.",
    "May tomorrow treat you with fairness and surprise you with joy.",
    "Hold onto what is working — you’re doing more right than you see.",
    "I hope doors open that match the effort you put in.",
    "Go find the bright corners; you deserve them.",
    "May peace show up in small daily ways.",
    "I’m glad the story continues — and I’m glad you’re in it.",
    "May friendship keep finding you as readily as you offer it.",
    "I hope the people around you notice you the way you’ve noticed others.",
    "Wishing you laughter that arrives without needing a reason.",
    "May your next season be spacious enough for what you need.",
    "Keep the soft parts of you; they’re not a weakness.",
    "I hope rest feels allowed, not earned the hard way only.",
    "May good company stay close and noise stay far.",
    "Here’s to paths that feel like yours, not borrowed.",
    "I hope you keep collecting proof that you matter.",
    "May courage visit you in usable sizes.",
    "Wishing you fewer uphill days — and strong legs for the rest.",
    "Take the long view; you’re already further than you think.",
    "May sweetness interrupt the logistics of life more often.",
    "I hope your name is spoken kindly in rooms you’re not in.",
    "Onward with curiosity intact.",
    "May your work meet the right eyes at the right time.",
    "I hope tomorrow feels lighter than today expected.",
    "Keep the habits that make you kinder to yourself.",
    "May you find allies as steady as you’ve been.",
    "Wishing you clear mornings and honest evenings.",
    "Going forward, I hope you feel as supported as you’ve made others feel.",
    "Going forward, I hope you feel as supported as you’ve made others feel — you’ve earned that much.",
    "Going forward, I hope you feel as supported as you’ve made others feel, and I’m rooting for you.",
    "Going forward, may ease find you more often than pressure.",
    "Going forward, may ease find you more often than pressure — you’ve earned that much.",
    "Going forward, may ease find you more often than pressure, and I’m rooting for you.",
    "Going forward, I hope good things arrive with fair timing.",
    "Going forward, I hope good things arrive with fair timing — you’ve earned that much.",
    "Going forward, I hope good things arrive with fair timing, and I’m rooting for you.",
    "Going forward, may your courage stay practical and your rest guilt-free.",
    "Going forward, may your courage stay practical and your rest guilt-free — you’ve earned that much.",
    "Going forward, may your courage stay practical and your rest guilt-free, and I’m rooting for you.",
    "Going forward, I hope doors open that match your effort.",
    "Going forward, I hope doors open that match your effort — you’ve earned that much.",
    "Going forward, I hope doors open that match your effort, and I’m rooting for you.",
    "Going forward, may friendship keep finding you readily.",
    "Going forward, may friendship keep finding you readily — you’ve earned that much.",
    "Going forward, may friendship keep finding you readily, and I’m rooting for you.",
    "Going forward, I hope you protect the care you give so freely.",
    "Going forward, I hope you protect the care you give so freely — you’ve earned that much.",
    "Going forward, I hope you protect the care you give so freely, and I’m rooting for you.",
    "Going forward, may your days hold room for joy without apology.",
    "Going forward, may your days hold room for joy without apology — you’ve earned that much.",
    "Going forward, may your days hold room for joy without apology, and I’m rooting for you.",
    "Going forward, I hope you keep collecting proof that you matter.",
    "Going forward, I hope you keep collecting proof that you matter — you’ve earned that much.",
    "Going forward, I hope you keep collecting proof that you matter, and I’m rooting for you.",
    "Going forward, may soft landings meet you when you need them.",
    "Going forward, may soft landings meet you when you need them — you’ve earned that much.",
    "Going forward, may soft landings meet you when you need them, and I’m rooting for you.",
    "Going forward, I hope the future feels open rather than heavy.",
    "Going forward, I hope the future feels open rather than heavy — you’ve earned that much.",
    "Going forward, I hope the future feels open rather than heavy, and I’m rooting for you.",
    "Going forward, may peace show up in small daily ways.",
    "Going forward, may peace show up in small daily ways — you’ve earned that much.",
    "Going forward, may peace show up in small daily ways, and I’m rooting for you.",
    "For what comes next, I hope you feel as supported as you’ve made others feel.",
    "For what comes next, I hope you feel as supported as you’ve made others feel — you’ve earned that much.",
    "For what comes next, I hope you feel as supported as you’ve made others feel, and I’m rooting for you.",
    "For what comes next, may ease find you more often than pressure.",
    "For what comes next, may ease find you more often than pressure — you’ve earned that much.",
    "For what comes next, may ease find you more often than pressure, and I’m rooting for you.",
    "For what comes next, I hope good things arrive with fair timing.",
    "For what comes next, I hope good things arrive with fair timing — you’ve earned that much.",
    "For what comes next, I hope good things arrive with fair timing, and I’m rooting for you.",
    "For what comes next, may your courage stay practical and your rest guilt-free.",
    "For what comes next, may your courage stay practical and your rest guilt-free — you’ve earned that much.",
    "For what comes next, may your courage stay practical and your rest guilt-free, and I’m rooting for you.",
    "For what comes next, I hope doors open that match your effort.",
    "For what comes next, I hope doors open that match your effort — you’ve earned that much.",
    "For what comes next, I hope doors open that match your effort, and I’m rooting for you.",
    "For what comes next, may friendship keep finding you readily.",
    "For what comes next, may friendship keep finding you readily — you’ve earned that much.",
    "For what comes next, may friendship keep finding you readily, and I’m rooting for you.",
    "For what comes next, I hope you protect the care you give so freely.",
    "For what comes next, I hope you protect the care you give so freely — you’ve earned that much.",
    "For what comes next, I hope you protect the care you give so freely, and I’m rooting for you.",
    "For what comes next, may your days hold room for joy without apology.",
    "For what comes next, may your days hold room for joy without apology — you’ve earned that much.",
    "For what comes next, may your days hold room for joy without apology, and I’m rooting for you.",
    "For what comes next, I hope you keep collecting proof that you matter.",
    "For what comes next, I hope you keep collecting proof that you matter — you’ve earned that much.",
    "For what comes next, I hope you keep collecting proof that you matter, and I’m rooting for you.",
    "For what comes next, may soft landings meet you when you need them.",
    "For what comes next, may soft landings meet you when you need them — you’ve earned that much.",
    "For what comes next, may soft landings meet you when you need them, and I’m rooting for you.",
    "For what comes next, I hope the future feels open rather than heavy.",
    "For what comes next, I hope the future feels open rather than heavy — you’ve earned that much.",
    "For what comes next, I hope the future feels open rather than heavy, and I’m rooting for you.",
    "For what comes next, may peace show up in small daily ways.",
    "For what comes next, may peace show up in small daily ways — you’ve earned that much.",
    "For what comes next, may peace show up in small daily ways, and I’m rooting for you.",
    "In the days ahead, I hope you feel as supported as you’ve made others feel.",
    "In the days ahead, I hope you feel as supported as you’ve made others feel — you’ve earned that much.",
    "In the days ahead, I hope you feel as supported as you’ve made others feel, and I’m rooting for you.",
    "In the days ahead, may ease find you more often than pressure.",
    "In the days ahead, may ease find you more often than pressure — you’ve earned that much.",
    "In the days ahead, may ease find you more often than pressure, and I’m rooting for you.",
    "In the days ahead, I hope good things arrive with fair timing.",
    "In the days ahead, I hope good things arrive with fair timing — you’ve earned that much.",
    "In the days ahead, I hope good things arrive with fair timing, and I’m rooting for you.",
    "In the days ahead, may your courage stay practical and your rest guilt-free.",
    "In the days ahead, may your courage stay practical and your rest guilt-free — you’ve earned that much.",
    "In the days ahead, may your courage stay practical and your rest guilt-free, and I’m rooting for you.",
    "In the days ahead, I hope doors open that match your effort.",
    "In the days ahead, I hope doors open that match your effort — you’ve earned that much.",
    "In the days ahead, I hope doors open that match your effort, and I’m rooting for you.",
    "In the days ahead, may friendship keep finding you readily.",
    "In the days ahead, may friendship keep finding you readily — you’ve earned that much.",
    "In the days ahead, may friendship keep finding you readily, and I’m rooting for you.",
    "In the days ahead, I hope you protect the care you give so freely.",
    "In the days ahead, I hope you protect the care you give so freely — you’ve earned that much.",
    "In the days ahead, I hope you protect the care you give so freely, and I’m rooting for you.",
    "In the days ahead, may your days hold room for joy without apology.",
    "In the days ahead, may your days hold room for joy without apology — you’ve earned that much.",
    "In the days ahead, may your days hold room for joy without apology, and I’m rooting for you.",
    "In the days ahead, I hope you keep collecting proof that you matter.",
    "In the days ahead, I hope you keep collecting proof that you matter — you’ve earned that much.",
    "In the days ahead, I hope you keep collecting proof that you matter, and I’m rooting for you.",
    "In the days ahead, may soft landings meet you when you need them.",
    "In the days ahead, may soft landings meet you when you need them — you’ve earned that much.",
    "In the days ahead, may soft landings meet you when you need them, and I’m rooting for you.",
    "In the days ahead, I hope the future feels open rather than heavy.",
    "In the days ahead, I hope the future feels open rather than heavy — you’ve earned that much.",
    "In the days ahead, I hope the future feels open rather than heavy, and I’m rooting for you.",
    "In the days ahead, may peace show up in small daily ways.",
    "In the days ahead, may peace show up in small daily ways — you’ve earned that much.",
    "In the days ahead, may peace show up in small daily ways, and I’m rooting for you.",
    "Wherever you go from here, I hope you feel as supported as you’ve made others feel.",
    "Wherever you go from here, I hope you feel as supported as you’ve made others feel — you’ve earned that much.",
    "Wherever you go from here, I hope you feel as supported as you’ve made others feel, and I’m rooting for you.",
    "Wherever you go from here, may ease find you more often than pressure.",
    "Wherever you go from here, may ease find you more often than pressure — you’ve earned that much.",
    "Wherever you go from here, may ease find you more often than pressure, and I’m rooting for you.",
    "Wherever you go from here, I hope good things arrive with fair timing.",
    "Wherever you go from here, I hope good things arrive with fair timing — you’ve earned that much.",
    "Wherever you go from here, I hope good things arrive with fair timing, and I’m rooting for you.",
    "Wherever you go from here, may your courage stay practical and your rest guilt-free.",
    "Wherever you go from here, may your courage stay practical and your rest guilt-free — you’ve earned that much.",
    "Wherever you go from here, may your courage stay practical and your rest guilt-free, and I’m rooting for you.",
    "Wherever you go from here, I hope doors open that match your effort.",
    "Wherever you go from here, I hope doors open that match your effort — you’ve earned that much.",
    "Wherever you go from here, I hope doors open that match your effort, and I’m rooting for you.",
    "Wherever you go from here, may friendship keep finding you readily.",
    "Wherever you go from here, may friendship keep finding you readily — you’ve earned that much.",
    "Wherever you go from here, may friendship keep finding you readily, and I’m rooting for you.",
    "Wherever you go from here, I hope you protect the care you give so freely.",
    "Wherever you go from here, I hope you protect the care you give so freely — you’ve earned that much.",
    "Wherever you go from here, I hope you protect the care you give so freely, and I’m rooting for you.",
    "Wherever you go from here, may your days hold room for joy without apology."
  ];

  const EXTRA_EN = [
    "Ordinary hours feel different because of people like you.",
    "If gratitude had a weight, this note would sit heavier than it looks.",
    "This is the short version of a longer thank-you I keep feeling.",
    "You didn’t ask for credit — I’m giving recognition anyway.",
    "Consider this a bookmark in a better day you helped create.",
    "I’m still glad it happened the way it did.",
    "That was human goodness without a speech attached.",
    "Thank you again, in fewer words and the same sincerity.",
    "I’ll leave it here: you mattered in that moment.",
    "A small note for a not-small kindness.",
    "I’m wrapping this with warmth, not formality for its own sake.",
    "Please keep this as proof you were appreciated on purpose.",
    "That’s all — and also everything.",
    "Signed with thanks that aren’t performing.",
    "Consider this gratitude with a spine.",
    "I’m closing the page, not the feeling.",
    "Thanks, plainly — and completely.",
    "No encore needed; the first thank-you was true.",
    "This is me refusing to let appreciation stay silent.",
    "Warmth delivered without spectacle.",
    "A quiet ending for a clear thank-you.",
    "I’ll stop here while the sincerity is still sharp.",
    "With that said: thank you, fully.",
    "Let this stand as a clear, unhurried thank-you.",
    "I’m grateful in a way that doesn’t need decoration.",
    "This note is short; the feeling isn’t.",
    "I’m ending on the same note I began with: thank you.",
    "I’m glad I didn’t leave this unsaid.",
    "A final line for a lasting kindness.",
    "Simple closing, full heart.",
    "I’ll leave it here: you mattered in that moment — fully.",
    "I’ll leave it here: you mattered in that moment, without performance.",
    "I’ll leave it here: the thanks are real.",
    "I’ll leave it here: the thanks are real — fully.",
    "I’ll leave it here: the thanks are real, without performance.",
    "I’ll leave it here: appreciation stays even after the page ends.",
    "I’ll leave it here: appreciation stays even after the page ends — fully.",
    "I’ll leave it here: appreciation stays even after the page ends, without performance.",
    "I’ll leave it here: I’m glad this didn’t stay unsaid.",
    "I’ll leave it here: I’m glad this didn’t stay unsaid — fully.",
    "I’ll leave it here: I’m glad this didn’t stay unsaid, without performance.",
    "I’ll leave it here: gratitude has a permanent place with me.",
    "I’ll leave it here: gratitude has a permanent place with me — fully.",
    "I’ll leave it here: gratitude has a permanent place with me, without performance.",
    "I’ll leave it here: this was worth saying properly.",
    "I’ll leave it here: this was worth saying properly — fully.",
    "I’ll leave it here: this was worth saying properly, without performance.",
    "I’ll leave it here: the kindness counted.",
    "I’ll leave it here: the kindness counted — fully.",
    "I’ll leave it here: the kindness counted, without performance.",
    "I’ll leave it here: thank you remains the whole point.",
    "I’ll leave it here: thank you remains the whole point — fully.",
    "I’ll leave it here: thank you remains the whole point, without performance.",
    "I’ll leave it here: the feeling outlasts the letter.",
    "I’ll leave it here: the feeling outlasts the letter — fully.",
    "I’ll leave it here: the feeling outlasts the letter, without performance.",
    "I’ll leave it here: you were appreciated on purpose.",
    "I’ll leave it here: you were appreciated on purpose — fully.",
    "I’ll leave it here: you were appreciated on purpose, without performance.",
    "I’ll leave it here: sincerity doesn’t need an encore.",
    "I’ll leave it here: sincerity doesn’t need an encore — fully.",
    "I’ll leave it here: sincerity doesn’t need an encore, without performance.",
    "I’ll leave it here: this thank-you has a spine.",
    "I’ll leave it here: this thank-you has a spine — fully.",
    "I’ll leave it here: this thank-you has a spine, without performance.",
    "I’ll leave it here: warmth doesn’t require spectacle.",
    "I’ll leave it here: warmth doesn’t require spectacle — fully.",
    "I’ll leave it here: warmth doesn’t require spectacle, without performance.",
    "I’ll leave it here: I’m closing the page, not the gratitude.",
    "I’ll leave it here: I’m closing the page, not the gratitude — fully.",
    "I’ll leave it here: I’m closing the page, not the gratitude, without performance.",
    "I’ll leave it here: the good you did won’t go unnamed.",
    "I’ll leave it here: the good you did won’t go unnamed — fully.",
    "I’ll leave it here: the good you did won’t go unnamed, without performance.",
    "I’ll leave it here: I’m leaving the thanks intact.",
    "I’ll leave it here: I’m leaving the thanks intact — fully.",
    "I’ll leave it here: I’m leaving the thanks intact, without performance.",
    "I’ll leave it here: this ends gently and completely.",
    "I’ll leave it here: this ends gently and completely — fully.",
    "I’ll leave it here: this ends gently and completely, without performance.",
    "I’ll leave it here: gratitude is stored, not spent.",
    "I’ll leave it here: gratitude is stored, not spent — fully.",
    "I’ll leave it here: gratitude is stored, not spent, without performance.",
    "In short, you mattered in that moment.",
    "In short, you mattered in that moment — fully.",
    "In short, you mattered in that moment, without performance.",
    "In short, the thanks are real.",
    "In short, the thanks are real — fully.",
    "In short, the thanks are real, without performance.",
    "In short, appreciation stays even after the page ends.",
    "In short, appreciation stays even after the page ends — fully.",
    "In short, appreciation stays even after the page ends, without performance.",
    "In short, I’m glad this didn’t stay unsaid.",
    "In short, I’m glad this didn’t stay unsaid — fully.",
    "In short, I’m glad this didn’t stay unsaid, without performance.",
    "In short, gratitude has a permanent place with me.",
    "In short, gratitude has a permanent place with me — fully.",
    "In short, gratitude has a permanent place with me, without performance.",
    "In short, this was worth saying properly.",
    "In short, this was worth saying properly — fully.",
    "In short, this was worth saying properly, without performance.",
    "In short, the kindness counted.",
    "In short, the kindness counted — fully.",
    "In short, the kindness counted, without performance.",
    "In short, thank you remains the whole point.",
    "In short, thank you remains the whole point — fully.",
    "In short, thank you remains the whole point, without performance.",
    "In short, the feeling outlasts the letter.",
    "In short, the feeling outlasts the letter — fully.",
    "In short, the feeling outlasts the letter, without performance.",
    "In short, you were appreciated on purpose.",
    "In short, you were appreciated on purpose — fully.",
    "In short, you were appreciated on purpose, without performance.",
    "In short, sincerity doesn’t need an encore.",
    "In short, sincerity doesn’t need an encore — fully.",
    "In short, sincerity doesn’t need an encore, without performance.",
    "In short, this thank-you has a spine.",
    "In short, this thank-you has a spine — fully.",
    "In short, this thank-you has a spine, without performance.",
    "In short, warmth doesn’t require spectacle.",
    "In short, warmth doesn’t require spectacle — fully.",
    "In short, warmth doesn’t require spectacle, without performance.",
    "In short, I’m closing the page, not the gratitude.",
    "In short, I’m closing the page, not the gratitude — fully.",
    "In short, I’m closing the page, not the gratitude, without performance.",
    "In short, the good you did won’t go unnamed.",
    "In short, the good you did won’t go unnamed — fully.",
    "In short, the good you did won’t go unnamed, without performance.",
    "In short, I’m leaving the thanks intact.",
    "In short, I’m leaving the thanks intact — fully.",
    "In short, I’m leaving the thanks intact, without performance.",
    "In short, this ends gently and completely.",
    "In short, this ends gently and completely — fully.",
    "In short, this ends gently and completely, without performance.",
    "In short, gratitude is stored, not spent.",
    "In short, gratitude is stored, not spent — fully.",
    "In short, gratitude is stored, not spent, without performance.",
    "Simply put, you mattered in that moment.",
    "Simply put, you mattered in that moment — fully.",
    "Simply put, you mattered in that moment, without performance.",
    "Simply put, the thanks are real.",
    "Simply put, the thanks are real — fully.",
    "Simply put, the thanks are real, without performance.",
    "Simply put, appreciation stays even after the page ends.",
    "Simply put, appreciation stays even after the page ends — fully.",
    "Simply put, appreciation stays even after the page ends, without performance.",
    "Simply put, I’m glad this didn’t stay unsaid.",
    "Simply put, I’m glad this didn’t stay unsaid — fully.",
    "Simply put, I’m glad this didn’t stay unsaid, without performance.",
    "Simply put, gratitude has a permanent place with me.",
    "Simply put, gratitude has a permanent place with me — fully.",
    "Simply put, gratitude has a permanent place with me, without performance.",
    "Simply put, this was worth saying properly.",
    "Simply put, this was worth saying properly — fully.",
    "Simply put, this was worth saying properly, without performance.",
    "Simply put, the kindness counted.",
    "Simply put, the kindness counted — fully.",
    "Simply put, the kindness counted, without performance.",
    "Simply put, thank you remains the whole point.",
    "Simply put, thank you remains the whole point — fully.",
    "Simply put, thank you remains the whole point, without performance.",
    "Simply put, the feeling outlasts the letter.",
    "Simply put, the feeling outlasts the letter — fully.",
    "Simply put, the feeling outlasts the letter, without performance.",
    "Simply put, you were appreciated on purpose.",
    "Simply put, you were appreciated on purpose — fully.",
    "Simply put, you were appreciated on purpose, without performance.",
    "Simply put, sincerity doesn’t need an encore.",
    "Simply put, sincerity doesn’t need an encore — fully.",
    "Simply put, sincerity doesn’t need an encore, without performance.",
    "Simply put, this thank-you has a spine.",
    "Simply put, this thank-you has a spine — fully.",
    "Simply put, this thank-you has a spine, without performance.",
    "Simply put, warmth doesn’t require spectacle.",
    "Simply put, warmth doesn’t require spectacle — fully.",
    "Simply put, warmth doesn’t require spectacle, without performance.",
    "Simply put, I’m closing the page, not the gratitude.",
    "Simply put, I’m closing the page, not the gratitude — fully.",
    "Simply put, I’m closing the page, not the gratitude, without performance.",
    "Simply put, the good you did won’t go unnamed.",
    "Simply put, the good you did won’t go unnamed — fully.",
    "Simply put, the good you did won’t go unnamed, without performance.",
    "Simply put, I’m leaving the thanks intact.",
    "Simply put, I’m leaving the thanks intact — fully.",
    "Simply put, I’m leaving the thanks intact, without performance.",
    "Simply put, this ends gently and completely.",
    "Simply put, this ends gently and completely — fully.",
    "Simply put, this ends gently and completely, without performance.",
    "Simply put, gratitude is stored, not spent.",
    "Simply put, gratitude is stored, not spent — fully.",
    "Simply put, gratitude is stored, not spent, without performance.",
    "Before I close, you mattered in that moment.",
    "Before I close, you mattered in that moment — fully.",
    "Before I close, you mattered in that moment, without performance.",
    "Before I close, the thanks are real.",
    "Before I close, the thanks are real — fully.",
    "Before I close, the thanks are real, without performance.",
    "Before I close, appreciation stays even after the page ends.",
    "Before I close, appreciation stays even after the page ends — fully.",
    "Before I close, appreciation stays even after the page ends, without performance."
  ];

  const LONG_ADD_EN = [
    "I’m glad these words have a lasting place.",
    "It felt right to give this gratitude more room.",
    "I wanted the thanks to breathe a little longer on the page.",
    "There’s more feeling here than a short line can hold — so I kept going.",
    "I hope the extra lines make the sincerity clearer, not heavier.",
    "I’m adding this because a brief nod didn’t feel like enough.",
    "Consider this the longer cut of the same true thank-you.",
    "I lingered on the page because the gratitude lingered in me.",
    "Extra words, same honesty.",
    "I wanted you to feel the thanks without rushing past them.",
    "This length is intentional — the feeling asked for it.",
    "I’m stretching the note so the appreciation can settle.",
    "A little more space for a not-small kindness.",
    "I kept writing because stopping felt unfinished.",
    "May the added lines read as care, not obligation.",
    "I chose the longer form so nothing important stayed vague.",
    "There’s quiet detail in gratitude; I wanted room for it.",
    "I’m glad I didn’t compress this into a single polite sentence.",
    "The longer shape fits how much it mattered.",
    "I hope you read the extra length as warmth, not weight.",
    "I’m leaving more of the thank-you visible on purpose.",
    "A fuller page for a fuller feeling.",
    "I wanted the gratitude to have a second breath.",
    "This is me refusing to hurry past what counted.",
    "I added these lines so the thanks wouldn’t feel skimmed.",
    "More words, less rush.",
    "I hope the length matches the steadiness of what you gave.",
    "I’m taking my time here because you took care seriously.",
    "Let the longer note stand for a longer-held thank-you.",
    "I kept the door open a little longer on this gratitude.",
    "Extra paragraph, same core: thank you.",
    "I wanted space enough to be specific and kind.",
    "The feeling didn’t fit in the short version — so here we are.",
    "I’m glad I gave this thank-you room to speak.",
    "Consider the added lines a second handshake.",
    "I stayed on the page because the appreciation deserved it.",
    "A longer note for a lasting impression you left.",
    "I hope this reads as unhurried gratitude.",
    "I’m filling a little more paper with a feeling that wouldn’t shrink.",
    "Extra care in the wording, because the care you gave was real.",
    "I wanted the thank-you to feel complete when you reached the end.",
    "This length is just honesty with more oxygen.",
    "I’m glad I didn’t edit the warmth out for brevity.",
    "A few more sentences so the gratitude can land fully.",
    "I kept going until the thank-you felt settled.",
    "May these added words travel with you a while.",
    "I chose not to rush the ending.",
    "Longer form, clearer heart.",
    "I’m leaving a wider margin around the thanks.",
    "This is the gratitude with the volume turned up — gently."
  ];

  const SUPPORT_PARTS_EN = {
    a: [
      "Looking back,",
      "Even now,",
      "If I’m honest,",
      "In quieter hours,",
      "After everything,",
      "Truthfully,",
      "Still,",
      "On reflection,",
      "To put it simply,",
      "Without exaggeration,",
      "Day by day,",
      "Long after,",
      "Whenever I remember it,",
      "From where I stand,",
      "At the center of it,"
    ],
    b: [
      "your care felt exact",
      "your help changed the day",
      "I felt less alone because of you",
      "the kindness had a clear shape",
      "your timing mattered as much as the gesture",
      "I noticed how carefully you showed up",
      "the support arrived without drama",
      "you made a hard stretch bearable",
      "I felt seen rather than handled",
      "your presence rearranged what seemed stuck",
      "you answered a need without awkwardness",
      "you left dignity intact while you helped",
      "you restored a bit of ease I had misplaced",
      "you stayed when drifting would have been easier",
      "you made the next step possible"
    ],
    c: [
      "and it mattered.",
      "and I’m grateful.",
      "and I want you to know.",
      "and it still sits with me.",
      "and that is why I’m saying so.",
      "and it counted.",
      "and I mean that without decoration.",
      "and I won’t let it blur away.",
      "and I’m better for it.",
      "and thank you for that."
    ],
  };

  const FORWARD_PARTS_EN = {
    a: [
      "Going forward,",
      "For what comes next,",
      "In the days ahead,",
      "Wherever you go from here,",
      "As the next chapter opens,",
      "On the path ahead,",
      "Through the next season,",
      "As you keep building,",
      "From here on,",
      "Along the way,"
    ],
    b: [
      "I hope you feel as supported as you’ve made others feel",
      "may ease find you more often than pressure",
      "I hope good things arrive with fair timing",
      "may your courage stay practical and your rest guilt-free",
      "I hope doors open that match your effort",
      "may friendship keep finding you readily",
      "I hope you protect the care you give so freely",
      "may your days hold room for joy without apology",
      "I hope you keep collecting proof that you matter",
      "may soft landings meet you when you need them",
      "I hope the future feels open rather than heavy",
      "may peace show up in small daily ways"
    ],
    c: [
      ".",
      " — you’ve earned that much.",
      ", and I’m rooting for you.",
      " without losing who you are.",
      ", one ordinary day at a time."
    ],
  };

  const EXTRA_PARTS_EN = {
    a: [
      "I’ll leave it here:",
      "In short,",
      "Simply put,",
      "Before I close,",
      "One last line:",
      "To end clearly,",
      "Without flourish,",
      "All that said,",
      "Finally,",
      "On that note,",
      "With that,",
      "For the record,",
      "Quietly,",
      "Plainly,",
      "In closing,",
      "Truly,"
    ],
    b: [
      "you mattered in that moment",
      "the thanks are real",
      "appreciation stays even after the page ends",
      "I’m glad this didn’t stay unsaid",
      "gratitude has a permanent place with me",
      "this was worth saying properly",
      "the kindness counted",
      "thank you remains the whole point",
      "the feeling outlasts the letter",
      "you were appreciated on purpose",
      "sincerity doesn’t need an encore",
      "this thank-you has a spine",
      "warmth doesn’t require spectacle",
      "I’m closing the page, not the gratitude",
      "the good you did won’t go unnamed",
      "I’m leaving the thanks intact",
      "this ends gently and completely",
      "gratitude is stored, not spent"
    ],
    c: [
      ".",
      " — fully.",
      ", without performance.",
      ", and that’s enough.",
      " for keeps.",
      ", clearly.",
      " on purpose.",
      ", sincerely."
    ],
  };

  const SUPPORT_FA = [
    "آنچه برایم مانده بلند نبود — ثابت بود و مهم.",
    "هر بار آن لحظه را به یاد می‌آورم، سپاس تازه‌ای می‌آید.",
    "از بیرون شاید کوچک به نظر می‌رسید، اما برای من عمیق نشست.",
    "به‌خاطر کاری که کردی، ساعت‌های معمولی سبک‌تر و روشن‌تر شد.",
    "مراقبتی مثل مال تو در جزئیات دیده می‌شود — و من دیدم.",
    "هنوز از فکر، زمان‌بندی و اثرش تحت تأثیرم.",
    "این جور مهربانی دنبال اعتبار نیست — فقط روز را عوض می‌کند.",
    "نمی‌خواهم جزئیاتش در یک تشکر مبهم گم شود.",
    "جایی برای ثبات ساختی که می‌توانست تیز باشد.",
    "قدردانی‌ام دقیق است، نه مؤدبانه و خالی.",
    "فرقی که گذاشتی هم عملی بود هم انسانی.",
    "حس حمایت، دیده‌شدن و کمترتنهایی را مدیون توام.",
    "آن حرکت وزن داشت — از نوع خوبش.",
    "خاطره‌اش را با سپاس واقعی با خودم دارم.",
    "یک بازه سخت را قابل تحمل کردی.",
    "کمک خیلی وقت‌ها این‌قدر تمیز نمی‌رسد. مال تو رسید.",
    "امیدوارم حس کنی از طرف من چقدر ارزشمند بود.",
    "لطفاً بدان کامل ثبت شد پیش من.",
    "به‌خاطر آنچه از تو گرفتم، بهترم.",
    "ممنون که طوری حاضر شدی که به حساب آمد.",
    "آرامش را جایی آوردی که لازم بود.",
    "حس کردم از روی مراقبت انتخاب شدم، نه از روی وظیفه.",
    "وفاداری‌ات هم معمولی به نظر می‌رسید هم فوق‌العاده.",
    "خوبی را نام می‌برم تا در پس‌زمینه محو نشود.",
    "صداقتت به اندازه مهربانی‌ات کمک کرد.",
    "چون بودی، به آن لحظه بیشتر اعتماد کردم.",
    "ممنون که ماندی وقتی رفتن آسان‌تر بود.",
    "حضور آوردی، نه نمایش.",
    "آن حمایت لبه تیز نداشت — فقط وضوح.",
    "از شجاعت آرامِ کمکت سپاس‌گزارم.",
    "یادم آوردی که شناخته‌شدن می‌تواند امن باشد.",
    "دمای روز به‌خاطر بودنت عوض شد.",
    "ممنون که تا آخر گوش دادی.",
    "آنچه مهم بود را کوچک نکردی؛ با آن روبه‌رو شدی.",
    "اثبات مراقبتِ بادقت را نگه می‌دارم.",
    "شوخ‌طبعی‌ات چیزی را که می‌توانست سخت بماند نرم کرد.",
    "ممنون بابت پیگیری، نه فقط حرکت اول.",
    "تعلق را کمتر تئوری کردی.",
    "کمترم عجله داشتم «خوب باشم» — بیشتر اجازه انسان بودن داشتم.",
    "این لطف بود در شکل عملی.",
    "با نگاه به گذشته، مراقبتت دقیق حس شد و مهم بود.",
    "با نگاه به گذشته، مراقبتت دقیق حس شد و سپاس‌گزارم.",
    "با نگاه به گذشته، مراقبتت دقیق حس شد و می‌خواهم بدانی.",
    "با نگاه به گذشته، کمکت دمای روز را عوض کرد و مهم بود.",
    "با نگاه به گذشته، کمکت دمای روز را عوض کرد و سپاس‌گزارم.",
    "با نگاه به گذشته، کمکت دمای روز را عوض کرد و می‌خواهم بدانی.",
    "با نگاه به گذشته، به‌خاطر تو کمتر تنها بودم و مهم بود.",
    "با نگاه به گذشته، به‌خاطر تو کمتر تنها بودم و سپاس‌گزارم.",
    "با نگاه به گذشته، به‌خاطر تو کمتر تنها بودم و می‌خواهم بدانی.",
    "با نگاه به گذشته، مهربانی شکل روشن داشت و مهم بود.",
    "با نگاه به گذشته، مهربانی شکل روشن داشت و سپاس‌گزارم.",
    "با نگاه به گذشته، مهربانی شکل روشن داشت و می‌خواهم بدانی.",
    "با نگاه به گذشته، زمان‌بندی‌ات هم مهم بود و مهم بود.",
    "با نگاه به گذشته، زمان‌بندی‌ات هم مهم بود و سپاس‌گزارم.",
    "با نگاه به گذشته، زمان‌بندی‌ات هم مهم بود و می‌خواهم بدانی.",
    "با نگاه به گذشته، دیدم چقدر بادقت حاضر شدی و مهم بود.",
    "با نگاه به گذشته، دیدم چقدر بادقت حاضر شدی و سپاس‌گزارم.",
    "با نگاه به گذشته، دیدم چقدر بادقت حاضر شدی و می‌خواهم بدانی.",
    "با نگاه به گذشته، حمایت بدون هیاهو رسید و مهم بود.",
    "با نگاه به گذشته، حمایت بدون هیاهو رسید و سپاس‌گزارم.",
    "با نگاه به گذشته، حمایت بدون هیاهو رسید و می‌خواهم بدانی.",
    "با نگاه به گذشته، یک بازه سخت را قابل تحمل کردی و مهم بود.",
    "با نگاه به گذشته، یک بازه سخت را قابل تحمل کردی و سپاس‌گزارم.",
    "با نگاه به گذشته، یک بازه سخت را قابل تحمل کردی و می‌خواهم بدانی.",
    "با نگاه به گذشته، دیده‌شدم، نه مدیریت و مهم بود.",
    "با نگاه به گذشته، دیده‌شدم، نه مدیریت و سپاس‌گزارم.",
    "با نگاه به گذشته، دیده‌شدم، نه مدیریت و می‌خواهم بدانی.",
    "با نگاه به گذشته، قدم بعدی را ممکن کردی و مهم بود.",
    "با نگاه به گذشته، قدم بعدی را ممکن کردی و سپاس‌گزارم.",
    "با نگاه به گذشته، قدم بعدی را ممکن کردی و می‌خواهم بدانی.",
    "با نگاه به گذشته، عزت را حین کمک حفظ کردی و مهم بود.",
    "با نگاه به گذشته، عزت را حین کمک حفظ کردی و سپاس‌گزارم.",
    "با نگاه به گذشته، عزت را حین کمک حفظ کردی و می‌خواهم بدانی.",
    "با نگاه به گذشته، کمی از آسودگی گم‌شده را برگرداندی و مهم بود.",
    "با نگاه به گذشته، کمی از آسودگی گم‌شده را برگرداندی و سپاس‌گزارم.",
    "با نگاه به گذشته، کمی از آسودگی گم‌شده را برگرداندی و می‌خواهم بدانی.",
    "با نگاه به گذشته، ماندی وقتی رفتن آسان‌تر بود و مهم بود.",
    "با نگاه به گذشته، ماندی وقتی رفتن آسان‌تر بود و سپاس‌گزارم.",
    "با نگاه به گذشته، ماندی وقتی رفتن آسان‌تر بود و می‌خواهم بدانی.",
    "با نگاه به گذشته، حضور آوردی، نه نمایش و مهم بود.",
    "با نگاه به گذشته، حضور آوردی، نه نمایش و سپاس‌گزارم.",
    "با نگاه به گذشته، حضور آوردی، نه نمایش و می‌خواهم بدانی.",
    "با نگاه به گذشته، مراقبتت در جزئیات دیده شد و مهم بود.",
    "با نگاه به گذشته، مراقبتت در جزئیات دیده شد و سپاس‌گزارم.",
    "با نگاه به گذشته، مراقبتت در جزئیات دیده شد و می‌خواهم بدانی.",
    "حتی حالا، مراقبتت دقیق حس شد و مهم بود.",
    "حتی حالا، مراقبتت دقیق حس شد و سپاس‌گزارم.",
    "حتی حالا، مراقبتت دقیق حس شد و می‌خواهم بدانی.",
    "حتی حالا، کمکت دمای روز را عوض کرد و مهم بود.",
    "حتی حالا، کمکت دمای روز را عوض کرد و سپاس‌گزارم.",
    "حتی حالا، کمکت دمای روز را عوض کرد و می‌خواهم بدانی.",
    "حتی حالا، به‌خاطر تو کمتر تنها بودم و مهم بود.",
    "حتی حالا، به‌خاطر تو کمتر تنها بودم و سپاس‌گزارم.",
    "حتی حالا، به‌خاطر تو کمتر تنها بودم و می‌خواهم بدانی.",
    "حتی حالا، مهربانی شکل روشن داشت و مهم بود.",
    "حتی حالا، مهربانی شکل روشن داشت و سپاس‌گزارم.",
    "حتی حالا، مهربانی شکل روشن داشت و می‌خواهم بدانی.",
    "حتی حالا، زمان‌بندی‌ات هم مهم بود و مهم بود.",
    "حتی حالا، زمان‌بندی‌ات هم مهم بود و سپاس‌گزارم.",
    "حتی حالا، زمان‌بندی‌ات هم مهم بود و می‌خواهم بدانی.",
    "حتی حالا، دیدم چقدر بادقت حاضر شدی و مهم بود.",
    "حتی حالا، دیدم چقدر بادقت حاضر شدی و سپاس‌گزارم.",
    "حتی حالا، دیدم چقدر بادقت حاضر شدی و می‌خواهم بدانی.",
    "حتی حالا، حمایت بدون هیاهو رسید و مهم بود.",
    "حتی حالا، حمایت بدون هیاهو رسید و سپاس‌گزارم.",
    "حتی حالا، حمایت بدون هیاهو رسید و می‌خواهم بدانی.",
    "حتی حالا، یک بازه سخت را قابل تحمل کردی و مهم بود.",
    "حتی حالا، یک بازه سخت را قابل تحمل کردی و سپاس‌گزارم.",
    "حتی حالا، یک بازه سخت را قابل تحمل کردی و می‌خواهم بدانی.",
    "حتی حالا، دیده‌شدم، نه مدیریت و مهم بود.",
    "حتی حالا، دیده‌شدم، نه مدیریت و سپاس‌گزارم.",
    "حتی حالا، دیده‌شدم، نه مدیریت و می‌خواهم بدانی.",
    "حتی حالا، قدم بعدی را ممکن کردی و مهم بود.",
    "حتی حالا، قدم بعدی را ممکن کردی و سپاس‌گزارم.",
    "حتی حالا، قدم بعدی را ممکن کردی و می‌خواهم بدانی.",
    "حتی حالا، عزت را حین کمک حفظ کردی و مهم بود.",
    "حتی حالا، عزت را حین کمک حفظ کردی و سپاس‌گزارم.",
    "حتی حالا، عزت را حین کمک حفظ کردی و می‌خواهم بدانی.",
    "حتی حالا، کمی از آسودگی گم‌شده را برگرداندی و مهم بود.",
    "حتی حالا، کمی از آسودگی گم‌شده را برگرداندی و سپاس‌گزارم.",
    "حتی حالا، کمی از آسودگی گم‌شده را برگرداندی و می‌خواهم بدانی.",
    "حتی حالا، ماندی وقتی رفتن آسان‌تر بود و مهم بود.",
    "حتی حالا، ماندی وقتی رفتن آسان‌تر بود و سپاس‌گزارم.",
    "حتی حالا، ماندی وقتی رفتن آسان‌تر بود و می‌خواهم بدانی.",
    "حتی حالا، حضور آوردی، نه نمایش و مهم بود.",
    "حتی حالا، حضور آوردی، نه نمایش و سپاس‌گزارم.",
    "حتی حالا، حضور آوردی، نه نمایش و می‌خواهم بدانی.",
    "حتی حالا، مراقبتت در جزئیات دیده شد و مهم بود.",
    "حتی حالا، مراقبتت در جزئیات دیده شد و سپاس‌گزارم.",
    "حتی حالا، مراقبتت در جزئیات دیده شد و می‌خواهم بدانی.",
    "اگر صادق باشم، مراقبتت دقیق حس شد و مهم بود.",
    "اگر صادق باشم، مراقبتت دقیق حس شد و سپاس‌گزارم.",
    "اگر صادق باشم، مراقبتت دقیق حس شد و می‌خواهم بدانی.",
    "اگر صادق باشم، کمکت دمای روز را عوض کرد و مهم بود.",
    "اگر صادق باشم، کمکت دمای روز را عوض کرد و سپاس‌گزارم.",
    "اگر صادق باشم، کمکت دمای روز را عوض کرد و می‌خواهم بدانی.",
    "اگر صادق باشم، به‌خاطر تو کمتر تنها بودم و مهم بود.",
    "اگر صادق باشم، به‌خاطر تو کمتر تنها بودم و سپاس‌گزارم.",
    "اگر صادق باشم، به‌خاطر تو کمتر تنها بودم و می‌خواهم بدانی.",
    "اگر صادق باشم، مهربانی شکل روشن داشت و مهم بود.",
    "اگر صادق باشم، مهربانی شکل روشن داشت و سپاس‌گزارم.",
    "اگر صادق باشم، مهربانی شکل روشن داشت و می‌خواهم بدانی.",
    "اگر صادق باشم، زمان‌بندی‌ات هم مهم بود و مهم بود.",
    "اگر صادق باشم، زمان‌بندی‌ات هم مهم بود و سپاس‌گزارم.",
    "اگر صادق باشم، زمان‌بندی‌ات هم مهم بود و می‌خواهم بدانی.",
    "اگر صادق باشم، دیدم چقدر بادقت حاضر شدی و مهم بود.",
    "اگر صادق باشم، دیدم چقدر بادقت حاضر شدی و سپاس‌گزارم.",
    "اگر صادق باشم، دیدم چقدر بادقت حاضر شدی و می‌خواهم بدانی.",
    "اگر صادق باشم، حمایت بدون هیاهو رسید و مهم بود.",
    "اگر صادق باشم، حمایت بدون هیاهو رسید و سپاس‌گزارم.",
    "اگر صادق باشم، حمایت بدون هیاهو رسید و می‌خواهم بدانی.",
    "اگر صادق باشم، یک بازه سخت را قابل تحمل کردی و مهم بود.",
    "اگر صادق باشم، یک بازه سخت را قابل تحمل کردی و سپاس‌گزارم.",
    "اگر صادق باشم، یک بازه سخت را قابل تحمل کردی و می‌خواهم بدانی.",
    "اگر صادق باشم، دیده‌شدم، نه مدیریت و مهم بود.",
    "اگر صادق باشم، دیده‌شدم، نه مدیریت و سپاس‌گزارم.",
    "اگر صادق باشم، دیده‌شدم، نه مدیریت و می‌خواهم بدانی.",
    "اگر صادق باشم، قدم بعدی را ممکن کردی و مهم بود.",
    "اگر صادق باشم، قدم بعدی را ممکن کردی و سپاس‌گزارم.",
    "اگر صادق باشم، قدم بعدی را ممکن کردی و می‌خواهم بدانی.",
    "اگر صادق باشم، عزت را حین کمک حفظ کردی و مهم بود.",
    "اگر صادق باشم، عزت را حین کمک حفظ کردی و سپاس‌گزارم.",
    "اگر صادق باشم، عزت را حین کمک حفظ کردی و می‌خواهم بدانی.",
    "اگر صادق باشم، کمی از آسودگی گم‌شده را برگرداندی و مهم بود.",
    "اگر صادق باشم، کمی از آسودگی گم‌شده را برگرداندی و سپاس‌گزارم.",
    "اگر صادق باشم، کمی از آسودگی گم‌شده را برگرداندی و می‌خواهم بدانی.",
    "اگر صادق باشم، ماندی وقتی رفتن آسان‌تر بود و مهم بود.",
    "اگر صادق باشم، ماندی وقتی رفتن آسان‌تر بود و سپاس‌گزارم.",
    "اگر صادق باشم، ماندی وقتی رفتن آسان‌تر بود و می‌خواهم بدانی.",
    "اگر صادق باشم، حضور آوردی، نه نمایش و مهم بود.",
    "اگر صادق باشم، حضور آوردی، نه نمایش و سپاس‌گزارم.",
    "اگر صادق باشم، حضور آوردی، نه نمایش و می‌خواهم بدانی.",
    "اگر صادق باشم، مراقبتت در جزئیات دیده شد و مهم بود.",
    "اگر صادق باشم، مراقبتت در جزئیات دیده شد و سپاس‌گزارم.",
    "اگر صادق باشم، مراقبتت در جزئیات دیده شد و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، مراقبتت دقیق حس شد و مهم بود.",
    "در ساعت‌های خلوت، مراقبتت دقیق حس شد و سپاس‌گزارم.",
    "در ساعت‌های خلوت، مراقبتت دقیق حس شد و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، کمکت دمای روز را عوض کرد و مهم بود.",
    "در ساعت‌های خلوت، کمکت دمای روز را عوض کرد و سپاس‌گزارم.",
    "در ساعت‌های خلوت، کمکت دمای روز را عوض کرد و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، به‌خاطر تو کمتر تنها بودم و مهم بود.",
    "در ساعت‌های خلوت، به‌خاطر تو کمتر تنها بودم و سپاس‌گزارم.",
    "در ساعت‌های خلوت، به‌خاطر تو کمتر تنها بودم و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، مهربانی شکل روشن داشت و مهم بود.",
    "در ساعت‌های خلوت، مهربانی شکل روشن داشت و سپاس‌گزارم.",
    "در ساعت‌های خلوت، مهربانی شکل روشن داشت و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، زمان‌بندی‌ات هم مهم بود و مهم بود.",
    "در ساعت‌های خلوت، زمان‌بندی‌ات هم مهم بود و سپاس‌گزارم.",
    "در ساعت‌های خلوت، زمان‌بندی‌ات هم مهم بود و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، دیدم چقدر بادقت حاضر شدی و مهم بود.",
    "در ساعت‌های خلوت، دیدم چقدر بادقت حاضر شدی و سپاس‌گزارم.",
    "در ساعت‌های خلوت، دیدم چقدر بادقت حاضر شدی و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، حمایت بدون هیاهو رسید و مهم بود.",
    "در ساعت‌های خلوت، حمایت بدون هیاهو رسید و سپاس‌گزارم.",
    "در ساعت‌های خلوت، حمایت بدون هیاهو رسید و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، یک بازه سخت را قابل تحمل کردی و مهم بود.",
    "در ساعت‌های خلوت، یک بازه سخت را قابل تحمل کردی و سپاس‌گزارم.",
    "در ساعت‌های خلوت، یک بازه سخت را قابل تحمل کردی و می‌خواهم بدانی.",
    "در ساعت‌های خلوت، دیده‌شدم، نه مدیریت و مهم بود."
  ];

  const FORWARD_FA = [
    "ادامه بده — حتی در روزهای آرام داری چیز خوبی می‌سازی.",
    "هرچه پیش بیاید، امیدوارم با اعتماد به‌نفسی بروی که حقش را داری.",
    "امیدوارم جاده پیش‌رو کمی مهربان‌تر باشد.",
    "همان مراقبتی را که می‌دهی، از خودت هم دریغ نکن.",
    "به ساعت‌های معمولی بیشتری که با بودن تو بهتر می‌شوند.",
    "این را سوخت بگیر نه فشار: همین حالا هم فرق می‌گذاری.",
    "امیدوارم چیزهای خوب با همان زمان‌بندی که به دیگران دادی، به تو هم برسند.",
    "اثبات این را با خود ببر که حضورت مهم است.",
    "امیدوارم به اندازه حمایتت از دیگران، حمایت ببینی.",
    "به پیش — با ثبات، و هرجا که جا دارد با شادی.",
    "امیدوارم دوستی همان‌قدر که می‌دهی، پیدایت کند.",
    "امیدوارم اطرافیان همان‌طور که تو دیگران را می‌بینی، تو را ببینند.",
    "خنده‌ای برایت می‌خواهم که بی‌دلیل هم برسد.",
    "فصل بعد به اندازه نیازت جا داشته باشد.",
    "نرمی‌ات را نگه دار؛ ضعف نیست.",
    "امیدوارم استراحت مجاز باشد، نه فقط بعد از سختی زیاد.",
    "هم‌نشینی خوب نزدیک بماند و شلوغی دور.",
    "به مسیرهایی که مال خودت باشد، نه قرضی.",
    "امیدوارم مدارک بیشتری جمع کنی از اینکه مهم هستی.",
    "شجاعت در اندازه‌های قابل استفاده سراغت بیاید.",
    "از این به بعد، امیدوارم به اندازه حمایتت، حمایت ببینی.",
    "از این به بعد، امیدوارم به اندازه حمایتت، حمایت ببینی — حقش را داری.",
    "از این به بعد، امیدوارم به اندازه حمایتت، حمایت ببینی ، و من برایت دعا می‌کنم.",
    "از این به بعد، آسودگی بیش از فشار سراغت بیاید.",
    "از این به بعد، آسودگی بیش از فشار سراغت بیاید — حقش را داری.",
    "از این به بعد، آسودگی بیش از فشار سراغت بیاید ، و من برایت دعا می‌کنم.",
    "از این به بعد، چیزهای خوب با زمان‌بندی منصف برسند.",
    "از این به بعد، چیزهای خوب با زمان‌بندی منصف برسند — حقش را داری.",
    "از این به بعد، چیزهای خوب با زمان‌بندی منصف برسند ، و من برایت دعا می‌کنم.",
    "از این به بعد، درهایی باز شوند که با تلاشت جور باشند.",
    "از این به بعد، درهایی باز شوند که با تلاشت جور باشند — حقش را داری.",
    "از این به بعد، درهایی باز شوند که با تلاشت جور باشند ، و من برایت دعا می‌کنم.",
    "از این به بعد، دوستی همان‌قدر که می‌دهی پیدایت کند.",
    "از این به بعد، دوستی همان‌قدر که می‌دهی پیدایت کند — حقش را داری.",
    "از این به بعد، دوستی همان‌قدر که می‌دهی پیدایت کند ، و من برایت دعا می‌کنم.",
    "از این به بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده.",
    "از این به بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده — حقش را داری.",
    "از این به بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده ، و من برایت دعا می‌کنم.",
    "از این به بعد، نرمی‌ات را نگه دار.",
    "از این به بعد، نرمی‌ات را نگه دار — حقش را داری.",
    "از این به بعد، نرمی‌ات را نگه دار ، و من برایت دعا می‌کنم.",
    "از این به بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید.",
    "از این به بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید — حقش را داری.",
    "از این به بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید ، و من برایت دعا می‌کنم.",
    "در روزهای پیش‌رو، امیدوارم به اندازه حمایتت، حمایت ببینی.",
    "در روزهای پیش‌رو، امیدوارم به اندازه حمایتت، حمایت ببینی — حقش را داری.",
    "در روزهای پیش‌رو، امیدوارم به اندازه حمایتت، حمایت ببینی ، و من برایت دعا می‌کنم.",
    "در روزهای پیش‌رو، آسودگی بیش از فشار سراغت بیاید.",
    "در روزهای پیش‌رو، آسودگی بیش از فشار سراغت بیاید — حقش را داری.",
    "در روزهای پیش‌رو، آسودگی بیش از فشار سراغت بیاید ، و من برایت دعا می‌کنم.",
    "در روزهای پیش‌رو، چیزهای خوب با زمان‌بندی منصف برسند.",
    "در روزهای پیش‌رو، چیزهای خوب با زمان‌بندی منصف برسند — حقش را داری.",
    "در روزهای پیش‌رو، چیزهای خوب با زمان‌بندی منصف برسند ، و من برایت دعا می‌کنم.",
    "در روزهای پیش‌رو، درهایی باز شوند که با تلاشت جور باشند.",
    "در روزهای پیش‌رو، درهایی باز شوند که با تلاشت جور باشند — حقش را داری.",
    "در روزهای پیش‌رو، درهایی باز شوند که با تلاشت جور باشند ، و من برایت دعا می‌کنم.",
    "در روزهای پیش‌رو، دوستی همان‌قدر که می‌دهی پیدایت کند.",
    "در روزهای پیش‌رو، دوستی همان‌قدر که می‌دهی پیدایت کند — حقش را داری.",
    "در روزهای پیش‌رو، دوستی همان‌قدر که می‌دهی پیدایت کند ، و من برایت دعا می‌کنم.",
    "در روزهای پیش‌رو، استراحتت مجاز باشد نه فقط سخت‌رسیده.",
    "در روزهای پیش‌رو، استراحتت مجاز باشد نه فقط سخت‌رسیده — حقش را داری.",
    "در روزهای پیش‌رو، استراحتت مجاز باشد نه فقط سخت‌رسیده ، و من برایت دعا می‌کنم.",
    "در روزهای پیش‌رو، نرمی‌ات را نگه دار.",
    "در روزهای پیش‌رو، نرمی‌ات را نگه دار — حقش را داری.",
    "در روزهای پیش‌رو، نرمی‌ات را نگه دار ، و من برایت دعا می‌کنم.",
    "در روزهای پیش‌رو، شجاعت در اندازه‌های قابل‌استفاده بیاید.",
    "در روزهای پیش‌رو، شجاعت در اندازه‌های قابل‌استفاده بیاید — حقش را داری.",
    "در روزهای پیش‌رو، شجاعت در اندازه‌های قابل‌استفاده بیاید ، و من برایت دعا می‌کنم.",
    "برای مسیر بعد، امیدوارم به اندازه حمایتت، حمایت ببینی.",
    "برای مسیر بعد، امیدوارم به اندازه حمایتت، حمایت ببینی — حقش را داری.",
    "برای مسیر بعد، امیدوارم به اندازه حمایتت، حمایت ببینی ، و من برایت دعا می‌کنم.",
    "برای مسیر بعد، آسودگی بیش از فشار سراغت بیاید.",
    "برای مسیر بعد، آسودگی بیش از فشار سراغت بیاید — حقش را داری.",
    "برای مسیر بعد، آسودگی بیش از فشار سراغت بیاید ، و من برایت دعا می‌کنم.",
    "برای مسیر بعد، چیزهای خوب با زمان‌بندی منصف برسند.",
    "برای مسیر بعد، چیزهای خوب با زمان‌بندی منصف برسند — حقش را داری.",
    "برای مسیر بعد، چیزهای خوب با زمان‌بندی منصف برسند ، و من برایت دعا می‌کنم.",
    "برای مسیر بعد، درهایی باز شوند که با تلاشت جور باشند.",
    "برای مسیر بعد، درهایی باز شوند که با تلاشت جور باشند — حقش را داری.",
    "برای مسیر بعد، درهایی باز شوند که با تلاشت جور باشند ، و من برایت دعا می‌کنم.",
    "برای مسیر بعد، دوستی همان‌قدر که می‌دهی پیدایت کند.",
    "برای مسیر بعد، دوستی همان‌قدر که می‌دهی پیدایت کند — حقش را داری.",
    "برای مسیر بعد، دوستی همان‌قدر که می‌دهی پیدایت کند ، و من برایت دعا می‌کنم.",
    "برای مسیر بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده.",
    "برای مسیر بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده — حقش را داری.",
    "برای مسیر بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده ، و من برایت دعا می‌کنم.",
    "برای مسیر بعد، نرمی‌ات را نگه دار.",
    "برای مسیر بعد، نرمی‌ات را نگه دار — حقش را داری.",
    "برای مسیر بعد، نرمی‌ات را نگه دار ، و من برایت دعا می‌کنم.",
    "برای مسیر بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید.",
    "برای مسیر بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید — حقش را داری.",
    "برای مسیر بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید ، و من برایت دعا می‌کنم.",
    "هرجا که می‌روی، امیدوارم به اندازه حمایتت، حمایت ببینی.",
    "هرجا که می‌روی، امیدوارم به اندازه حمایتت، حمایت ببینی — حقش را داری.",
    "هرجا که می‌روی، امیدوارم به اندازه حمایتت، حمایت ببینی ، و من برایت دعا می‌کنم.",
    "هرجا که می‌روی، آسودگی بیش از فشار سراغت بیاید.",
    "هرجا که می‌روی، آسودگی بیش از فشار سراغت بیاید — حقش را داری.",
    "هرجا که می‌روی، آسودگی بیش از فشار سراغت بیاید ، و من برایت دعا می‌کنم.",
    "هرجا که می‌روی، چیزهای خوب با زمان‌بندی منصف برسند.",
    "هرجا که می‌روی، چیزهای خوب با زمان‌بندی منصف برسند — حقش را داری.",
    "هرجا که می‌روی، چیزهای خوب با زمان‌بندی منصف برسند ، و من برایت دعا می‌کنم.",
    "هرجا که می‌روی، درهایی باز شوند که با تلاشت جور باشند.",
    "هرجا که می‌روی، درهایی باز شوند که با تلاشت جور باشند — حقش را داری.",
    "هرجا که می‌روی، درهایی باز شوند که با تلاشت جور باشند ، و من برایت دعا می‌کنم.",
    "هرجا که می‌روی، دوستی همان‌قدر که می‌دهی پیدایت کند.",
    "هرجا که می‌روی، دوستی همان‌قدر که می‌دهی پیدایت کند — حقش را داری.",
    "هرجا که می‌روی، دوستی همان‌قدر که می‌دهی پیدایت کند ، و من برایت دعا می‌کنم.",
    "هرجا که می‌روی، استراحتت مجاز باشد نه فقط سخت‌رسیده.",
    "هرجا که می‌روی، استراحتت مجاز باشد نه فقط سخت‌رسیده — حقش را داری.",
    "هرجا که می‌روی، استراحتت مجاز باشد نه فقط سخت‌رسیده ، و من برایت دعا می‌کنم.",
    "هرجا که می‌روی، نرمی‌ات را نگه دار.",
    "هرجا که می‌روی، نرمی‌ات را نگه دار — حقش را داری.",
    "هرجا که می‌روی، نرمی‌ات را نگه دار ، و من برایت دعا می‌کنم.",
    "هرجا که می‌روی، شجاعت در اندازه‌های قابل‌استفاده بیاید.",
    "هرجا که می‌روی، شجاعت در اندازه‌های قابل‌استفاده بیاید — حقش را داری.",
    "هرجا که می‌روی، شجاعت در اندازه‌های قابل‌استفاده بیاید ، و من برایت دعا می‌کنم.",
    "در فصل بعد، امیدوارم به اندازه حمایتت، حمایت ببینی.",
    "در فصل بعد، امیدوارم به اندازه حمایتت، حمایت ببینی — حقش را داری.",
    "در فصل بعد، امیدوارم به اندازه حمایتت، حمایت ببینی ، و من برایت دعا می‌کنم.",
    "در فصل بعد، آسودگی بیش از فشار سراغت بیاید.",
    "در فصل بعد، آسودگی بیش از فشار سراغت بیاید — حقش را داری.",
    "در فصل بعد، آسودگی بیش از فشار سراغت بیاید ، و من برایت دعا می‌کنم.",
    "در فصل بعد، چیزهای خوب با زمان‌بندی منصف برسند.",
    "در فصل بعد، چیزهای خوب با زمان‌بندی منصف برسند — حقش را داری.",
    "در فصل بعد، چیزهای خوب با زمان‌بندی منصف برسند ، و من برایت دعا می‌کنم.",
    "در فصل بعد، درهایی باز شوند که با تلاشت جور باشند.",
    "در فصل بعد، درهایی باز شوند که با تلاشت جور باشند — حقش را داری.",
    "در فصل بعد، درهایی باز شوند که با تلاشت جور باشند ، و من برایت دعا می‌کنم.",
    "در فصل بعد، دوستی همان‌قدر که می‌دهی پیدایت کند.",
    "در فصل بعد، دوستی همان‌قدر که می‌دهی پیدایت کند — حقش را داری.",
    "در فصل بعد، دوستی همان‌قدر که می‌دهی پیدایت کند ، و من برایت دعا می‌کنم.",
    "در فصل بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده.",
    "در فصل بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده — حقش را داری.",
    "در فصل بعد، استراحتت مجاز باشد نه فقط سخت‌رسیده ، و من برایت دعا می‌کنم.",
    "در فصل بعد، نرمی‌ات را نگه دار.",
    "در فصل بعد، نرمی‌ات را نگه دار — حقش را داری.",
    "در فصل بعد، نرمی‌ات را نگه دار ، و من برایت دعا می‌کنم.",
    "در فصل بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید.",
    "در فصل بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید — حقش را داری.",
    "در فصل بعد، شجاعت در اندازه‌های قابل‌استفاده بیاید ، و من برایت دعا می‌کنم."
  ];

  const EXTRA_FA = [
    "ساعات معمولی به‌خاطر آدم‌هایی مثل تو فرق می‌کند.",
    "اگر قدردانی وزن داشت، این یادداشت سنگین‌تر از ظاهرش بود.",
    "نسخه کوتاهِ سپاسی که هنوز حسش می‌کنم.",
    "طلب اعتبار نکردی — باز هم قدردانی می‌کنم.",
    "هنوز خوشحالم که همان‌طور پیش رفت.",
    "خوبی انسانی بدون سخنرانی.",
    "باز هم ممنون — با کلمات کمتر و همان صداقت.",
    "همین‌جا تمامش می‌کنم: در آن لحظه مهم بودی.",
    "این قدردانی ستون دارد.",
    "صفحه را می‌بندم، نه حس را.",
    "ممنون — روشن و کامل.",
    "گرمی بدون نمایش.",
    "پایانی آرام برای تشکری واضح.",
    "با این حساب: کاملاً ممنونم.",
    "خوشحالم که ناگفته‌اش نگذاشتم.",
    "به زبان ساده، در آن لحظه مهم بودی.",
    "به زبان ساده، در آن لحظه مهم بودی — کامل.",
    "به زبان ساده، در آن لحظه مهم بودی ، بدون نمایش.",
    "به زبان ساده، سپاس واقعی است.",
    "به زبان ساده، سپاس واقعی است — کامل.",
    "به زبان ساده، سپاس واقعی است ، بدون نمایش.",
    "به زبان ساده، قدردانی بعد از صفحه هم می‌ماند.",
    "به زبان ساده، قدردانی بعد از صفحه هم می‌ماند — کامل.",
    "به زبان ساده، قدردانی بعد از صفحه هم می‌ماند ، بدون نمایش.",
    "به زبان ساده، خوشحالم ناگفته نماند.",
    "به زبان ساده، خوشحالم ناگفته نماند — کامل.",
    "به زبان ساده، خوشحالم ناگفته نماند ، بدون نمایش.",
    "به زبان ساده، این تشکر ستون دارد.",
    "به زبان ساده، این تشکر ستون دارد — کامل.",
    "به زبان ساده، این تشکر ستون دارد ، بدون نمایش.",
    "به زبان ساده، مهربانی به حساب آمد.",
    "به زبان ساده، مهربانی به حساب آمد — کامل.",
    "به زبان ساده، مهربانی به حساب آمد ، بدون نمایش.",
    "به زبان ساده، حس از نامه بیشتر می‌ماند.",
    "به زبان ساده، حس از نامه بیشتر می‌ماند — کامل.",
    "به زبان ساده، حس از نامه بیشتر می‌ماند ، بدون نمایش.",
    "به زبان ساده، عمداً قدردانی شده‌ای.",
    "به زبان ساده، عمداً قدردانی شده‌ای — کامل.",
    "به زبان ساده، عمداً قدردانی شده‌ای ، بدون نمایش.",
    "قبل از پایان، در آن لحظه مهم بودی.",
    "قبل از پایان، در آن لحظه مهم بودی — کامل.",
    "قبل از پایان، در آن لحظه مهم بودی ، بدون نمایش.",
    "قبل از پایان، سپاس واقعی است.",
    "قبل از پایان، سپاس واقعی است — کامل.",
    "قبل از پایان، سپاس واقعی است ، بدون نمایش.",
    "قبل از پایان، قدردانی بعد از صفحه هم می‌ماند.",
    "قبل از پایان، قدردانی بعد از صفحه هم می‌ماند — کامل.",
    "قبل از پایان، قدردانی بعد از صفحه هم می‌ماند ، بدون نمایش.",
    "قبل از پایان، خوشحالم ناگفته نماند.",
    "قبل از پایان، خوشحالم ناگفته نماند — کامل.",
    "قبل از پایان، خوشحالم ناگفته نماند ، بدون نمایش.",
    "قبل از پایان، این تشکر ستون دارد.",
    "قبل از پایان، این تشکر ستون دارد — کامل.",
    "قبل از پایان، این تشکر ستون دارد ، بدون نمایش.",
    "قبل از پایان، مهربانی به حساب آمد.",
    "قبل از پایان، مهربانی به حساب آمد — کامل.",
    "قبل از پایان، مهربانی به حساب آمد ، بدون نمایش.",
    "قبل از پایان، حس از نامه بیشتر می‌ماند.",
    "قبل از پایان، حس از نامه بیشتر می‌ماند — کامل.",
    "قبل از پایان، حس از نامه بیشتر می‌ماند ، بدون نمایش.",
    "قبل از پایان، عمداً قدردانی شده‌ای.",
    "قبل از پایان، عمداً قدردانی شده‌ای — کامل.",
    "قبل از پایان، عمداً قدردانی شده‌ای ، بدون نمایش.",
    "یک خط آخر: در آن لحظه مهم بودی.",
    "یک خط آخر: در آن لحظه مهم بودی — کامل.",
    "یک خط آخر: در آن لحظه مهم بودی ، بدون نمایش.",
    "یک خط آخر: سپاس واقعی است.",
    "یک خط آخر: سپاس واقعی است — کامل.",
    "یک خط آخر: سپاس واقعی است ، بدون نمایش.",
    "یک خط آخر: قدردانی بعد از صفحه هم می‌ماند.",
    "یک خط آخر: قدردانی بعد از صفحه هم می‌ماند — کامل.",
    "یک خط آخر: قدردانی بعد از صفحه هم می‌ماند ، بدون نمایش.",
    "یک خط آخر: خوشحالم ناگفته نماند.",
    "یک خط آخر: خوشحالم ناگفته نماند — کامل.",
    "یک خط آخر: خوشحالم ناگفته نماند ، بدون نمایش.",
    "یک خط آخر: این تشکر ستون دارد.",
    "یک خط آخر: این تشکر ستون دارد — کامل.",
    "یک خط آخر: این تشکر ستون دارد ، بدون نمایش.",
    "یک خط آخر: مهربانی به حساب آمد.",
    "یک خط آخر: مهربانی به حساب آمد — کامل.",
    "یک خط آخر: مهربانی به حساب آمد ، بدون نمایش.",
    "یک خط آخر: حس از نامه بیشتر می‌ماند.",
    "یک خط آخر: حس از نامه بیشتر می‌ماند — کامل.",
    "یک خط آخر: حس از نامه بیشتر می‌ماند ، بدون نمایش.",
    "یک خط آخر: عمداً قدردانی شده‌ای.",
    "یک خط آخر: عمداً قدردانی شده‌ای — کامل.",
    "یک خط آخر: عمداً قدردانی شده‌ای ، بدون نمایش.",
    "بدون زینت، در آن لحظه مهم بودی.",
    "بدون زینت، در آن لحظه مهم بودی — کامل.",
    "بدون زینت، در آن لحظه مهم بودی ، بدون نمایش.",
    "بدون زینت، سپاس واقعی است.",
    "بدون زینت، سپاس واقعی است — کامل.",
    "بدون زینت، سپاس واقعی است ، بدون نمایش.",
    "بدون زینت، قدردانی بعد از صفحه هم می‌ماند.",
    "بدون زینت، قدردانی بعد از صفحه هم می‌ماند — کامل.",
    "بدون زینت، قدردانی بعد از صفحه هم می‌ماند ، بدون نمایش.",
    "بدون زینت، خوشحالم ناگفته نماند.",
    "بدون زینت، خوشحالم ناگفته نماند — کامل.",
    "بدون زینت، خوشحالم ناگفته نماند ، بدون نمایش.",
    "بدون زینت، این تشکر ستون دارد.",
    "بدون زینت، این تشکر ستون دارد — کامل.",
    "بدون زینت، این تشکر ستون دارد ، بدون نمایش.",
    "بدون زینت، مهربانی به حساب آمد.",
    "بدون زینت، مهربانی به حساب آمد — کامل.",
    "بدون زینت، مهربانی به حساب آمد ، بدون نمایش.",
    "بدون زینت، حس از نامه بیشتر می‌ماند.",
    "بدون زینت، حس از نامه بیشتر می‌ماند — کامل.",
    "بدون زینت، حس از نامه بیشتر می‌ماند ، بدون نمایش.",
    "بدون زینت، عمداً قدردانی شده‌ای.",
    "بدون زینت، عمداً قدردانی شده‌ای — کامل.",
    "بدون زینت، عمداً قدردانی شده‌ای ، بدون نمایش.",
    "در پایان، در آن لحظه مهم بودی.",
    "در پایان، در آن لحظه مهم بودی — کامل.",
    "در پایان، در آن لحظه مهم بودی ، بدون نمایش.",
    "در پایان، سپاس واقعی است.",
    "در پایان، سپاس واقعی است — کامل.",
    "در پایان، سپاس واقعی است ، بدون نمایش.",
    "در پایان، قدردانی بعد از صفحه هم می‌ماند.",
    "در پایان، قدردانی بعد از صفحه هم می‌ماند — کامل.",
    "در پایان، قدردانی بعد از صفحه هم می‌ماند ، بدون نمایش.",
    "در پایان، خوشحالم ناگفته نماند.",
    "در پایان، خوشحالم ناگفته نماند — کامل.",
    "در پایان، خوشحالم ناگفته نماند ، بدون نمایش.",
    "در پایان، این تشکر ستون دارد.",
    "در پایان، این تشکر ستون دارد — کامل.",
    "در پایان، این تشکر ستون دارد ، بدون نمایش.",
    "در پایان، مهربانی به حساب آمد.",
    "در پایان، مهربانی به حساب آمد — کامل.",
    "در پایان، مهربانی به حساب آمد ، بدون نمایش.",
    "در پایان، حس از نامه بیشتر می‌ماند.",
    "در پایان، حس از نامه بیشتر می‌ماند — کامل.",
    "در پایان، حس از نامه بیشتر می‌ماند ، بدون نمایش.",
    "در پایان، عمداً قدردانی شده‌ای.",
    "در پایان، عمداً قدردانی شده‌ای — کامل.",
    "در پایان، عمداً قدردانی شده‌ای ، بدون نمایش.",
    "با این حساب، در آن لحظه مهم بودی.",
    "با این حساب، در آن لحظه مهم بودی — کامل.",
    "با این حساب، در آن لحظه مهم بودی ، بدون نمایش.",
    "با این حساب، سپاس واقعی است.",
    "با این حساب، سپاس واقعی است — کامل.",
    "با این حساب، سپاس واقعی است ، بدون نمایش.",
    "با این حساب، قدردانی بعد از صفحه هم می‌ماند.",
    "با این حساب، قدردانی بعد از صفحه هم می‌ماند — کامل.",
    "با این حساب، قدردانی بعد از صفحه هم می‌ماند ، بدون نمایش.",
    "با این حساب، خوشحالم ناگفته نماند.",
    "با این حساب، خوشحالم ناگفته نماند — کامل.",
    "با این حساب، خوشحالم ناگفته نماند ، بدون نمایش.",
    "با این حساب، این تشکر ستون دارد.",
    "با این حساب، این تشکر ستون دارد — کامل.",
    "با این حساب، این تشکر ستون دارد ، بدون نمایش.",
    "با این حساب، مهربانی به حساب آمد.",
    "با این حساب، مهربانی به حساب آمد — کامل.",
    "با این حساب، مهربانی به حساب آمد ، بدون نمایش.",
    "با این حساب، حس از نامه بیشتر می‌ماند.",
    "با این حساب، حس از نامه بیشتر می‌ماند — کامل.",
    "با این حساب، حس از نامه بیشتر می‌ماند ، بدون نمایش.",
    "با این حساب، عمداً قدردانی شده‌ای.",
    "با این حساب، عمداً قدردانی شده‌ای — کامل.",
    "با این حساب، عمداً قدردانی شده‌ای ، بدون نمایش.",
    "حقیقتاً، در آن لحظه مهم بودی."
  ];

  const LONG_ADD_FA = [
    "خوشحالم که این کلمات جای ماندگارتری دارند.",
    "درست بود که به این قدردانی فضای بیشتری بدهم.",
    "خواستم سپاس روی صفحه کمی بیشتر نفس بکشد.",
    "حس بیشتر از یک خط کوتاه است — برای همین ادامه دادم.",
    "امیدوارم خطوط اضافه صداقت را روشن‌تر کند، نه سنگین‌تر.",
    "این را افزودم چون یک اشاره کوتاه کافی نبود.",
    "نسخه بلندتر همان تشکر حقیقی را بدان.",
    "روی صفحه ماندم چون قدردانی در من مانده بود.",
    "کلمات بیشتر، همان صداقت.",
    "خواستم سپاس را بدون عجله حس کنی.",
    "این طول عمدی است — حس طلبش می‌کرد.",
    "یادداشت را کش می‌دهم تا قدردانی بنشیند.",
    "فضای کمی بیشتر برای مهربانیِ کم‌نیست.",
    "نوشتن را ادامه دادم چون توقف ناتمام حس می‌شد.",
    "امیدوارم خطوط اضافه مثل مراقبت خوانده شود، نه وظیفه.",
    "شکل بلندتر را انتخاب کردم تا چیز مهم مبهم نماند.",
    "خوشحالم که آن را در یک جمله مؤدبانه فشرده نکردم.",
    "شکل بلندتر با میزان اهمیتش جور است.",
    "امیدوارم طول را گرمی بخوانی، نه وزن.",
    "عمداً سپاس بیشتری را روی صفحه می‌گذارم.",
    "صفحه کامل‌تر برای حس کامل‌تر.",
    "خواستم قدردانی نفسِ دوم داشته باشد.",
    "از کنار چیزی که مهم بود عجله نمی‌کنم.",
    "کلمات بیشتر، شتاب کمتر.",
    "امیدوارم طول با ثبات آنچه دادی جور باشد.",
    "وقت می‌گذارم چون تو مراقبت را جدی گرفتی.",
    "پاراگراف اضافه، هسته همان: ممنون.",
    "جا خواستم هم مشخص باشم هم مهربان.",
    "حس در نسخه کوتاه جا نشد — برای همین اینجاییم.",
    "خوشحالم که به این تشکر جا برای گفتن دادم.",
    "خطوط اضافه را مثل دست دادن دوم بدان.",
    "یادداشت بلندتر برای اثری که ماند.",
    "امیدوارم مثل قدردانیِ بی‌شتاب خوانده شود.",
    "انتخاب کردم پایان را عجله نکنم.",
    "شکل بلندتر، قلب روشن‌تر.",
    "حاشیه وسیع‌تری دور سپاس می‌گذارم.",
    "این قدردانی با صدای کمی بلندتر است — آرام.",
    "چند جمله بیشتر تا قدردانی کامل بنشیند.",
    "ادامه دادم تا تشکر آرام بگیرد.",
    "امیدوارم این کلمات اضافه مدتی با تو بمانند.",
    "خوشحالم که گرمی را برای کوتاهی حذف نکردم.",
    "این طول فقط صداقت با اکسیژن بیشتر است.",
    "ماندم چون قدردانی شایسته‌اش بود.",
    "خواستم وقتی به پایان رسیدی، تشکر کامل حس شود.",
    "مراقبت اضافه در واژه‌ها، چون مراقبت تو واقعی بود.",
    "کاغذ کمی بیشتر با حسی که جمع نمی‌شد پر می‌کنم.",
    "بگذار یادداشت بلندتر جای سپاسِ ماندگارتر باشد.",
    "از کنار چیزی که مهم بود عجله نمی‌کنم.",
    "خوشحالم که این کلمات جای ماندگارتری دارند.",
    "این قدردانی با صدای کمی بلندتر است — آرام."
  ];

  const SUPPORT_PARTS_FA = {
    a: [
      "با نگاه به گذشته،",
      "حتی حالا،",
      "اگر صادق باشم،",
      "در ساعت‌های خلوت،",
      "بعد از همه چیز،",
      "راستش را بخواهی،",
      "هنوز،",
      "به زبان ساده،",
      "بدون اغراق،",
      "هر وقت یادش می‌افتد،"
    ],
    b: [
      "مراقبتت دقیق حس شد",
      "کمکت دمای روز را عوض کرد",
      "به‌خاطر تو کمتر تنها بودم",
      "مهربانی شکل روشن داشت",
      "زمان‌بندی‌ات هم مهم بود",
      "دیدم چقدر بادقت حاضر شدی",
      "حمایت بدون هیاهو رسید",
      "یک بازه سخت را قابل تحمل کردی",
      "دیده‌شدم، نه مدیریت",
      "قدم بعدی را ممکن کردی",
      "عزت را حین کمک حفظ کردی",
      "کمی از آسودگی گم‌شده را برگرداندی",
      "ماندی وقتی رفتن آسان‌تر بود",
      "حضور آوردی، نه نمایش",
      "مراقبتت در جزئیات دیده شد"
    ],
    c: [
      "و مهم بود.",
      "و سپاس‌گزارم.",
      "و می‌خواهم بدانی.",
      "و هنوز پیش من نشسته.",
      "و به حساب آمد.",
      "و بابت آن ممنونم."
    ],
  };

  function composeParts(seed, parts) {
    const a = pickLine(seed + "pa", parts.a);
    const b = pickLine(seed + "pb", parts.b);
    const c = pickLine(seed + "pc", parts.c);
    const joinC = !c ? "" : (c.startsWith(".") || c.startsWith(" —") || c.startsWith(",") ? c : " " + c);
    return (a + " " + b + joinC).replace(/\s+/g, " ").trim();
  }

  function pickSupport(seed, lang) {
    if (lang === "fa") {
      if (Math.random() < 0.42) return composeParts(seed, SUPPORT_PARTS_FA);
      return pickLine(seed, SUPPORT_FA);
    }
    if (Math.random() < 0.42) return composeParts(seed, SUPPORT_PARTS_EN);
    return pickLine(seed, SUPPORT_EN);
  }

  function pickForward(seed, lang) {
    if (lang === "fa") return pickLine(seed, FORWARD_FA);
    if (Math.random() < 0.4) return composeParts(seed, FORWARD_PARTS_EN);
    return pickLine(seed, FORWARD_EN);
  }

  function pickExtra(seed, lang) {
    if (lang === "fa") return pickLine(seed, EXTRA_FA);
    if (Math.random() < 0.4) return composeParts(seed, EXTRA_PARTS_EN);
    return pickLine(seed, EXTRA_EN);
  }

  function pickLongAdd(pack, seed, idx) {
    const pool = Array.isArray(pack.longAdd)
      ? pack.longAdd
      : pack.longAdd
        ? [pack.longAdd]
        : LONG_ADD_EN;
    return pickLine(String(seed || "") + "|long|" + idx + "|" + Math.random(), pool);
  }

  /** Pull the meaningful core out of a free-form idea (meta wrappers only). */
  function ideaClause(idea) {
    let s = clean(idea);
    if (!s) return null;
    s = s.replace(/[.!?…]+$/u, "");

    const leadPatterns = [
      /^(please\s+)?(help\s+me\s+)?(write|make|generate|create|draft|compose)\s+(me\s+)?(a\s+|an\s+)?(short\s+|warm\s+|formal\s+|nice\s+|lovely\s+)?(thank[\s-]?you\s+)?(note|message|letter|card|text)\s*(that\s+says|saying|about|for|to)?\s*/i,
      /^(i\s+want\s+to\s+|i'?d\s+like\s+to\s+|i\s+need\s+to\s+|i\s+wanna\s+)?(say\s+|write\s+|send\s+)?(a\s+|an\s+)?(thank[\s-]?you|thanks|note|message)?\s*/i,
      /^(a\s+)?(note|message|letter|card)\s+(for|to|about)\s+/i,
      /^(for|about|regarding|because of)\s+/i,
      /^(لطفاً?\s+)?(یک\s+)?(یادداشت|نامه|پیام|متن)\s*(بنویس|بساز|درست کن)?\s*(که|بابت|برای)?\s*/u,
      /^(می[\s‌]?خواهم|میخواهم)\s+(از\s+)?/u,
      /^(بابت|برای|دربارهٔ?|راجع به)\s+/u,
    ];
    leadPatterns.forEach((re) => {
      s = s.replace(re, "");
    });
    s = s.trim().replace(/^[,:\-–—]\s*/, "");
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

  /** Relationship lexicon: order matters (best friend before friend, etc.). */
  const RELATIONSHIPS = [
    {
      id: "bestFriend",
      occasion: "friend",
      greetEn: "best friend",
      greetFa: "بهترین دوست",
      myEn: "my best friend",
      myFa: "بهترین دوستم",
      asEn: "as my best friend",
      asFa: "به‌عنوان بهترین دوستم",
      re: /best\s*friends?|بهترین\s*دوست(?:م|ام)?|دوست\s*صمیم[یي]/i,
    },
    {
      id: "friend",
      occasion: "friend",
      greetEn: "friend",
      greetFa: "دوست",
      myEn: "my friend",
      myFa: "دوستم",
      asEn: "as a friend",
      asFa: "به‌عنوان دوست",
      re: /\b(?:my\s+)?friends?\b|دوست(?:م|ام|ای|ی|ان)?/i,
    },
    {
      id: "mother",
      occasion: "family",
      greetEn: "Mom",
      greetFa: "مامان",
      myEn: "my mom",
      myFa: "مامانم",
      asEn: "as my mom",
      asFa: "به‌عنوان مادرم",
      re: /\b(?:my\s+)?(?:mom|mum|mommy|mama|mother)\b|مادر(?:م)?|مامان|ماما/i,
    },
    {
      id: "father",
      occasion: "family",
      greetEn: "Dad",
      greetFa: "بابا",
      myEn: "my dad",
      myFa: "بابام",
      asEn: "as my dad",
      asFa: "به‌عنوان پدرم",
      re: /\b(?:my\s+)?(?:dad|daddy|father|papa)\b|پدر(?:م)?|بابا/i,
    },
    {
      id: "sister",
      occasion: "family",
      greetEn: "sister",
      greetFa: "خواهر",
      myEn: "my sister",
      myFa: "خواهرم",
      asEn: "as my sister",
      asFa: "به‌عنوان خواهرم",
      re: /\b(?:my\s+)?sisters?\b|خواهر(?:م)?/i,
    },
    {
      id: "brother",
      occasion: "family",
      greetEn: "brother",
      greetFa: "برادر",
      myEn: "my brother",
      myFa: "برادرم",
      asEn: "as my brother",
      asFa: "به‌عنوان برادرم",
      re: /\b(?:my\s+)?brothers?\b|برادر(?:م)?/i,
    },
    {
      id: "teacher",
      occasion: "student",
      greetEn: "teacher",
      greetFa: "معلم",
      myEn: "my teacher",
      myFa: "معلمم",
      asEn: "as my teacher",
      asFa: "به‌عنوان معلمم",
      re: /\b(?:my\s+)?teachers?\b|معلم(?:م|ان)?|استاد(?:م)?/i,
    },
    {
      id: "student",
      occasion: "student",
      greetEn: "student",
      greetFa: "دانش‌آموز",
      myEn: "my student",
      myFa: "دانش‌آموزم",
      asEn: "as my student",
      asFa: "به‌عنوان دانش‌آموزم",
      re: /\b(?:my\s+)?students?\b|دانش[\s‌]*آموز(?:م)?|شاگرد(?:م)?/i,
    },
    {
      id: "colleague",
      occasion: "colleague",
      greetEn: "colleague",
      greetFa: "همکار",
      myEn: "my colleague",
      myFa: "همکارم",
      asEn: "as a colleague",
      asFa: "به‌عنوان همکار",
      re: /\b(?:my\s+)?colleagues?\b|\bco-?workers?\b|همکار(?:م|ان)?/i,
    },
    {
      id: "boss",
      occasion: "colleague",
      greetEn: "manager",
      greetFa: "مدیر",
      myEn: "my boss",
      myFa: "رئیسم",
      asEn: "as my manager",
      asFa: "به‌عنوان رئیسم",
      re: /\b(?:my\s+)?(?:boss|manager|supervisor)\b|رئیس(?:م)?|مدیر(?:م)?/i,
    },
    {
      id: "partner",
      occasion: "family",
      greetEn: "love",
      greetFa: "عزیزم",
      myEn: "my partner",
      myFa: "شریک زندگی‌ام",
      asEn: "as my partner",
      asFa: "به‌عنوان شریک زندگی‌ام",
      re: /\b(?:my\s+)?(?:partner|significant other)\b|شریک\s*زندگی(?:‌ام|ام)?|پارتنر/i,
    },
    {
      id: "husband",
      occasion: "family",
      greetEn: "husband",
      greetFa: "همسر",
      myEn: "my husband",
      myFa: "شوهرم",
      asEn: "as my husband",
      asFa: "به‌عنوان شوهرم",
      re: /\b(?:my\s+)?husbands?\b|شوهر(?:م)?|همسر(?:م)?\s*مرد/i,
    },
    {
      id: "wife",
      occasion: "family",
      greetEn: "wife",
      greetFa: "همسر",
      myEn: "my wife",
      myFa: "همسرم",
      asEn: "as my wife",
      asFa: "به‌عنوان همسرم",
      re: /\b(?:my\s+)?wives\b|\b(?:my\s+)?wife\b|زن(?:م)?|همسر(?:م)?/i,
    },
    {
      id: "teammate",
      occasion: "colleague",
      greetEn: "teammate",
      greetFa: "هم‌تیمی",
      myEn: "my teammate",
      myFa: "هم‌تیمی‌ام",
      asEn: "as a teammate",
      asFa: "به‌عنوان هم‌تیمی",
      re: /\b(?:my\s+)?team\s*mates?\b|\bteammates?\b|هم[\s‌]*تیمی(?:‌ام|ام)?/i,
    },
    {
      id: "mentor",
      occasion: "colleague",
      greetEn: "mentor",
      greetFa: "مربی",
      myEn: "my mentor",
      myFa: "مربی‌ام",
      asEn: "as my mentor",
      asFa: "به‌عنوان مربی‌ام",
      re: /\b(?:my\s+)?mentors?\b|مربی(?:‌ام|ام)?|راهنما(?:یم)?/i,
    },
  ];

  const REL_STOP_NAMES = new Set(
    [
      "my", "the", "a", "an", "to", "for", "from", "you", "your", "our", "me",
      "mom", "mum", "dad", "friend", "friends", "teacher", "student", "boss",
      "colleague", "brother", "sister", "wife", "husband", "partner", "mentor",
      "teammate", "family", "best", "dear", "note", "thanks", "thank",
      "دوست", "مامان", "بابا", "مادر", "پدر", "معلم", "همکار", "خواهر", "برادر",
    ].map((x) => x.toLowerCase())
  );

  function detectRelationship(text) {
    const s = clean(text);
    if (!s) return null;
    for (const rel of RELATIONSHIPS) {
      if (rel.re.test(s)) return rel;
    }
    return null;
  }

  function extractNamedPerson(text, rel) {
    const s = clean(text);
    if (!s) return null;

    const patterns = [
      /(?:thank(?:s|\s+you)|thanks)\s+(?:to\s+)?([A-Z][a-zA-ZÀ-ÿ''\-]{1,30})(?:\s|,|$)/,
      /(?:thank(?:s|\s+you)|thanks)\s+(?:to\s+)?([A-Z][a-zA-ZÀ-ÿ''\-]{1,30})\s+(?:my\s+)?/i,
      /\b(?:dear|hi|hello)\s+([A-Z][a-zA-ZÀ-ÿ''\-]{1,30})\b/,
    ];

    for (const re of patterns) {
      const m = s.match(re);
      if (!m || !m[1]) continue;
      const name = m[1].replace(/[.,!?]+$/g, "");
      if (REL_STOP_NAMES.has(name.toLowerCase())) continue;
      if (rel && rel.re.test(name)) continue;
      if (/^(my|the|a|an|for|to|از|به|برای|بهترین)$/i.test(name)) continue;
      return name;
    }

    // "Sarah my best friend" / "Amirreza my friend"
    const beforeRel = s.match(
      /\b([A-Z][a-zA-ZÀ-ÿ''\-]{1,30})\s+(?:my\s+)?(?:best\s+)?(?:friend|mom|dad|teacher|colleague|sister|brother)/i
    );
    if (beforeRel && !REL_STOP_NAMES.has(beforeRel[1].toLowerCase())) {
      return beforeRel[1];
    }
    return null;
  }

  function stripRelationshipPhrases(text) {
    let s = clean(text);
    if (!s) return "";
    for (const rel of RELATIONSHIPS) {
      s = s.replace(rel.re, " ");
    }
    s = s
      .replace(/\b(?:as\s+a|as\s+my)\b/gi, " ")
      .replace(/بهترین/gi, " ")
      .replace(/\s+/g, " ")
      .trim()
      // Only edge leftovers from "my best friend" style phrases — keep articles inside reasons
      .replace(/^(my|our)\s+/i, "")
      .replace(/\s+(my|our)$/i, "")
      .trim();
    return s;
  }

  function scrubReasonNoise(reason, name) {
    if (!reason) return null;
    let s = clean(reason);
    s = s
      .replace(/^(thank(?:s|\s+you)?|thanks)\s*/i, "")
      .replace(/^(to|from|از|به)\s+/i, "")
      .replace(/^(my|our)\s+/i, "")
      .replace(/^(for|babat|برای|بابت)\s+/i, "")
      .replace(/^[,:\-–—]\s*/, "")
      .trim();
    if (name && new RegExp(`^${name}$`, "i").test(s)) return null;
    if (name && new RegExp(`^${name}\\b`, "i").test(s) && stripRelationshipPhrases(s).length < 3) {
      return null;
    }
    if (!s || s.length < 3) return null;
    if (/^(thank|thanks|you|note|message|letter|dear)$/i.test(s)) return null;
    if (detectRelationship(s) && stripRelationshipPhrases(s).length < 3) return null;
    return s;
  }

  /** Extract the reason they're thanked for — not the relationship itself. */
  function extractReason(idea, rel, name) {
    let s = clean(idea);
    if (!s) return null;

    // First " for …" after a thank-word (avoids stealing later "for the exam")
    const thankHit = s.match(/\b(?:thank(?:s|\s+you)?|thanks)\b/i);
    if (thankHit) {
      const fromThank = s.slice(thankHit.index);
      const forIdx = fromThank.search(/\s+for\s+/i);
      if (forIdx >= 0) {
        let reason = fromThank.slice(forIdx).replace(/^\s+for\s+/i, "");
        reason = stripRelationshipPhrases(reason);
        reason = scrubReasonNoise(reason, name);
        if (reason) return reason;
        const rawFor = clean(fromThank.slice(forIdx).replace(/^\s+for\s+/i, "")).replace(
          /^(my|our)\s+/i,
          ""
        );
        const kept = scrubReasonNoise(rawFor, name);
        if (kept) return kept;
      }
    }

    const forFa = s.match(
      /(?:ممنون|تشکر|سپاس)(?:\s+از)?(?:\s+[^\s]+)?\s+(?:بابت|برای)\s+(.+)$/u
    );
    if (forFa && forFa[1]) {
      const reason = scrubReasonNoise(stripRelationshipPhrases(forFa[1]), name);
      if (reason) return reason;
    }

    // "about …" detail
    const about = s.match(/\babout\s+(.+)$/i) || s.match(/دربارهٔ?\s+(.+)$/u);
    if (about && about[1]) {
      const reason = scrubReasonNoise(stripRelationshipPhrases(about[1]), name);
      if (reason) return reason;
    }

    // Fall back: strip thanks + relationship from clause
    let core = ideaClause(s) || s;
    core = core
      .replace(/^(thank(?:s|\s+you)?|thanks)(\s+to)?\s*/i, "")
      .replace(/^(ممنون|تشکر|سپاس)(\s+از)?\s*/u, "")
      .replace(/^(to|from|از|به)\s+/i, "")
      .trim();

    if (rel) core = core.replace(rel.re, " ").replace(/\s+/g, " ").trim();
    if (name) core = core.replace(new RegExp(`\\b${name}\\b`, "i"), " ").replace(/\s+/g, " ").trim();
    core = scrubReasonNoise(core, name);
    return core;
  }

  /**
   * Robust free-form idea parse: intent, relationship, named person, reason.
   */
  function parseIdea(idea) {
    const raw = clean(idea);
    const rel = detectRelationship(raw);
    const name = extractNamedPerson(raw, rel);
    const reason = extractReason(raw, rel, name);
    const intent = detectIntent(raw);
    return {
      raw,
      intent,
      relationship: rel,
      name,
      reason,
      fa: looksLikePersian(raw),
    };
  }

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
      // Thank before role words so "thank you my best friend" → thank
      { id: "thank", re: /thank|grateful|appreciation|ممنون|تشکر|سپاس|قدردان/i },
      { id: "student", re: /\bstudent\b|\bteacher\b|\bclass\b|معلم|دانش\s*آموز|شاگرد/i },
      { id: "friend", re: /\bfriends?\b|دوستی|دوست/i },
      { id: "colleague", re: /colleague|coworker|co-worker|همکار/i },
      { id: "family", re: /family|mother|father|sister|brother|\bmom\b|\bdad\b|خانواده|مادر|پدر|مامان|بابا/i },
    ];
    for (const rule of rules) {
      if (rule.re.test(text)) return rule.id;
    }
    return null;
  }

  function resolveOccasion(idea, occasion, parsed) {
    const p = parsed || parseIdea(idea);
    const detected = p.intent;
    const chosen = !occasion || occasion === "auto" ? "general" : occasion;
    if (chosen !== "general") return chosen;
    if (detected && WISH_INTENTS.has(detected)) return detected;
    if (detected === "gift" || detected === "help") return detected;
    // Relationship drives tone bank when user didn't pick an occasion
    if (p.relationship) return p.relationship.occasion;
    if (detected === "student" || detected === "friend" || detected === "colleague" || detected === "family") {
      return detected;
    }
    if (detected === "thank") return "general";
    return detected || chosen;
  }

  /** Keep extra detail for wish notes; drop bare occasion words. */
  function detailForOccasion(occasion, clause) {
    if (!clause) return null;
    let s = clause;
    if (WISH_INTENTS.has(occasion)) {
      s = s
        .replace(/happy\s*birthday( to you)?/gi, "")
        .replace(/\bbirthday\b/gi, "")
        .replace(/تولد(?:ت|تون)?\s*(مبارک)?/gi, "")
        .replace(/congratulat\w*/gi, "")
        .replace(/\bcongrats\b/gi, "")
        .replace(/تبریک(\s*می[\s‌]?گویم)?/gi, "")
        .replace(/good\s*luck/gi, "")
        .replace(/get\s*well(\s*soon)?/gi, "")
        .replace(/new\s*year/gi, "")
        .replace(/سال\s*نو(\s*مبارک)?/gi, "")
        .replace(/^(to|for|about|babat|برای|بابت)\s+/i, "")
        .trim()
        .replace(/^[,:\-–—]\s*/, "");
      return s.length > 2 ? s : null;
    }
    if (/^(happy\s+)?birthday\b/i.test(s) && s.split(/\s+/).length <= 3) return null;
    if (/^تولد/.test(s) && s.length < 18) return null;
    return s;
  }

  function looksLikePersian(text) {
    return /[\u0600-\u06FF]/.test(text || "");
  }

  function relLabel(rel, language, form) {
    if (!rel) return "";
    const fa = language === "fa";
    if (form === "my") return fa ? rel.myFa : rel.myEn;
    if (form === "as") return fa ? rel.asFa : rel.asEn;
    return fa ? rel.greetFa : rel.greetEn;
  }

  /** Relationship-aware openers / echoes (large pools for variety). */
  function relationshipLines(rel, reason, name, tone, language, seed) {
    if (!rel && !name) return null;
    const fa = language === "fa";
    const my = rel ? relLabel(rel, language, "my") : "";
    const asForm = rel ? relLabel(rel, language, "as") : "";
    const greet = rel ? relLabel(rel, language, "greet") : "";
    const whoRef = name || my || greet;
    const rid = rel ? rel.id : "named";

    if (fa) {
      const openers = [];
      const openersWithReason = [];
      if (rel) {
        openers.push(
          `به ${my} — واقعاً ممنونم.`,
          `دارم برای ${my} با قدردانی واقعی می‌نویسم.`,
          `این چند خط برای توست، ${greet} عزیزم.`,
          `به‌عنوان ${greet}، می‌خواهم سپاس‌ام را روشن بگویم.`,
          `${my}، این یادداشت کوتاه از ته دل است.`,
          `اول از همه: ممنون که ${my} هستی.`,
          `خطابم به ${my} است — با سپاس، نه تعارف.`
        );
        if (reason) {
          openersWithReason.push(
            `به ${my} — ممنون بابت ${reason}.`,
            `${my}، بابت ${reason} واقعاً قدردانم.`,
            `می‌نویسم برای ${my}، مخصوصاً بابت ${reason}.`,
            `${greet} عزیزم، بابت ${reason} ممنونم.`
          );
        }
      }
      if (name) {
        openers.push(
          `${name}، این چند خط برای توست.`,
          `می‌خواهم مستقیم به ${name} بگویم: ممنونم.`
        );
        if (rel) {
          openers.push(
            `${name}، ${asForm} همیشه جایی ویژه داشته‌ای.`,
            `${name} — ${my} — سپاس از بودنَت.`
          );
        }
        if (reason) {
          openersWithReason.push(`${name}، ممنون بابت ${reason}.`);
        }
      }
      const middles = rel
        ? [
            `دوستی و مراقبت مثل مال تو (${greet}) در جزئیات دیده می‌شود.`,
            `نقش تو ${asForm} فقط عنوان نیست؛ در عمل حس می‌شود.`,
            `داشتن کسی مثل تو ${asForm} روزها را امن‌تر می‌کند.`,
            `هر بار به ${my} فکر می‌کنم، سپاس تازه‌ای می‌آید.`,
            `قدردانی‌ام از تو، ${greet}، دقیق است نه مبهم.`,
            reason
              ? `بابت ${reason}، و بابت اینکه ${my} هستی، هر دو را می‌گویم.`
              : `مهم است برایت بنویسم که ${asForm} چقدر معنا داری.`,
          ]
        : [
            `${whoRef}، حضورت فرق گذاشته است.`,
            `این سپاس خطاب به ${whoRef} است — روشن و بی‌حاشیه.`,
          ];
      const closes = [
        `پس این را نگه دار: برای ${whoRef} بودنَت دیده شد.`,
        `امیدوارم بدانی ${whoRef}، از طرف من نادیده گرفته نشدی.`,
        `مرکز این نامه تویی — ${whoRef}.`,
        reason
          ? `باز هم بابت ${reason}، و بابت خودت، ممنونم.`
          : `کوتاه می‌گویم و جدی: ممنونم، ${whoRef}.`,
      ];
      return {
        first: pickLine(seed + "ro" + rid + tone, openersWithReason.length ? openersWithReason : openers),
        second: pickLine(seed + "rm" + rid, middles),
        third: pickLine(seed + "rc" + rid, closes),
        fourth: pickLine(seed + "rf" + rid, [
          `باز هم — برای ${my || whoRef}، از ته دل.`,
          `این را با مهر برای ${whoRef} می‌بندم.`,
          `سپاس دوباره، ${greet || whoRef}.`,
        ]),
      };
    }

    const openers = [];
    const openersWithReason = [];
    if (rel) {
      openers.push(
        `To ${my} — thank you.`,
        `I’m writing to ${my} with real gratitude.`,
        `This note is for you, ${greet}.`,
        `${asForm[0].toUpperCase()}${asForm.slice(1)}, I want to say thank you clearly.`,
        `${my[0].toUpperCase()}${my.slice(1)}, these lines are for you.`,
        `First: thank you for being ${my}.`,
        `I’m addressing ${my} — with thanks, not filler.`,
        `A thank-you meant for ${my}, written on purpose.`,
        `To ${my}: I’m grateful for you.`,
        `This is me thanking ${my}, without rushing past what that means.`
      );
      if (reason) {
        openersWithReason.push(
          `To ${my} — thank you for ${reason}.`,
          `${my[0].toUpperCase()}${my.slice(1)}, thank you for ${reason}.`,
          `I’m writing to ${my}, especially for ${reason}.`,
          `Thank you, ${greet}, for ${reason}.`,
          `As ${my}, you deserve thanks for ${reason}.`
        );
      }
    }
    if (name) {
      openers.push(
        `${name}, these lines are for you.`,
        `I want to say this directly to ${name}: thank you.`,
        `This thank-you belongs to ${name}.`
      );
      if (rel) {
        openers.push(
          `${name}, ${asForm} you’ve always mattered in a particular way.`,
          `${name} — ${my} — thank you for being you.`,
          `Dear ${name}: gratitude for you ${asForm}.`
        );
      }
      if (reason) {
        openersWithReason.push(
          `${name}, thank you for ${reason}.`,
          `${name}, I’m grateful for ${reason}.`
        );
      }
    }

    const middles = rel
      ? [
          `Care like yours — ${asForm} — shows up in concrete ways, and I noticed.`,
          `Being ${my} isn’t a label here; it’s something I’ve felt in practice.`,
          `Having you ${asForm} has made ordinary days steadier.`,
          `Whenever I think of ${my}, the gratitude comes back fresh.`,
          `My thanks to you, ${greet}, are pointed — not polite and empty.`,
          `Friendship / care of this kind doesn’t ask for credit. Yours doesn’t.`,
          reason
            ? `I’m grateful for ${reason}, and equally for who you are ${asForm}.`
            : `I needed clearer words for how much you mean ${asForm}.`,
          `You’ve been ${my} in the ways that count, not only in name.`,
          `I don’t take lightly what it means to call you ${my}.`,
          `Thank you for the steadiness you bring ${asForm}.`,
        ]
      : [
          `${whoRef}, your presence made a real difference.`,
          `This gratitude is addressed to ${whoRef} — clearly, without vagueness.`,
          `I’m glad I get to thank ${whoRef} with clearer words.`,
        ];

    const closes = [
      `Keep this as a reminder: you were seen — as ${whoRef}.`,
      `I hope you feel, ${whoRef}, that you weren’t overlooked from my side.`,
      `The center of this letter is you — ${whoRef}.`,
      reason
        ? `Again — thank you for ${reason}, and thank you for being you.`
        : `I’ll say it simply and mean it: thank you, ${whoRef}.`,
      `Wherever this note finds you, take the thanks with you, ${greet || whoRef}.`,
      `That’s what I wanted on the page: gratitude for ${my || whoRef}.`,
    ];

    const formalOpen = rel
      ? reason
        ? `I am writing to express sincere thanks to you ${asForm}, especially for ${reason}.`
        : `I am writing to express sincere thanks to you ${asForm}.`
      : reason
        ? `I am writing to express sincere thanks to ${whoRef} for ${reason}.`
        : `I am writing to express sincere thanks to ${whoRef}.`;
    const playfulOpen = rel
      ? reason
        ? `Official memo to ${my}: thank you for ${reason}. Stamp applied.`
        : `Official memo to ${my}: thank you. Stamp applied.`
      : reason
        ? `Official memo to ${whoRef}: thank you for ${reason}. Stamp applied.`
        : `Official memo to ${whoRef}: thank you. Stamp applied.`;
    const heartOpen = rel
      ? reason
        ? `From the heart, to ${my}: thank you for ${reason}.`
        : `From the heart, to ${my}: thank you.`
      : reason
        ? `From the heart, to ${whoRef}: thank you for ${reason}.`
        : `From the heart, to ${whoRef}: thank you.`;

    let first;
    const openerPool = openersWithReason.length ? openersWithReason : openers;
    if (tone === "formal") first = formalOpen;
    else if (tone === "playful") first = playfulOpen;
    else if (tone === "heartfelt") first = heartOpen;
    else first = pickLine(seed + "ro" + rid + tone, openerPool);

    return {
      first,
      second: pickLine(seed + "rm" + rid, middles),
      third: pickLine(seed + "rc" + rid, closes),
      fourth: pickLine(seed + "rf" + rid, [
        `Again — for ${my || whoRef}, sincerely.`,
        `Closing with warmth for ${whoRef}.`,
        `Thank you once more, ${greet || whoRef}.`,
        reason
          ? `So this ends where it began: thanks for ${reason}, and for you.`
          : `Short ending, full meaning: grateful for ${my || whoRef}.`,
      ]),
    };
  }

  /** Build idea-centered lines so the note mirrors reason/detail — not raw prompts. */
  function ideaCenteredLines(detail, occasion, tone, language, seed, parsed) {
    const rel = parsed && parsed.relationship;
    const name = parsed && parsed.name;
    const reason = detail || (parsed && parsed.reason) || null;

    // Relationship / name first when present (even without a separate reason)
    if (rel || name) {
      const relLines = relationshipLines(rel, reason, name, tone, language, seed);
      if (relLines) return relLines;
    }

    if (!reason) return null;
    const fa = language === "fa" || looksLikePersian(reason);
    const wish = WISH_INTENTS.has(occasion);

    if (fa) {
      const openers = wish
        ? [
            `در کنار این مناسبت، مخصوصاً به این فکر می‌کنم: ${reason}.`,
            `علاوه بر اصل پیام، این جزئیات برایم مهم است: ${reason}.`,
            `و این را هم می‌خواهم روشن بگویم — دربارهٔ ${reason}.`,
            `این کلی‌گویی نیست؛ گره خورده به همین است: ${reason}.`,
            `یادداشت را از همین جزئیات شروع می‌کنم: ${reason}.`,
            `کنار مناسبت، دلم می‌خواهد ${reason} را هم نام ببرم.`,
          ]
        : [
            `می‌خواهم مشخصاً بابت این از تو بگویم: ${reason}.`,
            `حرف اصلی‌ام همین است: ${reason}. این را جدی می‌گویم.`,
            `این یادداشت برای همین است — برای ${reason}.`,
            `بابت ${reason} واقعاً ممنونم؛ همین انگیزه نوشتن این چند خط بود.`,
            `اگر فقط یک چیز را به خاطر بسپاری، همین باشد: قدردانی من بابت ${reason}.`,
            `بگذار دقیق بگویم: ممنون بابت ${reason}.`,
            `قدردانی‌ام گره خورده به ${reason} — نه به یک تشکر مبهم.`,
            `بابت ${reason} می‌نویسم، چون «ممنون»ِ سرسری کافی نبود.`,
          ];
      const middles = [
        `آنچه از «${reason}» برایم مانده، فقط یک خاطره کوتاه نیست؛ اثرش هنوز هست.`,
        `هر بار «${reason}» را به یاد می‌آورم، دوباره قدردان می‌شوم.`,
        `جزئیاتی مثل ${reason} معمولاً کوچک به نظر می‌رسند، اما برای من بزرگ بودند.`,
        `به خاطر ${reason}، روزهای معمولی شکل دیگری پیدا کردند.`,
        `«${reason}» همان نخی است که نخواستم از این یادداشت جا بماند.`,
        `هنوز از ${reason} تحت تأثیرم: از فکر، از زمان‌بندی، از اثرش.`,
        `اثر ${reason} هنوز در روزهای من هست.`,
        `بابت ${reason} حس حمایت و سبکی گرفتم.`,
      ];
      const closes = [
        `امیدوارم بدانی که ${reason} دیده شد — با دقت و با سپاس.`,
        `پس این را به‌عنوان یادآوری نگه دار: بابت ${reason} واقعاً مهم بودی.`,
        `هر وقت سراغ این موضوع آمدی، بدان که از طرف من نادیده گرفته نشد.`,
        `مرکز این نامه همان است: ${reason}.`,
        `بگذار این چند خط سند کوچکی باشد از اینکه ${reason} چقدر معنا داشت.`,
        `باز هم بابت ${reason} — کوتاه، اما از ته دل.`,
      ];
      const formalOpen = `بدین‌وسیله می‌خواهم به‌طور مشخص به این اشاره کنم: ${reason}.`;
      const playfulOpen = `نسخه صادقانه و بدون حاشیه: موضوع اصلی‌ام ${reason} است.`;
      const heartOpen = `از ته دل، و بدون جمله‌های کلی: حرفم دربارهٔ ${reason} است.`;

      return {
        first:
          tone === "formal"
            ? formalOpen
            : tone === "playful"
              ? playfulOpen
              : tone === "heartfelt"
                ? heartOpen
                : pickLine(seed + "o", openers),
        second: pickLine(seed + "m", middles),
        third: pickLine(seed + "c", closes),
        fourth: pickLine(seed + "f", [
          `باز هم بابت ${reason} — کوتاه، اما از ته دل.`,
          `پس اینجا تمامش می‌کنم: سپاس بابت ${reason}.`,
          `یک بار دیگر، روشن: ممنون بابت ${reason}.`,
        ]),
      };
    }

    const openers = wish
      ? [
          `Along with this message, I especially want to mention this: ${reason}.`,
          `Beyond the occasion itself, this part matters to me: ${reason}.`,
          `And I want to say this clearly too — about ${reason}.`,
          `This isn’t generic — it’s tied to what you named: ${reason}.`,
          `I’m starting with the detail that belongs here: ${reason}.`,
          `Beside the occasion, I also want to name ${reason}.`,
        ]
      : [
          `I want to thank you specifically for this: ${reason}.`,
          `The heart of this note is simple: ${reason}. I mean that fully.`,
          `This is written because of ${reason} — not as a vague thank-you, but a pointed one.`,
          `Thank you for ${reason}. That is the reason these lines exist.`,
          `If you remember only one thing from this note, let it be my gratitude for ${reason}.`,
          `I’m grateful for ${reason}, and I didn’t want that to stay unsaid.`,
          `Let me be exact: thank you for ${reason}.`,
          `My thanks are tied to ${reason} — not to a polite blank.`,
          `I’m writing about ${reason} because a quick “thanks” wasn’t enough.`,
          `Gratitude for ${reason} is the whole reason this page exists.`,
        ];
    const middles = [
      `What stayed with me about “${reason}” wasn’t small. It changed the shape of ordinary hours.`,
      `Every time I think back to ${reason}, the gratitude comes back fresh.`,
      `Details like ${reason} can look minor from the outside, but they meant a great deal to me.`,
      `Because of ${reason}, things felt lighter, clearer, and more possible.`,
      `I keep returning to ${reason} as proof that care shows up in concrete ways.`,
      `${reason} is the thread I didn’t want this note to lose.`,
      `It’s rare that something like ${reason} lands so clearly — and it did.`,
      `I’m still struck by ${reason}: the thoughtfulness, the timing, the effect.`,
      `The effect of ${reason} is still in my days.`,
      `After ${reason}, I felt supported in a way I still remember.`,
    ];
    const closes = [
      `Please know that ${reason} was noticed — carefully and gratefully.`,
      `Keep this as a reminder: ${reason} mattered, and so did you in it.`,
      `Whenever that moment comes to mind, I hope you feel how valued it was.`,
      `I’m carrying ${reason} with me as something I’m sincerely thankful for.`,
      `That’s the center I wanted this letter to hold: ${reason}.`,
      `May this stand as a small record of how much ${reason} meant.`,
      `Again — thank you for ${reason}. Short sentence, full meaning.`,
      `I’ll say it once more, plainly: ${reason} made a real difference.`,
    ];
    const formalOpen = `I am writing to acknowledge, specifically, the following: ${reason}.`;
    const playfulOpen = `Straight to the point: this note is about ${reason}. That’s the headline.`;
    const heartOpen = `From the heart, without filler: this is about ${reason}.`;

    return {
      first:
        tone === "formal"
          ? formalOpen
          : tone === "playful"
            ? playfulOpen
            : tone === "heartfelt"
              ? heartOpen
              : pickLine(seed + "o", openers),
      second: pickLine(seed + "m", middles),
      third: pickLine(seed + "c", closes),
      fourth: pickLine(seed + "f", [
        `Again — thank you for ${reason}. Short sentence, full meaning.`,
        `I’ll say it once more, plainly: ${reason} made a real difference.`,
        `So this ends where it began: gratitude for ${reason}.`,
        `One more time, clearly: thank you for ${reason}.`,
      ]),
    };
  }

  /**
   * Merge template paragraphs with idea-centered / relationship-aware lines.
   */
  function fitToIdea(templateParas, detail, occasion, tone, language, seed, idea, parsed) {
    const academic = contextFitsAcademic(idea, occasion);
    const p = parsed || parseIdea(idea);

    function scrub(para) {
      if (!para) return para;
      if (academic) return para;
      if (/not only for what you scored|who you are becoming|نه فقط برای نمره|کسی که داری می‌شوی/i.test(para)) {
        return "";
      }
      return para;
    }

    const scrubbed = templateParas.map((para, i) => {
      const s = scrub(para);
      return s || pickSupport(seed + "fill" + i, language);
    });

    const centered = ideaCenteredLines(detail, occasion, tone, language, seed, p);
    if (!centered) return scrubbed;

    const out = scrubbed.slice();
    out[0] = centered.first;

    if (out[1]) {
      let soft = scrub((templateParas[1] || "").trim());
      if (!academic && /scored|who you are becoming|نمره|کسی که داری می‌شوی/i.test(templateParas[1] || "")) {
        soft = "";
      }
      // Prefer relationship/reason middle; softly keep a short support line when no relationship
      if (p.relationship || p.name) {
        out[1] = centered.second;
      } else {
        out[1] =
          soft && soft.length < 160 && !/thank you for happy birthday/i.test(soft)
            ? `${centered.second} ${soft}`
            : centered.second;
      }
    }
    if (out[2]) out[2] = centered.third;
    if (out[3]) out[3] = centered.fourth;
    return out;
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

  function thanksBankEn(tone, occasion, clause, idea, seed, parsed) {
    const academic = contextFitsAcademic(idea, occasion);
    const s = seed || `${tone}|${occasion}|${clause || ""}`;
    const rel = parsed && parsed.relationship;
    const name = parsed && parsed.name;
    const reason = clause || (parsed && parsed.reason) || null;
    const my = rel ? relLabel(rel, "en", "my") : "";
    const asForm = rel ? relLabel(rel, "en", "as") : "";
    const greet = rel ? relLabel(rel, "en", "greet") : "";

    const thanksWarm = reason
      ? [
          `I want to thank you specifically for this: ${reason}. You made a real difference.`,
          `Thank you for ${reason}. That is exactly why I’m writing.`,
          `I’ve been meaning to say thank you for ${reason}, and I didn’t want it left unsaid.`,
          `The heart of this note is simple — thank you for ${reason}.`,
          `I’m grateful for ${reason}, in a pointed way, not a vague one.`,
          `Let me be exact: thank you for ${reason}. It mattered.`,
          `This is written because of ${reason} — and because a quick “thanks” wasn’t enough.`,
          `Gratitude for ${reason} is the reason these lines exist.`,
        ]
      : rel
        ? [
            `To ${my} — thank you.`,
            `I’m writing to ${my} with real gratitude.`,
            `Thank you for being ${my}. That alone deserves clearer words.`,
            `This note is for you, ${greet} — with thanks that aren’t filler.`,
            `I’m grateful for you ${asForm} — and I mean it without filler.`,
            `A thank-you meant for ${my}, written on purpose.`,
            `First things first: thank you, ${greet}.`,
          ]
        : [
            "I want to thank you for the way you show up. You made a real difference.",
            "Thank you — not as a courtesy line, but as something I mean.",
            "I’m writing to put real gratitude into words while it’s still vivid.",
            "A short note for a not-small kindness you offered.",
            "I’m grateful for who you are in the moments that count.",
            "Thank you for the care that doesn’t need an audience.",
            "I’m putting appreciation on the page so it doesn’t fade.",
          ];

    const thanksFormal = reason
      ? [
          `I write to express sincere thanks regarding ${reason}. Your contribution has been valued.`,
          `Please accept my appreciation for ${reason}. It has been noteworthy.`,
          `I wish to formally acknowledge ${reason} and the care behind it.`,
        ]
      : rel
        ? [
            `I write to express sincere appreciation to you ${asForm}.`,
            `Please accept my thanks — addressed to you as ${greet}.`,
            `I formally acknowledge the value of your presence ${asForm}.`,
          ]
        : [
            "I write to express sincere appreciation for your dedication and character.",
            "Please accept my thanks for your valued contribution.",
            "I formally acknowledge the quality and integrity you bring.",
          ];

    const thanksPlayful = reason
      ? [
          `Quick version: thank you — especially for ${reason}. Brighter days ensued.`,
          `Headline: ${reason}. Subheadline: I’m grateful. End of memo.`,
          `Thank you for ${reason}. Consider this the official stamp.`,
        ]
      : rel
        ? [
            `Official memo to ${my}: thank you. Stamp applied.`,
            `Friend-class gratitude incoming (${greet} edition).`,
            `Short version for ${my}: you were excellent. Thanks.`,
          ]
        : [
            "Quick version: thank you. Ordinary days got brighter because of you.",
            "Official notice: you were excellent. Gratitude attached.",
            "Thanks. Short sentence, full meaning.",
          ];

    const thanksHeart = reason
      ? [
          `From the heart: thank you for ${reason}. I carry that more than I usually say.`,
          `Without filler: this is about ${reason}, and my gratitude for it.`,
          `Thank you for ${reason}. Soft words, serious meaning.`,
        ]
      : rel
        ? [
            `From the heart, to ${my}: thank you.`,
            `Having you ${asForm} is one of the quieter gifts I don’t take lightly.`,
            `Thank you, ${greet}. Truly. That’s the center of this letter.`,
          ]
        : [
            "From the heart: thank you. Your presence has meant more than a short note can hold.",
            "I’m grateful in the quiet, lasting way — and I’m saying it here.",
            "Thank you. Truly. That’s the whole center of this letter.",
          ];

    const byToneFirst = {
      warm: pickLine(s + "f0", thanksWarm),
      formal: pickLine(s + "f0", thanksFormal),
      playful: pickLine(s + "f0", thanksPlayful),
      heartfelt: pickLine(s + "f0", thanksHeart),
    };

    const byOccasion = {
      student: {
        warm: reason
          ? `As your teacher, I want to thank you for ${reason}. Your curiosity and effort have stood out.`
          : pickLine(s + "stu", [
              "As your teacher, thank you for the curiosity and effort you bring. You’ve stood out in the best way.",
              "Teaching is full of busy days — your presence left a clearer mark than most.",
              "I’m grateful for how you show up to learn: questions, care, and follow-through.",
              "Thank you for the seriousness you bring to learning — it shows.",
              "Your growth in class has been a quiet pleasure to witness.",
            ]),
        formal: "As your instructor, I formally acknowledge your dedication and character as a student.",
        playful: "Teacher note: you’ve been a star in class — thank you for showing up the way you do.",
        heartfelt: "Teaching is busy, but some students leave a quiet mark. Thank you for being one of them.",
      },
      friend: {
        warm: reason
          ? pickLine(s + "frr", [
              `Thank you for ${reason}. Friendship like yours doesn’t ask for credit — it just shows up.`,
              `To ${my || "my friend"} — thank you for ${reason}.`,
              `${greet ? greet[0].toUpperCase() + greet.slice(1) : "Friend"}, thank you for ${reason}. It mattered.`,
              `I’m grateful for ${reason}, and for you ${asForm || "as a friend"}.`,
            ])
          : pickLine(s + "fr", [
              `To ${my || "my friend"} — thank you.`,
              `I’m writing to ${my || "my friend"} with real gratitude.`,
              "Thank you for a friendship that shows up without keeping score.",
              "Having you as a friend has made ordinary days steadier.",
              "Friend to friend: thank you. I mean it without decoration.",
              "I’m grateful for the kind of friend you are in practice, not only in name.",
              "This is a thank-you for the loyalty that doesn’t need a stage.",
              "You’ve been the friend people hope for — and I’m saying so clearly.",
              "Thank you for laughter, honesty, and the quiet check-ins.",
              "Friendship like yours changed the temperature of hard days.",
            ]),
        formal: pickLine(s + "frf", [
          "I am grateful for your friendship and the steadiness you bring.",
          "Please accept my sincere thanks for your valued friendship.",
          "I appreciate the reliability and care you offer as a friend.",
        ]),
        playful: pickLine(s + "frp", [
          "Friend note: you were excellent. Consider this my official thank-you.",
          "Best-friend energy received. Gratitude filing complete.",
          "Short memo to my friend: thanks. You’re stuck with my appreciation now.",
        ]),
        heartfelt: pickLine(s + "frh", [
          "Having you in my life is one of the quieter gifts I don’t take lightly.",
          "Thank you for being my friend in the ways that count.",
          "I’m grateful for you — as a friend, and as someone who made room for me.",
        ]),
      },
      colleague: {
        warm: reason
          ? `Thank you for ${reason}. Working alongside you has made the work better.`
          : pickLine(s + "col", [
              "Thank you for the way you work. Collaborating with you has made the days better.",
              "I’m grateful for a colleague who makes the hard parts less hard.",
              "Thank you for professionalism that still feels human.",
              "Working with you has been one of the quieter wins of the job.",
            ]),
        formal: "I appreciate your professionalism and the quality you bring to our shared work.",
        playful: "Work win: you made the hard parts less hard. Thanks for that.",
        heartfelt: "I’m grateful we got to build something together. Your part in it mattered.",
      },
      family: {
        warm: reason
          ? `Thank you for ${reason}. Family support like yours is a kind of home.`
          : pickLine(s + "fam", [
              "Thank you for the way you care. Family support like yours is a kind of home.",
              rel
                ? `To ${my} — thank you for the love that shows up in ordinary ways.`
                : "Thank you for loving me in the ordinary ways that somehow mean everything.",
              "Family thank-you: your care has been a steady place to land.",
              "I’m grateful for the home I find in how you show up.",
            ]),
        formal: "I am deeply grateful for your support and the role you play in my life.",
        playful: pickLine(s + "famp", ["Family thank-you: you’re the best, and I mean it.", "Family note: official appreciation stamp applied.", "Short family memo: you’re excellent. Thanks."]),
        heartfelt: "Thank you for loving me in the ordinary ways that somehow mean everything.",
      },
      gift: {
        warm: reason
          ? `Thank you for the gift — and for ${reason}. It was thoughtful in the best way.`
          : "Thank you for the gift. It was thoughtful, and it meant more than you may know.",
        formal: "Thank you for your generous gift. I appreciate your thoughtfulness.",
        playful: "Gift received. Heart: happy. Thank you!",
        heartfelt: "Your gift felt like being understood. Thank you for that kindness.",
      },
      help: {
        warm: reason
          ? `Thank you for ${reason}. Your help arrived exactly when it was needed.`
          : "Thank you for your help. It arrived exactly when it was needed.",
        formal: "I am grateful for the assistance you provided. It made a meaningful difference.",
        playful: "You helped. I noticed. Thank you (big time).",
        heartfelt: "When I needed support, you were there. I won’t forget that.",
      },
    };

    const tn = ["warm", "formal", "playful", "heartfelt"].includes(tone) ? tone : "warm";
    let first =
      occasion !== "general" && byOccasion[occasion]
        ? byOccasion[occasion][tn] || byOccasion[occasion].warm
        : byToneFirst[tn];

    // Named person weave when recipient name came from idea
    if (name && rel && !reason && occasion === "friend") {
      first = pickLine(s + "named", [
        first,
        `${name}, ${asForm} — thank you.`,
        `${name}, this thank-you is for you as ${my}.`,
      ]);
    }

    let second;
    if (academic && Math.random() < 0.55) {
      second = pickLine(s + "ac", ACADEMIC_EN);
    } else if (rel && (rel.occasion === "friend" || rel.occasion === "family")) {
      second = pickLine(s + "suprel", [
        ...SUPPORT_EN,
        `Being ${my} isn’t a label in this note; it’s something I’ve felt.`,
        `Care like yours ${asForm} shows up in details, and I noticed.`,
        `I don’t take lightly what it means to call you ${my}.`,
        `Thank you for the steadiness you bring ${asForm}.`,
      ]);
    } else {
      second = pickSupport(s + "sup", "en");
    }

    const third = pickForward(s + "fwd", "en");
    const fourth = pickExtra(s + "x", "en");

    return { first, second, third, fourth };
  }

  function thanksBankFa(tone, occasion, clause, idea, seed, parsed) {
    const academic = contextFitsAcademic(idea, occasion);
    const s = seed || `${tone}|${occasion}|${clause || ""}|fa`;
    const rel = parsed && parsed.relationship;
    const name = parsed && parsed.name;
    const reason = clause || (parsed && parsed.reason) || null;
    const my = rel ? relLabel(rel, "fa", "my") : "";
    const asForm = rel ? relLabel(rel, "fa", "as") : "";
    const greet = rel ? relLabel(rel, "fa", "greet") : "";

    const thanksWarm = reason
      ? [
          `می‌خواهم مشخصاً بابت این از تو تشکر کنم: ${reason}. واقعاً فرق گذاشتی.`,
          `ممنون بابت ${reason}. دقیقاً برای همین می‌نویسم.`,
          `بابت ${reason} سپاس‌گزارم؛ نمی‌خواستم ناگفته بماند.`,
          `حرف اصلی ساده است — ممنون بابت ${reason}.`,
          `بگذار دقیق بگویم: ممنون بابت ${reason}. مهم بود.`,
        ]
      : rel
        ? [
            `به ${my} — واقعاً ممنونم.`,
            `دارم برای ${my} با قدردانی واقعی می‌نویسم.`,
            `ممنون که ${my} هستی. همین خودش کلمه روشن می‌خواهد.`,
            `این یادداشت برای توست، ${greet} — با سپاس، نه تعارف.`,
            `${asForm} قدردانم و دارم می‌نویسمش.`,
          ]
        : [
            "می‌خواهم از تو برای شیوه‌ات در حاضر بودن تشکر کنم. واقعاً فرق گذاشتی.",
            "ممنون — نه به‌عنوان جمله مؤدبانه، بلکه از روی معنا.",
            "می‌نویسم تا قدردانی واقعی را روی کاغذ بیاورم.",
            "یک یادداشت کوتاه برای مهربانی‌ای که کوچک نبود.",
          ];

    const thanksFormal = reason
      ? [
          `بدین‌وسیله بابت ${reason} سپاس خود را اعلام می‌کنم. نقش شما ارزشمند بوده است.`,
          `لطفاً قدردانی مرا بابت ${reason} بپذیرید.`,
        ]
      : rel
        ? [
            `بدین‌وسیله از شما ${asForm} صمیمانه قدردانی می‌کنم.`,
            `لطفاً سپاس مرا بپذیرید — خطاب به شما به‌عنوان ${greet}.`,
          ]
        : [
            "بدین‌وسیله از تعهد و شخصیت شما صمیمانه قدردانی می‌کنم.",
            "از نقش ارزشمند شما سپاس‌گزارم.",
          ];

    const thanksPlayful = reason
      ? [
          `نسخه کوتاه: ممنون — مخصوصاً بابت ${reason}. روزها روشن‌تر شد.`,
          `عنوان: ${reason}. زیرعنوان: سپاس. پایان پیام.`,
        ]
      : rel
        ? [
            `یادداشت رسمی برای ${my}: ممنون. مهر خورد.`,
            `نسخه کوتاه برای ${my}: عالی بودی. سپاس.`,
          ]
        : [
            "نسخه کوتاه: ممنون. روزهای معمولی روشن‌تر شد.",
            "اطلاع رسمی: عالی بودی. سپاس پیوست است.",
          ];

    const thanksHeart = reason
      ? [
          `از ته دل بابت ${reason} ممنونم. بیشتر از آن‌که معمولاً بگویم با خودم دارمش.`,
          `بدون حاشیه: حرفم دربارهٔ ${reason} و سپاس بابت آن است.`,
        ]
      : rel
        ? [
            `از ته دل، به ${my}: ممنونم.`,
            `داشتنت ${asForm} از آن هدایای آرامی است که سرسری نمی‌گیرم.`,
          ]
        : [
            "از ته دل ممنونم. حضورت بیشتر از یک یادداشت کوتاه جا می‌گیرد.",
            "سپاس واقعی — آرام و ماندگار — و اینجا می‌گویمش.",
          ];

    const byToneFirst = {
      warm: pickLine(s + "f0", thanksWarm),
      formal: pickLine(s + "f0", thanksFormal),
      playful: pickLine(s + "f0", thanksPlayful),
      heartfelt: pickLine(s + "f0", thanksHeart),
    };

    const byOccasion = {
      student: {
        warm: reason
          ? `به‌عنوان معلمت می‌خواهم بابت ${reason} از تو تشکر کنم. کنجکاوی و تلاشت برجسته بوده.`
          : pickLine(s + "stu", [
              "به‌عنوان معلمت، بابت کنجکاوی و تلاشت ممنونم. به بهترین شکل دیده شدی.",
              "تدریس شلوغ است؛ حضور تو رد روشن‌تری گذاشت.",
              "از شیوه‌ات در یادگیری سپاس‌گزارم: سؤال، دقت، پیگیری.",
            ]),
        formal: "به‌عنوان مدرس شما، تعهد و شخصیت دانش‌آموزی‌تان را رسماً ارج می‌نهم.",
        playful: "یادداشت معلم: ستاره کلاس بودی — ممنون که این‌طور حاضر می‌شوی.",
        heartfelt: "تدریس شلوغ است، اما بعضی دانش‌آموزان رد آرام می‌گذارند. ممنون که یکی از آن‌ها بودی.",
      },
      friend: {
        warm: reason
          ? pickLine(s + "frr", [
              `بابت ${reason} ممنونم. دوستی مثل تو دنبال اعتبار نیست — فقط حاضر می‌شود.`,
              `به ${my || "دوستم"} — ممنون بابت ${reason}.`,
              `${greet || "دوست"}، بابت ${reason} واقعاً قدردانم.`,
            ])
          : pickLine(s + "fr", [
              `به ${my || "دوستم"} — واقعاً ممنونم.`,
              `دارم برای ${my || "دوستم"} با قدردانی واقعی می‌نویسم.`,
              "ممنون بابت دوستی‌ای که بدون حساب‌وکتاب حاضر می‌شود.",
              "داشتنت به‌عنوان دوست روزهای معمولی را ثابت‌تر کرده.",
              "دوست به دوست: ممنونم. بی‌حاشیه می‌گویم.",
              "از آن جور دوستی که در عمل است سپاس‌گزارم، نه فقط در اسم.",
              "این تشکر برای وفاداری‌ای است که صحنه نمی‌خواهد.",
              "دوستی مثل تو دمای روزهای سخت را عوض کرد.",
            ]),
        formal: "از دوستی و ثباتی که به زندگی‌ام می‌آوری سپاس‌گزارم.",
        playful: "یادداشت دوستانه: عالی بودی. این تشکر رسمی من است.",
        heartfelt: "داشتنت در زندگی‌ام از آن هدایای آرامی است که سرسری نمی‌گیرم.",
      },
      colleague: {
        warm: reason
          ? `بابت ${reason} ممنونم. کار کنار تو کار را بهتر کرده.`
          : "ممنون بابت شیوه‌ات در کار. همکاری با تو روزها را بهتر کرده.",
        formal: "از حرفه‌ای‌گری و کیفیتی که به کار مشترک می‌آورید قدردانی می‌کنم.",
        playful: "برد کاری: بخش‌های سخت را آسان‌تر کردی. ممنون.",
        heartfelt: "خوشحالم که با هم چیزی ساختیم. سهم تو مهم بود.",
      },
      family: {
        warm: reason
          ? `بابت ${reason} ممنونم. حمایت خانوادگی مثل تو نوعی خانه است.`
          : pickLine(s + "fam", [
              "ممنون بابت مراقبتت. حمایت خانوادگی مثل تو نوعی خانه است.",
              rel ? `به ${my} — ممنون بابت عشقی که در راه‌های معمولی می‌آید.` : "ممنون که در راه‌های معمولی‌ای دوستم داری که همه‌چیز معنا می‌دهد.",
            ]),
        formal: "از حمایت شما و نقشی که در زندگی‌ام دارید عمیقاً سپاس‌گزارم.",
        playful: "تشکر خانوادگی: تو بهترین هستی و دارم می‌نویسمش.",
        heartfelt: "ممنون که در راه‌های معمولی‌ای دوستم داری که همه‌چیز معنا می‌دهد.",
      },
      gift: {
        warm: reason
          ? `بابت هدیه — و بابت ${reason} — ممنونم. خیلی بافکر بود.`
          : "بابت هدیه ممنونم. بافکر بود و بیشتر از آنچه شاید بدانی معنا داشت.",
        formal: "از هدیه سخاوتمندانه شما سپاس‌گزارم. قدردان فکر شما هستم.",
        playful: "هدیه رسید. قلب: خوشحال. ممنون!",
        heartfelt: "هدیه‌ات حس فهمیده شدن داد. ممنون بابت این مهربانی.",
      },
      help: {
        warm: reason
          ? `بابت ${reason} ممنونم. کمکت درست وقتی لازم بود رسید.`
          : "بابت کمکت ممنونم. درست وقتی لازم بود رسید.",
        formal: "از کمکی که ارائه دادید سپاس‌گزارم. تفاوت معناداری ایجاد کرد.",
        playful: "کمک کردی. دیدم. ممنون (خیلی زیاد).",
        heartfelt: "وقتی به حمایت نیاز داشتم، بودی. فراموشش نمی‌کنم.",
      },
    };

    const tn = ["warm", "formal", "playful", "heartfelt"].includes(tone) ? tone : "warm";
    let first =
      occasion !== "general" && byOccasion[occasion]
        ? byOccasion[occasion][tn] || byOccasion[occasion].warm
        : byToneFirst[tn];

    if (name && rel && !reason && occasion === "friend") {
      first = pickLine(s + "named", [
        first,
        `${name}، ${asForm} — ممنونم.`,
        `${name}، این تشکر برای توست به‌عنوان ${my}.`,
      ]);
    }

    let second;
    if (academic && Math.random() < 0.55) {
      second = pickLine(s + "ac", ACADEMIC_FA);
    } else if (rel && (rel.occasion === "friend" || rel.occasion === "family")) {
      second = pickLine(s + "suprel", [
        ...SUPPORT_FA,
        `${asForm} بودن فقط عنوان نیست؛ در عمل حس می‌شود.`,
        `مراقبتی مثل مال تو ${asForm} در جزئیات دیده می‌شود.`,
        `معنای ${my} بودن را سرسری نمی‌گیرم.`,
      ]);
    } else {
      second = pickSupport(s + "sup", "fa");
    }

    return {
      first,
      second,
      third: pickForward(s + "fwd", "fa"),
      fourth: pickExtra(s + "x", "fa"),
    };
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
      longAdd: LONG_ADD_EN,
      bank(tone, occasion, clause, idea, seed, parsed) {
        const wish = wishBankEn(occasion, tone, clause);
        if (wish) return wish;
        return thanksBankEn(tone, occasion, clause, idea, seed, parsed);
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
      longAdd: LONG_ADD_FA,
      bank(tone, occasion, clause, idea, seed, parsed) {
        const wish = wishBankFa(occasion, tone, clause);
        if (wish) return wish;
        return thanksBankFa(tone, occasion, clause, idea, seed, parsed);
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
      bank(tone, occasion, clause, idea, seed, parsed) {
        const wish = wishBankEn(occasion, tone, clause);
        if (wish) return wish;
        return thanksBankEn(tone, occasion, clause, idea, seed, parsed);
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
    ["يسعدني أن أكتب هذا.","أردت أن يأخذ الامتنان مساحة أكبر.","كلمات إضافية لنفس الشكر الصادق.","أطلت قليلاً لأن الشعور استحق ذلك.","أمل أن تُقرأ السطور الإضافية كدفء لا كعبء."],
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
    ["Me alegra poder dejar constancia de esto.","Quise darle más espacio a este agradecimiento.","Más palabras, la misma sinceridad.","Alargué la nota porque el gesto lo merecía.","Espero que la longitud se lea como cariño, no como peso."],
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
    ["Je suis heureux/heureuse de pouvoir le formuler pleinement.","J’ai voulu laisser plus d’espace à cette gratitude.","Plus de mots, la même sincérité.","J’ai prolongé la note parce que le geste le méritait.","J’espère que la longueur se lise comme de la chaleur, non comme un poids."],
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
    ["Ich bin froh, das ausführlicher sagen zu können.","Ich wollte dieser Dankbarkeit mehr Raum geben.","Mehr Worte, dieselbe Aufrichtigkeit.","Ich habe die Notiz verlängert, weil die Geste es wert war.","Möge die Länge als Wärme gelesen werden, nicht als Last."],
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

  function trimForLength(paragraphs, length, pack, seed) {
    if (length === "short") {
      return paragraphs.map((p) => {
        const cut = p.split(/(?<=[.!?۔؟])\s+/u);
        return cut.slice(0, Math.min(2, cut.length)).join(" ");
      });
    }
    if (length === "long") {
      return paragraphs.map((p, i) => {
        if (i === 0) return p;
        return `${p} ${pickLongAdd(pack, (seed || "") + "|trim", i)}`;
      });
    }
    return paragraphs;
  }

  function resolveAddressee(recipient, parsed, pack, language) {
    const named = clean(recipient) || (parsed && parsed.name) || "";
    if (named) return named;
    if (parsed && parsed.relationship) {
      // Prefer "best friend" / localized role for greeting when no name field
      const greet = relLabel(parsed.relationship, language, "greet");
      if (parsed.relationship.id === "bestFriend") {
        return language === "fa" ? "بهترین دوست" : "best friend";
      }
      if (parsed.relationship.id === "mother") return language === "fa" ? "مامان" : "Mom";
      if (parsed.relationship.id === "father") return language === "fa" ? "بابا" : "Dad";
      return greet || pack.friend;
    }
    return pack.friend;
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
    const rawIdea = clean(idea);
    const parsed = parseIdea(rawIdea);
    const resolved = resolveOccasion(idea, occasion, parsed);

    // Reason/detail only — never feed bare relationship phrases as "thank you for X"
    let clause = null;
    if (parsed.reason) {
      clause = detailForOccasion(resolved, parsed.reason);
    } else if (!parsed.relationship && !parsed.name) {
      const rawClause = ideaClause(idea);
      clause = detailForOccasion(resolved, rawClause);
      if (!clause && rawIdea) {
        const fallback = detailForOccasion(resolved, rawIdea) || rawClause;
        if (fallback && fallback.length > 2) clause = fallback;
        else if (!WISH_INTENTS.has(resolved) && rawClause && rawClause.length > 2) clause = rawClause;
      }
      // Last guard: if fallback is only a relationship phrase, drop it
      if (clause && detectRelationship(clause) && !extractReason(clause, detectRelationship(clause))) {
        const stripped = stripRelationshipPhrases(clause);
        if (!stripped || stripped.length < 3) clause = null;
      }
    }

    const who = resolveAddressee(recipient, parsed, pack, language);
    const seed = `${rawIdea}|${tone}|${resolved}|${language}|${Date.now()}|${Math.random()}|${Math.random().toString(36).slice(2)}`;
    const count = Math.min(4, Math.max(1, Number(paragraphs) || 2));
    const bank = pack.bank(tone, resolved, clause, rawIdea, seed, parsed);
    let pool = [bank.first, bank.second, bank.third, bank.fourth];

    // Ground every draft in relationship / reason from the idea
    pool = fitToIdea(pool, clause, resolved, tone, language, seed, rawIdea, parsed);

    // Final safety: drop academic scored/becoming lines outside academic context
    if (!contextFitsAcademic(rawIdea, resolved)) {
      pool = pool.map((p) => {
        if (!p) return p;
        if (/not only for what you scored|who you are becoming|نه فقط برای نمره|کسی که داری می‌شوی/i.test(p)) {
          return pickSupport(seed + "safe", language);
        }
        return p;
      });
    }

    // Wish notes with no extra detail: still vary openings with richer phrase banks
    if (!clause && WISH_INTENTS.has(resolved)) {
      pool[0] = hashPick(seed + "wish0", [
        pool[0],
        resolved === "birthday"
          ? hashPick(seed + "bd", [
              "Happy birthday. I hope today feels personal, light, and wholly yours.",
              "Happy birthday — may this year be kinder, braver, and full of quiet wins.",
              "Happy birthday. Glad these wishes can find you on the page.",
            ])
          : pool[0],
      ]);
    }

    const body = trimForLength(pool.slice(0, count), length, pack, seed);

    return {
      greeting: buildGreeting(who, greetingStyle, pack),
      paragraphs: body,
      closing: closingFor(tone, closingStyle, pack, resolved),
      signature: senderLine(sender, tone, pack),
      language,
      detectedOccasion: resolved,
      usedDetail: clause || "",
      parsedRelationship: parsed.relationship ? parsed.relationship.id : "",
      parsedName: parsed.name || "",
    };
  }

  function isRtl(lang) {
    return lang === "fa" || lang === "ar";
  }

  return { generate, clean, isRtl, getPack, detectIntent, resolveOccasion, parseIdea };
})();
