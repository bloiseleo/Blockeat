import { ReactElement } from "react";

interface Props {
    children: ReactElement
}
export default function Modal({
    children
}: Props) {
    return (
        <div className="fixed flex justify-center items-center bg-shadowBlack top-0 left-0 w-screen h-screen">
            <div className="w-1/2 h-1/2 min-w-[500px] min-h-[300px]">
                {children}
            </div>
        </div>
    );
}