import multer from "multer";

const storage= multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads");
    },
    filename(req,file,cb){
        const timestamp=Date.now();
        
        const extName=file.originalname.split(".").pop();
        const filename=`${timestamp}.${extName}`;
        cb(null,filename);
    },

});
export const uploadFile =multer({storage}).single("file");