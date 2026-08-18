import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Tasleem login shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Tasleem ERP — نموذج التصميم<\/title>/i);
  assert.match(html, /class="login-shell"/);
  assert.match(html, /منظومة التشغيل/);
  assert.match(html, /دخول إلى مساحة العمل/);
  assert.match(html, /tasleem-brand-board\.png/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the accounting decision and mobile-navigation contracts in source", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /finalShippingPayer/);
  assert.match(page, /function AlertsScreen/);
  for (const screen of [
    "dashboard", "reports", "settings", "help", "shipments", "senders",
    "couriers", "warehouse", "trusts", "treasury", "shipmentPolicies",
    "senderAccountPrep", "senderAccount", "courierAccount", "courierPayouts",
  ]) {
    assert.match(page, new RegExp(`screen === \\\"${screen}\\\"`));
  }
  assert.match(page, /اعتماد محاسب التشغيل لمتحمّل الشحن/);
  assert.match(page, /مرجع الراسل غير مسجل/);
  assert.match(page, /courierCommissionSnapshot/);
  assert.match(page, /captureCourierCommissionSnapshot/);
  assert.match(page, /الحساب لن يُغلق كصفر/);
  assert.match(page, /commissionDeferred/);
  assert.match(page, /function CourierPayoutsScreen/);
  assert.match(page, /مستحقات المناديب/);
  assert.match(page, /courier_payment/);
  assert.match(page, /مبلغ آخر/);
  assert.match(page, /function ShipmentReplacementScreen/);
  assert.match(page, /استبدال شحنات بين المناديب/);
  assert.match(page, /استبدال الشحنات بين الرسل/);
  assert.match(page, /replacementHistory/);
  assert.match(page, /function AccessControlScreen/);
  assert.match(page, /permissionCatalog/);
  assert.match(page, /sharedAccessActivities/);
  assert.match(page, /accessActivities:\s*sharedAccessActivities/);
  assert.match(page, /type TreasuryCashSession/);
  assert.match(page, /type FinancialDayCloseSnapshot/);
  assert.match(page, /submitSessionClose/);
  assert.match(page, /submitDayClose/);
  assert.match(page, /submitOpenSession/);
  assert.match(page, /submitHandover/);
  assert.match(page, /treasuryCashSessionHistory/);
  assert.match(page, /TreasuryVarianceReview/);
  assert.match(page, /EmployeeTreasuryDebt/);
  assert.match(page, /EmployeeTreasuryDebtPayment/);
  assert.match(page, /submitEmployeeDebtPayment/);
  assert.match(page, /employee_debt_payment/);
  assert.match(page, /TreasuryStatementReconciliation/);
  assert.match(page, /submitStatementReconciliation/);
  assert.match(page, /treasuryStatementReconciliations/);
  assert.match(page, /مطابقة البنك والمحفظة/);
  assert.match(page, /كشف الحساب يراجع الرصيد ولا يغيّره/);
  assert.match(page, /أي فرق يظل واقعة مفتوحة للمراجعة/);
  assert.match(page, /unresolvedStatementCount/);
  assert.match(page, /StatementDifferenceReview/);
  assert.match(page, /submitStatementDifferenceReview/);
  assert.match(page, /timing_difference/);
  assert.match(page, /linked_existing_movement/);
  assert.match(page, /statement_difference_review/);
  assert.match(page, /رسوم بنك أو محفظة/);
  assert.match(page, /TreasuryStatementLine/);
  assert.match(page, /submitStatementLine/);
  assert.match(page, /submitStatementLineMatch/);
  assert.match(page, /statementMatchSuggestions/);
  assert.match(page, /acceptStatementMatchSuggestion/);
  assert.match(page, /suggestion_confirmed/);
  assert.match(page, /matchedMovementIds/);
  assert.match(page, /partially_matched/);
  assert.match(page, /partial_allocated/);
  assert.match(page, /submitStatementClose/);
  assert.match(page, /statement-close/);
  assert.match(page, /submitStatementReopen/);
  assert.match(page, /statement-reopen/);
  assert.match(page, /treasury\.reopen_statement_review/);
  assert.match(page, /canReopenStatementReview/);
  assert.match(page, /treasury\.approve_statement_difference/);
  assert.match(page, /canApproveStatementDifference/);
  assert.match(page, /treasury\.close_financial_day/);
  assert.match(page, /canCloseFinancialDay/);
  assert.match(page, /Financial approvals/);
  assert.match(page, /الموافقات المالية/);
  assert.match(page, /Reason for reopening the review/);
  assert.match(page, /Statement review is closed/);
  assert.match(page, /remainingLineCount/);
  assert.match(page, /availableStatementMovementAmount/);
  assert.match(page, /selectedStatementLineMovementTotalIsExact/);
  assert.match(page, /Allocation total cannot exceed the statement line amount/);
  assert.match(page, /Statement matching assistant/);
  assert.match(page, /treasuryStatementLines/);
  assert.match(page, /بنود كشف الحساب التفصيلية/);
  assert.match(page, /No allocation may exceed a movement's available balance/);
  assert.match(page, /handleStatementLineImportFile/);
  assert.match(page, /submitStatementLineImport/);
  assert.match(page, /لا استيراد جزئي/);
  assert.match(page, /استيراد CSV/);
  assert.match(page, /التأكيد ينشئ إيصالًا وحركة داخل الخزنة/);
  assert.match(page, /إذا كان المبلغ يساوي المتبقي اختر/);
  assert.match(page, /submitVarianceReview/);
  assert.match(page, /cash_variance_review/);
  assert.match(page, /فرق العد واقعة تحتاج قرارًا، وليس مديونية تلقائية/);
  assert.match(page, /إغلاق الفرق بإعادة العد يتطلب/);
  assert.match(page, /openedSequence/);
  assert.match(page, /تسليم واستلام في خطوة واحدة/);
  assert.match(page, /هذا الرقم يصبح رصيد بداية عهدة الموظف الجديد/);
  assert.match(page, /requestedDebtPayment/);
  assert.match(page, /currentSettlementCash/);
  assert.match(page, /sourceDocument/);
  assert.match(page, /breakdown/);
  assert.match(page, /submitReversal/);
  assert.match(page, /الحركة الأصلية لا تُحذف/);
  assert.match(page, /treasuryAccountId/);
  assert.match(page, /حساب الاستلام/);
  assert.match(page, /payoutProofRequired/);
  assert.match(page, /مرجع التحويل أو إثبات الصرف إجباري/);
  assert.match(page, /periodAnchor/);
  assert.match(page, /unpostedCourierSettlements/);
  assert.match(page, /ترحيل مستندات التشغيل/);
  assert.match(page, /unmatchedStatementLineCount/);
  assert.match(page, /treasury_correction/);
  assert.match(page, /مستند بديل مصحح/);
  assert.match(page, /كشف أرصدة الرسل/);
  assert.match(page, /financialDayCloses:\s*sharedFinancialDayCloses/);
  assert.match(page, /normalizeCourierRatePlan/);
  assert.match(page, /normalizeCourierPlans/);
  assert.match(page, /function CourierAgreementEditorV2/);
  assert.match(page, /function CourierRatesScreen/);
  assert.match(page, /كل مندوب له اتفاق مستقل/);
  assert.match(page, /أي نسخ هنا يصبح مستقلًا لهذا المندوب/);
  assert.match(page, /courier-agreements-workspace/);
  assert.match(page, /courier-private-rate-list/);
  assert.match(page, /courier-quick-selector/);
  assert.match(page, /courier-status-payer/);
  assert.match(page, /courier-contract-v2/);
  assert.match(page, /type ShipmentServiceType/);
  assert.match(page, /recipientCashFlow/);
  assert.match(page, /recipientRefundAmount/);
  assert.match(page, /recipient_disbursement/);
  assert.match(page, /cashDirection/);
  assert.match(page, /Amount to refund recipient/);
  assert.match(page, /normalized\.financialEffect\.en !== "No financial effect"/);
  assert.match(page, /function ShipmentServicesScreen/);
  assert.match(page, /أنواع الشحنات والخدمات/);
  assert.match(page, /statusAllowedForService/);
  assert.match(page, /shippingPayerDecision/);
  assert.match(page, /operationalActions/);
  assert.match(page, /customInputFields/);
  assert.match(page, /serviceTypeId/);
  assert.match(page, /servicePolicyMode/);
  assert.match(page, /allowedServiceTypeIds/);
  assert.match(page, /defaultServiceTypeId/);
  assert.match(page, /أنواع الشحنات المتاحة لهذا الراسل/);
  assert.match(page, /shipmentServiceFor/);
  assert.match(page, /فحص الجاهزية قبل النشر/);
  assert.match(page, /تجربة الخدمة بدون إنشاء شحنة/);
  assert.match(page, /requiresIndependentReturnCount/);
  assert.match(page, /عدد قطع الطرد المرتجع/);
  assert.match(page, /financialApproval/);
  assert.match(page, /statusEventFinanciallyApproved/);
  assert.match(page, /طلب اعتماد الأثر المالي/);
  assert.match(page, /الحالة والحيازة الفعلية مسجلتان/);
  assert.match(page, /الأثر المالي مرفوض وغير قابل للتسوية/);
  assert.match(page, /correctionHistory/);
  assert.match(page, /reviewHistory/);
  assert.match(page, /أثر مالي مرفوض يحتاج تصحيح/);
  assert.match(page, /حفظ وإعادة الإرسال/);
  assert.match(page, /فجوة في عمولة المندوب/);
  assert.match(page, /سعر الراسل غير مكتمل/);
  assert.doesNotMatch(page, /className="courier-payer-review"/);
  assert.match(page, /سعر المنطقة غير مكتمل للراسل البديل/);
  assert.match(page, /tasleem-control-center-v2/);
  assert.match(css, /courier-payer-review/);
  assert.match(css, /courier-commission-gap/);
  assert.match(css, /courier-payout-workspace/);
  assert.match(css, /replacement-workspace/);
  assert.match(css, /replacement-confirm-layer/);
  assert.match(css, /access-role-workspace/);
  assert.match(css, /activity-timeline/);
  assert.match(css, /access-dialog-layer/);
  assert.match(css, /treasury-tabs/);
  assert.match(css, /cash-session-space/);
  assert.match(css, /cash-session-history/);
  assert.match(css, /cash-handover-route/);
  assert.match(css, /treasury-variance-space/);
  assert.match(css, /treasury-variance-list/);
  assert.match(css, /variance-decision-grid/);
  assert.match(css, /employee-debt-payment-dialog/);
  assert.match(css, /employee-debt-payments/);
  assert.match(css, /treasury-reconciliation-space/);
  assert.match(css, /statement-reconciliation-dialog/);
  assert.match(css, /treasury-reconciliation-list/);
  assert.match(css, /statement-difference-review-dialog/);
  assert.match(css, /statement-difference-decision/);
  assert.match(css, /statement-lines-workspace/);
  assert.match(css, /statement-line-match-dialog/);
  assert.match(css, /statement-line-import-dialog/);
  assert.match(css, /statement-import-picker/);
  assert.match(css, /statement-match-assistant/);
  assert.match(css, /statement-line-match-options/);
  assert.match(css, /statement-line-match-preview/);
  assert.match(css, /financial-day-space/);
  assert.match(css, /treasury-breakdown/);
  assert.match(css, /treasury-reversal-badge/);
  assert.match(css, /treasury-reversal-box/);
  assert.match(css, /sender-balance-statement/);
  assert.match(css, /courier-quick-selector/);
  assert.match(css, /courier-status-payer/);
  assert.match(css, /courier-contract-v2/);
  assert.match(css, /courier-agreements-workspace/);
  assert.match(css, /service-builder-layout/);
  assert.match(css, /entry-service-selector/);
  assert.match(css, /status-action-grid/);
  assert.match(css, /status-custom-fields/);
  assert.match(css, /sender-service-policy/);
  assert.match(css, /company-service-policy-summary/);
  assert.match(css, /service-readiness-panel/);
  assert.match(css, /service-simulator/);
  assert.match(css, /shipment-service-chip/);
  assert.match(css, /courier-agreement-directory/);
  assert.match(css, /courier-private-rate-list/);
  assert.match(css, /alert-record--approval/);
  assert.match(css, /approval-decision-box/);
  assert.match(css, /financial-correction-box/);
  assert.match(css, /alert-record--correction/);
  assert.match(css, /@media \(max-width:\s*1120px\)[\s\S]*?\.sidebar\s*\{[\s\S]*?z-index:\s*75/);
  assert.match(layout, /Tasleem ERP/);
  assert.match(packageJson, /"build":\s*"vinext build"/);
  assert.doesNotMatch(packageJson, /"xlsx"/);
});

test("keeps each operational responsibility in its dedicated screen", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const warehouse = page.match(
    /function WarehouseScreen\([\s\S]*?type ShipmentEntryDraft/,
  )?.[0] ?? "";
  const courierShipments = page.match(
    /function CourierShipmentsScreen\([\s\S]*?function CourierPrintScreen/,
  )?.[0] ?? "";
  const courierPayouts = page.match(
    /function CourierPayoutsScreen\([\s\S]*?function CourierAccountScreen/,
  )?.[0] ?? "";
  const courierAccount = page.match(
    /function CourierAccountScreen\([\s\S]*?function AssignmentScreen/,
  )?.[0] ?? "";

  assert.ok(warehouse, "Warehouse screen source should be discoverable");
  assert.doesNotMatch(warehouse, /receiveCourierReturn|handReturnToSender/);
  assert.doesNotMatch(warehouse, /onNavigate\("assignment"\)/);
  assert.match(warehouse, /moveSelectedShipments/);
  assert.match(warehouse, /stocktakeExpected/);

  assert.doesNotMatch(courierShipments, /activeSettlementAccounts|settlementAccountId/);
  assert.match(courierPayouts, /payoutProofRequired/);
  assert.match(courierPayouts, /advanceOpen/);
  assert.match(courierAccount, /activeSettlementAccounts/);
  assert.match(courierAccount, /settlementAccountId/);
  assert.match(page, /shipmentRecords=\{sharedShipments\}/);
});

test("renders every declared application screen", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const screenType = page.match(/type Screen =([\s\S]*?);\s*type Scenario/)?.[1] ?? "";
  const declaredScreens = [...screenType.matchAll(/\|\s*"([^"]+)"/g)].map((match) => match[1]);

  assert.ok(declaredScreens.length > 30, "The complete screen catalogue should be discoverable");
  for (const screen of declaredScreens) {
    assert.match(
      page,
      new RegExp(`screen\\s*===\\s*"${screen}"`),
      `Declared screen '${screen}' must have a render branch`,
    );
  }
});

test("keeps sender policies independent and connected to their control pages", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Independent sender policy/);
  assert.match(page, /New-sender defaults/);
  assert.match(page, /state:\s*"published"/);
  assert.match(page, /servicePolicyMode:\s*"inherit"/);
  assert.match(page, /overrideKeys:\s*\[\]/);
  assert.match(page, /fieldOverrideCodes:\s*\[\]/);
  assert.match(page, /policyMode\s*===\s*"company"\s*\?\s*null/);
  assert.match(page, /recipientServiceAreaRates/);
  assert.match(page, /const missingSenders = sharedSenders\.filter/);
  assert.match(page, /!findSenderShipmentPolicy\(sender\.name, current\)/);
  assert.match(page, /onOpenSenderPolicy=\{\(senderId\) => \{/);
  assert.match(page, /setSenderProfileTarget\(\{ id: senderId, tab: "policy" \}\)/);
  assert.match(page, /senderPolicies=\{sharedSenderPolicies\}/);
  assert.match(page, /priceLists=\{sharedPriceLists\}/);
  assert.match(page, /serviceTypes=\{sharedServiceTypes\}/);
  assert.match(page, /statuses=\{sharedStatuses\}/);
  assert.doesNotMatch(page, /showCompanyTemplate/);

  assert.match(css, /sender-policy-quick-panel/);
  assert.match(css, /sender-policy-advanced-content\.is-open/);
  assert.match(css, /shipment-policies-page--defaults \.shipment-policy-scope/);
});

test("keeps smart help contextual, non-operational, and inside the workspace", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /function SmartHelpLayer/);
  assert.match(page, /function SmartHelpCenter/);
  assert.match(page, /document\.addEventListener\("contextmenu"/);
  assert.match(page, /document\.addEventListener\("pointerdown"/);
  assert.match(page, /tasleem-help-note:/);
  assert.match(page, /screen !== "login"/);
  assert.match(page, /screen === "help" \? <SmartHelpCenter/);
  assert.match(page, /اذهب إلى الصفحة/);
  assert.match(page, /تعليمات الشركة/);
  assert.match(css, /smart-help-trigger/);
  assert.match(css, /smart-help-panel/);
  assert.match(css, /smart-help-journeys/);
  assert.doesNotMatch(page, /smart-help-trigger/);
  assert.doesNotMatch(page, /smart-help-menu/);
  assert.match(page, /متى أستخدمه؟/);
  assert.match(page, /ماذا يحدث بعده؟/);
  assert.match(page, /تعليمات الشركة لهذا العنصر/);
  assert.match(page, /اضغط كليك يمين على أي عنصر آخر لشرحِه/);
  assert.match(page, /رحلة الشحنة الكاملة/);
  assert.match(page, /التسوية المالية اليومية/);
  assert.match(page, /smart-help-journey-path/);
  assert.match(css, /smart-help-panel__body/);
  assert.match(css, /page-content--help/);
});

test("provides dedicated contextual help for every system screen", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const screens = [...page.matchAll(/^\s*\| "([^"]+)"/gm)]
    .map((match) => match[1])
    .slice(0, 38)
    .filter((screen) => screen !== "login");
  const topicBlock = page.slice(page.indexOf("const smartHelpTopics"), page.indexOf("type SmartHelpJourney"));

  assert.equal(screens.length, 37);
  for (const screen of screens) {
    assert.match(topicBlock, new RegExp(`\\n\\s{2}${screen}: \\{`), `missing help topic for ${screen}`);
  }
});

test("keeps global navigation live and sender policy decisions singular", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /closest\("\.notification-button"\)/);
  assert.match(page, /setScreen\("alerts"\)/);
  assert.match(page, /closest\("\.topbar-user"\)/);
  assert.match(page, /setScreen\("users"\)/);
  assert.match(page, /event\.key\.toLocaleLowerCase\(\) === "k"/);
  assert.match(page, /function CommandSearch/);
  assert.match(page, /commandSearchHiddenScreens/);
  assert.match(page, /role="listbox"/);
  assert.match(page, /if \(event\.key === "Enter" && results\[0\]\?\.target\)/);
  assert.match(css, /command-search__results/);
  assert.match(page, /tasleem-help-note:/);
  assert.match(page, /normalized\.confirmationMode !== "required_before_assignment"/);
  assert.doesNotMatch(page, /className=\{policySettings\.allowAssignmentWithoutConfirmation \? "policy-inline-toggle active" : "policy-inline-toggle"\}/);
  assert.match(page, /إجراءات السياسة/);
  assert.match(page, /نموذج-استيراد-الشحنات\.csv/);
  assert.match(css, /Administrative control pages: readable at browser zoom 100%/);
});

