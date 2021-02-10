export const emailMessageOptions = ( currentUser, invitationUrl ) => {
    return { 
        from: "teachpadsconnect247@gmail.com",
        subject: "Hey! Join my lesson!",
        messageBody: invitationUrl,
        userId: currentUser?._id
    }
}


export const emailInputOptions = {
    name:"inputO",
    type:"email",
    placeHolder:"Invite your friends!"
}
