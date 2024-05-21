import Tooltip from './../../Tooltip';
import { HiQuestionMarkCircle } from 'react-icons/hi';

const HeadCell = ({ title, details }) => {
    return (
        <div className="">
            <div
                scope="col"
                className="pt-3 text-center text-xs font-medium uppercase text-gray-500">
                {title}
            </div>
            <Tooltip
                Icon={HiQuestionMarkCircle}
                details={details}
                title={title}
            />
        </div>
    );
};

export default HeadCell;