test("keeps sender policies and courier agreements inside their profiles without duplicate navigation", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  const sidebarBlock = page.match(/const sections = \[([\s\S]*?)\];\s*useEffect/)?.[1] ?? "";
  assert.doesNotMatch(sidebarBlock, /screen:\s*"shipmentPolicies"/);
  assert.doesNotMatch(sidebarBlock, /screen:\s*"courierRates"/);
  assert.match(page, /ملخص حساب الراسل/);
  assert.match(page, /جدول عمولة/);
  assert.match(page, /screen === "shipmentPolicies"\) setScreen\("senders"\)/);
  assert.match(page, /screen === "courierRates"\) setScreen\("couriers"\)/);
  assert.match(page, /onOpenAgreement/);
  assert.match(page, /setAgreementRate/);
  assert.match(page, /سيُنشأ اتفاق مستقل تلقائيًا/);
  assert.match(page, /normalizeCourierPlans\(renamedAgreement, nextRecords\)/);
  const courierEditorBlock = page.slice(page.indexOf("function CourierEditor"), page.indexOf("function CouriersScreen"));
  assert.doesNotMatch(courierEditorBlock, /plans\.filter\(\(plan\) => plan\.state === "active"\)/);
});

test("keeps sender creation staged and sender policy controls singular", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /newSenderStep/);
  assert.match(page, /sender-new-profile--\$\{newSenderStep\}/);
  assert.match(page, /sender-profile-basic/);
  assert.match(page, /sender-profile-addresses/);
  assert.match(page, /sender-profile-price/);
  assert.match(page, /sender-profile-optional/);
  assert.match(page, /sender-policy-details--\$\{policySection\}/);
  assert.doesNotMatch(page, /showAdvancedPolicy/);
  assert.doesNotMatch(page, /sender-policy-advanced-toggle" type="button"/);
  assert.match(css, /sender-policy-details--operation/);
  assert.match(css, /sender-policy-details--financial/);
  assert.match(css, /sender-policy-details--entry/);
  assert.match(css, /sender-policy-details--delivery/);
});

