import CloseButton from "../ui/CloseButton";
import tutorialTextData, {UnlockKey} from "../../data/texts/tutorials";
import {hideTutorial} from "../../gameState/storeSlices/playerUnlockedContent";
import {useDispatch} from "react-redux";

type TutorialModalProps = {
    tutorialId: UnlockKey;
};

function TutorialModal({tutorialId}: TutorialModalProps) {
    const tutorial = tutorialTextData[tutorialId];
    const dispatch = useDispatch();

    const close = () => dispatch(hideTutorial());

    return (
        <article
            className="absolute top-0 left-0 bg-opacity-25 bg-black border-slate-800 w-full h-full text-white flex justify-center items-center z-[250]"
            onClick={close}>
            <div
                className="bg-zinc-800 min-h-[33%] w-1/3 mb-52 p-6 rounded-md border-slate-700 border relative z-[110] flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <CloseButton callback={close} position="top-right" />
                <h1 className="text-2xl text-yellow-500">{tutorial.title}</h1>
                <p className="mb-2 whitespace-pre-wrap">{tutorial.text}</p>
                {/* <div className="w-full flex justify-center"> */}
                <button onClick={close} className="border mx-auto rounded-md w-1/2 text-lg hover:text-black hover:bg-yellow-500">
                    Close
                </button>
                {/* </div> */}
            </div>
        </article>
    );
}

export default TutorialModal;
