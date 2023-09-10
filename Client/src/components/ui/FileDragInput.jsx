import Dropzone from 'react-dropzone'
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';
import ErrorDialog from './ErrorDialog';
const FileDragInput = (
    { name,
        onFileUpload,
        label,
        classNames,
        showIcon = true,
        accepted_types = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        error_message = null
    }
) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (accepted_types.includes(file.type)) {
            onFileUpload(file);
        } else {
            setOpen(true)
        }
    };

    return (
        <>
            <ErrorDialog
                title={"Error Processing File"}
                message={error_message ? error_message : "Please Upload a xlsx or csv file only."}
                open={open}
                handleOpen={handleOpen}
            />
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section className=" rounded-lg flex cursor-pointer">
                        <div {...getRootProps()} className={`lg:w-[250px] w-[180px] h-[120px] border-2 border-[--primary] rounded-lg flex flex-col items-center justify-center gap-3 ${classNames}`}>
                            <input
                                {...getInputProps()}
                                name={name}
                            />
                            {
                                showIcon ? <ArrowUpTrayIcon className="w-10 h-10 text-[--primary]" /> : null

                            }
                            <div className='text-center'>
                                <span className="text-[16px] font-bold text-[--primary]">{label ? label : 'Choose a file.'} </span>
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