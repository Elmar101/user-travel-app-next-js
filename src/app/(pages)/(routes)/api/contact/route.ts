import { NextResponse } from 'next/server';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY!); 


export async function POST(req: Request) {

    try {
        const { name,  email,  message,  recaptcha } = await req.json();
        console.log("recaptcha token:", recaptcha);
        const recaptchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`,
            { method: "POST" }
          );

        const recaptchaResult = await recaptchaResponse.json();
        console.log("reCAPTCHA verification result:", recaptchaResult);
    
        if (!recaptchaResult.success) {
        return NextResponse.json(
            { message: "reCAPTCHA verification failed." },
            { status: 400 }
        );
        }


        const emailResponse = await resend.emails.send({
            from: "onboarding@resend.dev", 
            to: "elmar.amanov.2015@mail.ru", 
            subject: `Mail`,
            html: `
              <h2>Mail</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong> ${message}</p>
            `,
          });

          console.log("Email sent successfully:", emailResponse);
          return NextResponse.json({ message: "Message Success!" }, { status: 200 });

        
    } catch (error) {
         console.error("Error sending email:", error);
         // Handle specific error cases if needed
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }


}