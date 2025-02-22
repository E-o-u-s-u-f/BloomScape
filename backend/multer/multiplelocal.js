import multer from "multer";
import {v4 as uuid} from "uuid";

const storage= multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploadmultiple");
    },
    filename(req,file,cb){
        const id=uuid();
        
        const extName=file.originalname.split(".").pop();
        const filename=`${id}.${extName}`;
        cb(null,filename);
    },

});
export const uploadFiles =multer({storage}).array("files",10);