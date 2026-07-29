"use client";

import {
  type CSSProperties,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Bell,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Columns3,
  Copy,
  FileSpreadsheet,
  Eye,
  Filter,
  GitBranch,
  Globe2,
  HandCoins,
  LayoutDashboard,
  LockKeyhole,
  LogIn,
  MapPin,
  Menu,
  Moon,
  MoreHorizontal,
  PackageCheck,
  PackagePlus,
  Pencil,
  Plus,
  Phone,
  Search,
  Save,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Trash2,
  Truck,
  Upload,
  UserRound,
  UsersRound,
  Warehouse,
  WifiOff,
  X,
} from "lucide-react";

type Lang = "ar" | "en";
type Theme = "light" | "dark";
type Screen =
  | "login"
  | "shipments"
  | "statuses"
  | "areas"
  | "priceLists"
  | "courierRates"
  | "shipmentPolicies"
  | "addShipment"
  | "confirmation"
  | "assignment"
  | "courierShipments";
type Scenario =
  | "ready"
  | "loading"
  | "empty"
  | "delayed"
  | "unavailable"
  | "conflict";
type TabId = "all" | "action" | "warehouse" | "courier" | "incomplete";

type Localized = {
  ar: string;
  en: string;
};

type Shipment = {
  id: string;
  reference: string;
  recipient: Localized;
  phone: string;
  sender: Localized;
  area: Localized;
  governorate: Localized;
  status: Localized;
  statusPolicyId?: string;
  statusTone: "blue" | "orange" | "green" | "gray" | "red";
  custody: Localized;
  custodyType: "warehouse" | "courier" | "recipient";
  courier: Localized | null;
  amount: number;
  deliveryDate: Localized;
  required: Localized;
  requiredType: "none" | "attention" | "incomplete";
  lastEvent: Localized;
  confirmation: Localized;
  confirmationCode?: "confirmed" | "no_answer" | "later" | "not_recorded";
  confirmationHistory?: {
    id: string;
    result: "confirmed" | "no_answer" | "later";
    note: string;
    nextContact: string;
    timestamp: Localized;
  }[];
  statusHistory?: {
    id: string;
    statusPolicyId: string;
    status: Localized;
    color: string;
    recordedBy: Localized;
    collectedAmount: number | null;
    deliveredPieces: number | null;
    returnedPieces: number | null;
    reason: string;
    note: string;
    nextDate: string;
    timestamp: Localized;
  }[];
  pieces: number;
  shippingFee: number;
  shippingPayer: "recipient" | "sender";
  address: Localized;
};

const copy = {
  ar: {
    product: "تسليم",
    productSub: "للشحن الداخلي",
    loginTitle: "مرحبًا بعودتك",
    loginDescription: "أدخل بياناتك للوصول إلى مساحة تشغيل شركتك.",
    identifier: "رقم الهاتف أو اسم المستخدم",
    identifierPlaceholder: "مثال: 0100 000 0000",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    remember: "تذكر هذا الجهاز",
    forgot: "نسيت كلمة المرور؟",
    enter: "دخول إلى مساحة العمل",
    preview: "استعراض النموذج",
    help: "مركز المساعدة",
    secure: "دخول آمن ومحمي",
    demo: "نموذج تصميم تجريبي — لا تُحفظ أو تُرسل أي بيانات",
    heroTitle: "تشغيل أدق.\nتسليم أسرع.",
    heroText:
      "كل شحنة، وحيازة، وتحصيل في مكانه الصحيح — لحظة بلحظة.",
    live: "جاهزية التشغيل",
    liveValue: "كل شيء تحت السيطرة",
    verified: "سجل أحداث موثوق",
    flexible: "سياسات مرنة",
    protected: "بيانات محمية",
    overview: "الرئيسية",
    operations: "التشغيل",
    shipments: "الشحنات",
    confirmation: "التأكيد والمتابعة",
    assignment: "التوزيع والإسناد",
    warehouse: "المخزن",
    parties: "الأطراف",
    senders: "الرسل",
    couriers: "المناديب",
    policies: "السياسات والتحكم",
    settings: "الإعدادات",
    collapse: "طي القائمة",
    workspace: "شركة تسليم للشحن الداخلي",
    branch: "الفرع الرئيسي",
    welcome: "صباح الخير، أحمد",
    today: "نظرة سريعة على حركة الشحنات اليوم",
    notifications: "الإشعارات",
    globalSearch: "ابحث أو انتقل بسرعة...",
    pageTitle: "الشحنات",
    pageSubtitle: "تابع كل شحنة من لحظة دخولها حتى إغلاق حسابها.",
    addShipment: "إضافة شحنة",
    total: "إجمالي الشحنات",
    needAction: "تحتاج إجراء",
    inWarehouse: "داخل المخزن",
    withCourier: "مع المناديب",
    todayMovement: "حركة اليوم",
    compared: "+12% عن أمس",
    searchPlaceholder: "رقم الشحنة، الباركود، الهاتف أو مرجع الراسل...",
    filters: "الفلاتر",
    columns: "الأعمدة",
    all: "الكل",
    incomplete: "بيانات ناقصة",
    screenState: "حالة العرض",
    ready: "الوضع الطبيعي",
    loading: "تحميل",
    empty: "لا توجد نتائج",
    delayed: "تحديث متأخر",
    unavailable: "الخدمة غير متاحة",
    conflict: "تعارض بيانات",
    results: "شحنة",
    tableShipment: "الشحنة",
    recipient: "المستلم",
    sender: "الراسل",
    region: "المنطقة",
    status: "الحالة الحالية",
    custody: "الحيازة",
    courier: "المندوب",
    amount: "البيانات المالية",
    delivery: "موعد التسليم",
    requiredNow: "مطلوب الآن",
    lastEvent: "آخر حركة",
    noCourier: "غير مسند",
    details: "التفاصيل",
    page: "صفحة 1 من 18",
    previous: "السابق",
    next: "التالي",
    clear: "مسح الكل",
    filterTitle: "تصفية الشحنات",
    governorate: "المحافظة",
    anyGovernorate: "كل المحافظات",
    anyStatus: "كل الحالات",
    anyCustody: "كل أماكن الحيازة",
    apply: "عرض النتائج",
    close: "إغلاق",
    quickView: "معاينة سريعة",
    shipmentFile: "ملف الشحنة",
    copyNumber: "نسخ رقم الشحنة",
    financial: "التحصيل ومصاريف الشحن",
    codAllowed: "سعر الشحنة",
    shippingFee: "مصاريف الشحن",
    totalDue: "إجمالي المطلوب",
    senderDue: "مستحق الراسل",
    shippingPayer: "تحمّل الشحن",
    shipmentPrice: "سعر الشحنة",
    shippingPrice: "سعر الشحن",
    payerRecipient: "على المستلم",
    payerSender: "على الراسل",
    collectionShort: "تحصيل",
    shippingShort: "شحن",
    pieces: "عدد القطع",
    address: "عنوان التسليم",
    currentCustody: "الحيازة الحالية",
    orderConfirmation: "تأكيد الطلب",
    timeline: "آخر الأحداث",
    openFull: "فتح ملف الشحنة",
    handoff: "هذه الخطوة ستُصمم في المرحلة التالية",
    copied: "تم نسخ رقم الشحنة",
    updated: "آخر تحديث منذ دقيقة",
    delayedTitle: "التحديث اللحظي متأخر قليلًا",
    delayedText:
      "آخر بيانات مؤكدة معروضة. سنحدّث القائمة تلقائيًا عند عودة الاتصال.",
    unavailableTitle: "تعذر تحميل الشحنات الآن",
    unavailableText:
      "بياناتك محفوظة. أعد المحاولة بعد التأكد من الاتصال.",
    retry: "إعادة المحاولة",
    conflictTitle: "تغيّرت بعض الشحنات أثناء فتح الصفحة",
    conflictText: "حدّث القائمة لمراجعة الحقيقة الحالية قبل تنفيذ أي إجراء.",
    refresh: "تحديث القائمة",
    emptyTitle: "لا توجد شحنات تطابق بحثك",
    emptyText: "جرّب تغيير عبارة البحث أو مسح بعض الفلاتر.",
    logout: "العودة للدخول",
    mobileNav: "فتح القائمة",
    demoData: "بيانات تجريبية",
  },
  en: {
    product: "Tasleem",
    productSub: "Domestic Shipping",
    loginTitle: "Welcome back",
    loginDescription: "Enter your details to access your operations workspace.",
    identifier: "Phone number or username",
    identifierPlaceholder: "e.g. 0100 000 0000",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    remember: "Remember this device",
    forgot: "Forgot password?",
    enter: "Enter workspace",
    preview: "Explore prototype",
    help: "Help Center",
    secure: "Secure, protected sign in",
    demo: "Design prototype — no data is stored or sent",
    heroTitle: "Precise operations.\nFaster delivery.",
    heroText:
      "Every shipment, custody handoff and collection in its right place — in real time.",
    live: "Operational readiness",
    liveValue: "Everything under control",
    verified: "Trusted event trail",
    flexible: "Flexible policies",
    protected: "Protected data",
    overview: "Overview",
    operations: "Operations",
    shipments: "Shipments",
    confirmation: "Confirmation & follow-up",
    assignment: "Distribution & assignment",
    warehouse: "Warehouse",
    parties: "Parties",
    senders: "Senders",
    couriers: "Couriers",
    policies: "Policies & control",
    settings: "Settings",
    collapse: "Collapse sidebar",
    workspace: "Tasleem Domestic Shipping",
    branch: "Main branch",
    welcome: "Good morning, Ahmed",
    today: "A quick view of today’s shipment movement",
    notifications: "Notifications",
    globalSearch: "Search or jump to...",
    pageTitle: "Shipments",
    pageSubtitle: "Track every shipment from intake until financial closure.",
    addShipment: "Add shipment",
    total: "Total shipments",
    needAction: "Needs action",
    inWarehouse: "In warehouse",
    withCourier: "With couriers",
    todayMovement: "Today’s movement",
    compared: "+12% vs yesterday",
    searchPlaceholder: "Shipment, barcode, phone or sender reference...",
    filters: "Filters",
    columns: "Columns",
    all: "All",
    incomplete: "Incomplete data",
    screenState: "Screen state",
    ready: "Normal",
    loading: "Loading",
    empty: "No results",
    delayed: "Delayed sync",
    unavailable: "Unavailable",
    conflict: "Data conflict",
    results: "shipments",
    tableShipment: "Shipment",
    recipient: "Recipient",
    sender: "Sender",
    region: "Area",
    status: "Current status",
    custody: "Custody",
    courier: "Courier",
    amount: "Financial details",
    delivery: "Delivery date",
    requiredNow: "Required now",
    lastEvent: "Last event",
    noCourier: "Unassigned",
    details: "Details",
    page: "Page 1 of 18",
    previous: "Previous",
    next: "Next",
    clear: "Clear all",
    filterTitle: "Filter shipments",
    governorate: "Governorate",
    anyGovernorate: "All governorates",
    anyStatus: "All statuses",
    anyCustody: "All custody locations",
    apply: "Show results",
    close: "Close",
    quickView: "Quick preview",
    shipmentFile: "Shipment file",
    copyNumber: "Copy shipment number",
    financial: "Collection & shipping fee",
    codAllowed: "Shipment price",
    shippingFee: "Shipping fee",
    totalDue: "Total due",
    senderDue: "Sender due",
    shippingPayer: "Shipping paid by",
    shipmentPrice: "Shipment price",
    shippingPrice: "Shipping price",
    payerRecipient: "Recipient",
    payerSender: "Sender",
    collectionShort: "COD",
    shippingShort: "Shipping",
    pieces: "Piece count",
    address: "Delivery address",
    currentCustody: "Current custody",
    orderConfirmation: "Order confirmation",
    timeline: "Recent events",
    openFull: "Open shipment file",
    handoff: "This action will be designed in the next phase",
    copied: "Shipment number copied",
    updated: "Updated a minute ago",
    delayedTitle: "Live updates are slightly delayed",
    delayedText:
      "The latest confirmed data is shown. The list will refresh automatically when connection returns.",
    unavailableTitle: "Shipments can’t be loaded right now",
    unavailableText:
      "Your data is safe. Try again after checking the connection.",
    retry: "Try again",
    conflictTitle: "Some shipments changed while this page was open",
    conflictText: "Refresh to review the current truth before taking action.",
    refresh: "Refresh list",
    emptyTitle: "No shipments match your search",
    emptyText: "Try another query or clear some filters.",
    logout: "Back to login",
    mobileNav: "Open navigation",
    demoData: "Demo data",
  },
} as const;

const shipments: Shipment[] = [
  {
    id: "TS-12864",
    reference: "LM-4481",
    recipient: { ar: "محمد عادل", en: "Mohamed Adel" },
    phone: "010 •••• 4281",
    sender: { ar: "متجر لمسة", en: "Lamsa Store" },
    area: { ar: "مدينة نصر", en: "Nasr City" },
    governorate: { ar: "القاهرة", en: "Cairo" },
    status: { ar: "جاهزة للإسناد", en: "Ready for assignment" },
    statusTone: "blue",
    custody: { ar: "المخزن الرئيسي", en: "Main warehouse" },
    custodyType: "warehouse",
    courier: null,
    amount: 780,
    deliveryDate: { ar: "اليوم، 2:00 م", en: "Today, 2:00 PM" },
    required: { ar: "إسناد لمندوب", en: "Assign courier" },
    requiredType: "attention",
    lastEvent: { ar: "دخل المخزن منذ 18 د", en: "Entered warehouse 18m ago" },
    confirmation: { ar: "تم التأكيد", en: "Confirmed" },
    pieces: 2,
    shippingFee: 55,
    shippingPayer: "recipient",
    address: {
      ar: "١٢ شارع الطيران، مدينة نصر، القاهرة",
      en: "12 El Tayaran St., Nasr City, Cairo",
    },
  },
  {
    id: "TS-12863",
    reference: "NW-9012",
    recipient: { ar: "سارة محمود", en: "Sara Mahmoud" },
    phone: "011 •••• 9034",
    sender: { ar: "نواة", en: "Nawa" },
    area: { ar: "الدقي", en: "Dokki" },
    governorate: { ar: "الجيزة", en: "Giza" },
    status: { ar: "قيد التوصيل", en: "Out for delivery" },
    statusTone: "orange",
    custody: { ar: "مع المندوب", en: "With courier" },
    custodyType: "courier",
    courier: { ar: "أحمد رجب", en: "Ahmed Ragab" },
    amount: 1250,
    deliveryDate: { ar: "اليوم، 4:30 م", en: "Today, 4:30 PM" },
    required: { ar: "لا يوجد", en: "None" },
    requiredType: "none",
    lastEvent: { ar: "خرجت مع المندوب 10:42 ص", en: "With courier at 10:42 AM" },
    confirmation: { ar: "تم التأكيد", en: "Confirmed" },
    pieces: 1,
    shippingFee: 60,
    shippingPayer: "recipient",
    address: {
      ar: "٨ شارع مصدق، الدقي، الجيزة",
      en: "8 Mossadak St., Dokki, Giza",
    },
  },
  {
    id: "TS-12860",
    reference: "HB-2214",
    recipient: { ar: "عمر خالد", en: "Omar Khaled" },
    phone: "012 •••• 1176",
    sender: { ar: "هيبة", en: "Hayba" },
    area: { ar: "سيدي جابر", en: "Sidi Gaber" },
    governorate: { ar: "الإسكندرية", en: "Alexandria" },
    status: { ar: "تحتاج استكمال بيانات", en: "Needs data completion" },
    statusTone: "red",
    custody: { ar: "المخزن الرئيسي", en: "Main warehouse" },
    custodyType: "warehouse",
    courier: null,
    amount: 460,
    deliveryDate: { ar: "غدًا", en: "Tomorrow" },
    required: { ar: "هاتف أساسي", en: "Primary phone" },
    requiredType: "incomplete",
    lastEvent: { ar: "أضيفت عبر Excel منذ ساعة", en: "Imported from Excel 1h ago" },
    confirmation: { ar: "غير مستخدم", en: "Not used" },
    pieces: 3,
    shippingFee: 70,
    shippingPayer: "sender",
    address: {
      ar: "شارع المشير أحمد إسماعيل، سيدي جابر",
      en: "El Mosheer Ahmed Ismail St., Sidi Gaber",
    },
  },
  {
    id: "TS-12857",
    reference: "OR-5712",
    recipient: { ar: "مريم سامح", en: "Mariam Sameh" },
    phone: "010 •••• 7754",
    sender: { ar: "أوركيد", en: "Orchid" },
    area: { ar: "المعادي", en: "Maadi" },
    governorate: { ar: "القاهرة", en: "Cairo" },
    status: { ar: "تم التسليم", en: "Delivered" },
    statusTone: "green",
    custody: { ar: "تم التسليم للمستلم", en: "Delivered to recipient" },
    custodyType: "recipient",
    courier: null,
    amount: 980,
    deliveryDate: { ar: "اليوم، 12:10 م", en: "Today, 12:10 PM" },
    required: { ar: "تسوية التحصيل", en: "Settle collection" },
    requiredType: "attention",
    lastEvent: { ar: "سجّل المندوب التسليم منذ 9 د", en: "Courier delivered 9m ago" },
    confirmation: { ar: "تم التأكيد", en: "Confirmed" },
    pieces: 1,
    shippingFee: 55,
    shippingPayer: "recipient",
    address: {
      ar: "٢١ شارع النصر، المعادي، القاهرة",
      en: "21 El Nasr St., Maadi, Cairo",
    },
  },
  {
    id: "TS-12854",
    reference: "BR-3338",
    recipient: { ar: "يوسف شريف", en: "Youssef Sherif" },
    phone: "015 •••• 4418",
    sender: { ar: "بريق", en: "Bareeq" },
    area: { ar: "الزقازيق", en: "Zagazig" },
    governorate: { ar: "الشرقية", en: "Sharqia" },
    status: { ar: "مؤجل للموعد", en: "Deferred to date" },
    statusTone: "gray",
    custody: { ar: "المخزن الرئيسي", en: "Main warehouse" },
    custodyType: "warehouse",
    courier: null,
    amount: 645,
    deliveryDate: { ar: "الأربعاء، 30 يوليو", en: "Wed, 30 Jul" },
    required: { ar: "انتظار الموعد", en: "Wait for date" },
    requiredType: "none",
    lastEvent: { ar: "استلم المخزن المرتجع أمس", en: "Warehouse received return yesterday" },
    confirmation: { ar: "تواصل لاحقًا", en: "Contact later" },
    pieces: 2,
    shippingFee: 65,
    shippingPayer: "sender",
    address: {
      ar: "شارع سعد زغلول، الزقازيق، الشرقية",
      en: "Saad Zaghloul St., Zagazig, Sharqia",
    },
  },
  {
    id: "TS-12851",
    reference: "AV-1190",
    recipient: { ar: "ندى وائل", en: "Nada Wael" },
    phone: "011 •••• 2911",
    sender: { ar: "أڤينيو", en: "Avenue" },
    area: { ar: "شبرا", en: "Shubra" },
    governorate: { ar: "القاهرة", en: "Cairo" },
    status: { ar: "بانتظار التأكيد", en: "Awaiting confirmation" },
    statusTone: "blue",
    custody: { ar: "المخزن الرئيسي", en: "Main warehouse" },
    custodyType: "warehouse",
    courier: null,
    amount: 370,
    deliveryDate: { ar: "غير محدد", en: "Not set" },
    required: { ar: "اتصال بالمستلم", en: "Call recipient" },
    requiredType: "attention",
    lastEvent: { ar: "لم يرد — المحاولة الأولى", en: "No answer — first attempt" },
    confirmation: { ar: "لم يرد", en: "No answer" },
    pieces: 1,
    shippingFee: 50,
    shippingPayer: "recipient",
    address: {
      ar: "١٥ شارع شبرا، القاهرة",
      en: "15 Shubra St., Cairo",
    },
  },
];

type StatusPolicy = {
  id: string;
  name: Localized;
  code: string;
  color: string;
  state: "published" | "draft";
  executors: Localized;
  visibility: Localized[];
  assignmentEffect: Localized;
  pieceEffect: Localized;
  financialEffect: Localized;
  appearsInAssignment: boolean;
  appearsInPricing: boolean;
  appearsInCourierRates: boolean;
  requiredFields: Localized[];
  usage: number;
  version: number;
};

const statusPolicies: StatusPolicy[] = [
  {
    id: "status-delivered",
    name: { ar: "تم التسليم", en: "Delivered" },
    code: "DELIVERED",
    color: "#07835a",
    state: "published",
    executors: { ar: "المندوب والعمليات", en: "Courier & operations" },
    visibility: [
      { ar: "العمليات", en: "Operations" },
      { ar: "الراسل", en: "Sender" },
      { ar: "المندوب", en: "Courier" },
    ],
    assignmentEffect: { ar: "إنهاء التكليف", en: "End assignment" },
    pieceEffect: { ar: "كل القطع مسلّمة", en: "All pieces delivered" },
    financialEffect: { ar: "مبلغ فقط", en: "Money only" },
    appearsInAssignment: false,
    appearsInPricing: true,
    appearsInCourierRates: true,
    requiredFields: [
      { ar: "المبلغ المحصل", en: "Collected amount" },
      { ar: "عدد القطع المسلمة", en: "Delivered pieces" },
    ],
    usage: 1842,
    version: 7,
  },
  {
    id: "status-partial",
    name: { ar: "تسليم جزئي", en: "Partial delivery" },
    code: "PARTIAL",
    color: "#2551b9",
    state: "published",
    executors: { ar: "المندوب والعمليات", en: "Courier & operations" },
    visibility: [
      { ar: "العمليات", en: "Operations" },
      { ar: "الراسل", en: "Sender" },
    ],
    assignmentEffect: { ar: "مسار مرتجع", en: "Return route" },
    pieceEffect: { ar: "إدخال المسلّم واشتقاق الراجع", en: "Enter delivered; derive return" },
    financialEffect: { ar: "مبلغ ومرتجع", en: "Money and return" },
    appearsInAssignment: false,
    appearsInPricing: true,
    appearsInCourierRates: true,
    requiredFields: [
      { ar: "المبلغ المحصل", en: "Collected amount" },
      { ar: "عدد القطع المسلمة", en: "Delivered pieces" },
    ],
    usage: 214,
    version: 4,
  },
  {
    id: "status-deferred",
    name: { ar: "مؤجل للموعد", en: "Deferred" },
    code: "DEFERRED",
    color: "#6b7c93",
    state: "published",
    executors: {
      ar: "المندوب وخدمة العملاء والعمليات",
      en: "Courier, customer service & operations",
    },
    visibility: [
      { ar: "العمليات", en: "Operations" },
      { ar: "الراسل", en: "Sender" },
    ],
    assignmentEffect: { ar: "إنهاء + قائمة متابعة", en: "End + follow-up queue" },
    pieceEffect: { ar: "لا يستخدم عدد القطع", en: "Ignore piece count" },
    financialEffect: { ar: "مبلغ فقط", en: "Money only" },
    appearsInAssignment: false,
    appearsInPricing: true,
    appearsInCourierRates: true,
    requiredFields: [
      { ar: "الموعد الجديد", en: "New date" },
      { ar: "سبب الحالة", en: "Status reason" },
    ],
    usage: 486,
    version: 5,
  },
  {
    id: "status-cancelled",
    name: { ar: "لاغي", en: "Cancelled" },
    code: "CANCELLED",
    color: "#c43737",
    state: "published",
    executors: { ar: "العمليات فقط", en: "Operations only" },
    visibility: [
      { ar: "العمليات", en: "Operations" },
      { ar: "الراسل", en: "Sender" },
    ],
    assignmentEffect: { ar: "مسار مرتجع", en: "Return route" },
    pieceEffect: { ar: "كل القطع راجعة", en: "All pieces returned" },
    financialEffect: { ar: "مرتجع فقط", en: "Return only" },
    appearsInAssignment: false,
    appearsInPricing: true,
    appearsInCourierRates: true,
    requiredFields: [
      { ar: "سبب الحالة", en: "Status reason" },
      { ar: "ملاحظة", en: "Note" },
    ],
    usage: 329,
    version: 3,
  },
  {
    id: "status-no-answer",
    name: { ar: "لم يرد", en: "No answer" },
    code: "NO_ANSWER",
    color: "#e95f00",
    state: "published",
    executors: { ar: "خدمة العملاء", en: "Customer service" },
    visibility: [{ ar: "العمليات", en: "Operations" }],
    assignmentEffect: {
      ar: "إنهاء + قائمة متابعة",
      en: "End + follow-up queue",
    },
    pieceEffect: { ar: "لا يستخدم عدد القطع", en: "Ignore piece count" },
    financialEffect: { ar: "بلا أثر مالي", en: "No financial effect" },
    appearsInAssignment: false,
    appearsInPricing: false,
    appearsInCourierRates: false,
    requiredFields: [{ ar: "ملاحظة", en: "Note" }],
    usage: 671,
    version: 2,
  },
  {
    id: "status-address-review",
    name: { ar: "مراجعة العنوان", en: "Address review" },
    code: "ADDRESS_REVIEW",
    color: "#8b5cf6",
    state: "draft",
    executors: { ar: "العمليات فقط", en: "Operations only" },
    visibility: [{ ar: "العمليات", en: "Operations" }],
    assignmentEffect: {
      ar: "إنهاء + قائمة متابعة",
      en: "End + follow-up queue",
    },
    pieceEffect: { ar: "لا يستخدم عدد القطع", en: "Ignore piece count" },
    financialEffect: { ar: "بلا أثر مالي", en: "No financial effect" },
    appearsInAssignment: false,
    appearsInPricing: false,
    appearsInCourierRates: false,
    requiredFields: [
      { ar: "العنوان الصحيح", en: "Correct address" },
      { ar: "ملاحظة", en: "Note" },
    ],
    usage: 0,
    version: 1,
  },
];

const statusCopy = {
  ar: {
    title: "حالات الشحنات",
    subtitle: "أنشئ أي حالة وحدد سياستها التشغيلية والمالية بدون تعديل الأكواد.",
    add: "إضافة حالة",
    active: "حالات منشورة",
    financial: "لها أثر مالي",
    pricing: "تظهر في قوائم الأسعار",
    draft: "مسودة تحتاج مراجعة",
    search: "ابحث باسم الحالة أو الكود...",
    allStates: "كل الحالات",
    published: "منشورة",
    drafts: "المسودات",
    allPricing: "كل سياسات التسعير",
    inPricing: "تظهر في الأسعار",
    notInPricing: "لا تظهر في الأسعار",
    status: "الحالة",
    operation: "سياسة التشغيل",
    money: "الأثر المالي والتسعير",
    visibility: "الظهور",
    usage: "الاستخدام",
    version: "نسخة",
    edit: "تعديل السياسة",
    publishedBadge: "منشورة",
    draftBadge: "مسودة",
    pricingBadge: "ضمن قائمة الأسعار",
    noPricing: "خارج قائمة الأسعار",
    courierRatesBadge: "ضمن عمولات المناديب",
    noCourierRates: "خارج عمولات المناديب",
    noResults: "لا توجد حالات تطابق البحث الحالي.",
    controlNote:
      "لا توجد حالة مفروضة داخل النظام؛ كل حالة بالأسفل هي سياسة قابلة للتعديل أو التعطيل حسب طريقة عمل شركتك.",
    editorTitle: "سياسة الحالة",
    newTitle: "إضافة حالة جديدة",
    basics: "التعريف الأساسي",
    arabicName: "اسم الحالة بالعربية",
    englishName: "اسم الحالة بالإنجليزية",
    code: "الكود الداخلي",
    color: "لون الحالة",
    publishState: "حالة النشر",
    permissions: "من يستطيع تسجيلها ومن يراها",
    executor: "من يستطيع تسجيل الحالة",
    operationsOnly: "العمليات فقط",
    courierOperations: "المندوب والعمليات",
    serviceOperations: "خدمة العملاء والعمليات",
    courierServiceOperations: "المندوب وخدمة العملاء والعمليات",
    visibleTo: "تظهر إلى",
    operationalEffect: "أثرها على التشغيل والحيازة",
    assignment: "ما يحدث لتكليف المندوب",
    endAssignment: "إنهاء التكليف",
    keepAssignment: "إبقاء التكليف",
    followUp: "إنهاء التكليف وإرسالها للمتابعة",
    returnRoute: "إنهاء التكليف وإدخال مسار المرتجع",
    assignmentVisibilityToggle: "إظهار شحنات هذه الحالة في صفحة الإسناد",
    assignmentVisibilityHint:
      "عند الإيقاف لن تظهر أي شحنة تحمل هذه الحالة ضمن الشحنات المتاحة للمندوب، مع بقاء الشحنة محفوظة في مكانها الصحيح.",
    pieces: "سياسة القطع والمرتجع",
    ignorePieces: "لا تستخدم عدد القطع",
    allDelivered: "كل القطع مسلمة",
    allReturned: "كل القطع مرتجعة",
    partialPieces: "إدخال المسلّم وحساب المرتجع تلقائيًا",
    financialSection: "الماليات وقائمة الأسعار",
    financialEffect: "الأثر المالي",
    noFinancial: "بلا أثر مالي",
    moneyOnly: "مبلغ فقط",
    returnOnly: "مرتجع فقط",
    moneyReturn: "مبلغ ومرتجع",
    pricingToggle: "إظهار الحالة في قوائم الأسعار",
    pricingHint:
      "عند التفعيل ستظهر الحالة بجوار كل منطقة داخل قائمة الأسعار لتحديد سعر مستقل لها.",
    courierPricingToggle: "إظهار الحالة في قوائم عمولات المناديب",
    courierPricingHint:
      "عند التفعيل ستظهر الحالة في خطط العمولة لتحديد مستحق المندوب عنها بكل منطقة.",
    fields: "البيانات المطلوبة عند تسجيل الحالة",
    reason: "سبب الحالة",
    note: "ملاحظة",
    amount: "المبلغ المحصل",
    deliveredPieces: "عدد القطع المسلمة",
    newDate: "موعد جديد",
    cancel: "إلغاء",
    save: "حفظ السياسة",
    saved: "تم حفظ سياسة الحالة",
    created: "تمت إضافة الحالة الجديدة",
    demo: "تغييرات تجريبية داخل نموذج التصميم فقط",
  },
  en: {
    title: "Shipment statuses",
    subtitle: "Create any status and define its operational and financial policy without code changes.",
    add: "Add status",
    active: "Published statuses",
    financial: "Financial statuses",
    pricing: "Shown in price lists",
    draft: "Draft needs review",
    search: "Search status name or code...",
    allStates: "All statuses",
    published: "Published",
    drafts: "Drafts",
    allPricing: "All pricing policies",
    inPricing: "Shown in pricing",
    notInPricing: "Not in pricing",
    status: "Status",
    operation: "Operating policy",
    money: "Financial & pricing effect",
    visibility: "Visibility",
    usage: "Usage",
    version: "Version",
    edit: "Edit policy",
    publishedBadge: "Published",
    draftBadge: "Draft",
    pricingBadge: "In price lists",
    noPricing: "Outside price lists",
    courierRatesBadge: "In courier commissions",
    noCourierRates: "Outside courier commissions",
    noResults: "No statuses match the current search.",
    controlNote:
      "The system imposes no built-in status; every status below is a policy you can edit or disable to match your company.",
    editorTitle: "Status policy",
    newTitle: "Add a new status",
    basics: "Basic definition",
    arabicName: "Arabic status name",
    englishName: "English status name",
    code: "Internal code",
    color: "Status color",
    publishState: "Publishing state",
    permissions: "Who can record it and who can see it",
    executor: "Who can record this status",
    operationsOnly: "Operations only",
    courierOperations: "Courier & operations",
    serviceOperations: "Customer service & operations",
    courierServiceOperations: "Courier, customer service & operations",
    visibleTo: "Visible to",
    operationalEffect: "Operations and custody effect",
    assignment: "Courier assignment effect",
    endAssignment: "End assignment",
    keepAssignment: "Keep assignment",
    followUp: "End assignment and send to follow-up",
    returnRoute: "End assignment and start return route",
    assignmentVisibilityToggle: "Show shipments with this status in assignment",
    assignmentVisibilityHint:
      "When disabled, shipments with this status are excluded from available courier assignment while remaining safely stored in their current workflow.",
    pieces: "Pieces and return policy",
    ignorePieces: "Ignore piece count",
    allDelivered: "All pieces delivered",
    allReturned: "All pieces returned",
    partialPieces: "Enter delivered pieces and derive returns",
    financialSection: "Financials and price lists",
    financialEffect: "Financial effect",
    noFinancial: "No financial effect",
    moneyOnly: "Money only",
    returnOnly: "Return only",
    moneyReturn: "Money and return",
    pricingToggle: "Show status in price lists",
    pricingHint:
      "When enabled, the status appears beside every area in price lists with its own configurable price.",
    courierPricingToggle: "Show status in courier commission lists",
    courierPricingHint:
      "When enabled, the status appears in commission plans with a configurable courier due per area.",
    fields: "Required data when recording the status",
    reason: "Status reason",
    note: "Note",
    amount: "Collected amount",
    deliveredPieces: "Delivered pieces",
    newDate: "New date",
    cancel: "Cancel",
    save: "Save policy",
    saved: "Status policy saved",
    created: "New status added",
    demo: "Demo-only changes in the design prototype",
  },
} as const;

type AreaRecord = {
  id: string;
  name: Localized;
  code: string;
  state: "active" | "paused";
  order: number;
  aliases: string[];
  pricedLists: number;
  shipments: number;
  assignmentAllowed: boolean;
};

type GovernorateRecord = {
  id: string;
  name: Localized;
  code: string;
  state: "active" | "paused";
  order: number;
  areas: AreaRecord[];
};

type GeoEditorState = {
  kind: "governorate" | "area";
  isNew: boolean;
  governorateId: string;
  draft: {
    id: string;
    name: Localized;
    code: string;
    state: "active" | "paused";
    order: number;
    aliases: string[];
    assignmentAllowed: boolean;
  };
};

const governoratesData: GovernorateRecord[] = [
  {
    id: "gov-cairo",
    name: { ar: "القاهرة", en: "Cairo" },
    code: "CAI",
    state: "active",
    order: 1,
    areas: [
      {
        id: "area-nasr-city",
        name: { ar: "مدينة نصر", en: "Nasr City" },
        code: "CAI-NASR",
        state: "active",
        order: 1,
        aliases: ["عباس العقاد", "مصطفى النحاس"],
        pricedLists: 5,
        shipments: 642,
        assignmentAllowed: true,
      },
      {
        id: "area-heliopolis",
        name: { ar: "مصر الجديدة", en: "Heliopolis" },
        code: "CAI-HELIO",
        state: "active",
        order: 2,
        aliases: ["هليوبوليس", "روكسي"],
        pricedLists: 5,
        shipments: 418,
        assignmentAllowed: true,
      },
      {
        id: "area-maadi",
        name: { ar: "المعادي", en: "Maadi" },
        code: "CAI-MAADI",
        state: "active",
        order: 3,
        aliases: ["زهراء المعادي", "دجلة"],
        pricedLists: 5,
        shipments: 376,
        assignmentAllowed: true,
      },
      {
        id: "area-shubra",
        name: { ar: "شبرا", en: "Shubra" },
        code: "CAI-SHUBRA",
        state: "active",
        order: 4,
        aliases: ["روض الفرج"],
        pricedLists: 4,
        shipments: 287,
        assignmentAllowed: true,
      },
      {
        id: "area-new-cairo",
        name: { ar: "القاهرة الجديدة", en: "New Cairo" },
        code: "CAI-NEW",
        state: "paused",
        order: 5,
        aliases: ["التجمع", "الرحاب"],
        pricedLists: 3,
        shipments: 205,
        assignmentAllowed: false,
      },
    ],
  },
  {
    id: "gov-giza",
    name: { ar: "الجيزة", en: "Giza" },
    code: "GIZ",
    state: "active",
    order: 2,
    areas: [
      {
        id: "area-dokki",
        name: { ar: "الدقي", en: "Dokki" },
        code: "GIZ-DOKKI",
        state: "active",
        order: 1,
        aliases: ["ميدان الدقي"],
        pricedLists: 5,
        shipments: 391,
        assignmentAllowed: true,
      },
      {
        id: "area-mohandessin",
        name: { ar: "المهندسين", en: "Mohandessin" },
        code: "GIZ-MOH",
        state: "active",
        order: 2,
        aliases: ["جامعة الدول"],
        pricedLists: 5,
        shipments: 344,
        assignmentAllowed: true,
      },
      {
        id: "area-haram",
        name: { ar: "الهرم", en: "Haram" },
        code: "GIZ-HARAM",
        state: "active",
        order: 3,
        aliases: ["فيصل", "المريوطية"],
        pricedLists: 5,
        shipments: 516,
        assignmentAllowed: true,
      },
      {
        id: "area-october",
        name: { ar: "السادس من أكتوبر", en: "6th of October" },
        code: "GIZ-OCT",
        state: "active",
        order: 4,
        aliases: ["أكتوبر", "الحي المتميز"],
        pricedLists: 4,
        shipments: 228,
        assignmentAllowed: true,
      },
    ],
  },
  {
    id: "gov-alexandria",
    name: { ar: "الإسكندرية", en: "Alexandria" },
    code: "ALX",
    state: "active",
    order: 3,
    areas: [
      {
        id: "area-sidi-gaber",
        name: { ar: "سيدي جابر", en: "Sidi Gaber" },
        code: "ALX-SG",
        state: "active",
        order: 1,
        aliases: ["سموحة"],
        pricedLists: 5,
        shipments: 263,
        assignmentAllowed: true,
      },
      {
        id: "area-mandara",
        name: { ar: "المنتزه", en: "Montaza" },
        code: "ALX-MON",
        state: "active",
        order: 2,
        aliases: ["المندرة", "ميامي"],
        pricedLists: 5,
        shipments: 301,
        assignmentAllowed: true,
      },
      {
        id: "area-agami",
        name: { ar: "العجمي", en: "Agami" },
        code: "ALX-AGA",
        state: "paused",
        order: 3,
        aliases: ["البيطاش"],
        pricedLists: 2,
        shipments: 114,
        assignmentAllowed: false,
      },
    ],
  },
  {
    id: "gov-dakahlia",
    name: { ar: "الدقهلية", en: "Dakahlia" },
    code: "DKH",
    state: "active",
    order: 4,
    areas: [
      {
        id: "area-mansoura",
        name: { ar: "المنصورة", en: "Mansoura" },
        code: "DKH-MAN",
        state: "active",
        order: 1,
        aliases: ["حي الجامعة"],
        pricedLists: 5,
        shipments: 192,
        assignmentAllowed: true,
      },
      {
        id: "area-talkha",
        name: { ar: "طلخا", en: "Talkha" },
        code: "DKH-TAL",
        state: "active",
        order: 2,
        aliases: [],
        pricedLists: 4,
        shipments: 87,
        assignmentAllowed: true,
      },
    ],
  },
];

