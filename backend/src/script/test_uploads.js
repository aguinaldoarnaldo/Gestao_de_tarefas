const fs = require('fs');
const path = require('path');
const uploadPath = path.join(__dirname, '../uploads');

/* just to check directory */
fs.readdir(uploadPath, (err, files) => {
    if (err) console.error(err);
    else console.log('Uploads:', files.length);
});
