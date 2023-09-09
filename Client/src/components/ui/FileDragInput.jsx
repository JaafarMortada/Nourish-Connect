import Dropzone from 'react-dropzone'
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';
import ErrorDialog from './ErrorDialog';
const FileDragInput = ({ name, onFileUpload }) => {
    const acceptedFileTypes = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (acceptedFileTypes.includes(file.type)) {
            onFileUpload(file);
        } else {
            setOpen(true)
        }
    };

    return (
        <>
            <ErrorDialog
                title={"Error Processing File"}
                message={"Please Upload a xlsx or csv file only."}
                open={open}
                handleOpen={handleOpen}
            />
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section className=" rounded-lg flex cursor-pointer">
                        <div {...getRootProps()} className="lg:w-[250px] w-[180px] h-[120px] border-2 border-[--primary] rounded-lg flex flex-col items-center justify-center gap-3">
                            <input
                                {...getInputProps()}
                                name={name}
                            />
                            <ArrowUpTrayIcon className="w-10 h-10 text-[--primary]" />
                            <div className='text-center'>
                                <span className="text-[16px] font-bold text-[--primary]">Choose a file. </span>
                                <span className="text-[16px] text-[--primary]">Or Drag it here.</span>
                            </div>
                        </div>
                    </section>
                )}
            </Dropzone>
        </>
    )
}

export default FileDragInput