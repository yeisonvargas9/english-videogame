/* Question bank: Verbs of Opinion & Certainty
   Format: [ question, correct answer, [3 wrong answers], explanation ]
   - Use ___ in the question to make a fill-in-the-blank item; without it, it is multiple choice.
   - Options are shuffled every time, so the correct letter changes.
   - Add or edit lines freely: the game picks them up automatically. */
const BANK = [
  // ---- Fill in the blank: choose the verb (lesson exercise 2) ----
  ["I checked the server logs, so I ___ that it crashed at 2 AM.", "know", ["hope", "feel", "doubt"], "The logs are proof, so we use “know” (100% fact)."],
  ["We deployed the patch, and we ___ that it fixes the issue.", "hope", ["know", "knows", "hoping"], "We can’t be sure yet, so we express a desire for a good outcome: “hope”."],
  ["I haven’t tested it yet, but I ___ that the script will work.", "think", ["know", "thinks", "thinking"], "Not tested yet means probability, not fact: “think”."],
  ["The password is “123456”, so I ___ that the account is not secure.", "know", ["hope", "feel", "doubt"], "It is a clear fact, so we use “know”."],
  ["Based on my experience, I ___ that this architecture is wrong.", "feel", ["hope", "know", "wonder"], "Intuition from experience is expressed with “feel”."],
  ["The test results prove it works. I ___ that the feature is ready.", "know", ["hope", "feel", "guess"], "Proof means certainty: “know”."],
  ["You have a bad gut feeling about the release. You ___ that something is wrong.", "feel", ["know", "check", "prove"], "A gut feeling is intuition: “feel”."],
  ["You want the deployment to go well. You ___ that it goes smoothly.", "hope", ["know", "check", "prove"], "A desire for a good outcome is “hope”."],

  // ---- Fill in the blank: verb form (subject agreement) ----
  ["She ___ that the new UI is better.", "believes", ["believe", "believing", "to believe"], "With “she” the verb takes -s: believes."],
  ["They ___ that the cloud is safer.", "believe", ["believes", "believing", "to believe"], "With “they” there is no -s: believe."],
  ["He ___ that we need more testing.", "feels", ["feel", "feeling", "to feel"], "With “he” the verb takes -s: feels."],
  ["We ___ that the backup succeeded.", "know", ["knows", "knowing", "to know"], "With “we” there is no -s: know."],
  ["I ___ that the code is ready.", "think", ["thinks", "thinking", "to think"], "With “I” we use the base form: think."],
  ["They ___ that the migration goes smoothly.", "hope", ["hopes", "hoping", "to hope"], "With “they” there is no -s: hope."],

  // ---- Fill in the blank: the “that” clause ----
  ["I think ___ the database is offline.", "that", ["what", "to that", "it"], "We connect the two ideas with “that”, never with “what”."],
  ["We hope ___ the new feature is successful.", "that", ["what", "to that", "for"], "After “hope” we use “that” directly (not “to that”)."],
  ["In spoken English, native speakers often ___ the word “that”.", "drop", ["repeat", "capitalize", "translate"], "“I think the server is down” sounds natural in speech."],
  ["In formal IT documentation or emails, it is better to ___ “that” for clarity.", "keep", ["remove", "replace", "hide"], "The written version keeps it: “I think that the server is down.”"],
  ["Subject 1 + [Mental Verb] + (that) + ___ + Verb", "Subject 2", ["Object", "Adjective", "Question"], "Each idea has its own subject: the admin knows that the network is secure."],

  // ---- Multiple choice: concepts ----
  ["The “that” clause is used to connect ___.", "two ideas", ["two names", "two numbers", "two files"], "“That” links the mental verb with the idea that follows."],
  ["Verbs like know, think, hope, believe and feel express our ___.", "mental states, opinions or expectations", ["file names", "network speeds", "hardware errors"], "They report what we know, think, hope, believe or feel."],
  ["In IT, we use these verbs to ___.", "report statuses and express confidence", ["delete old files", "format disks", "print documents"], "We use them for system statuses, confidence in a solution and project predictions."],
  ["Which sentence is the WRITTEN (formal) version?", "I think that the server is down.", ["I think the server is down.", "Think the server is down.", "The server I think is down."], "In formal writing we keep “that” for clarity."],
  ["Which sentence is correct?", "I know that the code works.", ["I know what the code works.", "I know to that the code works.", "I know that the code it works."], "Never use “what” here, and don’t repeat the subject."],
  ["Common mistake: which word should you NEVER use to connect these clauses?", "what", ["that", "(nothing) in spoken English", "that in formal writing"], "“I know what the code works” is wrong. Use “that” (or drop it when speaking)."],

  // ---- Multiple choice: degrees of certainty ----
  ["Which verb shows 100% fact or certainty?", "know", ["think", "feel", "hope"], "“Know” = 100% fact."],
  ["Which verb expresses a desire for a good outcome?", "hope", ["know", "believe", "feel"], "“Hope” = desire for a good outcome."],
  ["Which verb expresses intuition or a gut feeling?", "feel", ["know", "believe", "hope"], "“Feel” = intuition."],
  ["Which verb expresses high confidence or an opinion?", "believe", ["hope", "feel", "know"], "“Believe” = high confidence / opinion."],
  ["Which verb expresses an opinion or a probability?", "think", ["know", "hope", "feel"], "“Think” = opinion / probability."],
  ["Which verb has the LOWEST certainty because it is only a wish?", "hope", ["know", "believe", "think"], "“Hope” is a desire, not a fact."],
  ["“We know that the backup succeeded.” shows ___.", "100% certainty", ["a wish", "a gut feeling", "a probability"], "“Know” is used for facts."],
  ["“He feels that we need more testing.” shows ___.", "a gut feeling", ["a 100% fact", "a wish", "a proof"], "“Feel” expresses intuition."],
  ["“They hope that the migration goes smoothly.” shows ___.", "a wish for a good outcome", ["a 100% fact", "a gut feeling", "a proof"], "“Hope” expresses desire."],
  ["Which phrase is a natural way to give an opinion?", "I honestly believe that…", ["I honestly believes that…", "I honest believe that…", "I honestly believing that…"], "The correct form is: I + believe + that…"],
  ["Which phrase expresses a wish for a good result?", "I just hope that…", ["I know that…", "I feel that…", "I honestly believe that…"], "“Hope” = desire for a good outcome."],

  // ---- Multiple choice: combine the sentences (lesson exercise 1) ----
  ["Combine: “The system crashed. I think…”", "I think that the system crashed.", ["I think what the system crashed.", "I think to that the system crashed.", "I thinks that the system crashed."], "Mental verb + that + subject + verb."],
  ["Combine: “The bug is fixed. We know…”", "We know that the bug is fixed.", ["We know what the bug is fixed.", "We know that the bug it is fixed.", "We knows that the bug is fixed."], "Mental verb + that + subject + verb."],
  ["Combine: “The clients will like the app. We hope…”", "We hope that the clients will like the app.", ["We hope to that the clients will like the app.", "We hope what the clients will like the app.", "We hopes that the clients will like the app."], "After “hope” we use “that” directly."],
  ["Combine: “Python is the best language. She believes…”", "She believes that Python is the best language.", ["She believe that Python is the best language.", "She believes what Python is the best language.", "She believes that is the best language."], "Keep the subject after “that”: Python."],
  ["Combine: “The deadline is too tight. The team feels…”", "The team feels that the deadline is too tight.", ["The team feel that the deadline is too tight.", "The team feels what the deadline is too tight.", "The team feels that the deadline it is too tight."], "“The team” takes -s (feels) and “the deadline” is the second subject."],

  // ---- Multiple choice: spot the bug (lesson exercise 3) ----
  ["Fix the error: “I think what the database is offline.”", "Change “what” to “that”", ["Change “think” to “thinks”", "Change “is” to “are”", "Remove “the”"], "“What” is never used to connect these clauses."],
  ["Fix the error: “We hope to that the new feature is successful.”", "Remove “to”", ["Add “what”", "Change “hope” to “hopes”", "Remove “is”"], "After “hope” we go directly to “that”."],
  ["Fix the error: “She knows that is a difficult programming language.”", "Add the subject “it” after “that”", ["Remove “knows”", "Change “that” to “what”", "Remove “difficult”"], "The second clause needs its own subject: that it is…"],
  ["Fix the error: “They believes that the cloud is safer.”", "Change “believes” to “believe”", ["Change “is” to “are”", "Change “safer” to “safest”", "Add “what” before “the”"], "“They” does not take -s."],
  ["Fix the error: “I feel that the project it is too expensive.”", "Remove the extra “it”", ["Change “feel” to “feels”", "Change “that” to “what”", "Remove “too”"], "“The project” is already the subject."]
];
