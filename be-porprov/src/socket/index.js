let io;

var ioEvent = (io) =>{
    io.on('connection', socket => {
        console.log(`⚡: ${socket.id} user just connected!`);
        // console.log(`a user connected!`);
        // socket.disconnect() 
        // socket.disconnect(0) 

        //--------------------------------
        //socket tanding
        //--------------------------------
        socket.on('join', (data) =>{
            socket.join(data)
        })

        socket.on('leave', (id_jadwal) =>{
            socket.leave(id_jadwal)
            console.log("leave "+ id_jadwal);
        })

        socket.on('naikBabak', (id_jadwal) =>{
            io.to(id_jadwal).emit('naikBabak')
        })
        
        //socket juri to dewan seni
        socket.on('juriToDewan', (id_jadwal) =>{
            io.to(id_jadwal).emit('refreshDewan')
        })
        
        socket.on('init_juri_tanding', (id_jadwal) =>{
            io.to(id_jadwal).emit('getJuri')
        })
        
        socket.on('edit_juri_tanding', (id_jadwal) =>{
            io.to(id_jadwal).emit('change_nilai_juri')
        })
        
        socket.on('dewanToLayar', (id_jadwal) =>{
            io.to(id_jadwal).emit('refreshLayar')
        })

        //socket penilaian 
        socket.on("init_nilai_tanding", (id_jadwal) => {
            io.to(id_jadwal).emit("getNilaiTanding")
        })
        
        socket.on("editNilaiTanding", (id_jadwal) =>{
            io.to(id_jadwal).emit("change_nilai_tanding")
        })
        
        //socket timer tanding
        socket.on("init_time_tanding", (id_jadwal) => {
            io.to(id_jadwal).emit("get_time_tanding")
        })

        socket.on("update_time_tanding", (id_jadwal) => {
            io.to(id_jadwal).emit("change_time_tanding")
        })

        //socket verifikasi
        socket.on("init_verif", (id_jadwal) => {
            io.to(id_jadwal).emit("getVerif")
        })

        socket.on("editVerif", (id_jadwal) =>{
            io.to(id_jadwal).emit("change_verif")
        })

        socket.on("closeVerif", (id_jadwal) => {
            io.to(id_jadwal).emit("close_verif")
        })

        socket.on("openVerif", (id_jadwal) => {
            io.to(id_jadwal).emit("open_verif")
        })

        //socket indikator juri
        socket.on("pbj1", (id_jadwal) => {
            io.to(id_jadwal).emit("pbj1On")
        })

        socket.on("pbj2", (id_jadwal) => {
            io.to(id_jadwal).emit("pbj2On")
        })

        socket.on("pbj3", (id_jadwal) => {
            io.to(id_jadwal).emit("pbj3On")
        })

        socket.on("pmj1", (id_jadwal) => {
            io.to(id_jadwal).emit("pmj1On")
        })

        socket.on("pmj2", (id_jadwal) => {
            io.to(id_jadwal).emit("pmj2On")
        })

        socket.on("pmj3", (id_jadwal) => {
            io.to(id_jadwal).emit("pmj3On")
        })

        socket.on("tbj1", (id_jadwal) => {
            io.to(id_jadwal).emit("tbj1On")
        })

        socket.on("tbj2", (id_jadwal) => {
            io.to(id_jadwal).emit("tbj2On")
        })

        socket.on("tbj3", (id_jadwal) => {
            io.to(id_jadwal).emit("tbj3On")
        })

        socket.on("tmj1", (id_jadwal) => {
            io.to(id_jadwal).emit("tmj1On")
        })

        socket.on("tmj2", (id_jadwal) => {
            io.to(id_jadwal).emit("tmj2On")
        })

        socket.on("tmj3", (id_jadwal) => {
            io.to(id_jadwal).emit("tmj3On")
        })

        //--------------------------------
        // SOCKET SENI
        //--------------------------------

        // socket join room seni
        socket.on("joinSeni", ({ user, id_jadwal }) => {
            console.log(user+" Seni join "+ id_jadwal);
            socket.join(id_jadwal);
        });

        //socket juri to dewan & layar 
        socket.on("juriToDewanLayar", (id_jadwal) => {
            console.log(id_jadwal);
            io.to(id_jadwal).emit("getDewanLayar")
        })

        //socket timer to layar
        socket.on('seniTimerToLayar', (id_jadwal) =>{
            io.to(id_jadwal).emit("getLayarSeni")
        })

        // socket.on("editData", () =>{
        //   io.emit("change_data")
        // })


        //socket juri to dewan seni

        //socket timer seni
        socket.on("init_time_seni", (id_jadwal) => {
            io.to(id_jadwal).emit("get_time_seni")
        })

        socket.on("update_time_seni", (id_jadwal) => {
            io.to(id_jadwal).emit("change_time_seni")
        })

        socket.on('stop_timer_seni', (id_jadwal) =>{
            io.to(id_jadwal).emit('save_timer_seni')
        })

        socket.on('disconnect', () => {
            // socket.disconnected()
            console.log('🔥: A user disconnected');
            // console.log(`a user disconnected`);
        });

    })
}

var testEvent = (io) => {
    io.on('connection', socket => {
        // socket.disconnect() 
        console.log('⚡: A Client connected');
        
        socket.on('disconnect', () => {
            console.log('🔥: A Client disconnected');
        });

        socket.on('error', function (err) {
            console.log(err);
        });

        socket.on('ping', () => {
            console.log("ping!!!");
        })
    });
}

var init = (app) => {
    // setup socket server
    const { createServer } = require("http");
    const { Server } = require("socket.io")
    const server = createServer(app);
    io = new Server(server, {
        cors: {
            origin: "*",
        }
    });;    

    // Define all Events
    ioEvent(io)

    // return server to use port number
    return server;
}

var getIO = () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }

module.exports = {
    init,
    getIO
}