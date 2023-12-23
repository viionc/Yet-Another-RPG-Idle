import {DialogueProps} from "../types";

const LA_HARPAR_JOSH: DialogueProps[] = [
    {
        message: "What do you want? Don't bother me.",
        options: [
            {response: "Just wanted to ask few questions about this place.", next: 1},
            {response: "Nothing...", next: 0, close: true},
        ],
    },
    {
        message: "Pay for my next beer and I'll talk to you.",
        options: [
            {response: "Okay, here is 20 gold coins.", next: 2, special: {type: "stat", label: "Gold Coins", amount: 20, key: "goldCoins"}},
            {response: "I'll pass, you can buy one yourself.", next: 0, close: true},
        ],
    },
    {
        message: "Haha, that's what I'm talking about! Now we can talk.",
        options: [
            {
                response: "Beach is safe for now.",
                next: 2,
                requiredQuestProgress: {
                    id: 1,
                    step: 1,
                },
                special: {
                    type: "quest",
                    id: 1,
                    end: true,
                },
            },
            {response: "Who are you?", next: 3},
            {response: "What can you tell me about this place?", next: 4},
            {response: "Do you have any work for me?", next: 5},
            {response: "I don't have any more questions, enjoy your drink.", next: 2, close: true},
        ],
    },
    {
        message: "My name is Josh and I'm a local fisherman, my hobby is drinking free beer.",
        options: [
            {response: "I see, a drunk and beggar then.", next: 6},
            {response: "You're welcome.", next: 2},
        ],
    },
    {
        message:
            "This a tavern. Duh. Buy seriously seems like you're a new one here. This is La Harpar, a fisherman village located on Horseshoe Beach.",
        options: [
            {response: "Horseshoe Beach? I didn't see any horses on the way here.", next: 7},
            {response: "Thanks.", next: 2},
        ],
    },
    {
        message:
            "Work? Here? There is always work to do. We had some animal overpopulation issue on our beach lately. Come back when you kill 50 enemies on Wave 7 in Beach.",
        options: [{response: "On my way.", next: 2, special: {type: "quest", id: 1, start: true}}],
    },
    {
        message: "Oi, mate. You don't want to make enemies here, you're a new face and new faces can disappear over night here.",
        options: [
            {
                response: "I'm sorry, I got carried away.",
                next: 2,
            },
            {response: "Don't care, you will trip over those chairs before you could catch me, bye...", next: 2, close: true},
        ],
    },
    {
        message:
            "The name comes from the shape of the beach, you donkey. Horseshoe Beach and La Harpar are important trade partner to North Lirold, capitol of this region.",
        options: [
            {response: "What exactly is La Harpar providing?", next: 8},
            {response: "This region? How many regions there are?", next: 9},
        ],
    },
    {
        message:
            "We mainly provide various fish and seafood. Also lately we have been overstocked on turtle shells, please go do some work and clear the beach.",
        options: [{response: "Got it.", next: 2}],
    },
    {
        message: "There are 4 known regions to us: Southback, Port Stocksmar, Greefic Hill and Saint Nestroud. La Harpas resides in Port Stocksmar.",
        options: [{response: "Known? Are there unknown regions?", next: 10}],
    },
    {
        message:
            "Well, beyond Greefic Hill there is an uncrossable mountain. Some magical force and unpredictable weather conditions make that place impossible to survive.",
        options: [
            {
                response: "Impossible? Did anyone try?",
                next: 11,
            },
        ],
    },
    {
        message: "Yes, no one who tried came back. Then friends or family members tried to search for those people and they also didn't come back.",
        options: [
            {
                response: "Interesting. What do you think could be there?",
                next: 12,
            },
            {
                response: "Heard enough, I want to sleep tonight.",
                next: 2,
            },
        ],
    },
    {
        message:
            "Beats me! People who got close said they could hear chants and howls from forest that's surrounding the mountain. My feet won't set there anytime soon.",
        options: [
            {
                response: "Understandable...",
                next: 2,
            },
        ],
    },
];

export default LA_HARPAR_JOSH;
