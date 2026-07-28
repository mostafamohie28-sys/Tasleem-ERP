"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
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
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Truck,
  UserRound,
  UsersRound,
  Warehouse,
  WifiOff,
  X,
} from "lucide-react";

type Lang = "ar" | "en";
type Theme = "light" | "dark";
type Screen = "login" | "shipments" | "statuses";
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
  statusTone: "blue" | "orange" | "green" | "gray" | "red";
  custody: Localized;
  custodyType: "warehouse" | "courier";
  courier: Localized | null;
  amount: number;
  deliveryDate: Localized;
  required: Localized;
  requiredType: "none" | "attention" | "incomplete";
  lastEvent: Localized;
  confirmation: Localized;
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
    custodyType: "courier",
    courier: { ar: "كريم حسن", en: "Karim Hassan" },
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
  appearsInPricing: boolean;
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
    appearsInPricing: true,
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
    appearsInPricing: true,
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
    appearsInPricing: true,
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
    appearsInPricing: true,
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
    appearsInPricing: false,
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
    appearsInPricing: false,
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
        { label: t.confirmation, icon: ClipboardCheck },
        { label: t.assignment, icon: Truck },
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
  onLang,
  onTheme,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
  onLang: () => void;
  onTheme: () => void;
  onNavigate: (screen: Exclude<Screen, "login">) => void;
  onLogout: () => void;
}) {
  const t = copy[lang];
  const s = statusCopy[lang];
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [policies, setPolicies] = useState(statusPolicies);
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
      appearsInPricing: false,
      requiredFields: [{ ar: "ملاحظة", en: "Note" }],
      usage: 0,
      version: 1,
    });
  }

  function savePolicy(policy: StatusPolicy) {
    setPolicies((current) =>
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

function ShipmentsScreen({
  lang,
  theme,
  onLang,
  onTheme,
  onNavigate,
  onLogout,
}: {
  lang: Lang;
  theme: Theme;
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
    return shipments.filter((shipment) => {
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
  }, [activeTab, custodyFilter, search, statusFilter]);

  const visibleShipments =
    scenario === "ready" ||
    scenario === "delayed" ||
    scenario === "conflict"
      ? filteredShipments
      : [];

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "all", label: t.all, count: shipments.length },
    {
      id: "action",
      label: t.needAction,
      count: shipments.filter((item) => item.requiredType === "attention").length,
    },
    {
      id: "warehouse",
      label: t.inWarehouse,
      count: shipments.filter((item) => item.custodyType === "warehouse").length,
    },
    {
      id: "courier",
      label: t.withCourier,
      count: shipments.filter((item) => item.custodyType === "courier").length,
    },
    {
      id: "incomplete",
      label: t.incomplete,
      count: shipments.filter((item) => item.requiredType === "incomplete").length,
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
                onClick={() => showToast(t.handoff)}
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
                                  ) : (
                                    <Truck size={15} />
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
                              ) : (
                                <Truck size={14} />
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

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

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
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      ) : (
        <StatusesScreen
          lang={lang}
          theme={theme}
          onLang={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
          onTheme={() =>
            setTheme((value) => (value === "light" ? "dark" : "light"))
          }
          onNavigate={setScreen}
          onLogout={() => setScreen("login")}
        />
      )}
    </div>
  );
}
