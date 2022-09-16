import dbConnect from "../../../lib/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const {
        method,
        query: {category, manufacturer}

    } = req;


    await dbConnect()

        if (method === "GET") {

            try {
                let products;
                if (category) {

                    products = await Product.find({
                        categories: {
                            $in: [category],
                        }
                    });
                } else if (manufacturer) {
                    products = await Product.find({
                        manufacturer
                    });
                } else {
                    products = await Product.find();
                }
                res.status(200).json(products);
            } catch (err) {
                res.status(500).json(err)
            }

        }
        if (method === "POST") {

            try {
                const product = await Product.create(req.body);
                res.status(201).json(product)
            } catch (err) {
                res.status(500).json(err);
            }
        }

}
