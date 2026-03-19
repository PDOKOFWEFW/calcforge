import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CalcForge privacy policy — how we handle analytics, advertising, and your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-display text-4xl text-stone-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-stone-400 mb-10">Last updated: {new Date().toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })}</p>
      <div className="space-y-8 text-stone-600 text-sm leading-relaxed">
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Overview</h2>
          <p>CalcForge (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates calcforge.com. This policy explains what information we collect and how we use it.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Data We Do Not Collect</h2>
          <p>All calculator inputs and results are processed entirely within your browser. No calculation data is ever transmitted to our servers or stored anywhere. We do not collect personal information.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Analytics</h2>
          <p>We use Google Analytics to understand aggregate usage — which pages are visited and how long visitors stay. This data is anonymized. You can opt out at <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">tools.google.com/dlpage/gaoptout</a>.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Advertising</h2>
          <p>We use Google AdSense to display advertisements. Google and its partners may use cookies to serve ads based on your prior visits to this and other websites. You may opt out at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">google.com/settings/ads</a>. We also participate in affiliate programs. Affiliate links are marked with <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs">rel=&ldquo;sponsored&rdquo;</code>.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Cookies</h2>
          <p>CalcForge itself does not set first-party cookies. Google Analytics and Google AdSense may set third-party cookies. You can control cookies through your browser settings.</p>
        </section>
        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Contact</h2>
          <p>For privacy questions: <a href="mailto:privacy@calcforge.com" className="text-brand-600 hover:underline">privacy@calcforge.com</a></p>
        </section>
      </div>
    </div>
  );
}