const geoCopy = {
  ar: {
    title: "المحافظات والمناطق",
    subtitle: "نظّم نطاق التغطية الذي تستخدمه الشحنات والإسناد وقوائم الأسعار.",
    addGovernorate: "إضافة محافظة",
    governorates: "المحافظات",
    activeAreas: "المناطق المتاحة",
    pausedAreas: "مناطق موقوفة",
    pricingPending: "تحتاج استكمال تسعير",
    controlNote:
      "إضافة منطقة هنا تُظهرها تلقائيًا داخل كل قوائم الأسعار كسطر يحتاج سعرًا؛ الأسعار نفسها تظل داخل صفحة قوائم الأسعار فقط.",
    searchGovernorate: "ابحث عن محافظة...",
    governorateCount: "محافظات",
    areasCount: "منطقة",
    active: "نشطة",
    paused: "موقوفة",
    editGovernorate: "تعديل المحافظة",
    areasIn: "مناطق",
    addArea: "إضافة منطقة",
    searchArea: "ابحث باسم المنطقة أو الكود أو اسم بديل...",
    allAvailability: "كل حالات الإتاحة",
    area: "المنطقة",
    aliases: "أسماء البحث البديلة",
    availability: "الإتاحة التشغيلية",
    priceLists: "جاهزية قوائم الأسعار",
    shipments: "الشحنات",
    readyPricing: "مكتمل في القوائم",
    pendingPricing: "سعر ناقص",
    assignmentReady: "متاحة للإسناد",
    assignmentPaused: "الإسناد موقوف",
    noAreas: "لا توجد مناطق تطابق البحث الحالي.",
    noGovernorates: "لا توجد محافظات تطابق البحث.",
    editorGovernorate: "بيانات المحافظة",
    newGovernorate: "إضافة محافظة جديدة",
    editorArea: "بيانات المنطقة",
    newArea: "إضافة منطقة جديدة",
    arabicName: "الاسم بالعربية",
    englishName: "الاسم بالإنجليزية",
    code: "الكود الداخلي",
    order: "ترتيب الظهور",
    state: "حالة الاستخدام",
    alternativeNames: "أسماء بديلة للبحث",
    alternativeHint: "افصل بين الأسماء بفاصلة، لتسهيل البحث والاستيراد من Excel.",
    assignmentToggle: "السماح بإسناد الشحنات لهذه المنطقة",
    assignmentHint: "عند الإيقاف تظل البيانات القديمة محفوظة ولا تظهر المنطقة ضمن مناطق الإسناد المتاحة.",
    priceLinkTitle: "الربط مع قوائم الأسعار",
    priceLinkHint:
      "ستظهر المنطقة تلقائيًا في جميع القوائم الحالية والجديدة، وأي سعر ناقص سيظل واضحًا حتى يتم استكماله من صفحة قوائم الأسعار.",
    existingData: "حماية البيانات القديمة",
    existingDataHint:
      "إيقاف المحافظة أو المنطقة يمنع استخدامها في شحنات جديدة، ولا يغيّر الشحنات المسجلة سابقًا.",
    cancel: "إلغاء",
    save: "حفظ البيانات",
    savedGovernorate: "تم حفظ بيانات المحافظة",
    savedArea: "تم حفظ بيانات المنطقة",
    demo: "تغييرات تجريبية داخل نموذج التصميم فقط",
  },
  en: {
    title: "Governorates & areas",
    subtitle: "Organize the service coverage used by shipments, assignment and price lists.",
    addGovernorate: "Add governorate",
    governorates: "Governorates",
    activeAreas: "Available areas",
    pausedAreas: "Paused areas",
    pricingPending: "Need pricing",
    controlNote:
      "Adding an area here automatically adds it to every price list as a row awaiting a price; prices stay exclusively inside Price Lists.",
    searchGovernorate: "Search governorates...",
    governorateCount: "governorates",
    areasCount: "areas",
    active: "Active",
    paused: "Paused",
    editGovernorate: "Edit governorate",
    areasIn: "Areas in",
    addArea: "Add area",
    searchArea: "Search area, code or alias...",
    allAvailability: "All availability",
    area: "Area",
    aliases: "Search aliases",
    availability: "Operational availability",
    priceLists: "Price-list readiness",
    shipments: "Shipments",
    readyPricing: "Complete in lists",
    pendingPricing: "Missing price",
    assignmentReady: "Available for assignment",
    assignmentPaused: "Assignment paused",
    noAreas: "No areas match the current search.",
    noGovernorates: "No governorates match your search.",
    editorGovernorate: "Governorate details",
    newGovernorate: "Add new governorate",
    editorArea: "Area details",
    newArea: "Add new area",
    arabicName: "Arabic name",
    englishName: "English name",
    code: "Internal code",
    order: "Display order",
    state: "Usage state",
    alternativeNames: "Alternative search names",
    alternativeHint: "Separate aliases with commas to improve search and Excel imports.",
    assignmentToggle: "Allow shipment assignment to this area",
    assignmentHint:
      "When disabled, old records remain intact and the area is excluded from available assignment areas.",
    priceLinkTitle: "Price-list connection",
    priceLinkHint:
      "The area appears automatically in every current and future list; missing prices remain visible until completed in Price Lists.",
    existingData: "Existing data protection",
    existingDataHint:
      "Pausing a governorate or area prevents new use without changing previously recorded shipments.",
    cancel: "Cancel",
    save: "Save details",
    savedGovernorate: "Governorate details saved",
    savedArea: "Area details saved",
    demo: "Demo-only changes in the design prototype",
  },
} as const;

type PriceMatrix = Record<string, Record<string, number | null>>;

type PriceListRecord = {
  id: string;
  name: Localized;
  code: string;
  state: "active" | "draft";
  isDefault: boolean;
  senders: Localized[];
  version: number;
  prices: PriceMatrix;
};

const availableSenders: Localized[] = [
  { ar: "متجر لمسة", en: "Lamsa Store" },
  { ar: "نواة", en: "Nawa" },
  { ar: "هيبة", en: "Heba" },
  { ar: "أوركيد", en: "Orchid" },
  { ar: "بريق", en: "Bareeq" },
  { ar: "أفينيو", en: "Avenue" },
];

type SenderEntryProfile = {
  sender: Localized;
  shippingPayer: "recipient" | "sender";
};

const senderEntryProfiles: SenderEntryProfile[] = availableSenders.map(
  (sender, index) => ({
    sender,
    shippingPayer: index === 1 || index === 3 ? "sender" : "recipient",
  }),
);

const savedRecipients = [
  {
    phone: "01001234281",
    name: { ar: "محمد عادل", en: "Mohamed Adel" },
    secondaryPhone: "01222555140",
    addresses: [
      {
        governorateId: "gov-cairo",
        areaId: "area-nasr-city",
        label: {
          ar: "المنزل — 12 شارع الطيران، مدينة نصر",
          en: "Home — 12 El Tayaran St., Nasr City",
        },
      },
      {
        governorateId: "gov-cairo",
        areaId: "area-heliopolis",
        label: {
          ar: "العمل — ميدان روكسي، مصر الجديدة",
          en: "Work — Roxy Square, Heliopolis",
        },
      },
    ],
  },
  {
    phone: "01105559034",
    name: { ar: "سارة محمود", en: "Sara Mahmoud" },
    secondaryPhone: "",
    addresses: [
      {
        governorateId: "gov-giza",
        areaId: "area-dokki",
        label: {
          ar: "8 شارع مصدق، الدقي",
          en: "8 Mossadak St., Dokki",
        },
      },
    ],
  },
];

const pricedStatusIds = [
  "status-delivered",
  "status-partial",
  "status-deferred",
  "status-cancelled",
] as const;

function createPriceMatrix(
  base: number,
  discount = 0,
  missing: string[] = [],
): PriceMatrix {
  const matrix: PriceMatrix = {};
  governoratesData.forEach((governorate, governorateIndex) => {
    governorate.areas.forEach((area, areaIndex) => {
      const deliveryPrice = Math.max(
        0,
        base + governorateIndex * 8 + areaIndex * 4 - discount,
      );
      matrix[area.id] = {
        "status-delivered": missing.includes(`${area.id}:status-delivered`)
          ? null
          : deliveryPrice,
        "status-partial": missing.includes(`${area.id}:status-partial`)
          ? null
          : Math.max(0, deliveryPrice - 8),
        "status-deferred": missing.includes(`${area.id}:status-deferred`)
          ? null
          : 20 + governorateIndex * 2,
        "status-cancelled": missing.includes(`${area.id}:status-cancelled`)
          ? null
          : 25 + governorateIndex * 3,
      };
    });
  });
  return matrix;
}

const priceListsData: PriceListRecord[] = [
  {
    id: "price-standard",
    name: { ar: "القائمة القياسية", en: "Standard price list" },
    code: "STANDARD-2026",
    state: "active",
    isDefault: true,
    senders: [
      availableSenders[0],
      availableSenders[2],
      availableSenders[3],
      availableSenders[4],
    ],
    version: 8,
    prices: createPriceMatrix(55, 0, [
      "area-shubra:status-deferred",
      "area-october:status-cancelled",
      "area-talkha:status-partial",
    ]),
  },
  {
    id: "price-enterprise",
    name: { ar: "عملاء المتاجر الكبار", en: "Enterprise stores" },
    code: "ENTERPRISE-2026",
    state: "active",
    isDefault: false,
    senders: [availableSenders[3], availableSenders[5]],
    version: 4,
    prices: createPriceMatrix(55, 8, [
      "area-agami:status-partial",
      "area-agami:status-deferred",
    ]),
  },
  {
    id: "price-nawa",
    name: { ar: "قائمة متجر نواة", en: "Nawa private list" },
    code: "NAWA-PRIVATE",
    state: "active",
    isDefault: false,
    senders: [availableSenders[1]],
    version: 3,
    prices: createPriceMatrix(58, 4, [
      "area-new-cairo:status-delivered",
      "area-new-cairo:status-partial",
      "area-new-cairo:status-deferred",
      "area-new-cairo:status-cancelled",
    ]),
  },
  {
    id: "price-seasonal",
    name: { ar: "قائمة الموسم الجديد", en: "New season list" },
    code: "SEASON-DRAFT",
    state: "draft",
    isDefault: false,
    senders: [],
    version: 1,
    prices: createPriceMatrix(60, 0, [
      "area-shubra:status-delivered",
      "area-october:status-delivered",
      "area-agami:status-delivered",
      "area-talkha:status-delivered",
    ]),
  },
];

const priceListCopy = {
  ar: {
    title: "قوائم الأسعار",
    subtitle: "أنشئ سياسة سعر مستقلة لكل مجموعة رسل وحدد سعر كل حالة في كل منطقة.",
    add: "إضافة قائمة أسعار",
    activeLists: "قوائم مفعّلة",
    assignedSenders: "رسل مرتبطون",
    privateLists: "قوائم مخصصة",
    missingPrices: "أسعار تحتاج استكمال",
    controlNote:
      "المناطق والحالات تظهر هنا تلقائيًا من صفحاتها المستقلة؛ كل سعر تعدله يخص القائمة المحددة فقط ولا يُعمم على باقي الرسل.",
    lists: "قوائم الأسعار",
    searchLists: "ابحث عن قائمة...",
    defaultBadge: "الافتراضية",
    draftBadge: "مسودة",
    activeBadge: "مفعّلة",
    sender: "راسل",
    senders: "رسل",
    completion: "اكتمال",
    version: "نسخة",
    pricingFor: "تسعير",
    editList: "إعدادات القائمة",
    addSender: "ربط الرسل",
    searchArea: "ابحث عن منطقة أو محافظة...",
    allGovernorates: "كل المحافظات",
    area: "المنطقة",
    listState: "حالة القائمة",
    savedPrices: "تم حفظ أسعار القائمة",
    unsaved: "تعديلات غير محفوظة",
    savePrices: "حفظ الأسعار",
    priceCurrency: "ج.م",
    missing: "غير محدد",
    stoppedArea: "منطقة موقوفة",
    noAreas: "لا توجد مناطق تطابق البحث الحالي.",
    linkedStatuses: "الحالات المالية المرتبطة",
    linkedStatusesHint:
      "أي حالة تُفعّل لها خاصية الظهور في قوائم الأسعار ستضاف هنا تلقائيًا.",
    snapshotTitle: "حماية أسعار الشحنات القديمة",
    snapshotHint:
      "عند إنشاء الشحنة يُحفظ السعر المستخدم داخلها؛ تعديل القائمة يطبّق على الشحنات الجديدة فقط.",
    editorTitle: "إعدادات قائمة الأسعار",
    newTitle: "إضافة قائمة أسعار جديدة",
    arabicName: "اسم القائمة بالعربية",
    englishName: "اسم القائمة بالإنجليزية",
    code: "الكود الداخلي",
    publishState: "حالة الاستخدام",
    active: "مفعّلة",
    draft: "مسودة",
    defaultList: "استخدامها كقائمة افتراضية",
    defaultHint:
      "تُستخدم تلقائيًا للراسل الذي لم تُربط به قائمة خاصة، ويمكن تغييرها من إعدادات الراسل.",
    senderLink: "الرسل المرتبطون بهذه القائمة",
    senderLinkHint:
      "يمكن ربط أكثر من راسل بالقائمة نفسها أو إنشاء قائمة خاصة؛ اختيار راسل مرتبط بقائمة أخرى ينقله إلى هذه القائمة.",
    noSender: "لا يوجد راسل مرتبط",
    cancel: "إلغاء",
    save: "حفظ الإعدادات",
    savedList: "تم حفظ إعدادات قائمة الأسعار",
    createdList: "تمت إضافة قائمة الأسعار",
    demo: "تغييرات تجريبية داخل نموذج التصميم فقط",
  },
  en: {
    title: "Price lists",
    subtitle: "Create an independent pricing policy for any sender group and price each status by area.",
    add: "Add price list",
    activeLists: "Active lists",
    assignedSenders: "Assigned senders",
    privateLists: "Custom lists",
    missingPrices: "Prices to complete",
    controlNote:
      "Areas and financial statuses flow here automatically from their independent pages; every edit affects only the selected list.",
    lists: "Price lists",
    searchLists: "Search price lists...",
    defaultBadge: "Default",
    draftBadge: "Draft",
    activeBadge: "Active",
    sender: "sender",
    senders: "senders",
    completion: "Complete",
    version: "Version",
    pricingFor: "Pricing",
    editList: "List settings",
    addSender: "Assign senders",
    searchArea: "Search area or governorate...",
    allGovernorates: "All governorates",
    area: "Area",
    listState: "List state",
    savedPrices: "Price-list values saved",
    unsaved: "Unsaved changes",
    savePrices: "Save prices",
    priceCurrency: "EGP",
    missing: "Not set",
    stoppedArea: "Paused area",
    noAreas: "No areas match the current search.",
    linkedStatuses: "Linked financial statuses",
    linkedStatusesHint:
      "Any status configured to appear in price lists is added here automatically.",
    snapshotTitle: "Protecting existing shipment prices",
    snapshotHint:
      "A shipment stores the price used when it is created; list edits apply only to new shipments.",
    editorTitle: "Price-list settings",
    newTitle: "Add new price list",
    arabicName: "Arabic list name",
    englishName: "English list name",
    code: "Internal code",
    publishState: "Usage state",
    active: "Active",
    draft: "Draft",
    defaultList: "Use as the default price list",
    defaultHint:
      "Used automatically for senders without a private list and can be changed in sender settings.",
    senderLink: "Senders assigned to this list",
    senderLinkHint:
      "Assign multiple senders to one list or create a private list; selecting a sender already assigned elsewhere moves it to this list.",
    noSender: "No assigned sender",
    cancel: "Cancel",
    save: "Save settings",
    savedList: "Price-list settings saved",
    createdList: "Price list added",
    demo: "Demo-only changes in the design prototype",
  },
} as const;

type CourierCompensationType = "commission" | "salary" | "mixed";
type CourierSettlementCycle = "instant" | "daily" | "weekly" | "monthly";

type CourierRatePlan = {
  id: string;
  name: Localized;
  code: string;
  state: "active" | "draft";
  isDefault: boolean;
  compensationType: CourierCompensationType;
  settlementCycle: CourierSettlementCycle;
  fixedSalary: number | null;
  couriers: Localized[];
  version: number;
  rates: PriceMatrix;
};

const availableCouriers: Localized[] = [
  { ar: "أحمد رجب", en: "Ahmed Ragab" },
  { ar: "محمود سمير", en: "Mahmoud Samir" },
  { ar: "كريم فؤاد", en: "Karim Fouad" },
  { ar: "مصطفى عادل", en: "Mostafa Adel" },
  { ar: "عمر خالد", en: "Omar Khaled" },
  { ar: "محمد صابر", en: "Mohamed Saber" },
];

function createCourierRateMatrix(
  base: number,
  missing: string[] = [],
): PriceMatrix {
  const matrix: PriceMatrix = {};
  governoratesData.forEach((governorate, governorateIndex) => {
    governorate.areas.forEach((area, areaIndex) => {
      const delivered = base + governorateIndex * 2 + Math.floor(areaIndex / 2);
      matrix[area.id] = {
        "status-delivered": missing.includes(`${area.id}:status-delivered`)
          ? null
          : delivered,
        "status-partial": missing.includes(`${area.id}:status-partial`)
          ? null
          : Math.max(0, delivered - 5),
        "status-deferred": missing.includes(`${area.id}:status-deferred`)
          ? null
          : 5,
        "status-cancelled": missing.includes(`${area.id}:status-cancelled`)
          ? null
          : 8,
      };
    });
  });
  return matrix;
}

const courierRatePlansData: CourierRatePlan[] = [
  {
    id: "courier-plan-standard",
    name: { ar: "عمولة المناديب الأساسية", en: "Standard courier commission" },
    code: "COURIER-STANDARD",
    state: "active",
    isDefault: true,
    compensationType: "commission",
    settlementCycle: "weekly",
    fixedSalary: null,
    couriers: [
      availableCouriers[0],
      availableCouriers[1],
      availableCouriers[2],
    ],
    version: 6,
    rates: createCourierRateMatrix(20, [
      "area-talkha:status-partial",
      "area-agami:status-deferred",
    ]),
  },
  {
    id: "courier-plan-distance",
    name: { ar: "عمولة المناطق البعيدة", en: "Long-distance commission" },
    code: "COURIER-DISTANCE",
    state: "active",
    isDefault: false,
    compensationType: "commission",
    settlementCycle: "daily",
    fixedSalary: null,
    couriers: [availableCouriers[3]],
    version: 3,
    rates: createCourierRateMatrix(27),
  },
  {
    id: "courier-plan-salary",
    name: { ar: "مندوبو الراتب الشهري", en: "Monthly salary couriers" },
    code: "COURIER-SALARY",
    state: "active",
    isDefault: false,
    compensationType: "salary",
    settlementCycle: "monthly",
    fixedSalary: 6500,
    couriers: [availableCouriers[4]],
    version: 2,
    rates: createCourierRateMatrix(0),
  },
  {
    id: "courier-plan-mixed",
    name: { ar: "راتب مع عمولة", en: "Salary plus commission" },
    code: "COURIER-MIXED",
    state: "draft",
    isDefault: false,
    compensationType: "mixed",
    settlementCycle: "monthly",
    fixedSalary: 3000,
    couriers: [availableCouriers[5]],
    version: 1,
    rates: createCourierRateMatrix(10, [
      "area-new-cairo:status-delivered",
      "area-agami:status-delivered",
    ]),
  },
];

const courierRateCopy = {
  ar: {
    title: "قوائم عمولات المناديب",
    subtitle: "حدّد طريقة أجر كل مجموعة مناديب ومستحق كل حالة في كل منطقة.",
    add: "إضافة خطة أجر",
    activePlans: "خطط مفعّلة",
    assignedCouriers: "مناديب مرتبطون",
    commissionPlans: "خطط عمولة",
    salaryPlans: "خطط راتب",
    controlNote:
      "عمولة المندوب مستقلة عن سعر شحن الراسل: سعر الشحن إيراد للشركة، ومستحق المندوب مصروف تشغيلي يُحسب حسب خطة أجره.",
    plans: "خطط الأجر",
    searchPlans: "ابحث عن خطة...",
    defaultBadge: "الافتراضية",
    activeBadge: "مفعّلة",
    draftBadge: "مسودة",
    courier: "مندوب",
    couriers: "مناديب",
    noCourier: "لا يوجد مندوب مرتبط",
    completion: "اكتمال",
    planFor: "مستحقات",
    settings: "إعدادات الخطة",
    unsaved: "تعديلات غير محفوظة",
    saveRates: "حفظ العمولات",
    linkedStatuses: "الحالات المحتسبة للمندوب",
    linkedStatusesHint:
      "تتحكم فيها من صفحة حالات الشحنات، وأي حالة جديدة تظهر هنا تلقائيًا بسعر غير محدد.",
    searchArea: "ابحث عن منطقة أو محافظة...",
    allGovernorates: "كل المحافظات",
    area: "المنطقة",
    priceCurrency: "ج.م",
    missing: "غير محدد",
    stoppedArea: "منطقة موقوفة",
    noAreas: "لا توجد مناطق تطابق البحث الحالي.",
    savedRates: "تم حفظ عمولات الخطة",
    salaryOnlyTitle: "هذه الخطة تعمل بالراتب فقط",
    salaryOnlyHint:
      "لا يُحسب مستحق لكل شحنة في هذه الخطة؛ الراتب يُثبت كمصروف على الشركة حسب دورية الصرف.",
    monthlySalary: "الراتب الثابت",
    instant: "فوري بعد التسوية",
    daily: "يومي",
    weekly: "أسبوعي",
    monthly: "شهري",
    commission: "عمولة حسب الشحنة",
    salary: "راتب ثابت",
    mixed: "راتب مع عمولة",
    snapshotHint:
      "عند تسجيل حالة الشحنة يُحفظ مستحق المندوب المستخدم وقتها؛ تعديل الخطة لا يغيّر العمليات السابقة.",
    editorTitle: "إعدادات خطة الأجر",
    newTitle: "إضافة خطة أجر جديدة",
    arabicName: "اسم الخطة بالعربية",
    englishName: "اسم الخطة بالإنجليزية",
    code: "الكود الداخلي",
    state: "حالة الاستخدام",
    compensationType: "نظام الأجر",
    settlementCycle: "دورية صرف المستحق",
    fixedSalary: "قيمة الراتب الثابت",
    defaultPlan: "استخدامها كخطة افتراضية للمناديب",
    defaultHint:
      "تُطبق على المندوب الذي لم يُربط بخطة خاصة، ويمكن تغييرها من بيانات المندوب.",
    courierLink: "المناديب المرتبطون بهذه الخطة",
    courierLinkHint:
      "يمكن ربط عدة مناديب بالخطة؛ اختيار مندوب مرتبط بخطة أخرى ينقله إلى هذه الخطة.",
    cancel: "إلغاء",
    save: "حفظ الإعدادات",
    savedPlan: "تم حفظ إعدادات خطة الأجر",
    createdPlan: "تمت إضافة خطة الأجر",
    demo: "تغييرات تجريبية داخل نموذج التصميم فقط",
  },
  en: {
    title: "Courier commission lists",
    subtitle: "Define each courier group’s pay model and due per status in every area.",
    add: "Add pay plan",
    activePlans: "Active plans",
    assignedCouriers: "Assigned couriers",
    commissionPlans: "Commission plans",
    salaryPlans: "Salary plans",
    controlNote:
      "Courier dues are independent from sender shipping prices: shipping price is company revenue, while courier due is an operating expense calculated from the courier’s pay plan.",
    plans: "Pay plans",
    searchPlans: "Search plans...",
    defaultBadge: "Default",
    activeBadge: "Active",
    draftBadge: "Draft",
    courier: "courier",
    couriers: "couriers",
    noCourier: "No assigned courier",
    completion: "Complete",
    planFor: "Dues for",
    settings: "Plan settings",
    unsaved: "Unsaved changes",
    saveRates: "Save commissions",
    linkedStatuses: "Courier-compensated statuses",
    linkedStatusesHint:
      "Controlled in Shipment Statuses; any new enabled status appears here automatically without a price.",
    searchArea: "Search area or governorate...",
    allGovernorates: "All governorates",
    area: "Area",
    priceCurrency: "EGP",
    missing: "Not set",
    stoppedArea: "Paused area",
    noAreas: "No areas match the current search.",
    savedRates: "Plan commissions saved",
    salaryOnlyTitle: "This is a salary-only plan",
    salaryOnlyHint:
      "No per-shipment due is calculated; salary is recorded as a company expense on its settlement cycle.",
    monthlySalary: "Fixed salary",
    instant: "Instant after settlement",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    commission: "Per-shipment commission",
    salary: "Fixed salary",
    mixed: "Salary plus commission",
    snapshotHint:
      "The courier due used is stored when the shipment status is recorded; later plan edits do not alter past operations.",
    editorTitle: "Pay-plan settings",
    newTitle: "Add new pay plan",
    arabicName: "Arabic plan name",
    englishName: "English plan name",
    code: "Internal code",
    state: "Usage state",
    compensationType: "Pay model",
    settlementCycle: "Settlement cycle",
    fixedSalary: "Fixed salary amount",
    defaultPlan: "Use as default courier plan",
    defaultHint:
      "Applied to couriers without a private plan and can be changed in courier details.",
    courierLink: "Couriers assigned to this plan",
    courierLinkHint:
      "Assign multiple couriers; selecting a courier already assigned elsewhere moves them to this plan.",
    cancel: "Cancel",
    save: "Save settings",
    savedPlan: "Pay-plan settings saved",
    createdPlan: "Pay plan added",
    demo: "Demo-only changes in the design prototype",
  },
} as const;

type ShipmentFieldMode =
  | "required_on_create"
  | "optional"
  | "required_before_assignment"
  | "hidden";

type ShipmentFieldGroup =
  | "recipient"
  | "address"
  | "shipment"
  | "financial"
  | "sender";

type ShipmentFieldPolicy = {
  id: string;
  name: Localized;
  code: string;
  group: ShipmentFieldGroup;
  description: Localized;
  mode: ShipmentFieldMode;
  custom: boolean;
  inExcel: boolean;
  order: number;
};

type ShipmentDataSettings = {
  confirmationMode: "off" | "optional" | "required_before_assignment";
  incompleteRoute: "warehouse_and_queue" | "complete_before_warehouse";
  trustsEnabled: boolean;
  shippingPayerOverride: boolean;
  phoneLookupEnabled: boolean;
};

const shipmentFieldPoliciesData: ShipmentFieldPolicy[] = [
  {
    id: "field-primary-phone",
    name: { ar: "رقم الهاتف الأساسي", en: "Primary phone" },
    code: "RECIPIENT_PHONE",
    group: "recipient",
    description: {
      ar: "أول حقل في التسجيل ويستخدم لاستدعاء بيانات المستلم المحفوظة.",
      en: "First entry field; retrieves saved recipient details.",
    },
    mode: "required_on_create",
    custom: false,
    inExcel: true,
    order: 1,
  },
  {
    id: "field-recipient-name",
    name: { ar: "اسم المستلم", en: "Recipient name" },
    code: "RECIPIENT_NAME",
    group: "recipient",
    description: {
      ar: "الاسم الظاهر للمندوب وفي ملف الشحنة.",
      en: "Displayed to the courier and in the shipment file.",
    },
    mode: "required_on_create",
    custom: false,
    inExcel: true,
    order: 2,
  },
  {
    id: "field-secondary-phone",
    name: { ar: "رقم هاتف إضافي", en: "Secondary phone" },
    code: "SECONDARY_PHONE",
    group: "recipient",
    description: {
      ar: "رقم بديل عند تعذر الوصول للرقم الأساسي.",
      en: "Alternative number if the primary phone is unreachable.",
    },
    mode: "optional",
    custom: false,
    inExcel: true,
    order: 3,
  },
  {
    id: "field-governorate",
    name: { ar: "المحافظة", en: "Governorate" },
    code: "GOVERNORATE",
    group: "address",
    description: {
      ar: "تُختار من المحافظات التي أنشأتها الشركة.",
      en: "Selected from company-configured governorates.",
    },
    mode: "required_before_assignment",
    custom: false,
    inExcel: true,
    order: 4,
  },
  {
    id: "field-area",
    name: { ar: "المنطقة", en: "Area" },
    code: "AREA",
    group: "address",
    description: {
      ar: "تحدد التغطية والتسعير والإسناد.",
      en: "Determines coverage, pricing and assignment.",
    },
    mode: "required_before_assignment",
    custom: false,
    inExcel: true,
    order: 5,
  },
  {
    id: "field-address",
    name: { ar: "العنوان التفصيلي", en: "Detailed address" },
    code: "DELIVERY_ADDRESS",
    group: "address",
    description: {
      ar: "العنوان الذي سيصل إليه المندوب.",
      en: "The address the courier will visit.",
    },
    mode: "required_before_assignment",
    custom: false,
    inExcel: true,
    order: 6,
  },
  {
    id: "field-sender",
    name: { ar: "الراسل", en: "Sender" },
    code: "SENDER",
    group: "sender",
    description: {
      ar: "يحدد قائمة الأسعار وسياسة تحمّل مصاريف الشحن الافتراضية.",
      en: "Determines price list and default shipping-payer policy.",
    },
    mode: "required_on_create",
    custom: false,
    inExcel: true,
    order: 7,
  },
  {
    id: "field-sender-reference",
    name: { ar: "مرجع الراسل", en: "Sender reference" },
    code: "SENDER_REFERENCE",
    group: "sender",
    description: {
      ar: "رقم الطلب داخل نظام أو متجر الراسل.",
      en: "Order identifier in the sender’s store or system.",
    },
    mode: "optional",
    custom: false,
    inExcel: true,
    order: 8,
  },
  {
    id: "field-pieces",
    name: { ar: "عدد القطع", en: "Piece count" },
    code: "PIECE_COUNT",
    group: "shipment",
    description: {
      ar: "عدد القطع داخل الشحنة ويستخدم عند التسليم الجزئي والمرتجع.",
      en: "Pieces inside the shipment, used for partial delivery and returns.",
    },
    mode: "required_on_create",
    custom: false,
    inExcel: true,
    order: 9,
  },
  {
    id: "field-contents",
    name: { ar: "وصف محتوى الشحنة", en: "Shipment contents" },
    code: "CONTENTS",
    group: "shipment",
    description: {
      ar: "وصف مختصر يساعد المخزن والمندوب.",
      en: "Short description for warehouse and courier teams.",
    },
    mode: "optional",
    custom: false,
    inExcel: true,
    order: 10,
  },
  {
    id: "field-shipment-price",
    name: { ar: "سعر الشحنة", en: "Shipment price" },
    code: "SHIPMENT_PRICE",
    group: "financial",
    description: {
      ar: "قيمة المنتج المطلوب تحصيلها بعيدًا عن مصاريف الشحن.",
      en: "Product value to collect, excluding shipping fee.",
    },
    mode: "required_on_create",
    custom: false,
    inExcel: true,
    order: 11,
  },
  {
    id: "field-shipping-fee",
    name: { ar: "مصاريف الشحن", en: "Shipping fee" },
    code: "SHIPPING_FEE",
    group: "financial",
    description: {
      ar: "تُستدعى من قائمة أسعار الراسل مع السماح بالتعديل حسب الصلاحية.",
      en: "Loaded from the sender price list with permission-based override.",
    },
    mode: "required_on_create",
    custom: false,
    inExcel: false,
    order: 12,
  },
  {
    id: "field-shipping-payer",
    name: { ar: "متحمّل مصاريف الشحن", en: "Shipping payer" },
    code: "SHIPPING_PAYER",
    group: "financial",
    description: {
      ar: "القيمة الافتراضية من سياسة الراسل ويمكن تغييرها أثناء التسجيل.",
      en: "Defaults from sender policy and can be overridden during entry.",
    },
    mode: "optional",
    custom: false,
    inExcel: true,
    order: 13,
  },
  {
    id: "field-delivery-date",
    name: { ar: "موعد التسليم المطلوب", en: "Requested delivery date" },
    code: "DELIVERY_DATE",
    group: "shipment",
    description: {
      ar: "موعد يطلبه الراسل أو المستلم إن وجد.",
      en: "Requested date from sender or recipient, when available.",
    },
    mode: "optional",
    custom: false,
    inExcel: true,
    order: 14,
  },
  {
    id: "field-notes",
    name: { ar: "ملاحظات الشحنة", en: "Shipment notes" },
    code: "NOTES",
    group: "shipment",
    description: {
      ar: "تعليمات أو معلومات إضافية لا تغيّر حالة الشحنة.",
      en: "Extra instructions or information that do not change status.",
    },
    mode: "optional",
    custom: false,
    inExcel: true,
    order: 15,
  },
];

const shipmentDataSettingsDefault: ShipmentDataSettings = {
  confirmationMode: "optional",
  incompleteRoute: "warehouse_and_queue",
  trustsEnabled: false,
  shippingPayerOverride: true,
  phoneLookupEnabled: true,
};

const shipmentPolicyCopy = {
  ar: {
    title: "سياسات بيانات الشحنات",
    subtitle: "تحكم في الحقول ومسار البيانات الناقصة قبل بناء شاشة إضافة الشحنة.",
    addField: "إضافة حقل مخصص",
    requiredCreate: "مطلوب عند التسجيل",
    optional: "اختياري",
    requiredAssignment: "مطلوب قبل الإسناد",
    hidden: "مخفي",
    activeFields: "حقول مستخدمة",
    hiddenFields: "حقول مخفية",
    createRequiredCount: "مطلوبة عند التسجيل",
    assignmentRequiredCount: "تمنع الإسناد عند نقصها",
    controlNote:
      "لا توجد شاشة إضافة شحنة ثابتة؛ الحقول وطريقة التعامل معها تُبنى من السياسات التي تحددها هنا.",
    workflowTitle: "سياسات الدخول والاستكمال",
    confirmationTitle: "تأكيد الطلب مع المستلم",
    confirmationOff: "غير مستخدم",
    confirmationOptional: "اختياري",
    confirmationRequired: "إلزامي قبل الإسناد",
    confirmationHint:
      "التأكيد يسجل: تم التأكيد، لم يرد، أو تواصل لاحقًا؛ ولا يضيف حالات شحنة جديدة.",
    incompleteTitle: "مسار الشحنة ناقصة البيانات",
    warehouseQueue: "تدخل المخزن وتظهر بقائمة الاستكمال",
    beforeWarehouse: "تتوقف بقائمة الاستكمال قبل المخزن",
    incompleteHint:
      "ينطبق عند نقص حقل محدد بأنه مطلوب قبل الإسناد، أما المطلوب عند التسجيل فيمنع الحفظ.",
    trustsTitle: "الأمانات غير المعرّفة",
    trustsHint:
      "تفعيل قدرة مستقلة لتسجيل طرد وصل بلا بيانات إلى حين التعرف عليه، ولا يُعامل كشحنة.",
    payerOverrideTitle: "تغيير متحمّل مصاريف الشحن",
    payerOverrideHint:
      "يظهر الاختيار الافتراضي من الراسل مع السماح بتغييره في الشحنة حسب صلاحية المستخدم.",
    phoneLookupTitle: "استدعاء المستلم برقم الهاتف",
    phoneLookupHint:
      "يكون الهاتف الأساسي أول حقل، ويستدعي الأسماء والعناوين المحفوظة دون سؤال إضافي.",
    excelTitle: "سلامة استيراد Excel والمجموعات",
    excelMode: "الكل أو لا شيء",
    excelHint:
      "إذا كان أي صف ناقصًا أو غير صحيح، لا تُحفظ المجموعة حتى تصحيح جميع الأخطاء.",
    fieldsTitle: "حقول إضافة الشحنة",
    fieldsSubtitle: "غيّر سياسة كل حقل أو أضف حقلًا جديدًا بدون تعديل الأكواد.",
    search: "ابحث باسم الحقل أو الكود...",
    allGroups: "كل المجموعات",
    field: "الحقل",
    group: "المجموعة",
    behavior: "سياسة الاستخدام",
    excel: "في نموذج Excel",
    included: "موجود",
    excluded: "غير موجود",
    custom: "حقل مخصص",
    system: "حقل أساسي",
    recipient: "بيانات المستلم",
    address: "العنوان والتغطية",
    shipment: "بيانات الشحنة",
    financial: "البيانات المالية",
    sender: "بيانات الراسل",
    unsaved: "تعديلات غير محفوظة",
    savePolicies: "حفظ السياسات",
    saved: "تم حفظ سياسات بيانات الشحنات",
    noResults: "لا توجد حقول تطابق البحث الحالي.",
    editorTitle: "إعدادات الحقل",
    newFieldTitle: "إضافة حقل مخصص",
    arabicName: "اسم الحقل بالعربية",
    englishName: "اسم الحقل بالإنجليزية",
    code: "الكود الداخلي",
    fieldGroup: "مجموعة الحقل",
    description: "وصف الاستخدام",
    defaultBehavior: "سياسة الحقل",
    excelToggle: "إظهاره داخل نموذج Excel",
    excelToggleHint:
      "عند التفعيل يظهر كعمود في النموذج ويخضع لنفس سياسة التحقق.",
    cancel: "إلغاء",
    saveField: "حفظ الحقل",
    demo: "تغييرات تجريبية داخل نموذج التصميم فقط",
  },
  en: {
    title: "Shipment data policies",
    subtitle: "Control fields and incomplete-data routing before building shipment entry.",
    addField: "Add custom field",
    requiredCreate: "Required on entry",
    optional: "Optional",
    requiredAssignment: "Required before assignment",
    hidden: "Hidden",
    activeFields: "Used fields",
    hiddenFields: "Hidden fields",
    createRequiredCount: "Required on entry",
    assignmentRequiredCount: "Block assignment if missing",
    controlNote:
      "Shipment entry is not fixed; its fields and behavior are generated from the policies you define here.",
    workflowTitle: "Intake and completion policies",
    confirmationTitle: "Recipient order confirmation",
    confirmationOff: "Not used",
    confirmationOptional: "Optional",
    confirmationRequired: "Required before assignment",
    confirmationHint:
      "Confirmation records Confirmed, No answer or Contact later; it does not create shipment statuses.",
    incompleteTitle: "Incomplete shipment route",
    warehouseQueue: "Enter warehouse and completion queue",
    beforeWarehouse: "Hold in completion queue before warehouse",
    incompleteHint:
      "Applies to fields required before assignment; fields required on entry block saving.",
    trustsTitle: "Unidentified entrusted parcels",
    trustsHint:
      "Enable a separate capability for a parcel received without details until identified; it is not treated as a shipment.",
    payerOverrideTitle: "Override shipping payer",
    payerOverrideHint:
      "Loads the sender default and allows authorized users to override it per shipment.",
    phoneLookupTitle: "Recipient lookup by phone",
    phoneLookupHint:
      "Primary phone appears first and loads saved names and addresses without an extra prompt.",
    excelTitle: "Excel and batch import safety",
    excelMode: "All or nothing",
    excelHint:
      "If any row is incomplete or invalid, the batch is not saved until every error is corrected.",
    fieldsTitle: "Shipment entry fields",
    fieldsSubtitle: "Change each field policy or add a new field without code changes.",
    search: "Search field name or code...",
    allGroups: "All groups",
    field: "Field",
    group: "Group",
    behavior: "Usage policy",
    excel: "In Excel template",
    included: "Included",
    excluded: "Excluded",
    custom: "Custom field",
    system: "Core field",
    recipient: "Recipient data",
    address: "Address & coverage",
    shipment: "Shipment data",
    financial: "Financial data",
    sender: "Sender data",
    unsaved: "Unsaved changes",
    savePolicies: "Save policies",
    saved: "Shipment data policies saved",
    noResults: "No fields match the current search.",
    editorTitle: "Field settings",
    newFieldTitle: "Add custom field",
    arabicName: "Arabic field name",
    englishName: "English field name",
    code: "Internal code",
    fieldGroup: "Field group",
    description: "Usage description",
    defaultBehavior: "Field policy",
    excelToggle: "Include in Excel template",
    excelToggleHint:
      "When enabled, the field appears as a column and follows the same validation policy.",
    cancel: "Cancel",
    saveField: "Save field",
    demo: "Demo-only changes in the design prototype",
  },
} as const;

