import React, { useState } from 'react';
import PageTitle from '../PageTitle';
import InputBlock from '../InputBlock';
import TextareaBlock from '../TextareaBlock';
import Button from '../Button';
import { createResearch } from '../../requests/researches';
import { useNavigate } from 'react-router';

const CreateResearch = () => {
    const [research, setResearch] = useState({
        study_name: '',
        study_subject: '',
        study_prompt: '',
        study_description: '',
    });
    const [creatingResearch, setCreatingResearch] = useState(false);

    const navigate = useNavigate();

    const handleResearchChanges = (key, value) => {
        setResearch({ ...research, [key]: value });
    };

    const handleResearchCreation = async () => {
        setCreatingResearch(true);
        if (!research.study_name) {
            alert('Please choose a name for the study.');
            setCreatingResearch(false);
            return;
        }
        if (!research.study_subject) {
            alert('Please choose a subject for the study.');
            setCreatingResearch(false);
            return;
        }
        await createResearch(research);
        navigate('/researches');
    };
    return (
        <div className="flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Create Research</PageTitle>
            <div className="flex w-full max-w-lg flex-col gap-3 rounded-lg bg-white p-4 shadow-lg">
                <InputBlock
                    title="Name"
                    placeHolder='"Gun License Rules"'
                    setValue={handleResearchChanges}
                    attribute="study_name"
                    isRequired={true}
                    maxLength={50}
                />
                <InputBlock
                    title="Subject"
                    placeHolder='"The new rules for a gun license"'
                    setValue={handleResearchChanges}
                    attribute="study_subject"
                    isRequired={true}
                />
                <InputBlock
                    title="Opening Prompt"
                    placeHolder='"The new rules can make women abuse more common."'
                    setValue={handleResearchChanges}
                    attribute="study_prompt"
                />
                <TextareaBlock
                    title="Description"
                    placeHolder='"The new rules for a gun license are being implemented in the state of Israel. This study will analyze the impact of these rules on the number of gun licenses issued."'
                    setValue={handleResearchChanges}
                    attribute="study_description"
                />
            </div>
            <div className="flex w-full max-w-lg items-center justify-center">
                {!creatingResearch ? (
                    <button
                        onClick={handleResearchCreation}
                        className="h-12 w-[150px] rounded-lg  bg-blue-500 text-sm font-bold text-white hover:bg-blue-700">
                        Create
                    </button>
                ) : (
                    <Button enabled={false} />
                )}
            </div>
        </div>
    );
};

export default CreateResearch;
