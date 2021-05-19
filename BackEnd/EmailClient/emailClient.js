import NodeMailer from 'nodemailer';


function emailClient( mailOptions ) {

    const fromEmail = "teachpadsconnect247@gmail.com";
    const  passWord = "Teach777!!!";
    // const  passWord = "padsconnect247";
  
    try {
        const transporter = NodeMailer?.createTransport({
            service: 'gmail',
            auth: {
                user: fromEmail,
                pass: passWord // move to env var
            }});
            
            transporter?.sendMail(mailOptions, ( error, response) => {

                  if ( error ) {

                      console.log( error );
                  }

                  console.log( response )
            })    
        
    } catch ( error ) {
        
    }

}



export default emailClient;