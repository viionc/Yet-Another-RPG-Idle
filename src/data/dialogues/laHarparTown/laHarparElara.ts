import {DialogueProps} from "../types";

const LA_HARPAR_ELARA: Record<number, DialogueProps> = {
    0: {
        message: "Can you stop staring, yes, those are my ears. I'm an elf.",
        options: [
            {response: "I wasn't staring! (Lie)", next: 1},
            {response: "I was just admiring your beauty, didn't mean to offend", next: 1},
            {response: "I'll be going now.", next: 1, close: true},
        ],
    },
    1: {
        message: "Oh okay, I'm sorry, even though I moved in here years ago some people still look at me weirdly.",
        options: [
            {response: "Was there any reason for you to move here?", next: 3},
            {response: "What's your opinion on local villagers?", next: 30},
        ],
    },
    3: {
        message:
            "I'm looking for my father. He is a captain and a treasure seeker. He went missing 5 years ago. Since this is the most known fishing village I thought that this would be the best place to gather information.",
        options: [
            {response: "A captain?", next: 4},
            {response: "A treasure seeker?", next: 8},
            {response: "Any clue what happened to him?", next: 15},
        ],
    },
    4: {
        message: "Captain Theron Tidecaller, was quite famous for his discoveries and uncanny ability to predict weather conditions.",
        options: [
            {response: "Was he a pirate?", next: 5},
            {response: "You also said he was a treasure seeker?", next: 8},
        ],
    },
    5: {
        message: "No, not like that. He was more about the thrill of an adventure than plundering and murdering people.",
        options: [
            {response: "If I find any clues I'll let you know.", close: true, special: {type: "quest", start: true, id: 3}, next: 1},
            {response: "Well, hope you can find him.", next: 1, close: true},
        ],
    },
    8: {
        message:
            "Treasure seeks to dedicate their lives to search for ancient artifacts and valuable items. My dad is in possession of some of the rarest jewels. Though I have no idea where he keeps them.",
        options: [
            {response: "Do you need some kind of permit to become a treasure seeker?", next: 9},
            {response: "That must be a good way to earn some money. Your dad was probably quite rich.", next: 10},
        ],
    },
    9: {
        message: "Permit? Ha! Of course not, all you have to do is go to the most dangerous places and hope no one was there before.",
        options: [{response: "I see, I'm something of an adventurer myself.", next: 1}],
    },
    10: {
        message:
            "IS rich. That I would like to say, but no. Money never stuck to him. He would always spend it on new gear, ship parts, or give it away.",
        options: [{response: "Surely he has something hidden away, right?", next: 11}],
    },
    11: {
        message: "I don't know, we can ask him when I find him.",
        options: [{response: "Of course.", next: 1}],
    },
    15: {
        message: "Last rumour I heard is that he was looking for Primula's Sceptre.",
        options: [{response: "Primula's?", next: 16}],
    },
    16: {
        message: "Queen Primula, ruled over an ancient civilization called Messatan, believed to be long gone. It's probably just another fairytale.",
        options: [
            {response: "Why do you think it's a fairytale?", next: 17},
            {response: "Interesting, not surprising that your father would be interested.", next: 18},
        ],
    },
    17: {
        message: "There is no known proof. All is just tales and rumors spread from ear to ear.",
        options: [{response: "You never know, there are a lot of mysteries in our world.", next: 1}],
    },
    18: {
        message: "He is the best at his job, but he can be naive.",
        options: [{response: "He seems to be quite a man, hopefully, you can find him", next: 1}],
    },
    30: {
        message: "Useless, all they do is hang out in that stinky tavern. The only decent person living here is Marvin.",
        options: [
            {response: "Marvin?", next: 31},
            {response: "They can't be all that bad.", next: 33},
        ],
    },
    31: {
        message: "An adventure like my father. Heard he came back a few days ago. He is a skilled warrior.",
        options: [{response: "Where could I find him?", next: 32}],
    },
    32: {
        message: "He is probably training people in the local exploration guild.",
        options: [{response: "Thanks, I'll look for him.", next: 1, close: true}],
    },
    33: {
        message: "Believe, you will have enough of every one of them after spending here significant amount of time here.",
        options: [{response: "Seems to me that you're just venting your frustrations.", next: 1}],
    },
};

export default LA_HARPAR_ELARA;
