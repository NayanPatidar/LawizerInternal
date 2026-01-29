/* =========================
   CATEGORY → SERVICES
========================= */

export const SERVICES_BY_CATEGORY: Record<string, string[]> = {
  Property: [
    "Property Report",
    "Property Paper Review",
    "Property Registration",
    "Gift Deed Registration",
    "Power of Attorney Registration",
  ],
  Drafting: [
    "Sale Deed Drafting",
    "Agreement to Sale Drafting",
    "Will Drafting",
    "Power of Attorney Drafting",
  ],
  Financial: ["Loan Agreement", "Cheque Dishonour Cases"],
};

export const SERVICE_DOCUMENT_TEMPLATES: Record<string, string[]> = {
  /* =========================
     PROPERTY SERVICES
  ========================= */

  "Property Report": [
    "Sale Deed Copy",
    "Property Tax Receipt",
    "Encumbrance Certificate",
  ],

  "Property Paper Review": [
    "Draft Sale Deed",
    "Mother Deed",
    "Previous Chain Documents",
  ],

  "Property Registration": [
    "Final Sale Deed",
    "Buyer Aadhaar Card",
    "Buyer PAN Card",
    "Seller Aadhaar Card",
    "Seller PAN Card",
    "Property Tax Receipt",
    "Encumbrance Certificate",
  ],

  "Gift Deed Registration": [
    "Draft Gift Deed",
    "Donor Aadhaar Card",
    "Donor PAN Card",
    "Donee Aadhaar Card",
    "Donee PAN Card",
    "Property Documents",
  ],

  "Power of Attorney Registration": [
    "Draft Power of Attorney",
    "Principal Aadhaar Card",
    "Principal PAN Card",
    "Attorney Aadhaar Card",
    "Attorney PAN Card",
  ],

  /* =========================
     DRAFTING SERVICES
  ========================= */

  "Sale Deed Drafting": [
    "Property Details",
    "Seller Aadhaar Card",
    "Seller PAN Card",
    "Buyer Aadhaar Card",
    "Buyer PAN Card",
    "Previous Sale Deed",
  ],

  "Agreement to Sale Drafting": [
    "Property Details",
    "Seller Aadhaar Card",
    "Seller PAN Card",
    "Buyer Aadhaar Card",
    "Buyer PAN Card",
    "Payment Terms",
  ],

  "Will Drafting": [
    "Testator Aadhaar Card",
    "Testator PAN Card",
    "Property Details",
    "Beneficiary Details",
  ],

  "Power of Attorney Drafting": [
    "Principal Aadhaar Card",
    "Principal PAN Card",
    "Attorney Aadhaar Card",
    "Attorney PAN Card",
    "Purpose Description",
  ],

  /* =========================
     FINANCIAL / DISPUTE
  ========================= */

  "Loan Agreement": [
    "Borrower Aadhaar Card",
    "Borrower PAN Card",
    "Lender Aadhaar Card",
    "Lender PAN Card",
    "Loan Amount & Terms",
  ],

  "Cheque Dishonour Cases": [
    "Cheque Copy",
    "Bank Return Memo",
    "Legal Notice Copy",
    "Complainant Aadhaar Card",
    "Complainant PAN Card",
  ],
};
