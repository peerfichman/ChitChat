const statusOptions = Object.freeze({
    RUNNING: 'Running',
    NOT_STARTED: 'Not Started',
    COMPLETED: 'Completed',
});

export { statusOptions };

const ExperimentVariables = Object.freeze({
    EXP_SUBJECT: 'exp_subject',
    EXP_PROMPT: 'exp_prompt',
    EXP_NAME: 'exp_name',
    EXP_STATUS: 'exp_status',
});
