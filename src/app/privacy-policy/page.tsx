import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CalcForge privacy policy — how we handle data, analytics, and advertising.",
};

export default function PrivacyPolicy() {
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-display text-4xl text-stone-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-stone-400 mb-10">Last updated: {updated}</p>

      <div className="space-y-8 text-stone-600 text-sm leading-relaxed">

        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Overview</h2>
          <p>
            CalcForge (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates calcforge.com. This policy explains
            what information we collect, how we use it, and your rights regarding your data.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Data We Do Not Collect</h2>
          <p>
            All calculator inputs and results are processed entirely within your browser. No calculation
            data (home prices, income estimates, personal figures) is ever transmitted to our servers
            or stored anywhere.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Analytics</h2>
          <p>
            We use Google Analytics to understand how visitors use CalcForge in aggregate — which pages
            are visited, how long visitors stay, and where traffic comes from. This data is anonymized
            and does not include personally identifiable information. You can opt out via the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Advertising</h2>
          <p>
            We use Google AdSense to display advertisements. Google and its partners use cookies to
            serve ads based on your prior visits to this and other websites. You may opt out of
            personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              Google Ad Settings
            </a>. We also participate in affiliate programs. Affiliate links are marked with{" "}
            <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs">rel=&ldquo;sponsored&rdquo;</code>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Cookies</h2>
          <p>
            CalcForge itself does not set first-party cookies. Google Analytics and Google AdSense may
            set third-party cookies. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites (such as mortgage lenders). We are not
            responsible for the privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-800 text-base mb-2">Contact</h2>
          <p>
            For privacy questions, contact us at:{" "}
            <a href="mailto:privacy@calcforge.com" className="text-brand-600 hover:underline">
              privacy@calcforge.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
