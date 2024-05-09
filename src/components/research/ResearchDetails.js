import DetailObject from '../DetailObject';

const ResearchDetails = ({ study }) => {
    return (
        <div className="grid w-full grid-cols-2">
            <DetailObject title="Created At" value={study.study_created_at} />
            <DetailObject
                title="Default Provoking Prompt"
                value={study.study_prompt}
            />
            <DetailObject title="Subject" value={study.study_subject} />
            <DetailObject title="Description" value={study.study_description} />
        </div>
    );
};

export default ResearchDetails;
