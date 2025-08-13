const multer= require('multer')
const path= require('path')

   
   // Multer
        const storage= multer.diskStorage({
            destination:(req,res,cb)=>{
                cb(null,"uploads/")
            },
            filename:(req,file,cb)=>{
                cb(null,Date.now()+path.extname(file.originalname))
            }
        })

        const upload= multer({storage})

module.exports = upload