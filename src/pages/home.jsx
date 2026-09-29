import react from "react";
import { useState } from "react";

import "../App1.css";
import "./home.css";

function Home() {
    const [playgroundOpen, setPlaygroundOpen] = useState(false);
    const [mode, setMode] = useState("design");

    return (
        <div className="hero-middle">
            <div className="hero-middle-left">
                <div className="hero-headline-text">
                    <p className="hero-desc">I design &amp; engineer products, all the way right from</p>
                    <span className="hero-headline-text-highlight">Idea → Production</span>
                </div>
                <p className="hero-desc">I'm Muaaz; a product designer who likes getting close to the actual product.<br />I design the experience, understand the system behind it,<br />and increasingly, sometimes build the thing itself.</p>
                <button href="./work.jsx" className="hero-cta">Explore my work <span>→</span></button>
            </div>

            {/* <div className="playground">
                {!playgroundOpen ? (
                <div className="playground-teaser">
                    <div className="playground-status"><span></span>Interactive</div>

                    <span className="playground-index">02 / Playground</span>

                    <div className="playground-teaser-content">
                        <p>A small piece of what happens after Figma.</p>
                        <button type="button" onClick={() => setPlaygroundOpen(true)}>Explore<span>→</span></button>
                    </div>
                </div>

                ) : (


                <div className="playground-content">
                    <div className="mode-switch">
                        <button type="button" className={mode === "design" ? "active" : ""} onClick={() => setMode("design")}>Design</button>
                        <button type="button" className={mode === "code" ? "active" : ""} onClick={() => setMode("code")}>Code</button>
                    </div>

                    {mode === "design" && (
                        <div className="component-preview">
                            <div className="component-meta">
                                <span>01 / COMPONENT</span>
                                <span>DESIGN</span>
                            </div>

                            <button type="button" className="demo-button" onClick={() =>
                                alert("This is the product thinking part.")
                            }>Interact with me</button>

                            <div className="component-details">
                                <div>
                                    <span>TYPE</span>
                                    <strong>Interactive UI</strong>
                                </div>

                                <div>
                                    <span>STATE</span>
                                    <strong>Active</strong>
                                </div>

                                <div>
                                    <span>BUILD</span>
                                    <strong>React</strong>
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === "code" && (
                        <div className="code-preview">
                            <div className="code-top">
                                <span>02 / IMPLEMENTATION</span>
                                <span>REACT</span>
                            </div>

                            <pre>
                                {`function Product() {
                                    return (
                                        <Button>Interact with me</Button>
                                    );
                                }`}
                            </pre>
                            <p>
                            Designed as an interface.
                            Built as a product.
                            </p>
                        </div>
                    )}
                </div>
            )}
            </div>         */}
        </div>
    );
} 

export default Home;