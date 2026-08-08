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
