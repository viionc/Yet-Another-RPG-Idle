type CloseButtonProps = {
    position: "top-left" | "top-right";
    callback: () => void;
};

function CloseButton({position, callback}: CloseButtonProps) {
    const pos = position === "top-left" ? "top-1 left-1" : "top-1 right-1";
    return (
        <button
            type="button"
            onClick={callback}
            className={`absolute ${pos} z-[50] bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-400 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}>
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    );
}

export default CloseButton;
