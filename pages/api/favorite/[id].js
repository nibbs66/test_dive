import dbConnect from "../../../lib/mongo";
import Favorite from "../../../models/Favorite";

export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if (method === "GET") {

        try {
            const favorite = await Favorite.findById(id);

            res.status(200).json(favorite);
        } catch (err) {
            res.status(500).json(err)
        }

    }
    if(method === 'PUT') {
        const {save, remove} = req.body

        if (save) {
            try {
                const updatedFavorite = await Favorite.findOneAndUpdate(
                    id,
                    {$push: {items: {...save}}}
                )
                res.status(200).json(updatedFavorite)
            } catch (err) {
                res.status(500).json(err);
            }
        }else if (remove) {
            try {
                const deleteFavoriteItem = await Favorite.findByIdAndUpdate(
                    id,
                    {
                        $pull: {
                            items: {_id: remove}
                        }
                    },
                    {safe: true}
                )
                res.status(200).json(deleteFavoriteItem)
            } catch (err) {
                res.status(500).json(err);
            }
        }
    }
    if(method === 'DELETE'){
        try{
            await Favorite.findByIdAndDelete(id)
            res.status(200).json("Favorite has been deleted...")
        }catch(err){
            res.status(500).json(err)
        }
    }

}
