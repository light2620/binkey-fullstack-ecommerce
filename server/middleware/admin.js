import UserModel from "../Model/user.model.js";
const isAdmin = async(request,responsem,next)=>{
    try{

        const id = request.userId;
        if(!id){
            return response.json({
                message : "no id provided",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findById(id);
        if(!user){
            return response.json({
                message : "no user found with this id"
            })
        }
        if(user.role !== 'ADMIN'){
            return response.json({
                message : "unauthorize person",
                success : false,
                error : true
            })
        }

        next();

    }catch(err){
        return response.status(500).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

export {isAdmin}