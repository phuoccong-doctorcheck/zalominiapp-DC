import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { mapModifiers } from "../../../utils/functions";

type HeaderType = "default" | "hide";

interface RichTextEditorProps {
  value?: string;
  placeholder?: string;
  handleChange: (value: string) => void;
  header?: HeaderType;
  readOnly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  handleChange,
  header,
  readOnly,
  placeholder,
}) => {
  return (
    <div className={mapModifiers("a-rich_editor", header)}>
      <ReactQuill
        theme="snow"
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
      />
    </div>
  );
};

export default RichTextEditor;
