export interface QAItem {
  id: string;
  question: string;
  questionFa: string;
  answer: string;
  answerFa: string;
  tags: string[];
}

export const qaData: QAItem[] = [
  {
    id: "experience",
    question: "How many years of experience do you have?",
    questionFa: "چند سال تجربه داری؟",
    answer: "I have 6+ years of experience in UI/UX design, working across enterprise platforms, consumer apps, and design systems. I've delivered 40+ projects for brands like Daewoo, Snowa, Entekhab Holding, and Ardesia.",
    answerFa: "بیش از ۶ سال تجربه در طراحی UI/UX دارم و روی پلتفرم‌های سازمانی، اپلیکیشن‌های مصرفی و Design System کار کرده‌ام. بیش از ۴۰ پروژه برای برندهایی مانند دیوو، سنا، انتخاب هولدینگ و آردزیا تحویل داده‌ام.",
    tags: ["experience", "years", "background", "history", "career"],
  },
  {
    id: "services",
    question: "What services do you offer?",
    questionFa: "چه خدماتی ارائه میدی؟",
    answer: "I offer: UI Design, UX Research, Design Systems, Prototyping, Interaction Design, Responsive Web Design, Mobile App Design, Dashboard Design, Brand Identity, and Framer development. I work from concept to final handoff.",
    answerFa: "خدمات من شامل: UI Design، UX Research، Design System، Prototyping، Interaction Design، طراحی وب ریسپانسیو، طراحی اپلیکیشن موبایل، طراحی داشبورد، هویت برند و توسعه در Framer است. از مفهوم تا تحویل نهایی همراه هستم.",
    tags: ["services", "what", "offer", "do", "capabilities", "work"],
  },
  {
    id: "availability",
    question: "Are you available for new projects?",
    questionFa: "برای پروژه جدید در دسترس هستی؟",
    answer: "Yes, I'm currently available for new projects. I take on freelance work and full-time opportunities. Feel free to reach out at hi@hawid.ir to discuss your project.",
    answerFa: "بله، در حال حاضر برای پروژه‌های جدید در دسترس هستم. هم پروژه‌های فریلنسری و هم فرصت‌های تمام‌وقت می‌پذیرم. برای بحث درباره پروژه‌تان با من در hi@hawid.ir تماس بگیرید.",
    tags: ["available", "hire", "freelance", "project", "new", "booking"],
  },
  {
    id: "process",
    question: "What is your design process?",
    questionFa: "فرآیند طراحیت چطوره؟",
    answer: "My process: 1) Discovery & User Research — understanding the problem space. 2) Information Architecture — structuring content and flows. 3) Wireframing — low-fidelity concepts. 4) Visual Design — high-fidelity UI with design tokens. 5) Prototyping — interactive demos. 6) Developer Handoff — specs, assets, and code-ready tokens. I follow an iterative approach with regular feedback loops.",
    answerFa: "فرآیند من: ۱) کشف و User Research — درک فضای مسئله. ۲) Information Architecture — ساختاربندی محتوا و Flows. ۳) Wireframing — مفاهیم کم‌ fidelity. ۴) Visual Design — UI با fidelity بالا و Design Tokens. ۵) Prototyping — دموهای تعاملی. ۶) Developer Handoff — مشخصات، Assetها و توکن‌های آماده کد. رویکرد تکرارشونده با حلقه‌های بازخورد منظم دارم.",
    tags: ["process", "method", "approach", "workflow", "how", "work"],
  },
  {
    id: "tools",
    question: "What tools do you use?",
    questionFa: "از چه ابزارهایی استفاده میکنی؟",
    answer: "Primary tools: Figma (design & prototyping), Framer (web development), React + TypeScript + TailwindCSS (code implementations). Also skilled in Git, VS Code, and various design system tools. I believe in using the right tool for each project.",
    answerFa: "ابزارهای اصلی: Figma (طراحی و پروتوتایپ)، Framer (توسعه وب)، React + TypeScript + TailwindCSS (پیاده‌سازی کد). همچنین در Git، VS Code و ابزارهای مختلف Design System مهارت دارم. معتقدم ابزار درست را برای هر پروژه باید انتخاب کرد.",
    tags: ["tools", "software", "figma", "framer", "react", "tech", "stack"],
  },
  {
    id: "timeline",
    question: "How long does a typical project take?",
    questionFa: "یک پروژه معمولا چقدر طول میکشه؟",
    answer: "It depends on scope: Landing page: 1-2 weeks. Full website: 3-6 weeks. Mobile app: 4-8 weeks. Design system: 6-12 weeks. Enterprise platform: 2-4 months. I provide a detailed timeline after the initial discovery phase.",
    answerFa: "بسته به حوزه پروژه متغیر است: لندینگ پیج: ۱-۲ هفته. وب‌سایت کامل: ۳-۶ هفته. اپلیکیشن موبایل: ۴-۸ هفته. Design System: ۶-۱۲ هفته. پلتفرم سازمانی: ۲-۴ ماه. زمان‌بندی دقیق پس از فاز کشف اولیه ارائه می‌دهم.",
    tags: ["timeline", "duration", "how long", "time", "deadline", "schedule"],
  },
  {
    id: "pricing",
    question: "What are your rates?",
    questionFa: "نرخ‌هات چنده؟",
    answer: "I offer flexible pricing: Hourly ($40-60/hr), Project-based (scoped after discovery), or Monthly retainer for ongoing work. Every project starts with a free 30-minute consultation to understand your needs and provide an accurate estimate.",
    answerFa: "قیمت‌گذاری انعطاف‌پذیر دارم: ساعتی ($40-60/hr)، پروژه‌ای (پس از کشف مشخص می‌شود) یا ماهانه برای کار مداوم. هر پروژه با یک مشاوره رایگان ۳۰ دقیقه‌ای شروع می‌شود تا نیازهای شما درک شود و برآورد دقیق ارائه شود.",
    tags: ["price", "pricing", "cost", "rate", "hourly", "budget", "how much"],
  },
  {
    id: "design-system",
    question: "Can you build a design system?",
    questionFa: "میتونی Design System بسازی؟",
    answer: "Absolutely. I've built 8+ design systems from scratch. My approach includes: design tokens (colors, typography, spacing), component library (80+ components), documentation, Figma variables, and developer-ready exports. Systems I build are scalable, accessible (WCAG 2.1 AA), and reduce design inconsistencies by 90%.",
    answerFa: "قطعاً. بیش از ۸ Design System از صفر ساخته‌ام. رویکرد من شامل: Design Tokens (رنگ‌ها، تایپوگرافی، فاصله‌گذاری)، کتابخانه مؤلفه‌ها (بیش از ۸۰ مؤلفه)، مستندات، Figma Variables و خروجی‌های آماده توسعه است. سیستم‌هایی که می‌سازم مقیاس‌پذیر، در دسترس (WCAG 2.1 AA) و کاهش‌دهنده ۹۰٪ ناهماهنگی‌های طراحی هستند.",
    tags: ["design system", "tokens", "components", "library", "figma"],
  },
  {
    id: "collaboration",
    question: "How do you work with developers?",
    questionFa: "چطور با توسعه‌دهندگان کار میکنی؟",
    answer: "I work closely with front-end developers to ensure pixel-perfect implementation. I provide: Figma dev mode specs, design tokens (CSS variables), component documentation, responsive breakpoints, and interactive prototypes. I also code in React + TailwindCSS, so I understand technical constraints firsthand.",
    answerFa: "نزدیک با توسعه‌دهندگان front-end کار می‌کنم تا پیاده‌سازی pixel-perfect تضمین شود. ارائه می‌دهم: مشخصات Figma Dev Mode، Design Tokens (CSS Variables)، مستندات مؤلفه‌ها، Breakpoints ریسپانسیو و پروتوتایپ‌های تعاملی. همچنین در React + TailwindCSS کدنویسی می‌کنم، پس محدودیت‌های فنی را از نزدیک درک می‌کنم.",
    tags: ["developer", "handoff", "collaboration", "team", "code", "implementation"],
  },
  {
    id: "accessibility",
    question: "Do you design for accessibility?",
    questionFa: "طراحی برای دسترسی‌پذیری انجام میدی؟",
    answer: "Yes, accessibility is a core principle in my work. I follow WCAG 2.1 AA standards, ensure proper color contrast, keyboard navigation, screen reader compatibility, and semantic HTML structure. All design systems I build include accessibility baked in from day one.",
    answerFa: "بله، دسترسی‌پذیری یک اصل محوری در کار من است. از استانداردهای WCAG 2.1 AA پیروی می‌کنم، کنتراست رنگ مناسب، ناوبری با کیبورد، سازگاری با Screen Reader و ساختار HTML معنادار را تضمین می‌کنم. تمام Design System‌هایی که می‌سازم از روز اول دسترسی‌پذیری را در خود دارند.",
    tags: ["accessibility", "a11y", "wcag", "screen reader", "keyboard"],
  },
  {
    id: "portfolio",
    question: "Can I see your portfolio?",
    questionFa: "میتونم نمونه‌کارهات رو ببینم؟",
    answer: "Yes! Scroll through the Work section above to see my selected projects including Daewoo, Snowa, Entekhab Holding, Ardesia, and Shadow Agency. For more, visit hawid.ir or check my Dribbble at dribbble.com/derhami.",
    answerFa: "بله! بخش نمونه‌کارها در بالا را مرور کنید تا پروژه‌های منتخب من شامل دیوو، سنا، انتخاب هولدینگ، آردزیا و شادو ایجنسی را ببینید. برای اطلاعات بیشتر به hawid.ir یا Dribbble من در dribbble.com/derhami مراجعه کنید.",
    tags: ["portfolio", "work", "projects", "see", "show", " examples"],
  },
  {
    id: "contact",
    question: "How can I contact you?",
    questionFa: "چطور میتونم باهات تماس بگیرم؟",
    answer: "Email: hi@hawid.ir | Phone: +98 933 484 7452 | Telegram: t.me/derhami | LinkedIn: linkedin.com/in/derhami | Dribbble: dribbble.com/derhami | Instagram: @derhami | Or use the contact section below.",
    answerFa: "ایمیل: hi@hawid.ir | تلفن: +۹۸ ۹۳۳ ۴۸۴ ۷۴۵۲ | تلگرام: t.me/derhami | لینکدین: linkedin.com/in/derhami | دریبل: dribbble.com/derhami | اینستاگرام: @derhami | یا از بخش تماس در پایین استفاده کنید.",
    tags: ["contact", "email", "phone", "reach", "touch", "get in touch"],
  },
  {
    id: "location",
    question: "Where are you based?",
    questionFa: "کجا هستی؟",
    answer: "I'm based in Isfahan, Iran. However, I work remotely with clients worldwide. Time zone is UTC+3:30 (IRST). I'm flexible with meeting times for international clients.",
    answerFa: "در اصفهان، ایران هستم. اما از راه دور با مشتریان در سراسر جهان کار می‌کنم. منطقه زمانی UTC+3:30 (IRST). برای جلسات با مشتریان بین‌المللی انعطاف‌پذیر هستم.",
    tags: ["location", "where", "based", "remote", "iran", "isfahan"],
  },
  {
    id: "education",
    question: "What is your educational background?",
    questionFa: "تحصیلاتت چیه؟",
    answer: "I hold a degree in Computer Science / IT. My formal education combined with 6+ years of hands-on design experience gives me a unique blend of technical understanding and design thinking. I also continuously learn through design communities and online courses.",
    answerFa: "مدرک کارشناسی در علوم کامپیوتر / IT دارم. تحصیلات رسمی من در کنار بیش از ۶ سال تجربه عملی طراحی، ترکیب منحصربه‌فردی از درک فنی و طراحی اندیشی به من می‌دهد. همچنین از طریق جوامع طراحی و دوره‌های آنلاین به طور مداوم یاد می‌گیرم.",
    tags: ["education", "degree", "university", "study", "background", " qualification"],
  },
];