function Brand({
  compact = false,
  lang,
}: {
  compact?: boolean;
  lang: Lang;
}) {
  return (
    <div className={`brand ${compact ? "brand--compact" : ""}`}>
      <span className="brand__mark" aria-hidden="true">
        <span className="brand__speed brand__speed--one" />
        <span className="brand__speed brand__speed--two" />
        <span className="brand__box">
          <span className="brand__lid" />
          <Check size={compact ? 15 : 18} strokeWidth={3} />
        </span>
      </span>
      <span className="brand__words">
        <strong>{lang === "ar" ? "تسليم" : "TASLEEM"}</strong>
        <small>{lang === "ar" ? "للشحن الداخلي" : "DOMESTIC SHIPPING"}</small>
      </span>
    </div>
  );
}

function LanguageThemeControls({
  lang,
  theme,
  onLang,
  onTheme,
  subtle = false,
}: {
  lang: Lang;
  theme: Theme;
  onLang: () => void;
  onTheme: () => void;
  subtle?: boolean;
}) {
  return (
    <div className={`utility-controls ${subtle ? "utility-controls--subtle" : ""}`}>
      <button
        className="icon-text-button"
        type="button"
        onClick={onLang}
        aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      >
        <Globe2 size={17} />
        <span>{lang === "ar" ? "EN" : "عربي"}</span>
      </button>
      <button
        className="square-button"
        type="button"
        onClick={onTheme}
        aria-label={theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"}
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </div>
  );
}

function LoginScreen({
  lang,
  theme,
  onLang,
  onTheme,
  onEnter,
}: {
  lang: Lang;
  theme: Theme;
  onLang: () => void;
  onTheme: () => void;
  onEnter: () => void;
}) {
  const t = copy[lang];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onEnter();
  }

  return (
    <main className="login-shell">
      <section className="login-visual" aria-label={t.heroTitle}>
        <div className="login-visual__grid" />
        <div className="login-visual__glow login-visual__glow--one" />
        <div className="login-visual__glow login-visual__glow--two" />
        <div className="login-visual__top">
          <span className="login-product-label">
            <Boxes size={19} />
            <span>
              <strong>{lang === "ar" ? "منظومة التشغيل" : "OPERATIONS SYSTEM"}</strong>
              <small>{lang === "ar" ? "إدارة الشحن الداخلي" : "Domestic shipping management"}</small>
            </span>
          </span>
          <span className="system-pill">
            <span className="system-pill__dot" />
            {t.live}
          </span>
        </div>

        <div className="login-visual__content">
          <div className="login-hero-logo">
            <img
              src="/tasleem-brand-board.png"
              alt={lang === "ar" ? "شعار شركة تسليم للشحن الداخلي" : "Tasleem Domestic Shipping logo"}
            />
          </div>

          <div className="login-hero-copy">
            <p className="eyebrow">
              {lang === "ar" ? "نظام شركة تسليم" : "TASLEEM COMPANY SYSTEM"}
            </p>
            <h1>
              {lang === "ar" ? (
                <>
                  <span>كل شحنة</span>
                  <span>تحت السيطرة.</span>
                </>
              ) : (
                <>
                  <span>Every shipment.</span>
                  <span>Under control.</span>
                </>
              )}
            </h1>
            <p className="login-visual__description">
              {lang === "ar"
                ? "شاهد الحيازة والتحصيل والعمل المطلوب لحظة بلحظة، من شاشة واحدة واضحة."
                : "See custody, collections and required actions in real time, from one clear workspace."}
            </p>
          </div>
        </div>

        <div className="trust-row">
          <span>
            <ClipboardCheck size={18} />
            {t.verified}
          </span>
          <span>
            <SlidersHorizontal size={18} />
            {t.flexible}
          </span>
          <span>
            <ShieldCheck size={18} />
            {t.protected}
          </span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-mobile-company">
          <div className="login-mobile-company__logo">
            <img
              src="/tasleem-brand-board.png"
              alt={lang === "ar" ? "شعار شركة تسليم للشحن الداخلي" : "Tasleem Domestic Shipping logo"}
            />
          </div>
          <span>
            {lang === "ar" ? "نظام إدارة شركة تسليم" : "Tasleem company management system"}
          </span>
        </div>

        <div className="login-card">
          <div className="login-card__topline">
            <div className="login-card__security">
              <ShieldCheck size={16} />
              <span>{lang === "ar" ? "بوابة تشغيل آمنة" : "Secure operations portal"}</span>
            </div>
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
          </div>
          <div className="login-card__heading">
            <h2>{t.loginTitle}</h2>
            <p>{t.loginDescription}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="field">
              <span>{t.identifier}</span>
              <span className="field__control">
                <UserRound size={18} />
                <input
                  type="text"
                  placeholder={t.identifierPlaceholder}
                  autoComplete="username"
                />
              </span>
            </label>

            <label className="field">
              <span>{t.password}</span>
              <span className="field__control">
                <LockKeyhole size={18} />
                <input
                  type="password"
                  placeholder={t.passwordPlaceholder}
                  autoComplete="current-password"
                />
              </span>
            </label>

            <div className="login-options">
              <label className="check-control">
                <input type="checkbox" />
                <span />
                {t.remember}
              </label>
              <button className="text-button" type="button">
                {t.forgot}
              </button>
            </div>

            <button className="primary-button primary-button--wide" type="submit">
              <span>{t.enter}</span>
              {lang === "ar" ? (
                <ChevronLeft size={19} />
              ) : (
                <ChevronRight size={19} />
              )}
            </button>

            <button className="preview-button" type="button" onClick={onEnter}>
              <LogIn size={17} />
              {t.preview}
            </button>
          </form>

          <div className="login-help">
            <button className="text-button" type="button">
              <CircleHelp size={17} />
              {t.help}
            </button>
            <span>
              <ShieldCheck size={16} />
              {t.secure}
            </span>
          </div>
        </div>

        <p className="demo-note">
          <CircleAlert size={15} />
          {t.demo}
        </p>
      </section>
    </main>
  );
}

