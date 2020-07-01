const nodemailer = require('nodemailer');

module.exports = (formulario) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user : 'HiWorldSolutions',
            pass : 'SolarisTheBest'
        }
    })

    const mailOptions = {
        from : `${formulario.nombre}  ${formulario.email}`,
        to: 'destinatario',
        subject: formulario.asunto,
        html: 'hola mundo'
        
    };

    transporter.sendMail(mailOptions, function (err, info){
        if(err){
            console.log(err);
        } else{
            console.log(info);
        }
    })
}