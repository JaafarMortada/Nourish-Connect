import PrimaryButton from './Button'

const DownloadTemplate = ({ path, fileName }) => {
    return (
        <a
            className="teacher-option-btn grade-card-btn"
            href={`http://localhost:8000/storage/${path}/${fileName}`}
            download={`${fileName}`}
            target="_blank"
        >
            <PrimaryButton
                label={"Download Template"}
                classNames={`max-h-[40px] flex justify-center items-center min-w-[200px] bg-[--primary]`}

            />
        </a>
    )
}

export default DownloadTemplate