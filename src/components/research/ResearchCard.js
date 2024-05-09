import { useNavigate } from 'react-router';

const ResearchCard = ({ research }) => {
    const navigate = useNavigate();
    const researchURL = `/research/${research.study_id}`;
    return (
        <div
            className="flex w-[300px] cursor-pointer flex-col items-center gap-3 rounded-xl border bg-gray-50 p-4 shadow-md hover:bg-gray-200"
            onClick={() => navigate(researchURL)}>
            <p className="w-11/12 truncate text-center text-2xl font-bold text-gray-800">
                {research.study_name}
            </p>
            <p className="text-gray-500">{research.study_created_at}</p>
            <p className="text-gray-500">
                Total Experiments: {research.study_num_exp}
            </p>
        </div>
    );
};

export default ResearchCard;
