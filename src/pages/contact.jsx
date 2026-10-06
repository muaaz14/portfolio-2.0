import React, { useState } from "react";
import { Dialog, Select } from "radix-ui";


import "./contact.css";

function Contact() {

  // const [meetingOpen, setMeetingOpen] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultMeetingDate = tomorrow.toISOString().split("T")[0];

  const [meetingDate, setMeetingDate] = useState(defaultMeetingDate);
  const [meetingTime, setMeetingTime] = useState("14:00");
  const [meetingDuration, setMeetingDuration] = useState("30");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [meetingMessage, setMeetingMessage] = useState("");

  const email = "muaaz1501@gmail.com";

  const sendMeetingProposal = (event) => {
    event.preventDefault();

    if (!meetingDate || !meetingTime) {
      return;
    }

    const date = new Date(`${meetingDate}T12:00:00`);

    const formattedDate = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const subject = `Meeting proposal from ${visitorName} — ${formattedDate}`;

    const body = `Hi Muaaz,

    ${
      visitorName
        ? `I'm ${visitorName}, and I came across your portfolio.`
        : "I came across your portfolio and wanted to get in touch."
    }

    I'd like to suggest a meeting at the following time:

    Date: ${formattedDate}
    Time: ${meetingTime} (Europe/Stockholm)
    Duration: ${meetingDuration} minutes

    My contact details:
    Name: ${visitorName}
    Email: ${visitorEmail}

    What I'd like to discuss:
    ${meetingMessage || "No additional message provided."}

    Please let me know if this time works for you. If not, feel free to suggest another time.

    Best,
    ${visitorName || ""}`;

    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    setMeetingDate(defaultMeetingDate);
    setMeetingTime("14:00");
    setMeetingDuration("30");
    setVisitorEmail("");
    setVisitorName("");
    setMeetingMessage("");
  };


  return (
    <section className="contact-page">
      <div className="contact-content">
        <p className="contact-eyebrow">HAVE SOMETHING IN MIND?</p>
        
        <div className="contact-header-container">
          <p className="contact-title">Let's take it from</p>
          <p className='contact-heading'>Idea → Product</p>
          <p className="contact-description">Got a product to shape, a problem to untangle, or an idea that's ready to become real?</p>
        </div>


        <div className="contact-options">
          <a href={`mailto:muaaz1501@gmail.com?subject=${encodeURIComponent("Let's talk about a project")}
                    &body=${encodeURIComponent(`Hi Muaaz,

                    I came across your portfolio and wanted to get in touch.

                    I'd love to talk about:

                    [Write a few words about your project or opportunity]

                    Looking forward to hearing from you!`)}`
                  }
              className="contact-email">muaaz1501@gmail.com
          </a>

          {/* <a type="button" className="meeting-trigger" onClick={() => setMeetingOpen(true)}>
            Suggest a meeting time
          </a> */}

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button type="button" className="meeting-trigger">
                Suggest a meeting time
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="meeting-modal-overlay">
                <Dialog.Content className="meeting-modal">
                  <form className="meeting-form" onSubmit={sendMeetingProposal}>
                      <div className="modal-header">
                        <p className="modal-title">Propose a Meeting</p>

                        <Dialog.Close asChild>
                          <button
                            type="button"
                            className="meeting-close"
                            aria-label="Close meeting form"
                          >
                            ×
                          </button>
                        </Dialog.Close>
                      </div>

                      <div className="modal-body">
                        <div className="heading">
                          <h2>When would you like to talk?</h2>

                          <p>
                            Choose a time that works for you. The proposed time
                            will be sent to me in an email for confirmation.
                          </p>
                        </div>

                        <div className="meeting-fields">
                          <div className="meeting-row">
                            <label>
                              <span>Your name</span>

                              <input
                                type="text"
                                value={visitorName}
                                onChange={(event) =>
                                  setVisitorName(event.target.value)
                                }
                                placeholder="Enter your name..."
                                required
                              />
                            </label>

                            <label>
                              <span>Email address</span>

                              <input
                                type="email"
                                value={visitorEmail}
                                onChange={(event) =>
                                  setVisitorEmail(event.target.value)
                                }
                                placeholder="Enter your email..."
                                required
                              />
                            </label>
                          </div>  
                          
                          <div className="meeting-row">
                            <label>
                              <span>Date</span>
                              <input
                                type="date"
                                value={meetingDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(event) =>
                                  setMeetingDate(event.target.value)
                                }
                                required
                              />
                            </label>

                            <label>
                              <span>Time</span>
                              <input
                                type="time"
                                value={meetingTime}
                                  min={
                                  meetingDate === new Date().toISOString().split("T")[0]
                                    ? new Date().toTimeString().slice(0, 5)
                                    : undefined
                                }
                                onChange={(event) =>
                                  setMeetingTime(event.target.value)
                                }
                                required
                              />
                            </label>

                          </div>

                          <label>
                            <span>Duration</span>

                            <Select.Root
                              value={meetingDuration}
                              onValueChange={setMeetingDuration}
                            >
                              <Select.Trigger className="meeting-select">
                                <Select.Value />
                                <Select.Icon />
                              </Select.Trigger>

                              <Select.Portal>
                                <Select.Content className="meeting-select-content">
                                  <Select.Viewport>
                                    <Select.Item value="15" className="meeting-select-item">
                                      <Select.ItemText>15 minutes</Select.ItemText>
                                    </Select.Item>

                                    <Select.Item value="30" className="meeting-select-item">
                                      <Select.ItemText>30 minutes</Select.ItemText>
                                    </Select.Item>

                                    <Select.Item value="45" className="meeting-select-item">
                                      <Select.ItemText>45 minutes</Select.ItemText>
                                    </Select.Item>

                                    <Select.Item value="60" className="meeting-select-item">
                                      <Select.ItemText>1 hour</Select.ItemText>
                                    </Select.Item>
                                  </Select.Viewport>
                                </Select.Content>
                              </Select.Portal>
                            </Select.Root>
                          </label>

                          <label>
                            <span>Anything you'd like to discuss?</span>
                            <textarea
                              value={meetingMessage}
                              onChange={(event) => setMeetingMessage(event.target.value)}
                              placeholder="Tell me a little about what you'd like to talk about..."
                              rows="4"
                            />
                          </label>
                        </div>

                        <p className="meeting-timezone">Times are proposed in Europe/Stockholm time.</p>
                      </div>

                      <div className="modal-footer">
                        <Dialog.Close asChild>
                          <button
                            type="button"
                            className="meeting-cancel"
                          >
                            Cancel
                          </button>
                        </Dialog.Close>

                        <button
                          type="submit"
                          className="meeting-submit"
                        >
                          Send proposal
                        </button>
                      </div>
                  </form>
                </Dialog.Content>
              </Dialog.Overlay>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </section>
  );
}

export default Contact;