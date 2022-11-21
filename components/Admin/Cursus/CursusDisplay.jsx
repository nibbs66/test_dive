import {useState} from 'react';
import NewCursusPage from "./NewCursusPage";
import app from "../../../lib/firebase";
import axios from "axios";
import NewCursusSchedule from "./NewCursusSchedule";

const CursusDisplay = ({page, cursus}) => {
    const [file, setFile] = useState([])
    const [inputs, setInputs] = useState({})
    const [img, setImg] = useState([])
    const [activeIndex, setActiveIndex] = useState(1)
    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })

    };
    const handleClick = async (e) =>{
        e.preventDefault()

        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName)


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
                console.log(error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log(downloadURL)
                    setImg(prev=>[...prev, downloadURL])

                });
            }
        );
    }
    const handleData = async(e) =>{
        e.preventDefault()
        try{
            const res = await axios.post('/api/cursusDescription', {

                img: img,
                inputs,

            })
            console.log(res.data)
        }catch(err){
            console.log(err)
        }

    }

    return (
        <>

            {(page?.length === 1 && page[0] === 'new') &&  <NewCursusPage handleClick={handleClick} handleData={handleData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} handleChange={handleChange} file={file} setFile={setFile}/>}
            {(page?.length === 1 && page[0] !== 'new') &&   <span>Bang</span>}

            {page?.length === 2 && <NewCursusSchedule cursus={cursus}/>}
        </>
    );
};

export default CursusDisplay;
