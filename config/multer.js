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
        const fileFilter = (req, file, cb) => {
            const allowed = /jpeg|jpg|png|gif/;
            const ext = path.extname(file.originalname).toLowerCase();
            if (allowed.test(ext)) {
                cb(null, true);
            } else {
                cb(new Error('Apenas imagens são permitidas'));
            }
            };

        const upload = multer({ storage, fileFilter });

module.exports = upload