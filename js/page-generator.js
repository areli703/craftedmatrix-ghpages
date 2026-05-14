/**
 * CRAFTED MATRIX - Local SEO Page Generator
 * Generates city + service combination pages for maximum local SEO coverage
 */

// Service definitions with SEO-optimized content
const SERVICES = {
  'web-design': {
    name: 'Web Design',
    headline: 'Custom Web Design That Converts Visitors Into Customers',
    description: 'Professional, fast-loading websites built to rank on Google and turn visitors into paying customers.',
    features: [
      'Mobile-first responsive design',
      'SEO-optimized page structure',
      'Lightning-fast load times',
      'Conversion-focused layouts',
      'Custom branding & graphics'
    ],
    benefits: [
      'Rank higher on Google in {city}',
      'Convert more visitors into leads',
      'Build trust with professional design',
      'Stand out from competitors'
    ],
    schemaType: 'WebDesignService'
  },
  'ai-chatbots': {
    name: 'AI Chatbots',
    headline: '24/7 AI Chatbots Trained on Your Business',
    description: 'Custom AI assistants that answer questions, capture leads, and book appointments around the clock.',
    features: [
      'Trained on your specific business data',
      '24/7 automated lead capture',
      'Instant response to customer questions',
      'Integration with your CRM',
      'Multi-language support'
    ],
    benefits: [
      'Never miss another lead',
      'Respond to customers instantly',
      'Reduce support workload',
      'Capture leads while you sleep'
    ],
    schemaType: 'SoftwareApplication'
  },
  'seo-services': {
    name: 'SEO Services',
    headline: 'Rank #1 on Google in {city}',
    description: 'Data-driven SEO strategies to dominate local search results and drive qualified traffic to your business.',
    features: [
      'Local SEO optimization',
      'Google Business Profile management',
      'On-page & technical SEO',
      'Content strategy & creation',
      'Link building & citations'
    ],
    benefits: [
      'Appear at the top of Google searches',
      'Get more calls and website visits',
      'Outrank your local competitors',
      'Build long-term organic traffic'
    ],
    schemaType: 'ProfessionalService'
  },
  'business-automation': {
    name: 'Business Automation',
    headline: 'Automate Your Business, Scale Without Hiring',
    description: 'Smart automation systems that handle repetitive tasks, follow up with leads, and streamline your operations.',
    features: [
      'Automated follow-up sequences',
      'CRM integration & management',
      'Review generation automation',
      'Appointment scheduling',
      'Workflow optimization'
    ],
    benefits: [
      'Save 10+ hours per week',
      'Never forget to follow up',
      'Scale without adding staff',
      'Improve customer experience'
    ],
    schemaType: 'ProfessionalService'
  },
  'mobile-apps': {
    name: 'Mobile Apps',
    headline: 'Custom Mobile Apps for Your Business',
    description: 'Native and cross-platform mobile applications that keep your customers engaged and your brand top-of-mind.',
    features: [
      'iOS & Android development',
      'Custom UI/UX design',
      'Push notifications',
      'In-app purchases',
      'API integrations'
    ],
    benefits: [
      'Stay in customers\' pockets',
      'Increase customer loyalty',
      'Enable mobile bookings/sales',
      'Stand out from competitors'
    ],
    schemaType: 'MobileApplication'
  },
  'digital-marketing': {
    name: 'Digital Marketing',
    headline: 'Full-Service Digital Marketing That Drives ROI',
    description: 'Comprehensive digital marketing strategies including PPC, social media, email, and content marketing.',
    features: [
      'Google Ads management',
      'Social media marketing',
      'Email marketing campaigns',
      'Content creation',
      'Performance analytics'
    ],
    benefits: [
      'Get immediate leads with PPC',
      'Build brand awareness',
      'Nurture leads automatically',
      'Track every dollar spent'
    ],
    schemaType: 'ProfessionalService'
  }
};

