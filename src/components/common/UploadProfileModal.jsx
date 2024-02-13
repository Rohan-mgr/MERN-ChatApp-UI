import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCamera } from "react-icons/fa";
import { updateUserProfile } from "../../services/user";
import { useFormik } from "formik";


function UploadProfileModal({show, handleProfileModal, userId}) { 
  const [selectedFile, setSelectedFile] = useState(null);

    
  const handleFileChange = (event) => {
    const fileInput = event.currentTarget;
    const file = fileInput.files[0];
    setSelectedFile(file);
    event.target.value =  null;
  };

  const formik = useFormik({
    initialValues:{},
    onSubmit: async (_, { resetForm }) => {
      const payload = {
        file: selectedFile,
        userId
      };
      try {
        console.log("submiteddd")
        const response = await updateUserProfile(payload);
        console.log(response, "response update profile");
        handleProfileModal();
      } catch (error) {
        console.log(error);
      }
      setSelectedFile(null);
      resetForm();
    },
  });
    
  return (
      <Modal show={show} onHide={handleProfileModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Your Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off" onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <label className='upload__profile__label'>
              <input type="file" name="profile" onChange={handleFileChange} accept="image/*"/>
            <span><FaCamera /></span>
            </label>
            <div className='profile__preview'>
              {selectedFile ? 
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
              />: <p>Preview your profile</p> }
            </div>
              
            <Button variant="success"  type="submit">
              {formik.isSubmitting ? "Uploading..." : "Upload" }
            </Button>
          </form>

        </Modal.Body>
      </Modal>
  );
}

export default UploadProfileModal