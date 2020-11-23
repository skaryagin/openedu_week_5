export default function (express, bodyParser, createReadStream, crypto, http) {
    const hu = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE' };
    const app = express();
    app
        .use((r, rs, n) => rs.status(200).set(hu) && n())
        .use(bodyParser.urlencoded({extended: false}))
        //.use(bodyParser.text({ type: 'text/plain' }))
		.get('/login/', (req, res) => {
            res.send('skaryagindevicemy');
        })
        .get('/code/', (req, res) => {
            const file = import.meta.url.substring(7);
			createReadStream(file).pipe(res);
        })
        .get('/sha1/:input/', (req, res) => {
            var shasum = crypto.createHash('sha1');
            shasum.update(req.params.input);
            res.send(shasum.digest('hex'));
        })
        .all('/req/', (req, res) => {
            debugger;
            const addr = req.query.addr || req.body.addr;
            if(addr){
                http.get(addr, (rs) => {
                    rs.pipe(res);
                });
            }
        })
        .all(/./, (req, res) => {
            res.send('skaryagindevicemy');
        })
        .use((e, r, rs, n) => rs.status(500).set(hu).send(`Ошибка: ${e}`));
    return app;
}
