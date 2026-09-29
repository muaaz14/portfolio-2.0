import { useState } from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import PageContent from "./components/page-content";

import "./App1.css";

function App() {
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [mode, setMode] = useState("design");
  const [activePage, setActivePage] = useState("home");

  return (
    <main className="page">

      <section className="main">
        <Header activePage={activePage} setActivePage={setActivePage} />

        <PageContent activePage={activePage}/>

        <Footer activePage={activePage} setActivePage={setActivePage} />
      </section>

    </main>
  );
}

export default App;