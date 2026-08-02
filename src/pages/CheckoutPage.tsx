import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUiStore } from "@/store/uiStore";
import { copy } from "@/constants/copy";
import { useCartStore } from "@/features/cart/cartStore";
import { computeCartTotals } from "@/features/cart/utils/cartTotals";
import { checkoutSchema, type CheckoutFormValues } from "@/features/checkout/checkoutSchema";
import { DeliveryMethodSelector } from "@/features/checkout/components/DeliveryMethodSelector";
import { PaymentMethodSelector } from "@/features/checkout/components/PaymentMethodSelector";
import { TextField, TextAreaField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/StateViews";
import { orderService } from "@/features/orders/services/orderService";

export function CheckoutPage() {
  const locale = useUiStore((s) => s.locale);
  const t = copy[locale].checkout;
  const cartT = copy[locale].cart;
  const navigate = useNavigate();

  const lines = useCartStore((s) => s.lines);
  const appliedCoupon = useCartStore((s) => s.appliedCoupon);
  const clearCart = useCartStore((s) => s.clear);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      district: "",
      address: "",
      notes: "",
      deliveryMethod: "delivery",
      paymentMethod: "cash",
    },
  });

  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  const totals = useMemo(
    () => computeCartTotals(lines, appliedCoupon, deliveryMethod),
    [lines, appliedCoupon, deliveryMethod]
  );

  function errorMessage(code?: string): string | undefined {
    if (!code) return undefined;
    if (code === "too_short") return t.errorTooShort;
    if (code === "invalid_phone") return t.errorInvalidPhone;
    return t.errorRequired;
  }

  async function onSubmit(values: CheckoutFormValues) {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const order = await orderService.createOrder({
        lines,
        customer: {
          fullName: values.fullName,
          phone: values.phone,
          city: values.city,
          district: values.district,
          address: values.address,
          notes: values.notes,
        },
        deliveryMethod: values.deliveryMethod,
        paymentMethod: values.paymentMethod,
        coupon: appliedCoupon,
        totals,
      });
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch {
      setSubmitError(locale === "ar" ? "تعذّر إرسال الطلب، حاول مرة أخرى." : "Couldn't place the order, please try again.");
      setIsSubmitting(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24">
        <EmptyState
          title={cartT.emptyTitle}
          description={cartT.emptyDescription}
          action={
            <Link to="/menu">
              <Button variant="primary">{cartT.browseMenu}</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <SectionHeading eyebrow="مطعمي" title={t.title} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          <section className="rounded-leaf border border-forest-900/10 p-5 dark:border-parchment-100/10">
            <h2 className="mb-4 font-display text-lg font-semibold text-forest-900 dark:text-parchment-100">
              {t.customerInfo}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label={t.fullName}
                {...register("fullName")}
                error={errorMessage(errors.fullName?.message)}
              />
              <TextField
                label={t.phone}
                dir="ltr"
                placeholder="05XXXXXXXX"
                {...register("phone")}
                error={errorMessage(errors.phone?.message)}
              />
              <TextField label={t.city} {...register("city")} error={errorMessage(errors.city?.message)} />
              <TextField
                label={t.district}
                {...register("district")}
                error={errorMessage(errors.district?.message)}
              />
              <div className="sm:col-span-2">
                <TextField
                  label={t.address}
                  {...register("address")}
                  error={errorMessage(errors.address?.message)}
                />
              </div>
              <div className="sm:col-span-2">
                <TextAreaField label={t.notes} placeholder={t.notesPlaceholder} {...register("notes")} />
              </div>
            </div>
          </section>

          <section className="rounded-leaf border border-forest-900/10 p-5 dark:border-parchment-100/10">
            <DeliveryMethodSelector
              value={deliveryMethod}
              onChange={(v) => setValue("deliveryMethod", v)}
              locale={locale}
            />
          </section>

          <section className="rounded-leaf border border-forest-900/10 p-5 dark:border-parchment-100/10">
            <PaymentMethodSelector
              value={paymentMethod}
              onChange={(v) => setValue("paymentMethod", v)}
              locale={locale}
            />
          </section>
        </div>

        <aside className="flex flex-col gap-5 self-start rounded-leaf border border-forest-900/10 bg-parchment-100 p-5 dark:border-parchment-100/10 dark:bg-forest-900">
          <h2 className="font-display text-lg font-semibold text-forest-900 dark:text-parchment-100">
            {t.orderReview}
          </h2>

          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
            {lines.map((line) => (
              <div key={line.lineId} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-forest-900 dark:text-parchment-100">
                  {line.quantity}× {line.product.name[locale]}
                </span>
                <span className="font-mono text-ink-600 dark:text-moss-300">
                  {(line.unitPrice * line.quantity).toFixed(2)} SAR
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-forest-900/10 pt-4 text-sm dark:border-parchment-100/10">
            <div className="flex items-center justify-between">
              <span className="text-ink-600 dark:text-moss-300">{cartT.itemsSubtotal}</span>
              <span className="font-mono text-forest-900 dark:text-parchment-100">
                {totals.itemsSubtotal.toFixed(2)} SAR
              </span>
            </div>
            {totals.discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-ink-600 dark:text-moss-300">{cartT.discount}</span>
                <span className="font-mono text-ember-500">-{totals.discount.toFixed(2)} SAR</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-ink-600 dark:text-moss-300">{cartT.deliveryFee}</span>
              <span className="font-mono text-forest-900 dark:text-parchment-100">
                {totals.isFreeDelivery ? cartT.freeDelivery : `${totals.deliveryFee.toFixed(2)} SAR`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-600 dark:text-moss-300">{cartT.vat}</span>
              <span className="font-mono text-forest-900 dark:text-parchment-100">{totals.vat.toFixed(2)} SAR</span>
            </div>
            <div className="mt-1 flex items-center justify-between border-t border-forest-900/10 pt-3 dark:border-parchment-100/10">
              <span className="font-semibold text-forest-900 dark:text-parchment-100">{cartT.grandTotal}</span>
              <span className="font-mono text-xl font-semibold text-forest-900 dark:text-gold-400">
                {totals.grandTotal.toFixed(2)} SAR
              </span>
            </div>
          </div>

          {submitError && <p className="text-xs text-ember-500">{submitError}</p>}

          <Button variant="primary" type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t.placingOrder : t.placeOrder}
          </Button>
        </aside>
      </form>
    </div>
  );
}
