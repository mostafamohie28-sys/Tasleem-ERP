import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/tajawal/400.css";
import "@fontsource/tajawal/500.css";
import "@fontsource/tajawal/700.css";
import "@fontsource/tajawal/800.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const previewImage = `${protocol}://${host}/og.png`;

  return {
    title: "Tasleem ERP — نموذج التصميم",
    description:
      "نموذج بصري تفاعلي لنظام تسليم لإدارة وتشغيل شركات الشحن الداخلي.",
    openGraph: {
      title: "تسليم — نظام تشغيل شركات الشحن الداخلي",
      description: "نموذج التصميم الأول لنظام Tasleem ERP.",
      type: "website",
      images: [
        {
          url: previewImage,
          width: 1680,
          height: 941,
          alt: "نموذج تصميم نظام تسليم",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "تسليم — نظام تشغيل شركات الشحن الداخلي",
      description: "نموذج التصميم الأول لنظام Tasleem ERP.",
      images: [previewImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
