import {useFloating, useHover, useInteractions} from "@floating-ui/react";
import {size} from "@floating-ui/dom";

type UseTooltipProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
};

const useTooltip = ({show, setShow}: UseTooltipProps) => {
    const {refs, floatingStyles, context} = useFloating({
        open: show,
        onOpenChange: setShow,
        middleware: [
            size({
                apply({elements}) {
                    Object.assign(elements.floating.style, {
                        width: "300px",
                    });
                },
            }),
        ],
    });
    const hover = useHover(context, {
        delay: {
            open: 200,
            close: 0,
        },
    });
    const {getReferenceProps, getFloatingProps} = useInteractions([hover]);
    return {refs, floatingStyles, getReferenceProps, getFloatingProps};
};

export default useTooltip;
