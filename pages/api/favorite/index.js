import dbConnect from "../../../lib/mongo";
import Favorite from "../../../models/Favorite";
import Cart from "../../../models/Cart";
import User from "../../../models/User";

export default async function handler(req, res) {
    const {
        method,
        query: {favorite},

    } = req;


    await dbConnect()

    if(method==="GET"){

        try {

            let favorites;
            if (favorite) {

                favorites = await Favorite.findOne(
                    {userId: favorite}
                );
            }else {
                favorites = await Favorite.find();
            }
            res.status(200).json(favorites);
        }catch(err){
            res.status(500).json(err)
        }

    }
    if(method==="POST"){
        const userId = req.body.userId

        try{
            const favorite = await Favorite.create(req.body);
            if(favorite._id){
                await User.findByIdAndUpdate(userId,
                    {favorites: favorite._id})
            }
            res.status(201).json(favorite)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method === 'PUT') {
        const {save, remove} = req.body
        if (save) {
            try{
            const updatedFavorite = await Favorite.findOneAndUpdate(
                {userId: favorite},
                {$push: {items: {...save}}}
            )
            res.status(200).json(updatedFavorite)
        }catch(err){
            res.status(500).json(err);
        }
        }
        if (remove) {
            try {
                const deleteFavoriteItem = await Favorite.updateOne(
                    {userId: favorite},
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
}

