import DetailObject from '../DetailObject';
import EditableDetailObject from './../EditableDetailObject';
import { useState } from 'react';
import {
    updateResearchDescription,
    updateResearchPrompt,
    updateResearchSubject,
} from '../../requests/researches';

const ResearchDetails = ({ study }) => {
    const [prompt, setPrompt] = useState(study.study_prompt);
    const [description, setDescription] = useState(study.study_description);
    const [subject, setSubject] = useState(study.study_subject);
    const [isEditingPrompt, setIsEditingPrompt] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [isEditingSubject, setIsEditingSubject] = useState(false);

    return (
        <div className="grid w-full grid-cols-1 lg:grid-cols-2">
            <DetailObject title="Created At" value={study.study_created_at} />
            <EditableDetailObject
                title="Default Provoking Prompt"
                value={prompt}
                setValue={(val) => {
                    setPrompt(val);
                    updateResearchPrompt(study.study_id, val);
                }}
                isEditing={isEditingPrompt}
                setIsEditing={setIsEditingPrompt}
            />
            <EditableDetailObject
                title="Subject"
                value={subject}
                setValue={(val) => {
                    setSubject(val);
                    updateResearchSubject(study.study_id, val);
                }}
                isEditing={isEditingSubject}
                setIsEditing={setIsEditingSubject}
            />
            <EditableDetailObject
                title="Description"
                value={description}
                setValue={(val) => {
                    setDescription(val);
                    updateResearchDescription(study.study_id, val);
                }}
                isEditing={isEditingDesc}
                setIsEditing={setIsEditingDesc}
            />
        </div>
    );
};

export default ResearchDetails;
