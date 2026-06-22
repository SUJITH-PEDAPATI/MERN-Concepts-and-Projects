const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req,res) => {
    const filePath = path.join(__dirname, req.url === '/' ? "index.html":req.url);
    const extName = String(path.extname(filePath)).toLowerCase()
    // File Types that Can be Supported!!
    const mimeType = { 
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
        '.png' : 'text/png'
    }

    const contentType = mimeType[extName] || 'application/octet-stream' // This 'octet stream' is a general Binary (either .exe ... ) file Type

    fs.readFile(filePath, (err,content) => {
        if(err){
            if (err.code === "ENOENT"){
                res.writeHead(404,{"Content-Type": 'text/html'});
                res.end("404: File Not Found Brooooo");
            }
        }
        else{
            res.writeHead(200,{'Content-Type':contentType});
            res.end(content, 'utf-8');
        }
    })
})

server.listen(port,() => {
    console.log(`Server is listening to ${port}.`)
})

