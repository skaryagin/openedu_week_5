import { randomBytes } from 'crypto';
import mime from 'mime';
import { basename } from 'path';
import { fileURLToPath } from 'url';

export default function (express, bodyParser, fs, crypto, http) {
    const hu = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE' };
    const app = express();
    app
        .use((r, rs, n) => rs.status(200).set(hu) && n())
        .use(bodyParser.urlencoded({extended: true}))
        .use(bodyParser.json())
        .get('/code/', (req, res) => {
            const file = fileURLToPath(import.meta.url);
            var filename = basename(file);
            var mimetype = mime.lookup(file);
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        })
        .get('/sha1/:input/', (req, res) => {
            var shasum = crypto.createHash('sha1');
            shasum.update(req.params.input);
            res.send(shasum.digest('hex'));
        })
        .all('/req/', (req, res) => {
            const addr = req.query.addr || req.body.addr;
            if(addr){
                http.get(addr, (rs) => {
                    rs.pipe(res);
                });
            }
        })
        .use((req, res) => {
            res.send('skaryagindevicemy');
        })
        .use((e, r, rs, n) => rs.status(500).set(hu).send(`Ошибка: ${e}`));
    return app;
}

function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }