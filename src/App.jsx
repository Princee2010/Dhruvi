import { useEffect, useState } from "react";

const quizQuestions = [
  {
    question: "What is my favourite colour?",
    answers: ["blue", "dark blue", "nevy blue"],
    hint: "Similar to the colour of Doremon.",
  },
  {
    question: "What nickname do I love being called by you?",
    answers: ["Bubu", "Dhuliii"],
    hint: "Think of the cute name you use for me.",
  },
  {
    question: "What is one thing that instantly makes me happy?",
    answers: ["You", "Your presence", "Your love", "Your Jokes"],
    hint: "It is something that comes from you and makes my heart smile.",
  },
  {
    question: "Which Colour top was I Wearing on our first Anniversary?",
    answers: ["Pink", "Light Pink" ],
    hint: "It is a soft and delicate color often associated with love and affection.",
  },
  {
    question: "What is one of my favourite things to do with you?",
    answers: ["Long Drive", "Kisses", "Walk holding hands", "Back Hugs"],
    hint: "It is something we do when we are having fun together.",
  },
  {
    question: "When do I miss you the most?",
    answers: ["Before sleeping", "Before sleep", "Night time", "Night"],
    hint: "The time when I wish you were right next to me.",
  },
  {
    question: "What was the name of that Song By which you proposed to me?",
    answers: ["Wajah Tum Ho", "Wajah Tum Ho - Arijit Singh"],
    hint: "You are the one",
  },
];

const photos = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0IdpZp5CFzR4MwmCp_bwBvaJFGpdWmipy9cxsX6DNVxAq5smBMNPgXZoc&s=10",
    alt: "A sweet birthday memory",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0lic06BvoHTfVNFVAjffRfOebLbfU6PNhz0ZPge2IA&s",
    alt: "A lovely moment to remember",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DVnbVJvXwdpUqqI6Dz0Ztgwkc23YT_N6a-80EDcORg&s=10",
    alt: "A little piece of happiness",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugPHpVC_l5Imgo73BbcSy2v8wacaDwGN-CewBnkAJ5g&s=10",
    alt: "A special memory together",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7y8EYt8JTW8M7uaSSll6ECXg9F90_Bqz_QS7YeWS7jw&s=10",
    alt: "One more reason to smile",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmULJ-aNQlQDy3J5d0SDW1Epi12HVjkHnyIn2gImSDsg&s=10",
    alt: "A little piece of happiness",
  }
];



function AnswerStep({ question, hint, answers, onContinue, buttonLabel }) {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasError, setHasError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedAnswer = answer
      .trim()
      .toLocaleLowerCase()
      .replace(/[.!?]+$/g, "");

    if (!normalizedAnswer) {
      setHasError(true);
      return;
    }

    const isAccepted = answers.some(
      (acceptedAnswer) =>
        acceptedAnswer.toLocaleLowerCase() === normalizedAnswer,
    );

    if (isAccepted) {
      setHasError(false);
      setIsCorrect(true);
      return;
    }

    setHasError(true);
  }

  return (
    <section className="question-panel">
      <h2>{question}</h2>
      {!isCorrect ? (
        <>
          <form className="answer-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="answer-input">
              Your answer
            </label>
            <input
              autoComplete="off"
              id="answer-input"
              onChange={(event) => {
                setAnswer(event.target.value);
                setHasError(false);
              }}
              placeholder="Type your answer..."
              type="text"
              value={answer}
            />
            <button type="submit">Check answer</button>
          </form>
          {hasError && (
            <p className="error-message" role="alert">
              Not quite, try again—or tap the hint for a little help.
            </p>
          )}
          <button
            aria-expanded={showHint}
            aria-controls="question-hint"
            className="hint-button"
            onClick={() => setShowHint((isShowing) => !isShowing)}
            type="button"
          >
            <span aria-hidden="true">💡</span>{" "}
            {showHint ? "Hide hint" : "Need a hint?"}
          </button>
          {showHint && (
            <p className="hint-copy" id="question-hint">
              {hint}
            </p>
          )}
        </>
      ) : (
        <div className="answer-success" aria-live="polite">
          <p>That’s right! You know me so well. 💖</p>
          <button onClick={onContinue} type="button">
            {buttonLabel}
          </button>
        </div>
      )}
    </section>
  );
}

function TreasureTwo({ gift, onContinue }) {
  return (
    <section className="celebration-panel treasure-two-panel">
      <p className="eyebrow">Treasure two unlocked!</p>
      <div className="big-emoji treasure-two-emoji" aria-hidden="true">
        {gift.emoji}
      </div>
      <h1>{gift.title}</h1>
      <p className="intro">{gift.message}</p>
      {gift.image && (
        <img
          className="treasure-two-image"
          src={gift.image}
          alt={gift.imageAlt}
        />
      )}
      <div className="doodle-row" aria-hidden="true">
        ♡　✦　♡
      </div>
      <button onClick={onContinue} type="button">
        Continue to our memories
      </button>
    </section>
  );
}

function PhotoTile({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className="photo-tile">
      {hasError ? (
        <div className="photo-fallback" role="img" aria-label={alt}>
          <span aria-hidden="true">💕</span>
          <figcaption>Add your photo here</figcaption>
        </div>
      ) : (
        <img
          alt={alt}
          loading="eager"
          onError={() => setHasError(true)}
          src={src}
        />
      )}
    </figure>
  );
}

export default function App() {
  const [stage, setStage] = useState("quiz");
  const [quizIndex, setQuizIndex] = useState(0);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPinDigits, setShowPinDigits] = useState(false);
  const [pinCelebrating, setPinCelebrating] = useState(false);

  useEffect(() => {
    if (!pinCelebrating) {
      return undefined;
    }

    const revealTimer = window.setTimeout(() => {
      setPinCelebrating(false);
      setStage("birthday");
    }, 1900);

    return () => window.clearTimeout(revealTimer);
  }, [pinCelebrating]);

  function continueQuiz() {
    if (quizIndex === quizQuestions.length - 1) {
      setStage("victory");
      return;
    }
    setQuizIndex((index) => index + 1);
  }

  function unlockBirthday(enteredPin) {
    if (enteredPin === "3124") {
      setPinError(false);
      setPin("");
      setPinCelebrating(true);
      return;
    }
    setPin("");
    setPinError(true);
  }

  function pressPinDigit(digit) {
    setPinError(false);
    if (digit === "clear") {
      setPin((currentPin) => currentPin.slice(0, -1));
      return;
    }
    if (pin.length < 4) {
      const nextPin = `${pin}${digit}`;
      setPin(nextPin);
      if (nextPin.length === 4) {
        window.setTimeout(() => unlockBirthday(nextPin), 180);
      }
    }
  }

  return (
    <main className="app-container page">
      <div className="floating-heart heart-one" aria-hidden="true">
        ♥
      </div>
      <div className="floating-heart heart-two" aria-hidden="true">
        ✿
      </div>
      <div className={`birthday-card stage-${stage}`}>
        <div className="doodle doodle-top" aria-hidden="true">
          ✧
        </div>
        <div className="doodle doodle-side" aria-hidden="true">
          ♡
        </div>

        {stage === "quiz" && (
          <>
            <p className="eyebrow">The boyfriend test</p>
            <h1>How well do you know me?</h1>
            <p className="intro">
              Seven little questions stand between you and your surprise. You’ve
              got this!
            </p>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin="1"
              aria-valuemax={quizQuestions.length}
              aria-valuenow={quizIndex + 1}
            >
              <span
                style={{
                  width: `${((quizIndex + 1) / quizQuestions.length) * 100}%`,
                }}
              />
            </div>
            <p className="progress-label">
              Question {quizIndex + 1} of {quizQuestions.length}
            </p>
            <AnswerStep
              key={quizIndex}
              answers={quizQuestions[quizIndex].answers}
              buttonLabel={
                quizIndex === quizQuestions.length - 1
                  ? "Finish the test"
                  : "Next question"
              }
              hint={quizQuestions[quizIndex].hint}
              onContinue={continueQuiz}
              question={quizQuestions[quizIndex].question}
            />
          </>
        )}

        {stage === "victory" && (
          <section className="celebration-panel">
            <p className="eyebrow">You did it!</p>
            <div className="big-emoji" aria-hidden="true">
              🏆💖
            </div>
            <h1>
              You won my heart <span className="nowrap">and the game!</span>
            </h1>
            <p className="intro">
              And now… there’s a little surprise waiting just for you.
            </p>
            <button onClick={() => setStage("gate")} type="button">
              Continue to your surprise
            </button>
          </section>
        )}

        {stage === "gate" && (
          <section
            className={`celebration-panel pin-gate${pinError ? " pin-gate-error" : ""}`}
          >
            <div className="pin-character-frame">
              <img
                alt={
                  pinError
                    ? "Bubu and Dudu are giving a playful look"
                    : "Bubu and Dudu holding a heart"
                }
                src="/images/bubu-dudu-couple.png"
              />
              <span className="pin-heart-float" aria-hidden="true">
                {pinError ? "💢" : "❤️"}
              </span>
            </div>
            <p className="eyebrow pin-eyebrow">
              {pinError ? "Oopsie!" : "Just for Dudu"}
            </p>
            <h1>{pinError ? "Naughty, naughty!" : "Secret door ahead!"}</h1>
            <div className="pin-lock-icon" aria-hidden="true">
              {pinError ? "🙈" : "🔐"}
            </div>
            <p className="intro pin-intro" aria-live="polite">
              {pinError
                ? "Why did you enter the wrong PIN? Bubu caught you! Enter the right one, silly bear 🧸"
                : "This website is only for Dudu. Enter the secret password, Kabu 🧸"}
            </p>
            <div
              className="pin-dots"
              role="group"
              aria-label={`PIN: ${pin.length} of 4 digits entered`}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <span
                  className={`pin-dot${pin.length > index ? " pin-dot-filled" : ""}`}
                  key={index}
                  aria-hidden="true"
                >
                  {pin.length > index && showPinDigits ? pin[index] : ""}
                </span>
              ))}
            </div>
            {pinError && (
              <div className="wrong-pin-picture" role="status">
                <img
                  src="/images/bubu-dudu-couple.png"
                  alt="Bubu and Dudu are teasing you for the wrong PIN"
                />
                <span>Wrong PIN! Bubu says try again 🐻</span>
              </div>
            )}
            <div className="pin-keypad" aria-label="PIN keypad">
              {[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "clear",
                "0",
                "backspace",
              ].map((key) => (
                <button
                  aria-label={
                    key === "clear"
                      ? "Clear PIN"
                      : key === "backspace"
                        ? "Delete last digit"
                        : `Enter ${key}`
                  }
                  className={`pin-key${key === "clear" || key === "backspace" ? " pin-key-utility" : ""}`}
                  key={key}
                  onClick={() => {
                    if (key === "backspace") {
                      setPinError(false);
                      setPin((currentPin) => currentPin.slice(0, -1));
                    } else {
                      pressPinDigit(key);
                    }
                  }}
                  type="button"
                >
                  {key === "clear" ? "Clear" : key === "backspace" ? "⌫" : key}
                </button>
              ))}
            </div>
            <button
              aria-pressed={showPinDigits}
              className="pin-visibility-button"
              onClick={() => setShowPinDigits((visible) => !visible)}
              type="button"
            >
              {showPinDigits ? "Hide PIN" : "Show PIN"}
            </button>
          </section>
        )}

        {stage === "birthday" && (
          <section className="celebration-panel birthday-reveal">
            <div className="birthday-confetti" aria-hidden="true">
              {["✦", "♡", "✿", "♥", "✧", "♡", "✦", "♥", "✿", "♡", "✧", "♥"].map(
                (shape, index) => (
                  <span
                    key={`${shape}-${index}`}
                    style={{
                      left: `${(index * 17 + 6) % 96}%`,
                      animationDelay: `${index * -0.23}s`,
                    }}
                  >
                    {shape}
                  </span>
                ),
              )}
            </div>
            <p className="eyebrow reveal-eyebrow">Today is your day</p>
            <div className="birthday-artwork">
              <img
                className="birthday-cake-photo"
                src="/images/bubu-dudu-cake.png"
                alt="Birthday cake decorated with a Bubu and Dudu design"
              />
              <img
                className="bubu-dudu-couple"
                src="/images/bubu-dudu-couple.png"
                alt="Bubu and Dudu together"
              />
            </div>
            <h1 className="birthday-title">
              <span className="birthday-title-line">Happy Birthday,</span>
              <span className="birthday-name">
                Dudu! <span aria-hidden="true">🎂</span>
              </span>
            </h1>
            <p className="intro reveal-message">
              Bubu and Dudu are here to celebrate you! I made some precious
              gifts just for you. Ready to start your hunt?
            </p>
            <div className="doodle-row reveal-doodle" aria-hidden="true">
              ♡　✿　♡　✿　♡
            </div>
            <button
              className="reveal-button"
              onClick={() => setStage("treasure-one")}
              type="button"
            >
              Find your first gift
            </button>
          </section>
        )}

        {stage === "treasure-one" && (
          <>
            <p className="eyebrow">Treasure hunt</p>
            <h1>Let’s find your gift!</h1>
            <p className="intro">
              Answer the clue to discover where your present is hiding.
            </p>
            <AnswerStep
              answers={["bhoiru"]}
              buttonLabel="I found it!"
              hint="it is near to the place where I fed you"
              onContinue={() => setStage("gift-one")}
              question={`रसोई के नीचे छुपा है एक ठिकाना,
जहाँ कम ही जाता है किसी का आना-जाना।
अनाज और पुरानी चीज़ें रहती हैं जहाँ,
अँधेरे में छुपा है तुम्हारा तोहफ़ा वहाँ! 🎁😉`}
            />
          </>
        )}

        {stage === "gift-one" && (
          <section className="celebration-panel">
            <p className="eyebrow">Treasure found!</p>
            <div className="big-emoji" aria-hidden="true">
              🎁✨
            </div>
            <h1>Your precious gift!</h1>
            <p className="intro">
              Go find your present in your room. I hope you love it!
            </p>
            <button onClick={() => setStage("not-over")} type="button">
              Next
            </button>
          </section>
        )}

        {stage === "not-over" && (
          <section className="celebration-panel">
            <p className="eyebrow">Wait…</p>
            <div className="big-emoji" aria-hidden="true">
              😉💌
            </div>
            <h1>This is not over!</h1>
            <p className="intro">
              There’s one more little game—and one more treasure to find.
            </p>
            <button onClick={() => setStage("treasure-two-key")} type="button">
              I’m ready!
            </button>
          </section>
        )}

        {stage === "treasure-two-key" && (
          <>
            <p className="eyebrow">A key to treasure two</p>
            <h1>One last question…</h1>
            <p className="intro">
              Answer correctly to unlock the next treasure.
            </p>
            <AnswerStep
              answers={["2703"]}
              buttonLabel="Unlock Treasure Two"
              hint="It’s the same four-digit number you used to unlock your birthday surprise."
              onContinue={() => setStage("treasure-two-gift")}
              question="“When did we share our very first kiss—the date that turned an ordinary day into one of my favourite memories with you? ❤️💋”"
            />
          </>
        )}
        {stage === "treasure-two-gift" && (
          <>
            <p className="eyebrow">Treasure hunt</p>
            <h1>Let’s find your gift!</h1>
            <p className="intro">
              Answer the clue to discover where your present is hiding.
            </p>
            <AnswerStep
              answers={["kabat", "Cabinate", "Cupboard", ]}
              buttonLabel="I found it!"
              hint="Think of a place where our silent conversations while waking takes place."
              onContinue={() => setStage("gallery")}
              question="Climb the stairs, but don't go too high,
                        Look for a little space hiding nearby.
                        Once home to something that helped the fire glow,
                        A little surprise is waiting below! 🎁😉"
            />
          </>
        )}

        {stage === "gallery" && (
          <section className="gallery-panel">
            <p className="eyebrow">A few little memories</p>
            <h1>Birth dayyyy, Dudu!</h1>
            <p className="intro">
              I hope these make you smile today and remind you how loved you
              are.
            </p>
            <div className="photo-grid">
              {photos.map((photo) => (
                <PhotoTile key={photo.src} {...photo} />
              ))}
            </div>
            <p className="closing-note">Happy Birth dayyyy 💖</p>
            <p className="footer-note">
              Made with all my love, just for you ✨
            </p>
          </section>
        )}
      </div>
      {pinCelebrating && (
        <div
          className="pin-success-celebration"
          role="status"
          aria-live="assertive"
        >
          <div className="success-sprinkles" aria-hidden="true">
            {["✦", "♡", "✿", "♥", "✧", "♡", "✦", "♥", "✿", "♡", "✧", "♥"].map(
              (sprinkle, index) => (
                <span
                  key={`${sprinkle}-${index}`}
                  style={{
                    left: `${(index * 17 + 6) % 96}%`,
                    animationDelay: `${index * -0.16}s`,
                  }}
                >
                  {sprinkle}
                </span>
              ),
            )}
          </div>
          <div className="success-kiss-cloud" aria-hidden="true">
            {[
              { kiss: "😘", left: "8%", top: "34%", x: "-90px", y: "-90px" },
              { kiss: "💋", left: "35%", top: "8%", x: "-40px", y: "-145px" },
              { kiss: "😘", left: "68%", top: "16%", x: "75px", y: "-125px" },
              { kiss: "💋", left: "83%", top: "45%", x: "115px", y: "-25px" },
              { kiss: "😘", left: "66%", top: "73%", x: "75px", y: "85px" },
              { kiss: "💋", left: "30%", top: "78%", x: "-55px", y: "95px" },
              { kiss: "😘", left: "0%", top: "57%", x: "-110px", y: "20px" },
            ].map(({ kiss, left, top, x, y }, index) => (
              <span
                key={`${kiss}-${index}`}
                style={{
                  left,
                  top,
                  animationDelay: `${index * 0.12}s`,
                  "--kiss-x": x,
                  "--kiss-y": y,
                }}
              >
                {kiss}
              </span>
            ))}
          </div>
          <img
            className="success-couple"
            src="/images/bubu-dudu-couple.png"
            alt=""
          />
          <p className="success-message">Yay! You got it right! 💖</p>
        </div>
      )}
    </main>
  );
}
