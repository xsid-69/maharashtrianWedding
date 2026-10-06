"use client";

import { useState, type FormEvent } from "react";
import { Check, Send, Sparkles } from "lucide-react";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

type Attendance = "yes" | "no";
type FormState = { name: string; guests: string; attendance: Attendance; message: string };

const initialState: FormState = { name: "", guests: "२", attendance: "yes", message: "" };

export function RSVP() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("कृपया आपले पूर्ण नाव नमूद करा.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("submitting");
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <section id="rsvp" className="rsvp-section rsvp-section--success" aria-labelledby="rsvp-success-title">
        <div className="rsvp-success" role="status">
          <span>
            <Check size={28} strokeWidth={1.3} />
          </span>
          <h2 id="rsvp-success-title">मनःपूर्वक धन्यवाद, {form.name.trim()}!</h2>
          <p>
            {form.attendance === "yes"
              ? "आपल्या उपस्थितीने विवाह सोहळ्याची शोभा अधिक वाढेल. आपल्या स्वागतासाठी आम्ही उत्सुक आहोत!"
              : "आपल्या शुभेच्छा आमच्यासोबत कायम राहतील. आपली अनुपस्थिती निश्चितच जाणवेल."}
          </p>
          <button
            className="text-button"
            onClick={() => {
              setForm(initialState);
              setStatus("idle");
            }}
          >
            माहिती बदला
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="rsvp-section" aria-labelledby="rsvp-title">
      <div className="rsvp-layout page-shell">
        <div className="rsvp-intro">
          <Reveal variant="blur">
            <p className="rsvp-deadline">॥ कृपया १५ नोव्हेंबर २०२६ पर्यंत कळवावे ॥</p>
          </Reveal>
          <h2 id="rsvp-title">
            <RevealLines text={"आपल्या उपस्थितीने\nसोहळा मांगल्याचा\nसंपन्न होईल"} />
          </h2>
          <Reveal variant="up" delay={160}>
            <span>
              आपली उपस्थिती आणि मनःपूर्वक शुभाशीर्वाद हेच या मंगल प्रसंगी आम्हा उभयतांसाठी सर्वात मोठे देणे आहे.
            </span>
          </Reveal>
        </div>

        <form className="rsvp-form" onSubmit={submit} noValidate>
          <Reveal variant="up" className="form-field">
            <label htmlFor="guest-name">आपले नाव व आडनाव</label>
            <input
              id="guest-name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              aria-describedby={error ? "rsvp-error" : undefined}
              aria-invalid={status === "error"}
              placeholder="उदा. श्री. व सौ. जोशी"
            />
          </Reveal>

          <Reveal variant="up" delay={80} className="form-field">
            <label htmlFor="guest-count">उपस्थित राहणाऱ्या सदस्यांची संख्या</label>
            <select
              id="guest-count"
              name="guests"
              value={form.guests}
              onChange={(event) => setForm({ ...form, guests: event.target.value })}
            >
              {[
                { val: "1", label: "१ व्यक्ती" },
                { val: "2", label: "२ व्यक्ती (सहकुटुंब)" },
                { val: "3", label: "३ व्यक्ती" },
                { val: "4", label: "४ व्यक्ती" },
                { val: "5", label: "५ व्यक्ती" },
                { val: "6", label: "६ किंवा अधिक" },
              ].map((opt) => (
                <option key={opt.val} value={opt.val}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Reveal>

          <Reveal variant="up" delay={160}>
            <fieldset className="attendance-field">
              <legend>आपण सोहळ्यास उपस्थित राहणार का?</legend>
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={form.attendance === "yes"}
                  onChange={() => setForm({ ...form, attendance: "yes" })}
                />
                <span>होय, आम्ही नक्की उपस्थित राहू</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={form.attendance === "no"}
                  onChange={() => setForm({ ...form, attendance: "no" })}
                />
                <span>दिलगीर आहोत, उपस्थित राहणे शक्य होणार नाही</span>
              </label>
            </fieldset>
          </Reveal>

          <Reveal variant="up" delay={240} className="form-field">
            <label htmlFor="guest-message">
              वधू-वरांसाठी शुभाशीर्वाद व संदेश <small>(ऐच्छिक)</small>
            </label>
            <textarea
              id="guest-message"
              name="message"
              rows={3}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="आपल्या मनःपूर्वक शुभेच्छा येथे लिहा..."
            />
          </Reveal>

          {error && (
            <p id="rsvp-error" className="form-error" role="alert">
              {error}
            </p>
          )}

          <ShimmerButton type="submit" disabled={status === "submitting"} className="rsvp-submit">
            <span>{status === "submitting" ? "नोंद होत आहे..." : "उपस्थिती निश्चित करा"}</span>
            <Send size={16} strokeWidth={1.6} aria-hidden="true" />
          </ShimmerButton>
        </form>
      </div>
    </section>
  );
}
