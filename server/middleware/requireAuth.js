import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
    try{
        const { authorization } = req.headers;

        if(!authorization)
            return res.status(400).json({error: 'No authorization!'});

        const token = authorization.split(" ")[1];
        const isCustomToken = (token.length < 500)? true : false;

        let decodedData;
        if(isCustomToken){
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN);
            req.userId = decodedData.id;         
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;
        }

        
        next();

    }catch(e){
        res.status(400).json({error: 'Unauthorized access!'});
    }
}

export default requireAuth;