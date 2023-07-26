
const Multer = require('@koa/multer')



let storage=Multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/upload")
    },
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
let upload=Multer({storage:storage})





module.exports = upload