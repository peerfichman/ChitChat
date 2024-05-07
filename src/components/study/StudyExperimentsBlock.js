import ExperimentSearchBar from '../Experiment/ExperimentSearchBar';

const StudyExperimentsBlock = ({ experiments }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="mb-2 flex w-fit items-center">
                <p className="h-fit align-middle text-3xl font-bold">
                    Experiments
                </p>
            </div>
            <ExperimentSearchBar experiments={experiments} />
        </div>
    );
};

export default StudyExperimentsBlock;
