import { DialogueProps } from '../types'

const LA_HARPAR_MARVIN: Record<number, DialogueProps> = {
  0: {
    message: 'Hello, how are you?',
    options: [
      { response: "I'm an adventurer, first time in this town.", next: 1 },
      { response: "I'm fine, thanks. I've been looking for you", next: 1 },
    ],
  },
  1: {
    message: 'How can I help you this fine evening?',
    options: [
      { response: "I'm looking to sharpen my skills and I heard you are the combat teacher in this town", next: 20 },
      { response: "I couldn't help but notice that scar on your arm. How did you get it?", next: 40 },
    ],
  },
  40: {
    message: `Ah, this one? It's from a run-in with a bandit leader. Tricky fellow. We had a duel, and he managed to graze me with a poisoned blade. 
            It was touch and go for a while, but I pulled through. Reminds me to always be cautious, even with the seemingly simple foes.`,
    options: [{ response: "That's a lesson I won't forget. It's a tough world out there.", next: 41 }],
  },
  41: {
    message: 'Indeed, my friend. Always stay vigilant.',
    options: [{ response: 'xD', next: 1 }],
  },
}

export default LA_HARPAR_MARVIN
