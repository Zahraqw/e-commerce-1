import {
  useEffect,
  useCallback,
  useState,
  FontAwesomeIcon,
} from "../../Constants.js";
import { useDropzone } from "react-dropzone";
const DropZone = ({ tit, multiple, register, setValue, handleKeyPress }) => {
  const [file, setFile] = useState(null); // For single file
  const [files, setFiles] = useState([]); // For multiple files
  const [rejected, setRejected] = useState([]);
  const accept = {
    "image/*": [],
  };
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (!multiple) {
        if (acceptedFiles.length > 0) {
          const acceptedFile = acceptedFiles[0];
          console.log(acceptedFile);
          setFile(
            Object.assign(acceptedFile, {
              preview: URL.createObjectURL(acceptedFile),
            })
          );
          setValue(register.name, acceptedFile);
        }
      } else {
        acceptedFiles.forEach((file) => {
          const isDuplicate = files.some(
            (existingFile) => existingFile.name === file.name
          );
          if (!isDuplicate) {
            if (acceptedFiles?.length) {
              // Optional chaining here
              setFiles((previousFiles) => [
                ...previousFiles,
                Object.assign(file, { preview: URL.createObjectURL(file) }),
              ]);
              setValue(register.name, [...files, file]);
            }
          } else {
            console.log(
              `File "${file.name}" already exists. Rejecting duplicate file.`
            );
          }
        });
      }

      rejectedFiles?.forEach((file) => {
        const isDuplicate = rejected.some(
          (existingFile) => existingFile.name === file.name
        );
        if (!isDuplicate) {
          if (setRejected?.length) {
            // Optional chaining here
            setRejected((previousFiles) => [
              ...previousFiles,
              ...rejectedFiles,
            ]);
          }
        } else {
          console.log(
            `File "${file.name}" already exists. Rejecting duplicate file.`
          );
        }
      });
    },
    [multiple, register.name, setValue, setFile, setFiles, files, rejected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: multiple,
  });
  const removeFile = () => {
    setFile(null);
    setValue(register.name, null);
  };

  const removeMFile = (name) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
    setValue(
      register.name,
      files.filter((file) => file.name !== name)
    );
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <section className="DropZone">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="drop">Drop the files here ...</p>
        ) : (
          <div className="drop">
            <FontAwesomeIcon
              icon="fa-solid fa-upload"
              style={{ color: "#777", fontSize: "25px" }}
            />
            <p className="mt-2">{tit} </p>
          </div>
        )}
      </div>
      {!multiple && file && (
        <div className="BasicImage">
          <img src={file.preview} alt="" />
          <button
            type="button"
            onClick={() => removeFile()}
            className="delete-button mt-1"
          >
            Remove
          </button>
        </div>
      )}

      {multiple && files.length > 0 && (
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              <div>
                <img src={file.preview} alt={file.name} />
              </div>
              <button
                type="button"
                onClick={() => removeMFile(file.name)}
                className="delete-button mt-1"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {rejected.length > 0 ? (
        <div className="border-top rejected ">
          <h5 className="mt-3 tit text-danger"> Rejected Files </h5>
          <div className="mt-1">
            {rejected.map(({ file, errors }) => (
              <div key={file.name} className="rejectedFiles">
                <li key={file.name}>
                  {file.name}
                  <div className="text-[12px] text-red-400">
                    {errors.map((error) => (
                      <p className="text-danger error-message" key={error.code}>
                        * {error.message}
                      </p>
                    ))}
                  </div>
                </li>
                <button
                  type="button"
                  onClick={() => removeRejected(file.name)}
                  className="delete-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default DropZone;
