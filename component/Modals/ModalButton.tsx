interface Props {
    onClick: () => void,
    text: string
}

export default function ModalButton({ onClick, text }: Props) {
    return (
        <button onClick={onClick} type="button" className='group/item flex outline-none' autoFocus={true}>
            <span className='group-hover/item:block hidden text-white'>{`>`}</span>
            <span className='ml-2 text-white'> {text} </span>
        </button>
    );
}