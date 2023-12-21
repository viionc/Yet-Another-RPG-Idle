import {DialogueProps} from "../types";

const BARTENDER_DIALOGUES: DialogueProps[] = [
    {
        message: "Oi, you! Quick, what do you want?! Can't you see how busy this place?",
        options: [
            {
                response: "Looks quite empty to me.",
                next: 1,
            },
            {response: "I'm sorry, I have few questions, if you may.", next: 2},
        ],
    },
    {
        message: "I'll remember your face, smartass. Next order is gonna cost you more.",
        options: [{response: "I'm sorry, I have few questions, if you may.", next: 2}],
    },
    {
        message: "Ask away, my answers have prices though.",
        options: [
            {
                response: "What is this place?",
                next: 3,
                special: {
                    type: "stat",
                    key: "goldCoins",
                    amount: 20,
                    label: "Gold Coins",
                },
            },
            {
                response: "Do you have any work for me?",
                next: 4,
                special: {
                    type: "stat",
                    key: "goldCoins",
                    amount: 40,
                    label: "Gold Coins",
                },
            },
            {
                response: "Do you know anyone who could train me?",
                next: 5,
                special: {
                    type: "stat",
                    key: "goldCoins",
                    amount: 60,
                    label: "Gold Coins",
                },
            },
        ],
    },
    {
        message: "A tavern. Are you blind? That will be 20 coins well spent.",
        options: [{response: "Well, can't argue with that.", next: 2}],
    },
    {
        message:
            "Yes! All those lazy rats hanging out here made run out of crab meat. Bring me 50 pieces and I'll give your money back and toss something extra.",
        options: [
            {response: "I'm on it, boss.", next: 2},
            {response: "I think I'll pass. (You will have to pay again if you change your mind)", next: 2},
        ],
    },
    {
        message: "I think Marvin specializes in combat training, you could ask him, but he is more gold hungry than me, so prepare your gold pouch.",
        options: [
            {
                response: "Thanks. I'll look for him.",
                next: 2,
            },
            {response: "More gold hungry than you? I don't think that's possible.", next: 6},
        ],
    },
    {message: "Hmmph. Go away.", options: [{response: "...", next: 2}]},
];

export default BARTENDER_DIALOGUES;
