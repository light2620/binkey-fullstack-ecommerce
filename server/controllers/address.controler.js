import AddressModel from "../Model/address.model.js";
import UserModel from "../Model/user.model.js";

const getAllAddressController = async(request,response) =>{
    try{
          const id = request.userId;
          if(!id){
            return response.json({
                message : "no address id is provided",
                error : true,
                success : false
            })
          }
          const addresses = await AddressModel.find({userId : id})
          return response.json({
            message : "address fetch successf full",
            success : true,
            error : false,
            data : addresses
          })
    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

const addAddressController = async(request,response) => {
    try{ 
        const {address_line, city, state,pincode,country,mobile,userId} = request.body;
        console.log(request.body)
        if(!address_line || !city || !state || !pincode || !country || !mobile ){
            return response.json({
                message : "all fields are mandatory",
                error : true,
                success : false
            })
        }
        if(!userId){
            return response.json({
                message : "user id is not provided",
                error : true,
                success : false
            })
        }
        
        const address = new AddressModel({address_line, city, state,pincode,country,mobile,userId})
        const saveAddress = await address.save();
        const addAddressInUser = await UserModel.findByIdAndUpdate(userId,{
            $push : {
                address_details : saveAddress._id
            }
        })
        return response.json({
            message : "address added successfully",
            success : true,
            error : false
        })
    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

const deletAddressController = async(request,response) => {
    try{ 
        
        const {id} = request.body;

        console.log(id)
        if(!id){
            return response.json({
                message : "please provide id"
            })
        }

        const deleteAddress = await AddressModel.findByIdAndDelete({_id: id});
        return response.json({
            message : "address deleted",
            error  : false,
            success : true
        })
        
    }catch(err){
        return response.json({
            message : err.message || err
        })
    }
}

export {getAllAddressController,addAddressController,deletAddressController}