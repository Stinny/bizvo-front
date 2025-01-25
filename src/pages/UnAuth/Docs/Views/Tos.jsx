import React from 'react';

const Tos = ({ lastUpdated }) => {
  return (
    <div className="w-10/12 flex flex-col gap-4 items-start border border-gray-200 rounded-md p-2">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-md text-stone-800 font-semibold">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on {lastUpdated}</p>
        </div>
        <p className="text-xs text-stone-800 font-semibold">V1.0</p>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <p className="text-sm text-stone-800 font-medium">Terms of Service</p>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">1. Acceptance</p>
          <p className="text-xs text-stone-800">
            Welcome to Bizvo ("we," "us," or "our"). By accessing or using our
            invoicing software ("Service"), you agree to be bound by these Terms
            of Service ("Terms"). If you do not agree to these Terms, you may
            not use the Service.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            2. Description of Service
          </p>
          <p className="text-xs text-stone-800">
            Our Service provides tools to manage invoices, track payments, and
            facilitate transactions between you ("User") and your customers. We
            act as a merchant of record, reselling your services or products to
            your customers. We reserve the right to update or modify the Service
            at any time.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            3. User Responsibilities
          </p>
          <p className="text-xs text-stone-800">
            You agree to use the Service in compliance with all applicable laws
            and regulations. You are responsible for maintaining the
            confidentiality of your account and for all activities under your
            account. You must provide accurate and complete information when
            using the Service.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            4. Payment Processing
          </p>
          <p className="text-xs text-stone-800">
            We use Stripe as our payment processor. By using the Service, you
            agree to Stripe's terms and conditions, available at [Stripe’s Terms
            URL]. Transaction fees may apply and will be disclosed prior to each
            transaction. By initiating a transaction, you authorize us to
            process payments on your behalf.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            5. Intellectual Property
          </p>
          <p className="text-xs text-stone-800">
            All content, trademarks, and intellectual property related to the
            Service are owned by us or our licensors. You are granted a
            non-exclusive, non-transferable license to use the Service for its
            intended purpose.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            6. Limitation of Liability
          </p>
          <p className="text-xs text-stone-800">
            To the fullest extent permitted by law, we are not liable for any
            indirect, incidental, or consequential damages arising out of your
            use of the Service. Our total liability is limited to the amount of
            fees paid by you to us in the three months preceding the event
            giving rise to the claim.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">7. Termination</p>
          <p className="text-xs text-stone-800">
            We may suspend or terminate your access to the Service at our
            discretion, with or without notice, for violation of these Terms or
            other reasons.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">8. Governing Law</p>
          <p className="text-xs text-stone-800">
            These Terms are governed by the laws of [Your Jurisdiction], without
            regard to conflict of law principles.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">9. Contact</p>
          <p className="text-xs text-stone-800">
            For questions about these Terms, please contact justin@bizvo.io.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tos;
