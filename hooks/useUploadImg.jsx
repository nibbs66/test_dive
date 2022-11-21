import {useState, useEffect} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../lib/firebase";
const useUploadImg = (file, setFile) => {
    const [uploadedImage, setUploadedImage] = useState([])
    const [err, setError] = useState('')
    const [success, setSuccess] = useState(false)
    useEffect(()=>{
        setSuccess(false)
        if(file!==null){
            const handleUpload = async() => {

                const fileName = new Date().getTime() + file.name;
                const storage = await getStorage(app);
                const storageRef = await ref(storage, fileName)
                const uploadTask = uploadBytesResumable(storageRef, file);
                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default:
                        }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                            setUploadedImage((prev)=>[...prev, downloadURL])
                            setSuccess(true)
                            setFile(null)

                        });
                    }
                );


            }
            handleUpload()
        }else{
            setError('whoops')
        }

    },[file])


    return {uploadedImage, setUploadedImage, err, success}
};

export default useUploadImg;
