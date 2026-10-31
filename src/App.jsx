import React, { useState } from 'react';
import { 
  BookOpen, Star, Send, Menu, X, ArrowRight, 
  Check, ChevronRight, ExternalLink, Search, ChevronDown, CheckCircle2, Loader2
} from 'lucide-react';

import logoImg from './assets/logo.jpeg';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState('amazon');
  const [openFaq, setOpenFaq] = useState(null);
  
  // Form state for professional AJAX handling
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookTitle: '',
    package: '',
    message: ''
  });

  const handleBookSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const encoded = encodeURIComponent(searchQuery);
    const url = searchTarget === 'amazon' 
      ? `https://www.amazon.com/s?k=${encoded}&i=stripbooks`
      : `https://www.goodreads.com/search?q=${encoded}`;
    window.open(url, '_blank');
  };

  // Professional AJAX Form submission handler (stays on your page, no redirect)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch("https://formspree.io/f/xeaarenn", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', bookTitle: '', package: '', message: '' });
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setErrorMessage(data.errors.map(error => error.message).join(", "));
        } else {
          setErrorMessage("Oops! There was a problem submitting your form.");
        }
        setFormStatus('error');
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.");
      setFormStatus('error');
    }
  };

  const stages = [
    { num: '01', title: 'Develop the book', desc: 'Clarify the manuscript\'s direction, intended reader, and editorial priorities. From writing and ghostwriting to developmental editing, I help identify the right support for your project.', tags: ['Book writing', 'Ghostwriting', 'Developmental editing'] },
    { num: '02', title: 'Prepare it for publication', desc: 'Shape the book\'s positioning and the details readers meet first: professional layout formatting, cover direction, metadata, and categories tailored for Amazon KDP success.', tags: ['Professional formatting', 'Amazon KDP setup', 'Category optimization'] },
    { num: '03', title: 'Launch it thoughtfully', desc: 'Build a launch or relaunch plan around your timing, resources, and the ways readers can genuinely encounter the book.', tags: ['Promotion & campaigns', 'Launch roadmap', 'Visibility strategy'] },
    { num: '04', title: 'Keep reaching readers and building sales', desc: 'Build a sustainable rhythm for author platform work, reader discovery, ongoing marketing, and Amazon keyword restructuring beyond launch week.', tags: ['Amazon keywords restructure', 'Author visibility', 'Ongoing PR'] }
  ];

  const packages = [
    {
      id: 'clarity',
      subtitle: 'A - CLARITY',
      name: 'The Book Positioning Review',
      desc: 'For the author who needs a clear way to describe the book and the reader it\'s for.',
      features: ['Positioning and audience review', 'Comparable title perspective', 'Prioritized recommendations']
    },
    {
      id: 'prepare',
      subtitle: 'B - PREPARE',
      name: 'The Book Page & Launch Plan',
      desc: 'For the upcoming or recently published book that needs a stronger page and a considered release plan.',
      popular: true,
      features: ['Book-page copy direction', 'Metadata and category review', 'Launch or relaunch roadmap']
    },
    {
      id: 'continue',
      subtitle: 'C - CONTINUE',
      name: 'Reader Discovery Partnership',
      desc: 'For authors ready to create an ongoing rhythm for reaching readers beyond launch week.',
      features: ['Author platform direction', 'Ethical review outreach planning', 'Ongoing marketing priorities']
    }
  ];

  const testimonials = [
    { name: 'David Vance', role: 'Fantasy Author', rating: '5.0', text: 'Lorena restructured my Amazon keywords and ran a targeted promo. My book jumped to #1 New Release in 48 hours!' },
    { name: 'Sarah Jenkins', role: 'Memoirist & Speaker', rating: '4.8', text: 'Her developmental editing gave my draft the crisp flow it desperately needed. Incredible attention to detail and patience!' },
    { name: 'Marcus Sterling', role: 'Business & Tech Writer', rating: '5.0', text: 'Working with Lorena was seamless. From layout formatting to KDP publishing, she handled everything with absolute professionalism.' },
    { name: 'Elena Rostova', role: 'Historical Fiction Novelist', rating: '4.6', text: 'The positioning review completely transformed how I marketed my second novel. Readers are finally finding and loving my work.' },
    { name: 'Julian Thorne', role: 'Sci-Fi Author', rating: '4.9', text: 'Finding someone who genuinely understands Amazon KDP algorithms and editorial polish is rare. Lorena is top-tier.' },
    { name: 'Amara Okafor', role: 'Self-Help & Wellness Writer', rating: '4.7', text: 'From my rough notes to a fully formatted, beautifully positioned bestseller page—Lorena made the entire publishing journey effortless.' }
  ];

  const faqs = [
    { q: 'How do we get started on my book project?', a: 'You can explore our starting points above and click "Ask about this starting point" or fill out the contact form below with details about your manuscript genre, word count, and goals. We will review your priorities and outline a custom scope.' },
    { q: 'Do I retain full rights to my book?', a: 'Yes, absolutely. All writing, editing, formatting, and publishing setups are done under your name and KDP account. You retain 100% of your publishing rights and royalties.' },
    { q: 'How long does a typical book marketing or publishing setup take?', a: 'Timelines vary based on the scope. A Book Positioning Review takes about 3 to 5 business days, whereas full publishing preparation and marketing campaigns can span 2 to 4 weeks.' },
    { q: 'What is Amazon keyword restructuring and why do I need it?', a: 'Amazon is a search engine for books. Keyword restructuring ensures your book appears in the most relevant sub-categories and search terms so high-intent readers can easily find your title.' },
    { q: 'Can you help if my book is only a rough draft or outline?', a: 'Yes! Our services span full book writing, ghostwriting, and developmental editing to help take your core concepts from rough notes all the way to a reader-ready manuscript.' }
  ];

  const handlePackageSelect = (pkgName) => {
    const subject = encodeURIComponent(`Inquiry regarding: ${pkgName}`);
    const body = encodeURIComponent(`Hi Lorena,\n\nI am interested in the following starting point: "${pkgName}".\n\nHere is a little more about my book/project:\n`);
    window.location.href = `mailto:lorenaclowerss1@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 sm:gap-3">
            <img 
              src={logoImg} 
              alt="Lorena J. Clowers Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#D4AF37]/50 shadow-sm shrink-0"
            />
            <span className="font-bold text-xs sm:text-sm tracking-wider sm:tracking-widest text-[#070B19] truncate">LORENA J. CLOWERS</span>
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700">
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
            <a href="#process" className="hover:text-[#D4AF37] transition-colors">Process</a>
            <a href="#packages" className="hover:text-[#D4AF37] transition-colors">Services</a>
            <a href="#finder" className="hover:text-[#D4AF37] transition-colors">Book Finder</a>
            <a href="#testimonials" className="hover:text-[#D4AF37] transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-[#D4AF37] transition-colors">FAQ</a>
            <a href="#contact" className="px-5 py-2.5 rounded-full bg-[#070B19] text-[#D4AF37] font-bold hover:bg-black transition-all">Start Your Note</a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#070B19] p-2 focus:outline-none">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-b border-black/5 px-6 py-6 flex flex-col gap-4 text-gray-800 font-medium shadow-xl">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="py-1">About</a>
            <a href="#process" onClick={() => setIsMenuOpen(false)} className="py-1">Process</a>
            <a href="#packages" onClick={() => setIsMenuOpen(false)} className="py-1">Services</a>
            <a href="#finder" onClick={() => setIsMenuOpen(false)} className="py-1">Book Finder</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="py-1">Testimonials</a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)} className="py-1">FAQ</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="py-2.5 text-center rounded-full bg-[#070B19] text-[#D4AF37] font-bold">Start Your Note</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto border-b border-black/5">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-3 sm:mb-4 block">Professional Book Marketing & Full Services</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-6">
              From an early manuscript to a book already on sale, I'll help identify what needs attention now and build a practical path toward publication, reader discovery, and sustainable sales.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#contact" className="px-6 py-3.5 rounded-full bg-[#1A8754] text-white font-medium hover:bg-[#156d44] transition-all flex items-center justify-center gap-2 text-center">
                Tell me about your book <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#finder" className="px-6 py-3.5 rounded-full border border-black/20 text-gray-800 font-medium hover:bg-black/5 transition-all flex items-center justify-center gap-2 text-center">
                Explore the work <ChevronRight className="w-4 h-4 text-[#1A8754]" />
              </a>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-md rounded-2xl bg-[#070B19] p-6 sm:p-8 text-white shadow-2xl border border-[#D4AF37]/30 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-amber-200 shadow-lg mb-4">
                <img 
                  src={logoImg} 
                  alt="Lorena J. Clowers Logo" 
                  className="w-full h-full rounded-full object-cover border-2 border-[#070B19]"
                />
              </div>
              <h3 className="font-serif font-bold text-xl mb-1">Lorena J. Clowers</h3>
              <p className="text-xs text-[#D4AF37] uppercase tracking-widest mb-4">Bestseller Strategist & Marketer</p>
              <p className="text-gray-300 text-sm sm:text-base italic mb-6 leading-relaxed">
                "Marketing can feel like one more job after the hardest one. It gets easier when the plan starts with your book, your readers, and your real capacity."
              </p>
              <div className="w-full pt-4 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-gray-400 gap-2">
                <span>7 Years Experience</span>
                <span className="text-[#1A8754] font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Amazon Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL QUOTE BANNER */}
      <section className="py-12 sm:py-16 bg-[#F4EFE6] border-b border-black/5 px-4 sm:px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-[#1A8754] font-bold mb-3">A Note For Authors</p>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-serif max-w-3xl mx-auto leading-relaxed">
          Marketing can feel like one more job after the hardest one. It gets easier when the plan starts with <span className="text-[#1A8754] italic">your book</span>, <span className="text-[#1A8754] italic">your readers</span>, and <span className="text-[#1A8754] italic">your real capacity</span>.
        </h2>
      </section>

      {/* PROCESS / WORK MADE SPECIFIC SECTION */}
      <section id="process" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 border-b border-black/5">
        <div className="mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">The Work, Made Specific</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mt-2">From first draft to long-term discovery.</h2>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {stages.map((stg) => (
            <div key={stg.num} className="grid md:grid-cols-12 gap-4 sm:gap-6 pb-10 sm:pb-12 border-b border-black/10 items-start">
              <div className="md:col-span-1 text-xl sm:text-2xl font-serif text-[#1A8754] font-semibold">{stg.num}</div>
              <div className="md:col-span-7">
                <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2 sm:mb-3">{stg.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{stg.desc}</p>
              </div>
              <div className="md:col-span-4 flex flex-wrap gap-2 justify-start md:justify-end mt-2 md:mt-0">
                {stg.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-black/5 rounded-md text-xs text-gray-700 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs sm:text-sm text-gray-500 italic leading-relaxed">
          * The work can begin wherever you are. If a project calls for specialized editorial or ghostwriting support, I'll help define that need and include it in the agreed scope. No one-size-fits-all checklist, and no promises of bestseller status without real foundations.
        </p>
      </section>

      {/* ABOUT BEHIND THE WORK */}
      <section id="about" className="py-16 sm:py-24 bg-[#F4EFE6]/50 border-b border-black/5 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 sm:gap-12 items-center">
          <div className="md:col-span-5 bg-[#070B19] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#D4AF37]/30 text-center flex flex-col items-center">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-amber-200 shadow-lg mb-4">
              <img 
                src={logoImg} 
                alt="Lorena J. Clowers Logo" 
                className="w-full h-full rounded-full object-cover border-2 border-[#070B19]"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold">LORENA J. CLOWERS</h3>
            <p className="text-xs text-[#D4AF37] uppercase tracking-widest mt-1">Book Marketing Specialist</p>
          </div>
          <div className="md:col-span-7">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">A Little About The Person Behind The Work</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-2 mb-4 sm:mb-6">I'm Lorena J. Clowers.</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              With over 7 years of hands-on experience in book publishing and marketing, I empower authors to transform their manuscripts into Amazon bestsellers. My comprehensive services span full manuscript writing, developmental editing, professional formatting, and strategic Amazon keyword restructuring.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              I can support you from manuscript direction and editorial priorities through positioning and publication preparation—then into launch, reader discovery, and the practical work that helps books keep finding readers.
            </p>
          </div>
        </div>
      </section>

      {/* WAYS TO WORK TOGETHER (PACKAGES / QUOTES) */}
      <section id="packages" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 border-b border-black/5">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#1A8754] font-bold">Ways To Work Together</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mt-2">A useful starting point. A scope built around you.</h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto">These are focused starting points, not the full-service menu. I can also begin with manuscript direction or publication preparation and shape the scope around your book and priorities.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between border ${pkg.popular ? 'bg-[#070B19] text-white border-[#D4AF37] shadow-2xl md:scale-105' : 'bg-white text-[#1A1A1A] border-black/10'}`}
            >
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest ${pkg.popular ? 'text-[#D4AF37]' : 'text-gray-500'}`}>{pkg.subtitle}</span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold mt-2 mb-3">{pkg.name}</h3>
                <p className={`text-sm mb-6 leading-relaxed ${pkg.popular ? 'text-gray-300' : 'text-gray-600'}`}>{pkg.desc}</p>
                
                <ul className="space-y-3 mb-8 text-sm">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 shrink-0 ${pkg.popular ? 'text-[#D4AF37]' : 'text-[#1A8754]'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePackageSelect(pkg.name)}
                className={`w-full py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  pkg.popular 
                    ? 'bg-[#D4AF37] text-[#070B19] hover:bg-[#e6c55c]' 
                    : 'bg-[#070B19] text-white hover:bg-black'
                }`}
              >
                Ask about this starting point <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION (With Professional Rating Badges) */}
      <section id="testimonials" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 border-b border-black/5 bg-[#FDFBF7]">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#1A8754] font-bold">Success Stories</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mt-2">Trusted by Authors Worldwide</h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-xl mx-auto">Read what independent and established writers say about their publishing and marketing journey.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-amber-800">{t.rating} / 5.0 Rating</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-6 leading-relaxed">"{t.text}"</p>
              </div>
              <div className="pt-4 border-t border-black/5">
                <h4 className="font-serif font-bold text-[#070B19]">{t.name}</h4>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 border-b border-black/5">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#1A8754] font-bold">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mt-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3">Everything you need to know about working together and our publishing process.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-black/10 rounded-2xl bg-white overflow-hidden transition-all">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 text-left font-serif font-bold text-base sm:text-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.02]"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === idx ? 'rotate-180 text-[#1A8754]' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-black/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOOK FINDER WIDGET */}
      <section id="finder" className="py-16 sm:py-20 bg-[#070B19] text-white px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">A Quick Way To Find A Book</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mt-2 mb-4">Start with a book you have in mind.</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Enter a title, author, or ISBN, then choose Amazon or Goodreads. The selected site opens in a new tab, where you can browse its current listings and open the exact book page.
            </p>
            <p className="text-xs text-gray-400">
              * Searches go directly to Amazon or Goodreads. This page does not collect or copy catalog results.
            </p>
          </div>

          <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10">
            <form onSubmit={handleBookSearch} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Book title, author or ISBN</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Atomic Habits or James Clear" 
                    className="w-full px-4 py-3.5 rounded-xl bg-white text-gray-900 text-sm focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Choose where to search</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSearchTarget('amazon')}
                    className={`p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${searchTarget === 'amazon' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white' : 'border-white/10 text-gray-400'}`}
                  >
                    <span>Amazon Books</span>
                    <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchTarget('goodreads')}
                    className={`p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${searchTarget === 'goodreads' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white' : 'border-white/10 text-gray-400'}`}
                  >
                    <span>Goodreads</span>
                    <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-[#1A8754] text-white font-bold hover:bg-[#156d44] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Search <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACT / FORM SECTION (Professional AJAX State Handling) */}
      <section id="contact" className="py-16 sm:py-24 bg-[#070B19] text-white border-t border-white/10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Your Book's Next Chapter</span>
              <h2 className="text-2xl sm:text-3xl font-serif mt-2 mb-4 sm:mb-6">Let's start with the real question.</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Not sure what kind of support you need? Tell me where you are with the book, and I'll help identify a useful next step.
              </p>
              
              <div className="space-y-3 text-sm text-gray-300">
                <p className="font-bold text-white mb-2">What happens after you reach out?</p>
                <div className="flex gap-3 items-start"><span className="text-[#D4AF37] font-bold">01</span> Share where you are with the book and what feels challenging.</div>
                <div className="flex gap-3 items-start"><span className="text-[#D4AF37] font-bold">02</span> I review your priorities and suggest a practical next step.</div>
                <div className="flex gap-3 items-start"><span className="text-[#D4AF37] font-bold">03</span> You receive a clear scope and quote before any work begins.</div>
              </div>

              <div className="mt-8">
                <p className="text-xs text-gray-400 uppercase">Prefer Email?</p>
                <a href="mailto:lorenaclowerss1@gmail.com" className="text-[#D4AF37] font-mono text-sm underline mt-1 block break-all">
                  lorenaclowerss1@gmail.com
                </a>
              </div>
            </div>

            {/* Professional AJAX Form Box */}
            <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10">
              {formStatus === 'success' ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#1A8754]/20 text-[#1A8754] rounded-full flex items-center justify-center mx-auto border border-[#1A8754]/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white">Note Received Successfully!</h3>
                  <p className="text-gray-300 text-sm max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. Lorena will review your message and get back to your inbox shortly.
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {formStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Your name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      value={formData.name} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#D4AF37]" 
                      placeholder="Author Name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Email address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required 
                      value={formData.email} 
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#D4AF37]" 
                      placeholder="author@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Book title (if you have one)</label>
                    <input 
                      type="text" 
                      name="bookTitle"
                      value={formData.bookTitle} 
                      onChange={e => setFormData({ ...formData, bookTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#D4AF37]" 
                      placeholder="Book title or working title"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Package or starting point</label>
                    <input 
                      type="text" 
                      name="package"
                      readOnly 
                      value={formData.package || 'Custom / None Selected'} 
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm cursor-not-allowed" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">A little more about it *</label>
                    <textarea 
                      name="message"
                      rows="4" 
                      required 
                      value={formData.message} 
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#D4AF37]" 
                      placeholder="A few lines about where you are with the book is plenty..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-4 rounded-xl bg-[#1A8754] text-white font-bold hover:bg-[#156d44] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending note...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send your note
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-[#04060E] border-t border-white/10 text-center text-xs text-gray-500 px-4">
        <p>© 2026 Lorena J. Clowers. All Rights Reserved. Professional Book Marketing Services.</p>
      </footer>

    </div>
  );
}
