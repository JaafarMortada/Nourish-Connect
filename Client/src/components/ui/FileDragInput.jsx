import Dropzone from 'react-dropzone'
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const FileDragInput = ({ name, onFileUpload }) => {

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]; 
        onFileUpload(file);
    };

    return (
        <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <section className="border-2 border-[--primary] rounded-lg flex">
                    <div {...getRootProps()} className="w-[250px] h-[120px] border-2 border-[--primary] rounded-lg flex flex-col items-center justify-center gap-3">
                        <input
                            {...getInputProps()}
                            name={name}
                        />
                        <ArrowUpTrayIcon className="w-10 h-10 text-[--primary]" />
                        <div>
                            <span className="text-[16px] font-bold text-[--primary]">Choose a file. </span>
                            <span className="text-[16px] text-[--primary]">Or Drag it here.</span>
                        </div>

                    </div>
                </section>
            )}
        </Dropzone>
    )
}

export default FileDragInput