// Major US cities by state for local SEO targeting
const LOCATIONS = {
  'Virginia': [
    'Woodbridge', 'Alexandria', 'Arlington', 'Fairfax', 'Manassas', 'Fredericksburg',
    'Richmond', 'Virginia Beach', 'Norfolk', 'Chesapeake', 'Newport News',
    'Hampton', 'Roanoke', 'Portsmouth', 'Suffolk', 'Lynchburg', 'Harrisonburg',
    'Charlottesville', 'Danville', 'Blacksburg', 'McLean', 'Tysons', 'Reston',
    'Herndon', 'Chantilly', 'Centreville', 'Burke', 'Springfield', 'Falls Church',
    'Vienna', 'Oakton', 'Great Falls', 'Leesburg', 'Ashburn', 'Sterling',
    'Purcellville', 'Middleburg', 'Warrenton', 'Culpeper', 'Stafford'
  ],
  'Maryland': [
    'Baltimore', 'Annapolis', 'Bethesda', 'Silver Spring', 'Rockville', 'Gaithersburg',
    'Frederick', 'Columbia', 'Germantown', 'Waldorf', 'Ellicott City', 'Towson',
    'Bowie', 'Hagerstown', 'College Park', 'Laurel', 'Greenbelt', 'Hyattsville',
    'Takoma Park', 'Chevy Chase', 'Kensington', 'Potomac', 'Olney', 'Clarksburg',
    'Urbana', 'Mount Airy', 'Westminster', 'Eldersburg', 'Sykesville'
  ],
  'Washington DC': [
    'Washington', 'Georgetown', 'Dupont Circle', 'Capitol Hill', 'Adams Morgan',
    'Foggy Bottom', 'Navy Yard', 'Shaw', 'Columbia Heights', 'Petworth'
  ],
  'Pennsylvania': [
    'Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton',
    'Bethlehem', 'Lancaster', 'Harrisburg', 'Altoona', 'York', 'State College'
  ],
  'North Carolina': [
    'Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville',
    'Cary', 'Wilmington', 'High Point', 'Greenville', 'Asheville', 'Concord'
  ],
  'Florida': [
    'Miami', 'Orlando', 'Tampa', 'Jacksonville', 'St. Petersburg', 'Hialeah',
    'Tallahassee', 'Fort Lauderdale', 'Port St. Lucie', 'Cape Coral', 'Pembroke Pines',
    'Hollywood', 'Miramar', 'Gainesville', 'Coral Springs', 'Miami Gardens',
    'West Palm Beach', 'Clearwater', 'Palm Bay', 'Lakeland', 'Pompano Beach'
  ],
  'Texas': [
    'Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso',
    'Arlington', 'Corpus Christi', 'Plano', 'Laredo', 'Lubbock', 'Garland',
    'Irving', 'Amarillo', 'Grand Prairie', 'Brownsville', 'Pasadena', 'McKinney',
    'Mesquite', 'McAllen', 'Killeen', 'Frisco', 'Waco', 'Carrollton', 'Denton'
  ],
  'California': [
    'Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento',
    'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside',
    'Stockton', 'Irvine', 'Chula Vista', 'Fremont', 'San Bernardino', 'Modesto',
    'Fontana', 'Oxnard', 'Moreno Valley', 'Huntington Beach', 'Glendale', 'Santa Clarita'
  ],
  'New York': [
    'New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany',
    'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica', 'White Plains',
    'Hempstead', 'Troy', 'Niagara Falls', 'Binghamton', 'Freeport', 'Valley Stream'
  ],
  'Georgia': [
    'Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens', 'Sandy Springs',
    'Roswell', 'Macon', 'Johns Creek', 'Albany', 'Warner Robins', 'Alpharetta',
    'Marietta', 'Valdosta', 'Smyrna', 'Dunwoody', 'Peachtree City'
  ]
};

// Generate URL-friendly slug
function generateSlug(city, service) {
  return `${service}-${city.toLowerCase().replace(/\s+/g, '-')}`;
}

// Generate meta description
function generateMetaDescription(city, state, serviceKey) {
  const service = SERVICES[serviceKey];
  return `Top-rated ${service.name} in ${city}, ${state}. ${service.description} Get a free consultation today. Serving ${city} businesses since 2019.`;
}

// Generate page title
function generatePageTitle(city, state, serviceKey) {
  const service = SERVICES[serviceKey];
  return `${service.name} in ${city}, ${state} | Crafted Matrix - #1 Rated`;
}

// Calculate total pages
function calculateTotalPages() {
  let total = 0;
  for (const state in LOCATIONS) {
    total += LOCATIONS[state].length * Object.keys(SERVICES).length;
  }
  return total;
}

// Generate all page combinations
function generateAllPages() {
  const pages = [];
  
  for (const state in LOCATIONS) {
    for (const city of LOCATIONS[state]) {
      for (const serviceKey in SERVICES) {
        pages.push({
          city,
          state,
          service: serviceKey,
          slug: generateSlug(city, serviceKey),
          title: generatePageTitle(city, state, serviceKey),
          metaDescription: generateMetaDescription(city, state, serviceKey)
        });
      }
    }
  }
  
  return pages;
}

// Generate sitemap entries for all pages
function generateSitemapEntries(baseUrl) {
  const pages = generateAllPages();
  const entries = pages.map(page => ({
    url: `${baseUrl}/${page.slug}.html`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  }));
  
  return entries;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SERVICES,
    LOCATIONS,
    generateAllPages,
    generateSitemapEntries,
    calculateTotalPages,
    generateSlug
  };
}
