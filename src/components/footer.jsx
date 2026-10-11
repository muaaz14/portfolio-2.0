
import "./footer.css";

function Footer({ activePage, setActivePage }) {
  const links = [
    // { id: "home", label: "Home", type: "internal" },
    { id: "work", label: "Work", type: "internal", comingSoon: true },
    { id: "about", label: "About", type: "internal" },
    { id: "contact", label: "Contact", type: "internal" },
    {
      id: "resume",
      label: "Resume",
      type: "external",
      url: "https://drive.google.com/file/d/12lmTAs_Wd8yClFD5STJn95bm0XPnwJgh/view?usp=sharing",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      type: "external",
      url: "https://www.linkedin.com/in/muaazahmad14",
    },
    {
      id: "uxcel",
      label: "Uxcel",
      type: "external",
      url: "https://app.uxcel.com/ux/muaazahmad",
    },
    {
      id: "playground",
      label: "Playground",
      type: "internal",
      comingSoon: true,
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-links" aria-label="Main navigation">
        {links.map((link) => (
          <div
            key={link.id}
            className={`footer-link-item ${
              link.comingSoon ? "has-badge" : ""
            }`}
          >
            {link.type === "external" ? (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <span className="footer-link-label">
                  {link.label}
                </span>
              </a>
            ) : (
              <button
                type="button"
                className={`footer-link ${
                  activePage === link.id ? "active" : ""
                }`}
                onClick={() => setActivePage(link.id)}
              >
                <span className="footer-link-label">
                  {link.label}
                </span>
              </button>
            )}

            {link.comingSoon && (
              <span className="coming-soon-badge">
                <span>COMING SOON</span>
              </span>
            )}
          </div>
        ))}
      </div>

      <span className="footer-location">Karlstad, Sweden</span>
    </footer>
  );
}

export default Footer;