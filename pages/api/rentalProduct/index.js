import dbConnect from "../../../lib/mongo";
import Rental from "../../../models/Rental";

export default async function handler(req, res) {
    const {
        method,
        query: {category, manufacturer}

    } = req;


    await dbConnect()

    if (method === "GET") {

        try {
            let rentalProducts;
            if (category) {

                rentalProducts = await Rental.find({
                    categories: {
                        $in: [category],
                    }
                });
            } else if (manufacturer) {
                rentalProducts = await Rental.find({
                    manufacturer
                });
            } else {
                rentalProducts = await Rental.find();
            }
            res.status(200).json(rentalProducts);
        } catch (err) {
            res.status(500).json(err)
        }

    }
    if (method === "POST") {

    try {
            const rental = await Rental.create(req.body);
            res.status(201).json(rental)
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
