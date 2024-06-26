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
    EXP_RESEARCH_NAME: 'study_name',
});

export { statusOptions, ExperimentVariables };
