import {useState} from 'react';
import Image from "next/image";
import axios from "axios";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../../lib/firebase"
import Upload from "../../icons/Upload";
const PageLayout = () => {
    const [file, setFile] = useState([])
    const [inputs, setInputs] = useState({})
    const [img, setImg] = useState([])
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
        <div className='flex  mt-5 mb-5 mx-10'>

            <form className='w-full' action="submit">

                <div className='flex w-full justify-between'>
                    <div className='w-2/5'>
                        <span className='uppercase text-2xl pl-2 pb-10 text-slate-500'>Cursus</span>
                        <div className='flex flex-col  mt-5'>
                            <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Cursus</label>
                            <input  className='border-2 px-2 py-1 mb-2 rounded' type="text" name='cursus'
                                    onChange={handleChange}
                            />
                            <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Minimum Studenten</label>
                            <input  className='border-2 px-2 py-1 mb-2 rounded' type="number" name={'minStudents'}
                                    onChange={handleChange}
                            />
                            <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Maximum Studenten</label>
                            <input  className='border-2 px-2 py-1 mb-2 rounded' type="number" name={'maxStudents'}
                                    onChange={handleChange}
                            />
                            <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Days to Cutoff</label>
                            <input  className='border-2 px-2 py-1 mb-2 rounded' type="number" name={'cutOff'}
                                    onChange={handleChange}
                            />
                            <label className='px-2 py-1 uppercase font-semibold text-slate-400' htmlFor="">Course Description</label>
                            <textarea  className='border-2 px-2 py-1 mb-2 rounded h-32' type="text" name={'desc'}
                                       onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className=' flex flex-col  w-full'>
                        <span className='uppercase text-2xl pl-2 pb-10 text-slate-500 text-center'>Images</span>
                        <div className='flex flex-col  mt-5 gap-5'>
                            <div className={`flex   justify-center`}>
                                <Image className={`flex items-center h-14 w-14 rounded-full  z-50`} width={100} height={100} objectFit='contain'
                                       src={
                                            file.length !== 0
                                                ? URL.createObjectURL(file)

                                                :  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        }
                                        alt=""
                                />
                            </div>
                            <div className={`flex items-center justify-center cursor-pointer pb-5`}>
                                <label className={`flex items-center gap-2 cursor-pointer`} htmlFor="file">
                                    Choose File:     <Upload  />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile( e.target.files[0])}
                                    style={{ display: "none"}}
                                />
                            </div>
                            <div className={`flex items-center justify-center`}>
                                <span onClick={handleClick} className={`text-center bg-blue-500 text-white px-2 py-1 rounded w-1/4 cursor-pointer uppercase`}>Upload Img</span>
                            </div>

                        </div>
                    </div>


                </div>
                <div className='flex w-full justify-center mt-5'>
                    <button onClick={handleData} className='uppercase font-bold px-3 py-1 bg-blue-500 text-white rounded'>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default PageLayout;
