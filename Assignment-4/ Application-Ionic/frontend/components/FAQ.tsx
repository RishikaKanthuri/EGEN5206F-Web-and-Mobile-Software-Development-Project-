// app/components/FAQ.tsx
'use client'
import React, { useState } from 'react';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <div className="faq-item" onClick={() => toggleFAQ(0)}>
        <div className="faq-question">What is this hiring platform?</div>
        {open === 0 && <div className="faq-answer">Our hiring platform connects employers with potential employees through a streamlined application process.</div>}
      </div>
      <div className="faq-item" onClick={() => toggleFAQ(1)}>
        <div className="faq-question">How do I create an account?</div>
        {open === 1 && <div className="faq-answer">Click 'Sign Up' on our homepage and fill out the required details.</div>}
      </div>
    </div>
  );
}
