import dbConnect from "../../../lib/mongo";

import Product from "../../../models/Product";

export default async function handler(req, res) {
    const {
        method,
        query: {id, subType},
        cookies
    } = req;



    await dbConnect()

    if(method==="GET"){

        try{
            let product;
            if (subType) {

                product = await Product.findOne({
                    id,
                    "productSubType._id": subType
                });
            }else{
                product = await Product.findById(id);
            }

            res.status(200).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    }
    if(method==="PUT"){
        console.log(req.body)

        try{
            let product;
            if(req.body.removeImg) {
                product = await Product.findByIdAndUpdate(id,
                    {$pull: {img: req.body.file}},
                    {new: true}
                )
            }else if(req.body.deleteSub){
                product = await Product.updateOne(
                    {_id: id},
                    {$pull: {
                            productSubType: {_id: req.body.data.id}
                        }},
                    {safe: true}
                )
            }else if(req.body.inventory){
                const{ update, quantity} = req.body
                product = await Product.findByIdAndUpdate({
                        _id: id,

                    },
                    {$inc: {[`productSubType.$[outer].stock`]: -quantity}},
                    { "arrayFilters": [{ "outer._id": update}], new: true}
                );
            }else if(req.body.newSub){
                console.log(req.body)
                product = await Product.updateOne(
                    {_id: id},
                    {$push: {
                            productSubType:
                                {$each:
                                        [{
                                            modelId: req.body.sub.modelId,
                                            color: req.body.sub.color,
                                            size: req.body.color.size,
                                            barcode: req.body.sub.barcode,
                                            stock: req.body.sub.stock,}]}}}

                )
            }else if(req.body.productEdit){

                if(Object.keys(sub).includes('stock')){
                    product = await Product.findByIdAndUpdate({
                            _id: id
                        },
                        {$set: {[`productSubType.$[outer].stock`]: sub.stock}},
                        { "arrayFilters": [{ "outer._id": sub.subId}], new: true}

                    );
                } if(Object.keys(sub).includes('modelId')){
                    product = await Product.findByIdAndUpdate({
                            _id: id
                        },
                        {$set: {[`productSubType.$[outer].modelId`]: sub.modelId}},
                        { "arrayFilters": [{ "outer._id": sub.subId}], new: true}

                    );
                } if(Object.keys(sub).includes('barcode')){
                    product = await Product.findByIdAndUpdate({
                            _id: id
                        },
                        {$set: {[`productSubType.$[outer].barcode`]: sub.barcode}},
                        { "arrayFilters": [{ "outer._id": sub.subId}], new: true}

                    );
                } if(Object.keys(sub).includes('size')){
                    product = await Product.findByIdAndUpdate({
                            _id: id
                        },
                        {$set: {[`productSubType.$[outer].size`]: sub.size}},
                        { "arrayFilters": [{ "outer._id": sub.subId}], new: true}

                    );
                }if(Object.keys(sub).includes('color')){
                    product = await Product.findByIdAndUpdate({
                            _id: id
                        },
                        {$set: {[`productSubType.$[outer].color`]: sub.color}},
                        { "arrayFilters": [{ "outer._id": sub.subId}], new: true}

                    );
                }

            }else{
                product = await Product.findByIdAndUpdate(id, req.body, {new: true});
            }


            res.status(201).json(product)
        }catch(err){
            res.status(500).json(err);
        }
    }
    if(method==="DELETE"){


        try{
            await Product.findByIdAndDelete(id);
            res.status(200).json("ProductPage Deleted")
        }catch(err){
            res.status(500).json(err);
        }
    }
}
