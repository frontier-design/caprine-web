export type Testimonial = {
  firstName: string
  lastName: string
  role: string
  company: string
  quote: string
}

const firstMet =
  'Nagi and I first met in 2012. Even then, I admired his achievements. His motivational character, his open-minded personality, and his extremely large global business network amazed me from the start. He is not just persuasive — he also delivers what he promises. His ability to open doors that would otherwise stay closed is extraordinary. With Nagi, you can always count on him being well informed and giving guiding feedback. Over the last few years, I have enjoyed discussing opportunities and projects with him, and I plan to keep working with him.'

export const testimonialColumns: Testimonial[][] = [
  [
    {
      firstName: 'Taher',
      lastName: 'Elgamal',
      role: 'Country Sales Force',
      company: 'Meta',
      quote:
        'I have know Nagi for over 30 years. He is a very established businessman who understands all aspects of building a business to a success story. He combines an excellent strategic view of customer needs to a deep understanding of technology trends. Perhaps most uniquely, is his ability to focus on the high-level messaging and digging through the details in one conversation. He has a very good long-term view, rather than focusing on short-term returns. He has build companies from existing businesses as well as build companies from scratch, a very rare skill that he built over the years.',
    },
    {
      firstName: 'Stefan',
      lastName: 'Arn',
      role: 'Account Executive',
      company: 'Y-Combinator',
      quote: firstMet,
    },
    {
      firstName: 'Christoph',
      lastName: 'Koch',
      role: 'Account Executive',
      company: 'Google',
      quote: firstMet,
    },
  ],
  [
    {
      firstName: 'Peter',
      lastName: 'Armstrong',
      role: 'Account Executive',
      company: 'Google',
      quote:
        'I first encountered Nagi in 2016 as I was establishing my business, a high-end technology consulting business. Nagi took a personal interest in the venture, picking up on the passion of a founder that knew a lot but had almost no access to the broader market; he personally supported my engagement. He has been a friend, supporter, and companion on a journey that continues to today. He takes a long-term view of relationships, with meaningful hands-on support. In my case, he guaranteed access to a community of technology leaders I could not have hoped to have influenced without his support. His view of success is not just an exit, but the manner and nature of the journey. His own passion is visible for all to see, and he brings extraordinary credibility after his decades of successful entrepreneurship. Founders will be fortunate to get Nagi into your corner: a most honourable supporter I am privileged to call my friend.',
    },
    {
      firstName: 'Bruce',
      lastName: 'Mcconell',
      role: 'Account Executive',
      company: 'Google',
      quote: firstMet,
    },
    {
      firstName: 'Doug',
      lastName: 'Levin',
      role: 'Account Executive',
      company: 'Amazon',
      quote: firstMet,
    },
  ],
]
