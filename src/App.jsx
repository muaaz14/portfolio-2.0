import './App.css'

function App() {
  return (
    <main>
      <section className="hero">
        <div className="hero-top">
          <p className="breadcrumb">Muaaz / 2026 / Product Designer + Engineer</p>
        </div>


        <div className="hero-middle">
          {/* <div className="chips">
            <span>PRODUCT DESIGN</span>
            <span>UX / UI</span>
            <span>BUILDING WITH CODE</span>
          </div> */}
          <div class="hero-headline-text">
            {/* <p class="hero-desc">Somewhere between</p> */}
            {/* <h1>I'm found working all the way from  <span style={{ fontWeight: '500' }}>Ideas → Production</span></h1> */}
            <h1>I engineer & design, right from <br/> <span style={{ fontWeight: '500', lineHeight: '1.7' }}>Ideas → Production</span></h1>
            {/* <p class="hero-desc">is where I am found working.</p> */}
          </div>
          <p className="hero-desc">I'm Muaaz; a product designer who likes getting close to the actual product. I design the experience, understand the system behind it, and increasingly, sometimes build the thing itself.</p>
        </div>
        

        <div className="hero-bottom">
            
            <p className="location">KARLSTAD, SWEDEN</p>
        </div>
      </section>
    </main>
  )
}

export default App