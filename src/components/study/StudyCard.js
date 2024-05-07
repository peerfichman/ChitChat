import { useNavigate } from 'react-router';

const StudyCard = ({ study }) => {
    const navigate = useNavigate();
    const studyURL = `/study/${study.study_id}`;
    return (
        <div
            className="flex w-[300px] cursor-pointer flex-col items-center gap-3 rounded-xl border bg-gray-50 p-4 shadow-md hover:bg-gray-200"
            onClick={() => navigate(studyURL)}>
            <p className="w-11/12 truncate text-center text-2xl font-bold text-gray-800">
                {study.study_name}
            </p>
            <p className="text-gray-500">{study.study_created_at}</p>
        </div>
    );
};

export default StudyCard;
