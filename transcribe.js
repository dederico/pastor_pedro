exports.handler = function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    let convo = event.convo || '';
    // If no previous conversation is present, start the conversation
    if(!convo) {
        twiml.say({
            voice: 'Polly.Pedro-Neural'
        }, 'Hola soy el pastor Pedro, trataré de ayudarte y guiarte de la mano del señor, cuentame que te trae por aqui?');
        convo += 'Hola'
    }
 
    // Listen to user response and pass input to /respond
    const params = new URLSearchParams({ convo: convo });
    twiml.gather({
        enhanced: "true",
        speechTimeout: 'auto',
        speechModel: "phone_call",
        input: 'speech',
        action:`/respond?${params}`,
        language:'es-US',
    })
 
    return callback(null, twiml);
 };
 