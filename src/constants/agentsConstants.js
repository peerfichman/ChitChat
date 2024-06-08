const Sentiments = Object.freeze({
    POSITIVE: 'Positive',
    NEGATIVE: 'Negative',
});

const OpinionAlignment = Object.freeze({
    SUPPORT: 'Support',
    OPPOSE: 'Oppose',
});

const TalkingStyle = Object.freeze({
    SARCASTIC: 'Sarcastic',
    EMPHATIC: 'Emphatic',
    CHARISMATIC: 'Charismatic',
    RESERVED: 'Reserved',
});

const ActivityLevels = Object.freeze({
    ACTIVITY_1: 1,
    ACTIVITY_2: 2,
    ACTIVITY_3: 3,
});

const NumberOfMessages = Object.freeze({
    ACTIVITY_1: 1,
    ACTIVITY_2: 2,
    ACTIVITY_3: 3,
    ACTIVITY_4: 4,
    ACTIVITY_5: 5,
});

const AgentCardTitles = Object.freeze({
    NAME: 'Name',
    SENTIMENT: 'Sentiment',
    OPINION_ALIGNMENT: 'Opinion Alignment',
    ACTIVITY_LEVEL: 'Response Probability', // 1-3
    TALKING_STYLE: 'Talking Style',
    NUMBER_OF_MESSAGES: 'Number of Messages to Reply to', //1-5
});

const AgentParametersInDB = Object.freeze({
    NAME: 'agent_name',
    SENTIMENT: 'sentiment',
    OPINION_ALIGNMENT: 'opinion_alignment',
    ACTIVITY_LEVEL: 'activity_level',
    TALKING_STYLE: 'talking_style',
    NUMBER_OF_MESSAGES: 'messages_to_reply',
});

export {
    Sentiments,
    AgentCardTitles,
    OpinionAlignment,
    TalkingStyle,
    ActivityLevels,
    NumberOfMessages,
    AgentParametersInDB,
};
