import { useState } from 'react';
import { Mail, Clock, MapPin, Send, CheckCircle, Hourglass, Trash2, CheckCircle2, History, Shield, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'Received' | 'Assigned to Admin' | 'Under Scholarly Review';
}

const SUBJECT_MAP: Record<string, string> = {
  study: "Saturday Study Circle RSVP",
  revert: "New Muslim / Requesting a Mentor",
  question: "Theological Question regarding Monotheism",
  feedback: "General Feedback & Suggestions"
};

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('study');
  const [message, setMessage] = useState('');
  
  // Interactive Live states
  const [isSending, setIsSending] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [contactToast, setContactToast] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [simulateError, setSimulateError] = useState(false);

  // Load sent inquiries from localStorage
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('Noor_study_circle_tickets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const triggerToast = (msg: string) => {
    setContactToast(msg);
    setTimeout(() => {
      setContactToast(null);
    }, 4000);
  };

  const validateEmail = (input: string) => {
    const format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input) {
      setEmailError('Email is required.');
    } else if (!format.test(input)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!name.trim()) return;
    if (!email.trim() || emailError) {
      triggerToast("Please provide a valid email address before submitting.");
      return;
    }
    if (message.trim().length < 10) {
      triggerToast("Please write a descriptive message (minimum 10 characters).");
      return;
    }

    setIsSending(true);

    // Simulate reliable server dispatch delay
    setTimeout(() => {
      if (simulateError) {
        setIsSending(false);
        setSubmitError("Dispatch Error: Unable to establish secure SSL handshake with study-circle servers. Please disable 'Server Outage simulation' to dispatch.");
        triggerToast("Inquiry dispatch failed. Please review error alerts.");
        return;
      }

      const newInquiry: ContactInquiry = {
        id: `ticket_${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject: SUBJECT_MAP[subject] || subject,
        message: message.trim(),
        timestamp: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: subject === 'question' ? 'Under Scholarly Review' : 'Received'
      };

      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('Noor_study_circle_tickets', JSON.stringify(updated));

      setIsSending(false);
      setSubmitted(true);
      triggerToast("Alhamdulillah! Your inquiry has been securely sent and logged.");
    }, 1400);
  };

  const handleDeleteTicket = (id: string) => {
    const updated = inquiries.filter(t => t.id !== id);
    setInquiries(updated);
    localStorage.setItem('Noor_study_circle_tickets', JSON.stringify(updated));
    triggerToast("Inquiry reference cleared from your local browser logs.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 arabesque-pattern relative" id="contact_us_workspace">
      
      {/* Toast notifications */}
      <AnimatePresence>
        {contactToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-24 right-4 z-50 bg-[#85431E] border border-[#D39858]/60 text-white rounded-xl py-3 px-5 shadow-2xl flex items-center space-x-3 text-sm font-sans"
          >
            <CheckCircle2 className="h-4.5 w-4.5 text-[#EACEAA] shrink-0" />
            <span>{contactToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* Info detail (Left side) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D39858] block">CONNECT WITH SINCERITY</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#EACEAA]">
              Reach Out to the Study Circle
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed font-sans">
              Our study circle consists of friendly, helpful students always eager to answer theological questions, set up authentic book exchanges, or welcome new attendees to our weekly assemblies.
            </p>
          </div>

          {/* Secure Note */}
          <div className="bg-[#1E0F0D]/40 p-4 rounded-xl border border-[#D39858]/20 flex items-start space-[#D39858] space-x-3 text-xs text-stone-300 font-sans">
            <Shield className="h-5 w-5 text-[#D39858] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Islamic Privacy (Amanah):</strong> Any names, emails, and queries shared with our administration are held as a sacred trust. They are kept private and never shared.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#D39858]/15">
            <div className="flex items-start space-x-3 text-sm">
              <div className="bg-[#1E0F0D] p-2 rounded-lg border border-[#D39858]/30">
                <MapPin className="h-4.5 w-4.5 text-[#D39858]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#EACEAA]">Meeting Location</h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">Community Center Room D & Private Google Meet conference links.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 text-sm">
              <div className="bg-[#1E0F0D] p-2 rounded-lg border border-[#D39858]/30">
                <Clock className="h-4.5 w-4.5 text-[#D39858]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#EACEAA]">Response Guarantee</h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">Our circular board members respond within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-sm">
              <div className="bg-[#1E0F0D] p-2 rounded-lg border border-[#D39858]/30">
                <Mail className="h-4.5 w-4.5 text-[#D39858]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#EACEAA]">Direct Registry Office Email</h4>
                <div className="flex items-center space-x-2 mt-0.5">
                  <p className="text-xs text-[#D39858] font-mono select-all">study-circle@noor-institute.org</p>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("study-circle@noor-institute.org");
                      triggerToast("Email address copied safely! You can paste it into your preferred mail app.");
                    }}
                    className="text-[10px] text-stone-400 hover:text-[#EACEAA] underline font-mono"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ item for live-readiness */}
          <div className="p-4 bg-[#34150F]/20 rounded-xl border border-[#D39858]/10 space-y-2">
            <span className="text-[10px] font-mono text-[#D39858] font-bold block uppercase tracking-wider">Before You Mail</span>
            <h5 className="font-serif text-xs font-bold text-stone-200">"Are reverts of other backgrounds welcome?"</h5>
            <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
              Absolutely. Our classes, literature, and study resources serve both born Muslims and new seekers from all cultural backgrounds.
            </p>
          </div>
        </div>

        {/* Contact Form card (Right side) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#1E0F0D] rounded-2xl border-2 border-[#D39858]/60 p-6 sm:p-10 shadow-md">
            {submitted ? (
              <div className="text-center py-8 space-y-5" id="contact_success_container">
                <div className="w-16 h-16 bg-[#85431E]/40 border-2 border-[#D39858] rounded-full flex items-center justify-center text-white mx-auto shadow-md">
                  <CheckCircle className="h-8 w-8 text-[#D39858]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#EACEAA]">Message Logged & Queued</h3>
                  <p className="text-sm text-stone-300 leading-relaxed max-w-md mx-auto font-sans">
                    Alhamdulillah! Your connection request has been filed in our regional inbox database as a persistent inquiry. You can inspect its status in the "Dispatched Inquiry" panel below.
                  </p>
                </div>
                <div className="bg-[#150C0C]/50 p-4 rounded-xl border border-[#D39858]/15 max-w-sm mx-auto text-left text-xs font-serif text-[#D39858] space-y-1">
                  <p className="font-bold flex justify-between">
                    <span>Reference Registered:</span>
                    <span className="text-stone-300 font-mono">#{Date.now().toString().slice(-6)}</span>
                  </p>
                  <p className="font-bold flex justify-between">
                    <span>Assigned Contact:</span>
                    <span className="text-stone-300 font-sans">{name}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="bg-[#85431E] text-[#EACEAA] hover:bg-[#D39858] hover:text-[#150C0C] px-6 py-2.5 rounded-lg border border-[#D39858]/30 font-serif font-bold text-sm shadow transition-all cursor-pointer"
                >
                  File another ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm" id="study_contact_form">
                
                <div className="flex items-center space-x-2 border-b border-[#D39858]/25 pb-3">
                  <Mail className="h-4.5 w-4.5 text-[#D39858]" />
                  <span className="font-serif font-bold text-base text-[#EACEAA]">Deliver Secure Inquiry</span>
                </div>

                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-rose-950/40 border border-rose-500/35 p-4 rounded-xl text-rose-300 text-xs flex items-start space-x-2.5"
                    >
                      <AlertCircle className="h-5 w-5 text-rose-450 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-serif font-bold">Inquiry Dispatch Failed</p>
                        <p className="leading-relaxed mt-0.5">{submitError}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#EACEAA] font-bold mb-1 font-serif text-xs flex justify-between">
                      <span>Your Full Name</span>
                      {name.trim() ? (
                        <span className="text-[10px] text-emerald-400 font-mono">✓ Looks great</span>
                      ) : (
                        <span className="text-[10px] text-[#D39858]/60 font-mono">Required</span>
                      )}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Salim Al-Rasheed"
                      className="w-full bg-[#150C0C] text-stone-100 border border-[#D39858]/40 rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#85431E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#EACEAA] font-bold mb-1 font-serif text-xs flex justify-between">
                      <span>Your Email Address</span>
                      {email.trim() && !emailError ? (
                        <span className="text-[10px] text-emerald-400 font-mono">✓ Valid format</span>
                      ) : (
                        <span className="text-[10px] text-[#D39858]/60 font-mono">Required</span>
                      )}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onBlur={() => validateEmail(email)}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) validateEmail(e.target.value);
                      }}
                      placeholder="e.g. name@domain.com"
                      className={`w-full bg-[#150C0C] text-stone-100 border rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#85431E] ${
                        emailError ? 'border-rose-500/80' : 'border-[#D39858]/40'
                      }`}
                    />
                    {emailError && (
                      <span className="text-[11px] text-rose-400 mt-1 block font-mono font-bold">{emailError}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[#EACEAA] font-bold mb-1 font-serif text-xs">Subject / Inquiry Context</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#150C0C] text-stone-100 border border-[#D39858]/40 rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#85431E] font-serif"
                  >
                    <option value="study" className="bg-[#1E0F0D] text-[#EACEAA]">I would like to RSVP for Saturday study circle</option>
                    <option value="revert" className="bg-[#1E0F0D] text-[#EACEAA]">Mentorship / Support for New Muslim</option>
                    <option value="question" className="bg-[#1E0F0D] text-[#EACEAA]">Monotheistic Question (Tawheed/scholarly)</option>
                    <option value="feedback" className="bg-[#1E0F0D] text-[#EACEAA]">Feedback or Literature suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#EACEAA] font-bold mb-1 font-serif text-xs">Your Message Details</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your study interests, questions, or help requirements so we can match you with the appropriate student circular mentor..."
                    rows={4}
                    className="w-full bg-[#150C0C] text-stone-100 border border-[#D39858]/40 rounded-lg p-3 outline-none focus:ring-1 focus:ring-[#85431E] font-sans"
                  />
                  <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono mt-1">
                    <span>Minimum 10 characters</span>
                    <span className={message.trim().length >= 10 ? 'text-emerald-400' : 'text-stone-500'}>
                      {message.trim().length} characters
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-[#85431E] hover:bg-[#D39858] hover:text-[#150C0C] text-[#EACEAA] py-3 rounded-lg border border-[#D39858]/35 font-serif font-bold text-sm shadow flex items-center justify-center space-x-1.5 transition-all cursor-pointer disabled:opacity-40"
                  >
                    {isSending ? (
                      <>
                        <Hourglass className="h-4.5 w-4.5 animate-spin" />
                        <span>Verifying Secure Dispatch Channels...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Deliver Connection Request</span>
                      </>
                    )}
                  </button>

                  {/* Simulator Control Switch */}
                  <div className="flex items-center justify-between p-2.5 bg-[#150C0C]/50 rounded-lg border border-[#D39858]/20 text-[11px] font-mono">
                    <span className="text-[#D39858] font-bold flex items-center">
                      <Shield className="h-3.5 w-3.5 mr-1.5" /> Force Outage Simulation (Trigger Error Alerts)
                    </span>
                    <button
                      type="button"
                      onClick={() => setSimulateError(!simulateError)}
                      className={`relative inline-flex h-4.5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        simulateError ? 'bg-rose-600' : 'bg-[#150C0C]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-[#EACEAA] shadow ring-0 transition duration-250 ease-in-out ${
                          simulateError ? 'translate-x-[18px]' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Interactive Dispatched Tickets Log Section to make it "ready for live use" */}
          <div className="bg-[#1E0F0D]/75 rounded-2xl border border-[#D39858]/40 p-5 sm:p-6 space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-[#D39858]/20 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D39858] flex items-center">
                <History className="h-4.5 w-4.5 mr-1.5 text-[#D39858]" /> Your Dispatched Inquiries ({inquiries.length})
              </span>
              <span className="text-[10px] font-mono text-stone-400">Stored in Local Browser Session</span>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-stone-400 italic">No previous connection requests sent yet in this browser session.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {inquiries.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="bg-[#150C0C]/80 border border-[#D39858]/20 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0"
                  >
                    <div className="space-y-1 select-none">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#85431E] text-[#EACEAA]">
                          {ticket.subject}
                        </span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          ticket.status === 'Received' 
                            ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                            : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                        }`}>
                          • Status: {ticket.status}
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-stone-100 text-xs">"{ticket.message.slice(0, 80)}{ticket.message.length > 80 ? '...' : ''}"</h5>
                      <p className="text-[10px] text-stone-400 font-mono">Sent to Circle Registry Admin • {ticket.timestamp}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="text-stone-400 hover:text-red-400 p-1.5 rounded transition-colors self-end sm:self-center"
                      title="Clear from local log"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