function Sidebar({
  lang,
  activeScreen,
  collapsed,
  mobileOpen,
  onCollapse,
  onMobileClose,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  activeScreen: Exclude<Screen, "login">;
  collapsed: boolean;
  mobileOpen: boolean;
  onCollapse: () => void;
  onMobileClose: () => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const t = copy[lang];
  const sections = [
    {
      label: "",
      items: [{ label: t.overview, icon: LayoutDashboard }],
    },
    {
      label: t.operations,
      items: [
        { label: t.shipments, icon: Boxes, screen: "shipments" as const },
        {
          label: t.confirmation,
          icon: ClipboardCheck,
          screen: "confirmation" as const,
        },
        {
          label: t.assignment,
          icon: Truck,
          screen: "assignment" as const,
        },
        {
          label: lang === "ar" ? "شحنات المناديب" : "Courier shipments",
          icon: PackageCheck,
          screen: "courierShipments" as const,
        },
        { label: t.warehouse, icon: Warehouse },
      ],
    },
    {
      label: t.parties,
      items: [
        { label: t.senders, icon: UsersRound },
        { label: t.couriers, icon: UserRound },
      ],
    },
    {
      label: t.policies,
      items: [
        {
          label: lang === "ar" ? "حالات الشحنات" : "Shipment statuses",
          icon: SlidersHorizontal,
          screen: "statuses" as const,
        },
        {
          label: lang === "ar" ? "المحافظات والمناطق" : "Governorates & areas",
          icon: MapPin,
          screen: "areas" as const,
        },
        {
          label: lang === "ar" ? "قوائم الأسعار" : "Price lists",
          icon: HandCoins,
          screen: "priceLists" as const,
        },
        {
          label: lang === "ar" ? "عمولات المناديب" : "Courier commissions",
          icon: Truck,
          screen: "courierRates" as const,
        },
        {
          label: lang === "ar" ? "سياسات بيانات الشحنات" : "Shipment data policies",
          icon: ClipboardCheck,
          screen: "shipmentPolicies" as const,
        },
        { label: t.settings, icon: Settings2 },
      ],
    },
  ];

  return (
    <>
      {mobileOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label={t.close}
          onClick={onMobileClose}
        />
      )}
      <aside
        className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${
          mobileOpen ? "sidebar--mobile-open" : ""
        }`}
      >
        <div className="sidebar__brand">
          <Brand compact lang={lang} />
          <button
            className="sidebar__mobile-close square-button"
            type="button"
            onClick={onMobileClose}
            aria-label={t.close}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar__nav" aria-label={t.operations}>
          {sections.map((section, sectionIndex) => (
            <div className="nav-section" key={`${section.label}-${sectionIndex}`}>
              {section.label && <p>{section.label}</p>}
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = "screen" in item && item.screen === activeScreen;
                return (
                  <button
                    className={`nav-item ${active ? "nav-item--active" : ""}`}
                    type="button"
                    key={item.label}
                    title={collapsed ? item.label : undefined}
                    onClick={() => {
                      if ("screen" in item && item.screen) {
                        onNavigate(item.screen);
                        onMobileClose();
                      }
                    }}
                  >
                    <Icon size={19} />
                    <span>{item.label}</span>
                    {active && <i />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar-user" type="button" onClick={onLogout}>
            <span className="avatar">أح</span>
            <span className="sidebar-user__copy">
              <strong>{lang === "ar" ? "أحمد حسن" : "Ahmed Hassan"}</strong>
              <small>{lang === "ar" ? "مدير النظام" : "System admin"}</small>
            </span>
            <MoreHorizontal size={17} />
          </button>
          <button
            className="collapse-button"
            type="button"
            onClick={onCollapse}
            title={t.collapse}
          >
            {lang === "ar" ? (
              collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />
            ) : collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
            <span>{t.collapse}</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function ScreenState({
  scenario,
  lang,
  onRetry,
}: {
  scenario: Scenario;
  lang: Lang;
  onRetry: () => void;
}) {
  const t = copy[lang];

  if (scenario === "loading") {
    return (
      <div className="table-skeleton" aria-label={t.loading}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="skeleton-row" key={index}>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    );
  }

  if (scenario === "empty") {
    return (
      <div className="empty-state">
        <span className="state-icon state-icon--blue">
          <Search size={25} />
        </span>
        <h3>{t.emptyTitle}</h3>
        <p>{t.emptyText}</p>
        <button className="secondary-button" type="button" onClick={onRetry}>
          {t.clear}
        </button>
      </div>
    );
  }

  if (scenario === "unavailable") {
    return (
      <div className="empty-state">
        <span className="state-icon state-icon--red">
          <WifiOff size={25} />
        </span>
        <h3>{t.unavailableTitle}</h3>
        <p>{t.unavailableText}</p>
        <button className="secondary-button" type="button" onClick={onRetry}>
          {t.retry}
        </button>
      </div>
    );
  }

  return null;
}

function ShipmentDrawer({
  shipment,
  lang,
  onClose,
  onToast,
}: {
  shipment: Shipment;
  lang: Lang;
  onClose: () => void;
  onToast: (message: string) => void;
}) {
  const t = copy[lang];
  const money = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  });

  async function copyShipment() {
    try {
      await navigator.clipboard.writeText(shipment.id);
    } catch {
      // Prototype fallback: the visible confirmation is sufficient.
    }
    onToast(t.copied);
  }

  return (
    <>
      <button className="drawer-backdrop" type="button" onClick={onClose} />
      <aside className="shipment-drawer" aria-label={t.quickView}>
        <div className="drawer__header">
          <div>
            <span className="drawer__eyebrow">{t.quickView}</span>
            <div className="drawer__title-row">
              <h2>{shipment.id}</h2>
              <button
                className="copy-button"
                type="button"
                onClick={copyShipment}
                title={t.copyNumber}
              >
                <Copy size={15} />
              </button>
            </div>
            <span className="reference">{shipment.reference}</span>
          </div>
          <button
            className="square-button"
            type="button"
            onClick={onClose}
            aria-label={t.close}
          >
            <X size={19} />
          </button>
        </div>

        <div className="drawer__content">
          <div className="drawer-status-row">
            <span className={`status-badge status-badge--${shipment.statusTone}`}>
              {shipment.status[lang]}
            </span>
            <span className="demo-chip">{t.demoData}</span>
          </div>

          <section className="detail-section">
            <div className="person-card">
              <span className="person-card__avatar">
                {shipment.recipient[lang].slice(0, 1)}
              </span>
              <div>
                <small>{t.recipient}</small>
                <strong>{shipment.recipient[lang]}</strong>
                <span dir="ltr">{shipment.phone}</span>
              </div>
              <button className="square-button square-button--soft" type="button">
                <Phone size={17} />
              </button>
            </div>
            <div className="address-row">
              <MapPin size={17} />
              <span>{shipment.address[lang]}</span>
            </div>
          </section>

          <section className="detail-section">
            <h3>{t.financial}</h3>
            <div className="money-grid">
              <div>
                <small>{t.codAllowed}</small>
                <strong>{money.format(shipment.amount)}</strong>
              </div>
              <div>
                <small>{t.shippingFee}</small>
                <strong>{money.format(shipment.shippingFee)}</strong>
              </div>
              <div>
                <small>{t.totalDue}</small>
                <strong>
                  {money.format(
                    shipment.amount +
                      (shipment.shippingPayer === "recipient" ? shipment.shippingFee : 0),
                  )}
                </strong>
              </div>
              <div>
                <small>{t.senderDue}</small>
                <strong>
                  {money.format(
                    shipment.amount -
                      (shipment.shippingPayer === "sender" ? shipment.shippingFee : 0),
                  )}
                </strong>
              </div>
              <div>
                <small>{t.shippingPayer}</small>
                <strong>
                  {shipment.shippingPayer === "recipient"
                    ? t.payerRecipient
                    : t.payerSender}
                </strong>
              </div>
            </div>
          </section>

          <section className="detail-section">
            <h3>{t.shipmentFile}</h3>
            <dl className="facts-list">
              <div>
                <dt>{t.sender}</dt>
                <dd>{shipment.sender[lang]}</dd>
              </div>
              <div>
                <dt>{t.currentCustody}</dt>
                <dd>{shipment.custody[lang]}</dd>
              </div>
              <div>
                <dt>{t.courier}</dt>
                <dd>{shipment.courier?.[lang] ?? t.noCourier}</dd>
              </div>
              <div>
                <dt>{t.orderConfirmation}</dt>
                <dd>{shipment.confirmation[lang]}</dd>
              </div>
              <div>
                <dt>{t.delivery}</dt>
                <dd>{shipment.deliveryDate[lang]}</dd>
              </div>
            </dl>
          </section>

          <section className="detail-section">
            <h3>{t.timeline}</h3>
            <div className="timeline">
              <span className="timeline__line" />
              <div>
                <i className="timeline__dot timeline__dot--active" />
                <strong>{shipment.lastEvent[lang]}</strong>
                <small>{t.updated}</small>
              </div>
              <div>
                <i className="timeline__dot" />
                <strong>
                  {lang === "ar" ? "تم إنشاء الشحنة" : "Shipment created"}
                </strong>
                <small>{lang === "ar" ? "اليوم، 9:34 ص" : "Today, 9:34 AM"}</small>
              </div>
            </div>
          </section>
        </div>

        <div className="drawer__footer">
          <button
            className="primary-button primary-button--wide"
            type="button"
            onClick={() => onToast(t.handoff)}
          >
            {t.openFull}
            {lang === "ar" ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

function FilterDrawer({
  lang,
  onClose,
  statusFilter,
  custodyFilter,
  onStatus,
  onCustody,
  onClear,
}: {
  lang: Lang;
  onClose: () => void;
  statusFilter: string;
  custodyFilter: string;
  onStatus: (value: string) => void;
  onCustody: (value: string) => void;
  onClear: () => void;
}) {
  const t = copy[lang];
  return (
    <>
      <button className="drawer-backdrop" type="button" onClick={onClose} />
      <aside className="filter-drawer" aria-label={t.filterTitle}>
        <div className="drawer__header">
          <div>
            <span className="drawer__eyebrow">{t.filters}</span>
            <h2>{t.filterTitle}</h2>
          </div>
          <button
            className="square-button"
            type="button"
            onClick={onClose}
            aria-label={t.close}
          >
            <X size={19} />
          </button>
        </div>
        <div className="filter-drawer__body">
          <label className="select-field">
            <span>{t.status}</span>
            <span className="select-wrap">
              <select
                value={statusFilter}
                onChange={(event) => onStatus(event.target.value)}
              >
                <option value="">{t.anyStatus}</option>
                <option value="blue">
                  {lang === "ar" ? "جاهزة / بانتظار" : "Ready / waiting"}
                </option>
                <option value="orange">
                  {lang === "ar" ? "قيد التوصيل" : "Out for delivery"}
                </option>
                <option value="green">
                  {lang === "ar" ? "تم التسليم" : "Delivered"}
                </option>
                <option value="red">
                  {lang === "ar" ? "تحتاج استكمال" : "Needs completion"}
                </option>
              </select>
              <ChevronDown size={17} />
            </span>
          </label>
          <label className="select-field">
            <span>{t.custody}</span>
            <span className="select-wrap">
              <select
                value={custodyFilter}
                onChange={(event) => onCustody(event.target.value)}
              >
                <option value="">{t.anyCustody}</option>
                <option value="warehouse">{t.inWarehouse}</option>
                <option value="courier">{t.withCourier}</option>
              </select>
              <ChevronDown size={17} />
            </span>
          </label>
          <label className="select-field">
            <span>{t.governorate}</span>
            <span className="select-wrap">
              <select defaultValue="">
                <option value="">{t.anyGovernorate}</option>
                <option>{lang === "ar" ? "القاهرة" : "Cairo"}</option>
                <option>{lang === "ar" ? "الجيزة" : "Giza"}</option>
                <option>{lang === "ar" ? "الإسكندرية" : "Alexandria"}</option>
              </select>
              <ChevronDown size={17} />
            </span>
          </label>
        </div>
        <div className="drawer__footer drawer__footer--split">
          <button className="secondary-button" type="button" onClick={onClear}>
            {t.clear}
          </button>
          <button className="primary-button" type="button" onClick={onClose}>
            {t.apply}
          </button>
        </div>
      </aside>
    </>
  );
}

function StatusPolicyDrawer({
  policy,
  isNew,
  lang,
  onClose,
  onSave,
}: {
  policy: StatusPolicy;
  isNew: boolean;
  lang: Lang;
  onClose: () => void;
  onSave: (policy: StatusPolicy) => void;
}) {
  const s = statusCopy[lang];
  const [draft, setDraft] = useState(policy);
  const visibilityOptions: Localized[] = [
    { ar: "العمليات", en: "Operations" },
    { ar: "الراسل", en: "Sender" },
    { ar: "المندوب", en: "Courier" },
    { ar: "خدمة العملاء", en: "Customer service" },
  ];
  const fieldOptions: Localized[] = [
    { ar: statusCopy.ar.reason, en: statusCopy.en.reason },
    { ar: statusCopy.ar.note, en: statusCopy.en.note },
    { ar: statusCopy.ar.amount, en: statusCopy.en.amount },
    { ar: statusCopy.ar.deliveredPieces, en: statusCopy.en.deliveredPieces },
    { ar: statusCopy.ar.newDate, en: statusCopy.en.newDate },
  ];

  function toggleLocalized(field: "visibility" | "requiredFields", item: Localized) {
    setDraft((current) => {
      const exists = current[field].some((value) => value.en === item.en);
      return {
        ...current,
        [field]: exists
          ? current[field].filter((value) => value.en !== item.en)
          : [...current[field], item],
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(draft);
  }

  return (
    <>
      <button
        className="drawer-backdrop"
        type="button"
        aria-label={s.cancel}
        onClick={onClose}
      />
      <aside className="policy-editor" aria-label={isNew ? s.newTitle : s.editorTitle}>
        <form onSubmit={handleSubmit}>
          <div className="drawer__header policy-editor__header">
            <div>
              <span
                className="status-color-preview"
                style={{ backgroundColor: draft.color }}
              />
              <span>
                <small>{isNew ? s.newTitle : s.editorTitle}</small>
                <strong>{draft.name[lang] || s.newTitle}</strong>
              </span>
            </div>
            <button
              className="square-button square-button--soft"
              type="button"
              onClick={onClose}
              aria-label={s.cancel}
            >
              <X size={18} />
            </button>
          </div>

          <div className="policy-editor__body">
            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><Pencil size={16} /></span>
                <div>
                  <strong>{s.basics}</strong>
                  <small>{s.code}</small>
                </div>
              </div>
              <div className="policy-form-grid">
                <label className="field">
                  <span>{s.arabicName}</span>
                  <span className="field__control">
                    <input
                      value={draft.name.ar}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, ar: event.target.value },
                        }))
                      }
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{s.englishName}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.name.en}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, en: event.target.value },
                        }))
                      }
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{s.code}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.code}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          code: event.target.value.toUpperCase().replace(/\s+/g, "_"),
                        }))
                      }
                    />
                  </span>
                </label>
                <label className="field policy-color-field">
                  <span>{s.color}</span>
                  <span className="field__control">
                    <input
                      type="color"
                      value={draft.color}
                      onChange={(event) =>
                        setDraft((current) => ({ ...current, color: event.target.value }))
                      }
                    />
                    <strong dir="ltr">{draft.color.toUpperCase()}</strong>
                  </span>
                </label>
                <label className="select-field">
                  <span>{s.publishState}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.state}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          state: event.target.value as StatusPolicy["state"],
                        }))
                      }
                    >
                      <option value="published">{s.publishedBadge}</option>
                      <option value="draft">{s.draftBadge}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
              </div>
            </section>

            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><Eye size={16} /></span>
                <div>
                  <strong>{s.permissions}</strong>
                  <small>{s.visibleTo}</small>
                </div>
              </div>
              <label className="select-field">
                <span>{s.executor}</span>
                <span className="select-wrap">
                  <select
                    value={draft.executors.en}
                    onChange={(event) => {
                      const map: Record<string, Localized> = {
                        "Operations only": { ar: "العمليات فقط", en: "Operations only" },
                        "Courier & operations": {
                          ar: "المندوب والعمليات",
                          en: "Courier & operations",
                        },
                        "Customer service & operations": {
                          ar: "خدمة العملاء والعمليات",
                          en: "Customer service & operations",
                        },
                        "Courier, customer service & operations": {
                          ar: "المندوب وخدمة العملاء والعمليات",
                          en: "Courier, customer service & operations",
                        },
                      };
                      setDraft((current) => ({
                        ...current,
                        executors: map[event.target.value],
                      }));
                    }}
                  >
                    <option value="Operations only">{s.operationsOnly}</option>
                    <option value="Courier & operations">{s.courierOperations}</option>
                    <option value="Customer service & operations">
                      {s.serviceOperations}
                    </option>
                    <option value="Courier, customer service & operations">
                      {s.courierServiceOperations}
                    </option>
                  </select>
                  <ChevronDown size={16} />
                </span>
              </label>
              <div className="policy-choice-grid">
                {visibilityOptions.map((item) => {
                  const checked = draft.visibility.some((value) => value.en === item.en);
                  return (
                    <label className="policy-check" key={item.en}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleLocalized("visibility", item)}
                      />
                      <span><Check size={13} /></span>
                      {item[lang]}
                    </label>
                  );
                })}
              </div>
            </section>

            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><GitBranch size={16} /></span>
                <div>
                  <strong>{s.operationalEffect}</strong>
                  <small>{s.assignment}</small>
                </div>
              </div>
              <div className="policy-form-grid">
                <label className="select-field">
                  <span>{s.assignment}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.assignmentEffect.en}
                      onChange={(event) => {
                        const map: Record<string, Localized> = {
                          "End assignment": { ar: "إنهاء التكليف", en: "End assignment" },
                          "Keep assignment": { ar: "إبقاء التكليف", en: "Keep assignment" },
                          "End + follow-up queue": {
                            ar: "إنهاء + قائمة متابعة",
                            en: "End + follow-up queue",
                          },
                          "Return route": { ar: "مسار مرتجع", en: "Return route" },
                        };
                        setDraft((current) => ({
                          ...current,
                          assignmentEffect: map[event.target.value],
                        }));
                      }}
                    >
                      <option value="End assignment">{s.endAssignment}</option>
                      <option value="Keep assignment">{s.keepAssignment}</option>
                      <option value="End + follow-up queue">{s.followUp}</option>
                      <option value="Return route">{s.returnRoute}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
                <label className="select-field">
                  <span>{s.pieces}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.pieceEffect.en}
                      onChange={(event) => {
                        const map: Record<string, Localized> = {
                          "Ignore piece count": {
                            ar: "لا يستخدم عدد القطع",
                            en: "Ignore piece count",
                          },
                          "All pieces delivered": {
                            ar: "كل القطع مسلّمة",
                            en: "All pieces delivered",
                          },
                          "All pieces returned": {
                            ar: "كل القطع راجعة",
                            en: "All pieces returned",
                          },
                          "Enter delivered; derive return": {
                            ar: "إدخال المسلّم واشتقاق الراجع",
                            en: "Enter delivered; derive return",
                          },
                        };
                        setDraft((current) => ({
                          ...current,
                          pieceEffect: map[event.target.value],
                        }));
                      }}
                    >
                      <option value="Ignore piece count">{s.ignorePieces}</option>
                      <option value="All pieces delivered">{s.allDelivered}</option>
                      <option value="All pieces returned">{s.allReturned}</option>
                      <option value="Enter delivered; derive return">{s.partialPieces}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
              </div>
              <button
                className="policy-switch-row"
                type="button"
                role="switch"
                aria-checked={draft.appearsInAssignment}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    appearsInAssignment: !current.appearsInAssignment,
                  }))
                }
              >
                <span>
                  <strong>{s.assignmentVisibilityToggle}</strong>
                  <small>{s.assignmentVisibilityHint}</small>
                </span>
                <i
                  className={
                    draft.appearsInAssignment ? "switch switch--on" : "switch"
                  }
                >
                  <b />
                </i>
              </button>
            </section>

            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><HandCoins size={16} /></span>
                <div>
                  <strong>{s.financialSection}</strong>
                  <small>{s.financialEffect}</small>
                </div>
              </div>
              <label className="select-field">
                <span>{s.financialEffect}</span>
                <span className="select-wrap">
                  <select
                    value={draft.financialEffect.en}
                    onChange={(event) => {
                      const map: Record<string, Localized> = {
                        "No financial effect": {
                          ar: "بلا أثر مالي",
                          en: "No financial effect",
                        },
                        "Money only": { ar: "مبلغ فقط", en: "Money only" },
                        "Return only": { ar: "مرتجع فقط", en: "Return only" },
                        "Money and return": {
                          ar: "مبلغ ومرتجع",
                          en: "Money and return",
                        },
                      };
                      setDraft((current) => ({
                        ...current,
                        financialEffect: map[event.target.value],
                      }));
                    }}
                  >
                    <option value="No financial effect">{s.noFinancial}</option>
                    <option value="Money only">{s.moneyOnly}</option>
                    <option value="Return only">{s.returnOnly}</option>
                    <option value="Money and return">{s.moneyReturn}</option>
                  </select>
                  <ChevronDown size={16} />
                </span>
              </label>
              <button
                className="policy-switch-row"
                type="button"
                role="switch"
                aria-checked={draft.appearsInPricing}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    appearsInPricing: !current.appearsInPricing,
                  }))
                }
              >
                <span>
                  <strong>{s.pricingToggle}</strong>
                  <small>{s.pricingHint}</small>
                </span>
                <i className={draft.appearsInPricing ? "switch switch--on" : "switch"}>
                  <b />
                </i>
              </button>
              <button
                className="policy-switch-row"
                type="button"
                role="switch"
                aria-checked={draft.appearsInCourierRates}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    appearsInCourierRates: !current.appearsInCourierRates,
                  }))
                }
              >
                <span>
                  <strong>{s.courierPricingToggle}</strong>
                  <small>{s.courierPricingHint}</small>
                </span>
                <i
                  className={
                    draft.appearsInCourierRates
                      ? "switch switch--on"
                      : "switch"
                  }
                >
                  <b />
                </i>
              </button>
            </section>

            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><ClipboardCheck size={16} /></span>
                <div>
                  <strong>{s.fields}</strong>
                  <small>{draft.requiredFields.length}</small>
                </div>
              </div>
              <div className="policy-choice-grid policy-choice-grid--fields">
                {fieldOptions.map((item) => {
                  const checked = draft.requiredFields.some(
                    (value) => value.en === item.en,
                  );
                  return (
                    <label className="policy-check" key={item.en}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleLocalized("requiredFields", item)}
                      />
                      <span><Check size={13} /></span>
                      {item[lang]}
                    </label>
                  );
                })}
              </div>
            </section>

            <div className="policy-demo-note">
              <CircleAlert size={15} />
              {s.demo}
            </div>
          </div>

          <div className="drawer__footer drawer__footer--split">
            <button className="secondary-button" type="button" onClick={onClose}>
              {s.cancel}
            </button>
            <button className="primary-button" type="submit">
              <Check size={17} />
              {s.save}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

function StatusesScreen({
  lang,
  theme,
  policies,
  onLang,
  onTheme,
  onPoliciesChange,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  policies: StatusPolicy[];
  onLang: () => void;
  onTheme: () => void;
  onPoliciesChange: (
    updater: (current: StatusPolicy[]) => StatusPolicy[],
  ) => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const t = copy[lang];
  const s = statusCopy[lang];
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [editing, setEditing] = useState<StatusPolicy | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return policies.filter((policy) => {
      const matchesSearch =
        !normalized ||
        [policy.name.ar, policy.name.en, policy.code].some((value) =>
          value.toLowerCase().includes(normalized),
        );
      const matchesState = stateFilter === "all" || policy.state === stateFilter;
      const matchesPricing =
        pricingFilter === "all" ||
        (pricingFilter === "yes" && policy.appearsInPricing) ||
        (pricingFilter === "no" && !policy.appearsInPricing);
      return matchesSearch && matchesState && matchesPricing;
    });
  }, [policies, pricingFilter, search, stateFilter]);

  function openNew() {
    setIsNew(true);
    setEditing({
      id: `status-${Date.now()}`,
      name: { ar: "حالة جديدة", en: "New status" },
      code: "NEW_STATUS",
      color: "#2551b9",
      state: "draft",
      executors: { ar: "العمليات فقط", en: "Operations only" },
      visibility: [{ ar: "العمليات", en: "Operations" }],
      assignmentEffect: { ar: "إنهاء التكليف", en: "End assignment" },
      pieceEffect: { ar: "لا يستخدم عدد القطع", en: "Ignore piece count" },
      financialEffect: { ar: "بلا أثر مالي", en: "No financial effect" },
      appearsInAssignment: false,
      appearsInPricing: false,
      appearsInCourierRates: false,
      requiredFields: [{ ar: "ملاحظة", en: "Note" }],
      usage: 0,
      version: 1,
    });
  }

  function savePolicy(policy: StatusPolicy) {
    onPoliciesChange((current) =>
      current.some((item) => item.id === policy.id)
        ? current.map((item) =>
            item.id === policy.id ? { ...policy, version: item.version + 1 } : item,
          )
        : [policy, ...current],
    );
    setEditing(null);
    setToast(isNew ? s.created : s.saved);
    setIsNew(false);
    window.setTimeout(() => setToast(""), 2600);
  }

  const financialCount = policies.filter(
    (policy) => policy.financialEffect.en !== "No financial effect",
  ).length;

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="statuses"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.mobileNav}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon"><SlidersHorizontal size={20} /></span>
            <span>
              <strong>{t.workspace}</strong>
              <small>{t.branch}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input placeholder={t.globalSearch} />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button
              className="square-button notification-button"
              type="button"
              aria-label={t.notifications}
            >
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content status-page">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>{s.title}</h1>
                <span className="demo-chip">{t.demoData}</span>
              </div>
              <p>{s.subtitle}</p>
            </div>
            <button className="primary-button" type="button" onClick={openNew}>
              <Plus size={18} />
              {s.add}
            </button>
          </div>

          <section className="status-summary-grid">
            <article>
              <span className="status-summary-icon status-summary-icon--green">
                <PackageCheck size={18} />
              </span>
              <div><small>{s.active}</small><strong>{policies.filter((item) => item.state === "published").length}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--blue">
                <HandCoins size={18} />
              </span>
              <div><small>{s.financial}</small><strong>{financialCount}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--orange">
                <SlidersHorizontal size={18} />
              </span>
              <div><small>{s.pricing}</small><strong>{policies.filter((item) => item.appearsInPricing).length}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--gray">
                <Pencil size={18} />
              </span>
              <div><small>{s.draft}</small><strong>{policies.filter((item) => item.state === "draft").length}</strong></div>
            </article>
          </section>

          <div className="status-control-note">
            <ShieldCheck size={18} />
            <span>{s.controlNote}</span>
          </div>

          <section className="status-policy-panel">
            <div className="status-policy-toolbar">
              <label className="shipment-search">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={s.search}
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")} aria-label={t.clear}>
                    <X size={16} />
                  </button>
                )}
              </label>
              <label className="select-wrap status-filter">
                <select
                  value={stateFilter}
                  onChange={(event) => setStateFilter(event.target.value)}
                >
                  <option value="all">{s.allStates}</option>
                  <option value="published">{s.published}</option>
                  <option value="draft">{s.drafts}</option>
                </select>
                <ChevronDown size={15} />
              </label>
              <label className="select-wrap status-filter">
                <select
                  value={pricingFilter}
                  onChange={(event) => setPricingFilter(event.target.value)}
                >
                  <option value="all">{s.allPricing}</option>
                  <option value="yes">{s.inPricing}</option>
                  <option value="no">{s.notInPricing}</option>
                </select>
                <ChevronDown size={15} />
              </label>
            </div>

            <div className="status-policy-table">
              <div className="status-policy-table__head">
                <span>{s.status}</span>
                <span>{s.operation}</span>
                <span>{s.money}</span>
                <span>{s.visibility}</span>
                <span>{s.usage}</span>
                <span />
              </div>
              <div className="status-policy-table__body">
                {filtered.map((policy) => (
                  <article className="status-policy-row" key={policy.id}>
                    <div className="status-identity">
                      <span
                        className="status-identity__color"
                        style={{ backgroundColor: policy.color }}
                      />
                      <span>
                        <strong>{policy.name[lang]}</strong>
                        <small dir="ltr">{policy.code}</small>
                      </span>
                      <em
                        className={
                          policy.state === "published"
                            ? "policy-state policy-state--published"
                            : "policy-state policy-state--draft"
                        }
                      >
                        {policy.state === "published"
                          ? s.publishedBadge
                          : s.draftBadge}
                      </em>
                    </div>
                    <div className="status-policy-copy">
                      <strong>{policy.assignmentEffect[lang]}</strong>
                      <small>{policy.executors[lang]}</small>
                      <small>{policy.pieceEffect[lang]}</small>
                    </div>
                    <div className="status-policy-copy">
                      <strong>{policy.financialEffect[lang]}</strong>
                      <span
                        className={
                          policy.appearsInPricing
                            ? "pricing-link pricing-link--active"
                            : "pricing-link"
                        }
                      >
                        {policy.appearsInPricing ? s.pricingBadge : s.noPricing}
                      </span>
                      <span
                        className={
                          policy.appearsInCourierRates
                            ? "pricing-link pricing-link--active"
                            : "pricing-link"
                        }
                      >
                        {policy.appearsInCourierRates
                          ? s.courierRatesBadge
                          : s.noCourierRates}
                      </span>
                    </div>
                    <div className="visibility-chips">
                      {policy.visibility.map((item) => (
                        <span key={item.en}>{item[lang]}</span>
                      ))}
                    </div>
                    <div className="status-usage">
                      <strong>{policy.usage.toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}</strong>
                      <small>{s.version} {policy.version}</small>
                    </div>
                    <button
                      className="status-edit-button"
                      type="button"
                      aria-label={s.edit}
                      title={s.edit}
                      onClick={() => {
                        setIsNew(false);
                        setEditing(policy);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                  </article>
                ))}
                {filtered.length === 0 && (
                  <div className="status-empty">
                    <Search size={22} />
                    <span>{s.noResults}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      {editing && (
        <StatusPolicyDrawer
          key={editing.id}
          policy={editing}
          isNew={isNew}
          lang={lang}
          onClose={() => {
            setEditing(null);
            setIsNew(false);
          }}
          onSave={savePolicy}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function GeoEditorDrawer({
  editor,
  lang,
  onClose,
  onSave,
}: {
  editor: GeoEditorState;
  lang: Lang;
  onClose: () => void;
  onSave: (editor: GeoEditorState) => void;
}) {
  const g = geoCopy[lang];
  const [draft, setDraft] = useState(editor.draft);
  const title =
    editor.kind === "governorate"
      ? editor.isNew
        ? g.newGovernorate
        : g.editorGovernorate
      : editor.isNew
        ? g.newArea
        : g.editorArea;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ ...editor, draft });
  }

  return (
    <>
      <button
        className="drawer-backdrop"
        type="button"
        aria-label={g.cancel}
        onClick={onClose}
      />
      <aside className="policy-editor geo-editor" aria-label={title}>
        <form onSubmit={handleSubmit}>
          <div className="drawer__header policy-editor__header">
            <div>
              <span className="geo-editor-badge">
                <MapPin size={19} />
              </span>
              <span>
                <small>{title}</small>
                <strong>{draft.name[lang] || title}</strong>
              </span>
            </div>
            <button
              className="square-button square-button--soft"
              type="button"
              onClick={onClose}
              aria-label={g.cancel}
            >
              <X size={18} />
            </button>
          </div>

          <div className="policy-editor__body">
            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><Pencil size={16} /></span>
                <div>
                  <strong>{title}</strong>
                  <small>{g.code}</small>
                </div>
              </div>
              <div className="policy-form-grid">
                <label className="field">
                  <span>{g.arabicName}</span>
                  <span className="field__control">
                    <input
                      value={draft.name.ar}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, ar: event.target.value },
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{g.englishName}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.name.en}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, en: event.target.value },
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{g.code}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.code}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          code: event.target.value.toUpperCase().replace(/\s+/g, "-"),
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{g.order}</span>
                  <span className="field__control">
                    <input
                      type="number"
                      min="1"
                      value={draft.order}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          order: Number(event.target.value) || 1,
                        }))
                      }
                    />
                  </span>
                </label>
                <label className="select-field">
                  <span>{g.state}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.state}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          state: event.target.value as "active" | "paused",
                        }))
                      }
                    >
                      <option value="active">{g.active}</option>
                      <option value="paused">{g.paused}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
              </div>
            </section>

            {editor.kind === "area" && (
              <>
                <section className="policy-form-section">
                  <div className="policy-form-section__title">
                    <span><Search size={16} /></span>
                    <div>
                      <strong>{g.alternativeNames}</strong>
                      <small>{g.alternativeHint}</small>
                    </div>
                  </div>
                  <label className="field geo-alias-field">
                    <span>{g.alternativeNames}</span>
                    <span className="field__control">
                      <input
                        value={draft.aliases.join("، ")}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            aliases: event.target.value
                              .split(/[,،]/)
                              .map((value) => value.trim())
                              .filter(Boolean),
                          }))
                        }
                        placeholder={lang === "ar" ? "مثال: التجمع، الرحاب" : "e.g. Tagamoa, Rehab"}
                      />
                    </span>
                  </label>
                  <button
                    className="policy-switch-row"
                    type="button"
                    role="switch"
                    aria-checked={draft.assignmentAllowed}
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        assignmentAllowed: !current.assignmentAllowed,
                      }))
                    }
                  >
                    <span>
                      <strong>{g.assignmentToggle}</strong>
                      <small>{g.assignmentHint}</small>
                    </span>
                    <i className={draft.assignmentAllowed ? "switch switch--on" : "switch"}>
                      <b />
                    </i>
                  </button>
                </section>

                <section className="geo-link-card">
                  <span><SlidersHorizontal size={18} /></span>
                  <div>
                    <strong>{g.priceLinkTitle}</strong>
                    <p>{g.priceLinkHint}</p>
                  </div>
                </section>
              </>
            )}

            <section className="geo-safety-card">
              <ShieldCheck size={18} />
              <div>
                <strong>{g.existingData}</strong>
                <p>{g.existingDataHint}</p>
              </div>
            </section>

            <div className="policy-demo-note">
              <CircleAlert size={15} />
              {g.demo}
            </div>
          </div>

          <div className="drawer__footer drawer__footer--split">
            <button className="secondary-button" type="button" onClick={onClose}>
              {g.cancel}
            </button>
            <button className="primary-button" type="submit">
              <Check size={17} />
              {g.save}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

function AreasScreen({
  lang,
  theme,
  governorates,
  priceLists,
  policies,
  onLang,
  onTheme,
  onGovernoratesChange,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  governorates: GovernorateRecord[];
  priceLists: PriceListRecord[];
  policies: StatusPolicy[];
  onLang: () => void;
  onTheme: () => void;
  onGovernoratesChange: (
    updater: (current: GovernorateRecord[]) => GovernorateRecord[],
  ) => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const t = copy[lang];
  const g = geoCopy[lang];
  const priceListCount = priceLists.length;
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedGovernorateId, setSelectedGovernorateId] = useState(
    governorates[0]?.id ?? "",
  );
  const [governorateSearch, setGovernorateSearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [editor, setEditor] = useState<GeoEditorState | null>(null);
  const [toast, setToast] = useState("");

  const allAreas = governorates.flatMap((governorate) => governorate.areas);
  const pricingPolicyIds = policies
    .filter((policy) => policy.state === "published" && policy.appearsInPricing)
    .map((policy) => policy.id);
  const selectedGovernorate =
    governorates.find((governorate) => governorate.id === selectedGovernorateId) ??
    governorates[0];

  const filteredGovernorates = useMemo(() => {
    const normalized = governorateSearch.trim().toLowerCase();
    return governorates
      .filter(
        (governorate) =>
          !normalized ||
          [governorate.name.ar, governorate.name.en, governorate.code].some((value) =>
            value.toLowerCase().includes(normalized),
          ),
      )
      .sort((a, b) => a.order - b.order);
  }, [governorateSearch, governorates]);

  const filteredAreas = useMemo(() => {
    if (!selectedGovernorate) return [];
    const normalized = areaSearch.trim().toLowerCase();
    return selectedGovernorate.areas
      .filter((area) => {
        const matchesSearch =
          !normalized ||
          [area.name.ar, area.name.en, area.code, ...area.aliases].some((value) =>
            value.toLowerCase().includes(normalized),
          );
        const matchesState = stateFilter === "all" || area.state === stateFilter;
        return matchesSearch && matchesState;
      })
      .sort((a, b) => a.order - b.order);
  }, [areaSearch, selectedGovernorate, stateFilter]);

  function newGovernorate() {
    setEditor({
      kind: "governorate",
      isNew: true,
      governorateId: "",
      draft: {
        id: `gov-${Date.now()}`,
        name: { ar: "", en: "" },
        code: "",
        state: "active",
        order: governorates.length + 1,
        aliases: [],
        assignmentAllowed: true,
      },
    });
  }

  function editGovernorate() {
    if (!selectedGovernorate) return;
    setEditor({
      kind: "governorate",
      isNew: false,
      governorateId: selectedGovernorate.id,
      draft: {
        id: selectedGovernorate.id,
        name: selectedGovernorate.name,
        code: selectedGovernorate.code,
        state: selectedGovernorate.state,
        order: selectedGovernorate.order,
        aliases: [],
        assignmentAllowed: true,
      },
    });
  }

  function openArea(area?: AreaRecord) {
    if (!selectedGovernorate) return;
    setEditor({
      kind: "area",
      isNew: !area,
      governorateId: selectedGovernorate.id,
      draft: area
        ? {
            id: area.id,
            name: area.name,
            code: area.code,
            state: area.state,
            order: area.order,
            aliases: area.aliases,
            assignmentAllowed: area.assignmentAllowed,
          }
        : {
            id: `area-${Date.now()}`,
            name: { ar: "", en: "" },
            code: `${selectedGovernorate.code}-`,
            state: "active",
            order: selectedGovernorate.areas.length + 1,
            aliases: [],
            assignmentAllowed: true,
          },
    });
  }

  function saveGeo(nextEditor: GeoEditorState) {
    const { draft } = nextEditor;
    if (nextEditor.kind === "governorate") {
      onGovernoratesChange((current) => {
        const exists = current.some((item) => item.id === draft.id);
        if (exists) {
          return current.map((item) =>
            item.id === draft.id
              ? {
                  ...item,
                  name: draft.name,
                  code: draft.code,
                  state: draft.state,
                  order: draft.order,
                }
              : item,
          );
        }
        return [
          ...current,
          {
            id: draft.id,
            name: draft.name,
            code: draft.code,
            state: draft.state,
            order: draft.order,
            areas: [],
          },
        ];
      });
      if (nextEditor.isNew) setSelectedGovernorateId(draft.id);
      setToast(g.savedGovernorate);
    } else {
      onGovernoratesChange((current) =>
        current.map((governorate) => {
          if (governorate.id !== nextEditor.governorateId) return governorate;
          const existing = governorate.areas.find((area) => area.id === draft.id);
          const savedArea: AreaRecord = {
            id: draft.id,
            name: draft.name,
            code: draft.code,
            state: draft.state,
            order: draft.order,
            aliases: draft.aliases,
            assignmentAllowed: draft.assignmentAllowed,
            pricedLists: existing?.pricedLists ?? 0,
            shipments: existing?.shipments ?? 0,
          };
          return {
            ...governorate,
            areas: existing
              ? governorate.areas.map((area) =>
                  area.id === draft.id ? savedArea : area,
                )
              : [...governorate.areas, savedArea],
          };
        }),
      );
      setToast(g.savedArea);
    }
    setEditor(null);
    window.setTimeout(() => setToast(""), 2600);
  }

  const activeAreaCount = allAreas.filter((area) => area.state === "active").length;
  const pausedAreaCount = allAreas.length - activeAreaCount;
  const completedListsForArea = (areaId: string) =>
    priceLists.filter((priceList) =>
      pricingPolicyIds.every(
        (statusId) => priceList.prices[areaId]?.[statusId] != null,
      ),
    ).length;
  const pendingPriceCount = allAreas.filter(
    (area) => completedListsForArea(area.id) < priceListCount,
  ).length;

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="areas"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.mobileNav}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon"><MapPin size={20} /></span>
            <span>
              <strong>{t.workspace}</strong>
              <small>{t.branch}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input placeholder={t.globalSearch} />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button
              className="square-button notification-button"
              type="button"
              aria-label={t.notifications}
            >
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content geo-page">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>{g.title}</h1>
                <span className="demo-chip">{t.demoData}</span>
              </div>
              <p>{g.subtitle}</p>
            </div>
            <button className="primary-button" type="button" onClick={newGovernorate}>
              <Plus size={18} />
              {g.addGovernorate}
            </button>
          </div>

          <section className="status-summary-grid geo-summary-grid">
            <article>
              <span className="status-summary-icon status-summary-icon--blue">
                <MapPin size={18} />
              </span>
              <div><small>{g.governorates}</small><strong>{governorates.length}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--green">
                <PackageCheck size={18} />
              </span>
              <div><small>{g.activeAreas}</small><strong>{activeAreaCount}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--gray">
                <CircleAlert size={18} />
              </span>
              <div><small>{g.pausedAreas}</small><strong>{pausedAreaCount}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--orange">
                <HandCoins size={18} />
              </span>
              <div><small>{g.pricingPending}</small><strong>{pendingPriceCount}</strong></div>
            </article>
          </section>

          <div className="status-control-note geo-control-note">
            <GitBranch size={18} />
            <span>{g.controlNote}</span>
          </div>

          <section className="geo-control-layout">
            <aside className="governorates-panel">
              <div className="geo-panel-heading">
                <span>
                  <strong>{g.governorates}</strong>
                  <small>{governorates.length} {g.governorateCount}</small>
                </span>
                <button
                  className="status-edit-button"
                  type="button"
                  title={g.addGovernorate}
                  onClick={newGovernorate}
                >
                  <Plus size={16} />
                </button>
              </div>
              <label className="shipment-search geo-search">
                <Search size={17} />
                <input
                  value={governorateSearch}
                  onChange={(event) => setGovernorateSearch(event.target.value)}
                  placeholder={g.searchGovernorate}
                />
                {governorateSearch && (
                  <button
                    type="button"
                    onClick={() => setGovernorateSearch("")}
                    aria-label={t.clear}
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
              <div className="governorate-list">
                {filteredGovernorates.map((governorate) => (
                  <button
                    className={`governorate-item ${
                      governorate.id === selectedGovernorate?.id
                        ? "governorate-item--active"
                        : ""
                    }`}
                    type="button"
                    key={governorate.id}
                    onClick={() => setSelectedGovernorateId(governorate.id)}
                  >
                    <span className="governorate-item__icon">
                      <MapPin size={16} />
                    </span>
                    <span>
                      <strong>{governorate.name[lang]}</strong>
                      <small dir="ltr">{governorate.code}</small>
                    </span>
                    <span className="governorate-item__meta">
                      <b>{governorate.areas.length}</b>
                      <i
                        className={
                          governorate.state === "active"
                            ? "geo-state-dot geo-state-dot--active"
                            : "geo-state-dot"
                        }
                      />
                    </span>
                  </button>
                ))}
                {filteredGovernorates.length === 0 && (
                  <div className="geo-list-empty">{g.noGovernorates}</div>
                )}
              </div>
            </aside>

            <div className="areas-panel">
              {selectedGovernorate && (
                <>
                  <div className="areas-panel__heading">
                    <div>
                      <span className="geo-title-icon"><MapPin size={19} /></span>
                      <span>
                        <small>{g.areasIn}</small>
                        <strong>{selectedGovernorate.name[lang]}</strong>
                      </span>
                      <em
                        className={
                          selectedGovernorate.state === "active"
                            ? "policy-state policy-state--published"
                            : "policy-state policy-state--draft"
                        }
                      >
                        {selectedGovernorate.state === "active" ? g.active : g.paused}
                      </em>
                    </div>
                    <div>
                      <button
                        className="secondary-button geo-edit-governorate"
                        type="button"
                        onClick={editGovernorate}
                      >
                        <Pencil size={15} />
                        {g.editGovernorate}
                      </button>
                      <button className="primary-button" type="button" onClick={() => openArea()}>
                        <Plus size={17} />
                        {g.addArea}
                      </button>
                    </div>
                  </div>

                  <div className="geo-area-toolbar">
                    <label className="shipment-search">
                      <Search size={18} />
                      <input
                        value={areaSearch}
                        onChange={(event) => setAreaSearch(event.target.value)}
                        placeholder={g.searchArea}
                      />
                      {areaSearch && (
                        <button type="button" onClick={() => setAreaSearch("")} aria-label={t.clear}>
                          <X size={16} />
                        </button>
                      )}
                    </label>
                    <label className="select-wrap status-filter">
                      <select
                        value={stateFilter}
                        onChange={(event) => setStateFilter(event.target.value)}
                      >
                        <option value="all">{g.allAvailability}</option>
                        <option value="active">{g.active}</option>
                        <option value="paused">{g.paused}</option>
                      </select>
                      <ChevronDown size={15} />
                    </label>
                  </div>

                  <div className="geo-area-table">
                    <div className="geo-area-table__head">
                      <span>{g.area}</span>
                      <span>{g.aliases}</span>
                      <span>{g.availability}</span>
                      <span>{g.priceLists}</span>
                      <span>{g.shipments}</span>
                      <span />
                    </div>
                    <div className="geo-area-table__body">
                      {filteredAreas.map((area) => {
                        const completedLists = completedListsForArea(area.id);
                        return (
                        <article className="geo-area-row" key={area.id}>
                          <div className="geo-area-identity">
                            <span className="geo-area-pin"><MapPin size={15} /></span>
                            <span>
                              <strong>{area.name[lang]}</strong>
                              <small dir="ltr">{area.code}</small>
                            </span>
                          </div>
                          <div className="geo-aliases">
                            {area.aliases.length ? (
                              area.aliases.slice(0, 2).map((alias) => (
                                <span key={alias}>{alias}</span>
                              ))
                            ) : (
                              <small>—</small>
                            )}
                          </div>
                          <div className="geo-availability">
                            <span
                              className={
                                area.state === "active"
                                  ? "policy-state policy-state--published"
                                  : "policy-state policy-state--draft"
                              }
                            >
                              {area.state === "active" ? g.active : g.paused}
                            </span>
                            <small>
                              {area.assignmentAllowed
                                ? g.assignmentReady
                                : g.assignmentPaused}
                            </small>
                          </div>
                          <div className="geo-pricing">
                            <span>
                              <strong dir="ltr">{completedLists}/{priceListCount}</strong>
                              <small>
                                {completedLists === priceListCount
                                  ? g.readyPricing
                                  : g.pendingPricing}
                              </small>
                            </span>
                            <i>
                              <b
                                style={{
                                  width: `${
                                    priceListCount
                                      ? (completedLists / priceListCount) * 100
                                      : 0
                                  }%`,
                                }}
                              />
                            </i>
                          </div>
                          <div className="geo-shipment-count">
                            <strong>{area.shipments.toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}</strong>
                            <small>{g.shipments}</small>
                          </div>
                          <button
                            className="status-edit-button"
                            type="button"
                            aria-label={g.editorArea}
                            title={g.editorArea}
                            onClick={() => openArea(area)}
                          >
                            <Pencil size={16} />
                          </button>
                        </article>
                      )})}
                      {filteredAreas.length === 0 && (
                        <div className="status-empty">
                          <MapPin size={22} />
                          <span>{g.noAreas}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
      </div>

      {editor && (
        <GeoEditorDrawer
          key={`${editor.kind}-${editor.draft.id}`}
          editor={editor}
          lang={lang}
          onClose={() => setEditor(null)}
          onSave={saveGeo}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function PriceListEditor({
  priceList,
  isNew,
  lang,
  onClose,
  onSave,
}: {
  priceList: PriceListRecord;
  isNew: boolean;
  lang: Lang;
  onClose: () => void;
  onSave: (priceList: PriceListRecord) => void;
}) {
  const p = priceListCopy[lang];
  const [draft, setDraft] = useState(priceList);

  function toggleSender(sender: Localized) {
    setDraft((current) => {
      const exists = current.senders.some((item) => item.en === sender.en);
      return {
        ...current,
        senders: exists
          ? current.senders.filter((item) => item.en !== sender.en)
          : [...current.senders, sender],
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(draft);
  }

  return (
    <>
      <button
        className="drawer-backdrop"
        type="button"
        aria-label={p.cancel}
        onClick={onClose}
      />
      <aside className="policy-editor price-list-editor" aria-label={p.editorTitle}>
        <form onSubmit={handleSubmit}>
          <div className="drawer__header policy-editor__header">
            <div>
              <span className="price-editor-badge">
                <HandCoins size={20} />
              </span>
              <span>
                <small>{isNew ? p.newTitle : p.editorTitle}</small>
                <strong>{draft.name[lang] || p.newTitle}</strong>
              </span>
            </div>
            <button
              className="square-button square-button--soft"
              type="button"
              onClick={onClose}
              aria-label={p.cancel}
            >
              <X size={18} />
            </button>
          </div>

          <div className="policy-editor__body">
            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><Pencil size={16} /></span>
                <div>
                  <strong>{isNew ? p.newTitle : p.editorTitle}</strong>
                  <small>{p.code}</small>
                </div>
              </div>
              <div className="policy-form-grid">
                <label className="field">
                  <span>{p.arabicName}</span>
                  <span className="field__control">
                    <input
                      value={draft.name.ar}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, ar: event.target.value },
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{p.englishName}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.name.en}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, en: event.target.value },
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{p.code}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.code}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          code: event.target.value.toUpperCase().replace(/\s+/g, "-"),
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="select-field">
                  <span>{p.publishState}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.state}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          state: event.target.value as "active" | "draft",
                        }))
                      }
                    >
                      <option value="active">{p.active}</option>
                      <option value="draft">{p.draft}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
              </div>

              <button
                className="policy-switch-row"
                type="button"
                role="switch"
                aria-checked={draft.isDefault}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    isDefault: !current.isDefault,
                  }))
                }
              >
                <span>
                  <strong>{p.defaultList}</strong>
                  <small>{p.defaultHint}</small>
                </span>
                <i className={draft.isDefault ? "switch switch--on" : "switch"}>
                  <b />
                </i>
              </button>
            </section>

            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><UsersRound size={16} /></span>
                <div>
                  <strong>{p.senderLink}</strong>
                  <small>{p.senderLinkHint}</small>
                </div>
              </div>
              <div className="policy-choice-grid price-sender-grid">
                {availableSenders.map((sender) => {
                  const checked = draft.senders.some((item) => item.en === sender.en);
                  return (
                    <label className="policy-check" key={sender.en}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSender(sender)}
                      />
                      <span><Check size={13} /></span>
                      {sender[lang]}
                    </label>
                  );
                })}
              </div>
            </section>

            <section className="geo-safety-card pricing-snapshot-card">
              <ShieldCheck size={18} />
              <div>
                <strong>{p.snapshotTitle}</strong>
                <p>{p.snapshotHint}</p>
              </div>
            </section>

            <div className="policy-demo-note">
              <CircleAlert size={15} />
              {p.demo}
            </div>
          </div>

          <div className="drawer__footer drawer__footer--split">
            <button className="secondary-button" type="button" onClick={onClose}>
              {p.cancel}
            </button>
            <button className="primary-button" type="submit">
              <Check size={17} />
              {p.save}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

function PriceListsScreen({
  lang,
  theme,
  priceLists,
  statuses,
  governorates,
  onLang,
  onTheme,
  onPriceListsChange,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  priceLists: PriceListRecord[];
  statuses: StatusPolicy[];
  governorates: GovernorateRecord[];
  onLang: () => void;
  onTheme: () => void;
  onPriceListsChange: (
    updater: (current: PriceListRecord[]) => PriceListRecord[],
  ) => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const t = copy[lang];
  const p = priceListCopy[lang];
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(priceLists[0]?.id ?? "");
  const [listSearch, setListSearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");
  const [governorateFilter, setGovernorateFilter] = useState("all");
  const [editing, setEditing] = useState<PriceListRecord | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dirtyLists, setDirtyLists] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const pricingStatuses = statuses.filter(
    (status) => status.state === "published" && status.appearsInPricing,
  );
  const areasWithGovernorates = governorates.flatMap((governorate) =>
    governorate.areas.map((area) => ({ area, governorate })),
  );
  const selected =
    priceLists.find((priceList) => priceList.id === selectedId) ?? priceLists[0];

  const filteredLists = useMemo(() => {
    const normalized = listSearch.trim().toLowerCase();
    return priceLists.filter(
      (priceList) =>
        !normalized ||
        [priceList.name.ar, priceList.name.en, priceList.code].some((value) =>
          value.toLowerCase().includes(normalized),
        ),
    );
  }, [listSearch, priceLists]);

  const filteredAreas = useMemo(() => {
    const normalized = areaSearch.trim().toLowerCase();
    return areasWithGovernorates.filter(({ area, governorate }) => {
      const matchesGovernorate =
        governorateFilter === "all" || governorate.id === governorateFilter;
      const matchesSearch =
        !normalized ||
        [
          area.name.ar,
          area.name.en,
          area.code,
          governorate.name.ar,
          governorate.name.en,
          ...area.aliases,
        ].some((value) => value.toLowerCase().includes(normalized));
      return matchesGovernorate && matchesSearch;
    });
  }, [areaSearch, governorateFilter]);

  function priceListCompletion(priceList: PriceListRecord) {
    const total = areasWithGovernorates.length * pricingStatuses.length;
    const filled = areasWithGovernorates.reduce(
      (count, { area }) =>
        count +
        pricingStatuses.filter(
          (status) => priceList.prices[area.id]?.[status.id] != null,
        ).length,
      0,
    );
    return {
      filled,
      total,
      percent: total ? Math.round((filled / total) * 100) : 0,
    };
  }

  function setPrice(areaId: string, statusId: string, rawValue: string) {
    if (!selected) return;
    const value = rawValue === "" ? null : Math.max(0, Number(rawValue));
    onPriceListsChange((current) =>
      current.map((priceList) =>
        priceList.id === selected.id
          ? {
              ...priceList,
              prices: {
                ...priceList.prices,
                [areaId]: {
                  ...(priceList.prices[areaId] ?? {}),
                  [statusId]: Number.isNaN(value) ? null : value,
                },
              },
            }
          : priceList,
      ),
    );
    setDirtyLists((current) =>
      current.includes(selected.id) ? current : [...current, selected.id],
    );
  }

  function savePrices() {
    if (!selected) return;
    onPriceListsChange((current) =>
      current.map((priceList) =>
        priceList.id === selected.id
          ? { ...priceList, version: priceList.version + 1 }
          : priceList,
      ),
    );
    setDirtyLists((current) => current.filter((id) => id !== selected.id));
    setToast(p.savedPrices);
    window.setTimeout(() => setToast(""), 2600);
  }

  function openNew() {
    const prices: PriceMatrix = {};
    areasWithGovernorates.forEach(({ area }) => {
      prices[area.id] = Object.fromEntries(
        pricingStatuses.map((status) => [status.id, null]),
      );
    });
    setIsNew(true);
    setEditing({
      id: `price-${Date.now()}`,
      name: { ar: "", en: "" },
      code: "",
      state: "draft",
      isDefault: false,
      senders: [],
      version: 1,
      prices,
    });
  }

  function saveList(next: PriceListRecord) {
    onPriceListsChange((current) => {
      const selectedSenderNames = new Set(next.senders.map((sender) => sender.en));
      const exists = current.some((priceList) => priceList.id === next.id);
      const prepared = current.map((priceList) => ({
        ...priceList,
        isDefault: next.isDefault ? false : priceList.isDefault,
        senders:
          priceList.id === next.id
            ? priceList.senders
            : priceList.senders.filter(
                (sender) => !selectedSenderNames.has(sender.en),
              ),
      }));
      if (exists) {
        return prepared.map((priceList) =>
          priceList.id === next.id
            ? { ...next, version: priceList.version + 1 }
            : priceList,
        );
      }
      return [next, ...prepared];
    });
    setSelectedId(next.id);
    setEditing(null);
    setToast(isNew ? p.createdList : p.savedList);
    setIsNew(false);
    window.setTimeout(() => setToast(""), 2600);
  }

  const assignedSenderCount = new Set(
    priceLists.flatMap((priceList) => priceList.senders.map((sender) => sender.en)),
  ).size;
  const totalMissing = priceLists.reduce((sum, priceList) => {
    const completion = priceListCompletion(priceList);
    return sum + completion.total - completion.filled;
  }, 0);
  const selectedCompletion = selected
    ? priceListCompletion(selected)
    : { filled: 0, total: 0, percent: 0 };
  const selectedDirty = selected ? dirtyLists.includes(selected.id) : false;

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="priceLists"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.mobileNav}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon"><HandCoins size={20} /></span>
            <span>
              <strong>{t.workspace}</strong>
              <small>{t.branch}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input placeholder={t.globalSearch} />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button
              className="square-button notification-button"
              type="button"
              aria-label={t.notifications}
            >
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content pricing-page">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>{p.title}</h1>
                <span className="demo-chip">{t.demoData}</span>
              </div>
              <p>{p.subtitle}</p>
            </div>
            <button className="primary-button" type="button" onClick={openNew}>
              <Plus size={18} />
              {p.add}
            </button>
          </div>

          <section className="status-summary-grid pricing-summary-grid">
            <article>
              <span className="status-summary-icon status-summary-icon--blue">
                <HandCoins size={18} />
              </span>
              <div><small>{p.activeLists}</small><strong>{priceLists.filter((list) => list.state === "active").length}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--green">
                <UsersRound size={18} />
              </span>
              <div><small>{p.assignedSenders}</small><strong>{assignedSenderCount}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--gray">
                <UserRound size={18} />
              </span>
              <div><small>{p.privateLists}</small><strong>{priceLists.filter((list) => list.senders.length === 1).length}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--orange">
                <CircleAlert size={18} />
              </span>
              <div><small>{p.missingPrices}</small><strong>{totalMissing}</strong></div>
            </article>
          </section>

          <div className="status-control-note pricing-control-note">
            <GitBranch size={18} />
            <span>{p.controlNote}</span>
          </div>

          <section className="pricing-layout">
            <aside className="price-lists-panel">
              <div className="geo-panel-heading">
                <span>
                  <strong>{p.lists}</strong>
                  <small>{priceLists.length}</small>
                </span>
                <button
                  className="status-edit-button"
                  type="button"
                  title={p.add}
                  onClick={openNew}
                >
                  <Plus size={16} />
                </button>
              </div>
              <label className="shipment-search price-list-search">
                <Search size={15} />
                <input
                  value={listSearch}
                  onChange={(event) => setListSearch(event.target.value)}
                  placeholder={p.searchLists}
                />
                {listSearch && (
                  <button type="button" onClick={() => setListSearch("")} aria-label={t.clear}>
                    <X size={15} />
                  </button>
                )}
              </label>
              <div className="price-list-items">
                {filteredLists.map((priceList) => {
                  const completion = priceListCompletion(priceList);
                  return (
                    <button
                      className={`price-list-item ${
                        priceList.id === selected?.id ? "price-list-item--active" : ""
                      }`}
                      type="button"
                      key={priceList.id}
                      onClick={() => setSelectedId(priceList.id)}
                    >
                      <span className="price-list-item__top">
                        <span>
                          <strong>{priceList.name[lang]}</strong>
                          <small dir="ltr">{priceList.code}</small>
                        </span>
                        {dirtyLists.includes(priceList.id) && (
                          <i className="price-dirty-dot" title={p.unsaved} />
                        )}
                      </span>
                      <span className="price-list-item__badges">
                        {priceList.isDefault && <em>{p.defaultBadge}</em>}
                        <em
                          className={
                            priceList.state === "active"
                              ? "price-list-state price-list-state--active"
                              : "price-list-state"
                          }
                        >
                          {priceList.state === "active" ? p.activeBadge : p.draftBadge}
                        </em>
                      </span>
                      <span className="price-list-item__meta">
                        <small>
                          {priceList.senders.length || p.noSender}{" "}
                          {priceList.senders.length
                            ? priceList.senders.length === 1
                              ? p.sender
                              : p.senders
                            : ""}
                        </small>
                        <small>{completion.percent}% {p.completion}</small>
                      </span>
                      <span className="price-list-progress">
                        <b style={{ width: `${completion.percent}%` }} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="pricing-workspace">
              {selected && (
                <>
                  <div className="pricing-workspace__heading">
                    <div>
                      <span className="price-workspace-icon"><HandCoins size={19} /></span>
                      <span>
                        <small>{p.pricingFor}</small>
                        <strong>{selected.name[lang]}</strong>
                      </span>
                      <em
                        className={
                          selected.state === "active"
                            ? "policy-state policy-state--published"
                            : "policy-state policy-state--draft"
                        }
                      >
                        {selected.state === "active" ? p.activeBadge : p.draftBadge}
                      </em>
                    </div>
                    <div>
                      {selectedDirty && (
                        <span className="unsaved-chip">
                          <CircleAlert size={14} />
                          {p.unsaved}
                        </span>
                      )}
                      <button
                        className="secondary-button pricing-settings-button"
                        type="button"
                        onClick={() => {
                          setIsNew(false);
                          setEditing(selected);
                        }}
                      >
                        <Settings2 size={15} />
                        {p.editList}
                      </button>
                      <button
                        className="primary-button"
                        type="button"
                        disabled={!selectedDirty}
                        onClick={savePrices}
                      >
                        <Check size={16} />
                        {p.savePrices}
                      </button>
                    </div>
                  </div>

                  <div className="pricing-status-strip">
                    <div>
                      <strong>{p.linkedStatuses}</strong>
                      <small>{p.linkedStatusesHint}</small>
                    </div>
                    <div>
                      {pricingStatuses.map((status) => (
                        <span key={status.id}>
                          <i style={{ backgroundColor: status.color }} />
                          {status.name[lang]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pricing-toolbar">
                    <label className="shipment-search">
                      <Search size={18} />
                      <input
                        value={areaSearch}
                        onChange={(event) => setAreaSearch(event.target.value)}
                        placeholder={p.searchArea}
                      />
                      {areaSearch && (
                        <button type="button" onClick={() => setAreaSearch("")} aria-label={t.clear}>
                          <X size={16} />
                        </button>
                      )}
                    </label>
                    <label className="select-wrap status-filter">
                      <select
                        value={governorateFilter}
                        onChange={(event) => setGovernorateFilter(event.target.value)}
                      >
                        <option value="all">{p.allGovernorates}</option>
                        {governorates.map((governorate) => (
                          <option key={governorate.id} value={governorate.id}>
                            {governorate.name[lang]}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={15} />
                    </label>
                  </div>

                  <div
                    className="pricing-matrix"
                    style={
                      {
                        "--pricing-column-count": Math.max(
                          pricingStatuses.length,
                          1,
                        ),
                      } as CSSProperties
                    }
                  >
                    <div className="pricing-matrix__head">
                      <span>{p.area}</span>
                      {pricingStatuses.map((status) => (
                        <span key={status.id}>
                          <i style={{ backgroundColor: status.color }} />
                          {status.name[lang]}
                        </span>
                      ))}
                    </div>
                    <div className="pricing-matrix__body">
                      {filteredAreas.map(({ area, governorate }) => (
                        <article className="pricing-row" key={area.id}>
                          <div className="pricing-area">
                            <span className="geo-area-pin"><MapPin size={15} /></span>
                            <span>
                              <strong>{area.name[lang]}</strong>
                              <small>{governorate.name[lang]}</small>
                            </span>
                            {area.state === "paused" && <em>{p.stoppedArea}</em>}
                          </div>
                          {pricingStatuses.map((status) => {
                            const value = selected.prices[area.id]?.[status.id];
                            return (
                              <label
                                className={`price-cell ${value == null ? "price-cell--missing" : ""}`}
                                key={status.id}
                              >
                                <span className="price-cell__mobile-label">
                                  <i style={{ backgroundColor: status.color }} />
                                  {status.name[lang]}
                                </span>
                                <span>
                                  <input
                                    type="number"
                                    min="0"
                                    inputMode="decimal"
                                    value={value ?? ""}
                                    placeholder={p.missing}
                                    onChange={(event) =>
                                      setPrice(area.id, status.id, event.target.value)
                                    }
                                    aria-label={`${area.name[lang]} - ${status.name[lang]}`}
                                  />
                                  <small>{p.priceCurrency}</small>
                                </span>
                              </label>
                            );
                          })}
                        </article>
                      ))}
                      {filteredAreas.length === 0 && (
                        <div className="status-empty">
                          <Search size={22} />
                          <span>{p.noAreas}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pricing-footer">
                    <span>
                      <ShieldCheck size={16} />
                      {p.snapshotHint}
                    </span>
                    <strong>{selectedCompletion.filled}/{selectedCompletion.total}</strong>
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
      </div>

      {editing && (
        <PriceListEditor
          key={editing.id}
          priceList={editing}
          isNew={isNew}
          lang={lang}
          onClose={() => {
            setEditing(null);
            setIsNew(false);
          }}
          onSave={saveList}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function CourierPlanEditor({
  plan,
  isNew,
  lang,
  onClose,
  onSave,
}: {
  plan: CourierRatePlan;
  isNew: boolean;
  lang: Lang;
  onClose: () => void;
  onSave: (plan: CourierRatePlan) => void;
}) {
  const c = courierRateCopy[lang];
  const [draft, setDraft] = useState(plan);

  function toggleCourier(courier: Localized) {
    setDraft((current) => {
      const exists = current.couriers.some((item) => item.en === courier.en);
      return {
        ...current,
        couriers: exists
          ? current.couriers.filter((item) => item.en !== courier.en)
          : [...current.couriers, courier],
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(draft);
  }

  return (
    <>
      <button
        className="drawer-backdrop"
        type="button"
        aria-label={c.cancel}
        onClick={onClose}
      />
      <aside className="policy-editor courier-plan-editor" aria-label={c.editorTitle}>
        <form onSubmit={handleSubmit}>
          <div className="drawer__header policy-editor__header">
            <div>
              <span className="courier-editor-badge">
                <Truck size={20} />
              </span>
              <span>
                <small>{isNew ? c.newTitle : c.editorTitle}</small>
                <strong>{draft.name[lang] || c.newTitle}</strong>
              </span>
            </div>
            <button
              className="square-button square-button--soft"
              type="button"
              onClick={onClose}
              aria-label={c.cancel}
            >
              <X size={18} />
            </button>
          </div>

          <div className="policy-editor__body">
            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><Pencil size={16} /></span>
                <div>
                  <strong>{isNew ? c.newTitle : c.editorTitle}</strong>
                  <small>{c.code}</small>
                </div>
              </div>
              <div className="policy-form-grid">
                <label className="field">
                  <span>{c.arabicName}</span>
                  <span className="field__control">
                    <input
                      value={draft.name.ar}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, ar: event.target.value },
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{c.englishName}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.name.en}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, en: event.target.value },
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{c.code}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.code}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          code: event.target.value.toUpperCase().replace(/\s+/g, "-"),
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="select-field">
                  <span>{c.state}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.state}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          state: event.target.value as "active" | "draft",
                        }))
                      }
                    >
                      <option value="active">{c.activeBadge}</option>
                      <option value="draft">{c.draftBadge}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
                <label className="select-field">
                  <span>{c.compensationType}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.compensationType}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          compensationType:
                            event.target.value as CourierCompensationType,
                          fixedSalary:
                            event.target.value === "commission"
                              ? null
                              : current.fixedSalary ?? 0,
                        }))
                      }
                    >
                      <option value="commission">{c.commission}</option>
                      <option value="salary">{c.salary}</option>
                      <option value="mixed">{c.mixed}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
                <label className="select-field">
                  <span>{c.settlementCycle}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.settlementCycle}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          settlementCycle:
                            event.target.value as CourierSettlementCycle,
                        }))
                      }
                    >
                      <option value="instant">{c.instant}</option>
                      <option value="daily">{c.daily}</option>
                      <option value="weekly">{c.weekly}</option>
                      <option value="monthly">{c.monthly}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
                {draft.compensationType !== "commission" && (
                  <label className="field">
                    <span>{c.fixedSalary}</span>
                    <span className="field__control">
                      <input
                        type="number"
                        min="0"
                        value={draft.fixedSalary ?? 0}
                        onChange={(event) =>
                          setDraft((current) => ({
                            ...current,
                            fixedSalary: Math.max(0, Number(event.target.value) || 0),
                          }))
                        }
                      />
                    </span>
                  </label>
                )}
              </div>

              <button
                className="policy-switch-row"
                type="button"
                role="switch"
                aria-checked={draft.isDefault}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    isDefault: !current.isDefault,
                  }))
                }
              >
                <span>
                  <strong>{c.defaultPlan}</strong>
                  <small>{c.defaultHint}</small>
                </span>
                <i className={draft.isDefault ? "switch switch--on" : "switch"}>
                  <b />
                </i>
              </button>
            </section>

            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><UserRound size={16} /></span>
                <div>
                  <strong>{c.courierLink}</strong>
                  <small>{c.courierLinkHint}</small>
                </div>
              </div>
              <div className="policy-choice-grid">
                {availableCouriers.map((courier) => {
                  const checked = draft.couriers.some(
                    (item) => item.en === courier.en,
                  );
                  return (
                    <label className="policy-check" key={courier.en}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCourier(courier)}
                      />
                      <span><Check size={13} /></span>
                      {courier[lang]}
                    </label>
                  );
                })}
              </div>
            </section>

            <section className="geo-safety-card">
              <ShieldCheck size={18} />
              <div>
                <strong>{c.compensationType}</strong>
                <p>{c.snapshotHint}</p>
              </div>
            </section>

            <div className="policy-demo-note">
              <CircleAlert size={15} />
              {c.demo}
            </div>
          </div>

          <div className="drawer__footer drawer__footer--split">
            <button className="secondary-button" type="button" onClick={onClose}>
              {c.cancel}
            </button>
            <button className="primary-button" type="submit">
              <Check size={17} />
              {c.save}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

function CourierRatesScreen({
  lang,
  theme,
  plans,
  statuses,
  governorates,
  onLang,
  onTheme,
  onPlansChange,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  plans: CourierRatePlan[];
  statuses: StatusPolicy[];
  governorates: GovernorateRecord[];
  onLang: () => void;
  onTheme: () => void;
  onPlansChange: (
    updater: (current: CourierRatePlan[]) => CourierRatePlan[],
  ) => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const t = copy[lang];
  const c = courierRateCopy[lang];
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(plans[0]?.id ?? "");
  const [planSearch, setPlanSearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");
  const [governorateFilter, setGovernorateFilter] = useState("all");
  const [editing, setEditing] = useState<CourierRatePlan | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dirtyPlans, setDirtyPlans] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const courierStatuses = statuses.filter(
    (status) =>
      status.state === "published" && status.appearsInCourierRates,
  );
  const areasWithGovernorates = governorates.flatMap((governorate) =>
    governorate.areas.map((area) => ({ area, governorate })),
  );
  const selected = plans.find((plan) => plan.id === selectedId) ?? plans[0];

  const filteredPlans = useMemo(() => {
    const normalized = planSearch.trim().toLowerCase();
    return plans.filter(
      (plan) =>
        !normalized ||
        [plan.name.ar, plan.name.en, plan.code].some((value) =>
          value.toLowerCase().includes(normalized),
        ),
    );
  }, [planSearch, plans]);

  const filteredAreas = useMemo(() => {
    const normalized = areaSearch.trim().toLowerCase();
    return areasWithGovernorates.filter(({ area, governorate }) => {
      const matchesGovernorate =
        governorateFilter === "all" || governorate.id === governorateFilter;
      const matchesSearch =
        !normalized ||
        [
          area.name.ar,
          area.name.en,
          area.code,
          governorate.name.ar,
          governorate.name.en,
          ...area.aliases,
        ].some((value) => value.toLowerCase().includes(normalized));
      return matchesGovernorate && matchesSearch;
    });
  }, [areaSearch, governorateFilter, governorates]);

  function planCompletion(plan: CourierRatePlan) {
    if (plan.compensationType === "salary") {
      return { filled: 1, total: 1, percent: 100 };
    }
    const total = areasWithGovernorates.length * courierStatuses.length;
    const filled = areasWithGovernorates.reduce(
      (count, { area }) =>
        count +
        courierStatuses.filter(
          (status) => plan.rates[area.id]?.[status.id] != null,
        ).length,
      0,
    );
    return {
      filled,
      total,
      percent: total ? Math.round((filled / total) * 100) : 0,
    };
  }

  function compensationLabel(type: CourierCompensationType) {
    return type === "commission"
      ? c.commission
      : type === "salary"
        ? c.salary
        : c.mixed;
  }

  function cycleLabel(cycle: CourierSettlementCycle) {
    return cycle === "instant"
      ? c.instant
      : cycle === "daily"
        ? c.daily
        : cycle === "weekly"
          ? c.weekly
          : c.monthly;
  }

  function setRate(areaId: string, statusId: string, rawValue: string) {
    if (!selected) return;
    const value = rawValue === "" ? null : Math.max(0, Number(rawValue));
    onPlansChange((current) =>
      current.map((plan) =>
        plan.id === selected.id
          ? {
              ...plan,
              rates: {
                ...plan.rates,
                [areaId]: {
                  ...(plan.rates[areaId] ?? {}),
                  [statusId]: Number.isNaN(value) ? null : value,
                },
              },
            }
          : plan,
      ),
    );
    setDirtyPlans((current) =>
      current.includes(selected.id) ? current : [...current, selected.id],
    );
  }

  function saveRates() {
    if (!selected) return;
    onPlansChange((current) =>
      current.map((plan) =>
        plan.id === selected.id
          ? { ...plan, version: plan.version + 1 }
          : plan,
      ),
    );
    setDirtyPlans((current) => current.filter((id) => id !== selected.id));
    setToast(c.savedRates);
    window.setTimeout(() => setToast(""), 2600);
  }

  function openNew() {
    const rates: PriceMatrix = {};
    areasWithGovernorates.forEach(({ area }) => {
      rates[area.id] = Object.fromEntries(
        courierStatuses.map((status) => [status.id, null]),
      );
    });
    setIsNew(true);
    setEditing({
      id: `courier-plan-${Date.now()}`,
      name: { ar: "", en: "" },
      code: "",
      state: "draft",
      isDefault: false,
      compensationType: "commission",
      settlementCycle: "weekly",
      fixedSalary: null,
      couriers: [],
      version: 1,
      rates,
    });
  }

  function savePlan(next: CourierRatePlan) {
    onPlansChange((current) => {
      const chosenCouriers = new Set(next.couriers.map((courier) => courier.en));
      const exists = current.some((plan) => plan.id === next.id);
      const prepared = current.map((plan) => ({
        ...plan,
        isDefault: next.isDefault ? false : plan.isDefault,
        couriers:
          plan.id === next.id
            ? plan.couriers
            : plan.couriers.filter(
                (courier) => !chosenCouriers.has(courier.en),
              ),
      }));
      if (exists) {
        return prepared.map((plan) =>
          plan.id === next.id
            ? { ...next, version: plan.version + 1 }
            : plan,
        );
      }
      return [next, ...prepared];
    });
    setSelectedId(next.id);
    setEditing(null);
    setToast(isNew ? c.createdPlan : c.savedPlan);
    setIsNew(false);
    window.setTimeout(() => setToast(""), 2600);
  }

  const assignedCourierCount = new Set(
    plans.flatMap((plan) => plan.couriers.map((courier) => courier.en)),
  ).size;
  const selectedCompletion = selected
    ? planCompletion(selected)
    : { filled: 0, total: 0, percent: 0 };
  const selectedDirty = selected ? dirtyPlans.includes(selected.id) : false;

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="courierRates"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.mobileNav}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon"><Truck size={20} /></span>
            <span>
              <strong>{t.workspace}</strong>
              <small>{t.branch}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input placeholder={t.globalSearch} />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button
              className="square-button notification-button"
              type="button"
              aria-label={t.notifications}
            >
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content courier-rates-page">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>{c.title}</h1>
                <span className="demo-chip">{t.demoData}</span>
              </div>
              <p>{c.subtitle}</p>
            </div>
            <button className="primary-button" type="button" onClick={openNew}>
              <Plus size={18} />
              {c.add}
            </button>
          </div>

          <section className="status-summary-grid">
            <article>
              <span className="status-summary-icon status-summary-icon--blue">
                <Truck size={18} />
              </span>
              <div><small>{c.activePlans}</small><strong>{plans.filter((plan) => plan.state === "active").length}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--green">
                <UserRound size={18} />
              </span>
              <div><small>{c.assignedCouriers}</small><strong>{assignedCourierCount}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--orange">
                <HandCoins size={18} />
              </span>
              <div><small>{c.commissionPlans}</small><strong>{plans.filter((plan) => plan.compensationType !== "salary").length}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--gray">
                <CalendarDays size={18} />
              </span>
              <div><small>{c.salaryPlans}</small><strong>{plans.filter((plan) => plan.compensationType !== "commission").length}</strong></div>
            </article>
          </section>

          <div className="status-control-note courier-control-note">
            <GitBranch size={18} />
            <span>{c.controlNote}</span>
          </div>

          <section className="pricing-layout courier-rate-layout">
            <aside className="price-lists-panel">
              <div className="geo-panel-heading">
                <span>
                  <strong>{c.plans}</strong>
                  <small>{plans.length}</small>
                </span>
                <button
                  className="status-edit-button"
                  type="button"
                  title={c.add}
                  onClick={openNew}
                >
                  <Plus size={16} />
                </button>
              </div>
              <label className="shipment-search price-list-search">
                <Search size={15} />
                <input
                  value={planSearch}
                  onChange={(event) => setPlanSearch(event.target.value)}
                  placeholder={c.searchPlans}
                />
                {planSearch && (
                  <button type="button" onClick={() => setPlanSearch("")} aria-label={t.clear}>
                    <X size={15} />
                  </button>
                )}
              </label>
              <div className="price-list-items">
                {filteredPlans.map((plan) => {
                  const completion = planCompletion(plan);
                  return (
                    <button
                      className={`price-list-item courier-plan-item ${
                        plan.id === selected?.id ? "price-list-item--active" : ""
                      }`}
                      type="button"
                      key={plan.id}
                      onClick={() => setSelectedId(plan.id)}
                    >
                      <span className="price-list-item__top">
                        <span>
                          <strong>{plan.name[lang]}</strong>
                          <small dir="ltr">{plan.code}</small>
                        </span>
                        {dirtyPlans.includes(plan.id) && (
                          <i className="price-dirty-dot" title={c.unsaved} />
                        )}
                      </span>
                      <span className="price-list-item__badges">
                        {plan.isDefault && <em>{c.defaultBadge}</em>}
                        <em
                          className={
                            plan.state === "active"
                              ? "price-list-state price-list-state--active"
                              : "price-list-state"
                          }
                        >
                          {plan.state === "active" ? c.activeBadge : c.draftBadge}
                        </em>
                        <em className="courier-pay-type">
                          {compensationLabel(plan.compensationType)}
                        </em>
                      </span>
                      <span className="price-list-item__meta">
                        <small>
                          {plan.couriers.length || c.noCourier}{" "}
                          {plan.couriers.length
                            ? plan.couriers.length === 1
                              ? c.courier
                              : c.couriers
                            : ""}
                        </small>
                        <small>{cycleLabel(plan.settlementCycle)}</small>
                      </span>
                      <span className="price-list-progress">
                        <b style={{ width: `${completion.percent}%` }} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="pricing-workspace">
              {selected && (
                <>
                  <div className="pricing-workspace__heading">
                    <div>
                      <span className="courier-workspace-icon"><Truck size={19} /></span>
                      <span>
                        <small>{c.planFor}</small>
                        <strong>{selected.name[lang]}</strong>
                      </span>
                      <em
                        className={
                          selected.state === "active"
                            ? "policy-state policy-state--published"
                            : "policy-state policy-state--draft"
                        }
                      >
                        {selected.state === "active" ? c.activeBadge : c.draftBadge}
                      </em>
                    </div>
                    <div>
                      {selectedDirty && (
                        <span className="unsaved-chip">
                          <CircleAlert size={14} />
                          {c.unsaved}
                        </span>
                      )}
                      <button
                        className="secondary-button pricing-settings-button"
                        type="button"
                        onClick={() => {
                          setIsNew(false);
                          setEditing(selected);
                        }}
                      >
                        <Settings2 size={15} />
                        {c.settings}
                      </button>
                      {selected.compensationType !== "salary" && (
                        <button
                          className="primary-button"
                          type="button"
                          disabled={!selectedDirty}
                          onClick={saveRates}
                        >
                          <Check size={16} />
                          {c.saveRates}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="courier-plan-facts">
                    <span>
                      <HandCoins size={15} />
                      <small>{c.compensationType}</small>
                      <strong>{compensationLabel(selected.compensationType)}</strong>
                    </span>
                    <span>
                      <CalendarDays size={15} />
                      <small>{c.settlementCycle}</small>
                      <strong>{cycleLabel(selected.settlementCycle)}</strong>
                    </span>
                    {selected.compensationType !== "commission" && (
                      <span>
                        <HandCoins size={15} />
                        <small>{c.monthlySalary}</small>
                        <strong>{selected.fixedSalary?.toLocaleString(lang === "ar" ? "ar-EG" : "en-US")} {c.priceCurrency}</strong>
                      </span>
                    )}
                  </div>

                  {selected.compensationType === "salary" ? (
                    <div className="courier-salary-panel">
                      <span><CalendarDays size={26} /></span>
                      <div>
                        <small>{c.salaryOnlyTitle}</small>
                        <strong>
                          {selected.fixedSalary?.toLocaleString(
                            lang === "ar" ? "ar-EG" : "en-US",
                          )}{" "}
                          {c.priceCurrency}
                        </strong>
                        <p>{c.salaryOnlyHint}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="pricing-status-strip">
                        <div>
                          <strong>{c.linkedStatuses}</strong>
                          <small>{c.linkedStatusesHint}</small>
                        </div>
                        <div>
                          {courierStatuses.map((status) => (
                            <span key={status.id}>
                              <i style={{ backgroundColor: status.color }} />
                              {status.name[lang]}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pricing-toolbar">
                        <label className="shipment-search">
                          <Search size={18} />
                          <input
                            value={areaSearch}
                            onChange={(event) => setAreaSearch(event.target.value)}
                            placeholder={c.searchArea}
                          />
                          {areaSearch && (
                            <button type="button" onClick={() => setAreaSearch("")} aria-label={t.clear}>
                              <X size={16} />
                            </button>
                          )}
                        </label>
                        <label className="select-wrap status-filter">
                          <select
                            value={governorateFilter}
                            onChange={(event) =>
                              setGovernorateFilter(event.target.value)
                            }
                          >
                            <option value="all">{c.allGovernorates}</option>
                            {governorates.map((governorate) => (
                              <option key={governorate.id} value={governorate.id}>
                                {governorate.name[lang]}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={15} />
                        </label>
                      </div>

                      <div
                        className="pricing-matrix courier-rate-matrix"
                        style={
                          {
                            "--pricing-column-count": Math.max(
                              courierStatuses.length,
                              1,
                            ),
                          } as CSSProperties
                        }
                      >
                        <div className="pricing-matrix__head">
                          <span>{c.area}</span>
                          {courierStatuses.map((status) => (
                            <span key={status.id}>
                              <i style={{ backgroundColor: status.color }} />
                              {status.name[lang]}
                            </span>
                          ))}
                        </div>
                        <div className="pricing-matrix__body">
                          {filteredAreas.map(({ area, governorate }) => (
                            <article className="pricing-row" key={area.id}>
                              <div className="pricing-area">
                                <span className="geo-area-pin"><MapPin size={15} /></span>
                                <span>
                                  <strong>{area.name[lang]}</strong>
                                  <small>{governorate.name[lang]}</small>
                                </span>
                                {area.state === "paused" && <em>{c.stoppedArea}</em>}
                              </div>
                              {courierStatuses.map((status) => {
                                const value = selected.rates[area.id]?.[status.id];
                                return (
                                  <label
                                    className={`price-cell ${value == null ? "price-cell--missing" : ""}`}
                                    key={status.id}
                                  >
                                    <span className="price-cell__mobile-label">
                                      <i style={{ backgroundColor: status.color }} />
                                      {status.name[lang]}
                                    </span>
                                    <span>
                                      <input
                                        type="number"
                                        min="0"
                                        inputMode="decimal"
                                        value={value ?? ""}
                                        placeholder={c.missing}
                                        onChange={(event) =>
                                          setRate(
                                            area.id,
                                            status.id,
                                            event.target.value,
                                          )
                                        }
                                        aria-label={`${area.name[lang]} - ${status.name[lang]}`}
                                      />
                                      <small>{c.priceCurrency}</small>
                                    </span>
                                  </label>
                                );
                              })}
                            </article>
                          ))}
                          {filteredAreas.length === 0 && (
                            <div className="status-empty">
                              <Search size={22} />
                              <span>{c.noAreas}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pricing-footer">
                        <span>
                          <ShieldCheck size={16} />
                          {c.snapshotHint}
                        </span>
                        <strong>{selectedCompletion.filled}/{selectedCompletion.total}</strong>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
      </div>

      {editing && (
        <CourierPlanEditor
          key={editing.id}
          plan={editing}
          isNew={isNew}
          lang={lang}
          onClose={() => {
            setEditing(null);
            setIsNew(false);
          }}
          onSave={savePlan}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function ShipmentFieldEditor({
  field,
  isNew,
  lang,
  onClose,
  onSave,
}: {
  field: ShipmentFieldPolicy;
  isNew: boolean;
  lang: Lang;
  onClose: () => void;
  onSave: (field: ShipmentFieldPolicy) => void;
}) {
  const s = shipmentPolicyCopy[lang];
  const [draft, setDraft] = useState(field);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(draft);
  }

  return (
    <>
      <button
        className="drawer-backdrop"
        type="button"
        aria-label={s.cancel}
        onClick={onClose}
      />
      <aside className="policy-editor shipment-field-editor" aria-label={s.editorTitle}>
        <form onSubmit={handleSubmit}>
          <div className="drawer__header policy-editor__header">
            <div>
              <span className="shipment-field-editor__badge">
                <ClipboardCheck size={20} />
              </span>
              <span>
                <small>{isNew ? s.newFieldTitle : s.editorTitle}</small>
                <strong>{draft.name[lang] || s.newFieldTitle}</strong>
              </span>
            </div>
            <button
              className="square-button square-button--soft"
              type="button"
              onClick={onClose}
              aria-label={s.cancel}
            >
              <X size={18} />
            </button>
          </div>

          <div className="policy-editor__body">
            <section className="policy-form-section">
              <div className="policy-form-section__title">
                <span><Pencil size={16} /></span>
                <div>
                  <strong>{isNew ? s.newFieldTitle : s.editorTitle}</strong>
                  <small>{draft.custom ? s.custom : s.system}</small>
                </div>
              </div>
              <div className="policy-form-grid">
                <label className="field">
                  <span>{s.arabicName}</span>
                  <span className="field__control">
                    <input
                      value={draft.name.ar}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, ar: event.target.value },
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{s.englishName}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.name.en}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: { ...current.name, en: event.target.value },
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{s.code}</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.code}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          code: event.target.value.toUpperCase().replace(/\s+/g, "_"),
                        }))
                      }
                      required
                    />
                  </span>
                </label>
                <label className="select-field">
                  <span>{s.fieldGroup}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.group}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          group: event.target.value as ShipmentFieldGroup,
                        }))
                      }
                    >
                      <option value="recipient">{s.recipient}</option>
                      <option value="address">{s.address}</option>
                      <option value="shipment">{s.shipment}</option>
                      <option value="financial">{s.financial}</option>
                      <option value="sender">{s.sender}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
                <label className="field">
                  <span>{s.description} — AR</span>
                  <span className="field__control">
                    <input
                      value={draft.description.ar}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          description: {
                            ...current.description,
                            ar: event.target.value,
                          },
                        }))
                      }
                    />
                  </span>
                </label>
                <label className="field">
                  <span>{s.description} — EN</span>
                  <span className="field__control">
                    <input
                      dir="ltr"
                      value={draft.description.en}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          description: {
                            ...current.description,
                            en: event.target.value,
                          },
                        }))
                      }
                    />
                  </span>
                </label>
                <label className="select-field">
                  <span>{s.defaultBehavior}</span>
                  <span className="select-wrap">
                    <select
                      value={draft.mode}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          mode: event.target.value as ShipmentFieldMode,
                        }))
                      }
                    >
                      <option value="required_on_create">{s.requiredCreate}</option>
                      <option value="optional">{s.optional}</option>
                      <option value="required_before_assignment">
                        {s.requiredAssignment}
                      </option>
                      <option value="hidden">{s.hidden}</option>
                    </select>
                    <ChevronDown size={16} />
                  </span>
                </label>
              </div>

              <button
                className="policy-switch-row"
                type="button"
                role="switch"
                aria-checked={draft.inExcel}
                onClick={() =>
                  setDraft((current) => ({
                    ...current,
                    inExcel: !current.inExcel,
                  }))
                }
              >
                <span>
                  <strong>{s.excelToggle}</strong>
                  <small>{s.excelToggleHint}</small>
                </span>
                <i className={draft.inExcel ? "switch switch--on" : "switch"}>
                  <b />
                </i>
              </button>
            </section>

            <div className="policy-demo-note">
              <CircleAlert size={15} />
              {s.demo}
            </div>
          </div>

          <div className="drawer__footer drawer__footer--split">
            <button className="secondary-button" type="button" onClick={onClose}>
              {s.cancel}
            </button>
            <button className="primary-button" type="submit">
              <Check size={17} />
              {s.saveField}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}

function ShipmentPoliciesScreen({
  lang,
  theme,
  fields,
  settings,
  onLang,
  onTheme,
  onSave,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  fields: ShipmentFieldPolicy[];
  settings: ShipmentDataSettings;
  onLang: () => void;
  onTheme: () => void;
  onSave: (
    fields: ShipmentFieldPolicy[],
    settings: ShipmentDataSettings,
  ) => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const t = copy[lang];
  const s = shipmentPolicyCopy[lang];
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [draftFields, setDraftFields] = useState(fields);
  const [draftSettings, setDraftSettings] = useState(settings);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [editing, setEditing] = useState<ShipmentFieldPolicy | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState("");

  const modeOptions: Array<{
    value: ShipmentFieldMode;
    label: string;
  }> = [
    { value: "required_on_create", label: s.requiredCreate },
    { value: "optional", label: s.optional },
    {
      value: "required_before_assignment",
      label: s.requiredAssignment,
    },
    { value: "hidden", label: s.hidden },
  ];

  function groupLabel(group: ShipmentFieldGroup) {
    return group === "recipient"
      ? s.recipient
      : group === "address"
        ? s.address
        : group === "shipment"
          ? s.shipment
          : group === "financial"
            ? s.financial
            : s.sender;
  }

  const filteredFields = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return draftFields
      .filter((field) => {
        const matchesSearch =
          !normalized ||
          [field.name.ar, field.name.en, field.code].some((value) =>
            value.toLowerCase().includes(normalized),
          );
        const matchesGroup = groupFilter === "all" || field.group === groupFilter;
        return matchesSearch && matchesGroup;
      })
      .sort((a, b) => a.order - b.order);
  }, [draftFields, groupFilter, search]);

  function updateSetting<K extends keyof ShipmentDataSettings>(
    key: K,
    value: ShipmentDataSettings[K],
  ) {
    setDraftSettings((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  function setFieldMode(id: string, mode: ShipmentFieldMode) {
    setDraftFields((current) =>
      current.map((field) => (field.id === id ? { ...field, mode } : field)),
    );
    setDirty(true);
  }

  function toggleExcel(id: string) {
    setDraftFields((current) =>
      current.map((field) =>
        field.id === id ? { ...field, inExcel: !field.inExcel } : field,
      ),
    );
    setDirty(true);
  }

  function openNew() {
    setIsNew(true);
    setEditing({
      id: `custom-field-${Date.now()}`,
      name: { ar: "", en: "" },
      code: "",
      group: "shipment",
      description: { ar: "", en: "" },
      mode: "optional",
      custom: true,
      inExcel: true,
      order: draftFields.length + 1,
    });
  }

  function saveField(field: ShipmentFieldPolicy) {
    setDraftFields((current) =>
      current.some((item) => item.id === field.id)
        ? current.map((item) => (item.id === field.id ? field : item))
        : [...current, field],
    );
    setEditing(null);
    setIsNew(false);
    setDirty(true);
  }

  function savePolicies() {
    onSave(draftFields, draftSettings);
    setDirty(false);
    setToast(s.saved);
    window.setTimeout(() => setToast(""), 2600);
  }

  const requiredCreateCount = draftFields.filter(
    (field) => field.mode === "required_on_create",
  ).length;
  const requiredAssignmentCount = draftFields.filter(
    (field) => field.mode === "required_before_assignment",
  ).length;
  const hiddenCount = draftFields.filter((field) => field.mode === "hidden").length;
  const activeCount = draftFields.length - hiddenCount;

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="shipmentPolicies"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.mobileNav}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon"><ClipboardCheck size={20} /></span>
            <span>
              <strong>{t.workspace}</strong>
              <small>{t.branch}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input placeholder={t.globalSearch} />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button
              className="square-button notification-button"
              type="button"
              aria-label={t.notifications}
            >
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content shipment-policies-page">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>{s.title}</h1>
                <span className="demo-chip">{t.demoData}</span>
              </div>
              <p>{s.subtitle}</p>
            </div>
            <div className="shipment-policy-actions">
              {dirty && (
                <span className="unsaved-chip">
                  <CircleAlert size={14} />
                  {s.unsaved}
                </span>
              )}
              <button
                className="secondary-button"
                type="button"
                onClick={openNew}
              >
                <Plus size={17} />
                {s.addField}
              </button>
              <button
                className="primary-button"
                type="button"
                disabled={!dirty}
                onClick={savePolicies}
              >
                <Check size={17} />
                {s.savePolicies}
              </button>
            </div>
          </div>

          <section className="status-summary-grid">
            <article>
              <span className="status-summary-icon status-summary-icon--green">
                <ClipboardCheck size={18} />
              </span>
              <div><small>{s.activeFields}</small><strong>{activeCount}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--blue">
                <LockKeyhole size={18} />
              </span>
              <div><small>{s.createRequiredCount}</small><strong>{requiredCreateCount}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--orange">
                <Truck size={18} />
              </span>
              <div><small>{s.assignmentRequiredCount}</small><strong>{requiredAssignmentCount}</strong></div>
            </article>
            <article>
              <span className="status-summary-icon status-summary-icon--gray">
                <Eye size={18} />
              </span>
              <div><small>{s.hiddenFields}</small><strong>{hiddenCount}</strong></div>
            </article>
          </section>

          <div className="status-control-note shipment-policy-note">
            <SlidersHorizontal size={18} />
            <span>{s.controlNote}</span>
          </div>

          <section className="shipment-workflow-panel">
            <div className="shipment-workflow-panel__heading">
              <span>
                <strong>{s.workflowTitle}</strong>
                <small>{s.incompleteHint}</small>
              </span>
            </div>
            <div className="shipment-workflow-grid">
              <article>
                <span className="workflow-policy-icon workflow-policy-icon--blue">
                  <Phone size={17} />
                </span>
                <div>
                  <strong>{s.confirmationTitle}</strong>
                  <small>{s.confirmationHint}</small>
                </div>
                <label className="select-wrap">
                  <select
                    value={draftSettings.confirmationMode}
                    onChange={(event) =>
                      updateSetting(
                        "confirmationMode",
                        event.target.value as ShipmentDataSettings["confirmationMode"],
                      )
                    }
                  >
                    <option value="off">{s.confirmationOff}</option>
                    <option value="optional">{s.confirmationOptional}</option>
                    <option value="required_before_assignment">
                      {s.confirmationRequired}
                    </option>
                  </select>
                  <ChevronDown size={15} />
                </label>
              </article>
              <article>
                <span className="workflow-policy-icon workflow-policy-icon--orange">
                  <Warehouse size={17} />
                </span>
                <div>
                  <strong>{s.incompleteTitle}</strong>
                  <small>{s.incompleteHint}</small>
                </div>
                <label className="select-wrap">
                  <select
                    value={draftSettings.incompleteRoute}
                    onChange={(event) =>
                      updateSetting(
                        "incompleteRoute",
                        event.target.value as ShipmentDataSettings["incompleteRoute"],
                      )
                    }
                  >
                    <option value="warehouse_and_queue">{s.warehouseQueue}</option>
                    <option value="complete_before_warehouse">
                      {s.beforeWarehouse}
                    </option>
                  </select>
                  <ChevronDown size={15} />
                </label>
              </article>
              <button
                className="workflow-toggle-card"
                type="button"
                role="switch"
                aria-checked={draftSettings.phoneLookupEnabled}
                onClick={() =>
                  updateSetting(
                    "phoneLookupEnabled",
                    !draftSettings.phoneLookupEnabled,
                  )
                }
              >
                <span className="workflow-policy-icon workflow-policy-icon--green">
                  <Search size={17} />
                </span>
                <span>
                  <strong>{s.phoneLookupTitle}</strong>
                  <small>{s.phoneLookupHint}</small>
                </span>
                <i className={draftSettings.phoneLookupEnabled ? "switch switch--on" : "switch"}>
                  <b />
                </i>
              </button>
              <button
                className="workflow-toggle-card"
                type="button"
                role="switch"
                aria-checked={draftSettings.shippingPayerOverride}
                onClick={() =>
                  updateSetting(
                    "shippingPayerOverride",
                    !draftSettings.shippingPayerOverride,
                  )
                }
              >
                <span className="workflow-policy-icon workflow-policy-icon--blue">
                  <HandCoins size={17} />
                </span>
                <span>
                  <strong>{s.payerOverrideTitle}</strong>
                  <small>{s.payerOverrideHint}</small>
                </span>
                <i className={draftSettings.shippingPayerOverride ? "switch switch--on" : "switch"}>
                  <b />
                </i>
              </button>
              <button
                className="workflow-toggle-card"
                type="button"
                role="switch"
                aria-checked={draftSettings.trustsEnabled}
                onClick={() =>
                  updateSetting("trustsEnabled", !draftSettings.trustsEnabled)
                }
              >
                <span className="workflow-policy-icon workflow-policy-icon--orange">
                  <PackagePlus size={17} />
                </span>
                <span>
                  <strong>{s.trustsTitle}</strong>
                  <small>{s.trustsHint}</small>
                </span>
                <i className={draftSettings.trustsEnabled ? "switch switch--on" : "switch"}>
                  <b />
                </i>
              </button>
              <article className="excel-safety-card">
                <span className="workflow-policy-icon workflow-policy-icon--green">
                  <ShieldCheck size={17} />
                </span>
                <div>
                  <strong>{s.excelTitle}</strong>
                  <small>{s.excelHint}</small>
                </div>
                <em>{s.excelMode}</em>
              </article>
            </div>
          </section>

          <section className="shipment-fields-panel">
            <div className="shipment-fields-panel__heading">
              <div>
                <strong>{s.fieldsTitle}</strong>
                <small>{s.fieldsSubtitle}</small>
              </div>
              <div>
                {modeOptions.map((mode) => (
                  <span className={`field-mode-legend field-mode-legend--${mode.value}`} key={mode.value}>
                    {mode.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="shipment-fields-toolbar">
              <label className="shipment-search">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={s.search}
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")} aria-label={t.clear}>
                    <X size={16} />
                  </button>
                )}
              </label>
              <label className="select-wrap status-filter">
                <select
                  value={groupFilter}
                  onChange={(event) => setGroupFilter(event.target.value)}
                >
                  <option value="all">{s.allGroups}</option>
                  <option value="recipient">{s.recipient}</option>
                  <option value="address">{s.address}</option>
                  <option value="shipment">{s.shipment}</option>
                  <option value="financial">{s.financial}</option>
                  <option value="sender">{s.sender}</option>
                </select>
                <ChevronDown size={15} />
              </label>
            </div>

            <div className="shipment-fields-table">
              <div className="shipment-fields-table__head">
                <span>{s.field}</span>
                <span>{s.group}</span>
                <span>{s.behavior}</span>
                <span>{s.excel}</span>
                <span />
              </div>
              <div className="shipment-fields-table__body">
                {filteredFields.map((field) => (
                  <article className="shipment-field-row" key={field.id}>
                    <div className="shipment-field-identity">
                      <span>
                        {field.custom ? <Plus size={15} /> : <ClipboardCheck size={15} />}
                      </span>
                      <span>
                        <strong>{field.name[lang]}</strong>
                        <small>{field.description[lang]}</small>
                        <em>{field.custom ? s.custom : s.system}</em>
                      </span>
                    </div>
                    <div className="shipment-field-group">
                      <strong>{groupLabel(field.group)}</strong>
                      <small dir="ltr">{field.code}</small>
                    </div>
                    <div className="field-mode-selector">
                      {modeOptions.map((mode) => (
                        <button
                          className={
                            field.mode === mode.value
                              ? `field-mode-button field-mode-button--active field-mode-button--${mode.value}`
                              : "field-mode-button"
                          }
                          type="button"
                          key={mode.value}
                          onClick={() => setFieldMode(field.id, mode.value)}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                    <button
                      className="field-excel-toggle"
                      type="button"
                      role="switch"
                      aria-checked={field.inExcel}
                      onClick={() => toggleExcel(field.id)}
                    >
                      <i className={field.inExcel ? "switch switch--on" : "switch"}>
                        <b />
                      </i>
                      <small>{field.inExcel ? s.included : s.excluded}</small>
                    </button>
                    <button
                      className="status-edit-button"
                      type="button"
                      aria-label={s.editorTitle}
                      title={s.editorTitle}
                      onClick={() => {
                        setIsNew(false);
                        setEditing(field);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                  </article>
                ))}
                {filteredFields.length === 0 && (
                  <div className="status-empty">
                    <Search size={22} />
                    <span>{s.noResults}</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      {editing && (
        <ShipmentFieldEditor
          key={editing.id}
          field={editing}
          isNew={isNew}
          lang={lang}
          onClose={() => {
            setEditing(null);
            setIsNew(false);
          }}
          onSave={saveField}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

type ShipmentEntryDraft = {
  phone: string;
  recipientName: string;
  secondaryPhone: string;
  governorateId: string;
  areaId: string;
  address: string;
  senderReference: string;
  pieces: string;
  contents: string;
  shipmentPrice: string;
  shippingPayer: "recipient" | "sender";
  deliveryDate: string;
  notes: string;
  confirmation: "confirmed" | "no_answer" | "later" | "not_recorded";
  customValues: Record<string, string>;
};

type PreparedShipment = ShipmentEntryDraft & {
  localId: string;
  shippingFee: number;
  incompleteFields: string[];
};

function makeShipmentEntryDraft(
  shippingPayer: "recipient" | "sender",
): ShipmentEntryDraft {
  return {
    phone: "",
    recipientName: "",
    secondaryPhone: "",
    governorateId: "",
    areaId: "",
    address: "",
    senderReference: "",
    pieces: "1",
    contents: "",
    shipmentPrice: "",
    shippingPayer,
    deliveryDate: "",
    notes: "",
    confirmation: "not_recorded",
    customValues: {},
  };
}

type ConfirmationFilter =
  | "all"
  | "pending"
  | "confirmed"
  | "no_answer"
  | "later";

const assignmentCourierProfiles = availableCouriers.map((courier, index) => ({
  courier,
  phone: [
    "0100 842 1975",
    "0111 304 8821",
    "0122 507 6140",
    "0109 118 3302",
    "0112 670 9415",
    "0155 204 7811",
  ][index],
  vehicle:
    index === 2
      ? ({ ar: "سيارة", en: "Car" } as Localized)
      : index === 4
        ? ({ ar: "فان", en: "Van" } as Localized)
        : ({ ar: "دراجة نارية", en: "Motorbike" } as Localized),
  code: `CR-${String(2001 + index)}`,
}));

function CourierShipmentsScreen({
  lang,
  theme,
  shipmentRecords,
  statuses,
  onShipmentsChange,
  onLang,
  onTheme,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  shipmentRecords: Shipment[];
  statuses: StatusPolicy[];
  onShipmentsChange: (records: Shipment[]) => void;
  onLang: () => void;
  onTheme: () => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const initialCourier =
    assignmentCourierProfiles.find((profile) =>
      shipmentRecords.some(
        (shipment) =>
          shipment.custodyType === "courier" &&
          shipment.courier?.en === profile.courier.en,
      ),
    ) ?? assignmentCourierProfiles[0];
  const [courierKey, setCourierKey] = useState(initialCourier.courier.en);
  const firstShipment =
    shipmentRecords.find(
      (shipment) =>
        shipment.custodyType === "courier" &&
        shipment.courier?.en === initialCourier.courier.en,
    ) ?? null;
  const [selectedId, setSelectedId] = useState(firstShipment?.id ?? "");
  const [search, setSearch] = useState("");
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [collectedAmount, setCollectedAmount] = useState("");
  const [deliveredPieces, setDeliveredPieces] = useState("");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const selectedCourier =
    assignmentCourierProfiles.find(
      (profile) => profile.courier.en === courierKey,
    ) ?? assignmentCourierProfiles[0];
  const courierShipments = shipmentRecords.filter(
    (shipment) =>
      shipment.custodyType === "courier" &&
      shipment.courier?.en === selectedCourier.courier.en,
  );
  const normalized = search.trim().toLowerCase();
  const visibleShipments = courierShipments.filter(
    (shipment) =>
      !normalized ||
      [
        shipment.id,
        shipment.reference,
        shipment.phone,
        shipment.recipient.ar,
        shipment.recipient.en,
        shipment.sender.ar,
        shipment.sender.en,
        shipment.area.ar,
        shipment.area.en,
      ].some((value) => value.toLowerCase().includes(normalized)),
  );
  const selectedShipment =
    courierShipments.find((shipment) => shipment.id === selectedId) ??
    courierShipments[0] ??
    null;
  const courierStatuses = statuses.filter(
    (status) =>
      status.state === "published" &&
      (status.executors.en.includes("Courier") ||
        status.executors.ar.includes("المندوب")),
  );
  const selectedStatus =
    courierStatuses.find((status) => status.id === selectedStatusId) ?? null;
  const money = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  });
  const totalCollection = courierShipments.reduce(
    (sum, shipment) =>
      sum +
      shipment.amount +
      (shipment.shippingPayer === "recipient" ? shipment.shippingFee : 0),
    0,
  );
  const totalPieces = courierShipments.reduce(
    (sum, shipment) => sum + shipment.pieces,
    0,
  );
  const uniqueAreas = new Set(
    courierShipments.map((shipment) => shipment.area.en),
  ).size;

  function statusNeeds(fieldName: string) {
    return Boolean(
      selectedStatus?.requiredFields.some((field) => field.en === fieldName),
    );
  }

  function chooseCourier(nextKey: string) {
    const nextShipment = shipmentRecords.find(
      (shipment) =>
        shipment.custodyType === "courier" &&
        shipment.courier?.en === nextKey,
    );
    setCourierKey(nextKey);
    setSelectedId(nextShipment?.id ?? "");
    setSearch("");
    resetStatusForm();
  }

  function chooseShipment(id: string) {
    setSelectedId(id);
    resetStatusForm();
  }

  function resetStatusForm() {
    setSelectedStatusId("");
    setCollectedAmount("");
    setDeliveredPieces("");
    setReason("");
    setNote("");
    setNextDate("");
    setError("");
  }

  function chooseStatus(status: StatusPolicy) {
    if (!selectedShipment) return;
    const total =
      selectedShipment.amount +
      (selectedShipment.shippingPayer === "recipient"
        ? selectedShipment.shippingFee
        : 0);
    setSelectedStatusId(status.id);
    setCollectedAmount(
      status.requiredFields.some((field) => field.en === "Collected amount")
        ? String(total)
        : "",
    );
    setDeliveredPieces(
      status.pieceEffect.en === "All pieces delivered"
        ? String(selectedShipment.pieces)
        : status.pieceEffect.en === "All pieces returned"
          ? "0"
          : "",
    );
    setReason("");
    setNote("");
    setNextDate("");
    setError("");
  }

  function saveStatus() {
    if (!selectedShipment || !selectedStatus) return;
    const missing: string[] = [];
    if (statusNeeds("Collected amount") && !collectedAmount.trim()) {
      missing.push(lang === "ar" ? "المبلغ المحصل" : "Collected amount");
    }
    if (statusNeeds("Delivered pieces") && deliveredPieces === "") {
      missing.push(lang === "ar" ? "عدد القطع المسلمة" : "Delivered pieces");
    }
    if (statusNeeds("Reason") && !reason.trim()) {
      missing.push(lang === "ar" ? "سبب الحالة" : "Status reason");
    }
    if (statusNeeds("Note") && !note.trim()) {
      missing.push(lang === "ar" ? "الملاحظة" : "Note");
    }
    if (statusNeeds("New date") && !nextDate) {
      missing.push(lang === "ar" ? "الموعد الجديد" : "New date");
    }
    const delivered = deliveredPieces === "" ? null : Number(deliveredPieces);
    if (
      delivered !== null &&
      (delivered < 0 || delivered > selectedShipment.pieces)
    ) {
      setError(
        lang === "ar"
          ? `عدد القطع المسلمة يجب أن يكون من 0 إلى ${selectedShipment.pieces}`
          : `Delivered pieces must be between 0 and ${selectedShipment.pieces}`,
      );
      return;
    }
    if (missing.length) {
      setError(
        lang === "ar"
          ? `استكمل أولًا: ${missing.join("، ")}`
          : `Complete first: ${missing.join(", ")}`,
      );
      return;
    }

    const now = new Date();
    const timestamp: Localized = {
      ar: now.toLocaleString("ar-EG", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      }),
      en: now.toLocaleString("en-EG", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    const deliveredSnapshot =
      selectedStatus.pieceEffect.en === "All pieces delivered"
        ? selectedShipment.pieces
        : selectedStatus.pieceEffect.en === "All pieces returned"
          ? 0
          : delivered;
    const returnedSnapshot =
      deliveredSnapshot === null
        ? null
        : Math.max(0, selectedShipment.pieces - deliveredSnapshot);
    const isFullyDelivered =
      selectedStatus.pieceEffect.en === "All pieces delivered";
    const nextCustody: Localized = isFullyDelivered
      ? { ar: "تم التسليم للمستلم", en: "Delivered to recipient" }
      : selectedStatus.assignmentEffect.en === "Return route"
        ? { ar: "مسار المرتجعات", en: "Return route" }
        : selectedStatus.assignmentEffect.en === "End + follow-up queue"
          ? { ar: "قائمة المتابعة", en: "Follow-up queue" }
          : { ar: "المخزن الرئيسي", en: "Main warehouse" };
    const tone: Shipment["statusTone"] =
      selectedStatus.color.toLowerCase() === "#07835a"
        ? "green"
        : selectedStatus.color.toLowerCase() === "#c43737"
          ? "red"
          : selectedStatus.color.toLowerCase() === "#e95f00"
            ? "orange"
            : "blue";
    const remaining = courierShipments.filter(
      (shipment) => shipment.id !== selectedShipment.id,
    );
    const nextRecords = shipmentRecords.map((shipment) => {
      if (shipment.id !== selectedShipment.id) return shipment;
      return {
        ...shipment,
        status: selectedStatus.name,
        statusPolicyId: selectedStatus.id,
        statusTone: tone,
        custody: nextCustody,
        custodyType: isFullyDelivered
          ? ("recipient" as const)
          : ("warehouse" as const),
        courier: null,
        deliveryDate: nextDate
          ? { ar: nextDate, en: nextDate }
          : shipment.deliveryDate,
        required: { ar: "لا يوجد", en: "None" },
        requiredType: "none" as const,
        lastEvent: {
          ar: `سجّل المندوب حالة «${selectedStatus.name.ar}» الآن`,
          en: `Courier recorded “${selectedStatus.name.en}” just now`,
        },
        statusHistory: [
          {
            id: `status-event-${Date.now()}`,
            statusPolicyId: selectedStatus.id,
            status: selectedStatus.name,
            color: selectedStatus.color,
            recordedBy: selectedCourier.courier,
            collectedAmount:
              collectedAmount === "" ? null : Number(collectedAmount),
            deliveredPieces: deliveredSnapshot,
            returnedPieces: returnedSnapshot,
            reason,
            note,
            nextDate,
            timestamp,
          },
          ...(shipment.statusHistory ?? []),
        ],
      };
    });
    onShipmentsChange(nextRecords);
    setSelectedId(remaining[0]?.id ?? "");
    resetStatusForm();
    setToast(
      lang === "ar"
        ? "تم تسجيل الحالة وخرجت الشحنة من حيازة المندوب"
        : "Status saved and shipment left courier custody",
    );
    window.setTimeout(() => setToast(""), 2800);
  }

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="courierShipments"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={lang === "ar" ? "فتح القائمة" : "Open navigation"}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon">
              <PackageCheck size={20} />
            </span>
            <span>
              <strong>
                {lang === "ar" ? "شحنات المناديب" : "Courier shipments"}
              </strong>
              <small>{lang === "ar" ? "الحيازة الحالية" : "Current custody"}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input
              placeholder={
                lang === "ar"
                  ? "ابحث أو انتقل بسرعة..."
                  : "Search or jump quickly..."
              }
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button className="square-button notification-button" type="button">
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content courier-shipments-page">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>
                  {lang === "ar" ? "شحنات المناديب" : "Courier shipments"}
                </h1>
                <span className="demo-chip">
                  {courierShipments.length}{" "}
                  {lang === "ar" ? "مع المندوب" : "with courier"}
                </span>
              </div>
              <p>
                {lang === "ar"
                  ? "كل ما لم يسجّل المندوب له حالة يظل ظاهرًا في حيازته دون ارتباط بيوم الإسناد."
                  : "Anything without a recorded result remains in courier custody, regardless of assignment day."}
              </p>
            </div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => onNavigate("assignment")}
            >
              <Truck size={17} />
              {lang === "ar" ? "فتح الإسناد" : "Open assignment"}
            </button>
          </div>

          <section className="courier-custody-truth">
            <ShieldCheck size={18} />
            <span>
              <strong>
                {lang === "ar"
                  ? "تسجيل أي حالة من المندوب ينهي حيازته للشحنة"
                  : "Any courier-recorded status ends courier custody"}
              </strong>
              <small>
                {lang === "ar"
                  ? "حتى التأجيل يخرج الشحنة من قائمته؛ أما عدم تسجيل حالة فيُبقيها معه كما هي."
                  : "Even deferral removes it from this list; no status means it stays with the courier."}
              </small>
            </span>
          </section>

          <section className="courier-custody-metrics">
            <article>
              <span><Boxes size={18} /></span>
              <div>
                <small>{lang === "ar" ? "الشحنات معه" : "Shipments held"}</small>
                <strong>{courierShipments.length}</strong>
              </div>
            </article>
            <article>
              <span><PackageCheck size={18} /></span>
              <div>
                <small>{lang === "ar" ? "إجمالي القطع" : "Total pieces"}</small>
                <strong>{totalPieces}</strong>
              </div>
            </article>
            <article>
              <span><HandCoins size={18} /></span>
              <div>
                <small>{lang === "ar" ? "التحصيل المتوقع" : "Expected collection"}</small>
                <strong>{money.format(totalCollection)}</strong>
              </div>
            </article>
            <article>
              <span><MapPin size={18} /></span>
              <div>
                <small>{lang === "ar" ? "مناطق التوزيع" : "Delivery areas"}</small>
                <strong>{uniqueAreas}</strong>
              </div>
            </article>
          </section>

          <div className="courier-custody-layout">
            <aside className="custody-courier-panel">
              <div className="assignment-panel-title">
                <span className="entry-step">1</span>
                <span>
                  <strong>{lang === "ar" ? "المندوب" : "Courier"}</strong>
                  <small>
                    {lang === "ar"
                      ? "اختر لعرض حيازته الحالية"
                      : "Choose to view current custody"}
                  </small>
                </span>
              </div>
              <div className="custody-courier-list">
                {assignmentCourierProfiles.map((profile) => {
                  const load = shipmentRecords.filter(
                    (shipment) =>
                      shipment.custodyType === "courier" &&
                      shipment.courier?.en === profile.courier.en,
                  ).length;
                  return (
                    <button
                      type="button"
                      key={profile.code}
                      className={
                        profile.courier.en === courierKey
                          ? "custody-courier custody-courier--selected"
                          : "custody-courier"
                      }
                      onClick={() => chooseCourier(profile.courier.en)}
                    >
                      <span className="mini-avatar">
                        {profile.courier[lang].slice(0, 1)}
                      </span>
                      <span>
                        <strong>{profile.courier[lang]}</strong>
                        <small>{profile.code} · {profile.vehicle[lang]}</small>
                      </span>
                      <span>
                        <strong>{load}</strong>
                        <small>{lang === "ar" ? "شحنة" : "shipments"}</small>
                      </span>
                      {profile.courier.en === courierKey && <Check size={15} />}
                    </button>
                  );
                })}
              </div>
              <div className="custody-courier-contact">
                <span className="mini-avatar">
                  {selectedCourier.courier[lang].slice(0, 1)}
                </span>
                <span>
                  <strong>{selectedCourier.courier[lang]}</strong>
                  <small dir="ltr">{selectedCourier.phone}</small>
                </span>
                <Phone size={17} />
              </div>
            </aside>

            <section className="custody-shipments-panel">
              <div className="custody-list-heading">
                <div>
                  <span className="entry-step">2</span>
                  <span>
                    <strong>
                      {lang === "ar" ? "الشحنات التي ما زالت معه" : "Still with courier"}
                    </strong>
                    <small>
                      {lang === "ar"
                        ? "من كل أيام الإسناد السابقة"
                        : "Across every assignment day"}
                    </small>
                  </span>
                </div>
                <span>
                  {visibleShipments.length} {lang === "ar" ? "شحنة" : "shipments"}
                </span>
              </div>
              <label className="custody-search">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "رقم الشحنة، الهاتف، المستلم، الراسل أو المنطقة..."
                      : "Shipment, phone, recipient, sender or area..."
                  }
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")}>
                    <X size={15} />
                  </button>
                )}
              </label>
              <div className="custody-shipment-list">
                {visibleShipments.map((shipment) => {
                  const total =
                    shipment.amount +
                    (shipment.shippingPayer === "recipient"
                      ? shipment.shippingFee
                      : 0);
                  return (
                    <button
                      type="button"
                      key={shipment.id}
                      className={
                        selectedShipment?.id === shipment.id
                          ? "custody-shipment custody-shipment--selected"
                          : "custody-shipment"
                      }
                      onClick={() => chooseShipment(shipment.id)}
                    >
                      <span className="custody-shipment__id">
                        <strong>{shipment.id}</strong>
                        <small>{shipment.reference}</small>
                      </span>
                      <span className="custody-shipment__person">
                        <span className="mini-avatar">
                          {shipment.recipient[lang].slice(0, 1)}
                        </span>
                        <span>
                          <strong>{shipment.recipient[lang]}</strong>
                          <small dir="ltr">{shipment.phone}</small>
                        </span>
                      </span>
                      <span className="custody-shipment__route">
                        <strong>{shipment.area[lang]}</strong>
                        <small>{shipment.sender[lang]}</small>
                      </span>
                      <span className="custody-shipment__pieces">
                        <strong>{shipment.pieces}</strong>
                        <small>{lang === "ar" ? "قطعة" : "pieces"}</small>
                      </span>
                      <span className="custody-shipment__money">
                        <strong>{money.format(total)}</strong>
                        <small>{lang === "ar" ? "تحصيل" : "collection"}</small>
                      </span>
                      <span
                        className={`status-badge status-badge--${shipment.statusTone}`}
                      >
                        {shipment.status[lang]}
                      </span>
                      {lang === "ar" ? (
                        <ChevronLeft size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  );
                })}
                {visibleShipments.length === 0 && (
                  <div className="custody-empty">
                    <PackageCheck size={30} />
                    <strong>
                      {courierShipments.length
                        ? lang === "ar"
                          ? "لا توجد نتيجة تطابق البحث"
                          : "No shipment matches your search"
                        : lang === "ar"
                          ? "لا توجد شحنات في حيازة هذا المندوب"
                          : "This courier has no shipments in custody"}
                    </strong>
                    <small>
                      {lang === "ar"
                        ? "أي شحنات جديدة تُسلّم له من صفحة الإسناد ستظهر هنا فورًا."
                        : "Anything handed over through assignment appears here immediately."}
                    </small>
                  </div>
                )}
              </div>
            </section>

            <aside className="courier-status-panel">
              {selectedShipment ? (
                <>
                  <div className="courier-status-heading">
                    <div>
                      <span className="mini-avatar">
                        {selectedShipment.recipient[lang].slice(0, 1)}
                      </span>
                      <span>
                        <strong>{selectedShipment.recipient[lang]}</strong>
                        <small>
                          {selectedShipment.id} · {selectedShipment.sender[lang]}
                        </small>
                      </span>
                    </div>
                    <span
                      className={`status-badge status-badge--${selectedShipment.statusTone}`}
                    >
                      {selectedShipment.status[lang]}
                    </span>
                  </div>

                  <div className="courier-shipment-facts">
                    <span>
                      <Phone size={15} />
                      <b dir="ltr">{selectedShipment.phone}</b>
                    </span>
                    <span>
                      <MapPin size={15} />
                      <b>{selectedShipment.area[lang]}</b>
                    </span>
                    <span>
                      <Boxes size={15} />
                      <b>
                        {selectedShipment.pieces}{" "}
                        {lang === "ar" ? "قطعة" : "pieces"}
                      </b>
                    </span>
                    <span>
                      <HandCoins size={15} />
                      <b>
                        {money.format(
                          selectedShipment.amount +
                            (selectedShipment.shippingPayer === "recipient"
                              ? selectedShipment.shippingFee
                              : 0),
                        )}
                      </b>
                    </span>
                  </div>

                  <div className="courier-status-choice">
                    <div>
                      <strong>
                        {lang === "ar" ? "تسجيل حالة الشحنة" : "Record shipment status"}
                      </strong>
                      <small>
                        {lang === "ar"
                          ? "الحالات المسموحة للمندوب فقط"
                          : "Only statuses allowed for couriers"}
                      </small>
                    </div>
                    {courierStatuses.length ? (
                      <div className="courier-status-options">
                        {courierStatuses.map((status) => (
                          <button
                            type="button"
                            key={status.id}
                            className={
                              selectedStatusId === status.id ? "active" : ""
                            }
                            style={
                              {
                                "--policy-accent": status.color,
                              } as CSSProperties
                            }
                            onClick={() => chooseStatus(status)}
                          >
                            <i />
                            <span>
                              <strong>{status.name[lang]}</strong>
                              <small>{status.financialEffect[lang]}</small>
                            </span>
                            {selectedStatusId === status.id && <Check size={14} />}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="no-courier-statuses">
                        <CircleAlert size={18} />
                        <span>
                          <strong>
                            {lang === "ar"
                              ? "لا توجد حالات مسموحة للمندوب"
                              : "No courier-enabled statuses"}
                          </strong>
                          <button
                            type="button"
                            onClick={() => onNavigate("statuses")}
                          >
                            {lang === "ar"
                              ? "فتح حالات الشحنات"
                              : "Open shipment statuses"}
                          </button>
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedStatus && (
                    <div className="courier-status-fields">
                      <div className="status-effect-preview">
                        <GitBranch size={16} />
                        <span>
                          <strong>{selectedStatus.assignmentEffect[lang]}</strong>
                          <small>
                            {lang === "ar"
                              ? "بعد الحفظ ستخرج من حيازة المندوب"
                              : "It leaves courier custody after save"}
                          </small>
                        </span>
                      </div>
                      <div className="courier-dynamic-fields">
                        {statusNeeds("Collected amount") && (
                          <label>
                            <span>{lang === "ar" ? "المبلغ المحصل" : "Collected amount"} *</span>
                            <span className="courier-field-control">
                              <input
                                type="number"
                                min="0"
                                value={collectedAmount}
                                onChange={(event) =>
                                  setCollectedAmount(event.target.value)
                                }
                              />
                              <b>{lang === "ar" ? "ج.م" : "EGP"}</b>
                            </span>
                          </label>
                        )}
                        {statusNeeds("Delivered pieces") && (
                          <label>
                            <span>
                              {lang === "ar"
                                ? "عدد القطع المسلمة"
                                : "Delivered pieces"}{" "}
                              *
                            </span>
                            <span className="courier-field-control">
                              <input
                                type="number"
                                min="0"
                                max={selectedShipment.pieces}
                                value={deliveredPieces}
                                onChange={(event) =>
                                  setDeliveredPieces(event.target.value)
                                }
                              />
                              <b>
                                / {selectedShipment.pieces}{" "}
                                {lang === "ar" ? "قطعة" : "pcs"}
                              </b>
                            </span>
                            {deliveredPieces !== "" && (
                              <small>
                                {lang === "ar" ? "المرتجع تلقائيًا:" : "Auto return:"}{" "}
                                {Math.max(
                                  0,
                                  selectedShipment.pieces -
                                    Number(deliveredPieces || 0),
                                )}
                              </small>
                            )}
                          </label>
                        )}
                        {statusNeeds("Reason") && (
                          <label>
                            <span>{lang === "ar" ? "سبب الحالة" : "Status reason"} *</span>
                            <input
                              value={reason}
                              onChange={(event) => setReason(event.target.value)}
                              placeholder={
                                lang === "ar"
                                  ? "اكتب السبب..."
                                  : "Enter reason..."
                              }
                            />
                          </label>
                        )}
                        {statusNeeds("New date") && (
                          <label>
                            <span>{lang === "ar" ? "الموعد الجديد" : "New date"} *</span>
                            <input
                              type="datetime-local"
                              value={nextDate}
                              onChange={(event) => setNextDate(event.target.value)}
                            />
                          </label>
                        )}
                        {statusNeeds("Note") && (
                          <label className="courier-note-field">
                            <span>{lang === "ar" ? "ملاحظة" : "Note"} *</span>
                            <textarea
                              value={note}
                              onChange={(event) => setNote(event.target.value)}
                              placeholder={
                                lang === "ar"
                                  ? "تفاصيل الحالة..."
                                  : "Status details..."
                              }
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="courier-status-error" role="alert">
                      <CircleAlert size={16} />
                      {error}
                    </div>
                  )}

                  <div className="courier-status-actions">
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={resetStatusForm}
                    >
                      {lang === "ar" ? "إلغاء" : "Cancel"}
                    </button>
                    <button
                      className="primary-button"
                      type="button"
                      disabled={!selectedStatus}
                      onClick={saveStatus}
                    >
                      <Save size={17} />
                      {lang === "ar" ? "حفظ الحالة" : "Save status"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="courier-status-empty">
                  <Boxes size={29} />
                  <strong>
                    {lang === "ar"
                      ? "اختر شحنة لتسجيل حالتها"
                      : "Choose a shipment to record its status"}
                  </strong>
                  <small>
                    {lang === "ar"
                      ? "ستظهر بياناتها والحالات المسموحة هنا."
                      : "Its details and allowed statuses will appear here."}
                  </small>
                </div>
              )}
            </aside>
          </div>
        </main>
      </div>
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function AssignmentScreen({
  lang,
  theme,
  shipmentRecords,
  statuses,
  governorates,
  settings,
  onShipmentsChange,
  onLang,
  onTheme,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  shipmentRecords: Shipment[];
  statuses: StatusPolicy[];
  governorates: GovernorateRecord[];
  settings: ShipmentDataSettings;
  onShipmentsChange: (records: Shipment[]) => void;
  onLang: () => void;
  onTheme: () => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [courierKey, setCourierKey] = useState(availableCouriers[0].en);
  const [search, setSearch] = useState("");
  const [governorateFilter, setGovernorateFilter] = useState("");
  const [senderFilter, setSenderFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [lastAssigned, setLastAssigned] = useState(0);
  const [toast, setToast] = useState("");

  const selectedCourier =
    assignmentCourierProfiles.find(
      (profile) => profile.courier.en === courierKey,
    ) ?? assignmentCourierProfiles[0];
  const money = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  });
  const allAreas = governorates.flatMap((governorate) =>
    governorate.areas.map((area) => ({ ...area, governorate })),
  );
  const eligibleShipments = useMemo(
    () =>
      shipmentRecords.filter((shipment) => {
        if (shipment.custodyType !== "warehouse") return false;
        if (shipment.requiredType === "incomplete") return false;
        const area = allAreas.find(
          (record) =>
            record.name.ar === shipment.area.ar ||
            record.name.en === shipment.area.en,
        );
        if (!area || area.state !== "active" || !area.assignmentAllowed) {
          return false;
        }
        const matchingPolicy = statuses.find(
          (status) =>
            status.state === "published" &&
            (status.name.ar === shipment.status.ar ||
              status.name.en === shipment.status.en),
        );
        if (matchingPolicy && !matchingPolicy.appearsInAssignment) return false;
        if (
          settings.confirmationMode === "required_before_assignment" &&
          getShipmentConfirmationCode(shipment) !== "confirmed"
        ) {
          return false;
        }
        return true;
      }),
    [allAreas, settings.confirmationMode, shipmentRecords, statuses],
  );
  const normalized = search.trim().toLowerCase();
  const visibleShipments = eligibleShipments.filter((shipment) => {
    const matchesSearch =
      !normalized ||
      [
        shipment.id,
        shipment.reference,
        shipment.phone,
        shipment.recipient.ar,
        shipment.recipient.en,
        shipment.sender.ar,
        shipment.sender.en,
        shipment.area.ar,
        shipment.area.en,
      ].some((value) => value.toLowerCase().includes(normalized));
    const matchesGovernorate =
      !governorateFilter ||
      shipment.governorate.en === governorateFilter;
    const matchesSender = !senderFilter || shipment.sender.en === senderFilter;
    return matchesSearch && matchesGovernorate && matchesSender;
  });
  const selectedShipments = eligibleShipments.filter((shipment) =>
    selectedIds.includes(shipment.id),
  );
  const currentCourierShipments = shipmentRecords.filter(
    (shipment) =>
      shipment.custodyType === "courier" &&
      shipment.courier?.en === selectedCourier.courier.en,
  );
  const totalPieces = selectedShipments.reduce(
    (sum, shipment) => sum + shipment.pieces,
    0,
  );
  const totalCollection = selectedShipments.reduce(
    (sum, shipment) =>
      sum +
      shipment.amount +
      (shipment.shippingPayer === "recipient" ? shipment.shippingFee : 0),
    0,
  );
  const senderOptions = Array.from(
    new Map(
      eligibleShipments.map((shipment) => [shipment.sender.en, shipment.sender]),
    ).values(),
  );

  function toggleShipment(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((shipmentId) => shipmentId !== id)
        : [...current, id],
    );
    setLastAssigned(0);
  }

  function assignAndHandOver() {
    if (!selectedShipments.length) return;
    const assignedIds = new Set(selectedShipments.map((shipment) => shipment.id));
    const nextRecords = shipmentRecords.map((shipment) => {
      if (!assignedIds.has(shipment.id)) return shipment;
      const assignmentTask =
        shipment.required.ar.includes("مندوب") ||
        shipment.required.en.toLowerCase().includes("assign") ||
        shipment.required.en.toLowerCase().includes("courier");
      return {
        ...shipment,
        custody: { ar: "مع المندوب", en: "With courier" },
        custodyType: "courier" as const,
        courier: selectedCourier.courier,
        required: assignmentTask
          ? { ar: "لا يوجد", en: "None" }
          : shipment.required,
        requiredType: assignmentTask ? ("none" as const) : shipment.requiredType,
        lastEvent: {
          ar: `أُسندت وسُلّمت للمندوب ${selectedCourier.courier.ar} الآن`,
          en: `Assigned and handed to ${selectedCourier.courier.en} just now`,
        },
      };
    });
    const count = selectedShipments.length;
    onShipmentsChange(nextRecords);
    setSelectedIds([]);
    setLastAssigned(count);
    setToast(
      lang === "ar"
        ? `تم إسناد وتسليم ${count} شحنة للمندوب`
        : `${count} shipment(s) assigned and handed to courier`,
    );
    window.setTimeout(() => setToast(""), 2800);
  }

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="assignment"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={lang === "ar" ? "فتح القائمة" : "Open navigation"}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon">
              <Truck size={20} />
            </span>
            <span>
              <strong>
                {lang === "ar" ? "التوزيع والإسناد" : "Distribution & assignment"}
              </strong>
              <small>{lang === "ar" ? "الفرع الرئيسي" : "Main branch"}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input
              placeholder={
                lang === "ar"
                  ? "ابحث أو انتقل بسرعة..."
                  : "Search or jump quickly..."
              }
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button className="square-button notification-button" type="button">
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content assignment-page">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>
                  {lang === "ar" ? "التوزيع والإسناد" : "Distribution & assignment"}
                </h1>
                <span className="demo-chip">
                  {eligibleShipments.length}{" "}
                  {lang === "ar" ? "شحنة متاحة" : "available"}
                </span>
              </div>
              <p>
                {lang === "ar"
                  ? "اختر المندوب والشحنات التي ستُسلّم له فعليًا في نفس اللحظة."
                  : "Choose the courier and shipments physically handed over now."}
              </p>
            </div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => onNavigate("statuses")}
            >
              <SlidersHorizontal size={17} />
              {lang === "ar" ? "تحكم ظهور الحالات" : "Status visibility"}
            </button>
          </div>

          <section className="assignment-truth">
            <ShieldCheck size={18} />
            <span>
              <strong>
                {lang === "ar"
                  ? "الإسناد هنا يعني أن الطرود أصبحت مع المندوب فعليًا"
                  : "Assignment here means the parcels are physically with the courier"}
              </strong>
              <small>
                {lang === "ar"
                  ? "لا توجد خطوة استلام إضافية؛ التنفيذ يغيّر الحيازة ويسجل الحدث فورًا."
                  : "There is no extra acceptance step; custody and the event update immediately."}
              </small>
            </span>
          </section>

          <div className="assignment-layout">
            <aside className="courier-selection-panel">
              <div className="assignment-panel-title">
                <span className="entry-step">1</span>
                <span>
                  <strong>{lang === "ar" ? "اختر المندوب" : "Choose courier"}</strong>
                  <small>
                    {lang === "ar"
                      ? "الشحنات الحالية تظل ظاهرة في عهدته"
                      : "Existing custody remains visible"}
                  </small>
                </span>
              </div>
              <div className="courier-assignment-list">
                {assignmentCourierProfiles.map((profile) => {
                  const load = shipmentRecords.filter(
                    (shipment) =>
                      shipment.custodyType === "courier" &&
                      shipment.courier?.en === profile.courier.en,
                  ).length;
                  const selected = profile.courier.en === courierKey;
                  return (
                    <button
                      type="button"
                      key={profile.code}
                      className={selected ? "courier-choice courier-choice--selected" : "courier-choice"}
                      onClick={() => {
                        setCourierKey(profile.courier.en);
                        setLastAssigned(0);
                      }}
                    >
                      <span className="mini-avatar">
                        {profile.courier[lang].slice(0, 1)}
                      </span>
                      <span>
                        <strong>{profile.courier[lang]}</strong>
                        <small>
                          {profile.code} · {profile.vehicle[lang]}
                        </small>
                      </span>
                      <span className="courier-load">
                        <strong>{load}</strong>
                        <small>{lang === "ar" ? "معه الآن" : "with courier"}</small>
                      </span>
                      {selected && <Check size={16} />}
                    </button>
                  );
                })}
              </div>
              <div className="selected-courier-summary">
                <div>
                  <span className="mini-avatar">
                    {selectedCourier.courier[lang].slice(0, 1)}
                  </span>
                  <span>
                    <strong>{selectedCourier.courier[lang]}</strong>
                    <small dir="ltr">{selectedCourier.phone}</small>
                  </span>
                </div>
                <span>
                  <small>{lang === "ar" ? "الحيازة الحالية" : "Current custody"}</small>
                  <strong>
                    {currentCourierShipments.length}{" "}
                    {lang === "ar" ? "شحنة" : "shipments"}
                  </strong>
                </span>
                <span>
                  <small>{lang === "ar" ? "بعد الإسناد" : "After assignment"}</small>
                  <strong>
                    {currentCourierShipments.length + selectedShipments.length}{" "}
                    {lang === "ar" ? "شحنة" : "shipments"}
                  </strong>
                </span>
              </div>
            </aside>

            <section className="assignment-shipments-panel">
              <div className="assignment-panel-title assignment-panel-title--shipments">
                <div>
                  <span className="entry-step">2</span>
                  <span>
                    <strong>
                      {lang === "ar"
                        ? "اختر الشحنات التي أمامك"
                        : "Choose the parcels in front of you"}
                    </strong>
                    <small>
                      {lang === "ar"
                        ? "لا تظهر هنا إلا الشحنات الجاهزة فعليًا"
                        : "Only actually eligible shipments appear here"}
                    </small>
                  </span>
                </div>
                <span className="assignment-selected-chip">
                  {selectedShipments.length}{" "}
                  {lang === "ar" ? "محددة" : "selected"}
                </span>
              </div>

              <div className="assignment-filters">
                <label className="assignment-search">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={
                      lang === "ar"
                        ? "رقم الشحنة، الهاتف، المستلم، الراسل أو المنطقة..."
                        : "Shipment, phone, recipient, sender or area..."
                    }
                  />
                  {search && (
                    <button type="button" onClick={() => setSearch("")}>
                      <X size={15} />
                    </button>
                  )}
                </label>
                <label className="entry-select">
                  <select
                    value={governorateFilter}
                    onChange={(event) => setGovernorateFilter(event.target.value)}
                  >
                    <option value="">
                      {lang === "ar" ? "كل المحافظات" : "All governorates"}
                    </option>
                    {governorates
                      .filter((governorate) => governorate.state === "active")
                      .map((governorate) => (
                        <option key={governorate.id} value={governorate.name.en}>
                          {governorate.name[lang]}
                        </option>
                      ))}
                  </select>
                  <ChevronDown size={15} />
                </label>
                <label className="entry-select">
                  <select
                    value={senderFilter}
                    onChange={(event) => setSenderFilter(event.target.value)}
                  >
                    <option value="">
                      {lang === "ar" ? "كل الرسل" : "All senders"}
                    </option>
                    {senderOptions.map((sender) => (
                      <option key={sender.en} value={sender.en}>
                        {sender[lang]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} />
                </label>
              </div>

              <div className="assignment-eligibility-note">
                <span>
                  <Warehouse size={15} />
                  {lang === "ar" ? "داخل المخزن" : "In warehouse"}
                </span>
                <span>
                  <ClipboardCheck size={15} />
                  {lang === "ar" ? "بيانات مكتملة" : "Complete data"}
                </span>
                <span>
                  <MapPin size={15} />
                  {lang === "ar" ? "منطقة تسمح بالإسناد" : "Assignable area"}
                </span>
                <span>
                  <SlidersHorizontal size={15} />
                  {lang === "ar" ? "حالة تسمح بالظهور" : "Status allows display"}
                </span>
              </div>

              <div className="assignment-shipment-list">
                {visibleShipments.map((shipment) => {
                  const checked = selectedIds.includes(shipment.id);
                  const total =
                    shipment.amount +
                    (shipment.shippingPayer === "recipient"
                      ? shipment.shippingFee
                      : 0);
                  return (
                    <label
                      className={
                        checked
                          ? "assignment-shipment assignment-shipment--selected"
                          : "assignment-shipment"
                      }
                      key={shipment.id}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleShipment(shipment.id)}
                      />
                      <span className="assignment-check">
                        {checked && <Check size={14} />}
                      </span>
                      <span className="assignment-shipment__id">
                        <strong>{shipment.id}</strong>
                        <small>{shipment.reference}</small>
                      </span>
                      <span className="assignment-shipment__recipient">
                        <span className="mini-avatar">
                          {shipment.recipient[lang].slice(0, 1)}
                        </span>
                        <span>
                          <strong>{shipment.recipient[lang]}</strong>
                          <small dir="ltr">{shipment.phone}</small>
                        </span>
                      </span>
                      <span className="assignment-shipment__route">
                        <strong>{shipment.area[lang]}</strong>
                        <small>{shipment.governorate[lang]}</small>
                      </span>
                      <span className="assignment-shipment__sender">
                        <strong>{shipment.sender[lang]}</strong>
                        <small>
                          {shipment.pieces} {lang === "ar" ? "قطعة" : "pcs"}
                        </small>
                      </span>
                      <span className="assignment-shipment__money">
                        <strong>{money.format(total)}</strong>
                        <small>{lang === "ar" ? "مطلوب تحصيله" : "To collect"}</small>
                      </span>
                      <span
                        className={`status-badge status-badge--${shipment.statusTone}`}
                      >
                        {shipment.status[lang]}
                      </span>
                    </label>
                  );
                })}
                {visibleShipments.length === 0 && (
                  <div className="assignment-empty">
                    <PackageCheck size={29} />
                    <strong>
                      {lang === "ar"
                        ? "لا توجد شحنات جاهزة تطابق البحث الحالي"
                        : "No eligible shipments match the current search"}
                    </strong>
                    <small>
                      {lang === "ar"
                        ? "الشحنات غير الصالحة لا تظهر هنا؛ ستجد الناقصة في قائمة استكمال البيانات."
                        : "Ineligible shipments stay out of this page; incomplete ones remain in data completion."}
                    </small>
                    {(search || governorateFilter || senderFilter) && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setGovernorateFilter("");
                          setSenderFilter("");
                        }}
                      >
                        {lang === "ar" ? "مسح الفلاتر" : "Clear filters"}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {lastAssigned > 0 && (
                <div className="assignment-success">
                  <PackageCheck size={20} />
                  <span>
                    <strong>
                      {lang === "ar"
                        ? `تم تسليم ${lastAssigned} شحنة للمندوب`
                        : `${lastAssigned} shipment(s) handed to courier`}
                    </strong>
                    <small>
                      {lang === "ar"
                        ? "اختفت من المتاح وأصبحت ظاهرة في حيازة المندوب."
                        : "They left the available list and now appear in courier custody."}
                    </small>
                  </span>
                </div>
              )}

              <div className="assignment-action-bar">
                <div>
                  <span>
                    <small>{lang === "ar" ? "الشحنات" : "Shipments"}</small>
                    <strong>{selectedShipments.length}</strong>
                  </span>
                  <span>
                    <small>{lang === "ar" ? "القطع" : "Pieces"}</small>
                    <strong>{totalPieces}</strong>
                  </span>
                  <span>
                    <small>{lang === "ar" ? "إجمالي التحصيل" : "Total collection"}</small>
                    <strong>{money.format(totalCollection)}</strong>
                  </span>
                  <span>
                    <small>{lang === "ar" ? "المندوب" : "Courier"}</small>
                    <strong>{selectedCourier.courier[lang]}</strong>
                  </span>
                </div>
                <button
                  className="primary-button"
                  type="button"
                  disabled={!selectedShipments.length}
                  onClick={assignAndHandOver}
                >
                  <Truck size={18} />
                  {lang === "ar"
                    ? "إسناد وتسليم للمندوب الآن"
                    : "Assign and hand over now"}
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function getShipmentConfirmationCode(
  shipment: Shipment,
): "confirmed" | "no_answer" | "later" | "not_recorded" {
  if (shipment.confirmationCode) return shipment.confirmationCode;
  if (
    shipment.confirmation.ar.includes("تم التأكيد") ||
    shipment.confirmation.en.toLowerCase().includes("confirmed")
  ) {
    return "confirmed";
  }
  if (
    shipment.confirmation.ar.includes("لم يرد") ||
    shipment.confirmation.en.toLowerCase().includes("no answer")
  ) {
    return "no_answer";
  }
  if (
    shipment.confirmation.ar.includes("تواصل") ||
    shipment.confirmation.en.toLowerCase().includes("later")
  ) {
    return "later";
  }
  return "not_recorded";
}

function ConfirmationScreen({
  lang,
  theme,
  shipmentRecords,
  settings,
  onShipmentsChange,
  onLang,
  onTheme,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  shipmentRecords: Shipment[];
  settings: ShipmentDataSettings;
  onShipmentsChange: (records: Shipment[]) => void;
  onLang: () => void;
  onTheme: () => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ConfirmationFilter>("pending");
  const initialShipment =
    shipmentRecords.find(
      (shipment) => getShipmentConfirmationCode(shipment) !== "confirmed",
    ) ?? shipmentRecords[0];
  const [selectedId, setSelectedId] = useState(initialShipment?.id ?? "");
  const [result, setResult] = useState<
    "confirmed" | "no_answer" | "later" | ""
  >("");
  const [note, setNote] = useState("");
  const [nextContact, setNextContact] = useState("");
  const [toast, setToast] = useState("");

  const selectedShipment =
    shipmentRecords.find((shipment) => shipment.id === selectedId) ??
    shipmentRecords[0];
  const normalized = search.trim().toLowerCase();
  const filteredRecords = shipmentRecords.filter((shipment) => {
    const code = getShipmentConfirmationCode(shipment);
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && code === "not_recorded") ||
      code === filter;
    const matchesSearch =
      !normalized ||
      [
        shipment.id,
        shipment.reference,
        shipment.phone,
        shipment.recipient.ar,
        shipment.recipient.en,
        shipment.sender.ar,
        shipment.sender.en,
      ].some((value) => value.toLowerCase().includes(normalized));
    return matchesFilter && matchesSearch;
  });
  const counts = shipmentRecords.reduce(
    (totals, shipment) => {
      const code = getShipmentConfirmationCode(shipment);
      totals[code] += 1;
      return totals;
    },
    { confirmed: 0, no_answer: 0, later: 0, not_recorded: 0 },
  );
  const money = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  });
  const filterItems: {
    id: ConfirmationFilter;
    label: Localized;
    count: number;
  }[] = [
    {
      id: "pending",
      label: { ar: "بانتظار التواصل", en: "Awaiting contact" },
      count: counts.not_recorded,
    },
    {
      id: "no_answer",
      label: { ar: "لم يرد", en: "No answer" },
      count: counts.no_answer,
    },
    {
      id: "later",
      label: { ar: "تواصل لاحقًا", en: "Contact later" },
      count: counts.later,
    },
    {
      id: "confirmed",
      label: { ar: "تم التأكيد", en: "Confirmed" },
      count: counts.confirmed,
    },
    {
      id: "all",
      label: { ar: "كل الشحنات", en: "All shipments" },
      count: shipmentRecords.length,
    },
  ];

  function confirmationLabel(code: ReturnType<typeof getShipmentConfirmationCode>) {
    if (code === "confirmed") {
      return lang === "ar" ? "تم التأكيد" : "Confirmed";
    }
    if (code === "no_answer") return lang === "ar" ? "لم يرد" : "No answer";
    if (code === "later") {
      return lang === "ar" ? "تواصل لاحقًا" : "Contact later";
    }
    return lang === "ar" ? "لم يُسجل" : "Not recorded";
  }

  function selectShipment(shipment: Shipment) {
    setSelectedId(shipment.id);
    const code = getShipmentConfirmationCode(shipment);
    setResult(code === "not_recorded" ? "" : code);
    setNote("");
    setNextContact("");
  }

  function saveConfirmation() {
    if (!selectedShipment || !result) return;
    if (result === "later" && !nextContact) {
      setToast(
        lang === "ar"
          ? "حدد موعد التواصل التالي أولًا"
          : "Set the next contact time first",
      );
      window.setTimeout(() => setToast(""), 2600);
      return;
    }
    const now = new Date();
    const timeAr = now.toLocaleString("ar-EG", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
    const timeEn = now.toLocaleString("en-EG", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
    const nextRecords = shipmentRecords.map((shipment) => {
      if (shipment.id !== selectedShipment.id) return shipment;
      const confirmed = result === "confirmed";
      const confirmation: Localized =
        result === "confirmed"
          ? { ar: "تم التأكيد", en: "Confirmed" }
          : result === "no_answer"
            ? { ar: "لم يرد", en: "No answer" }
            : { ar: "تواصل لاحقًا", en: "Contact later" };
      const confirmationWasRequired =
        shipment.required.ar.includes("تأكيد") ||
        shipment.required.en.toLowerCase().includes("confirm");
      const needsRequiredConfirmation =
        settings.confirmationMode === "required_before_assignment" && !confirmed;
      return {
        ...shipment,
        confirmation,
        confirmationCode: result,
        confirmationHistory: [
          {
            id: `confirmation-${Date.now()}`,
            result,
            note,
            nextContact,
            timestamp: { ar: timeAr, en: timeEn },
          },
          ...(shipment.confirmationHistory ?? []),
        ],
        required:
          confirmed && confirmationWasRequired
            ? { ar: "لا يوجد", en: "None" }
            : needsRequiredConfirmation && shipment.requiredType === "none"
              ? { ar: "تأكيد الطلب", en: "Confirm order" }
              : shipment.required,
        requiredType:
          confirmed && confirmationWasRequired
            ? "none"
            : needsRequiredConfirmation && shipment.requiredType === "none"
              ? "incomplete"
              : shipment.requiredType,
        lastEvent: {
          ar:
            result === "confirmed"
              ? "سُجّل تأكيد الطلب الآن"
              : result === "no_answer"
                ? "سُجّلت محاولة تواصل دون رد الآن"
                : "تم تحديد تواصل لاحق الآن",
          en:
            result === "confirmed"
              ? "Order confirmation recorded just now"
              : result === "no_answer"
                ? "No-answer attempt recorded just now"
                : "Follow-up contact scheduled just now",
        },
      };
    });
    onShipmentsChange(nextRecords);
    setToast(
      lang === "ar"
        ? "تم تسجيل نتيجة التواصل بدون تغيير حالة الشحنة"
        : "Contact result saved without changing shipment status",
    );
    setNote("");
    setNextContact("");
    window.setTimeout(() => setToast(""), 2800);
  }

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="confirmation"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={lang === "ar" ? "فتح القائمة" : "Open navigation"}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon">
              <ClipboardCheck size={20} />
            </span>
            <span>
              <strong>
                {lang === "ar" ? "التأكيد والمتابعة" : "Confirmation & follow-up"}
              </strong>
              <small>{lang === "ar" ? "الفرع الرئيسي" : "Main branch"}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input
              placeholder={
                lang === "ar"
                  ? "ابحث أو انتقل بسرعة..."
                  : "Search or jump quickly..."
              }
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button className="square-button notification-button" type="button">
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content confirmation-page">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>
                  {lang === "ar" ? "التأكيد والمتابعة" : "Confirmation & follow-up"}
                </h1>
                <span className="demo-chip">
                  {settings.confirmationMode === "required_before_assignment"
                    ? lang === "ar"
                      ? "مطلوب قبل الإسناد"
                      : "Required before assignment"
                    : settings.confirmationMode === "optional"
                      ? lang === "ar"
                        ? "اختياري"
                        : "Optional"
                      : lang === "ar"
                        ? "غير مستخدم"
                        : "Not used"}
                </span>
              </div>
              <p>
                {lang === "ar"
                  ? "سجّل نتيجة التواصل وجدول المحاولة التالية دون خلطها بحالة الشحنة."
                  : "Record contact results and next attempts without mixing them with shipment status."}
              </p>
            </div>
            <button
              className="secondary-button"
              type="button"
              onClick={() => onNavigate("shipmentPolicies")}
            >
              <SlidersHorizontal size={17} />
              {lang === "ar" ? "سياسة التأكيد" : "Confirmation policy"}
            </button>
          </div>

          {settings.confirmationMode === "off" ? (
            <section className="confirmation-disabled">
              <span>
                <ClipboardCheck size={29} />
              </span>
              <div>
                <h2>
                  {lang === "ar"
                    ? "التأكيد غير مستخدم في سياسة الشركة"
                    : "Confirmation is disabled by company policy"}
                </h2>
                <p>
                  {lang === "ar"
                    ? "الشحنات تستمر في التشغيل والإسناد دون انتظار اتصال مسبق. يمكنك تفعيله كاختياري أو إلزامي من السياسات."
                    : "Shipments continue to operations and assignment without a prior call. Enable it as optional or required from policies."}
                </p>
              </div>
              <button
                className="primary-button"
                type="button"
                onClick={() => onNavigate("shipmentPolicies")}
              >
                {lang === "ar" ? "فتح السياسات" : "Open policies"}
              </button>
            </section>
          ) : (
            <>
              <section className="confirmation-metrics">
                <article className="confirmation-metric confirmation-metric--attention">
                  <span><Phone size={18} /></span>
                  <div>
                    <small>{lang === "ar" ? "بانتظار التواصل" : "Awaiting contact"}</small>
                    <strong>{counts.not_recorded}</strong>
                  </div>
                  <em>{lang === "ar" ? "الأولوية الآن" : "Current priority"}</em>
                </article>
                <article className="confirmation-metric confirmation-metric--success">
                  <span><Check size={18} /></span>
                  <div>
                    <small>{lang === "ar" ? "تم التأكيد" : "Confirmed"}</small>
                    <strong>{counts.confirmed}</strong>
                  </div>
                  <em>{lang === "ar" ? "جاهزة وفق السياسة" : "Policy-ready"}</em>
                </article>
                <article className="confirmation-metric">
                  <span><CircleAlert size={18} /></span>
                  <div>
                    <small>{lang === "ar" ? "لم يرد" : "No answer"}</small>
                    <strong>{counts.no_answer}</strong>
                  </div>
                  <em>{lang === "ar" ? "تحتاج محاولة" : "Needs retry"}</em>
                </article>
                <article className="confirmation-metric">
                  <span><Clock3 size={18} /></span>
                  <div>
                    <small>{lang === "ar" ? "تواصل لاحقًا" : "Contact later"}</small>
                    <strong>{counts.later}</strong>
                  </div>
                  <em>{lang === "ar" ? "مواعيد متابعة" : "Scheduled follow-up"}</em>
                </article>
              </section>

              <section className="confirmation-principle">
                <ShieldCheck size={18} />
                <span>
                  <strong>
                    {lang === "ar"
                      ? "نتيجة التواصل ليست حالة شحنة"
                      : "A contact result is not a shipment status"}
                  </strong>
                  <small>
                    {lang === "ar"
                      ? "لن تتغير الحالة التشغيلية أو آثارها المالية عند تسجيل أي نتيجة هنا."
                      : "Operational status and financial effects never change when a result is recorded here."}
                  </small>
                </span>
              </section>

              <div className="confirmation-workspace">
                <section className="confirmation-list-card">
                  <div className="confirmation-list-tools">
                    <label>
                      <Search size={17} />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder={
                          lang === "ar"
                            ? "رقم الشحنة، الهاتف، المستلم أو الراسل..."
                            : "Shipment, phone, recipient or sender..."
                        }
                      />
                      {search && (
                        <button type="button" onClick={() => setSearch("")}>
                          <X size={15} />
                        </button>
                      )}
                    </label>
                    <span>
                      {filteredRecords.length} {lang === "ar" ? "شحنة" : "shipments"}
                    </span>
                  </div>
                  <div className="confirmation-tabs">
                    {filterItems.map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        className={filter === item.id ? "active" : ""}
                        onClick={() => setFilter(item.id)}
                      >
                        {item.label[lang]}
                        <span>{item.count}</span>
                      </button>
                    ))}
                  </div>
                  <div className="confirmation-records">
                    {filteredRecords.map((shipment) => {
                      const code = getShipmentConfirmationCode(shipment);
                      const total =
                        shipment.amount +
                        (shipment.shippingPayer === "recipient"
                          ? shipment.shippingFee
                          : 0);
                      return (
                        <button
                          className={`confirmation-record ${
                            selectedShipment?.id === shipment.id
                              ? "confirmation-record--selected"
                              : ""
                          }`}
                          type="button"
                          key={shipment.id}
                          onClick={() => selectShipment(shipment)}
                        >
                          <span className="confirmation-record__identity">
                            <strong>{shipment.id}</strong>
                            <small>{shipment.reference}</small>
                          </span>
                          <span className="confirmation-record__recipient">
                            <span className="mini-avatar">
                              {shipment.recipient[lang].slice(0, 1)}
                            </span>
                            <span>
                              <strong>{shipment.recipient[lang]}</strong>
                              <small dir="ltr">{shipment.phone}</small>
                            </span>
                          </span>
                          <span className="confirmation-record__route">
                            <strong>{shipment.area[lang]}</strong>
                            <small>{shipment.sender[lang]}</small>
                          </span>
                          <span className="confirmation-record__amount">
                            <strong>{money.format(total)}</strong>
                            <small>
                              {shipment.pieces} {lang === "ar" ? "قطعة" : "pcs"}
                            </small>
                          </span>
                          <span className={`confirmation-state confirmation-state--${code}`}>
                            {confirmationLabel(code)}
                          </span>
                          <span className="confirmation-record__attempts">
                            {(shipment.confirmationHistory ?? []).length}
                            <small>{lang === "ar" ? "محاولة" : "attempts"}</small>
                          </span>
                          {lang === "ar" ? (
                            <ChevronLeft size={17} />
                          ) : (
                            <ChevronRight size={17} />
                          )}
                        </button>
                      );
                    })}
                    {filteredRecords.length === 0 && (
                      <div className="confirmation-empty">
                        <Search size={25} />
                        <strong>
                          {lang === "ar"
                            ? "لا توجد شحنات تطابق العرض الحالي"
                            : "No shipments match this view"}
                        </strong>
                        <button
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setFilter("all");
                          }}
                        >
                          {lang === "ar" ? "عرض الكل" : "Show all"}
                        </button>
                      </div>
                    )}
                  </div>
                </section>

                {selectedShipment && (
                  <aside className="confirmation-action-card">
                    <div className="confirmation-action__heading">
                      <div>
                        <span className="mini-avatar">
                          {selectedShipment.recipient[lang].slice(0, 1)}
                        </span>
                        <span>
                          <strong>{selectedShipment.recipient[lang]}</strong>
                          <small>
                            {selectedShipment.id} · {selectedShipment.sender[lang]}
                          </small>
                        </span>
                      </div>
                      <span
                        className={`confirmation-state confirmation-state--${getShipmentConfirmationCode(
                          selectedShipment,
                        )}`}
                      >
                        {confirmationLabel(
                          getShipmentConfirmationCode(selectedShipment),
                        )}
                      </span>
                    </div>

                    <div className="confirmation-contact">
                      <a href={`tel:${selectedShipment.phone}`} dir="ltr">
                        <Phone size={17} />
                        {selectedShipment.phone}
                      </a>
                      <span>
                        <MapPin size={16} />
                        {selectedShipment.area[lang]}،{" "}
                        {selectedShipment.governorate[lang]}
                      </span>
                      <span>
                        <Boxes size={16} />
                        {selectedShipment.pieces}{" "}
                        {lang === "ar" ? "قطعة داخل الطرد" : "pieces in parcel"}
                      </span>
                    </div>

                    <div className="confirmation-status-lock">
                      <span
                        className={`status-badge status-badge--${selectedShipment.statusTone}`}
                      >
                        {selectedShipment.status[lang]}
                      </span>
                      <small>
                        <LockKeyhole size={13} />
                        {lang === "ar"
                          ? "الحالة لن تتغير من هذه الصفحة"
                          : "Status cannot change from this page"}
                      </small>
                    </div>

                    <div className="confirmation-result-section">
                      <strong>
                        {lang === "ar" ? "نتيجة التواصل" : "Contact result"}
                      </strong>
                      <div className="confirmation-result-options">
                        <button
                          type="button"
                          className={result === "confirmed" ? "active active--green" : ""}
                          onClick={() => setResult("confirmed")}
                        >
                          <Check size={18} />
                          <span>
                            <strong>{lang === "ar" ? "تم التأكيد" : "Confirmed"}</strong>
                            <small>
                              {lang === "ar"
                                ? "المستلم أكد الطلب"
                                : "Recipient confirmed order"}
                            </small>
                          </span>
                        </button>
                        <button
                          type="button"
                          className={result === "no_answer" ? "active active--orange" : ""}
                          onClick={() => setResult("no_answer")}
                        >
                          <Phone size={18} />
                          <span>
                            <strong>{lang === "ar" ? "لم يرد" : "No answer"}</strong>
                            <small>
                              {lang === "ar"
                                ? "تُسجل كمحاولة"
                                : "Recorded as an attempt"}
                            </small>
                          </span>
                        </button>
                        <button
                          type="button"
                          className={result === "later" ? "active active--blue" : ""}
                          onClick={() => setResult("later")}
                        >
                          <Clock3 size={18} />
                          <span>
                            <strong>
                              {lang === "ar" ? "تواصل لاحقًا" : "Contact later"}
                            </strong>
                            <small>
                              {lang === "ar"
                                ? "حدد الموعد التالي"
                                : "Schedule next contact"}
                            </small>
                          </span>
                        </button>
                      </div>
                    </div>

                    {result === "later" && (
                      <label className="confirmation-followup-field">
                        <span>
                          {lang === "ar"
                            ? "موعد التواصل التالي"
                            : "Next contact time"}
                          <em>*</em>
                        </span>
                        <span>
                          <CalendarDays size={16} />
                          <input
                            type="datetime-local"
                            value={nextContact}
                            onChange={(event) => setNextContact(event.target.value)}
                          />
                        </span>
                      </label>
                    )}

                    <label className="confirmation-note">
                      <span>{lang === "ar" ? "ملاحظة المحاولة" : "Attempt note"}</span>
                      <textarea
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        placeholder={
                          lang === "ar"
                            ? "اكتب المعلومة التي يحتاجها الموظف في المحاولة التالية..."
                            : "Add context for the next employee or attempt..."
                        }
                      />
                    </label>

                    <button
                      className="primary-button confirmation-save"
                      type="button"
                      disabled={!result}
                      onClick={saveConfirmation}
                    >
                      <Save size={17} />
                      {lang === "ar" ? "تسجيل نتيجة التواصل" : "Save contact result"}
                    </button>

                    <div className="confirmation-history">
                      <div>
                        <strong>{lang === "ar" ? "سجل المحاولات" : "Attempt history"}</strong>
                        <span>{(selectedShipment.confirmationHistory ?? []).length}</span>
                      </div>
                      {(selectedShipment.confirmationHistory ?? []).length ? (
                        (selectedShipment.confirmationHistory ?? [])
                          .slice(0, 4)
                          .map((event) => (
                            <article key={event.id}>
                              <i className={`history-dot history-dot--${event.result}`} />
                              <span>
                                <strong>
                                  {confirmationLabel(event.result)}
                                </strong>
                                <small>{event.timestamp[lang]}</small>
                                {event.note && <p>{event.note}</p>}
                                {event.nextContact && (
                                  <em>
                                    <CalendarDays size={12} />
                                    {event.nextContact.replace("T", " · ")}
                                  </em>
                                )}
                              </span>
                            </article>
                          ))
                      ) : (
                        <p className="confirmation-history__empty">
                          {lang === "ar"
                            ? "لا توجد محاولات مسجلة لهذه الشحنة."
                            : "No contact attempts recorded for this shipment."}
                        </p>
                      )}
                    </div>
                  </aside>
                )}
              </div>
            </>
          )}
        </main>
      </div>
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function AddShipmentScreen({
  lang,
  theme,
  fields,
  settings,
  governorates,
  statuses,
  priceLists,
  onSaveShipments,
  onLang,
  onTheme,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  fields: ShipmentFieldPolicy[];
  settings: ShipmentDataSettings;
  governorates: GovernorateRecord[];
  statuses: StatusPolicy[];
  priceLists: PriceListRecord[];
  onSaveShipments: (records: Shipment[]) => void;
  onLang: () => void;
  onTheme: () => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [entryMode, setEntryMode] = useState<"manual" | "excel">("manual");
  const [senderKey, setSenderKey] = useState(availableSenders[0].en);
  const initialPayer =
    senderEntryProfiles.find((profile) => profile.sender.en === senderKey)
      ?.shippingPayer ?? "recipient";
  const [draft, setDraft] = useState<ShipmentEntryDraft>(() =>
    makeShipmentEntryDraft(initialPayer),
  );
  const [prepared, setPrepared] = useState<PreparedShipment[]>([]);
  const [error, setError] = useState("");
  const [savedCount, setSavedCount] = useState(0);
  const [excelFile, setExcelFile] = useState("");
  const [excelChecked, setExcelChecked] = useState(false);

  const money = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  });
  const selectedSender =
    availableSenders.find((sender) => sender.en === senderKey) ??
    availableSenders[0];
  const senderProfile =
    senderEntryProfiles.find((profile) => profile.sender.en === senderKey) ??
    senderEntryProfiles[0];
  const senderPriceList =
    priceLists.find(
      (priceList) =>
        priceList.state === "active" &&
        priceList.senders.some(
          (sender) =>
            sender.en === selectedSender.en || sender.ar === selectedSender.ar,
        ),
    ) ??
    priceLists.find((priceList) => priceList.state === "active" && priceList.isDefault);
  const pricingStatus = statuses.find(
    (status) => status.state === "published" && status.appearsInPricing,
  );
  const shippingFee =
    draft.areaId && senderPriceList && pricingStatus
      ? senderPriceList.prices[draft.areaId]?.[pricingStatus.id] ?? 0
      : 0;
  const activeGovernorates = governorates.filter(
    (governorate) => governorate.state === "active",
  );
  const selectedGovernorate = governorates.find(
    (governorate) => governorate.id === draft.governorateId,
  );
  const availableAreas = (selectedGovernorate?.areas ?? []).filter(
    (area) => area.state === "active",
  );
  const matchedRecipient =
    settings.phoneLookupEnabled && draft.phone.length >= 6
      ? savedRecipients.find((recipient) => recipient.phone === draft.phone)
      : undefined;
  const activeFields = fields
    .filter((field) => field.mode !== "hidden")
    .sort((a, b) => a.order - b.order);
  const fieldMap = new Map(activeFields.map((field) => [field.code, field]));
  const customFields = activeFields.filter((field) => field.custom);
  const shipmentPrice = Number(draft.shipmentPrice) || 0;
  const totalDue =
    shipmentPrice + (draft.shippingPayer === "recipient" ? shippingFee : 0);
  const senderDue =
    shipmentPrice - (draft.shippingPayer === "sender" ? shippingFee : 0);

  function fieldVisible(code: string) {
    return fieldMap.has(code);
  }

  function fieldRequired(code: string) {
    return fieldMap.get(code)?.mode === "required_on_create";
  }

  function fieldLabel(code: string, fallback: Localized) {
    return fieldMap.get(code)?.name[lang] ?? fallback[lang];
  }

  function updateDraft<K extends keyof ShipmentEntryDraft>(
    key: K,
    value: ShipmentEntryDraft[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
    setError("");
    setSavedCount(0);
  }

  function chooseSender(nextKey: string) {
    const nextProfile =
      senderEntryProfiles.find((profile) => profile.sender.en === nextKey) ??
      senderEntryProfiles[0];
    setSenderKey(nextKey);
    setDraft((current) => ({
      ...current,
      shippingPayer: nextProfile.shippingPayer,
    }));
    setError("");
    setSavedCount(0);
  }

  function useSavedRecipient() {
    if (!matchedRecipient) return;
    const address = matchedRecipient.addresses[0];
    setDraft((current) => ({
      ...current,
      recipientName: matchedRecipient.name[lang],
      secondaryPhone: matchedRecipient.secondaryPhone,
      governorateId: address.governorateId,
      areaId: address.areaId,
      address: address.label[lang],
    }));
  }

  function chooseSavedAddress(index: number) {
    if (!matchedRecipient) return;
    const nextAddress = matchedRecipient.addresses[index];
    setDraft((current) => ({
      ...current,
      governorateId: nextAddress.governorateId,
      areaId: nextAddress.areaId,
      address: nextAddress.label[lang],
    }));
  }

  const codeValues: Record<string, string> = {
    RECIPIENT_PHONE: draft.phone,
    RECIPIENT_NAME: draft.recipientName,
    SECONDARY_PHONE: draft.secondaryPhone,
    GOVERNORATE: draft.governorateId,
    AREA: draft.areaId,
    DELIVERY_ADDRESS: draft.address,
    SENDER: senderKey,
    SENDER_REFERENCE: draft.senderReference,
    PIECE_COUNT: draft.pieces,
    CONTENTS: draft.contents,
    SHIPMENT_PRICE: draft.shipmentPrice,
    SHIPPING_FEE: String(shippingFee || ""),
    SHIPPING_PAYER: draft.shippingPayer,
    DELIVERY_DATE: draft.deliveryDate,
    NOTES: draft.notes,
  };

  function validateCurrent() {
    const missingCreate = activeFields.filter((field) => {
      if (field.mode !== "required_on_create") return false;
      const value = field.custom
        ? draft.customValues[field.id]
        : codeValues[field.code];
      return !String(value ?? "").trim();
    });
    if (missingCreate.length) {
      setError(
        lang === "ar"
          ? `استكمل أولًا: ${missingCreate.map((field) => field.name.ar).join("، ")}`
          : `Complete first: ${missingCreate.map((field) => field.name.en).join(", ")}`,
      );
      return null;
    }
    if (draft.areaId && !shippingFee) {
      setError(
        lang === "ar"
          ? "لا يوجد سعر مكتمل لهذه المنطقة داخل قائمة أسعار الراسل."
          : "This area has no completed price in the sender price list.",
      );
      return null;
    }
    const incompleteFields = activeFields
      .filter((field) => field.mode === "required_before_assignment")
      .filter((field) => {
        const value = field.custom
          ? draft.customValues[field.id]
          : codeValues[field.code];
        return !String(value ?? "").trim();
      })
      .map((field) => field.name[lang]);
    if (
      settings.confirmationMode === "required_before_assignment" &&
      draft.confirmation !== "confirmed"
    ) {
      incompleteFields.push(
        lang === "ar" ? "تأكيد الطلب مع المستلم" : "Recipient order confirmation",
      );
    }
    return {
      ...draft,
      localId: `prepared-${Date.now()}-${prepared.length}`,
      shippingFee,
      incompleteFields,
    };
  }

  function resetCurrent() {
    setDraft(makeShipmentEntryDraft(senderProfile.shippingPayer));
    setError("");
  }

  function addAnother() {
    const next = validateCurrent();
    if (!next) return;
    setPrepared((current) => [...current, next]);
    resetCurrent();
  }

  function draftHasContent() {
    return Boolean(
      draft.phone ||
        draft.recipientName ||
        draft.areaId ||
        draft.address ||
        draft.shipmentPrice ||
        draft.senderReference,
    );
  }

  function savePrepared() {
    let allPrepared = prepared;
    if (draftHasContent() || prepared.length === 0) {
      const current = validateCurrent();
      if (!current) return;
      allPrepared = [...prepared, current];
    }
    if (!allPrepared.length) return;

    const now = Date.now();
    const records: Shipment[] = allPrepared.map((item, index) => {
      const governorate = governorates.find(
        (record) => record.id === item.governorateId,
      );
      const area = governorate?.areas.find((record) => record.id === item.areaId);
      const incomplete = item.incompleteFields.length > 0;
      const beforeWarehouse =
        incomplete && settings.incompleteRoute === "complete_before_warehouse";
      const confirmationText: Localized =
        item.confirmation === "confirmed"
          ? { ar: "تم التأكيد", en: "Confirmed" }
          : item.confirmation === "no_answer"
            ? { ar: "لم يرد", en: "No answer" }
            : item.confirmation === "later"
              ? { ar: "تواصل لاحقًا", en: "Contact later" }
              : { ar: "لم يُسجل", en: "Not recorded" };
      return {
        id: `TS-${String(now + index).slice(-6)}`,
        reference:
          item.senderReference ||
          `${selectedSender.en.slice(0, 2).toUpperCase()}-${String(now + index).slice(-4)}`,
        recipient: {
          ar: item.recipientName || "غير مكتمل",
          en: item.recipientName || "Incomplete",
        },
        phone: item.phone,
        sender: selectedSender,
        area: area?.name ?? { ar: "غير محددة", en: "Not selected" },
        governorate: governorate?.name ?? {
          ar: "غير محددة",
          en: "Not selected",
        },
        status: {
          ar: "لم تُسجّل حالة تشغيلية",
          en: "No operational status recorded",
        },
        statusTone: incomplete ? "red" : "blue",
        custody: beforeWarehouse
          ? { ar: "قائمة استكمال البيانات", en: "Data completion queue" }
          : { ar: "المخزن الرئيسي", en: "Main warehouse" },
        custodyType: "warehouse",
        courier: null,
        amount: Number(item.shipmentPrice) || 0,
        deliveryDate: item.deliveryDate
          ? { ar: item.deliveryDate, en: item.deliveryDate }
          : { ar: "غير محدد", en: "Not set" },
        required: incomplete
          ? {
              ar: `استكمال: ${item.incompleteFields.join("، ")}`,
              en: `Complete: ${item.incompleteFields.join(", ")}`,
            }
          : { ar: "لا يوجد", en: "None" },
        requiredType: incomplete ? "incomplete" : "none",
        lastEvent: {
          ar: "أضيفت الآن من التسجيل اليدوي",
          en: "Added just now through manual entry",
        },
        confirmation: confirmationText,
        confirmationCode: item.confirmation,
        confirmationHistory: [],
        pieces: Math.max(1, Number(item.pieces) || 1),
        shippingFee: item.shippingFee,
        shippingPayer: item.shippingPayer,
        address: {
          ar: item.address || "غير مكتمل",
          en: item.address || "Incomplete",
        },
      };
    });

    onSaveShipments(records);
    setPrepared([]);
    resetCurrent();
    setSavedCount(records.length);
  }

  const requiredMark = (code: string) =>
    fieldRequired(code) ? <em className="entry-required">*</em> : null;

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="shipments"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={lang === "ar" ? "فتح القائمة" : "Open navigation"}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon">
              <PackagePlus size={20} />
            </span>
            <span>
              <strong>
                {lang === "ar" ? "تسجيل الشحنات" : "Shipment intake"}
              </strong>
              <small>{lang === "ar" ? "الفرع الرئيسي" : "Main branch"}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input
              placeholder={
                lang === "ar"
                  ? "ابحث أو انتقل بسرعة..."
                  : "Search or jump quickly..."
              }
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button className="square-button notification-button" type="button">
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content shipment-entry-page">
          <div className="welcome-row page-heading-row">
            <div>
              <button
                className="entry-back"
                type="button"
                onClick={() => onNavigate("shipments")}
              >
                {lang === "ar" ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
                {lang === "ar" ? "العودة إلى الشحنات" : "Back to shipments"}
              </button>
              <div className="page-title-line">
                <h1>{lang === "ar" ? "إضافة الشحنات" : "Add shipments"}</h1>
                <span className="demo-chip">
                  {lang === "ar" ? "حسب سياسات الشركة" : "Policy-driven"}
                </span>
              </div>
              <p>
                {lang === "ar"
                  ? "سجّل شحنة واحدة أو جهّز مجموعة كاملة لنفس الراسل."
                  : "Register one shipment or prepare a complete batch for one sender."}
              </p>
            </div>
            <div className="entry-mode-switch">
              <button
                type="button"
                className={entryMode === "manual" ? "entry-mode--active" : ""}
                onClick={() => setEntryMode("manual")}
              >
                <PackagePlus size={17} />
                {lang === "ar" ? "تسجيل يدوي" : "Manual entry"}
              </button>
              <button
                type="button"
                className={entryMode === "excel" ? "entry-mode--active" : ""}
                onClick={() => setEntryMode("excel")}
              >
                <FileSpreadsheet size={17} />
                Excel
              </button>
            </div>
          </div>

          <section className="entry-sender-bar">
            <div>
              <span className="entry-step">1</span>
              <span>
                <strong>{lang === "ar" ? "الراسل" : "Sender"}</strong>
                <small>
                  {lang === "ar"
                    ? "يُحدد مرة واحدة لكل المجموعة"
                    : "Selected once for the whole batch"}
                </small>
              </span>
            </div>
            <label className="entry-select">
              <select value={senderKey} onChange={(event) => chooseSender(event.target.value)}>
                {availableSenders.map((sender) => (
                  <option key={sender.en} value={sender.en}>
                    {sender[lang]}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} />
            </label>
            <div className="entry-price-source">
              <HandCoins size={18} />
              <span>
                <small>{lang === "ar" ? "قائمة الأسعار" : "Price list"}</small>
                <strong>
                  {senderPriceList?.name[lang] ??
                    (lang === "ar" ? "غير مرتبطة" : "Not linked")}
                </strong>
              </span>
            </div>
            <div className="entry-payer-source">
              <small>{lang === "ar" ? "الافتراضي" : "Default payer"}</small>
              <strong>
                {senderProfile.shippingPayer === "recipient"
                  ? lang === "ar"
                    ? "الشحن على المستلم"
                    : "Recipient pays shipping"
                  : lang === "ar"
                    ? "الشحن على الراسل"
                    : "Sender pays shipping"}
              </strong>
            </div>
          </section>

          {entryMode === "manual" ? (
            <div className="shipment-entry-layout">
              <section className="entry-form-card">
                <div className="entry-card-heading">
                  <div>
                    <span className="entry-step">2</span>
                    <span>
                      <strong>
                        {lang === "ar" ? "بيانات الشحنة" : "Shipment details"}
                      </strong>
                      <small>
                        {lang === "ar"
                          ? "الحقول الظاهرة والمطلوبة تأتي من صفحة السياسات"
                          : "Visible and required fields follow your policies"}
                      </small>
                    </span>
                  </div>
                  <span className="entry-policy-chip">
                    <SlidersHorizontal size={15} />
                    {activeFields.length} {lang === "ar" ? "حقل مفعّل" : "active fields"}
                  </span>
                </div>

                <div className="entry-section entry-section--recipient">
                  <div className="entry-section-title">
                    <UserRound size={18} />
                    <strong>{lang === "ar" ? "المستلم" : "Recipient"}</strong>
                  </div>
                  <div className="entry-fields-grid">
                    {fieldVisible("RECIPIENT_PHONE") && (
                      <label className="entry-field entry-field--phone">
                        <span>
                          {fieldLabel("RECIPIENT_PHONE", {
                            ar: "رقم الهاتف الأساسي",
                            en: "Primary phone",
                          })}
                          {requiredMark("RECIPIENT_PHONE")}
                        </span>
                        <span className="entry-input">
                          <Phone size={17} />
                          <input
                            dir="ltr"
                            value={draft.phone}
                            onChange={(event) => updateDraft("phone", event.target.value)}
                            placeholder="0100 000 0000"
                          />
                        </span>
                        {settings.phoneLookupEnabled && (
                          <small>
                            {lang === "ar"
                              ? "ابحث بالهاتف لاستدعاء بيانات المستلم"
                              : "Phone lookup retrieves saved recipient data"}
                          </small>
                        )}
                      </label>
                    )}
                    {matchedRecipient && (
                      <button
                        className="recipient-match"
                        type="button"
                        onClick={useSavedRecipient}
                      >
                        <span className="mini-avatar">
                          {matchedRecipient.name[lang].slice(0, 1)}
                        </span>
                        <span>
                          <strong>{matchedRecipient.name[lang]}</strong>
                          <small>
                            {matchedRecipient.addresses.length}{" "}
                            {lang === "ar" ? "عنوان محفوظ" : "saved addresses"}
                          </small>
                        </span>
                        <span className="recipient-match__action">
                          <Check size={15} />
                          {lang === "ar" ? "استخدام البيانات" : "Use details"}
                        </span>
                      </button>
                    )}
                    {fieldVisible("RECIPIENT_NAME") && (
                      <label className="entry-field">
                        <span>
                          {fieldLabel("RECIPIENT_NAME", {
                            ar: "اسم المستلم",
                            en: "Recipient name",
                          })}
                          {requiredMark("RECIPIENT_NAME")}
                        </span>
                        <input
                          value={draft.recipientName}
                          onChange={(event) =>
                            updateDraft("recipientName", event.target.value)
                          }
                          placeholder={lang === "ar" ? "الاسم الكامل" : "Full name"}
                        />
                      </label>
                    )}
                    {fieldVisible("SECONDARY_PHONE") && (
                      <label className="entry-field">
                        <span>
                          {fieldLabel("SECONDARY_PHONE", {
                            ar: "رقم هاتف إضافي",
                            en: "Secondary phone",
                          })}
                          {requiredMark("SECONDARY_PHONE")}
                        </span>
                        <input
                          dir="ltr"
                          value={draft.secondaryPhone}
                          onChange={(event) =>
                            updateDraft("secondaryPhone", event.target.value)
                          }
                          placeholder="01-- --- ----"
                        />
                      </label>
                    )}
                  </div>
                  {matchedRecipient && matchedRecipient.addresses.length > 1 && (
                    <div className="saved-addresses">
                      <small>{lang === "ar" ? "العناوين المحفوظة:" : "Saved addresses:"}</small>
                      {matchedRecipient.addresses.map((address, index) => (
                        <button
                          type="button"
                          key={`${address.areaId}-${index}`}
                          onClick={() => chooseSavedAddress(index)}
                        >
                          <MapPin size={14} />
                          {address.label[lang]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="entry-section">
                  <div className="entry-section-title">
                    <MapPin size={18} />
                    <strong>
                      {lang === "ar" ? "عنوان التسليم والتغطية" : "Delivery address"}
                    </strong>
                  </div>
                  <div className="entry-fields-grid entry-fields-grid--three">
                    {fieldVisible("GOVERNORATE") && (
                      <label className="entry-field">
                        <span>
                          {fieldLabel("GOVERNORATE", {
                            ar: "المحافظة",
                            en: "Governorate",
                          })}
                          {requiredMark("GOVERNORATE")}
                        </span>
                        <span className="entry-select">
                          <select
                            value={draft.governorateId}
                            onChange={(event) =>
                              setDraft((current) => ({
                                ...current,
                                governorateId: event.target.value,
                                areaId: "",
                              }))
                            }
                          >
                            <option value="">
                              {lang === "ar" ? "اختر المحافظة" : "Select governorate"}
                            </option>
                            {activeGovernorates.map((governorate) => (
                              <option key={governorate.id} value={governorate.id}>
                                {governorate.name[lang]}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={15} />
                        </span>
                      </label>
                    )}
                    {fieldVisible("AREA") && (
                      <label className="entry-field">
                        <span>
                          {fieldLabel("AREA", { ar: "المنطقة", en: "Area" })}
                          {requiredMark("AREA")}
                        </span>
                        <span className="entry-select">
                          <select
                            value={draft.areaId}
                            disabled={!draft.governorateId}
                            onChange={(event) => updateDraft("areaId", event.target.value)}
                          >
                            <option value="">
                              {lang === "ar" ? "اختر المنطقة" : "Select area"}
                            </option>
                            {availableAreas.map((area) => (
                              <option key={area.id} value={area.id}>
                                {area.name[lang]}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={15} />
                        </span>
                      </label>
                    )}
                    {fieldVisible("DELIVERY_ADDRESS") && (
                      <label className="entry-field entry-field--wide">
                        <span>
                          {fieldLabel("DELIVERY_ADDRESS", {
                            ar: "العنوان التفصيلي",
                            en: "Detailed address",
                          })}
                          {requiredMark("DELIVERY_ADDRESS")}
                        </span>
                        <input
                          value={draft.address}
                          onChange={(event) => updateDraft("address", event.target.value)}
                          placeholder={
                            lang === "ar"
                              ? "الشارع، العقار، الدور، علامة مميزة..."
                              : "Street, building, floor, landmark..."
                          }
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="entry-section">
                  <div className="entry-section-title">
                    <Boxes size={18} />
                    <strong>{lang === "ar" ? "الطرد" : "Parcel"}</strong>
                  </div>
                  <div className="entry-fields-grid entry-fields-grid--three">
                    {fieldVisible("SENDER_REFERENCE") && (
                      <label className="entry-field">
                        <span>
                          {fieldLabel("SENDER_REFERENCE", {
                            ar: "مرجع الراسل",
                            en: "Sender reference",
                          })}
                          {requiredMark("SENDER_REFERENCE")}
                        </span>
                        <input
                          value={draft.senderReference}
                          onChange={(event) =>
                            updateDraft("senderReference", event.target.value)
                          }
                          placeholder="ORD-1024"
                        />
                      </label>
                    )}
                    {fieldVisible("PIECE_COUNT") && (
                      <label className="entry-field">
                        <span>
                          {fieldLabel("PIECE_COUNT", {
                            ar: "عدد القطع داخل الشحنة",
                            en: "Pieces in shipment",
                          })}
                          {requiredMark("PIECE_COUNT")}
                        </span>
                        <input
                          type="number"
                          min="1"
                          value={draft.pieces}
                          onChange={(event) => updateDraft("pieces", event.target.value)}
                        />
                      </label>
                    )}
                    {fieldVisible("DELIVERY_DATE") && (
                      <label className="entry-field">
                        <span>
                          {fieldLabel("DELIVERY_DATE", {
                            ar: "موعد التسليم المطلوب",
                            en: "Requested delivery date",
                          })}
                          {requiredMark("DELIVERY_DATE")}
                        </span>
                        <input
                          type="date"
                          value={draft.deliveryDate}
                          onChange={(event) =>
                            updateDraft("deliveryDate", event.target.value)
                          }
                        />
                      </label>
                    )}
                    {fieldVisible("CONTENTS") && (
                      <label className="entry-field">
                        <span>
                          {fieldLabel("CONTENTS", {
                            ar: "وصف المحتوى",
                            en: "Contents",
                          })}
                          {requiredMark("CONTENTS")}
                        </span>
                        <input
                          value={draft.contents}
                          onChange={(event) => updateDraft("contents", event.target.value)}
                          placeholder={lang === "ar" ? "مثال: ملابس" : "Example: Clothing"}
                        />
                      </label>
                    )}
                    {fieldVisible("NOTES") && (
                      <label className="entry-field entry-field--wide">
                        <span>
                          {fieldLabel("NOTES", {
                            ar: "ملاحظات الشحنة",
                            en: "Shipment notes",
                          })}
                          {requiredMark("NOTES")}
                        </span>
                        <input
                          value={draft.notes}
                          onChange={(event) => updateDraft("notes", event.target.value)}
                          placeholder={
                            lang === "ar"
                              ? "تعليمات أو معلومات إضافية..."
                              : "Extra instructions or information..."
                          }
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="entry-section entry-section--financial">
                  <div className="entry-section-title">
                    <HandCoins size={18} />
                    <strong>
                      {lang === "ar" ? "التحصيل ومصاريف الشحن" : "Collection & shipping"}
                    </strong>
                  </div>
                  <div className="entry-financial-layout">
                    {fieldVisible("SHIPMENT_PRICE") && (
                      <label className="entry-field entry-price-input">
                        <span>
                          {fieldLabel("SHIPMENT_PRICE", {
                            ar: "سعر الشحنة",
                            en: "Shipment price",
                          })}
                          {requiredMark("SHIPMENT_PRICE")}
                        </span>
                        <span className="entry-input">
                          <input
                            type="number"
                            min="0"
                            value={draft.shipmentPrice}
                            onChange={(event) =>
                              updateDraft("shipmentPrice", event.target.value)
                            }
                            placeholder="0"
                          />
                          <b>{lang === "ar" ? "ج.م" : "EGP"}</b>
                        </span>
                      </label>
                    )}
                    <div className="entry-shipping-fee">
                      <span>
                        <small>{lang === "ar" ? "مصاريف الشحن" : "Shipping fee"}</small>
                        <strong>{money.format(shippingFee)}</strong>
                      </span>
                      <small>
                        {draft.areaId
                          ? `${senderPriceList?.name[lang] ?? ""} · ${
                              pricingStatus?.name[lang] ?? ""
                            }`
                          : lang === "ar"
                            ? "تظهر بعد اختيار المنطقة"
                            : "Shown after area selection"}
                      </small>
                    </div>
                    <div className="entry-payer-control">
                      <span>
                        {fieldLabel("SHIPPING_PAYER", {
                          ar: "متحمّل مصاريف الشحن",
                          en: "Shipping payer",
                        })}
                      </span>
                      {settings.shippingPayerOverride ? (
                        <div>
                          <button
                            type="button"
                            className={
                              draft.shippingPayer === "recipient" ? "active" : ""
                            }
                            onClick={() => updateDraft("shippingPayer", "recipient")}
                          >
                            {lang === "ar" ? "المستلم" : "Recipient"}
                          </button>
                          <button
                            type="button"
                            className={draft.shippingPayer === "sender" ? "active" : ""}
                            onClick={() => updateDraft("shippingPayer", "sender")}
                          >
                            {lang === "ar" ? "الراسل" : "Sender"}
                          </button>
                        </div>
                      ) : (
                        <strong>
                          {draft.shippingPayer === "recipient"
                            ? lang === "ar"
                              ? "المستلم"
                              : "Recipient"
                            : lang === "ar"
                              ? "الراسل"
                              : "Sender"}
                        </strong>
                      )}
                    </div>
                  </div>
                  <div className="entry-money-summary">
                    <span>
                      <small>{lang === "ar" ? "سعر الشحنة" : "Shipment price"}</small>
                      <strong>{money.format(shipmentPrice)}</strong>
                    </span>
                    <i>+</i>
                    <span>
                      <small>{lang === "ar" ? "شحن على المستلم" : "Recipient shipping"}</small>
                      <strong>
                        {money.format(
                          draft.shippingPayer === "recipient" ? shippingFee : 0,
                        )}
                      </strong>
                    </span>
                    <i>=</i>
                    <span className="entry-money-summary__total">
                      <small>{lang === "ar" ? "المطلوب تحصيله" : "Total to collect"}</small>
                      <strong>{money.format(totalDue)}</strong>
                    </span>
                    <span>
                      <small>{lang === "ar" ? "مستحق الراسل" : "Sender due"}</small>
                      <strong>{money.format(senderDue)}</strong>
                    </span>
                  </div>
                </div>

                {settings.confirmationMode !== "off" && (
                  <div className="entry-section entry-confirmation">
                    <div className="entry-section-title">
                      <ClipboardCheck size={18} />
                      <span>
                        <strong>
                          {lang === "ar" ? "تأكيد الطلب" : "Order confirmation"}
                        </strong>
                        <small>
                          {settings.confirmationMode === "required_before_assignment"
                            ? lang === "ar"
                              ? "مطلوب قبل الإسناد"
                              : "Required before assignment"
                            : lang === "ar"
                              ? "اختياري"
                              : "Optional"}
                        </small>
                      </span>
                    </div>
                    <div className="entry-confirmation-options">
                      {(
                        [
                          ["not_recorded", "لم يُسجل", "Not recorded"],
                          ["confirmed", "تم التأكيد", "Confirmed"],
                          ["no_answer", "لم يرد", "No answer"],
                          ["later", "تواصل لاحقًا", "Contact later"],
                        ] as const
                      ).map(([value, ar, en]) => (
                        <button
                          type="button"
                          key={value}
                          className={draft.confirmation === value ? "active" : ""}
                          onClick={() => updateDraft("confirmation", value)}
                        >
                          {draft.confirmation === value && <Check size={14} />}
                          {lang === "ar" ? ar : en}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {customFields.length > 0 && (
                  <div className="entry-section">
                    <div className="entry-section-title">
                      <Settings2 size={18} />
                      <strong>{lang === "ar" ? "حقول الشركة" : "Company fields"}</strong>
                    </div>
                    <div className="entry-fields-grid">
                      {customFields.map((field) => (
                        <label className="entry-field" key={field.id}>
                          <span>
                            {field.name[lang]}
                            {field.mode === "required_on_create" && (
                              <em className="entry-required">*</em>
                            )}
                          </span>
                          <input
                            value={draft.customValues[field.id] ?? ""}
                            onChange={(event) =>
                              setDraft((current) => ({
                                ...current,
                                customValues: {
                                  ...current.customValues,
                                  [field.id]: event.target.value,
                                },
                              }))
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="entry-error" role="alert">
                    <CircleAlert size={17} />
                    {error}
                  </div>
                )}
                {savedCount > 0 && (
                  <div className="entry-success" role="status">
                    <PackageCheck size={18} />
                    <span>
                      <strong>
                        {lang === "ar"
                          ? `تم حفظ ${savedCount} شحنة`
                          : `${savedCount} shipment(s) saved`}
                      </strong>
                      <small>
                        {lang === "ar"
                          ? "ظهرت الشحنات الآن في القائمة العامة."
                          : "The shipments now appear in the general list."}
                      </small>
                    </span>
                    <button type="button" onClick={() => onNavigate("shipments")}>
                      {lang === "ar" ? "عرض الشحنات" : "View shipments"}
                    </button>
                  </div>
                )}

                <div className="entry-form-actions">
                  <button className="secondary-button" type="button" onClick={resetCurrent}>
                    {lang === "ar" ? "تفريغ الحقول" : "Clear fields"}
                  </button>
                  <button className="secondary-button" type="button" onClick={addAnother}>
                    <Plus size={17} />
                    {lang === "ar" ? "إضافة شحنة أخرى" : "Add another shipment"}
                  </button>
                  <button className="primary-button" type="button" onClick={savePrepared}>
                    <Save size={17} />
                    {prepared.length
                      ? lang === "ar"
                        ? `حفظ المجموعة (${prepared.length + (draftHasContent() ? 1 : 0)})`
                        : `Save batch (${prepared.length + (draftHasContent() ? 1 : 0)})`
                      : lang === "ar"
                        ? "حفظ الشحنة"
                        : "Save shipment"}
                  </button>
                </div>
              </section>

              <aside className="prepared-panel">
                <div className="prepared-panel__heading">
                  <div>
                    <span className="entry-step">3</span>
                    <span>
                      <strong>{lang === "ar" ? "المجموعة الحالية" : "Current batch"}</strong>
                      <small>
                        {lang === "ar"
                          ? "شحنات جاهزة للحفظ معًا"
                          : "Shipments ready to save together"}
                      </small>
                    </span>
                  </div>
                  <b>{prepared.length}</b>
                </div>
                {prepared.length ? (
                  <div className="prepared-list">
                    {prepared.map((item, index) => {
                      const area = governorates
                        .flatMap((governorate) => governorate.areas)
                        .find((record) => record.id === item.areaId);
                      return (
                        <article key={item.localId}>
                          <span className="prepared-index">{index + 1}</span>
                          <span>
                            <strong>{item.recipientName}</strong>
                            <small dir="ltr">{item.phone}</small>
                            <small>
                              {area?.name[lang] ?? (lang === "ar" ? "منطقة غير محددة" : "No area")}
                              {" · "}
                              {item.pieces} {lang === "ar" ? "قطعة" : "pcs"}
                            </small>
                          </span>
                          <span className="prepared-money">
                            <strong>
                              {money.format(
                                Number(item.shipmentPrice) +
                                  (item.shippingPayer === "recipient"
                                    ? item.shippingFee
                                    : 0),
                              )}
                            </strong>
                            {item.incompleteFields.length > 0 && (
                              <em>{lang === "ar" ? "تحتاج استكمال" : "Incomplete"}</em>
                            )}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setPrepared((current) =>
                                current.filter((record) => record.localId !== item.localId),
                              )
                            }
                            aria-label={lang === "ar" ? "حذف" : "Remove"}
                          >
                            <Trash2 size={15} />
                          </button>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="prepared-empty">
                    <Boxes size={27} />
                    <strong>
                      {lang === "ar" ? "لا توجد شحنات مجهزة بعد" : "No prepared shipments yet"}
                    </strong>
                    <small>
                      {lang === "ar"
                        ? "املأ البيانات ثم اختر «إضافة شحنة أخرى»."
                        : "Fill the form, then choose “Add another shipment”."}
                    </small>
                  </div>
                )}
                <div className="prepared-summary">
                  <span>
                    <small>{lang === "ar" ? "الراسل" : "Sender"}</small>
                    <strong>{selectedSender[lang]}</strong>
                  </span>
                  <span>
                    <small>{lang === "ar" ? "إجمالي التحصيل" : "Total collection"}</small>
                    <strong>
                      {money.format(
                        prepared.reduce(
                          (sum, item) =>
                            sum +
                            Number(item.shipmentPrice) +
                            (item.shippingPayer === "recipient"
                              ? item.shippingFee
                              : 0),
                          0,
                        ),
                      )}
                    </strong>
                  </span>
                </div>
              </aside>
            </div>
          ) : (
            <section className="excel-entry-card">
              <div className="excel-entry-hero">
                <span className="excel-entry-icon">
                  <FileSpreadsheet size={30} />
                </span>
                <div>
                  <h2>{lang === "ar" ? "استيراد شحنات Excel" : "Import Excel shipments"}</h2>
                  <p>
                    {lang === "ar"
                      ? "حمّل ملف الراسل، افحص كل الصفوف، ثم احفظ المجموعة كاملة."
                      : "Upload the sender file, validate every row, then save the whole batch."}
                  </p>
                </div>
                <span className="excel-safety-badge">
                  <ShieldCheck size={16} />
                  {lang === "ar" ? "الكل أو لا شيء" : "All or nothing"}
                </span>
              </div>
              <label className="excel-dropzone">
                <Upload size={27} />
                <strong>
                  {excelFile ||
                    (lang === "ar"
                      ? "اسحب ملف Excel هنا أو اضغط للاختيار"
                      : "Drop an Excel file here or click to browse")}
                </strong>
                <small>
                  {lang === "ar"
                    ? "XLSX أو XLS — لا يتم حفظ أي صف قبل نجاح الفحص كاملًا"
                    : "XLSX or XLS — no row is saved until the full file passes"}
                </small>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(event) => {
                    setExcelFile(event.target.files?.[0]?.name ?? "");
                    setExcelChecked(false);
                  }}
                />
              </label>
              <div className="excel-columns-preview">
                <div>
                  <strong>{lang === "ar" ? "أعمدة النموذج الحالي" : "Current template columns"}</strong>
                  <small>
                    {lang === "ar"
                      ? "تتغير تلقائيًا حسب سياسات بيانات الشحنات"
                      : "Automatically follows shipment data policies"}
                  </small>
                </div>
                <div>
                  {activeFields
                    .filter((field) => field.inExcel)
                    .map((field) => (
                      <span key={field.id}>
                        {field.name[lang]}
                        {field.mode === "required_on_create" && <i>*</i>}
                      </span>
                    ))}
                </div>
              </div>
              {excelChecked && (
                <div className="excel-validation-result">
                  <CircleAlert size={19} />
                  <span>
                    <strong>
                      {lang === "ar"
                        ? "الملف يحتاج تصحيح صف واحد"
                        : "One row needs correction"}
                    </strong>
                    <small>
                      {lang === "ar"
                        ? "الصف 4: رقم الهاتف الأساسي غير موجود. لم تُحفظ أي شحنة."
                        : "Row 4: primary phone is missing. No shipments were saved."}
                    </small>
                  </span>
                </div>
              )}
              <div className="excel-entry-actions">
                <button className="secondary-button" type="button">
                  <FileSpreadsheet size={17} />
                  {lang === "ar" ? "تنزيل النموذج" : "Download template"}
                </button>
                <button
                  className="primary-button"
                  type="button"
                  disabled={!excelFile}
                  onClick={() => setExcelChecked(true)}
                >
                  <ClipboardCheck size={17} />
                  {lang === "ar" ? "فحص الملف كاملًا" : "Validate full file"}
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function ShipmentsScreen({
  lang,
  theme,
  shipmentRecords,
  onLang,
  onTheme,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  shipmentRecords: Shipment[];
  onLang: () => void;
  onTheme: () => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const t = copy[lang];
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [scenario, setScenario] = useState<Scenario>("ready");
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [custodyFilter, setCustodyFilter] = useState("");
  const [toast, setToast] = useState("");

  const money = new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  });

  const filteredShipments = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return shipmentRecords.filter((shipment) => {
      const matchesSearch =
        !normalized ||
        [
          shipment.id,
          shipment.reference,
          shipment.phone,
          shipment.recipient.ar,
          shipment.recipient.en,
          shipment.sender.ar,
          shipment.sender.en,
        ].some((value) => value.toLowerCase().includes(normalized));
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "action" && shipment.requiredType === "attention") ||
        (activeTab === "warehouse" && shipment.custodyType === "warehouse") ||
        (activeTab === "courier" && shipment.custodyType === "courier") ||
        (activeTab === "incomplete" && shipment.requiredType === "incomplete");
      const matchesStatus =
        !statusFilter || shipment.statusTone === statusFilter;
      const matchesCustody =
        !custodyFilter || shipment.custodyType === custodyFilter;
      return matchesSearch && matchesTab && matchesStatus && matchesCustody;
    });
  }, [activeTab, custodyFilter, search, shipmentRecords, statusFilter]);

  const visibleShipments =
    scenario === "ready" ||
    scenario === "delayed" ||
    scenario === "conflict"
      ? filteredShipments
      : [];

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "all", label: t.all, count: shipmentRecords.length },
    {
      id: "action",
      label: t.needAction,
      count: shipmentRecords.filter((item) => item.requiredType === "attention").length,
    },
    {
      id: "warehouse",
      label: t.inWarehouse,
      count: shipmentRecords.filter((item) => item.custodyType === "warehouse").length,
    },
    {
      id: "courier",
      label: t.withCourier,
      count: shipmentRecords.filter((item) => item.custodyType === "courier").length,
    },
    {
      id: "incomplete",
      label: t.incomplete,
      count: shipmentRecords.filter((item) => item.requiredType === "incomplete").length,
    },
  ];

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("");
    setCustodyFilter("");
    setActiveTab("all");
    setScenario("ready");
  }

  return (
    <div className={`erp-shell ${collapsed ? "erp-shell--collapsed" : ""}`}>
      <Sidebar
        lang={lang}
        activeScreen="shipments"
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCollapse={() => setCollapsed((value) => !value)}
        onMobileClose={() => setMobileOpen(false)}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="erp-main">
        <header className="topbar">
          <div className="topbar__workspace">
            <button
              className="mobile-menu square-button"
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t.mobileNav}
            >
              <Menu size={20} />
            </button>
            <span className="workspace-icon">
              <Boxes size={20} />
            </span>
            <span>
              <strong>{t.workspace}</strong>
              <small>{t.branch}</small>
            </span>
          </div>
          <label className="command-search">
            <Search size={17} />
            <input placeholder={t.globalSearch} />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar__actions">
            <LanguageThemeControls
              lang={lang}
              theme={theme}
              onLang={onLang}
              onTheme={onTheme}
              subtle
            />
            <button
              className="square-button notification-button"
              type="button"
              aria-label={t.notifications}
            >
              <Bell size={19} />
              <i />
            </button>
            <button className="topbar-user" type="button">
              <span className="avatar">أح</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="page-content">
          <div className="welcome-row page-heading-row">
            <div>
              <div className="page-title-line">
                <h1>{t.pageTitle}</h1>
                <span className="demo-chip">{t.demoData}</span>
              </div>
              <p>{t.pageSubtitle}</p>
            </div>
            <div className="welcome-row__actions">
              <span className="updated-chip">
                <span />
                {t.updated}
              </span>
              <button
                className="primary-button"
                type="button"
                onClick={() => onNavigate("addShipment")}
              >
                <PackagePlus size={18} />
                {t.addShipment}
              </button>
            </div>
          </div>

          <section className="metrics-grid" aria-label={t.todayMovement}>
            <article className="metric-card metric-card--primary">
              <div className="metric-card__top">
                <span className="metric-icon">
                  <Boxes size={20} />
                </span>
                <small>{t.total}</small>
              </div>
              <div className="metric-card__value">
                <strong>2,486</strong>
                <span>{t.compared}</span>
              </div>
              <div className="mini-bars" aria-hidden="true">
                {[32, 48, 39, 65, 52, 73, 86, 68, 91, 78, 100, 88].map(
                  (height, index) => (
                    <i key={index} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-card__top">
                <span className="metric-icon metric-icon--orange">
                  <CircleAlert size={20} />
                </span>
                <small>{t.needAction}</small>
              </div>
              <div className="metric-card__value">
                <strong>36</strong>
                <span className="metric-note metric-note--orange">
                  {lang === "ar" ? "8 عاجلة" : "8 urgent"}
                </span>
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-card__top">
                <span className="metric-icon metric-icon--blue">
                  <Warehouse size={20} />
                </span>
                <small>{t.inWarehouse}</small>
              </div>
              <div className="metric-card__value">
                <strong>184</strong>
                <span className="metric-note">
                  {lang === "ar" ? "14 دخلت اليوم" : "14 received today"}
                </span>
              </div>
            </article>
            <article className="metric-card">
              <div className="metric-card__top">
                <span className="metric-icon metric-icon--green">
                  <Truck size={20} />
                </span>
                <small>{t.withCourier}</small>
              </div>
              <div className="metric-card__value">
                <strong>123</strong>
                <span className="metric-note metric-note--green">
                  {lang === "ar" ? "مع 17 مندوب" : "with 17 couriers"}
                </span>
              </div>
            </article>
          </section>

          <section className="shipments-section">
            <div className="shipment-toolbar">
              <label className="shipment-search">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t.searchPlaceholder}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label={t.clear}
                  >
                    <X size={16} />
                  </button>
                )}
              </label>
              <div className="toolbar-actions">
                <label className="scenario-control">
                  <span>{t.screenState}</span>
                  <span className="select-wrap select-wrap--compact">
                    <select
                      value={scenario}
                      onChange={(event) =>
                        setScenario(event.target.value as Scenario)
                      }
                    >
                      <option value="ready">{t.ready}</option>
                      <option value="loading">{t.loading}</option>
                      <option value="empty">{t.empty}</option>
                      <option value="delayed">{t.delayed}</option>
                      <option value="unavailable">{t.unavailable}</option>
                      <option value="conflict">{t.conflict}</option>
                    </select>
                    <ChevronDown size={15} />
                  </span>
                </label>
                <button
                  className={`secondary-button ${
                    statusFilter || custodyFilter
                      ? "secondary-button--active"
                      : ""
                  }`}
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                >
                  <Filter size={17} />
                  {t.filters}
                  {(statusFilter || custodyFilter) && <i />}
                </button>
                <button className="secondary-button" type="button">
                  <Columns3 size={17} />
                  {t.columns}
                </button>
              </div>
            </div>

            <div className="views-row">
              <div className="view-tabs">
                {tabs.map((tabItem) => (
                  <button
                    type="button"
                    key={tabItem.id}
                    onClick={() => setActiveTab(tabItem.id)}
                    className={
                      activeTab === tabItem.id ? "view-tab view-tab--active" : "view-tab"
                    }
                  >
                    {tabItem.label}
                    <span>{tabItem.count}</span>
                  </button>
                ))}
              </div>
              <span className="result-count">
                {filteredShipments.length} {t.results}
              </span>
            </div>

            {scenario === "delayed" && (
              <div className="inline-alert inline-alert--warning">
                <Clock3 size={19} />
                <div>
                  <strong>{t.delayedTitle}</strong>
                  <span>{t.delayedText}</span>
                </div>
              </div>
            )}
            {scenario === "conflict" && (
              <div className="inline-alert inline-alert--danger">
                <CircleAlert size={19} />
                <div>
                  <strong>{t.conflictTitle}</strong>
                  <span>{t.conflictText}</span>
                </div>
                <button type="button" onClick={() => setScenario("ready")}>
                  {t.refresh}
                </button>
              </div>
            )}

            {scenario !== "ready" &&
              scenario !== "delayed" &&
              scenario !== "conflict" && (
                <ScreenState
                  scenario={scenario}
                  lang={lang}
                  onRetry={clearFilters}
                />
              )}

            {(scenario === "ready" ||
              scenario === "delayed" ||
              scenario === "conflict") && (
              <>
                {visibleShipments.length > 0 ? (
                  <>
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>{t.tableShipment}</th>
                            <th>{t.recipient}</th>
                            <th>{t.sender}</th>
                            <th>{t.region}</th>
                            <th>{t.status}</th>
                            <th>{t.custody}</th>
                            <th>{t.amount}</th>
                            <th>{t.requiredNow}</th>
                            <th>{t.lastEvent}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleShipments.map((shipment) => (
                            <tr
                              key={shipment.id}
                              onClick={() => setSelectedShipment(shipment)}
                            >
                              <td>
                                <span className="shipment-cell">
                                  <strong>{shipment.id}</strong>
                                  <small>{shipment.reference}</small>
                                </span>
                              </td>
                              <td>
                                <span className="person-cell">
                                  <strong>{shipment.recipient[lang]}</strong>
                                  <small dir="ltr">{shipment.phone}</small>
                                </span>
                              </td>
                              <td>{shipment.sender[lang]}</td>
                              <td>
                                <span className="region-cell">
                                  <strong>{shipment.area[lang]}</strong>
                                  <small>{shipment.governorate[lang]}</small>
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`status-badge status-badge--${shipment.statusTone}`}
                                >
                                  {shipment.status[lang]}
                                </span>
                              </td>
                              <td>
                                <span className="custody-cell">
                                  {shipment.custodyType === "warehouse" ? (
                                    <Warehouse size={15} />
                                  ) : shipment.custodyType === "courier" ? (
                                    <Truck size={15} />
                                  ) : (
                                    <PackageCheck size={15} />
                                  )}
                                  <span className="custody-cell__copy">
                                    <strong>{shipment.custody[lang]}</strong>
                                    <small>
                                      {shipment.courier?.[lang] ?? t.noCourier}
                                    </small>
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span className="financial-cell">
                                  <span className="financial-cell__line">
                                    <small>{t.shipmentPrice}</small>
                                    <strong>{money.format(shipment.amount)}</strong>
                                  </span>
                                  <span className="financial-cell__line">
                                    <small>
                                      {t.shippingPrice}
                                      <em>
                                        {shipment.shippingPayer === "recipient"
                                          ? t.payerRecipient
                                          : t.payerSender}
                                      </em>
                                    </small>
                                    <strong>{money.format(shipment.shippingFee)}</strong>
                                  </span>
                                  <span className="financial-cell__line financial-cell__line--total">
                                    <small>{t.totalDue}</small>
                                    <strong>
                                      {money.format(
                                        shipment.amount +
                                          (shipment.shippingPayer === "recipient"
                                            ? shipment.shippingFee
                                            : 0),
                                      )}
                                    </strong>
                                  </span>
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`required-badge required-badge--${shipment.requiredType}`}
                                >
                                  {shipment.required[lang]}
                                </span>
                              </td>
                              <td>
                                <span className="event-cell">
                                  {shipment.lastEvent[lang]}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mobile-shipment-list">
                      {visibleShipments.map((shipment) => (
                        <button
                          className="shipment-mobile-card"
                          type="button"
                          key={shipment.id}
                          onClick={() => setSelectedShipment(shipment)}
                        >
                          <div className="shipment-mobile-card__top">
                            <span>
                              <strong>{shipment.id}</strong>
                              <small>{shipment.reference}</small>
                            </span>
                            <span
                              className={`status-badge status-badge--${shipment.statusTone}`}
                            >
                              {shipment.status[lang]}
                            </span>
                          </div>
                          <div className="shipment-mobile-card__person">
                            <span className="mini-avatar">
                              {shipment.recipient[lang].slice(0, 1)}
                            </span>
                            <span>
                              <strong>{shipment.recipient[lang]}</strong>
                              <small dir="ltr">{shipment.phone}</small>
                            </span>
                            <strong className="money">
                              {money.format(
                                shipment.amount +
                                  (shipment.shippingPayer === "recipient"
                                    ? shipment.shippingFee
                                    : 0),
                              )}
                            </strong>
                          </div>
                          <div className="shipment-mobile-card__facts">
                            <span>
                              <MapPin size={14} />
                              {shipment.area[lang]}
                            </span>
                            <span>
                              {shipment.custodyType === "warehouse" ? (
                                <Warehouse size={14} />
                              ) : shipment.custodyType === "courier" ? (
                                <Truck size={14} />
                              ) : (
                                <PackageCheck size={14} />
                              )}
                              {shipment.custody[lang]}
                            </span>
                          </div>
                          <div className="shipment-mobile-card__bottom">
                            <span
                              className={`required-badge required-badge--${shipment.requiredType}`}
                            >
                              {shipment.required[lang]}
                            </span>
                            <span>{shipment.lastEvent[lang]}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <ScreenState scenario="empty" lang={lang} onRetry={clearFilters} />
                )}
              </>
            )}
          </section>
        </main>
      </div>

      {selectedShipment && (
        <ShipmentDrawer
          shipment={selectedShipment}
          lang={lang}
          onClose={() => setSelectedShipment(null)}
          onToast={showToast}
        />
      )}
      {filtersOpen && (
        <FilterDrawer
          lang={lang}
          onClose={() => setFiltersOpen(false)}
          statusFilter={statusFilter}
          custodyFilter={custodyFilter}
          onStatus={setStatusFilter}
          onCustody={setCustodyFilter}
          onClear={clearFilters}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("light");
  const [screen, setScreen] = useState<Screen>("login");
  const [sharedStatuses, setSharedStatuses] = useState(statusPolicies);
  const [sharedGovernorates, setSharedGovernorates] = useState(governoratesData);
  const [sharedPriceLists, setSharedPriceLists] = useState(priceListsData);
  const [sharedCourierPlans, setSharedCourierPlans] = useState(
    courierRatePlansData,
  );
  const [sharedShipmentFields, setSharedShipmentFields] = useState(
    shipmentFieldPoliciesData,
  );
  const [sharedShipmentSettings, setSharedShipmentSettings] = useState(
    shipmentDataSettingsDefault,
  );
  const [sharedShipments, setSharedShipments] = useState(shipments);
  const [controlCenterReady, setControlCenterReady] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("tasleem-control-center-v2");
      if (saved) {
        const parsed = JSON.parse(saved) as {
          statuses?: StatusPolicy[];
          governorates?: GovernorateRecord[];
          priceLists?: PriceListRecord[];
          courierPlans?: CourierRatePlan[];
          shipmentFields?: ShipmentFieldPolicy[];
          shipmentSettings?: ShipmentDataSettings;
          shipments?: Shipment[];
        };
        if (Array.isArray(parsed.statuses)) {
          setSharedStatuses(
            parsed.statuses.map((status) => ({
              ...status,
              appearsInAssignment: status.appearsInAssignment ?? false,
              appearsInCourierRates:
                status.appearsInCourierRates ?? status.appearsInPricing,
            })),
          );
        }
        if (Array.isArray(parsed.governorates)) {
          setSharedGovernorates(parsed.governorates);
        }
        if (Array.isArray(parsed.priceLists)) setSharedPriceLists(parsed.priceLists);
        if (Array.isArray(parsed.courierPlans)) {
          setSharedCourierPlans(parsed.courierPlans);
        }
        if (Array.isArray(parsed.shipmentFields)) {
          setSharedShipmentFields(parsed.shipmentFields);
        }
        if (parsed.shipmentSettings) {
          setSharedShipmentSettings(parsed.shipmentSettings);
        }
        if (Array.isArray(parsed.shipments)) {
          setSharedShipments(
            parsed.shipments.map((shipment) =>
              shipment.custodyType === "courier" &&
              shipment.custody.en === "Delivered to recipient"
                ? {
                    ...shipment,
                    custodyType: "recipient" as const,
                    courier: null,
                  }
                : shipment,
            ),
          );
        }
      }
    } catch {
      window.localStorage.removeItem("tasleem-control-center-v2");
    } finally {
      setControlCenterReady(true);
    }
  }, []);

  useEffect(() => {
    const pricingStatusIds = sharedStatuses
      .filter(
        (status) => status.state === "published" && status.appearsInPricing,
      )
      .map((status) => status.id);
    const areaIds = sharedGovernorates.flatMap((governorate) =>
      governorate.areas.map((area) => area.id),
    );

    setSharedPriceLists((current) => {
      let anyListChanged = false;
      const next = current.map((priceList) => {
        let nextPrices = priceList.prices;
        let listChanged = false;

        areaIds.forEach((areaId) => {
          const currentArea = nextPrices[areaId];
          if (!currentArea) {
            if (!listChanged) nextPrices = { ...nextPrices };
            nextPrices[areaId] = Object.fromEntries(
              pricingStatusIds.map((statusId) => [statusId, null]),
            );
            listChanged = true;
            return;
          }

          const missingStatuses = pricingStatusIds.filter(
            (statusId) => !(statusId in currentArea),
          );
          if (missingStatuses.length) {
            if (!listChanged) nextPrices = { ...nextPrices };
            nextPrices[areaId] = { ...currentArea };
            missingStatuses.forEach((statusId) => {
              nextPrices[areaId][statusId] = null;
            });
            listChanged = true;
          }
        });

        if (!listChanged) return priceList;
        anyListChanged = true;
        return { ...priceList, prices: nextPrices };
      });

      return anyListChanged ? next : current;
    });
  }, [sharedGovernorates, sharedStatuses]);

  useEffect(() => {
    const courierStatusIds = sharedStatuses
      .filter(
        (status) =>
          status.state === "published" && status.appearsInCourierRates,
      )
      .map((status) => status.id);
    const areaIds = sharedGovernorates.flatMap((governorate) =>
      governorate.areas.map((area) => area.id),
    );

    setSharedCourierPlans((current) => {
      let anyPlanChanged = false;
      const next = current.map((plan) => {
        let nextRates = plan.rates;
        let planChanged = false;

        areaIds.forEach((areaId) => {
          const currentArea = nextRates[areaId];
          if (!currentArea) {
            if (!planChanged) nextRates = { ...nextRates };
            nextRates[areaId] = Object.fromEntries(
              courierStatusIds.map((statusId) => [statusId, null]),
            );
            planChanged = true;
            return;
          }

          const missingStatuses = courierStatusIds.filter(
            (statusId) => !(statusId in currentArea),
          );
          if (missingStatuses.length) {
            if (!planChanged) nextRates = { ...nextRates };
            nextRates[areaId] = { ...currentArea };
            missingStatuses.forEach((statusId) => {
              nextRates[areaId][statusId] = null;
            });
            planChanged = true;
          }
        });

        if (!planChanged) return plan;
        anyPlanChanged = true;
        return { ...plan, rates: nextRates };
      });

      return anyPlanChanged ? next : current;
    });
  }, [sharedGovernorates, sharedStatuses]);

  useEffect(() => {
    if (!controlCenterReady) return;
    window.localStorage.setItem(
      "tasleem-control-center-v2",
      JSON.stringify({
        statuses: sharedStatuses,
        governorates: sharedGovernorates,
        priceLists: sharedPriceLists,
        courierPlans: sharedCourierPlans,
        shipmentFields: sharedShipmentFields,
        shipmentSettings: sharedShipmentSettings,
        shipments: sharedShipments,
      }),
    );
  }, [
    controlCenterReady,
    sharedGovernorates,
    sharedCourierPlans,
    sharedPriceLists,
    sharedShipmentFields,
    sharedShipmentSettings,
    sharedShipments,
    sharedStatuses,
  ]);

  return (
    <div className="app-root" data-theme={theme} dir={lang === "ar" ? "rtl" : "ltr"}>
      {screen === "login" ? (
        <LoginScreen
          lang={lang}
          theme={theme}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onEnter={() => setScreen("shipments")}
        />
      ) : screen === "shipments" ? (
        <ShipmentsScreen
          lang={lang}
          theme={theme}
          shipmentRecords={sharedShipments}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : screen === "courierShipments" ? (
        <CourierShipmentsScreen
          lang={lang}
          theme={theme}
          shipmentRecords={sharedShipments}
          statuses={sharedStatuses}
          onShipmentsChange={setSharedShipments}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : screen === "assignment" ? (
        <AssignmentScreen
          lang={lang}
          theme={theme}
          shipmentRecords={sharedShipments}
          statuses={sharedStatuses}
          governorates={sharedGovernorates}
          settings={sharedShipmentSettings}
          onShipmentsChange={setSharedShipments}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : screen === "confirmation" ? (
        <ConfirmationScreen
          lang={lang}
          theme={theme}
          shipmentRecords={sharedShipments}
          settings={sharedShipmentSettings}
          onShipmentsChange={setSharedShipments}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : screen === "addShipment" ? (
        <AddShipmentScreen
          lang={lang}
          theme={theme}
          fields={sharedShipmentFields}
          settings={sharedShipmentSettings}
          governorates={sharedGovernorates}
          statuses={sharedStatuses}
          priceLists={sharedPriceLists}
          onSaveShipments={(records) =>
            setSharedShipments((current) => [...records, ...current])
          }
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : screen === "statuses" ? (
        <StatusesScreen
          lang={lang}
          theme={theme}
          policies={sharedStatuses}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onPoliciesChange={setSharedStatuses}
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : screen === "areas" ? (
        <AreasScreen
          lang={lang}
          theme={theme}
          governorates={sharedGovernorates}
          priceLists={sharedPriceLists}
          policies={sharedStatuses}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onGovernoratesChange={setSharedGovernorates}
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : screen === "priceLists" ? (
        <PriceListsScreen
          lang={lang}
          theme={theme}
          priceLists={sharedPriceLists}
          statuses={sharedStatuses}
          governorates={sharedGovernorates}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onPriceListsChange={setSharedPriceLists}
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : screen === "courierRates" ? (
        <CourierRatesScreen
          lang={lang}
          theme={theme}
          plans={sharedCourierPlans}
          statuses={sharedStatuses}
          governorates={sharedGovernorates}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onPlansChange={setSharedCourierPlans}
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : (
        <ShipmentPoliciesScreen
          lang={lang}
          theme={theme}
          fields={sharedShipmentFields}
          settings={sharedShipmentSettings}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onSave={(nextFields, nextSettings) => {
            setSharedShipmentFields(nextFields);
            setSharedShipmentSettings(nextSettings);
          }}
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      )}
    </div>
  );
}
