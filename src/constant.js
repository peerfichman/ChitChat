const statusOptions = Object.freeze({
    NOT_STARTED: 'Not Started',
    RUNNING: 'Running',
    COMPLETED: 'Completed',
    PROCESSING: 'Processing',
});

const ExperimentVariables = Object.freeze({
    EXP_SUBJECT: 'exp_subject',
    EXP_PROMPT: 'exp_prompt',
    EXP_NAME: 'exp_name',
    EXP_STATUS: 'exp_status',
    EXP_DATE: 'exp_created_at',
});

const chatURL = 'https://chitchat-chatplatform.web.app';
const chitChatUserID = 'RPLkPefjRdQ3WL3prDMQLTtwjZ02';
const chitChatUserName = 'ChitChat';
const chitChatUserPhotoURL =
    'https://lh3.googleusercontent.com/a/ACg8ocIhwxHeHkG3hl0T-FnN0IEj0tQlhUTPq9SFblnl26bjN1095w=s96-c';

export {
    statusOptions,
    ExperimentVariables,
    chatURL,
    chitChatUserID,
    chitChatUserName,
    chitChatUserPhotoURL,
};
