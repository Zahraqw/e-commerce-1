import { Controller } from "../../Constants.js";
import JoditEditor from "jodit-react";

const Editor = ({ control, name }) => {
  const editorConfig = {
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue=" " // Set your default value here
        render={({ field }) => (
          <JoditEditor
            value={field.value}
            config={editorConfig}
            onBlur={() => field.onBlur()} // important for validation
            onChange={(value) => field.onChange(value)}
          />
        )}
      />
    </div>
  );
};

export default Editor;
