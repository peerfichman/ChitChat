const Sentiments = Object.freeze({
    POSITIVE: 'Positive',
    NEGATIVE: 'Negative',
});

const OpinionAlignment = Object.freeze({
    SUPPORT: 'Support',
    OPPOSE: 'Oppose',
});

const TalkingStyle = Object.freeze({
    FORMAL: 'Formal',
    FRIENDLY: 'Friendly',
    CASUAL: 'Casual',
});

const ActivityLevels = Object.freeze({
    ACTIVITY_1: 1,
    ACTIVITY_2: 2,
    ACTIVITY_3: 3,
    ACTIVITY_4: 4,
    ACTIVITY_5: 5,
});

const NumberOfMessages = ActivityLevels;

const TopicsOfInterest = Object.freeze({
    SPORTS: 'Sports',
    POLITICS: 'Politics',
    TECHNOLOGY: 'Technology',
    FOOD: 'Food',
    TRAVEL: 'Travel',
    MOVIES: 'Movies',
    MUSIC: 'Music',
    SCIENCE: 'Science',
    FASHION: 'Fashion',
    HEALTH: 'Health',
    GAMING: 'Gaming',
    EDUCATION: 'Education',
    BUSINESS: 'Business',
    ART: 'Art',
    CARS: 'Cars',
    BOOKS: 'Books',
    HISTORY: 'History',
    RELIGION: 'Religion',
    ANIMALS: 'Animals',
    ENVIRONMENT: 'Environment',
    CULTURE: 'Culture',
    OTHER: 'Other',
});

const listOfTopics = Object.entries(TopicsOfInterest).map(([key, value]) => {
    return { value: key, label: value };
});

const AgentCardTitles = Object.freeze({
    NAME: 'Name',
    SENTIMENT: 'Sentiment',
    OPINION_ALIGNMENT: 'Opinion Alignment',
    ACTIVITY_LEVEL: 'Activity Level', // 1-5
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
    TopicsOfInterest,
    AgentParametersInDB,
    listOfTopics,
};
