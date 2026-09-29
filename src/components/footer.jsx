import "./footer.css";

function Footer({ activePage, setActivePage }) {
  const links = [
    // { id: "home", label: "Home", type: "internal" },
    { id: "work", label: "Work", type: "internal" },
    { id: "about", label: "About", type: "internal" },
    { id: "contact", label: "Contact", type: "internal" },
    {
      id: "resume",
      label: "Resume",
      type: "external",
      url: "#",
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

    { id: "playground", label: "Playground", type: "internal" },
  ];

  return (
    <footer className="footer">
      <div className="footer-links" aria-label="Main navigation">
        {links.map((link) =>
          link.type === "external" ? (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {link.label}
            </a>
          ) : (
            <button
              key={link.id}
              type="button"
              className={`footer-link ${
                activePage === link.id ? "active" : ""
              }`}
              onClick={() => setActivePage(link.id)}
            >
              {link.label}
            </button>
          )
        )}
      </div>
      <span className="footer-location">Karlstad, Sweden</span>
    </footer>
  );
}

export default Footer;