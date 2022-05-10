import { 
connect } from 'react-redux';

import { 
Validations } from  'services/course/helpers/Validations';
//import './style.css';

const FileUpload = ({ 
    fileUploadUrl,
    onChangeHandler }) => {
return (
   <> 
   {/* <iframe name="hiddenFrame" class="hide" height="20px"></iframe> */}
   <div className="files-file-Container">
        <div class="container"> 
        <div class="row"> 
        <div class="col-md-6">
        <form method="POST" action={fileUploadUrl} id="#" enctype="multipart/form-data" target="hiddenFrame">
        <button type="submit" class="button uploadBtn" value="upload" />    
            <div class="form-group files"> 
            <label> Upload file(s). </label>
            <input type="file" name="file" class="form-control" multiple onChange={onChangeHandler}></input> 
            </div> 
        </form>  
        </div>
        {Validations.setErrorMessageContainer() }
        </div>
        </div>
    </div>
   </>

); };

export default connect()( FileUpload );
