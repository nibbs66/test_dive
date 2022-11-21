import dbConnect from "../../../lib/mongo";
import CursusDescription from "../../../models/CursusDescription";


export default async function handler(req, res) {
    const {
        method,
        query: {id}

    } = req;


    await dbConnect()

    if (method === "GET") {

        try {
            let courses;
            if(id) {
                courses = await CursusDescription.find({
                    _id: id
                });
            }else{
                courses = await CursusDescription.find();
            }


            res.status(200).json(courses);
        } catch (err) {
            res.status(500).json(err)
        }

    }
    if (method === "POST") {
        const{inputs, img}= req.body

        try {
            const course = await CursusDescription.create({
                cursus: inputs.cursus,
                minStudent: inputs.minStudents,
                maxStudents: inputs.maxStudents,
                cutOff: inputs.cutOff,
                desc: inputs.desc,
                img: img
            });
            res.status(201).json(course)
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
