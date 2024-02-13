require('dotenv').config();
const compression = require('compression');
const express = require("express");
const app = express();
var ioServer = require('./src/socket').init(app);

const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;

// Compress all HTTP responses
app.use(compression());

app.use(cors())
app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.json())

//--------------------------------
//Endpoint Umum
//--------------------------------
const UserRouter = require('./src/api/user/user.router')
app.use("/api/", UserRouter)

const NamaRouter = require("./src/api/nama_juri/nama_router")
app.use("/api/nama", NamaRouter)

const JuriRouter = require('./src/api/juri/juri.router.js')
app.use("/api/juri", JuriRouter)

const eventRouter = require('./src/api/event/event.router')
app.use("/api/event/", eventRouter)

const GelanggangRouter = require("./src/api/gelanggang/gelanggang.router")
app.use("/api/gelanggang/", GelanggangRouter)

//--------------------------------
//Endpoint Tanding
//--------------------------------
const pesertaTandingRouter = require('./src/api/api_tanding/peserta_tanding/peserta_tanding.router')
app.use("/api/tanding/peserta", pesertaTandingRouter)

const tandingRouter = require('./src/api/api_tanding/jadwal_tanding/jadwal_tanding.router')
app.use("/api/tanding/jadwal", tandingRouter)

const NilaiTandingRouter = require('./src/api/api_tanding/nilai_tanding/nilai_tanding.router')
app.use('/api/nilai/tanding', NilaiTandingRouter)

const verifRouter = require('./src/api/api_tanding/verif_tanding/verif_tanding.router')
app.use('/api/tanding/verif', verifRouter)

const peringatanRouter = require('./src/api/api_tanding/peringatan/peringatan.router')
app.use('/api/tanding/peringatan', peringatanRouter)


//--------------------------------
//Endpoint Seni
//--------------------------------
const pesertaSeniRouter = require('./src/api/api_seni/peserta_seni/peserta_seni.router')
app.use("/api/seni/peserta", pesertaSeniRouter)

const tgrRouter = require('./src/api/api_seni/jadwal_seni/jadwal_seni.router')
app.use("/api/seni/jadwal", tgrRouter)

const skorRouter = require('./src/api/api_seni/detail_nilai_seni/detail_nilai_seni.router')
app.use("/api/seni/detail", skorRouter)

const tunggalRouter = require('./src/api/api_seni/nilai_tunggal/nilai_tunggal.router')
app.use("/api/nilai/tunggal", tunggalRouter)

const gandaSoloRouter = require('./src/api/api_seni/nilai_ganda/nilai_ganda.router')
app.use("/api/nilai/", gandaSoloRouter)

const reguRouter = require('./src/api/api_seni/nilai_regu/nilai_regu.router')
app.use("/api/nilai/regu", reguRouter)

const hukumTGRRouter = require('./src/api/api_seni/hukum_seni/hukum_seni.router')
app.use("/api/seni/hukum/", hukumTGRRouter)

ioServer.listen(PORT,() =>{
    console.log('server run on port ' + PORT)
})

