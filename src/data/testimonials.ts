export type Testimonial = {
  firstName: string
  lastName: string
  title?: string
  quote?: string
}

const columns: Testimonial[][] = [
  [
    {
      firstName: 'Peter',
      lastName: 'Armstrong',
      title: 'Cyber Risk Insights Ltd.',
      quote:
        'I first encountered Nagi in 2016 as I was establishing my business, a high-end technology consulting business. Nagi took a personal interest in the venture, picking up on the passion of a founder that knew a lot but had almost no access to the broader market; he personally supported my engagement. He has been a friend, supporter, and companion on a journey that continues to today. He takes a long-term view of relationships, with meaningful hands-on support. In my case, he guaranteed access to a community of technology leaders I could not have hoped to have influenced without his support. His view of success is not just an exit, but the manner and nature of the journey. His own passion is visible for all to see, and he brings extraordinary credibility after his decades of successful entrepreneurship. Founders will be fortunate to get Nagi into your corner: a most honourable supporter I am privileged to call my friend.',
    },
    {
      firstName: 'Douglas',
      lastName: 'Levin',
      title: 'Fellow, Harvard Business School and Stanford Law School. Independent Director, Board of Directors, ReversingLabs, Inc.',
      quote:
        'Nagi’s strategic leadership in company establishment, financing, and business development orchestrated InfoSys Global’s successful Keyfactor merger, transforming the organization for sustainable growth.',
    },
    {
      firstName: 'Bruce',
      lastName: 'McConnell',
      title: 'McConnell Global, former Deputy Under Secretary for Cyber Security at the US Department of Homeland Security',
      quote:
        'Nagi is an energetic, forward-thinking, strategic, and ethical international businessman. He’s a pleasure to collaborate with and a great teacher. In his steady hands, growing companies discover their sustainable, profitable way to success.',
    },
    {
      firstName: 'Stefan',
      lastName: 'Arn',
      title: 'Avanti Group AG, Baar, Founder & Managing Partner',
      quote:
        'Nagi is a partner: entrepreneurial, globally connected, and unfailingly fair. He built and exited multiple ventures while communicating clearly and ensuring partners share in success. His innovative thinking and persistent execution consistently turn bold ideas into lasting, shared wins.',
    },
  ],
  [
    {
      firstName: 'Taher',
      lastName: 'Elgamal',
      title: 'CTO, Security, Salesforce',
      quote:
        'I have know Nagi for over 30 years. He is a very established businessman who understands all aspects of building a business to a success story. He combines an excellent strategic view of customer needs to a deep understanding of technology trends. Perhaps most uniquely, is his ability to focus on the high-level messaging and digging through the details in one conversation. He has a very good long-term view, rather than focusing on short-term returns. He has build companies from existing businesses as well as build companies from scratch, a very rare skill that he built over the years.',
    },
    {
      firstName: 'Adrian',
      lastName: 'Perrig',
      title: 'Professor in the department of Computer Science at ETH Zurich',
      quote:
        'Thanks to his profound experience, Nagi is an expert in finding and developing opportunities, building teams, and constructing companies — with an impressive record of building successful businesses.',
    },
    {
      firstName: 'Chris',
      lastName: 'Koch',
      title: 'CEO of United Security Providers AG',
      quote:
        'Nagi and I first met in 2012. Even then, I admired his achievements. His motivational character, his open-minded personality, and his extremely large global business network amazed me from the start. He is not just persuasive — he also delivers what he promises. His ability to open doors that would otherwise stay closed is extraordinary. With Nagi, you can always count on him being well informed and giving guiding feedback. Over the last few years, I have enjoyed discussing opportunities and projects with him, and I plan to keep working with him.',
    },
    {
      firstName: 'Julien',
      lastName: 'Probst',
      quote:
        'I have worked closely with Nagi across two successful exits in cybersecurity. He is a passionate company builder who truly understands technology, products, and what it takes to grow a business globally. He values talented people, strong execution, and real innovation. Beyond that, Nagi has a unique ability to bring people together, open doors through his global network, and get things done.',
    },
    {
      firstName: 'Davis',
      lastName: 'Hake',
      title: 'Senior Director of Cybersecurity Services, Venable LLP',
      quote:
        'Nagi has a proven track record of identifying exceptional talent, uniting experts across disciplines, and turning complex technical breakthroughs into market-leading products.',
    },
  ],
]

export const testimonialColumns = columns.map((column) =>
  column.filter((testimonial): testimonial is Testimonial & { quote: string } => Boolean(testimonial.quote)),
)
