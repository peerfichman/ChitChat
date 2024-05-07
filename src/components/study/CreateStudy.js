import React, { useState } from 'react';
import PageTitle from './../PageTitle';
import InputBlock from './../InputBlock';
import TextareaBlock from './../TextareaBlock';
import Button from './../Button';
import { createStudy } from '../../requests/studies';
import { useNavigate } from 'react-router';

const CreateStudy = () => {
    const [study, setStudy] = useState({
        study_name: '',
        study_subject: '',
        study_prompt: '',
        study_description: '',
    });
    const [creatingStudy, setCreatingStudy] = useState(false);

    const navigate = useNavigate();

    const handleStudyChanges = (key, value) => {
        setStudy({ ...study, [key]: value });
    };

    const handleStudyCreation = async () => {
        setCreatingStudy(true);
        if (!study.study_name) {
            alert('Please choose a name for the study.');
            setCreatingStudy(false);
            return;
        }
        if (!study.study_subject) {
            alert('Please choose a subject for the study.');
            setCreatingStudy(false);
            return;
        }
        await createStudy(study);
        navigate('/studies');
    };
    return (
        <div className="flex min-h-screen w-full flex-col items-center gap-3 bg-slate-100">
            <PageTitle>Create Study</PageTitle>
            <div className="flex w-full max-w-lg flex-col gap-3 rounded-lg bg-white p-4 shadow-lg">
                <InputBlock
                    title="Name"
                    placeHolder='"Gun License Rules"'
                    setValue={handleStudyChanges}
                    attribute="study_name"
                    isRequired={true}
                />
                <InputBlock
                    title="Subject"
                    placeHolder='"The new rules for a gun license"'
                    setValue={handleStudyChanges}
                    attribute="study_subject"
                    isRequired={true}
                />
                <InputBlock
                    title="Opening Prompt"
                    placeHolder='"The new rules can make women abuse more common."'
                    setValue={handleStudyChanges}
                    attribute="study_prompt"
                />
                <TextareaBlock
                    title="Description"
                    placeHolder='"The new rules for a gun license are being implemented in the state of Israel. This study will analyze the impact of these rules on the number of gun licenses issued."'
                    setValue={handleStudyChanges}
                    attribute="study_description"
                />
            </div>
            <div className="flex w-full max-w-lg items-center justify-center">
                {!creatingStudy ? (
                    <button
                        onClick={handleStudyCreation}
                        className="h-12 w-[150px] rounded-lg  bg-blue-500 text-sm font-bold text-white hover:bg-blue-700">
                        Create Study
                    </button>
                ) : (
                    <Button enabled={false} />
                )}
            </div>
        </div>
    );
};

export default CreateStudy;
