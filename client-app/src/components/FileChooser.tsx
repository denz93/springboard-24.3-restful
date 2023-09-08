
type FileChooserProps= {
  accept?: string,
  multiple?: boolean,
  onChange?: (fileList: FileList) => any
  children?: string,
  name?: string,
  class?: string
}
const FileChooser = ({accept, multiple, name, onChange, children, ...restProps}: FileChooserProps) => {
  let fileInput: HTMLInputElement | undefined;

  const fileChangeHandler = (event: Event) => {
    if (!onChange) return 
    const ele = event.target as HTMLInputElement
    if (!ele.files) return


    onChange(ele.files)
    
  }
  const buttonClickHandler = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    if (fileInput) {
      fileInput.click()
    }
  }

  return <div {...restProps}>
    <button onClick={buttonClickHandler}>{children}</button>
    <input ref={fileInput} multiple={multiple} type="file" onChange={fileChangeHandler} name={name} accept={accept} hidden aria-hidden/>
  </div>
}

export default FileChooser

