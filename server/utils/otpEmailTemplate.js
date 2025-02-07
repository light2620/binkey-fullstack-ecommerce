function otpForgetTemplate(name,otp){
        return `
        <h1>Dear ${name}</h1>
         <div>
          <p>Use This Otp To Reset Your Password. Otp is Valid for Only 1 hr</p>
         </div>
         <div className="text-center bg-yellow-400 p-2">
            <p>${otp}</p>
         </div>`
        
}


export {otpForgetTemplate}