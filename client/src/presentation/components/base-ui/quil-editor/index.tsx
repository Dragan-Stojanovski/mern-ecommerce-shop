import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller, Control, RegisterOptions } from 'react-hook-form';

/**
 * Props for the QuillEditor component.
 *
 * @param name - The name of the form field.
 * @param control - The control object from react-hook-form for managing form state.
 * @param rules - Validation rules for the form field, based on react-hook-form's RegisterOptions.
 */
interface IQuillEditorProps {
  name: string;
  control: Control;
  rules?: RegisterOptions;
}

/**
 * QuillEditor component integrates ReactQuill with react-hook-form.
 * @param props - {@link IQuillEditorProps}
 *  */
const QuillEditor = ({ name, control, rules }: IQuillEditorProps): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <div>
          <ReactQuill
            ref={ref}
            value={value || ''}
            onChange={(content) => onChange(content)}
            onBlur={onBlur}
            theme="snow"
          />
          {error && <span style={{ color: 'red' }}>{error.message}</span>}
        </div>
      )}
    />
  );
};

export default QuillEditor;