test("keeps every operational assignment status governed by the status engine", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /id: "status-warehouse-received"[\s\S]*?appearsInAssignment: true/);
  assert.match(page, /id: "status-ready-assignment"[\s\S]*?appearsInAssignment: true/);
  assert.match(page, /id: "status-awaiting-confirmation"[\s\S]*?appearsInAssignment: false/);
  assert.match(page, /id: "status-out-for-delivery"[\s\S]*?appearsInAssignment: false/);
  assert.match(page, /missingBuiltInStatuses/);
  assert.match(page, /if \(!matchingPolicy \|\| !matchingPolicy\.appearsInAssignment\) return false/);
});

test("does not persist a new shipment service before the user saves it", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const addServiceBlock = page.match(
    /function addService\(\) \{[\s\S]*?\n  \}\n\n  function saveService/,
  )?.[0] ?? "";

  assert.ok(addServiceBlock, "The service creation flow should be discoverable");
  assert.doesNotMatch(addServiceBlock, /onServicesChange/);
  assert.match(page, /return exists \? next : \[\{ \.\.\.draft, version: 1 \}, \.\.\.next\]/);
  assert.match(page, /service\.state === "draft"[\s\S]*?service\.code === "NEW_SERVICE"/);
});

test("keeps company identity and data-safety settings in one guarded control center", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /type CompanyControlSettings/);
  assert.match(page, /function CompanySettingsScreen/);
  assert.match(page, /CompanyBrandContext\.Provider/);
  assert.match(page, /companyControlSettings:\s*sharedCompanyControlSettings/);
  assert.match(page, /data-font-scale=/);
  assert.match(page, /colorContrast\(draft\.appearance\.primaryColor/);
  assert.match(page, /destination\.startsWith\(`\$\{dataRoot\}/);
  assert.match(page, /tasleem-backup-v1/);
  assert.match(page, /verification:\s*"local-json-structure-only"/);
  assert.match(page, /restoreTest:\s*"not-run"/);
  assert.match(page, /runtimeConnected:\s*false/);
  assert.match(page, /const isDirty = JSON\.stringify\(draft\)/);
  assert.match(page, /settings-dirty-bar/);
  assert.match(page, /history: \[historyEntry, \.\.\.settings\.history\]/);
  assert.match(page, /tasleem-control-center-safety-point/);
  assert.match(page, /restoreReason\.trim\(\)\.length < 8/);
  assert.match(page, /screen === "settings" \? \(/);
  assert.doesNotMatch(page, /screen === "dashboard" \|\| screen === "reports" \|\| screen === "settings"/);

  assert.match(css, /settings-control-page/);
  assert.match(css, /settings-brand-layout/);
  assert.match(css, /storage-boundaries/);
  assert.match(css, /settings-restore-dialog/);
  assert.match(css, /update-guard-list/);
  assert.match(css, /settings-dirty-bar/);
});

test("keeps shipment statuses configurable, role-aware, and safe to publish", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /state: "published" \| "draft" \| "paused" \| "archived"/);
  assert.match(page, /recordingMode\?: "manual" \| "system"/);
  assert.match(page, /executorRoleIds\?: string\[\]/);
  assert.match(page, /function statusPolicyIssues/);
  assert.match(page, /This code is already used by another status/);
  assert.match(page, /draft\.state === "published" && readinessIssues\.length/);
  assert.match(page, /normalizeStatusPolicy\(status\)\.courierCanRecord === true/);
  assert.match(page, /function ShipmentStatusDialog/);
  assert.match(page, /shipment\.custodyType === "courier"/);
  assert.match(page, /internalViewerRoleIds/);
  assert.match(css, /status-readiness-card/);
  assert.match(css, /shipment-status-dialog/);
});

test("freezes shipment-type pricing and keeps price lists complete and singular", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /servicePrices\?: Record<string, PriceMatrix>/);
  assert.match(page, /function priceMatrixForService/);
  assert.match(
    page,
    /if \(serviceTypeId === "service-standard"\) return priceList\.prices/,
  );
  assert.match(page, /shippingPricingSnapshot\?:/);
  assert.match(page, /statusPrices: Record<string, number \| null>/);
  assert.match(page, /function initialShippingPriceStatus/);
  assert.match(
    page,
    /status\.useForInitialShippingPrice === true/,
  );
  assert.match(page, /typeof configuredShippingFee !== "number"/);
  assert.match(page, /preparedNext\.state === "active" && completion\.filled < completion\.total/);
  assert.match(page, /disabled=\{draft\.state !== "active"\}/);
  assert.match(page, /senderOwner\.get\(sender\.en\) === priceList\.id/);
  assert.match(page, /frozenPricing\.statusPrices\[selectedStatus\.id\]/);
  assert.match(css, /pricing-service-selector/);
});
