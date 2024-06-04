import {useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {Tooltip} from "primereact/tooltip";
import {FileUpload} from "primereact/fileupload";
import {ProgressBar} from "primereact/progressbar";
import {Toast} from "primereact/toast";

export type ImageSelectorProps = {
    file: File,
    setFile: (value: (((prevState: null) => null) | null)) => void,
    title: string,
}

const ImageSelector = (props: ImageSelectorProps) => {
    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    //initial setting file to null in case of before creating server and it being in memory
    useEffect(() => {
        props.setFile(null);
    }, [])

    const onTemplateSelect = (e) => {
        let _totalSize = 0;
        setTotalSize(0);
        const currentFile = e.files[0];

        props.setFile(currentFile);
        _totalSize += currentFile.size || 0;
        setTotalSize(_totalSize);
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(0);
        props.setFile(null);
        callback();
    };

    const onTemplateClear = () => {
        props.setFile(null);
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const {className, chooseButton, cancelButton} = options;

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {cancelButton}
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '30%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100}/>
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                    </span>
                </div>
                <Button type="button" icon="pi pi-times"
                        className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                        onClick={() => onTemplateRemove(file, props.onRemove)}/>
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image p-3" style={{
                    fontSize: '2em',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-b)',
                    color: 'var(--surface-d)'
                }}></i>
                <span style={{fontSize: '1.2em', color: 'var(--text-color-secondary)'}} className="my-1">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };
    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom"/>
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom"/>
            <div className="font-semibold mb-2">{props.title}</div>
            <FileUpload ref={fileUploadRef}
                        url="/api/upload"
                        accept="image/*"
                        maxFileSize={1048576}
                        onSelect={onTemplateSelect} onError={onTemplateClear}
                        onClear={onTemplateClear}
                        headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions} cancelOptions={cancelOptions}/>
        </div>
    )
}

export default ImageSelector;

