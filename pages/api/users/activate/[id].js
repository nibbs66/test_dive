import axios from "axios";
import PendingUser from "../../../../models/PendingUser";



export default async function activateUser(req, res) {
    const {

        query: {id},

    } = req;

    if(!id){
        return res.status(401).json({message: 'Cannot validate User!!'})
    }

    const response = await axios.get(process.env.PUBLIC_URL +`/api/users/pending/${id}`)

    if(response.status >=400){
        return res.status(401).json({message: 'Cannot validate User!!'})
    }else {
        res.writeHead(307, { Location: `/activate/${id}` });
        res.end();
    }

    try {
        const user = await PendingUser.findById(id);

        !user && res.status(404).json('User not found');
        res.status(200).json( {message: `User ${id} has been activated.`})
    } catch (err) {

        res.status(401).json(err)


    }


}
