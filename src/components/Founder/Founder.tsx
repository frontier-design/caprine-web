import './Founder.css'

function Founder() {
  return (
    <section className="founder grid" id="founder" data-nav-theme="light" aria-labelledby="founder-heading">
      <div className="founder__identity">
        <h2 className="founder__name" id="founder-heading">
          Nagi
          <br />
          Moustafa
        </h2>
        <p className="founder__role">
          Founder of <span className="founder__company">Caprine</span>
        </p>
      </div>
      <p className="founder__lead highlight-paragraph">
        Nagi Moustafa is a visionary entrepreneur and seasoned technology executive with a proven track record
        of driving innovation and innovative ideas from conception to market. Most recently, he served as
        Co-founder, Chairman, and CEO of InfoSec Global (acquired by Keyfactor), where he led the development of
        the end-to-end cryptographic posture management platform, helping to democratize cryptographic
        management. Nagi joined Keyfactor as Chief Commercial Officer.
      </p>
      <div className="founder__bio paragraph">
        <p>
          Over the course of his career, Nagi has founded, funded, and led several successful international
          technology ventures, achieving multiple exits, including Diversinet (an OEM partner to BlackBerry),
          Sysmosoft SA (acquired by Swiss Post), SecureMisr (acquired by Trend Micro), and CIT Global.
        </p>
        <p>
          He currently serves as Chairman of AGORA SecureWare and Swiss Growth Investment and provides
          strategic guidance and investment to several technology companies, including Anapaya.
        </p>
        <p>
          Nagi’s global experience spans North America, Europe, Asia, and the Middle East, and he has previously
          held senior leadership roles at Rogers Communications and Canada’s Ministry of Economic Development.
          He is also an active member of the World Presidents Organization (WPO).
        </p>
        <p>
          Renowned for his strategic vision and leadership, Nagi continues to play an active role as a company
          builder and mentor, collaborating with entrepreneurs to advance innovation across the global
          cybersecurity and technology ecosystem.
        </p>
      </div>
    </section>
  )
}

export default Founder
