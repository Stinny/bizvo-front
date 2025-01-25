import React from 'react';

const Privacy = ({ lastUpdated, ViewSelect }) => {
  return (
    <div className="w-full flex flex-col gap-4 items-start border border-gray-200 rounded-md p-2">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <p className="text-md text-stone-800 font-semibold">Bizvo Docs</p>
          <p className="text-xs text-stone-800">Updated on {lastUpdated}</p>
        </div>
        <p className="text-xs text-stone-800 font-semibold">V1.0</p>
      </div>
      <div className="flex flex-col gap-4 items-start w-full text-left">
        <ViewSelect />
        <p className="text-sm text-stone-800 font-medium">Privacy Policy</p>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">1. Introduction</p>
          <p className="text-xs text-stone-800">
            At Bizvo, we are committed to protecting your privacy. This Privacy
            Policy outlines how we collect, use, and protect your information
            when you use our transaction-based invoicing software ("Service").
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            2. Information We Collect
          </p>
          <p className="text-xs text-stone-800 font-medium">Personal</p>
          <p className="text-xs text-stone-800">
            Includes your name, email address, payment details, and other data
            provided during account creation or transactions.
          </p>
          <p className="text-xs text-stone-800 font-medium">Transactions</p>
          <p className="text-xs text-stone-800">
            Details of transactions processed through our Service, including
            customer information and payment amounts.
          </p>
          <p className="text-xs text-stone-800 font-medium">Usage</p>
          <p className="text-xs text-stone-800">
            Information about how you use the Service, such as IP address,
            browser type, and activity logs.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            3. How We Use Your Information
          </p>
          <p className="text-xs text-stone-800">
            - Facilitate and process transactions as the merchant of record.
          </p>
          <p className="text-xs text-stone-800">
            - Provide, maintain, and improve the Service.
          </p>
          <p className="text-xs text-stone-800">
            - Communicate with you regarding account updates, transaction
            details, and customer support.
          </p>
          <p className="text-xs text-stone-800">
            - Comply with legal and regulatory obligations.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            4. Sharing Your Information
          </p>
          <p className="text-xs text-stone-800 font-medium">Payments</p>
          <p className="text-xs text-stone-800">
            Stripe, for processing transactions. Your information will be
            subject to Stripe’s Privacy Policy, available at [Stripe’s Privacy
            Policy URL].
          </p>
          <p className="text-xs text-stone-800 font-medium">Services</p>
          <p className="text-xs text-stone-800">
            Third-party vendors assisting in the operation of the Service, such
            as hosting, analytics, and transacional emails.
          </p>
          <p className="text-xs text-stone-800 font-medium">Legal</p>
          <p className="text-xs text-stone-800">
            Authorities or other parties when required to comply with legal
            obligations. This includes anything related to taxes.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">5. Data Security</p>
          <p className="text-xs text-stone-800">
            We implement appropriate technical and organizational measures to
            protect your data. However, no system is entirely secure, and we
            cannot guarantee absolute security.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">6. Rights</p>
          <p className="text-xs text-stone-800">
            Depending on your location, you may have rights to access, update,
            or delete your personal information. Contact us at [Your Email
            Address] to exercise these rights.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            7. Cookies and Tracking
          </p>
          <p className="text-xs text-stone-800">
            We use cookies and similar technologies to enhance user experience
            and analyze usage. You can manage your cookie preferences through
            your browser settings.
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">
            8. Updates to Policy
          </p>
          <p className="text-xs text-stone-800">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated "Effective Date."
          </p>
        </div>
        <div className="flex flex-col items-start w-full gap-2">
          <p className="text-xs text-stone-800 font-medium">9. Contact</p>
          <p className="text-xs text-stone-800">
            For questions about this policy, please contact justin@bizvo.io.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
